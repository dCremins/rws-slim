const arrows = [[], [], [], [], [], [], []]

function arrowArray(group, checkbox) {
	const idx = arrows[group].indexOf(checkbox.value)

	if (idx !== -1) {				 								// If already in array
		arrows[group].splice(idx, 1) 					// Make sure we remove it
	}

	if (checkbox.checked) {									// If checked
		arrows[group].unshift(checkbox.value)	// Add to end of array
	}
}

function arrowSign(color, group) {
	let base = new THREE.Geometry()
	let accent = new THREE.Geometry()
	let shadow = new THREE.Geometry()

	const clickGeometry = new THREE.BoxGeometry(3.5, 4, 1)
	clickGeometry.rotateY(-1.2)
	clickGeometry.center()
	const clickBox = new THREE.Mesh(clickGeometry, clickBoxMaterial)
	const clickBox2 = clickBox.clone()

	const vertical = new THREE.CylinderGeometry(.05, .05, .5, 32)
	vertical.translate(-1.1, 2.95, -16.1)
	accent.merge(vertical)
	vertical.translate(0, -0.5, 0)
	accent.merge(vertical)
	vertical.translate(0, -0.5, 0)
	accent.merge(vertical)
	vertical.translate(0, -0.47, 0)
	accent.merge(vertical)
	vertical.translate(-0.2, 0, 0)
	accent.merge(vertical)
	vertical.translate(0, -0.5, 0)
	accent.merge(vertical)

	vertical.translate(2.501, 0, 0)
	accent.merge(vertical)
	vertical.translate(0, 0.5, 0)
	accent.merge(vertical)
	vertical.translate(-0.2, 0, 0)
	accent.merge(vertical)
	vertical.translate(0, .47, 0)
	accent.merge(vertical)
	vertical.translate(0, 0.5, 0)
	accent.merge(vertical)
	vertical.translate(0, 0.5, 0)
	accent.merge(vertical)

	const horizontal = new THREE.CylinderGeometry(.05, .05, 2.601, 32)
	horizontal.rotateZ(1.58)
	horizontal.translate(-0.05, 1.75, -16.1)
	accent.merge(horizontal)
	horizontal.translate(0, -0.5, 0)
	accent.merge(horizontal)
	horizontal.translate(0, -0.5, 0)
	accent.merge(horizontal)

	const hub = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 32, 1, false, 0, 3.1)
	hub.rotateZ(1.58)
	hub.translate(1.4, 0.75, -16.1)
	accent.merge(hub)
	hub.translate(-2.9, 0, 0)
	accent.merge(hub)

	const bulb = new THREE.CylinderGeometry(.1, .1, .2, 32)
	bulb.rotateX(1.55)
	bulb.translate(-.4, 3.7, -16.1)
	accent.merge(bulb)
	bulb.translate(-.35, -.35, 0)
	accent.merge(bulb)
	bulb.translate(-.35, -.35, 0)
	accent.merge(bulb)
	bulb.translate(.7, 0, 0)
	accent.merge(bulb)
	bulb.translate(.35, 0, 0)
	accent.merge(bulb)
	bulb.translate(.35, 0, 0)
	accent.merge(bulb)
	bulb.translate(.35, 0, 0)
	accent.merge(bulb)
	bulb.translate(.35, 0, 0)
	accent.merge(bulb)
	bulb.translate(-1.75, -.35, 0)
	accent.merge(bulb)
	bulb.translate(.35, -.35, 0)
	accent.merge(bulb)
	accent.translate(0, 0, .15)
	accent.rotateY(-1.2)
	accent.center()

	const stand = new THREE.Mesh(accent, color)
	stand.castShadow = true
	clickBox.add(stand)
	const stand2 = stand.clone()
	stand2.translateOnAxis(new THREE.Vector3( 1, 0, -1 ).normalize(), .09)
	clickBox2.add(stand2)

	const board = new THREE.BoxGeometry(3, 2.2, 0.2)
	board.translate(0, 3, -16)
	base.merge(board)

	const wheel = new THREE.CylinderGeometry(0.26, 0.26, 0.26, 32)
	wheel.rotateZ(1.58)
	wheel.translate(1.4, 0.74, -16)
	base.merge(wheel)
	wheel.translate(-2.9, 0, 0)
	base.merge(wheel)
	base.rotateY(-1.2)
	base.center()
	base.translate(.025, 0, -.025)
	const sign = new THREE.Mesh(base, gray)
	sign.castShadow = true
	clickBox.add(sign)
	const sign2 = sign.clone()
	clickBox2.add(sign2)


	clickBox.name = (group+'-arrow1')
	clickBox.position.set(-1, 2.3, -16)
	scene.add(clickBox)
	flaggers.push(clickBox)


	clickBox2.name = (group+'-arrow2')
	clickBox2.rotation.set(0, -.8, 0)
	clickBox2.position.set(10, 2.3, -16)
	scene.add(clickBox2)
	flaggers.push(clickBox2)
}
