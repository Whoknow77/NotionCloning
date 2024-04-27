// EditPage.js
import Editor from "./Editor.js"
import { request } from "../api/api.js"
import { INITIAL_DOCUMENT } from "../constants/initialDocument.js"

export default function EditPage({
  $target,
  initialState = INITIAL_DOCUMENT,
  onEditing,
}) {
  this.state = initialState
  const $editpage = document.createElement("section")
  $editpage.className = "editpage"
  $target.appendChild($editpage)

  const editor = new Editor({
    $target: $editpage,
    initialState: this.state,
    onEditing,
  })

  this.setState = async (postId) => {
    if (postId) {
      const post = await request(`/${postId}`)
      this.state = post
      editor.setState(post || INITIAL_DOCUMENT)
    } else {
      this.state = null
      editor.setState(INITIAL_DOCUMENT)
    }

    this.render()
  }

  this.render = () => {
    if (this.state && this.state.id) {
      $editpage.style.display = "block"
    } else {
      $editpage.style.display = "none"
    }
  }
  this.render()
}
