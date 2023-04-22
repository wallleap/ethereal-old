import fm from 'front-matter'
import { format } from 'timeago.js'
import config from '../config'
import { parseTime } from './index'

const regex = /^(.+)?\r\n\s*(.+)?\r\n/
const firstlineReg = /^(.+)?\s+/
const postReg = /^---\s+.*\s+---/s
const coverRegex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif|webp))/
export const formatPost = (post) => {
  const { body, created_at } = post
  let result = [
    `[作者: Luwang]: # "https://cdn.wallleap.cn/img/pic/cover/2023022DhqLj.jpg"`,
    `[作者: Luwang]: # "https://cdn.wallleap.cn/img/pic/cover/2023022DhqLj.jpg"`,
    firstlineReg.exec(body)[1],
  ]
  if (regex.test(body)) {
    result = regex.exec(body)
  }
  if (postReg.test(body)) {
    let coverUrl = fm(body).attributes.cover
    result = [
      `[作者: ${fm(body).attributes.author}]: # "${/^http/.test(coverUrl) ? coverUrl : 'http:' + coverUrl}"`,
      `[作者: ${fm(body).attributes.author}]: # "${/^http/.test(coverUrl) ? coverUrl : 'http:' + coverUrl}"`,
      firstlineReg.exec(fm(body).body)[1],
      fm(body),
    ]
    post.body = fm(body).body
  }
  const cover = coverRegex.exec(result[1])
  if (cover && cover.length === 3) {
    post.cover = {
      title: cover[1],
      src: cover[2],
    }
    post.description = result[2]
  } else {
    post.cover = {
      title: '',
      src: config.defaultCover,
    }
    post.description = result[1]
  }
  post.created = parseTime(created_at, '{y}-{m}-{d}')
  post.created_at = format(created_at, 'zh_CN').replace(/\s/, '')
  return post
}

/**
 * 格式化分类
 */
export const formatCategory = (category) => {
  category.forEach((o) => {
    const description = o.description.split('\r\n')
    o.summary = description[0].split('summary:')[1]
    o.cover = description[1].split('cover:')[1]
  })
  return category
}

/**
 * 格式化灵感
 */
export const formatInspiration = (inspiration) => {
  inspiration.forEach((o) => (o.date = parseTime(o.created_at, '{y}年{m}月{d}日')))
  return inspiration
}

/**
 * 格式化书单 & 友链 & 关于
 */
export const formatFriend = (friend) => {
  const { body } = friend
  let res = body.split('\r\n')
  res.forEach((item, index) => {
    res[index] = item.split(': ')[1].trim()
  })
  friend.info = {
    name: res[0],
    url: res[1],
    avatar: res[2],
    desc: res[3],
  }
  return friend
}
export const formatPage = (data, type) => {
  if (!data || !data.body) return []
  let section = data.body.split('## ').filter((o) => o.length)

  switch (type) {
    case 'book':
    case 'friend':
      section = section.map((o) => {
        const content = o.split('\r\n').filter((o) => o.length)
        const result = {}
        content.forEach((row, index) => {
          if (index === 0) {
            result.name = row
          } else {
            const inx = row.indexOf(':')
            const key = row.slice(0, inx)
            const value = row.slice(inx + 1)
            result[key] = value
          }
        })
        return result
      })
      break
    case 'about':
      section = section.map((o) => {
        const title = o.match(/.+?\r\n/)[0]
        return {
          title,
          content: o.slice(title.length),
        }
      })
      break
    default:
      break
  }
  // 移除首尾空格
  section.forEach((item) => {
    Object.keys(item).forEach((k) => {
      item[k] = item[k].trim()
    })
  })

  return section
}
