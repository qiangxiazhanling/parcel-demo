// 加载导航栏组件
import('./src/components/navbar.html').then(html => {
  // 渲染组件到页面
  document.getElementById('navbar').innerHTML = html
  // 设置为当前页面为高亮
  document.getElementById('nav-index').classList.add('active')
})