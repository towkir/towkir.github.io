<template>
  <div class="info-block" v-if="Object.keys(info).length > 0">
    <h4 class="title">{{info.title}}</h4>
    <div class="description-wrapper" :class="{ table : view === 'table' }">
      <div class="description"
        v-for="(content, c) in info.content"
        :key="content + c">
        <div :class="{ header : v === 0 }" v-for="(value, v) in Object.values(content)"
          :key="value + v" v-html="value.split('\n').join('<br>')"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBlock',
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    view: {
      type: String,
    },
  },
};
</script>

<style lang="less">
.info-block {
  padding: 20px 0;
  h4.title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .description-wrapper {
    .description {
      margin-bottom: 20px;
      .header {
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 16px;
      }
      a {
        color: inherit;
        opacity: 0.8;
      }
    }
    &.table {
      display: table;
      .description {
        display: table-row;
        div {
          display: table-cell;
          padding-bottom: 15px;
          &.header {
            width: 1%;
            white-space: nowrap;
            padding-right: 20px;
            font-size: inherit;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
