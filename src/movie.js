import html from './components/navbar.html'

document.getElementById('navbar').innerHTML = html
document.getElementById('nav-movie').classList.add('active')


// 获取豆瓣数据
const movieData = (start, count, callback) => {
  // 显示加载标记
  document.getElementById('loading').style.display = ''
  // 请求豆瓣的api

  fetch(`https://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${start}&count=${count}`)
    .then(res => res.json())
    .then(res => {
      // 从请求结果中获取需要的数据
      res.subjects.map(item => ({
        id: item.id,
        average: item.rating.average,
        title: item.title,
        genres: item.genres,
        durations: item.durations,
        original_title: item.original_title,
        year: item.year,
        image: item.images.small
      })).forEach(item => {
        // 加载数据到页面
        document.getElementById('movie-view').insertAdjacentHTML('beforeend',
          `<div class="col-md-4 col-sm-6 p-2">
            <a href="./movieDetail.html?id=${item.id}" class="text-dark">
              <div class="card" style="width: 16rem;">
                <img src="${item.image}" style="height:345px" class="card-img-top">
                <div class="card-body">
                  <h6>
                    ${item.title}(${item.year})  
                    <br/>
                    <span class="text-warning">${item.average}</span> 
                  </h6>
                  <p><em>${item.original_title}</em></p>
                  ${item.genres.map(it => `<span class="badge badge-primary">${it}</span>`).join('')}
                </div>
              </div>
            </a>
          </div>`)
      })
      callback(res.total);
      // 显示隐藏标记
      document.getElementById('loading').style.display = 'none'
    })
}

// 当前已加载数据
let nowStart = 1
// 数据总数
let total = 0

//页面滚动监听
window.onscroll = function () {
  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  let clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
  if (clientHeight + scrollTop >= scrollHeight) {
    if (total > nowStart + 10) {
      nowStart += 10
      // 滚动到低时加载更多数据
      movieData(nowStart, 10, _total => {
        total = _total
      })
    }
  }
}


// 加载页面初始数据
movieData(nowStart, 10, _total => {
  total = _total
})