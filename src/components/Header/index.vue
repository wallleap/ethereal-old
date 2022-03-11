<template>
  <header class="site-header-container">
    <div class="site-header">
      <div class="site-title">
        <RouterLink class="title" to="/">{{ $config.title }}</RouterLink>
        <span class="subtitle">{{ $config.subtitle }}</span>
      </div>

      <nav class="site-nav">
        <ul class="nav-wrap">
          <li class="nav-item" v-for="menu in displayMenu" :key="menu.path">
            <RouterLink :to="menu.path">
              <i :class="['iconfont', `icon-${menu.icon}`]"></i>
              {{ menu.title }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="site-admin">
        <a class="add-box" href="//github.com/wallleap/auroraBlog/issues/new">
          <i class="iconfont icon-bianji"></i>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import async from 'async'

export default {
  name: 'Header',
  data() {
    const { archiveOpts, categoryOpts, tagOpts, inspirationOpts, bookOpts, friendOpts, aboutOpts } = this.$config
    return {
      menu: [
        { path: '/', display: true, icon: 'homefill', title: '首页' },
        { path: '/archive', display: archiveOpts.display, icon: 'archive', title: '归档' },
        { path: '/category', display: categoryOpts.display, icon: 'fenlei1', title: '分类' },
        { path: '/tag', display: tagOpts.display, icon: 'tag', title: '标签' },
        { path: '/book', display: bookOpts.display, icon: 'book', title: '书单' },
        { path: '/inspiration', display: inspirationOpts.display, icon: 'linggan', title: '灵感' },
        { path: '/friend', display: friendOpts.display, icon: 'friendaddfill', title: '友链' },
        { path: '/about', display: aboutOpts.display, icon: 'leaf', title: '关于' },
      ],
    }
  },
  computed: {
    displayMenu() {
      return this.menu.filter((o) => o.display)
    },
  },
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
