export default function Home({ $target, initialState }) {
  this.state = initialState
  const $home = document.createElement("div")
  $home.className = "home"
  $target.appendChild($home)

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (this.state) {
      $home.innerHTML = `
			<h1 class="home__title">
			훈오의 Notion에 오신것을 환영합니다😘
			</h1>`
    } else {
      $home.innerHTML = ``
    }
  }
  this.render()
}
