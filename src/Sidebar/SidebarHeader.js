export default function SidebarHeader({ $target, createDocument, goHome }) {
	const $sidebarHeader = document.createElement("div");
	$sidebarHeader.className = "sidebar__header";

	$target.appendChild($sidebarHeader);
	this.render = () => {
		$sidebarHeader.innerHTML = `
        <button class="sidebar__header__title">
            훈오의 Notion
        </button>
        <button class="sidebar__header__create-button">
          <img class="create-button__img" src="/src/img/add.svg" alt="페이지 추가 이미지" />
        </button>
    `;
	};

	$sidebarHeader.addEventListener("click", (e) => {
		if (e.target.matches(".create-button__img")) {
			createDocument();
		} else {
			goHome();
		}
	});

	this.render();
}
