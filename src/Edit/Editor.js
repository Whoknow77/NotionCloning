import {request} from "../api/api.js"
import {INITIAL_DOCUMENT} from "../constants/initialDocument.js"
import {push} from "../router/router.js"
import {debounce} from "../utils/debounce.js"
import {renderSubDocuments} from "../utils/renderSubDocuments.js"

export default function Editor({
	$target,
	initialState = INITIAL_DOCUMENT,
	onEditing,
}) {
	const $editor = document.createElement("div")
	$editor.className = "editor"
	$editor.innerHTML = `
	<input type="text" name="title" placeholder="제목을 입력해주세요."/>
	<textarea name="content" class="content"></textarea>
	<section class="sub-document">
	하위 문서목록
	<ul class="sub-document__list">
	</ul>
	</section>
  `

	const $title = $editor.querySelector("[name=title]")
	const $content = $editor.querySelector("[name=content]")
	const $subDocumentList = $editor.querySelector(".sub-document__list")
	this.state = initialState
	$target.appendChild($editor)

	this.setState = (nextState) => {
		this.state = nextState
		this.render()
	}

	this.render = async () => {
		const {pathname} = window.location
		const [, , postId] = pathname.split("/")
		const documents = await request(`/${postId}`)
		const subDocuments = documents.documents
		$subDocumentList.innerHTML = renderSubDocuments(subDocuments)
		$title.value = this.state.title === "새 폴더" ? "" : this.state.title
		$content.value = this.state.content
	}

	$subDocumentList.addEventListener("click", (e) => {
		const {id} = e.target.closest("li").dataset
		if (id) {
			push(`/posts/${id}`)
		}
	})

	$title.addEventListener("keyup", (e) => {
		if (e.key === "Enter") {
			$content.focus()
			$content.setSelectionRange(0, 0)
		} else {
			const nextState = {
				...this.state,
				title: e.target.value,
			}
			this.setState(nextState)
			onEditing(nextState)
		}
	})

	const handleContent = (e) => {
		const nextState = {
			...this.state,
			content: e.target.value,
		}
		this.setState(nextState)
		debounce(() => {
			onEditing(nextState)
		})
	}

	$content.addEventListener("keyup", (e) => {
		handleContent(e)
	})

	this.render()
}
