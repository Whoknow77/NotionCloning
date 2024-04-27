export const renderSidebarList = (documents) => `
<ul>
  ${documents
    .map(
      (doc) => `
      <li data-id="${doc.id}" class="document__item">
        <div class="document__item__main">
          <button class="icon-button toggle">
            ${
              doc.documents
                ? `<img src="/src/img/open.svg" alt="페이지 토글 열기 이미지"/>`
                : `<img src="/src/img/close.svg" alt="페이지 토글 닫기 이미지"/>`
            }
          </button>
          <button class="icon-button doc">
            <img src="/src/img/doc.svg" alt="페이지 이미지" />
          </button>
          <span class="text">${doc.title}</span>
          <button class="icon-button delete">
            <img src="/src/img/delete.svg" alt="페이지 삭제 이미지" />
          </button>
          <button class="icon-button add">
            <img src="/src/img/add.svg" alt="페이지 추가 이미지" />
          </button>
        </div>
        ${doc.documents && renderSidebarList(doc.documents)}
      </li>
    `,
    )
    .join("")}
</ul>
`
