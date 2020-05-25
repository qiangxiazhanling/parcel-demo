import('../components/navbar.html').then(html => {
  document.getElementById('navbar').innerHTML = html
  document.getElementById('nav-todo').classList.add('active')
})