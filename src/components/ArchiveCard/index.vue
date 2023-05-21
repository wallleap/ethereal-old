<template>
  <div class="archive">
    <ul class="content">
      <li class="cursor" v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'post', params: { number: post.number, post } }">
          <div class="post-meta">
            <span class="labels">
              <span v-for="label in post.labels.slice(0, 2)" :key="label.id" :style="{ color: label.color }">{{
                label.name
              }}</span>
            </span>
            <span class="mile">
              {{ post.milestone ? post.milestone.title : '未分类' }}
            </span>
          </div>
          <h3>{{ post.title }}</h3>
          <div class="post-meta-num">
            <span>
              <!-- <i class="icon icon-calendar"></i> -->
              本文创建于<span class="created-at">{{ post.created_at }}</span>
            </span>
            <span>
              <!-- <i class="icon icon-fire"></i> -->
              目前热度<span class="hot">{{ times[post.id] || 1 }}℃</span>
            </span>
          </div>
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { shuffle } from '@/utils'

export default {
  name: 'ArchiveItem',
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
