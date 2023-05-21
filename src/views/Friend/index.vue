<template>
  <div id="friend">
    <Transition name="fade-transform" mode="out-in">
      <div class="page" v-if="friends.length">
        <Quote :quote="$config.friendOpts.quote" />
        <div class="me">
          <span>欢迎各位大佬交换友链 (づ￣ 3￣)づ</span>
          <span>★ Name：wallleap</span>
          <span>★ Description：Luwang's Blog</span>
          <span>★ Url：https://myblog.wallleap.cn</span>
          <span>★ Avatar：<span class="avatar">https://cdn.wallleap.cn/img/custom/avatar.jpg</span></span>
          <span>※ 以下友链友链随机排序，博主将不定期更新排序并过滤阵亡名单。</span>
        </div>
        <ul class="content">
          <li v-for="item in friends" :key="item.number" data-aos="slide-left">
            <a :href="item.info.url" rel="noopener noreferrer" class="info" target="_blank">
              <img :src="item.info.avatar" alt />
              <h3 class="name">{{ item.info.name }}</h3>
              <p class="desc">{{ item.info.desc }}</p>
            </a>
          </li>
        </ul>
        <div class="befriend">
          <h2>交个朋友</h2>
          <p>
            您可以前往
            <a href="https://github.com/wallleap/friends" target="_blank">friends仓库</a>
            按照说明自行添加友链，或者在下方留言，格式为：
          </p>
          <div class="markdown">
            <pre><code class="language-html"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">name: </span>博客名称</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">url: </span>博客链接</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">avatar: </span>头像链接</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">desc: </span>博客描述</div></td></tr></tbody></table></code><i id="code-1" class="icon icon-clipboard code-copy"></i></pre>
          </div>
        </div>
      </div>
      <Loading v-else />
    </Transition>
    <Comment v-if="$config.friendOpts.enableComment && initComment" title="友链" />
  </div>
</template>

<script>
import AOS from 'aos'
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import Comment from '@/components/Comment'

export default {
  name: 'Friend',
  components: {
    Loading,
    Quote,
    Comment,
  },
  data() {
    return {
      friends: [],
      initComment: false,
      LOAD_INX: 4,
    }
  },
  async created() {
    await this.queryFriends()
    this.initComment = true
    AOS.init({
      duration: 1000,
      easing: 'ease',
      debounceDelay: 50,
      throttleDelay: 100,
      offset: 50,
    })
  },
  methods: {
    async queryFriends() {
      // this.friend = await this.$store.dispatch('queryPage', { type: 'friend' })
      this.friends = await this.$store.dispatch('queryFriends')
    },
    loadNext() {
      this.LOAD_INX += 1
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
