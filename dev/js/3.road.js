function initRoad() {
	const greenery = new THREE.Geometry()
	const median = new THREE.Geometry()
	const guard = new THREE.Geometry()
	const floor = new THREE.Geometry()
	const coneDefault = new THREE.Geometry()

	const topGeometry = new THREE.BoxGeometry(155, 1, 38)
	topGeometry.translate(0, 0, -45.5)
	greenery.merge(topGeometry)
	topGeometry.translate(0, 0, 51)
	greenery.merge(topGeometry)
	const grass = new THREE.Mesh(greenery, green)
	floor.merge(greenery)

	const asphalt = new THREE.BoxGeometry(155, 1, 13)
	asphalt.translate(0, 0, -20)
	const road = new THREE.Mesh(asphalt, gray)
	grass.add(road)
	floor.merge(asphalt)

	const dividerLine = new THREE.BoxGeometry(1, 0.1, 0.2)
	dividerLine.translate(-75, 0.5, -20)
	median.merge(dividerLine)
	for (let i = 75; i >= -73; i -= 2) {
		dividerLine.translate(2, 0, 0)
		median.merge(dividerLine)
	}
	const divider = new THREE.Mesh(median, yellow)
	grass.add(divider)

	const coneCore = coneGeometry.clone(true)
	const stripeCore = stripeGeometry.clone(true)
	coneCore.translate(0, 0.75, -19)
	coneDefault.merge(coneCore)
	stripeCore.translate(0, 0.75, -19)
	guard.merge(stripeCore)
	for (let i = 1.5; i <= 12; i += 2) {
		coneCore.translate(2, 0, 0)
		coneDefault.merge(coneCore)
		stripeCore.translate(2, 0, 0)
		guard.merge(stripeCore)
	}
	const workCones = new THREE.Mesh(coneDefault, truckMaterial)
	grass.add(workCones)

	const line = new THREE.BoxGeometry(155, 0.01, 0.1)
	line.translate(0, 0.5, -26)
	guard.merge(line)
	line.translate(0, 0, 12)
	guard.merge(line)
	const outside = new THREE.Mesh(guard, white)
	grass.add(outside)

	const floorShadows = new THREE.Mesh(floor, shadows)
	floorShadows.position.set(0, 0.0003, 0)
	floorShadows.receiveShadow = true
	scene.add(floorShadows)
	objectPlane = floorShadows

	grass.castShadow = true
	scene.add(grass)
}
