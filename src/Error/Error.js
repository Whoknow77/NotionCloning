export default function Error({ $target, initialState = false }) {
  this.state = initialState
  const $errorContainer = document.createElement("section")
  $errorContainer.className = "error-page"

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (this.state) {
      $errorContainer.innerHTML = `
			<h1 class="error__text">존재하지 않는 페이지 입니다.</h1>
			<button class="error__button">뒤로가기</button>
			`
    } else {
      $errorContainer.innerHTML = ``
    }
  }

  $errorContainer.addEventListener("click", (e) => {
    if (e.target.className === "error__button") {
      history.back()
    }
  })

  $target.appendChild($errorContainer)

  this.render()
}
