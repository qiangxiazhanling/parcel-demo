import('../components/navbar.html').then(html => {
  document.getElementById('navbar').innerHTML = html
  document.getElementById('nav-movie').classList.add('active')
})

// 获取豆瓣数据
const movieData = (start,count, callback) => {
  // 显示加载标记
  document.getElementById('loading').style.display=''
  // 请求豆瓣的api
  fetch(`https://douban-api.uieee.com/v2/movie/top250/?apikey=0df993c66c0c636e29ecbb5344252a4a&count=${count}&start=${start}`)
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
        
        //处理分页
        callback(res.total);

        // 加载数据到页面
        document.getElementById('movie-view').insertAdjacentHTML('beforeend',
          `<a href="/src/page/movieDetail.html?id=${item.id}">      
            <div class="col-md-3 p-2">
              <div class="card" style="width: 16rem;">
                <img src="${item.image}" style="height:345px" class="card-img-top">
                <div class="card-body">
                  <h5 class="pull-left">
                    ${item.title}(${item.year})  
                    <span class="text-warning">${item.average}</span> 
                  </h5>
                  <p><em>${item.original_title}</em></p>
                  ${item.genres.map(it => `<span class="badge badge-primary">${it}</span>`).join('')}
                </div>
              </div>
            </div>
          </a>`)
      })
      // 显示隐藏标记
      document.getElementById('loading').style.display='none'
    })
}

// 当前已加载数据
let nowStart = 0
// 数据总数
let total = 0

//页面滚动监听
window.onscroll = function () {
  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  let clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
  if (clientHeight + scrollTop >= scrollHeight) {
    if (total > nowStart+12) {
      nowStart+=12
      // 滚动到低时加载更多数据
      movieData(nowStart,12,_total => {
        total = _total
      })
    }
  }
}


// 加载页面初始数据
movieData(nowStart,12,_total => {
  total = _total
})