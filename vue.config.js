module.exports = {
  productionSourceMap: false,
  publicPath: '/',
  chainWebpack(config) {
    const cdn = {
      css: [
        '//fonts.googleapis.com/css?family=Fira+Mono|Noto+Serif+SC&display=swap',
        '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
        '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/css/github-badge.css',
      ],
      js: [
        '//cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
        '//cdn.jsdelivr.net/npm/jquery-backstretch@2.1.17/jquery.backstretch.min.js',
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
