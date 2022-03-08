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
      <div class="site-search">
        <div class="search-box">
          <input
            type="text"
            class="search"
            placeholder="关键词"
            v-model="keyword"
            v-on:focus="showRes"
            @keyup="searchAll"
          />
          <button class="search-btn" @click="searchAll()">搜索</button>
        </div>
        <div class="search-res" v-bind:style="{ display: isShow, opacity: isZero }">
          <div class="mask" @click="hideRes"></div>
          <div class="container">
            <h3 class="count">一共查找到 {{ all.total_count }} 条结果</h3>
            <div class="posts">
              <h4>文章</h4>
              <ul class="items">
                <li v-for="item in all.items" :key="item.id" class="item">
                  <span>标题：{{ item.title }}</span>
                  <!--<span>内容：{{ item.body }}</span>-->
                </li>
              </ul>
            </div>
            <div class="cates">
              <h4>分类</h4>
              <ul>
                <li v-for="item in category" :key="item.id">
                  <span v-if="item.title === keyword">{{ item.title }}</span>
                </li>
              </ul>
            </div>
            <div class="tags">
              <h4>标签</h4>
              <ul>
                <li v-for="item in tag" :key="item.id">
                  <span v-if="item.name === keyword">{{ item.name }}</span>
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
import { searchAll } from '@/utils/services'

const jinrishici = require('jinrishici')

export default {
  name: 'Banner',
  data() {
    return {
      shici_title: '',
      shicis: [],
      keyword: '',
      all: {},
      tag: [],
      label: '',
      category: [],
      isShow: 'none',
      isZero: '0',
    }
  },
  created() {
    searchAll()
  },
  methods: {
    loadSentence() {
      jinrishici.load(
        (result) => {
          const shicidata = result.data.origin
          this.shici_title = shicidata.title
          this.shicis = shicidata.content
          if (shicidata.content[0].length > 26 || shicidata.content[1].length > 26) {
            this.loadSentence()
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
    async searchAll() {
      let str = this.keyword
      this.all = await this.$store.dispatch('searchAll', { str })
      this.tag = await this.$store.dispatch('queryTag')
      this.category = await this.$store.dispatch('queryCategory')
    },
    hideRes() {
      this.isShow = 'none'
      this.isZero = '0'
    },
  },
  mounted: function () {
    this.loadSentence()
  },
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
