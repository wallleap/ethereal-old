<template>
  <div class="banner">
    <div class="site-show">
      <div class="site-show-top">
        <h2 class="shici-title">{{ shici_title }}</h2>
        <div class="shici">
          <p v-for="(shici,index) in shicis" :key="index" v-show="index<2">{{shici}}</p>
        </div>
      </div>
      <div class="site-search">
        <input type="text" class="search" placeholder="关键词">
        <button class="search-btn">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
const jinrishici = require('jinrishici');

export default {
  name: "Banner",
  data(){
    return {
      shici_title: '',
      shicis: []
    }
  },
  methods: {
    loadSentence: function() {
      jinrishici.load(result => {
        this.shici_title = result.data.origin.title
        this.shicis = result.data.origin.content
      }, err => {
        console.log("test");
      })
    }
  },
  mounted: function(){this.loadSentence()}
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>