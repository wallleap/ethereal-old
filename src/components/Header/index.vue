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
              <i :class="['ethefont', `icon-${menu.icon}`]"></i>
              {{ menu.title }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="site-admin">
        <a class="travel-box" href="//travellings.link" target="_blank" show="开往">
          <img src="https://travellings.link/assets/logo.svg" alt="开往" />
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
        { path: '/', display: true, icon: 'home', title: '首页' },
        { path: '/archive', display: archiveOpts.display, icon: 'archives', title: '归档' },
        { path: '/category', display: categoryOpts.display, icon: 'category', title: '分类' },
        { path: '/tag', display: tagOpts.display, icon: 'tags', title: '标签' },
        { path: '/book', display: bookOpts.display, icon: 'books', title: '书单' },
        { path: '/inspiration', display: inspirationOpts.display, icon: 'inspire', title: '灵感' },
        { path: '/friend', display: friendOpts.display, icon: 'friends', title: '友链' },
        { path: '/about', display: aboutOpts.display, icon: 'about', title: '关于' },
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
