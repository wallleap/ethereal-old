/**
 * Aurora 主题配置文件
 * 食用指南：https://github.com/chanshiyucx/blog/issues/41
 * 联系作者：Blog https://chanshiyu.com      QQ 1124590931
 */

export default {
  /**
   * =========================================================
   *                      站点功能【必需】
   * =========================================================
   */

  /**
   * 站点标题
   */
  title: 'wallleap',
  subtitle: 'ルー・ワン',

  /**
   * Github Issues 配置
   */
  username: 'wallleap', // github 用户名
  repository: 'AuroraBlog', // 文章仓库地址
  token: ['ghp_8h9cFarnHyNfAlv', 'D9aZL9SEKVbxdMe0lzGA6 '],
  // token: ['0ad1a0539c5b96fd18fa', 'aaafba9c7d1362a5746c'], // token 从中间任意位置拆开成两部分，避免 github 代码检测失效

  // Comments
  comments: ['Valine', 'Gitalk'],

  /**
   * Gitalk 配置，文档详见：https://github.com/gitalk/gitalk
   */
  gitalk: {
    clientID: '41b93cc54cd870d86eb4',
    clientSecret: '916b274cebd4fd0f6ee6f971f3fbcd024fa878ee',
    repo: 'auroraComment', // 评论仓库地址
    owner: 'wallleap',
    admin: ['wallleap'],
    distractionFreeMode: false, // 是否开始无干扰模式【背景遮罩】
    proxy: 'https://bokegitalkcors.herokuapp.com/https://github.com/login/oauth/access_token',
  },

  /**
   * leancloud 配置 【注意切换为国际版】
   */
  leancloud: {
    appId: 'zGSs6NeL8XrO61kH7uNOu2Iz-MdYXbMMI',
    appKey: 'zrR76W2dRogjUXiiPdjVLF57',
  },

  /**
   * =========================================================
   *                        页面设置
   * =========================================================
   */

  /**
   * 归档页面
   */
  archiveOpts: {
    display: true, // 是否显示该页面
    enableComment: false, // 是否开启评论功能
    qoute: '華枝春滿 天心月圓', // 页面顶部一言
  },

  /**
   * 分类页面
   */
  categoryOpts: {
    display: true,
    enableComment: false,
    qoute: '桜華月想 暮色蒼然',
  },

  /**
   * 标签配置
   */
  tagOpts: {
    display: true,
    enableComment: false,
    qoute: '灯笼流丽，百鬼夜行',
  },

  /**
   * 灵感页面
   */
  inspirationOpts: {
    display: true,
    enableComment: true,
    qoute: '詠奏妖華，明鏡止水',
  },

  /**
   * 书单页面
   */
  bookOpts: {
    display: true,
    enableComment: true,
    qoute: '追想風景 彼岸帰航',
  },

  /**
   * 友链页面
   */
  friendOpts: {
    display: true,
    enableComment: true,
    qoute: '青青子衿，悠悠我心',
  },

  /**
   * 关于页面
   */
  aboutOpts: {
    display: true,
    enableComment: true,
    qoute: '千里之行 始于足下',
    avatar: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/img/custom/avatar.jpg',
    graduated: 'East China University of Technology (ECUT)',
    college: 'Network Engineering',
    contact: [
      {
        icon: '//cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/email.png',
        // link: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=tNnR9Nfc1drH3N3NwZrX29k',
        link: 'mailto:15579576761@163.com',
      },
      {
        icon: '//cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/github.png',
        link: 'https://github.com/wallleap',
      },
      {
        icon: '//cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/music.png',
        link: 'https://music.163.com/#/user/home?id=453867086',
      },
      {
        icon: '//cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/telegram.png',
        link: 'https://t.me/wallleap',
      },
      {
        icon: '//cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/twitter.png',
        link: 'https://twitter.com/luwang1997',
      },
      // {
      //   icon: '//cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/rsshub.png',
      //   link: 'https://rsshub.app/github/issue/chanshiyucx/blog',
      // },
    ],
  },

  /**
   * =========================================================
   *                         主题自定义
   * =========================================================
   */

  /**
   * 加载动画
   */
  loadingImg: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/img/loading/loading.gif',

  /**
   * 文章默认图
   */
  defaultCover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/img/post/1.jpg',

  /**
   * 赛钱箱
   */
  qrcode: [
    {
      name: '支付宝',
      img: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/img/custom/donate/AliPayQR.jpg',
    },
    {
      name: '微信',
      img: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/img/custom/donate/WeChatQR.jpg',
    },
  ],

  /**
   * 音乐播放器,
   */
  APlayer: [
    {
      name: 'Valder Fields',
      artist: 'Tamas Wells',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/1.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/1.jpg',
    },
    {
      name: '仰望',
      artist: '明望组合',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/2.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/2.jpg',
    },
    {
      name: '笑',
      artist: '太一',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/3.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/3.jpg',
    },
    {
      name: '藏',
      artist: '徐梦圆/双笙',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/4.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/4.jpg',
    },
    {
      name: '桥路不相逢',
      artist: '浩蓝',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/5.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/5.jpg',
    },
    {
      name: '情话微甜',
      artist: '王圣锋/李朝',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/6.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/6.jpg',
    },
    {
      name: '最美情侣',
      artist: '白小白',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/7.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/7.jpg',
    },
    {
      name: '拜托',
      artist: '孙晨',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/8.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/8.jpg',
    },
    {
      name: '恶人',
      artist: '孙子涵/Xun(易硕成)',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/9.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/9.jpg',
    },
    {
      name: '城外',
      artist: '蔡旻佑',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/10.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/10.jpg',
    },
    {
      name: '洋葱',
      artist: '王俊凯/王源',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/11.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/11.jpg',
    },
    {
      name: '烈酒',
      artist: '屈原',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/12.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/12.jpg',
    },
    {
      name: '透明',
      artist: '郑国锋',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/13.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/13.jpg',
    },
    {
      name: '再见了我的爱',
      artist: '至上励合',
      url: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/14.mp3',
      cover: '//cdn.jsdelivr.net/gh/wallleap/cdn@latest/musics/14.png',
    },
  ],

  /**
   * 主题配色，主要用于文章、灵感、关于等卡片配色
   * 推荐一个超棒的取色站，日本の伝統色：http://nipponcolors.com/
   */
  themeColors: [
    '#B28FCE', // 薄
    '#86C166', // 苗
    '#F596AA', // 桃
    '#F19483', // 曙
    '#F9BF45', // 玉子
    '#FAD689', // 浅黄
    '#E79460', // 洗柿
    '#2EA9DF', // 露草
    '#FB966E', // 洗朱
    '#BC9F77', // 白茶
    '#867835', // 黄海松茶
    '#B9887D', // 水がき
  ],
}
