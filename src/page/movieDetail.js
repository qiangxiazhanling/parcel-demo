import('../components/navbar.html').then(html => {
  document.getElementById('navbar').innerHTML = html
  document.getElementById('nav-movie').classList.add('active')
})


// 获取url中的问号传值
const movieId = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[1]
// 获取豆瓣数据
const movieData = callback => {
  // 显示加载标记
  document.getElementById('loading').style.display = ''
  let item = JSON.parse(localStorage.getItem(movieId))
  if (item !== null) {
    callback(item)
  } else {
    // 请求豆瓣的api
    fetch(`/v2/movie/subject/${movieId}?apikey=0df993c66c0c636e29ecbb5344252a4a`)
      .then(res => res.json())
      .then(res => {
        // 从请求结果中获取需要的数据
        localStorage.setItem(movieId, JSON.stringify(res))
        callback(res)
      })
  }
}

movieData(item => {
  item = {
    // 电影名
    title:item.title,
    // 原始名称
    original_title:item.original_title,
    // 发行年
    year:item.year,
    // 电影封面
    cover:item.images.small,
    // 导演
    directors:item.directors.map(it => it.name).join(' /'),
    // 编剧
    writers:item.writers.map(it => it.name).join(' /'),
    // 主演
    casts:item.casts.map(it => it.name).join(' /'),
    // 类型
    genres:item.genres.join(' /'),
    // 制片国家/地区
    countries:item.countries.join(' /'),
    // 语言
    languages:item.languages.join(' /'),
    // 上映日期
    pubdates:item.pubdates.join(' /'),
    // 片长
    durations:item.durations.join(' /'),
    // 又名
    aka:item.aka.join(' /'),
    // 简介
    summary:item.summary,
    // 评分
    average:item.rating.average
  }

  //将获取到的数据添加到页面上
  document.getElementById('title').textContent = item.title
  // 添加图片
  document.getElementById('cover').src = item.cover

  // 影片信息
  document.getElementById('info').innerHTML = 
  ` 导演: ${item.directors} </br>
    编剧:  </br>
    主演:  </br>
    类型:  </br>
    制片国家/地区: </br>
    语言:  </br>
    上映日期: </br>
    片长:  </br>
    又名:  </br>`
  
  // 显示隐藏标记
  document.getElementById('loading').style.display = 'none'
})