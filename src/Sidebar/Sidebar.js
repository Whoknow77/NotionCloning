import SidebarList from "./SidebarList.js"
import SidebarHeader from "./SidebarHeader.js"
import { request } from "../api/api.js"
import { push } from "../router/router.js"

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("section")
  $sidebar.className = "sidebar"
  new SidebarHeader({
    $target: $sidebar,
    createDocument: async () => {
      const document = {
        title: "새 폴더",
        parent: null,
      }
      const createdDocument = await request("", {
        method: "POST",
        body: JSON.stringify(document),
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
        this.setState()
        push("/")
      } else {
        console.log("삭제가 제대로 되지 않았습니다.")
      }
    },
  })

  this.setState = async () => {
    const documents = await request("")
    sidebarList.setState(documents)
  }

  this.render = async () => {
    $target.appendChild($sidebar)
  }

  this.render()
}
