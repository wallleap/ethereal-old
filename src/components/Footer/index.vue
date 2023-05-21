<template>
  <footer>
    <div class="prpr" v-if="!$isMobile.value">
      <div class="waifu" v-if="showWaifu">
        <div v-show="tips && isMini" :class="['tips', this.waifu === 'tia' && 'tia']" v-html="tips"></div>
        <canvas @click="handleClickWaifu" id="live2d" width="280" height="250" />
      </div>
      <div class="tool">
        <div class="menu" v-if="showWaifu">
          <ul>
            <li
              class="cursor"
              v-for="item in menu"
              :key="item.type"
              @click="handleClick(item.type)"
              @mouseenter="handleHover(item.type)"
            >
              <i :class="['icon', `icon-${item.icon}`]"></i>
            </li>
          </ul>
          <div class="devil">
            <i class="icon icon-emo-devil"></i>
          </div>
        </div>
        <APlayer :class="isMini && 'mini'" :audio="audio" preload="none" fixed mini @update:mini="handleUpdate" />
      </div>
    </div>
    <div class="site-info">
      <p>
        <a style="color: #b9b9b9" href="//beian.miit.gov.cn/" target="_blank">
          <img
            src="//cdn.wallleap.cn/img/logo/ICP.png"
            style="vertical-align: text-bottom; width: 17px; display: inline-block"
          />
          赣ICP备20000895号-1
        </a>
      </p>
      <p id="sitetime">{{ siteTime }}</p>
      <p class="copyright">
        Blog <a href="//myblog.wallleap.cn">{{ $config.title }}</a
        >, Copyright &copy; 2019-{{ curYear }} by <a href="//luwang.info/" target="_blank">Luwang</a>&nbsp;
        <i class="fa fa-heartbeat faa-tada animated" aria-hidden="true"></i> All Rights Reserved.
      </p>
      <div class="copyright-info">
        <div class="github-badge">
          <a rel="license" href="//luwang.info/" target="_blank" title="Copyright 2019-2020 by Luwang">
            <span class="badge-subject"><i class="fa fa-fire" aria-hidden="true"></i> Copyright</span
            ><span class="badge-value bg-blue">Luwang</span>
          </a>
        </div>
        <div class="github-badge">
          <a rel="license" href="https://github.io/" target="_blank" title="静态网页托管于Github">
            <span class="badge-subject">Hosted</span
            ><span class="badge-value bg-brightgreen"><i class="fa fa-github" aria-hidden="true"></i> Github</span></a
          >
        </div>
        <div class="github-badge">
          <a rel="license" href="//console.cloud.tencent.com/cos" target="_blank" title="腾讯云提供CDN加速服务">
            <span class="badge-subject"><i class="fa fa-firefox fa-spin" aria-hidden="true"></i> CND</span
            ><span class="badge-value bg-cdn"> COS</span></a
          >
        </div>
        <div class="github-badge">
          <a rel="license" href="https://github.com/wallleap/Ethereal" target="_blank" title="站点使用 Ethereal 主题">
            <span class="badge-subject">Theme</span><span class="badge-value bg-theme">Ethereal</span></a
          >
        </div>
        <div class="github-badge">
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            title="本站点采用知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议进行许可"
          >
            <span class="badge-subject"><i class="fa fa-copyright"></i></span
            ><span class="badge-value bg-lightgrey">BY-NC-SA 4.0</span></a
          >
        </div>
        <div class="github-badge" id="busuanzi_container_site_uv">
          <span class="badge-subject"><i class="fa fa-user" aria-hidden="true"></i> UV</span>
          <span id="busuanzi_value_site_uv" class="site_uv badge-value bg-orange">1</span>
        </div>
        <div class="github-badge" id="busuanzi_container_site_pv">
          <span class="badge-subject"><i class="fa fa-eye" aria-hidden="true"></i> PV</span>
          <span id="busuanzi_value_site_pv" class="site_pv badge-value bg-brightgreen">1</span>
        </div>
      </div>
    </div>
    <img
      v-if="!$isMobile.value"
      class="sakura cursor"
      :src="sakura"
      @click="dropPanel"
      @mouseenter="handleHover('panel')"
      alt="sakura"
    />
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import { random } from '@/utils'
import model from '@/assets/live2d/waifu.json'
import tips from '@/assets/live2d/tips.json'
import costume from '@/assets/live2d/costume.json'
import images from '@/assets/images'

const { waifuClick, hoverTips, clickTips, hitokotos } = tips
const { sakura } = images
const path = '/live2d/'

