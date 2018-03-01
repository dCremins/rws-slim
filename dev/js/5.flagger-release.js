function onDocumentMouseCancel(event) {
	event.preventDefault()
	if (movingOn) {
		//
	} else {
		controls.enabled = true
		hovered = null
		canv.style.cursor = 'auto'
	}
}

function onDocumentTouchEnd(event) {
	event.preventDefault()
	if (movingOn) {
		//
	} else {
		controls.enabled = true
		hovered = null
		canv.style.cursor = 'auto'
	}
}
