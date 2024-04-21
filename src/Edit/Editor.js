import {INITIAL_DOCUMENT} from "../constants/initialDocument.js"
import {debounce} from "../utils/debounce.js"

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
  `

	const $title = $editor.querySelector("[name=title]")
	const $content = $editor.querySelector("[name=content]")
	this.state = initialState
	$target.appendChild($editor)

	this.setState = async (nextState) => {
		this.state = nextState
		this.render()
	}

	this.render = () => {
		$title.value = this.state.title === "새 폴더" ? "" : this.state.title
		$content.value = this.state.content
	}

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
