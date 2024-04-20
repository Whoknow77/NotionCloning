import { debounce } from "../utils/debounce.js";

export default function Editor({
	$target,
	initialState = {
		title: "",
		content: "",
	},
	onEditing,
}) {
	const $editor = document.createElement("div");
	$editor.className = "editor";
	$editor.innerHTML = `
	<input type="text" name="title" placeholder="제목을 입력해주세요."/>
	<textarea name="content" class="content"></textarea>
  `;
	this.state = initialState;
	$target.appendChild($editor);

	this.setState = async (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$editor.querySelector("[name=title]").value =
			this.state.title === "새 폴더" ? "" : this.state.title;
		$editor.querySelector("[name=content]").value = this.state.content;
	};

	// 제목 입력

	const $title = $editor.querySelector("[name=title]");
	$title.addEventListener("keyup", (e) => {
		const nextState = {
			...this.state,
			title: e.target.value,
		};
		this.setState(nextState);
		onEditing(nextState);
	});

	// 디바운싱을 적용한 input change함수
	const handleContent = (e) => {
		const nextState = {
			...this.state,
			content: e.target.value,
		};
		this.setState(nextState);
		debounce(() => {
			onEditing(nextState);
		});
	};

	// 내용 입력
	const $content = $editor.querySelector("[name=content]");
	$content.addEventListener("keyup", (e) => {
		handleContent(e);
	});

	this.render();
}
