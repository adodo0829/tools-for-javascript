/**
 * 1.时间分段
 * @date {'2019-9-10 12:30:29'}
 */
export const timeFromNow = date => {
  let gap = new Date - new Date(date)
  return (
    gap < 10 * 1000 && '刚刚' ||
    gap < 60 * 1000 && '一分钟前' ||
    gap < 60 * 60 * 1000 && '一小时前' ||
    gap < 24 * 60 * 60 * 1000 && '一天内' ||
    gap < 7 * 24 * 60 * 60 * 1000 && '一星期内' ||
    gap < 12 * 30 * 24 * 60 * 60 * 1000 && '一年内' || '一年前'
  )
}

/**
 * 页面路由懒加载
 * @path String: 组件路径
 * @viewName String: 组件名
 * @return {function}
 */
export const getView = (path, viewName) => () => import(`@/views/${path}/${viewName}.vue`)

