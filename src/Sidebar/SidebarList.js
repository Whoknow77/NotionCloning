import {push} from "../router/router.js"

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
	const renderTree = (documents) => `
  <ul>
    ${documents
			.map(
				(doc) => `
        <li data-id="${doc.id}" class="document__item">
          <div class="document__item__main">
            <button class="icon-button toggle">
              ${
								doc.documents
									? `<img src="/src/img/open.svg" alt="페이지 토글 열기 이미지"/>`
									: `<img src="/src/img/close.svg" alt="페이지 토글 닫기 이미지"/>`
							}
            </button>
            <button class="icon-button doc">
              <img src="/src/img/doc.svg" alt="페이지 이미지" />
            </button>
            <span class="text">${doc.title}</span>
            <button class="icon-button delete">
              <img src="/src/img/delete.svg" alt="페이지 삭제 이미지" />
            </button>
            <button class="icon-button add">
              <img src="/src/img/add.svg" alt="페이지 추가 이미지" />
            </button>
          </div>
          ${doc.documents && renderTree(doc.documents)}
        </li>
      `
			)
			.join("")}
  </ul>
`

	$sidebartitle.addEventListener("click", ({target}) => {
		const $button = target.closest("button")
		const $li = target.closest("li")
		const {id} = $li.dataset
		if ($button) {
			if ($button.classList.contains("toggle")) {
				const $child = $li.querySelector("ul")
				$child.classList.toggle("hidden")
				if ($child.classList.contains("hidden")) {
					$button.innerHTML = `<img src="/src/img/close.svg" alt="페이지 토글 닫기 이미지"/>`
				} else {
					$button.innerHTML = `<img src="/src/img/open.svg" alt="페이지 토글 열기 이미지"/>`
				}
			} else if ($button.classList.contains("delete")) {
				delDocument(id)
			} else if ($button.classList.contains("add")) {
				addDocument(id)
			} else {
				push(`/posts/${id}`)
			}
		} else {
			push(`/posts/${id}`)
		}
	})

	this.render = () => {
		$sidebartitle.innerHTML = renderTree(this.state)
	}

	this.setState = async (nextState) => {
		this.state = nextState
		this.render()
	}

	this.render()
}
