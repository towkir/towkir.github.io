<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    retriveThemeSetting() {
      const theme = localStorage.getItem('theme');
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
      }
    },
  },
  beforeMount() {
    this.retriveThemeSetting();
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

@import url('~@/assets/fonts/fontisto-brands.css');

:root {
  --text-color: #b9a336;
  --background-color: #2A363B;
  --command-color: #9DE0AD;
  --error-color: #ff7a7a;
  --success-color: #10ff00;
  --scrollbar-color: rgba(0,0,0,0.3);
}

[data-theme="light"] {
  --text-color: #1e8fc5;
  --background-color: #dae2c7;
  --command-color: #000;
  --error-color: #ff7a7a;
  --success-color: #0aa200;
  --scrollbar-color: rgba(0,0,0,0.1);
}

[data-theme="monochrome"] {
  --text-color: #797979;
  --background-color: #f3f3f3;
  --command-color: #000;
  --error-color: #ad5c5c;
  --success-color: #649860;
  --scrollbar-color: rgba(0,0,0,0.05);
}

body {
  background-color: var(--background-color);
  font-family: 'Menlo', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  line-height: 1.23;
  color: var(--text-color);
}

/* custom scrollbar (works only on chrome) */
body::-webkit-scrollbar {
  width: 6px;
}

body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px var(--scrollbar-color);
  box-shadow: inset 0 0 3px var(--scrollbar-color);
}

body::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-color);
  border-radius: 5px;
}
/* custom scrollbar styling ends */

@media screen and (max-width: 570px) {
  body {
    font-size: 0.8em;
  }
}
</style>
