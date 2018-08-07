function initWorkers()	{
	const skin1 = new THREE.Geometry()
	const skin2 = new THREE.Geometry()
	const skin3 = new THREE.Geometry()
	const vest = new THREE.Geometry()
	const stripes = new THREE.Geometry()
	const jean = new THREE.Geometry()
	const shirt = new THREE.Geometry()
	const shadow = new THREE.Geometry()
	const skins = [
		skinTone1,
		skinTone2,
		skinTone3,
		skinTone4
	]

	let rightArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	rightArm.translate(3.55, 1.8, 6.5)
	rightArm.vertices[0].y -= 0.75
	rightArm.vertices[1].y -= 0.75
	rightArm.vertices[2].y -= 0.5
	rightArm.vertices[3].y -= 0.5
	rightArm.vertices[0].x -= 0.5
	rightArm.vertices[1].x -= 0.5
	rightArm.vertices[2].x -= 0.5
	rightArm.vertices[3].x -= 0.5
	rightArm.vertices[0].z -= 0.15
	rightArm.vertices[1].z += 0.15
	rightArm.vertices[2].z -= 0.15
	rightArm.vertices[3].z += 0.15
	rightArm.rotateY(-1)
	skin1.merge(rightArm)
	let leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(1.85, 1.8, 6.5)
	leftArm.vertices[5].y += 0.3
	leftArm.vertices[4].y += 0.3
	leftArm.vertices[7].y += 0.55
	leftArm.vertices[6].y += 0.55
	leftArm.vertices[5].x += 0.8
	leftArm.vertices[4].x += 0.8
	leftArm.vertices[7].x += 0.8
	leftArm.vertices[6].x += 0.8
	leftArm.vertices[5].z += 0.9
	leftArm.vertices[4].z += 1.05
	leftArm.vertices[7].z += 0.9
	leftArm.vertices[6].z += 1.05
	leftArm.rotateY(-1)
	skin1.merge(leftArm)
	const head = new THREE.SphereGeometry(0.35, 32, 32)
	head.translate(2.7, 2.5, 6.5)
	head.rotateY(-1)
	skin1.merge(head)

	skin1.scale(0.5, 0.5, 0.5)
	skin1.translate(4.55, 0.6, 3.5)

	let skinTone = ~~(Math.random() * (4 - 1))
	const people = new THREE.Mesh(skin1, skins[skinTone])
	shadow.merge(skin1)

	rightArm.rotateY(1.5)
	rightArm.translate(-5.4, 0.1, 0.35)
	skin2.merge(rightArm)

	head.translate(4.1, 0, -1)
	skin2.merge(head)

	leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(-0.85, 0.6, 0)
	leftArm.vertices[4].y -= 0.75
	leftArm.vertices[5].y -= 0.75
	leftArm.vertices[6].y -= 0.5
	leftArm.vertices[7].y -= 0.5
	leftArm.vertices[0].x += 0.05
	leftArm.vertices[1].x += 0.05
	leftArm.vertices[4].x += 0.5
	leftArm.vertices[5].x += 0.5
	leftArm.vertices[6].x += 0.5
	leftArm.vertices[7].x += 0.5
	leftArm.vertices[4].z += 0.15
	leftArm.vertices[5].z -= 0.15
	leftArm.vertices[6].z += 0.15
	leftArm.vertices[7].z -= 0.15
	leftArm.rotateY(0.5)
	leftArm.translate(0.065, 1.3, 4.79)
	skin2.merge(leftArm)
	skin2.scale(0.5, 0.5, 0.5)
	skin2.translate(4.52, 0.55, 3.52)

	skinTone = ~~(Math.random() * (4 - 1))
	const people2 = new THREE.Mesh(skin2, skins[skinTone])
	people.add(people2)
	shadow.merge(skin2)

	rightArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	rightArm.translate(0.85, 1.8, 0)
	rightArm.vertices[0].y -= 0.45
	rightArm.vertices[1].y -= 0.45
	rightArm.vertices[2].y -= 0.2
	rightArm.vertices[3].y -= 0.2
	rightArm.vertices[0].x -= 0.5
	rightArm.vertices[1].x -= 0.5
	rightArm.vertices[2].x -= 0.5
	rightArm.vertices[3].x -= 0.5
	rightArm.vertices[0].z += 0.45
	rightArm.vertices[1].z += 0.85
	rightArm.vertices[2].z += 0.45
	rightArm.vertices[3].z += 0.85
	rightArm.vertices[4].z += 0.02
	rightArm.vertices[6].z -= 0.04
	skin3.merge(rightArm)
	leftArm = new THREE.BoxGeometry(1, 0.4, 0.5)
	leftArm.translate(-0.85, 1.8, 0)
	leftArm.vertices[5].y -= 0.45
	leftArm.vertices[4].y -= 0.45
	leftArm.vertices[7].y -= 0.2
	leftArm.vertices[6].y -= 0.2
	leftArm.vertices[5].x += 0.5
	leftArm.vertices[4].x += 0.5
	leftArm.vertices[7].x += 0.5
	leftArm.vertices[6].x += 0.5
	leftArm.vertices[5].z += 0.45
	leftArm.vertices[4].z += 0.85
	leftArm.vertices[7].z += 0.45
	leftArm.vertices[6].z += 0.85
	leftArm.vertices[1].z += 0.02
	leftArm.vertices[3].z -= 0.04
	skin3.merge(leftArm)
	head.translate(-0.1, 0, -5)
	skin3.merge(head)
	skin3.scale(0.5, 0.5, 0.5)
	skin3.rotateY(-0.35)
	skin3.translate(5.95, 0.6, 5.875)

	skinTone = ~~(Math.random() * (4 - 1))
	const people3 = new THREE.Mesh(skin3, skins[skinTone])
	people.add(people3)
	shadow.merge(skin3)

	const torso = new THREE.BoxGeometry(1, 1.4, 0.8)
	torso.vertices[0].z -= 0.15
	torso.vertices[0].x -= 0.15
	torso.vertices[1].z += 0.15
	torso.vertices[1].x -= 0.15
	torso.vertices[4].z += 0.15
	torso.vertices[4].x += 0.15
	torso.vertices[5].z -= 0.15
	torso.vertices[5].x += 0.15
	torso.scale(0.5, 0.5, 0.5)
	torso.rotateY(-1)
	torso.translate(2.55, 1.25, 6.4)
	shirt.merge(torso)
	torso.rotateY(1.5)
	torso.translate(-2, 0, 8)
	shirt.merge(torso)
	torso.rotateY(-0.8)
	torso.translate(7, 0, -1.5)
	shirt.merge(torso)

	const tanks = new THREE.Mesh(shirt, palegray)
	people.add(tanks)
	shadow.merge(shirt)

	const vestGeometry = new THREE.Geometry()
	const left = new THREE.BoxGeometry(0.2, 0.5, 0.4)
	left.translate(-0.13, 0.17, 0)
	left.vertices[0].z -= 0.05
	left.vertices[1].z += 0.05
	left.vertices[4].z += 0.05
	left.vertices[4].x += 0.05
	left.vertices[5].z -= 0.05
	left.vertices[5].x += 0.05
	vestGeometry.merge(left)
	const right = new THREE.BoxGeometry(0.2, 0.5, 0.4)
	right.translate(0.13, 0.17, 0)
	right.vertices[5].z -= 0.05
	right.vertices[4].z += 0.05
	right.vertices[1].z += 0.05
	right.vertices[1].x -= 0.05
	right.vertices[0].z -= 0.05
	right.vertices[0].x -= 0.05
	vestGeometry.merge(right)
	const back = new THREE.BoxGeometry(0.2, 0.5, 0.025)
	back.translate(0, 0.17, -0.1875)
	back.vertices[0].z += 0.05
	back.vertices[1].z += 0.05
	back.vertices[4].z += 0.05
	back.vertices[5].z += 0.05
	vestGeometry.merge(back)
	vestGeometry.rotateY(-1)
	vestGeometry.translate(2.55, 1.19, 6.4)
	vest.merge(vestGeometry)
	vestGeometry.rotateY(1.5)
	vestGeometry.translate(-2, 0, 8)
	vest.merge(vestGeometry)
	vestGeometry.rotateY(-0.8)
	vestGeometry.translate(7, 0, -1.5)
	vest.merge(vestGeometry)
	const dome = new THREE.SphereGeometry(0.2, 32, 32, 1, 6.3, 0, 1.5)
	dome.translate(2.55, 1.83, 6.39)
	vest.merge(dome)
	dome.translate(2, 0, -0.5)
	vest.merge(dome)
	dome.translate(1.425, 0, -0.125)
	vest.merge(dome)
	const brim = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32)
	brim.translate(2.45, 1.846, 6.45)
	vest.merge(brim)
	brim.translate(2.15, 0, -0.45)
	vest.merge(brim)
	brim.translate(1.325, 0, -0.125)
	vest.merge(brim)

	const vestBase = new THREE.Mesh(vest, truckMaterial)
	people.add(vestBase)
	shadow.merge(vest)

	const vestStripes = new THREE.Geometry()
	const stripeFront = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripeFront.translate(-0.11, 0.17, 0.201)
	stripeFront.vertices[0].z -= 0.05
	stripeFront.vertices[1].z -= 0.05
	stripeFront.vertices[4].z -= 0.05
	stripeFront.vertices[5].z -= 0.05
	vestStripes.merge(stripeFront)
	stripeFront.translate(0.22, 0, 0)
	vestStripes.merge(stripeFront)
	const stripeBack = new THREE.BoxGeometry(0.05, 0.5, 0.001)
	stripeBack.translate(-0.11, 0.17, -0.201)
	stripeBack.vertices[0].z += 0.05
	stripeBack.vertices[1].z += 0.05
	stripeBack.vertices[4].z += 0.05
	stripeBack.vertices[5].z += 0.05
	vestStripes.merge(stripeBack)
	stripeBack.translate(0.22, 0, 0)
	vestStripes.merge(stripeBack)
	const stripeTop = new THREE.BoxGeometry(0.05, 0.001, 0.3)
	stripeTop.translate(-0.11, 0.42, 0)
	vestStripes.merge(stripeTop)
	stripeTop.translate(0.22, 0, 0)
	vestStripes.merge(stripeTop)
	const stripeBottom1 = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripeBottom1.translate(-0.13, 0.02, 0.201)
	stripeBottom1.vertices[4].x += 0.02
	stripeBottom1.vertices[5].x += 0.02
	stripeBottom1.vertices[0].z -= 0.02
	stripeBottom1.vertices[1].z -= 0.02
	stripeBottom1.vertices[4].z -= 0.02
	stripeBottom1.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom1)
	const stripeBottom2 = new THREE.BoxGeometry(0.2, 0.2, 0.001)
	stripeBottom2.translate(0.13, 0.02, 0.201)
	stripeBottom2.vertices[0].x -= 0.02
	stripeBottom2.vertices[1].x -= 0.02
	stripeBottom2.vertices[0].z -= 0.02
	stripeBottom2.vertices[1].z -= 0.02
	stripeBottom2.vertices[4].z -= 0.02
	stripeBottom2.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom2)
	const stripeBottom3 = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripeBottom3.translate(-0.23, 0.02, 0)
	stripeBottom3.vertices[0].x += 0.02
	stripeBottom3.vertices[1].x += 0.02
	stripeBottom3.vertices[4].x += 0.02
	stripeBottom3.vertices[5].x += 0.02
	stripeBottom3.vertices[0].z -= 0.02
	stripeBottom3.vertices[1].z += 0.02
	stripeBottom3.vertices[4].z += 0.02
	stripeBottom3.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom3)
	const stripeBottom4 = new THREE.BoxGeometry(0.001, 0.2, 0.4)
	stripeBottom4.translate(0.23, 0.02, 0)
	stripeBottom4.vertices[0].x -= 0.02
	stripeBottom4.vertices[1].x -= 0.02
	stripeBottom4.vertices[4].x -= 0.02
	stripeBottom4.vertices[5].x -= 0.02
	stripeBottom4.vertices[0].z -= 0.02
	stripeBottom4.vertices[1].z += 0.02
	stripeBottom4.vertices[4].z += 0.02
	stripeBottom4.vertices[5].z -= 0.02
	vestStripes.merge(stripeBottom4)
	const stripeBottom5 = new THREE.BoxGeometry(0.45, 0.2, 0.001)
	stripeBottom5.translate(0, 0.02, -0.201)
	stripeBottom5.vertices[0].x -= 0.02
	stripeBottom5.vertices[1].x -= 0.02
	stripeBottom5.vertices[4].x += 0.02
	stripeBottom5.vertices[5].x += 0.02
	stripeBottom5.vertices[0].z += 0.02
	stripeBottom5.vertices[1].z += 0.02
	stripeBottom5.vertices[4].z += 0.02
	stripeBottom5.vertices[5].z += 0.02
	vestStripes.merge(stripeBottom5)
	vestStripes.merge(back)
	vestStripes.rotateY(-1)
	vestStripes.translate(2.55, 1.19, 6.4)
	stripes.merge(vestStripes)
	vestStripes.rotateY(1.5)
	vestStripes.translate(-2, 0, 8)
	stripes.merge(vestStripes)
	vestStripes.rotateY(-0.8)
	vestStripes.translate(7, 0, -1.5)
	stripes.merge(vestStripes)

	const vestStripe = new THREE.Mesh(stripes, yellow)
	people.add(vestStripe)
	shadow.merge(stripes)

	const leftLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	leftLeg.vertices[0].x -= 0.1
	leftLeg.vertices[1].x -= 0.1
	leftLeg.vertices[2].x -= 0.3
	leftLeg.vertices[2].z -= 0.3
	leftLeg.vertices[3].x -= 0.3
	leftLeg.vertices[3].z += 0.3
	leftLeg.vertices[6].z += 0.3
	leftLeg.vertices[7].z -= 0.3
	leftLeg.scale(0.5, 0.5, 0.5)
	leftLeg.rotateY(-1)
	leftLeg.translate(2.485, 0.702, 6.3)
	jean.merge(leftLeg)
	leftLeg.rotateY(1.5)
	leftLeg.translate(-2, 0, 8)
	jean.merge(leftLeg)
	leftLeg.rotateY(-0.8)
	leftLeg.translate(7, 0, -1.5)
	jean.merge(leftLeg)
	const rightLeg = new THREE.BoxGeometry(0.5, 0.8, 0.8)
	rightLeg.vertices[4].x += 0.1
	rightLeg.vertices[5].x += 0.1
	rightLeg.vertices[2].z -= 0.3
	rightLeg.vertices[3].z += 0.3
	rightLeg.vertices[6].x += 0.3
	rightLeg.vertices[6].z += 0.3
	rightLeg.vertices[7].x += 0.3
	rightLeg.vertices[7].z -= 0.3
	rightLeg.scale(0.5, 0.5, 0.5)
	rightLeg.rotateY(-1)
	rightLeg.translate(2.615, 0.702, 6.5)
	jean.merge(rightLeg)
	rightLeg.rotateY(1.5)
	rightLeg.translate(-2, 0, 8)
	jean.merge(rightLeg)
	rightLeg.rotateY(-0.8)
	rightLeg.translate(7, 0, -1.5)
	jean.merge(rightLeg)

	const pants = new THREE.Mesh(jean, blue)
	people.add(pants)
	shadow.merge(jean)

	const paper = new THREE.BoxGeometry(0.8, 0.6, 0.025)
	paper.rotateX(0.3)
	paper.rotateY(-0.3)
	paper.translate(5.85, 1.3, 6.15)

	const blueprints = new THREE.Mesh(paper, white)
	people.add(blueprints)
	shadow.merge(paper)

	const shadowMen = new THREE.Mesh(shadow, shadows)
	people.add(shadowMen)

	people.castShadow = true
	people.position.set(21, -0.03, -25)
	scene.add(people)
}
