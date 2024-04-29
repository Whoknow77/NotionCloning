export default function SidebarHeader({ $target, createDocument, goHome }) {
  const $sidebarHeader = document.createElement("div")
  $sidebarHeader.className = "sidebar__header"

  $target.appendChild($sidebarHeader)
  this.render = () => {
    $sidebarHeader.innerHTML = `
        <button class="sidebar__header__title">
            훈오의 Notion
        </button>
        <button class="icon-button sidebar__header__create-button">
          <img class="create-button__img" src="/src/img/add.svg" alt="페이지 생성 이미지" />
        </button>
    `
  }

  $sidebarHeader.addEventListener("click", (e) => {
    const targetButton = e.target.closest("button")
    if (targetButton) {
      if (targetButton.classList.contains("sidebar__header__create-button")) {
        createDocument()
      } else if (targetButton.classList.contains("sidebar__header__title")) {
        goHome()
      }
    }
  })

  this.render()
}
