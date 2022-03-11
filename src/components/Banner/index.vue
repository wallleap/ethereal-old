<template>
  <div class="banner">
    <div class="site-show">
      <div class="bg"></div>
      <div class="site-show-top">
        <h2 class="shici-title">{{ shici_title }}</h2>
        <div class="shici">
          <p v-for="(shici, index) in shicis" :key="index" v-show="index < 2">{{ shici }}</p>
        </div>
      </div>
      <div class="mask" @click="hideRes" v-bind:style="{ display: isShow }"></div>
      <div class="site-search">
        <div class="search-box">
          <input
            type="text"
            class="search"
            placeholder="关键词"
            v-model="keyword"
            v-on:focus="showRes"
            @keyup.enter="searchAll"
          />
          <button class="search-btn" @click="handleClick">搜索</button>
        </div>
        <div class="search-res" v-bind:style="{ display: isShow, opacity: isZero }">
          <div class="container">
            <h3 class="count">一共查找到 {{ all.total_count }} 条结果</h3>
            <div class="posts">
              <ul class="items">
                <li v-for="item in all.items" :key="item.id" class="item">
                  <router-link
                    @click="hideRes"
                    :to="{ name: 'post', params: { number: item.number, item } }"
                    class="cursor"
                  >
                    <span><i class="fa fa-book"></i> {{ item.title }}</span>
                    <!--<span>内容：{{ item.body }}</span>-->
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce, throttle } from '@/utils/index'

const jinrishici = require('jinrishici')

export default {
  name: 'Banner',
  data() {
    return {
      shici_title: '',
      shicis: [],
      keyword: '',
      all: {},
      isShow: 'none',
      isZero: '0',
    }
  },
  methods: {
    loadSentence() {
      jinrishici.load(
        (result) => {
          const shicidata = result.data.origin
          if (shicidata.content[0].length > 26 || shicidata.content[1].length > 26) {
            setTimeout(() => this.loadSentence(), 1000)
          } else {
            this.shici_title = shicidata.title
            this.shicis = shicidata.content
          }
        },
        (err) => {
          console.log('test')
        }
      )
    },
    showRes() {
      this.isShow = 'block'
      this.isZero = '1'
    },
    async loadAll() {
      this.all = await this.$store.dispatch('queryPosts')
    },
    async searchAll() {
      let str = this.keyword
      this.all = await this.$store.dispatch('searchAll', { str })
    },
    hideRes() {
      this.isShow = 'none'
      this.isZero = '0'
    },
    handleClick() {
      this.searchAll()
      this.showRes()
    },
  },
  mounted: function () {
    this.loadSentence()
    this.searchAll()
  },
  /*
  watch: {
    keyword: debounce(this.searchAll(), 100, 1),
  },*/
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