export default {
  name: 'Footer',
  data() {
    return {
      sakura,
      showWaifu: true,
      waifu: 'tia',
      menu: [
        { icon: 'venus-double', type: 'switch' },
        { icon: 't-shirt', type: 'dressup' },
        { icon: 'camera', type: 'takephoto' },
        { icon: 'comment', type: 'talk' },
        { icon: 'cancel-outline', type: 'close' },
      ],
      audio: this.$config.APlayer,
      isMini: true,
      curYear: '2021',
      siteTime: '小站已经运行0天0时0分0秒了',
    }
  },
  computed: mapState({
    tips: (state) => state.tips,
    tipsUpdateAt: (state) => state.tipsUpdateAt,
  }),
  mounted() {
    let t = new Date()
    this.curYear = t.getFullYear()
    setInterval(() => {
      this.calTime()
    }, 250)
    if (!this.$isMobile.value) {
      this.dressup()
      this.loopTips()
    }
  },
  methods: {
    dressup(switchWaifu = false) {
      if (switchWaifu) this.waifu = this.waifu === 'tia' ? 'pio' : 'tia'
      // 获取装扮
      const waifuCostume = costume[this.waifu]
      let textures
      while (!textures || textures === model.textures[0]) {
        textures = waifuCostume[random(0, waifuCostume.length - 1)]
      }
      // 获取模型
      model.model = `moc/${this.waifu}.moc`
      model.textures = [textures]
      // 设置缩放比例
      model.layout.width = this.waifu === 'tia' ? 1.82 : 2
      window.waifuModel = model
      window.loadlive2d('live2d', path, '')
    },
    loopTips() {
      setTimeout(this.loopTips, 16 * 1000)
      const now = new Date()
      if (this.tips || (this.tipsUpdateAt && now - this.tipsUpdateAt < 6000)) return
      const inx = random(0, hitokotos.length - 1)
      const nextTips = hitokotos[inx].hitokoto
      this.$store.dispatch('showTips', { tips: nextTips })
    },
    handleClickWaifu() {
      let nextTips = this.tips
      while (nextTips === this.tips) {
        const inx = random(0, waifuClick.length - 1)
        nextTips = waifuClick[inx]
      }
      this.$store.dispatch('showTips', { tips: nextTips })
    },
    handleHover(type) {
      let tips
      if (type === 'switch') {
        tips = `要召唤<span style="color: #b854d4">${
          this.waifu === 'pio' ? ' 欧内酱 Tia ' : ' 一抹多 Pio '
        } </span>么(◍˃̶ᗜ˂̶◍)✩`
      } else {
        tips = hoverTips[type]
      }
      if (!tips) return
      this.$store.dispatch('showTips', { tips })
    },
    handleClick(type) {
      switch (type) {
        case 'switch':
          this.dressup(true)
          break
        case 'dressup':
          this.dressup()
          break
        case 'takephoto':
          window.Live2D.captureName = 'waifu.png'
          window.Live2D.captureFrame = true
          this.$store.dispatch('showTips', { tips: clickTips.takePhoto })
          break
        case 'talk':
          const inx = random(0, hitokotos.length - 1)
          const tips = hitokotos[inx].hitokoto
          this.$store.dispatch('showTips', { tips })
          break
        case 'close':
          this.$store.dispatch('showTips', { tips: clickTips.close })
          setTimeout(() => {
            this.showWaifu = false
          }, 2000)
          break
        default:
          return
      }
    },
    handleUpdate(isMini) {
      this.isMini = isMini
    },
    dropPanel() {
      this.$store.commit('setShowPanel', true)
    },
    calTime() {
      let now = new Date()
      let grt = new Date('08/08/2019 17:38:00') //在此处修改你的建站时间
      now.setTime(now.getTime() + 250)
      let ynum = 0
      if (now - grt >= 31622400000) {
        let years = (now - grt) / 1000 / 60 / 60 / 24 / 356
        ynum = Math.floor(years)
      }
      let days = (now - grt) / 1000 / 60 / 60 / 24
      let dnum = Math.floor(days)
      let ddnum = dnum
      dnum = dnum - 365 * ynum
      let hours = (now - grt) / 1000 / 60 / 60 - 24 * ddnum
      let hnum = Math.floor(hours)
      if (String(hnum).length == 1) {
        hnum = '0' + hnum
      }
      let minutes = (now - grt) / 1000 / 60 - 24 * 60 * ddnum - 60 * hnum
      let mnum = Math.floor(minutes)
      if (String(mnum).length == 1) {
        mnum = '0' + mnum
      }
      let seconds = (now - grt) / 1000 - 24 * 60 * 60 * ddnum - 60 * 60 * hnum - 60 * mnum
      let snum = Math.round(seconds)
      if (String(snum).length == 1) {
        snum = '0' + snum
      }
      if (now - grt >= 31622400000) {
        this.siteTime = '小站已经运行 ' + ynum + ' 年 ' + dnum + ' 天 ' + hnum + ' 小时 ' + mnum + ' 分 ' + snum + ' 秒'
      }
      if (now - grt < 31622400000) {
        this.siteTime = '小站已经运行 ' + dnum + ' 天 ' + hnum + ' 小时 ' + mnum + ' 分 ' + snum + ' 秒'
      }
    },
  },
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
