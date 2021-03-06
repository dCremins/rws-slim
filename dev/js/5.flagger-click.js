const canv = renderer.domElement
const rect = canv.getBoundingClientRect()
let yHolder
let currentHex = []
let movingOn = false

function onDocumentMouseDown(event) {
	event.preventDefault()
	if (hovered) {
		const flaggerMan = hovered.children
		const flaggerMaterial = hovered.children[0].material

		if (movingOn) {
			mouse.x = (((event.clientX - rect.left) / canv.clientWidth) * 2) - 1
			mouse.y = -(((event.clientY - rect.top) / canv.clientHeight) * 2) + 1
			raycaster.setFromCamera(mouse, camera)
			const ground = raycaster.intersectObject(objectPlane)
			if (ground.length > 0) {
				if (hovered.name.endsWith('2')) {
					hovered.position.set(ground[0].point.x - 2.5, yHolder, ground[0].point.z - 3)
				} else {
					hovered.position.set(ground[0].point.x + 2.5, yHolder, ground[0].point.z - 3.5)
				}
			}

			let i = 0
			flaggerMan.forEach(child => {
				child.material = currentHex[i]
				i++
			})
			currentHex = []

			movingOn = false
			container.addEventListener('mousemove', onDocumentMouseMove, false)
		} else {
			container.removeEventListener('mousemove', onDocumentMouseMove, false)
			movingOn = true
			yHolder = hovered.position.y

			flaggerMan.forEach(child => {
				currentHex.push(child.material)
			})

			glow.color.setHex(flaggerMaterial.color.getHex())

			flaggerMan.forEach(child => {
				child.material = glow
			})

			hovered.position.set(hovered.position.x, hovered.position.y + 1, hovered.position.z)
		}
		render()
	}
}

function onDocumentTouchStart(event) {
	event.preventDefault()
	event = event.changedTouches[0]
	mouse.x = (((event.clientX - rect.left) / canv.clientWidth) * 2) - 1
	mouse.y = -(((event.clientY - rect.top) / canv.clientHeight) * 2) + 1

	raycaster.setFromCamera(mouse, camera)
	const people = raycaster.intersectObjects(flaggers)
	const ground = raycaster.intersectObject(objectPlane)
	if (people.length > 0) {
		if (hovered !== people[0].object) {
			hovered = people[0].object
		}
	}

	if (hovered) {
		const flaggerMan = hovered.children
		const flaggerMaterial = hovered.children[0].material
		if (movingOn) {
			if (ground.length > 0) {
				hovered.position.set(ground[0].point.x, yHolder, ground[0].point.z - 3)
			}

			let i = 0
			flaggerMan.forEach(child => {
				child.material = currentHex[i]
				i++
			})
			currentHex = []
			movingOn = false
			container.addEventListener('touchmove', onDocumentTouchMove, false)
		} else {
			container.removeEventListener('touchmove', onDocumentTouchMove, false)
			movingOn = true
			yHolder = hovered.position.y

			flaggerMan.forEach(child => {
				currentHex.push(child.material)
			})

			glow.color.setHex(flaggerMaterial.color.getHex())

			flaggerMan.forEach(child => {
				child.material = glow
			})
			hovered.position.set(hovered.position.x, hovered.position.y + 1, hovered.position.z)
		}
		render()
	}
}
