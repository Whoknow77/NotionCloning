export const renderSubDocuments = (documents) => `
<ul class="sub-document__list">
${documents
	.map(
		(doc) => `<li data-id="${doc.id}" class="sub-document__item">
<button>${doc.title}</button>
${doc.documents && renderSubDocuments(doc.documents)}
</li>`
	)
	.join("")}
	</ul>

`
