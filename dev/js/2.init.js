function init() {
	scene = new THREE.Scene()
	window.scene = scene
	window.THREE = THREE
	initRoad()
	initBackHoe()
	initTruck()
	initWorkers()
	initCamera()
	initLights()
	initRender()
}

function initCamera() {
	camera = new THREE.PerspectiveCamera(60, ((window.innerWidth) / (window.innerHeight - 100)), 1, 100)
	camera.position.set(0, 45, 25)
}

function initLights() {
	ambient = new THREE.HemisphereLight(0xDEEEF2, 0x665C6D, 0.9)
	lightSource = new THREE.SpotLight(0xFCDC74, 0.2)
	lightSource.position.set(-50, 40, -5)
	lightSource.castShadow = true
	lightSource.shadow.camera.left = -10
	lightSource.shadow.camera.right = 10
	lightSource.shadow.camera.top = 10
	lightSource.shadow.camera.bottom = -10
	lightSource.shadow.camera.near = 0.1
	lightSource.shadow.camera.far = 1000
	lightSource.shadow.mapSize.width = 2048
	lightSource.shadow.mapSize.height = 2048
	scene.add(ambient)
	scene.add(lightSource)
}

function initRender() {
	renderer = new THREE.WebGLRenderer({antialias: true})
	renderer.setSize(window.innerWidth, window.innerHeight - 100)
	renderer.setClearColor(0xCDF9FF, 1)
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap
	container.appendChild(renderer.domElement)
	controls = new THREE.OrbitControls(camera, renderer.domElement)
	controls.addEventListener('change', render)

	container.addEventListener('mousemove', onDocumentMouseMove, false)
	container.addEventListener('mouseup', onDocumentMouseCancel, false)
	container.addEventListener('mousedown', onDocumentMouseDown, false)
	container.addEventListener('touchmove', onDocumentTouchMove, false)
	container.addEventListener('touchstart', onDocumentTouchStart, false)
	container.addEventListener('touchend', onDocumentTouchEnd, false)
}
