import { INITIAL_DOCUMENT } from "../constants/initialDocument.js"
import { debounce } from "../utils/debounce.js"

export default function Editor({
  $target,
  initialState = INITIAL_DOCUMENT,
  onEditing,
}) {
  this.state = initialState
  const $editor = document.createElement("div")
  $editor.className = "editor"
  $editor.innerHTML = `
	<input type="text" name="title" placeholder="제목을 입력해주세요."/>
	<textarea name="content" class="content"></textarea>
	<section class="sub-document">
</section>
  `
  const $title = $editor.querySelector("[name=title]")
  const $content = $editor.querySelector("[name=content]")

  $target.appendChild($editor)

  const handleContent = (e) => {
    const nextState = {
      ...this.state,
      [e.target.name]: e.target.value,
    }
    if (e.key === "Enter" && e.target.name === "title") {
      $content.focus()
      $content.setSelectionRange(0, 0)
    }
    this.setState(nextState)
    debounce(() => {
      onEditing(nextState)
    }, 300)
  }

  $editor.addEventListener("keyup", (e) => {
    handleContent(e)
  })

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = async () => {
    $title.value = this.state.title === "새 폴더" ? "" : this.state.title
    $content.value = this.state.content
  }

  this.render()
}
