<template>
  <div class="shell-line-wrapper">
    <div class="block-wrapper">
      <span class="path">{{fullPath}} $&nbsp;</span>
      <div class="input-wrapper" v-on:keydown="preventPropagation($event)">
        <textarea type="text" v-model="command" spellcheck="false"
          id="terminalInput" rows="1"
          ref="input"
          v-on:keydown="captureKeyDown($event)"
          v-on:keypress="captureCommand($event)"></textarea>
        <span class="suggestion" v-if="command[0] !== ' '">
          {{suggestedCommand}} {{suggestedSubCommand}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import commands from '@/commands.json';

export default {
  name: 'Input',
  props: {
    keyPressValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      directory: 'towkir@home',
      subDirectory: '',
      command: '',
      commandData: {},
      commandHistory: [],
      historyIndex: 0,
      availableCommands: Object.keys(commands),
      outerKeyPressValue: '',
    };
  },
  computed: {
    fullPath() {
      return `${this.directory} ${this.subDirectory}`.trim();
    },
    suggestedCommand() {
      if (this.command.trim() !== '') {
        return this.availableCommands.filter(item => item.indexOf(this.command.split(' ')[0]) === 0).length > 0
          ? this.availableCommands.filter(item => item.indexOf(this.command.split(' ')[0]) === 0)[0] : '';
      }
      return '';
    },
    subCommandForSuggestedCommand() {
      return this.suggestedCommand !== ''
        && commands[this.suggestedCommand]
        && commands[this.suggestedCommand].options
        ? Object.keys(commands[this.suggestedCommand].options)
        : [];
    },
    suggestedSubCommand() {
      if (this.command.split(' ').length > 1) {
        return this.subCommandForSuggestedCommand
          .filter(item => item.indexOf(this.command.split(' ')[1]) === 0).length
          ? this.subCommandForSuggestedCommand
            .filter(item => item.indexOf(this.command.split(' ')[1]) === 0)[0]
          : '';
      }
      return '';
    },
  },
  methods: {
    // TODO: prevent long line command input
    preventPropagation(e) {
      e.stopPropagation();
    },
    captureKeyDown(e) {
      this.captureHistoryTraverse(e);
      this.captureCommandAutoComplete(e);
    },
    focusAndSetValue(val) {
      this.command += val;
      this.$refs.input.focus();
    },
    captureCommand(e) {
      e.stopPropagation();
      if (e.keyCode === 13) {
        e.preventDefault();
        if (this.command !== '') {
          this.commandHistory.push(this.command);
          this.historyIndex = this.commandHistory.length;
        }
        this.$emit('commandPushed', { path: this.fullPath, command: this.command.trim() });
        this.command = '';
      }
    },
    captureCommandAutoComplete(e) {
      e.stopPropagation();
      if (e.keyCode === 9) {
        e.preventDefault();
        if (this.suggestedCommand !== '') {
          this.command = `${this.suggestedCommand} ${this.suggestedSubCommand}`.trim();
        }
      }
    },
    setCommandFromHistory() {
      this.command = this.commandHistory[this.historyIndex];
    },
    captureHistoryTraverse(e) {
      if (e.keyCode === 38) {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex -= 1;
          this.setCommandFromHistory();
        }
      }
      if (e.keyCode === 40) {
        e.preventDefault();
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex += 1;
          this.setCommandFromHistory();
        } else { // clear prompt at the end of command history;
          this.historyIndex = this.commandHistory.length;
          this.command = '';
        }
      }
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>

<style scoped lang="less">
.shell-line-wrapper {
  display: table;
  width: 100%;
  padding-bottom: 80px;
  div.block-wrapper {
    display: table-row;
    vertical-align: middle;
    span.path {
      width: 1%;
      white-space: nowrap;
      display: table-cell;
      vertical-align: top;
      color: var(--command-color);
    }
    div.input-wrapper {
      display: table-cell;
      position: relative;
      #terminalInput {
        font-family: 'Menlo', monospace;
        vertical-align: top;
        appearance: none;
        border: 0;
        background-color: transparent;
        color: var(--command-color);
        font-size: inherit;
        resize: none;
        width: 100%;
        padding: 0;
        position: relative;
        &:focus {
          outline: none;
        }
      }
      span.suggestion {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0.3;
        z-index: -1;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .terminal {
    padding-bottom: 40px;
  }
}

@media screen and (max-width: 570px) {
  .terminal {
    padding-bottom: 20px;
  }
}
</style>
