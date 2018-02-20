function flagger(group, color) {
	const vest = new THREE.Geometry()
	const stripes = new THREE.Geometry()
	const pants = new THREE.Geometry()
	const groupColor = new THREE.Geometry()
	const skin = new THREE.Geometry()
	const shadow = new THREE.Geometry()

	const clickGeometry = new THREE.BoxGeometry(1.7, 2, 1)
	clickGeometry.rotateY(-.5)
	clickGeometry.center()
	clickGeometry.translate(.05, 0, 0)
	const clickBox = new THREE.Mesh(clickGeometry, clickBoxMaterial)

/* Group Color */
	const torso = new THREE.BoxGeometry(1, 1.4, 0.8)
	torso.translate(0, 0.1, 0)
	torso.vertices[0].z -= 0.15
	torso.vertices[0].x -= 0.15
	torso.vertices[1].z += 0.15
	torso.vertices[1].x -= 0.15
	torso.vertices[4].z += 0.15
	torso.vertices[4].x += 0.15
	torso.vertices[5].z -= 0.15
	torso.vertices[5].x += 0.15
	torso.rotateY(-.5)
	torso.translate(.45, 0, .7)
	torso.scale(0.5, 0.5, 0.5)
	groupColor.merge(torso)

	const dome = new THREE.SphereGeometry(0.2, 32, 32, 1, 6.3, 0, 1.5)
	dome.translate(0, 0.7, 0)
	const brim = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32)
	brim.translate(0, 0.72, 0.1)
	dome.merge(brim)
	dome.rotateY(-.5)
	dome.translate(.225, 0, .345)
	groupColor.merge(dome)

	const sign = new THREE.CylinderGeometry(.4, .4, .1, 8)
	sign.translate(.75, .25, -.55)
	sign.rotateZ(1.25)
	sign.rotateY(.75)
	sign.rotateX(.5)
	groupColor.merge(sign)
	groupColor.center()
	groupColor.translate(0, .2, 0)
	const coreColor = new THREE.Mesh(groupColor, color)
	coreColor.castShadow = true
	shadow.merge(groupColor)
	clickBox.add(coreColor)

/* vest */
	const left = new THREE.BoxGeometry(0.2, 0.5, 0.4)
	left.translate(-0.13, 0.17, 0)
	left.vertices[0].z -= 0.05
	left.vertices[1].z += 0.05
	left.vertices[4].z += 0.05
	left.vertices[4].x += 0.05
	left.vertices[5].z -= 0.05
	left.vertices[5].x += 0.05
	vest.merge(left)
	const right = new THREE.BoxGeometry(0.2, 0.5, 0.4)
	right.translate(0.13, 0.17, 0)
	right.vertices[5].z -= 0.05
	right.vertices[4].z += 0.05
	right.vertices[1].z += 0.05
	right.vertices[1].x -= 0.05
	right.vertices[0].z -= 0.05
	right.vertices[0].x -= 0.05
	vest.merge(right)
	const back = new THREE.BoxGeometry(0.2, 0.5, 0.025)
	back.translate(0, 0.17, -0.1875)
	back.vertices[0].z += 0.05
	back.vertices[1].z += 0.05
	back.vertices[4].z += 0.05
	back.vertices[5].z += 0.05
	vest.merge(back)
	vest.rotateY(-.5)
	vest.center()
	vest.translate(.295, -.12, .165)
	const vestBase = new THREE.Mesh(vest, orange)
	vestBase.castShadow = true
	shadow.merge(vest)
	clickBox.add(vestBase)

