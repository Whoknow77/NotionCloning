// EditPage.js
import Editor from "./Editor.js"
import {request} from "../api/api.js"
import {INITIAL_DOCUMENT} from "../constants/initialDocument.js"

export default function EditPage({$target, initialState, onEditing}) {
	this.state = initialState
	const $editpage = document.createElement("section")
	$editpage.className = "editpage"
	$target.appendChild($editpage)

	const editor = new Editor({
		$target: $editpage,
		initialState: this.state,
		onEditing,
	})

	this.setState = async (nextState) => {
		if (nextState) {
			const post = await request(`/${nextState}`)
			this.state = post
			editor.setState(this.state || INITIAL_DOCUMENT)
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
