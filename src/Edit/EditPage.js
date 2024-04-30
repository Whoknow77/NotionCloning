// EditPage.js
import Editor from "./Editor.js"
import { request } from "../api/api.js"
import { INITIAL_DOCUMENT } from "../constants/initialDocument.js"
import SubDocuments from "./SubDocuments.js"

export default function EditPage({
  $target,
  initialState = INITIAL_DOCUMENT,
  onEditing,
}) {
  this.state = initialState
  const $edit = document.createElement("section")
  $edit.className = "edit"
  $target.appendChild($edit)

  const editor = new Editor({
    $target: $edit,
    initialState: this.state,
    onEditing,
  })

  const subDocuments = new SubDocuments({
    $target: $edit,
    initialState: null,
  })

  this.setState = async (postId) => {
    if (postId) {
      const { pathname } = window.location
      const [, , postId] = pathname.split("/")
      const post = await request(`/${postId}`)
      const subDoc = post.documents
      this.state = post
      editor.setState(post || INITIAL_DOCUMENT)
      subDocuments.setState(subDoc)
    } else {
      this.state = INITIAL_DOCUMENT
      editor.setState(INITIAL_DOCUMENT)
      subDocuments.setState(null)
    }

    this.render()
  }

  this.render = () => {
    if (this.state && this.state.id) {
      $edit.style.display = "block"
    } else {
      $edit.style.display = "none"
    }
  }
  this.render()
}
