<template>
  <div class="header-wrapper">
    <div class="content">
      <i class="fi fi-adjust" v-on:click="toggleTheme()"></i> |
      <router-link to="/">$terminal</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    toggleTheme() {
      const currentTheme = localStorage.getItem('theme');
      const themeToSet = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', themeToSet);
      localStorage.setItem('theme', themeToSet);
    },
  },
};
</script>

<style lang="less" scoped>
.header-wrapper {
  font-family: 'Menlo', monospace;
  font-size: 14px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 5;
  background-color: var(--header-background-color);
  box-shadow: 0 0 5px 0 var(--header-shadow-color);
  backdrop-filter: blur(5px);
  .content {
    max-width: 1020px;
    margin: 0 auto;
    padding: 20px 80px;
    text-align: right;
    user-select: none;
    i {
      vertical-align: middle;
      cursor: pointer;
    }
    a {
      color: inherit;
      text-decoration: none;
      &:focus, &:active, &:visited {
        color: inherit;
      }
    }
  }
}

@media screen and (max-width: 570px) {
  .header-wrapper {
    .content {
      padding: 15px 30px;
    }
  }
}
</style>
