module.exports = {
  productionSourceMap: false,
  publicPath: '/',
  chainWebpack(config) {
    const cdn = {
      css: [
        '//fonts.googleapis.com/css?family=Fira+Mono|Noto+Serif+SC&display=swap',
        '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        '//cdn.wallleap.cn/css/github-badge.css',
        '//cdn.bootcdn.net/ajax/libs/font-awesome-animation/0.3.0/font-awesome-animation.min.css',
        // '//cdn.jsdelivr.net/npm/font-awesome-animation@1.1.1/css/font-awesome-animation.min.css',
      ],
      js: [
        '//cdn.wallleap.cn/js/jquery@3.4.1.min.js',
        '//cdn.wallleap.cn/js/jquery@2.1.17.backstretch.min.js',
        '//cdn.staticfile.org/twikoo/1.6.7/twikoo.all.min.js',
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
