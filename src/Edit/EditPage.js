// EditPage.js
import Editor from "./Editor.js";
import { request } from "../api/api.js";

export default function EditPage({ $target, initialState, onEditing }) {
	this.state = initialState;

	const $page = document.createElement("section");
	$page.className = "editpage";
	$target.appendChild($page);

	const editor = new Editor({
		$target: $page,
		initialState: this.state,
		onEditing,
	});

	this.setState = async (nextState) => {
		const post = await request(`/${nextState}`);
		this.state = post;
		editor.setState(
			this.state || {
				title: "",
				content: "",
			}
		);
		this.render();
	};

	this.render = async () => {
		const { id } = this.state;
		// 루트 페이지에서는 에디터 페이지 가리기
		if (id) {
			$page.style.display = "flex";
		} else {
			$page.style.display = "none";
		}
	};
	this.render();
}
