import { push } from "../router/router.js"
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
    const $sidebarButton = target.closest("button")
    const $li = target.closest("li")
    if ($sidebarButton) {
      const { id } = $li.dataset
      if ($sidebarButton.classList.contains("toggle")) {
        const $child = $li.querySelector("ul")
        $child.classList.toggle("hidden")
        if ($child.classList.contains("hidden")) {
          $sidebarButton.innerHTML = `<img src="/src/img/close.svg" alt="페이지 토글 닫기 이미지"/>`
        } else {
          $sidebarButton.innerHTML = `<img src="/src/img/open.svg" alt="페이지 토글 열기 이미지"/>`
        }
      } else if ($sidebarButton.classList.contains("delete")) {
        delDocument(id)
      } else if ($sidebarButton.classList.contains("add")) {
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
    const renderedSidebarList = renderSidebarList(this.state)
    $sidebartitle.innerHTML = renderedSidebarList
  }

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render()
}
