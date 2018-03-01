function initTruck() {
	const whiteGeo = new THREE.Geometry()
	const greyGeo = new THREE.Geometry()
	const blackGeo = new THREE.Geometry()
	const orangeGeo = new THREE.Geometry()
	const shadow = new THREE.Geometry()

	const nose = new THREE.BoxGeometry(1, 0.8, 1.3)
	nose.translate(-0.6, 0, 0)
	whiteGeo.merge(nose)
	const cabin = new THREE.BoxGeometry(0.1, 0.8, 1.3)
	cabin.translate(0.52, 0.25, 0)
	whiteGeo.merge(cabin)
	const cabinSide = new THREE.BoxGeometry(0.1, 0.7, 0.3)
	cabinSide.translate(0.52, 0.85, 0.5)
	whiteGeo.merge(cabinSide)
	cabinSide.translate(0, 0, -1)
	whiteGeo.merge(cabinSide)
	const roof = new THREE.BoxGeometry(0.8, 0.1, 1.3)
	roof.translate(0.17, 1.15, 0)
	roof.vertices[6].x -= 0.05
	roof.vertices[7].x -= 0.05
	whiteGeo.merge(roof)
	const shieldRight = new THREE.BoxGeometry(0.1, 1, 0.1)
	shieldRight.translate(-0.6, 0.52, -0.6)
	shieldRight.rotateZ(-0.4)
	whiteGeo.merge(shieldRight)
	shieldRight.translate(0, 0, 1.2)
	whiteGeo.merge(shieldRight)
	const bed = new THREE.BoxGeometry(3.2, 0.3, 1.3)
	bed.translate(0.9, -0.31, 0)
	whiteGeo.merge(bed)
	const bedSide = new THREE.BoxGeometry(2.68, 0.6, 0.1)
	bedSide.translate(1.15, 0.1, 0.6)
	whiteGeo.merge(bedSide)
	bedSide.translate(0, 0, -1.2)
	whiteGeo.merge(bedSide)
	const bedBack = new THREE.BoxGeometry(0.1, 0.6, 1.3)
	bedBack.translate(2.45, 0.1, 0)
	whiteGeo.merge(bedBack)
	whiteGeo.translate(0, 1.5, 0)
	const hubGeometry = new THREE.TorusGeometry(0.25, 0.1, 3, 199)
	hubGeometry.translate(-0.3, 1.09, 0.63)
	whiteGeo.merge(hubGeometry)
	hubGeometry.translate(0, 0, -1.3)
	whiteGeo.merge(hubGeometry)
	hubGeometry.translate(2, 0, 1.3)
	whiteGeo.merge(hubGeometry)
	hubGeometry.translate(0, 0, -1.3)
	whiteGeo.merge(hubGeometry)

	const truck = new THREE.Mesh(whiteGeo, white)
	shadow.merge(whiteGeo)

	const windshield = new THREE.BoxGeometry(1, 0.8, 1.29)
	windshield.vertices[4].x += 0.26
	windshield.vertices[5].x += 0.26
	windshield.vertices[6].x -= 0.035
	windshield.vertices[7].x -= 0.035
	windshield.vertices[0].y += 2.2
	windshield.vertices[1].y += 2.2
	windshield.vertices[2].y += 2.3
	windshield.vertices[3].y += 2.3
	windshield.vertices[4].y += 2.2
	windshield.vertices[5].y += 2.2
	windshield.vertices[6].y += 2.3
	windshield.vertices[7].y += 2.3

	const glass = new THREE.Mesh(windshield, windowColor)
	truck.add(glass)

	const seatButt = new THREE.BoxGeometry(0.4, 0.1, 0.4)
	seatButt.translate(0.25, 1.6, 0.3)
	blackGeo.merge(seatButt)
	seatButt.translate(0, 0, -0.6)
	blackGeo.merge(seatButt)
	const seatBack = new THREE.BoxGeometry(0.1, 0.7, 0.4)
	seatBack.translate(0.45, 1.8, 0.3)
	blackGeo.merge(seatBack)
	seatBack.translate(0, 0, -0.6)
	blackGeo.merge(seatBack)
	const steering = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32)
	steering.translate(-1.9, 0.65, 0.3)
	steering.rotateZ(-1.2)
	blackGeo.merge(steering)
	const wheelGeometry = new THREE.CylinderGeometry(0.45, 0.45, 0.2, 32)
	wheelGeometry.translate(-0.3, 0.55, -1.1)
	wheelGeometry.rotateX(1.6)
	blackGeo.merge(wheelGeometry)
	wheelGeometry.translate(0, 0, -1.2)
	blackGeo.merge(wheelGeometry)
	wheelGeometry.translate(2, 0, 1.2)
	blackGeo.merge(wheelGeometry)
	wheelGeometry.translate(0, 0, -1.2)
	blackGeo.merge(wheelGeometry)
	const grill = new THREE.BoxGeometry(0.01, 0.7, 1.2)
	grill.translate(-1.1, 1.5, 0)
	blackGeo.merge(grill)
	const license = new THREE.BoxGeometry(0.05, 0.2, 0.5)
	license.translate(2.5, 1.25, 0)
	blackGeo.merge(license)

	const accent = new THREE.Mesh(blackGeo, gray)
	truck.add(accent)
	shadow.merge(blackGeo)

	const frontBumper = new THREE.BoxGeometry(0.4, 0.1, 1.4)
	frontBumper.translate(-0.95, 1.05, 0)
	frontBumper.vertices[2].x += 0.01
	frontBumper.vertices[3].x += 0.01
	greyGeo.merge(frontBumper)
	const middleBumper = new THREE.BoxGeometry(1.1, 0.1, 1.4)
	middleBumper.translate(0.7, 1.05, 0)
	middleBumper.vertices[2].x += 0.01
	middleBumper.vertices[3].x += 0.01
	middleBumper.vertices[6].x -= 0.01
	middleBumper.vertices[7].x -= 0.01
	greyGeo.merge(middleBumper)
	const backBumper = new THREE.BoxGeometry(0.4, 0.1, 1.4)
	backBumper.translate(2.35, 1.05, 0)
	backBumper.vertices[6].x -= 0.01
	backBumper.vertices[7].x -= 0.01
	greyGeo.merge(backBumper)

	const bumpers = new THREE.Mesh(greyGeo, palegray)
	truck.add(bumpers)
	shadow.merge(greyGeo)

	const leftLight = new THREE.BoxGeometry(0.1, 0.1, 0.1)
	leftLight.translate(2.5, 1.25, 0.45)
	orangeGeo.merge(leftLight)
	leftLight.translate(0, 0, -0.9)
	orangeGeo.merge(leftLight)
	const lightGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.5)
	lightGeometry.translate(0.2, 2.72, 0)
	orangeGeo.merge(lightGeometry)

	const details = new THREE.Mesh(orangeGeo, orange)
	truck.add(details)
	shadow.merge(orangeGeo)

	const truckShadows = new THREE.Mesh(shadow, shadows)
	truck.add(truckShadows)

	truck.rotation.set(0, 0.5, 0)
	truck.scale.set(0.9, 0.9, 0.9)

	truck.castShadow = true
	truck.position.set(-2.5, 0, -10)
	scene.add(truck)
}
