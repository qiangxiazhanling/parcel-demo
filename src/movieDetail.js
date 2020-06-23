import html from './components/navbar.html'

document.getElementById('navbar').innerHTML = html
document.getElementById('nav-movie').classList.add('active')


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
    fetch(`https://api.douban.com/v2/movie/subject/${movieId}?apikey=0df993c66c0c636e29ecbb5344252a4a`)
      .then(res => res.json())
      .then(res => {
        // 从请求结果中获取需要的数据
        localStorage.setItem(movieId, JSON.stringify(res))
        callback(res)
      })
  }
}

const torrent = title => {
  fetch(`http://www.renrencili.vip/cilisousuo/${title}.html`)
    .then(res => res.text())
    .then(res => {
      document.getElementById('loading').style.display = 'none'
      const range = document.createRange();
      const parse = range.createContextualFragment.bind(range);
      const html = parse(res)
      const tr = html.querySelectorAll('tbody')[0].querySelectorAll('tr')
      tr.forEach((item, inx) => {
        const col = item.querySelectorAll('td')
        const url = col[0].querySelectorAll('a')[0]
        if (titleFilter(url.textContent, title)) {
          document.getElementById('torrent-table').insertAdjacentHTML('beforeend',
            `<tr>
            <td class="torrent-title">${url.textContent}</td>
            <td>${col[1].textContent}</td> 
           <!--  <td>${col[2].textContent}</td> -->
           <td>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-primary" id="cat-movie-${inx}">播放</button>
              <button type="button" class="btn btn-info">下载</button>
            </div>
           </td>
          </tr>`)
          document.getElementById(`cat-movie-${inx}`).onclick = () => catMovie(url.href)
        }
      })
    })
}


const titleFilter = (content, title) => {

  return title !== '下一页' && content.search(title + '\\.') !== -1

}

const catMovie = href => {
  fetch(href)
    .then(res => res.text())
    .then(res => {
      document.getElementById('loading').style.display = 'none'
      const range = document.createRange();
      const parse = range.createContextualFragment.bind(range);
      const html = parse(res)
      const info = html.querySelectorAll('.torrent-info')[0].querySelectorAll('dd')[0].textContent
      console.info(info)
    })
}

movieData(item => {
  torrent(item.title)
  // torrent(item.original_title)
  item = {
    // 电影名
    title: item.title,
    // 原始名称
    original_title: item.original_title,
    // 发行年
    year: item.year,
    // 电影封面
    cover: item.images.small,
    // 导演
    directors: item.directors.map(it => it.name).join(' /'),
    // 编剧
    writers: item.writers.map(it => it.name).join(' /'),
    // 主演
    casts: item.casts.map(it => it.name).join(' /'),
    // 类型
    genres: item.genres.join(' /'),
    // 制片国家/地区
    countries: item.countries.join(' /'),
    // 语言
    languages: item.languages.join(' /'),
    // 上映日期
    pubdates: item.pubdates.join(' /'),
    // 片长
    durations: item.durations.join(' /'),
    // 又名
    aka: item.aka.join(' /'),
    // 简介
    summary: item.summary,
    // 评分
    average: item.rating.average
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

})