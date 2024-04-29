import SidebarList from "./SidebarList.js"
import SidebarHeader from "./SidebarHeader.js"
import { request } from "../api/api.js"
import { push } from "../router/router.js"

export default function Sidebar({ $target, initialState = [] }) {
  this.state = initialState
  const $sidebar = document.createElement("section")
  $target.appendChild($sidebar)
  $sidebar.className = "sidebar"
  new SidebarHeader({
    $target: $sidebar,
    createDocument: async () => {
      const newDocument = {
        title: "새 폴더",
        parent: null,
      }
      this.setState([...this.state, newDocument])

      const createdDocument = await request("", {
        method: "POST",
        body: JSON.stringify(newDocument),
      })
      if (createdDocument) {
        push(`/posts/${createdDocument.id}`)
      }
    },
    goHome: () => {
      push("/")
    },
  })

  const sidebarList = new SidebarList({
    $target: $sidebar,
    initialState: [],
    addDocument: async (docId) => {
      const document = {
        title: "새 폴더",
        parent: docId,
        documents: [],
      }

      const addedDocuments = await request("", {
        method: "POST",
        body: JSON.stringify(document),
      })

      if (addedDocuments) {
        push(`/posts/${addedDocuments.id}`)
        this.setState()
      }
    },

    delDocument: async (docId) => {
      const deletedDocuments = await request(`/${docId}`, {
        method: "DELETE",
      })
      if (deletedDocuments) {
        // this.setState()
        push("/")
      } else {
        alert("삭제가 제대로 되지 않았습니다. 천천히 눌러주세요.")
      }
    },
  })

  this.setState = (nextState) => {
    this.state = nextState
    sidebarList.setState(nextState)
  }
}
