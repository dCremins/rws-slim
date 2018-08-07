const clearCones = (group, close) => {
	// Remove old render if it exists
	if (scene.getObjectByName(group + '-cones')) {
		scene.remove(scene.getObjectByName(group + '-cones'))
	}
	if (scene.getObjectByName('signGroup-' + group)) {
		scene.remove(scene.getObjectByName('signGroup-' + group))
	}
	if (scene.getObjectByName(group + '-flagger1')) {
		scene.remove(scene.getObjectByName(group + '-flagger1'))
	}
	if (scene.getObjectByName(group + '-flagger2')) {
		scene.remove(scene.getObjectByName(group + '-flagger2'))
	}
	if (scene.getObjectByName(group + '-arrow1')) {
		scene.remove(scene.getObjectByName(group + '-arrow1'))
	}
	if (scene.getObjectByName(group + '-arrow2')) {
		scene.remove(scene.getObjectByName(group + '-arrow2'))
	}
	if (scene.getObjectByName('spacing-' + group)) {
		scene.remove(scene.getObjectByName('spacing-' + group))
	}
	if (scene.getObjectByName('signGroup-' + group)) {
		scene.remove(scene.getObjectByName('signGroup-' + group))
	}

	if (close) {
		const allSigns = document.getElementsByName('input-' + group)
		for (let i = 0; i < allSigns.length; i++) {
			if (allSigns[i].type === 'checkbox') {
				allSigns[i].checked = false
			}
			if (allSigns[i].type === 'text') {
				allSigns[i].value = ''
			}
		}
		signs[group] = []
		arrows[group] = []
		end[group] = []
		slide('group-' + group)
	}

	const newFlaggers = []
	for (let i = 0; i < flaggers.length; i++) {
		if (flaggers[i].name !== (group + '-flagger1') &&
		flaggers[i].name !== (group + '-flagger2') &&
		flaggers[i].name !== (group + '-arrow1') &&
		flaggers[i].name !== (group + '-arrow2')) {
			newFlaggers.push(flaggers[i])
		}
	}
	flaggers = newFlaggers
	render()
}

const renderCones = (group, color) => {
	clearCones(group, false)
	const shadow = new THREE.Geometry()
	const cone = coneGeometry.clone(true)
	const coneGroup = new THREE.Geometry()
	let initialZ
	let left = 0

	switch (group) {
		case 1:
			initialZ = -24
			break
		case 2:
			initialZ = -23.75
			break
		case 3:
			initialZ = -23.5
			break
		case 4:
			initialZ = -23.25
			break
		case 5:
			initialZ = -23
			break
		case 6:
			initialZ = -22.75
			break
		default:
			break
	}
	const buffer = Number(document.getElementById('buffer-' + group).value) / 100
	cone.translate(20, 0.75, initialZ)

	for (let i = 0; i < (Math.floor(buffer * 6)); i++) {
		cone.translate(-1.4, 0, 0)
		coneGroup.merge(cone)
		left += 1.4
	}

	const upstream = Number(document.getElementById('upstream-' + group).value) / 100
	const height = 4
	let cones = Math.floor(upstream * 6)
	let spacing = height / cones
	let translate = 0

	for (let i = 0; i < cones; i++) {
		cone.translate(-1.4, 0, spacing)
		coneGroup.merge(cone)
		left += 1.4
	}

	signSpace(left, group)

	if (upstream) {
		translate = -4
	}

	cone.translate(left + 7, 0, translate)

	const downBuff = Number(document.getElementById('downbuff-' + group).value) / 100

	if (downBuff && downBuff > 0) {
		for (let i = 0; i < (downBuff * 6); i++) {
			cone.translate(1.4, 0, 0)
			coneGroup.merge(cone)
		}
	}

	const downstream = Number(document.getElementById('downstream-' + group).value) / 100
	cones = Math.floor(downstream * 6)
	spacing = height / cones

	for (let i = 0; i < cones; i++) {
		cone.translate(1.4, 0, spacing)
		coneGroup.merge(cone)
		left += 1.4
	}

	const groupCones = new THREE.Mesh(coneGroup, color)
	shadow.merge(coneGroup)
	const coneShadow = new THREE.Mesh(shadow, shadows)
	groupCones.add(coneShadow)

	groupCones.castShadow = true
	groupCones.name = (group + '-cones')
	scene.add(groupCones)

	slide('group-' + group)
	flagger(group, color, left)

	arrowSign(color, group)

	render()
}
