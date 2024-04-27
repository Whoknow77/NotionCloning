export const renderSubDocuments = (documents) => `
<ul>
${documents
	.map(
		(doc) => `<li data-id="${doc.id}" class="sub-document__item">
<button>${doc.title}</button>
</li>`
	)
	.join("")}
</ul>
`
