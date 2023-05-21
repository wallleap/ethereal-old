/**
 * 根据窗口宽度判断是否为移动端
 */
export const isMobile = () => document.body.clientWidth < 876

/**
 * 生成范围内随机整数
 */
export const random = (a, b) => parseInt(Math.random() * (b - a + 1) + a, 10)

/**
 * @desc 函数防抖
 * 最后一次触发
 * 场景：频繁触发、输入框搜索
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export const debounce = (func, wait, immediate) => {
  let timeout

  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * @desc 函数节流
 * 一段时间内只执行一次
 * 场景：频繁触发、onrize，onscroll滚动条
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export const throttle = (func, wait, type) => {
  if (type === 1) {
    let previous = 0
  } else if (type === 2) {
    let timeout
  }
  return function () {
    let context = this
    let args = arguments
    if (type === 1) {
      let now = Date.now()

      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

/**
 * Fisher–Yates Shuffle 洗牌算法
 */
export const shuffle = (array) => {
  let m = array.length
  let i
  while (m) {
    i = Math.floor(Math.random() * m--)
    ;[array[m], array[i]] = [array[i], array[m]]
  }
  return array
}

/**
 * url 转换
 */
export const getLocation = (href) => {
  const a = document.createElement('a')
  a.href = href
  return a
}

/**
 * 日期转换
 */
export const parseTime = (time, format = '{y}-{m}-{d} {h}:{i}:{s}') => {
  const date = new Date(time)
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 写入缓存
 */
export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

/**
 * 读取缓存
 */
export const localRead = (key, defaultValue = '') => {
  return localStorage.getItem(key) || defaultValue
}

/**
 * 图片 cdn 加速，只对时雨个人使用
 */
const isMe = location.host.includes('chanshiyu.com')
const GithubPrefix = 'raw.githubusercontent.com/chanshiyucx/yoi/master'
const JSDriverPrefix = 'cdn.jsdelivr.net/gh/chanshiyucx/yoi@latest'
export const fileCDN = (url) => {
  if (isMe && url.includes(GithubPrefix)) {
    return url.replace(GithubPrefix, JSDriverPrefix)
  }
  return url
}

/**
 * 图片尺寸处理
 */
export const handleImg = (href) => {
  const urlParams = new URLSearchParams(href.split('?')[1])
  const vw = urlParams.get('vw')
  const vh = urlParams.get('vh')
  const clientWidth = document.querySelector('main').clientWidth

  // 是否预设尺寸
  let style = ''
  let width = vw
  let height = vh
  let isFull = false
  if (width) {
    if (width > clientWidth) {
      width = clientWidth
      isFull = true
    }
    style += `width: ${width}px;`

    // 在设置宽度的情况下判断高度
    if (height) {
      height = (height * width) / vw
      style += `height: ${height}px;`
    }
  }
  return { style, isFull }
}
