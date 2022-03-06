<template>
  <div class="banner">
    <div class="site-show">
      <div class="bg"></div>
      <div class="site-show-top">
        <h2 class="shici-title">{{ shici_title }}</h2>
        <div class="shici">
          <p v-for="(shici,index) in shicis" :key="index" v-show="index<2">{{shici}}</p>
        </div>
      </div>
      <div class="site-search">
        <div class="search-box">
          <input type="text" class="search" placeholder="关键词" v-model="keyword">
          <button class="search-btn" @click="searchAll()">搜索</button>
        </div>
        <div class="search-res">
          {{all}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const jinrishici = require('jinrishici')

export default {
  name: "Banner",
  data(){
    return {
      shici_title: '',
      shicis: [],
      keyword: '',
      all: {}
    }
  },
  methods: {
    loadSentence() {
      jinrishici.load(result => {
        const shicidata = result.data.origin
        this.shici_title = shicidata.title
        this.shicis = shicidata.content
        if (shicidata.content[0].length > 26 || shicidata.content[1].length > 26) {
          this.loadSentence()
        }
      }, err => {
        console.log("test");
      })
    },
    async searchAll() {
      let str = this.keyword
      console.log(this.keyword)
      this.all = await this.$store.dispatch('searchAll', { str })
      console.log(this.all.items)
    }
  },
  mounted: function(){this.loadSentence()}
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>