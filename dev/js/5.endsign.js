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

function endSign(position, group) {
	if (end[group].length > 0) {
		const signBase = new THREE.BoxGeometry(6, 0.2, 6)
		signBase.translate((position - 0.5), 0.5, (-22 + (8 * group)))

		const image = new THREE.Mesh(signBase, endSignMaterial)

		image.name = 'signGroup-' + group
		image.castShadow = true
		scene.add(image)

		position += 6.2
	}

	signText(group, position, signs[group])
}
