import Sidebar from "./Sidebar/Sidebar.js";
import EditPage from "./Edit/EditPage.js";
import { initRouter } from "./router/router.js";
import { request } from "./api/api.js";
import Home from "./Home/Home.js";

export default function App({ $target }) {
	const document = {
		title: "",
		content: "",
	};

	const home = new Home({ $target, initialState: true });

	const sidebar = new Sidebar({
		$target,
	});
	const editpage = new EditPage({
		$target,
		initialState: document,
		onEditing: async (document) => {
			await request(`/${document.id}`, {
				method: "PUT",
				body: JSON.stringify(document),
			});
			sidebar.setState(); // 디바운싱or쓰로틀링 적용해야함
		},
	});

	this.render = async () => {
		const { pathname } = window.location;
		sidebar.setState();
		if (pathname.indexOf(`/posts/`) === 0) {
			const [, , postId] = pathname.split("/");
			editpage.setState(`${postId}`);
			home.setState(false);
		} else {
			// 에디터 페이지 가리기
			home.setState(true);
			editpage.setState(null);
		}
	};
	// 뒤,앞으로 가기
	window.addEventListener("popstate", async () => {
		this.render();
	});
	this.render();
	initRouter(() => this.render());
}
