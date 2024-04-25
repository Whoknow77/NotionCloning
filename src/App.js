import Sidebar from "./Sidebar/Sidebar.js"
import EditPage from "./Edit/EditPage.js"
import {initRouter} from "./router/router.js"
import {request} from "./api/api.js"
import Home from "./Home/Home.js"
import {INITIAL_DOCUMENT} from "./constants/initialDocument.js"
import Error from "./Error/Error.js"

export default function App({$target}) {
	const home = new Home({$target, initialState: true})
	const error = new Error({$target, initialState: false})

	const sidebar = new Sidebar({
		$target,
	})
	const editpage = new EditPage({
		$target,
		initialState: INITIAL_DOCUMENT,
		onEditing: async (document) => {
			await request(`/${document.id}`, {
				method: "PUT",
				body: JSON.stringify(document),
			})
			sidebar.setState()
		},
	})

	this.render = async () => {
		const {pathname} = window.location
		sidebar.setState()
		if (pathname === "/") {
			editpage.setState(null)
			home.setState(true)
			error.setState(false)
		} else if (pathname.indexOf(`/posts/`) === 0) {
			const [, , postId] = pathname.split("/")
			editpage.setState(`${postId}`)
			home.setState(false)
			error.setState(false)
		} else {
			error.setState(true)
			home.setState(false)
		}
	}

	window.addEventListener("popstate", async () => {
		this.render()
	})
	this.render()
	initRouter(() => this.render())
}
