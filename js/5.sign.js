const signs = [[], [], [], [], [], [], []]

function signArray(group, checkbox) {
	const idx = signs[group].indexOf(checkbox.value)
	if (idx !== -1) {				 								// If already in array
		signs[group].splice(idx, 1) 					// Make sure we remove it
	}

	if (checkbox.checked) {									// If checked
		signs[group].unshift(checkbox.value)	// Add to end of array
	}
}

function signSpace(color, group) {
	const faces = new THREE.Geometry()
	const bases = new THREE.Geometry()
	const materials = [
		color,										// 0
		workerSignMaterial,				// 1
		flaggerSignMaterial,			// 2
		leftSignMaterial,					// 3
		rightSignMaterial,				// 4
		prepareStopSignMaterial,	// 5
		oneLaneSignMaterial,			// 6
		machineAheadSignMaterial,	// 7
		workAheadSignMaterial,		// 8
		constSignMaterial,				// 9
		utilitySignMaterial,			// 10
		rLaneSignMaterial,				// 11
		menWorkSignMaterial,			// 12
		lLaneMaterial,						// 13
		fMenSignMaterial,					// 14
		flagAheadSignMaterial,		// 15
		closedSignMaterial,				// 16
		shadows										// 17
	]

	const signImages = signs[group]
	const signBase = new THREE.CylinderGeometry(2.8, 2.8, 0.1, 4)
	const signColor = new THREE.CylinderGeometry(3.2, 3.2, 0.1, 4)
	let xPos = 12.5

	if (Math.abs(group % 2) !== 0) {
		xPos -= 3
	}

	signBase.rotateY(1.6)
	signBase.translate(xPos, 0.5, (-10 + (group * 4)))
	signColor.rotateY(1.6)
	signColor.translate(xPos, 0.48, (-10 + (group * 4)))

	if (signImages.length > 0) {
		var signSpacing = document.getElementById('sign-' + group).value
		var loader = new THREE.FontLoader();

		loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
			var geometry = new THREE.TextGeometry( signSpacing, {
				font: font,
				size: 2,
				height: .2,
				curveSegments: 12,
				bevelEnabled: false
			} )
				geometry.rotateX(-1.6)
				let textMesh = new THREE.Mesh(geometry, white)
				textMesh.position.set((xPos + 4), .5, (-9 + (group * 4)))
				textMesh.name = 'spacing-' + group
				scene.add(textMesh)
				render()
		} )
	}

	let x

	for (let i = 0; i < signImages.length; i++) {
		switch (signImages[i]) {
			case 'worker':
				x = 1
				break
			case 'flagger':
				x = 2
				break
			case 'left':
				x = 3
				break
			case 'right':
				x = 4
				break
			case 'stop':
				x = 5
				break
			case 'lane':
				x = 6
				break
			case 'machine':
				x = 7
				break
			case 'road':
				x = 8
				break
			case 'const':
				x = 9
				break
			case 'utility':
				x = 10
				break
			case 'rLane':
				x = 11
				break
			case 'men':
				x = 12
				break
			case 'lLane':
				x = 13
				break
			case 'flag':
				x = 14
				break
			case 'fAhead':
				x = 15
				break
			case 'laneAhead':
				x = 16
				break
			default:
				x = 6
				break
		}

		for (var j = 0; j < signBase.faces.length; j++) {
			signBase.faces[j].materialIndex = x;
		}
		faces.mergeMesh(new THREE.Mesh(signBase))
		bases.merge(signColor)

		signBase.translate(-6.5, 0, 0)
		signColor.translate(-6.5, 0, 0)
	} // End For

	const combinedBase = new THREE.Mesh(bases, color)

	//meshes = new THREE.BufferGeometry().fromGeometry(meshes)
	const combinedMesh = new THREE.Mesh(faces, materials)
	combinedBase.add(combinedMesh)
	combinedBase.castShadow = true
	combinedBase.name = 'signGroup-' + group
	scene.add(combinedBase)

	if (arrows[group].length > 0) {
		arrowSign(color, group)
	}

	if (end[group].length > 0) {
		endSign(color, group)
	}

}
