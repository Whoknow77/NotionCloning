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

  const filterDeleteDocuments = (documents, targetId) => {
    return documents.filter((document) => {
      if (document.documents.length > 0) {
        return filterDeleteDocuments(document.documents, targetId)
      } else {
        return targetId !== document.id
      }
    })
  }

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
      } else {
        alert("새 문서가 생성되지 않았습니다. 다시 시도해주세요.")
      }
    },

    delDocument: async (docId) => {
      const filteredDeleteDocuments = filterDeleteDocuments(
        this.state,
        Number(docId),
      )
      this.setState(filteredDeleteDocuments)

      const deletedDocuments = await request(`/${docId}`, {
        method: "DELETE",
      })
      if (deletedDocuments) {
        push("/")
      } else {
        alert("삭제에 실패했습니다. 다시 시도해주세요.")
      }
    },
  })

  this.setState = (nextState) => {
    this.state = nextState
    sidebarList.setState(nextState)
  }
}
