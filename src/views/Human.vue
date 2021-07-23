<template>
  <div class="home">
    <div class="intro">
      <img src="@/assets/images/towkir.jpg" class="profile-photo" alt="photo-of-towkir">
      <h1>{{about.name}}</h1>
      <h5>{{about.bio}}</h5>
    </div>
  </div>
</template>

<script>
import commands from '@/commands.json';

export default {
  name: 'Human',
  computed: {
    about() {
      return {
        name: commands.whoami.content.split('\n')[0],
        bio: commands.whoami.content.split('\n')[1],
      };
    },
  },
};
</script>

<style lang="less">
.home {
  font-family: 'Avenir', sans-serif;
  padding: 80px;
  .intro {
    .profile-photo {
      max-width: 150px;
      border-radius: 5px;
      // border: 2px solid var(--text-color);
    }
  }
}
</style>
