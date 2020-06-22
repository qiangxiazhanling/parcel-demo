
import html from './components/navbar.html'

document.getElementById('navbar').innerHTML = html
document.getElementById('nav-torrent').classList.add('active')


// //获取磁力数据
// const List = keyword => {
//   if (keyword === '') {
//     return
//   }
//   // 显示加载标记
//   document.getElementById('loading').style.display = ''
//   // 请求豆瓣的api
//   fetch(`/api/${keyword}`)
//     .then(res => res.json())
//     .then(res => {
//       res.content.forEach(item => {
//         document.getElementById('tbody').insertAdjacentHTML('beforeend',
//           `<tr>
//             <td>
//               <a href="${item.href}">${item.title}</a>
//             </td>
//           </tr>`)
//       })
//       document.getElementById('loading').style.display = 'none'
//     })
// }

// document.getElementById('loading').style.display = 'none'

// jQuery('#search').bind('keyup', event => {
//   if (event.keyCode === 13) {
//     List(document.getElementById('search').value)
//   }
// })