export default function SidebarHeader({ $target, addDocument }) {
  const $sidebarHeader = document.createElement('div');
  $sidebarHeader.className = 'sidebar__header';

  $target.appendChild($sidebarHeader);
  this.render = () => {
    $sidebarHeader.innerHTML = `
        <span class="sidebar__header__title">
            훈오의 Notion
        </span>
        <button class="add">
        <img src="/public/assets/img/add.svg" alt="페이지 추가 이미지" />
        </button>
    `;
  };

  $sidebarHeader.addEventListener('click', (e) => {
    const $button = e.target.closest('button');
    if ($button) {
      addDocument();
    }
  });

  this.render();
}
