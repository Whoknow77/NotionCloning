import { renderSubDocuments } from "../utils/renderSubDocuments.js"
import { push } from "../router/router.js"
export default function SubDocuments({ $target, initialState = null }) {
  const $subDocumentContainer = $target.querySelector(".sub-document")
  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = async () => {
    if (this.state?.length > 0) {
      $subDocumentContainer.innerHTML = `
			<text class="sub-document__title">📃하위 문서목록</text>
			${renderSubDocuments(this.state)}
			`
    } else {
      $subDocumentContainer.innerHTML = ``
    }
  }

  $target.appendChild($subDocumentContainer)

  $subDocumentContainer.addEventListener("click", (e) => {
    const { id } = e.target.closest("li").dataset
    if (id && e.target.tagName === "BUTTON") {
      push(`/posts/${id}`)
    }
  })

  this.render()
}
