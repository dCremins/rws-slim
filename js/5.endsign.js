const end = [[], [], [], [], [], [], []]

function endArray(group, checkbox) {
	const idx = end[group].indexOf(checkbox.value)

	if (idx !== -1) {				 								// If already in array
		end[group].splice(idx, 1) 					// Make sure we remove it
	}

	if (checkbox.checked) {									// If checked
		end[group].unshift(checkbox.value)	// Add to end of array
	}
}

function endSign(color, group) {
	const materials = [
		color,										// 0
		endSignMaterial				// 1
	]

	const signBase = new THREE.BoxGeometry(2.8, 2.25, 0.1)
	signBase.rotateX(-1.6)
	const signColor = new THREE.BoxGeometry(3.2, 3.2, 0.1)
	signColor.rotateX(-1.6)
	let xPos = 25

	if (Math.abs(group % 2) !== 0) {
		xPos -= 3
	}

	//signBase.rotateY(1.6)
	signBase.translate(xPos, 0.5, (-9.75 + (group * 4)))
	let image = new THREE.Mesh(signBase, endSignMaterial)
	//signColor.rotateY(1.6)
	signColor.translate(xPos, 0.48, (-10 + (group * 4)))
	let base = new THREE.Mesh(signColor, color)
	image.add(base)
	image.name = 'signGroup-' + group
	image.castShadow = true
	scene.add(image)
}
