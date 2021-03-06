function signArray(group, checkbox) {
	const idx = signs[group].indexOf(checkbox.value)
	if (idx !== -1) {				 								// If already in array
		signs[group].splice(idx, 1) 					// Make sure we remove it
	}

	if (checkbox.checked) {									// If checked
		signs[group].push(checkbox.value)	// Add to end of array
	}
}

function signText(group, xPos, signImages) {
	if (signImages.length > 0) {
		const signSpacing = document.getElementById('sign-' + group).value
		const text = signSpacing ? signSpacing + 'ft' : ''
		const loader = new THREE.FontLoader()

		loader.load('fonts/helvetiker_regular.typeface.json', font => {
			const geometry = new THREE.TextGeometry(text, {
				font,
				size: 2,
				height: 0.2,
				curveSegments: 12,
				bevelEnabled: false
			})
				geometry.rotateX(-1.6)
				const textMesh = new THREE.Mesh(geometry, white)
				textMesh.position.set((xPos - 3), 0.5, (-21.5 + (8 * group)))
				textMesh.name = 'spacing-' + group
				scene.add(textMesh)
				render()
		})
	}
}

function signSpace(left, group) {
	const faces = new THREE.Geometry()
	const materials = [
		shadows,
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
		closedSignMaterial
	]

	const signImages = signs[group]
	const signBase = new THREE.CylinderGeometry(4, 4, 0.2, 4)

//	signBase.rotateY(1.56)
	signBase.translate((19 - left), 0.5, (-22 + (8 * group)))

	let x
	let position = 19 - left

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

		for (let j = 0; j < signBase.faces.length; j++) {
			signBase.faces[j].materialIndex = x
		}
		faces.merge(signBase)

		signBase.translate(8.2, 0, 0)
		position += 8.2
	}

	endSign(position, group)

	const combinedMesh = new THREE.Mesh(faces, materials)
	combinedMesh.castShadow = true
	combinedMesh.name = 'signGroup-' + group
	scene.add(combinedMesh)
}
