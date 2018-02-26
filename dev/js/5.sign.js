function signArray(group, checkbox) {
	const idx = signs[group].indexOf(checkbox.value)
	if (idx !== -1) {				 								// If already in array
		signs[group].splice(idx, 1) 					// Make sure we remove it
	}

	if (checkbox.checked) {									// If checked
		signs[group].unshift(checkbox.value)	// Add to end of array
	}
}

function signText(group, xPos, signImages) {
	if (signImages.length > 0) {
		const signSpacing = document.getElementById('sign-' + group).value
		const loader = new THREE.FontLoader()

		loader.load('fonts/helvetiker_regular.typeface.json', font => {
			const geometry = new THREE.TextGeometry(signSpacing, {
				font,
				size: 2,
				height: 0.2,
				curveSegments: 12,
				bevelEnabled: false
			})
				geometry.rotateX(-1.6)
				const textMesh = new THREE.Mesh(geometry, white)
				textMesh.position.set((xPos + 4), 0.5, (-9 + (group * 4)))
				textMesh.name = 'spacing-' + group
				scene.add(textMesh)
				render()
		})
	}
}

function signSpace(color, group) {
	const bases = new THREE.Geometry()
	const allSign = new THREE.Group()
	let signMesh
	const materials = [
		color,
		workerSignMaterial,
		flaggerSignMaterial,
		leftSignMaterial,
		rightSignMaterial,
		prepareStopSignMaterial,
		oneLaneSignMaterial,
		machineAheadSignMaterial,
		workAheadSignMaterial,
		constSignMaterial,
		utilitySignMaterial,
		rLaneSignMaterial,
		menWorkSignMaterial,
		lLaneMaterial,
		fMenSignMaterial,
		flagAheadSignMaterial,
		closedSignMaterial,
		shadows
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

	signText(group, xPos, signImages)

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
		}

		signMesh = new THREE.Mesh(signBase, materials[x])
		allSign.add(signMesh)
		bases.merge(signColor)

		signBase.translate(-6.5, 0, 0)
		signColor.translate(-6.5, 0, 0)
	}

	const combinedBase = new THREE.Mesh(bases, color)
	allSign.add(combinedBase)
	allSign.castShadow = true
	allSign.name = 'signGroup-' + group
	scene.add(allSign)
}
