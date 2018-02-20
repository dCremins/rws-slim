// const canv = renderer.domElement
// const rect = canv.getBoundingClientRect()

function onDocumentMouseCancel(event) {
	event.preventDefault()
	if (!movingOn) {
		controls.enabled = true
		hovered = null
		canv.style.cursor = 'auto'
	}
}

function onDocumentTouchEnd(event) {
	event.preventDefault()
	if (!movingOn) {
		controls.enabled = true
		hovered = null
		canv.style.cursor = 'auto'
	}
}