/* stripes */
	let stripe = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripe.translate(-0.11, 0.17, 0.201)
	stripe.vertices[0].z -= 0.05
	stripe.vertices[1].z -= 0.05
	stripe.vertices[4].z -= 0.05
	stripe.vertices[5].z -= 0.05
	stripes.merge(stripe)
	stripe.translate(0.22, 0, 0)
	stripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripe.translate(-0.11, 0.17, -0.201)
	stripe.vertices[0].z += 0.05
	stripe.vertices[1].z += 0.05
	stripe.vertices[4].z += 0.05
	stripe.vertices[5].z += 0.05
	stripes.merge(stripe)
	stripe.translate(0.22, 0, 0)
	stripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.05, 0.001, 0.3)
	stripe.translate(-0.11, 0.42, 0)
	stripes.merge(stripe)
	stripe.translate(0.22, 0, 0)
	stripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripe.translate(-0.13, 0.02, 0.201)
	stripe.vertices[4].x += 0.02
	stripe.vertices[5].x += 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z -= 0.02
	stripe.vertices[4].z -= 0.02
	stripe.vertices[5].z -= 0.02
	stripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripe.translate(0.13, 0.02, 0.201)
	stripe.vertices[0].x -= 0.02
	stripe.vertices[1].x -= 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z -= 0.02
	stripe.vertices[4].z -= 0.02
	stripe.vertices[5].z -= 0.02
	stripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripe.translate(-0.23, 0.02, 0)
	stripe.vertices[0].x += 0.02
	stripe.vertices[1].x += 0.02
	stripe.vertices[4].x += 0.02
	stripe.vertices[5].x += 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z += 0.02
	stripe.vertices[4].z += 0.02
	stripe.vertices[5].z -= 0.02
	stripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripe.translate(0.23, 0.02, 0)
	stripe.vertices[0].x -= 0.02
	stripe.vertices[1].x -= 0.02
	stripe.vertices[4].x -= 0.02
	stripe.vertices[5].x -= 0.02
	stripe.vertices[0].z -= 0.02
	stripe.vertices[1].z += 0.02
	stripe.vertices[4].z += 0.02
	stripe.vertices[5].z -= 0.02
	stripes.merge(stripe)
	stripe = new THREE.BoxGeometry(0.45, 0.2, 0.001)
	stripe.translate(0, 0.02, -0.201)
	stripe.vertices[0].x -= 0.02
	stripe.vertices[1].x -= 0.02
	stripe.vertices[4].x += 0.02
	stripe.vertices[5].x += 0.02
	stripe.vertices[0].z += 0.02
	stripe.vertices[1].z += 0.02
	stripe.vertices[4].z += 0.02
	stripe.vertices[5].z += 0.02
	stripes.merge(stripe)
	stripes.rotateY(-.5)
	stripes.center()
	stripes.translate(.295, -.12, .165)
	const vestStripes = new THREE.Mesh(stripes, yellow)
	shadow.merge(stripes)
	clickBox.add(vestStripes)

/* pants */
	const leftLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	leftLeg.translate(-0.25, -1, 0)
	leftLeg.vertices[0].x -= 0.1
	leftLeg.vertices[1].x -= 0.1
	leftLeg.vertices[2].x -= 0.3
	leftLeg.vertices[2].z -= 0.3
	leftLeg.vertices[3].x -= 0.3
	leftLeg.vertices[3].z += 0.3
	leftLeg.vertices[6].z += 0.3
	leftLeg.vertices[7].z -= 0.3
	pants.merge(leftLeg)
	const rightLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	rightLeg.translate(0.25, -1, 0)
	rightLeg.vertices[4].x += 0.1
	rightLeg.vertices[5].x += 0.1
	rightLeg.vertices[2].z -= 0.3
	rightLeg.vertices[3].z += 0.3
	rightLeg.vertices[6].x += 0.3
	rightLeg.vertices[6].z += 0.3
	rightLeg.vertices[7].x += 0.3
	rightLeg.vertices[7].z -= 0.3
	pants.merge(rightLeg)
	pants.rotateY(-.5)
	pants.scale(0.5, 0.5, 0.5)
	pants.center()
	pants.translate(.295, -.78, .165)
	const jeans = new THREE.Mesh(pants, blue)
	vestBase.castShadow = true
	shadow.merge(pants)
	clickBox.add(jeans)

