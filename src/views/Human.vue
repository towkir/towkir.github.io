<template>
  <div class="wrapper">
    <Header/>
    <div class="home">
      <div class="intro">
        <img src="@/assets/images/towkir.jpg" class="profile-photo" alt="photo-of-towkir">
        <div class="details">
          <h1>{{about.name}}</h1>
          <h5>{{about.bio}}</h5>
          <ul class="network-links">
            <li v-for="(network, n) in networks.content" :key="network.name + n">
              <a :href="network.link" target="_blank">
                <i class="fi fi-border ellipse" :class="`${network.iconClass}`"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <InfoBlock :info="experience" :view="'table'"/>
      <InfoBlock :info="skills"/>
      <InfoBlock :info="achievements"/>
      <InfoBlock :info="contributions"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import InfoBlock from '@/components/InfoBlock.vue';
import Footer from '@/components/Footer.vue';
import commands from '@/commands.json';

export default {
  name: 'Human',
  components: { Header, InfoBlock, Footer },
  computed: {
    about() {
      return {
        name: commands.whoami.content.split('\n')[0],
        bio: commands.whoami.content.split('\n')[1],
      };
    },
    experience() {
      return commands.experience;
    },
    skills() {
      return commands.skills;
    },
    contributions() {
      return commands.contributions;
    },
    achievements() {
      return commands.achievements;
    },
    networks() {
      return commands.networks;
    },
  },
};
</script>

<style lang="less">
.wrapper {
  font-family: 'Avenir', sans-serif;
  .home {
    padding: 100px 80px 80px;
    font-size: 16px;
    max-width: 1020px;
    margin: 0 auto;
    .intro {
      margin-bottom: 30px;
      display: flex;
      align-items: flex-start;
      .profile-photo {
        max-width: 150px;
        border-radius: 5px;
      }
      .details {
        padding: 20px;
        .network-links {
          list-style: none;
          margin-top: 10px;
          li {
            display: inline-block;
            &:not(&:last-child) {
              margin-right: 5px
            }
            a {
              display: inline-block;
              color: var(--text-color);
              font-size: 14px;
              i {
                border-color: var(--text-color);
                border-width: 1px;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .wrapper {
    .home {
      padding: 80px 30px 30px;
    }
  }
}

@media screen and (max-width: 570px) {
  .wrapper {
    .home {
      .intro {
        display: block;
        .profile-photo {
          max-width: 130px;
        }
        .details {
          padding: 15px 0;
        }
      }
    }
  }
}
</style>
