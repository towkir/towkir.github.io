<template>
  <div ref="terminal" class="terminal" tabindex="0"
    v-on:keypress="autoFocusInputAndPassKeyPress($event)">
    <p>
      Welcome! <br>
      This is a basic terminal. If you are a human, type ./human to enter a regular website. <br>
      If you love terminals, type --help for more info. <br>
      Thanks!
    </p>
    <div class="commands" v-for="(log, l) in logs" :key="log.command + l">
      <div class="command-line">
        <span class="path">{{log.path}} $&nbsp;</span>
        <span class="command">{{log.command}}</span>
      </div>
      <div class="output"
        :class="[{'error' : log.result.type === 'error'},
        {'success' : log.result.type === 'success'}]"
        v-if="log.result.type === 'info'
        || log.result.type === 'error'
        || log.result.type === 'success'"
        v-html="log.result.content">
      </div>
      <div class="output success" v-if="log.result.type === 'dynamic-success'">
        {{log.result.content}} {{redirectionTimeout}}s
      </div>
      <div class="output table" v-if="log.result.type === 'table'"
        v-html="log.result.content"></div>
    </div>
    <Input ref="inputRow" v-on:commandPushed="receiveAndFindCommand($event)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from '@/components/Input.vue';
import commands from '@/commands.json';

export default {
  name: 'Terminal',
  components: {
    Input,
  },
  data() {
    return {
      // keyValue: '',
      logs: [],
      commands: [],
      results: [],
      redirectionTimeout: 3,
    };
  },
  methods: {
    autoFocusInputAndPassKeyPress(e) {
      e.preventDefault();
      this.$refs.inputRow.focusAndSetValue(e.keyCode !== 13 ? e.key : '');
      this.scrollToInputElement();
    },
    setTheme(theme) { // only pass 'dark' or 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    },
    scrollToInputElement() {
      const el = this.$refs.inputRow.$el;
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        }, 10);
      }
    },
    handleSettings(setting, value) {
      if (setting === 'theme' && Object.keys(commands[setting].options).includes(value)) {
        this.setTheme(value);
        return { type: 'success', content: `Theme changed to ${value}` };
      }
      return { type: 'error', content: `${value} is not a valid option for ${setting}` };
    },
    handleRedirections(route) {
      const context = this;
      const INTERVAL = setInterval(() => {
        context.redirectionTimeout -= 1;
        // console.log(context.redirectionTimeout);
        if (context.redirectionTimeout === 0) {
          clearInterval(INTERVAL);
          this.$router.push({ path: `/${route}` });
        }
      }, 1000);
      return { type: 'dynamic-success', content: `Redirecting you to '/${route}' in:` };
    },
    getCommandResult(command) {
      if (command === '') {
        return {};
      }
      if (command === '--help') {
        return {
          type: 'table',
          content: Object.entries(commands)
            .map(item => `<div><span>${item[0]}</span><span>${item[1].helper}</span></div>`)
            .join('\n'),
        };
      }
      const fullCommand = command.split(' ');
      if (commands[fullCommand[0]]) {
        if (commands[fullCommand[0]].type === 'setting') {
          if (fullCommand.length < 2) {
            return {
              type: 'table',
              content: Object.entries(commands[command].options)
                .map(item => `<div><span>${command} ${item[0]}</span><span>${item[1]}</span></div>`)
                .join('\n'),
            };
          } // else
          return this.handleSettings(...fullCommand);
        }
        if (commands[fullCommand[0]].type === 'info') {
          return {
            type: 'info',
            content: commands[command].content.split('\n')
              .map(item => `<span>${item}</span>`)
              .join('<br>'),
          };
        }
        if (commands[fullCommand[0]].type === 'table') {
          return {
            type: 'table',
            content: commands[command].content
              .map(item => `<div>${Object.values(item).map(text => `<span>${text.split('\n').join('<br>')}</span>`).join('')}</div>`)
              .join('<br>'),
          };
        }
        if (commands[fullCommand[0]].type === 'redirect') {
          return this.handleRedirections(commands[fullCommand[0]].route);
        }
        return commands[command];
      }
      return { type: 'error', content: `command not found: ${command}` };
    },
    receiveAndFindCommand(commandData) {
      if (commandData.command === 'clear') {
        this.logs = [];
      } else {
        this.logs.push({
          path: commandData.path,
          command: commandData.command,
          result: this.getCommandResult(commandData.command),
        });
      }
      this.scrollToInputElement();
    },
  },
};
</script>

<style lang="less">
.terminal {
  padding: 80px;
  padding-bottom: 0;
  min-height: calc(100vh - 160px);
  &:focus {
    outline: none;
  }
  .commands {
    // margin-bottom: 10px;
    color: var(--primary-color);
    .command-line {
      display: table;
      width: 100%;
      color: var(--command-color);
      span.path {
        width: 1%;
        white-space: nowrap;
        display: table-cell;
        vertical-align: top;
      }
      span.command {
        display: table-cell;
      }
    }
    div.output {
      &.error {
        color: var(--error-color);
      }
      &.success {
        color: var(--success-color);
      }
      &.table {
        display: table;
        width: 100%;
        & > div {
          display: table-row;
          span {
            display: table-cell;
            &:first-child {
              width: 1%;
              min-width: 200px;
              padding: 0 30px 0 20px;
            }
            a {
              color: inherit;
              opacity: 0.8;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .terminal {
    padding: 40px;
  }
}

@media screen and (max-width: 570px) {
  .terminal {
    padding: 20px;
    .commands {
      div.output {
        &.table {
          & > div {
            span {
              &:first-child {
                min-width: 120px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
