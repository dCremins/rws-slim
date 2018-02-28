function onDocumentMouseMove(event) {
	event.preventDefault()
	// Subtract the extra space on the left and top and dicide by width and height
	const browserWidth = (event.clientX - rect.left) / canv.clientWidth
	const browserHeight = (event.clientY - rect.top) / canv.clientHeight
	mouse.x = browserWidth * 2
	mouse.y = -(browserHeight * 2)

	raycaster.setFromCamera(mouse, camera)
	const people = raycaster.intersectObjects(flaggers)

	// When mouse is over an object in the flaggers array, change to pointer
	if (people.length > 0) {
		// If the object is in the flaggers array, make it the selected object
		if (hovered !== people[0].object) {
			hovered = people[0].object
		}
		canv.style.cursor = 'pointer'
	} else {
		hovered = null
		canv.style.cursor = 'auto'
	}
}

// Controls modified from above to suit touch Controls

function onDocumentTouchMove(event) {
	event.preventDefault()
	event = event.changedTouches[0]
	// Subtract the extra space on the left and top and dicide by width and height
	const browserWidth = (event.clientX - rect.left) / canv.clientWidth
	const browserHeight = (event.clientY - rect.top) / canv.clientHeight
	mouse.x = browserWidth * 2
	mouse.y = -(browserHeight * 2)

	raycaster.setFromCamera(mouse, camera)
	const ground = raycaster.intersectObject(objectPlane)

	// Touch controls don't need to change selected to dragged
	// Because there is no hover with a touch control
	if (selected) {
		if (ground.length > 0) {
			selected.position.set(ground[0].point.x, selected.position.y, ground[0].point.z)
			render()
		}
	}
}
