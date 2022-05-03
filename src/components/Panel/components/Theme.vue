<template>
  <ul class="theme">
    <li :class="['default', theme === 'default' && 'active']" @click="switchTheme('default')">
      <h3>默认主题</h3>
      <div class="preview cursor">
        <div>
          <img :src="defaultImg" alt="默认" />
        </div>
      </div>
    </li>
    <li :class="['dark', theme === 'dark' && 'active']" @click="switchTheme('dark')">
      <h3>暗黑模式</h3>
      <div class="preview cursor">
        <div>
          <img :src="darkImg" alt="暗黑" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import images from '@/assets/images'

const { preview } = images

export default {
  name: 'Theme',
  props: {
    theme: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      defaultImg: preview.default,
      darkImg: preview.dark,
    }
  },
  methods: {
    switchTheme(theme) {
      this.$emit('switchTheme', theme)
    },
  },
}
</script>

<style lang="scss" scoped>
.theme {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 14px 12px;

  h3 {
    margin-bottom: 14px;
    font-size: $font-size-larger;
    font-weight: $font-weight-normal;
    line-height: 40px;
  }

  .preview {
    position: relative;
    border-radius: 3px;

    > div {
      display: flex;
      width: 212px;
      height: 110px;
      overflow: hidden;
      background-image: linear-gradient(to top, $panel-theme-bg-from-color 0%, $panel-theme-bg-to-color 100%);
    }

    &::before {
      content: '';
      position: absolute;
      top: -4px;
      right: -4px;
      bottom: -4px;
      left: -4px;
      border-radius: 3px;
      border: $panel-theme-border solid 5px;
      transition-duration: 0.3s;
      transition-property: transform border;
    }

    &:hover::before {
      transform: scale(1.05, 1.1);
    }
  }

  .default {
    img {
      width: 212px;
      height: 110px;
    }
  }
  .dark {
    img {
      width: 212px;
      height: 110px;
    }
  }

  .active {
    h3 {
      color: $primary-deep;
    }
    .preview::before {
      border: $primary solid 5px;
    }
  }
}
</style>
