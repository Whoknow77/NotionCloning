import { push } from "../router/router.js"
import { debounce } from "../utils/debounce.js"
import { renderSidebarList } from "../utils/renderSidebarList.js"

export default function SidebarList({
  $target,
  initialState,
  delDocument,
  addDocument,
}) {
  this.state = initialState
  const $sidebartitle = document.createElement("div")
  $sidebartitle.className = "sidebar__content"
  $target.appendChild($sidebartitle)

  $sidebartitle.addEventListener("click", ({ target }) => {
    const $button = target.closest("button")
    const $li = target.closest("li")
    if ($button) {
      const { id } = $li.dataset
      if ($button.classList.contains("toggle")) {
        const $child = $li.querySelector("ul")
        $child.classList.toggle("hidden")
        if ($child.classList.contains("hidden")) {
          $button.innerHTML = `<img src="/src/img/close.svg" alt="페이지 토글 닫기 이미지"/>`
        } else {
          $button.innerHTML = `<img src="/src/img/open.svg" alt="페이지 토글 열기 이미지"/>`
        }
      } else if ($button.classList.contains("delete")) {
        debounce(() => {
          delDocument(id)
        }, 500)
      } else if ($button.classList.contains("add")) {
        addDocument(id)
      } else {
        push(`/posts/${id}`)
      }
    } else {
      if ($li) {
        const { id } = $li.dataset
        push(`/posts/${id}`)
      }
    }
  })

  this.render = () => {
    $sidebartitle.innerHTML = renderSidebarList(this.state)
  }

  this.setState = async (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render()
}
