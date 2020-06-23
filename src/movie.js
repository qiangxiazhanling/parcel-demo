import html from './components/navbar.html'

document.getElementById('navbar').innerHTML = html
document.getElementById('nav-movie').classList.add('active')


const tags = [
  '热门', '最新', '经典', '冷门佳片', '华语', '欧美', '韩国', '日本', '动作', '喜剧', '爱情', '科幻', '悬疑', '恐怖', '文艺',
]
let tag = tags[0]
// 当前已加载数据
let nowStart = 0


tags.forEach((item, inx) => {
  document.getElementById('tags').insertAdjacentHTML('beforeend', `
    <li class="nav-item" id="tag-${inx}" onclick="">
      <span id="tag-span-${inx}" class="pl-1 pr-1 text-secondary">
        ${item}
      </span>
    </li>`)
  document.getElementById(`tag-${inx}`).onclick = () => changetag(inx)
})

const changetag = inx => {
  tags.forEach((item, inx) => {
    document.getElementById(`tag-span-${inx}`).classList.remove('text-success')
    document.getElementById(`tag-span-${inx}`).classList.add('text-secondary')
  })
  document.getElementById(`tag-span-${inx}`).classList.remove('text-secondary')
  document.getElementById(`tag-span-${inx}`).classList.add('text-success')
  document.getElementById('movie-view').innerHTML = ''
  nowStart = 0
  tag= tags[inx]
  movieData(nowStart,20)
}


document.getElementById('tag-span-0').classList.remove('text-secondary')
document.getElementById('tag-span-0').classList.add('text-success')
// 获取豆瓣数据
const movieData = (start, count) => {
  // 显示加载标记
  document.getElementById('loading').style.display = ''
  // 请求豆瓣的api
  fetch(`https://movie.douban.com/j/search_subjects?type=movie&tag=${tag}&sort=recommend&page_limit=${count}&page_start=${start}`)
    .then(res => res.json())
    .then(res => {
      // 从请求结果中获取需要的数据
      res.subjects.forEach(item => {
        // 加载数据到页面
        document.getElementById('movie-view').insertAdjacentHTML('beforeend',
          `<div class="col-md-4 col-sm-6 p-2">
            <a href="./movieDetail.html?id=${item.id}" class="text-dark">
              <div class="card">
                <img src="${item.cover}" style="height:305px" class="card-img-top">
                <div class="card-body">
                    ${item.title}
                    <span class="text-warning">${item.rate}</span> 
                </div>
              </div>
            </a>
          </div>`)
      })
      // 显示隐藏标记
      document.getElementById('loading').style.display = 'none'
    })
}



//页面滚动监听
window.onscroll = function () {
  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  let clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
  if (clientHeight + scrollTop >= scrollHeight) {
    nowStart += 20
    // 滚动到低时加载更多数据
    movieData(nowStart, 20)
  }
}


// 加载页面初始数据
movieData(nowStart, 20)