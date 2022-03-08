<template>
  <div class="archive">
    <div class="totalCount">
      已经写了<span class="count">{{ totalCount }}</span
      >篇文章了，继续加油ヾ(◍°∇°◍)ﾉﾞ哦~
    </div>
    <ul class="content">
      <li v-for="(post, i) in posts" :key="post.id">
        <div class="creat-time" :style="{ borderTopColor: colors[i] }">{{ post.created }}</div>
        <router-link :to="{ name: 'post', params: { number: post.number, post } }" class="cursor title-info">
          <h3>
            {{ post.title }} <span class="post-hot">( <i class="icon icon-fire"></i> {{ times[post.id] || 1 }}℃ )</span>
          </h3>
        </router-link>
      </li>
    </ul>
    <div class="btn-group" v-if="!isDisabledPrev || !isDisabledNext">
      <Pagination
        :loading="loading"
        :isDisabledPrev="isDisabledPrev"
        :isDisabledNext="isDisabledNext"
        @handlePage="handlePage"
      />
    </div>
    <div class="archive-end">没有更多了~</div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { shuffle } from '@/utils'
import { mapState } from 'vuex'

export default {
  name: 'ArchiveCard',
  components: {
    Pagination,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    times: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isDisabledPrev: {
      type: Boolean,
      default: false,
    },
    isDisabledNext: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      colors: shuffle(this.$config.themeColors),
    }
  },
  computed: {
    ...mapState({
      totalCount: (state) => state.totalCount,
    }),
  },
  async created() {
    if (!this.totalCount) {
      await this.$store.dispatch('queryArchivesCount')
    }
  },
  methods: {
    // 翻页
    handlePage(type) {
      this.$emit('handlePage', type)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
