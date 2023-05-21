<template>
  <div id="inspiration">
    <Transition name="fade-transform" mode="out-in">
      <div class="page" v-if="inspiration.length">
        <Quote :quote="$config.inspirationOpts.quote" />
        <div class="content">
          <div class="inspire-item" v-for="item in inspiration" :key="item.number" data-aos="fade-in">
            <div class="avatar"><img :src="item.user.avatar_url" alt="头像" /></div>
            <div class="username">{{ item.user.login }}</div>
            <div class="inspire-content">
              <MarkDown :content="item.body" />
            </div>
            <div class="meta">
              <span class="create-time">发布于 {{ item.date }}</span>
            </div>
          </div>
        </div>
        <div class="btn-group" v-if="!isDisabledPrev || !isDisabledNext">
          <Pagination
            :loading="loading"
            :isDisabledPrev="isDisabledPrev"
            :isDisabledNext="isDisabledNext"
            @handlePage="queryInspiration"
          />
        </div>
      </div>
      <Loading v-else />
    </Transition>

    <Comment v-if="$config.inspirationOpts.enableComment && initComment" title="灵感" />
  </div>
</template>

<script>
import AOS from 'aos'
import MarkDown from '@/components/MarkDown'
import Loading from '@/components/Loading'
import Pagination from '@/components/Pagination'
import Quote from '@/components/Quote'
import Comment from '@/components/Comment'
import { shuffle } from '@/utils'

export default {
  name: 'Inspiration',
  components: {
    MarkDown,
    Loading,
    Pagination,
    Quote,
    Comment,
  },
  data() {
    return {
      loading: false,
      initComment: false,
      colors: shuffle(this.$config.themeColors),
      totalCount: 0,
      page: 0,
      pageSize: 10,
      inspiration: [],
      list: [],
    }
  },
  computed: {
    maxPage() {
      return Math.ceil(this.totalCount / this.pageSize)
    },
    isDisabledPrev() {
      return this.page <= 1
    },
    isDisabledNext() {
      return this.page >= this.maxPage
    },
  },
  async created() {
    this.totalCount = await this.$store.dispatch('queryInspirationCount')
    await this.queryInspiration()
    this.initComment = true
    AOS.init({
      duration: 2000,
      easing: 'ease',
      debounceDelay: 50,
      throttleDelay: 100,
      offset: 50,
    })
  },
  methods: {
    async queryInspiration(type = 'next') {
      if (this.loading) return
      const queryPage = type === 'prev' ? this.page - 1 : this.page + 1
      this.page = queryPage

      if (this.list[queryPage]) {
        this.scrollTop(() => {
          this.inspiration = this.list[queryPage]
        })
        return
      }

      this.loading = true
      const inspiration = await this.$store.dispatch('queryInspiration', {
        page: queryPage,
        pageSize: this.pageSize,
      })
      this.loading = false

      this.scrollTop(() => {
        this.inspiration = inspiration
        this.list[queryPage] = inspiration
      })
    },
    scrollTop(cb) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      const delayTime = this.$config.isMobile ? 800 : 600
      setTimeout(cb, delayTime)
    },
  },
}
</script>

<style lang="scss">
@import './index.scss';
</style>
