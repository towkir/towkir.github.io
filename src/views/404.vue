<template>
  <div class="not-found">
    <div class="content">
      <h3>404</h3>
      <p>Page not found</p>
      <router-link to="/">Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style lang="less" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  .content {
    font-family: 'Avenir';
    text-align: center;
    position: relative;
    h3 {
      font-size: 180px;
      line-height: 1;
      font-weight: 800;
    }
    p {
      font-size: 14px;
      line-height: 1;
      position: absolute;
      transform: translateX(50%);
      left: -50%;
      width: 100%;
      bottom: 58px;
      background-color: var(--background-color);
      padding: 5px 0;
      text-transform: uppercase;
    }
    a {
      font-size: 14px;
      line-height: 1;
      color: inherit;
      text-transform: uppercase;
      text-decoration: none;
      padding: 5px 15px;
      border-radius: 3px;
      border: 1px solid var(--border-color);
      position: relative;
      bottom: -10px;
      font-weight: 700;
    }
  }
}
</style>
