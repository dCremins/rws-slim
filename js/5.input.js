const clearCones = (group, close) => {
	// Remove old render if it exists
	if (scene.getObjectByName(group+'-cones')) {
		scene.remove(scene.getObjectByName(group+'-cones'))
	}
	if (scene.getObjectByName('signGroup-' + group)) {
		scene.remove(scene.getObjectByName('signGroup-' + group))
	}
	if (scene.getObjectByName(group+'-flagger1')) {
		scene.remove(scene.getObjectByName(group+'-flagger1'))
	}
	if (scene.getObjectByName(group+'-flagger2')) {
		scene.remove(scene.getObjectByName(group+'-flagger2'))
	}
	if (scene.getObjectByName(group+'-arrow1')) {
		scene.remove(scene.getObjectByName(group+'-arrow1'))
	}
	if (scene.getObjectByName(group+'-arrow2')) {
		scene.remove(scene.getObjectByName(group+'-arrow2'))
	}
	if (close) {
		let allSigns = document.getElementsByName('input-'+group)
		for (let i=0; i < allSigns.length; i++) {
			if (allSigns[i].type == 'checkbox') {
				allSigns[i].checked = false;
			}
			if (allSigns[i].type == 'text') {
				allSigns[i].value = '';
			}
		}
		slide('group-' + group)
	}
	flaggers = []
	render()
}

const renderCones = (group, color) => {
	clearCones(group, false)
	const shadow = new THREE.Geometry()
	const cone = coneGeometry.clone(true)
	const stripe = stripeGeometry.clone(true)
	const coneGroup = new THREE.Geometry()
	const stripeGroup = new THREE.Geometry()
	let initialX


/* Buffer */

	switch (group) {
		case 1:
			initialX = -1
			break
		case 2:
			initialX = -1.5
			break
		case 3:
			initialX = -2
			break
		case 4:
			initialX = -2.5
			break
		case 5:
			initialX = -3
			break
		case 6:
			initialX = -3.5
			break
		default:
			break
	}
	const buffer = Number(document.getElementById('buffer-' + group).value) / 50
	cone.translate(initialX, 0.75, -19)
	coneGroup.merge(cone)
	stripe.translate(initialX, 0.75, -19)
	stripeGroup.merge(stripe)

	let x = initialX
	for (let i = initialX; i >= (initialX - buffer); i-=2) {
		cone.translate(-2, 0, 0)
		coneGroup.merge(cone)
		stripe.translate(-2, 0, 0)
		stripeGroup.merge(stripe)
		x-=2
	}

/* Transition Taper */

	const upstream = Number(document.getElementById('upstream-' + group).value) / 50
	const height = 4.5
	let cones = Math.pow(upstream, 2) + Math.pow(height, 2)
	cones = Math.floor(Math.sqrt(cones)) / 2
	let spacing = upstream / cones
	let angle = height / cones
	let y = 0

	cone.translate(-2, 0, 0)
	coneGroup.merge(cone)
	stripe.translate(-2, 0, 0)
	stripeGroup.merge(stripe)
	x-=2
	let end = x - upstream

	for (let a = x; a > (end); a-=spacing) {
		cone.translate(-spacing, 0, angle)
		coneGroup.merge(cone)
		stripe.translate(-spacing, 0, angle)
		stripeGroup.merge(stripe)
		y+=angle
		x-=spacing
	}

/* Sign Spacing */
	signSpace(color, group)

/* Downstream */

	switch (group) {
		case 1:
			initialX = 10
			break
		case 2:
			initialX = 10.5
			break
		case 3:
			initialX = 11
			break
		case 4:
			initialX = 11.5
			break
		case 5:
			initialX = 12
			break
		case 6:
			initialX = 12.5
			break
		default:
			break
	}
		cone.translate(Math.abs(x)+initialX, 0, -y)
		coneGroup.merge(cone)
		stripe.translate(Math.abs(x)+initialX, 0, -y)
		stripeGroup.merge(stripe)

		x = initialX

/* Downstream Buffer */

	const downBuff = Number(document.getElementById('downbuff-' + group).value) / 50

	if (downBuff && downBuff > 0) {
		for (let i = initialX; i <= (initialX + downBuff); i+=2) {
			cone.translate(2, 0, 0)
			coneGroup.merge(cone)
			stripe.translate(2, 0, 0)
			stripeGroup.merge(stripe)
			x+=2
		}
	}

/* Downstream Taper */

	const downstream = Number(document.getElementById('downstream-' + group).value) / 50

	cone.translate(2, 0, 0)
	coneGroup.merge(cone)
	stripe.translate(2, 0, 0)
	stripeGroup.merge(stripe)
	x+=2
	cones = Math.pow(downstream, 2) + Math.pow(height, 2)
	cones = Math.floor(Math.sqrt(cones)) / 2
	spacing = downstream / cones
	angle = height / cones
	y = 0
	end = x + downstream

	for (let a = x; a < (end); a+=spacing) {
		cone.translate(spacing, 0, angle)
		coneGroup.merge(cone)
		stripe.translate(spacing, 0, angle)
		stripeGroup.merge(stripe)
		y+=angle
	}

	const groupCones = new THREE.Mesh(coneGroup, color)
	shadow.merge(coneGroup)
	const stripes = new THREE.Mesh(stripeGroup, white)
	groupCones.add(stripes)
	shadow.merge(stripeGroup)
	const coneShadow = new THREE.Mesh(shadow, shadows)
	groupCones.add(coneShadow)

	groupCones.castShadow = true
	groupCones.name = (group+'-cones')
	scene.add(groupCones)

/* Close Sidebar */
	slide('group-' + group)
	flagger(group, color)
	render()
}
