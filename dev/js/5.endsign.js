const end = [[], [], [], [], [], [], []]

function endArray(group, checkbox) {
	const idx = end[group].indexOf(checkbox.value)

	if (idx !== -1) {
		end[group].splice(idx, 1)
	}

	if (checkbox.checked) {
		end[group].unshift(checkbox.value)
	}
}

function endSign(color, group) {
	if (end[group].length < 0) {
		return
	}
	const signBase = new THREE.BoxGeometry(2.8, 2.25, 0.1)
	signBase.rotateX(-1.6)
	const signColor = new THREE.BoxGeometry(3.2, 3.2, 0.1)
	signColor.rotateX(-1.6)
	let xPos = 25

	if (Math.abs(group % 2) !== 0) {
		xPos -= 3
	}

	signBase.translate(xPos, 0.5, (-9.75 + (group * 4)))
	const image = new THREE.Mesh(signBase, endSignMaterial)
	signColor.translate(xPos, 0.48, (-10 + (group * 4)))
	const base = new THREE.Mesh(signColor, color)
	image.add(base)
	image.name = 'signGroup-' + group
	image.castShadow = true
	scene.add(image)
}
