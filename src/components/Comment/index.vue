<template>
  <div class="comments">
    <div class="comments-head">
      <span class="first-comment">{{ $config.comments[0] }}</span>
      <input type="checkbox" name="switch" class="switch" @click="isfirst = !isfirst" />
      <span class="second-comment">{{ $config.comments[1] }}</span>
    </div>
    <div class="comment-wrap">
      <!--      <transition name="slide-fade"><div id="vcomments" v-show="isfirst"></div></transition>-->
      <transition name="slide-fade">
        <div class="first" v-show="isfirst">
          <div id="twikoo"></div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="second" v-show="!isfirst">
          <div id="gitalk"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Valine from 'valine'

export default {
  name: 'Comment',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isfirst: true,
    }
  },
  mounted() {
    // this.renderValine()
    this.renderTwikoo()
    this.renderGitalk()
  },
  methods: {
    renderGitalk() {
      const gitalk = new Gitalk({
        ...this.$config.gitalk,
        title: this.title,
      })
      gitalk.render('gitalk')
    },
    renderValine() {
      new Valine({
        el: '#vcomments',
        // other config
        appId: this.$config.leancloud.appId,
        appKey: this.$config.leancloud.appId,
        placeholder: '快来评论吧',
        path: 'window.location.pathname',
        avatar: 'mp',
        meta: ['nick', 'mail', 'link'],
        pageSize: 12,
        lang: 'zh-CN',
        highlight: true,
        enableQQ: true,
        requiredFields: ['nick', 'mail'],
      })
    },
    renderTwikoo() {
      twikoo.init({
        envId: 'https://twikoo-blog-liard.vercel.app/',
        el: '#twikoo',
      })
    },
  },
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