/* Skin */
	const rightArm1 = new THREE.BoxGeometry(0.5, 0.4, 0.5)
	rightArm1.translate(0.64, 0.6, 0)
	rightArm1.vertices[0].y -= 0.1
	rightArm1.vertices[0].z += 0.1
	rightArm1.vertices[0].x -= 0.2
	rightArm1.vertices[1].y -= 0.08
	rightArm1.vertices[1].z += 0.3
	rightArm1.vertices[1].x -= 0.1
	rightArm1.vertices[2].z += 0.1
	rightArm1.vertices[2].x -= 0.05
	rightArm1.vertices[2].y += 0.1
	rightArm1.vertices[3].y += 0.2
	rightArm1.vertices[3].z += 0.4
	rightArm1.vertices[3].x += 0.2
	rightArm1.vertices[4].x -= 0.04
	rightArm1.vertices[5].x -= 0.04
	skin.merge(rightArm1)
	const rightArm2 = new THREE.BoxGeometry(0.5, 0.3, 0.3)
	rightArm2.translate(1.14, 0.6, 0.3)
	rightArm2.vertices[0].y += 0.25
	rightArm2.vertices[0].z -= 0.1
	rightArm2.vertices[0].x -= 0.65
	rightArm2.vertices[1].y += 0.25
	rightArm2.vertices[1].z += 0.05
	rightArm2.vertices[1].x -= 0.5
	rightArm2.vertices[2].y += 0.55
	rightArm2.vertices[2].z -= 0.05
	rightArm2.vertices[2].x -= 0.55
	rightArm2.vertices[3].y += 0.55
	rightArm2.vertices[3].z += 0.1
	rightArm2.vertices[3].x -= 0.4
	rightArm2.vertices[4].x -= 0.1
	rightArm2.vertices[4].z -= 0.1
	rightArm2.vertices[4].y -= 0.03
	rightArm2.vertices[5].y -= 0.05
	rightArm2.vertices[5].z -= 0.1
	rightArm2.vertices[5].x -= 0.2
	rightArm2.vertices[6].x += 0.2
	rightArm2.vertices[6].y += 0.15
	rightArm2.vertices[6].z += 0.0
	rightArm2.vertices[7].x -= 0.05
	rightArm2.vertices[7].z -= 0.1
	rightArm2.vertices[7].y += 0.05
	skin.merge(rightArm2)
	const leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(-0.85, 0.6, 0)
	leftArm.vertices[5].y -= 0.8
	leftArm.vertices[5].z -= 0.1
	leftArm.vertices[4].y -= 0.8
	leftArm.vertices[4].z += 0.1
	leftArm.vertices[7].y -= 0.5
	leftArm.vertices[7].z -= 0.1
	leftArm.vertices[6].y -= 0.5
	leftArm.vertices[6].z += 0.1
	leftArm.vertices[3].x -= 0.04
	leftArm.vertices[2].x -= 0.04
	skin.merge(leftArm)

	const head = new THREE.SphereGeometry(0.35, 32, 32)
	head.translate(0, 1.3, 0)
	skin.merge(head)
	skin.rotateY(-.5)
	skin.scale(0.5, 0.5, 0.5)
	skin.center()
	skin.translate(.215, .11, .155)

	let skinTone = ~~(Math.random() * (4 - 1))
	const skins = [
		skinTone1,
		skinTone2,
		skinTone3,
		skinTone4,
	]
	const body = new THREE.Mesh(skin, skins[skinTone])
	shadow.merge(skin)
	clickBox.add(body)

/* Gray */
	const wood = new THREE.CylinderGeometry(0.05, 0.05, 2.4, 32)
	wood.scale(0.5, 0.5, 0.5)
	wood.center()
	wood.translate(-.3, -0.3, -.15)
	const stick = new THREE.Mesh(wood, gray)
	shadow.merge(wood)
	clickBox.add(stick)

	const shadowFlagger = new THREE.Mesh(shadow, shadows)
	clickBox.add(shadowFlagger)

	clickBox.position.set(-6, 1.48, -12)
	clickBox.name = (group+'-flagger1')
	scene.add(clickBox)
	flaggers.push(clickBox)

	const clickBox2 = clickBox.clone(true)
	clickBox2.rotation.set(0, 2.4, 0)
	clickBox2.position.set(10, 1.48, -28)
	clickBox2.name = (group+'-flagger2')
	scene.add(clickBox2)
	flaggers.push(clickBox2)

}
