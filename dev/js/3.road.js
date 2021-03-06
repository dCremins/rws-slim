function initRoad() {
	const greenery = new THREE.Geometry()
	const median = new THREE.Geometry()
	const guard = new THREE.Geometry()
	const floor = new THREE.Geometry()
	const coneDefault = new THREE.Geometry()

	const topGeometry = new THREE.BoxGeometry(155, 1, 50)
	topGeometry.translate(0, 0, -56.5)
	greenery.merge(topGeometry)
	topGeometry.translate(0, 0, 63)
	greenery.merge(topGeometry)
	const grass = new THREE.Mesh(greenery, green)
	floor.merge(greenery)

	const asphalt = new THREE.BoxGeometry(155, 1, 13)
	asphalt.translate(0, 0, -25)
	const road = new THREE.Mesh(asphalt, gray)
	grass.add(road)
	floor.merge(asphalt)

	const dividerLine = new THREE.BoxGeometry(1, 0.1, 0.2)
	dividerLine.translate(-75, 0.5, -25)
	median.merge(dividerLine)
	for (let i = 75; i >= -73; i -= 2) {
		dividerLine.translate(2, 0, 0)
		median.merge(dividerLine)
	}
	const divider = new THREE.Mesh(median, yellow)
	grass.add(divider)

	const coneCore = coneGeometry.clone(true)
	coneCore.translate(20, 0.75, -24)
	coneDefault.merge(coneCore)
	for (let i = 1; i < 6; i++) {
		coneCore.translate(1.4, 0, 0)
		coneDefault.merge(coneCore)
	}
	const workCones = new THREE.Mesh(coneDefault, truckMaterial)
	grass.add(workCones)

	const line = new THREE.BoxGeometry(155, 0.01, 0.1)
	line.translate(0, 0.5, -31)
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
