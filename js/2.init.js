function init() {
	scene = new THREE.Scene()
	window.scene = scene
	window.THREE = THREE
	initRoad()
	initBackHoe()
	initTruck()
	initWorkers()

	//flagger(1, red)

	initCamera()
	initLights()
	initRender()
}

function initCamera() {
	camera = new THREE.PerspectiveCamera(60, ((window.innerWidth) / (window.innerHeight - 100)), 1, 100)
	camera.position.set(0, 45, 25)
}

function initLights() {
	ambient = new THREE.HemisphereLight(0xDEEEF2, 0x665C6D, .9)
	sun = new THREE.SpotLight(0xFCDC74, 0.2)
	sun.position.set(-50, 40, -5)
	sun.castShadow = true
	sun.shadow.camera.left = -10
	sun.shadow.camera.right = 10
	sun.shadow.camera.top = 10
	sun.shadow.camera.bottom = -10
	sun.shadow.camera.near = 0.1
	sun.shadow.camera.far = 1000
	sun.shadow.mapSize.width = 2048
	sun.shadow.mapSize.height = 2048
	scene.add(ambient)
	scene.add(sun)
}

function initRender() {
	renderer = new THREE.WebGLRenderer({antialias: true})
	renderer.setSize(window.innerWidth, window.innerHeight - 100)
	renderer.setClearColor(0xcdf9ff, 1)
	renderer.setPixelRatio( window.devicePixelRatio )
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	container.appendChild(renderer.domElement)
	controls = new THREE.OrbitControls(camera, renderer.domElement)
	controls.addEventListener( 'change', render )

	container.addEventListener('mousemove', onDocumentMouseMove, false)
	container.addEventListener('mouseup', onDocumentMouseCancel, false)
	container.addEventListener('mousedown', onDocumentMouseDown, false)
	container.addEventListener('touchmove', onDocumentTouchMove, false)
	container.addEventListener('touchstart', onDocumentTouchStart, false)
	container.addEventListener('touchend', onDocumentTouchEnd, false)
}
