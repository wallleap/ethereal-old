import { format } from 'timeago.js'
import { parseTime } from './index'
import config from '../config'

/**
 * 格式化文章
 *
 * 现在开头是[] ……这样的
 * 希望修改为：
 * <!-- {……} -->  注释样式，里面放json数据，可以设置一些参数
 */
/*
 <!--
 {
 "summary":"渺小如我们，是风吹动水面，是蝴蝶一次振翅。在正确的位置，也能掀起远方的风暴；找到那个支点，也能撬动地球。"
 }
 -->

 BlogService.decorateBlog的内容如下，用来解析注释内容，赋值给blog.meta
     decorateBlog: function(blog) {
       var e, meta, metaStr;
       if (!blog.body) {
         return blog;
       }
       metaStr = blog.body.substring(0, blog.body.indexOf('-->'));
       metaStr = metaStr.replace(/\n|\r|<!-{2,}/gm, ' ');
       try {
         meta = JSON.parse(metaStr);
       } catch (_error) {
         e = _error;
         console.log(e);
       }
       blog.meta = meta;
       if (blog.meta.summary) {
         BlogRemoteService.renderMarkdown(blog.meta.summary).then(function(data) {
           return blog.meta.summary = data;
         });
       }
       return blog;
  }
 ————————————————
 版权声明：本文为CSDN博主「ebay」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
 原文链接：https://blog.csdn.net/ebay/article/details/44492009
 */
const regex = /^(.+)?\r\n\s*(.+)?\r\n/
const coverRegex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif))/
export const formatPost = (post) => {
  const { body, created_at } = post
  const result = regex.exec(body)
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
