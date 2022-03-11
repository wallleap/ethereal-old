module.exports = {
  productionSourceMap: false,
  publicPath: '/',
  chainWebpack(config) {
    const cdn = {
      css: [
        '//fonts.googleapis.com/css?family=Fira+Mono|Noto+Serif+SC&display=swap',
        '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        '//at.alicdn.com/t/font_3239940_85f08jcx0ca.css',
        '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/css/github-badge.css',
        '//cdn.bootcdn.net/ajax/libs/font-awesome-animation/0.3.0/font-awesome-animation.min.css',
        // '//cdn.jsdelivr.net/npm/font-awesome-animation@1.1.1/css/font-awesome-animation.min.css',
      ],
      js: [
        '//cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
        '//cdn.jsdelivr.net/npm/jquery-backstretch@2.1.17/jquery.backstretch.min.js',
        '//cdn.jsdelivr.net/npm/twikoo@1.5.0/dist/twikoo.all.min.js',
      ],
    }
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn
      return args
    })
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~@/styles/variables.scss";
          @import "~@/styles/mixin.scss";
        `,
      },
    },
  },
}
