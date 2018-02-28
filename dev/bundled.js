/* Variables */
let scene
let camera
let controls
let renderer
let ambient
let lightSource
let objectPlane
let THREE
let flaggers = []
const signs = [[], [], [], [], [], [], []]

const container = document.getElementById('container')
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const selected = null
let hovered = null

const glow = new THREE.MeshLambertMaterial({
	color: 0xB78DD1,
	emissive: 0x333333
})

// Colors
const red = new THREE.MeshLambertMaterial({color: 0xF87676})
const green = new THREE.MeshLambertMaterial({color: 0x78C789})
const blue = new THREE.MeshLambertMaterial({color: 0x22B8E2})
const orange = new THREE.MeshLambertMaterial({color: 0xF6B331})
const yellow = new THREE.MeshLambertMaterial({color: 0xFDDB4C})
const purple = new THREE.MeshLambertMaterial({color: 0xB78DD1})

const white = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
const gray = new THREE.MeshLambertMaterial({color: 0x555555})
const palegray = new THREE.MeshLambertMaterial({color: 0x87836E})
// Scenery
const shadows = new THREE.ShadowMaterial({opacity: 0.3})
const windowColor = new THREE.MeshLambertMaterial({
	color: 0xD0DDE3,
	transparent: true,
	opacity: 0.5
})
const clickBoxMaterial = new THREE.MeshLambertMaterial({
	color: 0xD0DDE3,
	transparent: true,
	opacity: 0
})
const truckMaterial = new THREE.MeshLambertMaterial({color: 0xEF8547})
// Skin
const skinTone1 = new THREE.MeshLambertMaterial({color: 0x8D5524}) // Brown
const skinTone2 = new THREE.MeshLambertMaterial({color: 0xC68642}) // Light Brown
const skinTone3 = new THREE.MeshLambertMaterial({color: 0xF1C27D}) // Tan
const skinTone4 = new THREE.MeshLambertMaterial({color: 0xFFDBAC}) // Pale
// Signs
// Man with Shovel
const workerSign = new THREE.TextureLoader().load('images/sign-01.png')
const workerSignMaterial = new THREE.MeshBasicMaterial({map: workerSign})
// Flagger Icon
const flaggerSign = new THREE.TextureLoader().load('images/sign-02.png')
const flaggerSignMaterial = new THREE.MeshBasicMaterial({map: flaggerSign})
// Merge Left
const leftSign = new THREE.TextureLoader().load('images/sign-03.png')
const leftSignMaterial = new THREE.MeshBasicMaterial({map: leftSign})
// Merge Right
const rightSign = new THREE.TextureLoader().load('images/sign-04.png')
const rightSignMaterial = new THREE.MeshBasicMaterial({map: rightSign})
// Be Prepared to Stop
const prepareStopSign = new THREE.TextureLoader().load('images/sign-05.png')
const prepareStopSignMaterial = new THREE.MeshBasicMaterial({
	map: prepareStopSign
})
// One Lane Road Ahead
const oneLaneSign = new THREE.TextureLoader().load('images/sign-06.png')
const oneLaneSignMaterial = new THREE.MeshBasicMaterial({map: oneLaneSign})
// Road Machinery Ahead
const machineAheadSign = new THREE.TextureLoader().load('images/sign-07.png')
const machineAheadSignMaterial = new THREE.MeshBasicMaterial({
	map: machineAheadSign
})
// Road Work Ahead
const workAheadSign = new THREE.TextureLoader().load('images/sign-08.png')
const workAheadSignMaterial = new THREE.MeshBasicMaterial({map: workAheadSign})
// Road Construction Ahead
const constSign = new THREE.TextureLoader().load('images/sign-09.png')
const constSignMaterial = new THREE.MeshBasicMaterial({map: constSign})
// Utility Work Ahead
const utilitySign = new THREE.TextureLoader().load('images/sign-10.png')
const utilitySignMaterial = new THREE.MeshBasicMaterial({map: utilitySign})
// Right Lane Closed Ahead
const rLaneSign = new THREE.TextureLoader().load('images/sign-11.png')
const rLaneSignMaterial = new THREE.MeshBasicMaterial({map: rLaneSign})
// Men at Work
const menWorkSign = new THREE.TextureLoader().load('images/sign-12.png')
const menWorkSignMaterial = new THREE.MeshBasicMaterial({map: menWorkSign})
// Left Lane Closed Ahead
const lLaneSign = new THREE.TextureLoader().load('images/sign-13.png')
const lLaneMaterial = new THREE.MeshBasicMaterial({map: lLaneSign})
// Flag Men Ahead
const fMenSign = new THREE.TextureLoader().load('images/sign-14.png')
const fMenSignMaterial = new THREE.MeshBasicMaterial({map: fMenSign})
// Flagger Ahead
const flagAheadSign = new THREE.TextureLoader().load('images/sign-15.png')
const flagAheadSignMaterial = new THREE.MeshBasicMaterial({map: flagAheadSign})
// Lane Closed Ahead
const closedSign = new THREE.TextureLoader().load('images/sign-16.png')
const closedSignMaterial = new THREE.MeshBasicMaterial({map: closedSign})
// End Road Work
const endWorkSign = new THREE.TextureLoader().load('images/sign-17.png')
const endSignMaterial = new THREE.MeshBasicMaterial({map: endWorkSign})

// Geometry
const coneGeometry = new THREE.CylinderGeometry(
	0.07,
	0.2,
	0.5,
	32,
	0.8,
	false,
	0.8
)
const coneBottomG = new THREE.BoxGeometry(0.5, 0.06, 0.5)
coneBottomG.translate(0, -0.23, 0)
coneGeometry.merge(coneBottomG)
coneGeometry.scale(1.5, 1.5, 1.5)
coneGeometry.translate(0, 0.125, 0)
const stripeGeometry = new THREE.CylinderGeometry(
	0.116,
	0.155,
	0.15,
	32,
	1,
	false,
	0.8
)
stripeGeometry.scale(1.5, 1.5, 1.5)
stripeGeometry.translate(0, 0.125, 0)

let showing = 'none'

function slide(id) {
	if (showing !== 'none') {
		document.getElementById(showing).style.top = '-535px'
	}

	if (showing !== 'none') {
		document.getElementById('button-' + showing).classList.remove('selected')
	}

	if (showing === id) {
		showing = 'none'
	} else {
		document.getElementById('button-' + id).classList.add('selected')
		document.getElementById(id).style.top = '100px'
		showing = id
	}
}

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
	camera = new THREE.PerspectiveCamera(
		60,
		window.innerWidth / (window.innerHeight - 100),
		1,
		100
	)
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

function initBackHoe() {
	const base = new THREE.Geometry()
	const metal = new THREE.Geometry()
	const shadowHoe = new THREE.Geometry()

	const blockGeometry = new THREE.BoxGeometry(4, 0.5, 1.2)
	blockGeometry.translate(0.75, 0.25, -0.5)
	base.merge(blockGeometry)
	const backAngle = new THREE.BoxGeometry(0.5, 0.5, 1.2)
	backAngle.translate(-1, 1, -0.5)
	backAngle.vertices[4].y -= 0.5
	backAngle.vertices[5].y -= 0.5
	base.merge(backAngle)
	const backSolid = new THREE.BoxGeometry(0.25, 0.5, 1.2)
	backSolid.translate(-0.63, 1, -0.5)
	base.merge(backSolid)
	const middleSolid = new THREE.BoxGeometry(2.5, 0.25, 1.2)
	middleSolid.translate(0, 0.625, -0.5)
	base.merge(middleSolid)
	const roofSolid = new THREE.BoxGeometry(1.9, 0.1, 1.3)
	roofSolid.translate(0.4, 2.3, -0.5)
	base.merge(roofSolid)

	const armBase = new THREE.BoxGeometry(0.75, 0.5, 0.25)
	armBase.translate(2.55, 0.25, 0.25)
	armBase.vertices[4].x -= 0.5
	armBase.vertices[5].x -= 0.5
	armBase.vertices[0].y += 0.55
	armBase.vertices[1].y += 0.55
	armBase.vertices[0].x -= 0.4
	armBase.vertices[1].x -= 0.4
	armBase.vertices[2].y += 1
	armBase.vertices[3].y += 1
	armBase.vertices[6].y += 0.5
	armBase.vertices[7].y += 0.5
	armBase.vertices[6].x += 0.2
	armBase.vertices[7].x += 0.2
	base.merge(armBase)
	armBase.translate(0, 0, -1.5)
	base.merge(armBase)
	const armLeft = new THREE.BoxGeometry(1, 0.25, 0.3)
	armLeft.translate(3.025, 1.18, 0.25)
	armLeft.vertices[4].x += 0.35
	armLeft.vertices[5].x += 0.35
	armLeft.vertices[0].y -= 0.3
	armLeft.vertices[1].y -= 0.3
	armLeft.vertices[2].y -= 0.5
	armLeft.vertices[3].y -= 0.5
	base.merge(armLeft)
	armLeft.translate(0, 0, -1.5)
	base.merge(armLeft)
	const armRight = new THREE.BoxGeometry(0.75, 0.45, 0.3)
	armRight.translate(3.9, 0.78, 0.25)
	armRight.vertices[0].y -= 0.5
	armRight.vertices[1].y -= 0.5
	armRight.vertices[0].x += 0.2
	armRight.vertices[1].x += 0.2
	armRight.vertices[2].y -= 0.5
	armRight.vertices[3].y -= 0.5
	base.merge(armRight)
	armRight.translate(0, 0, -1.5)
	base.merge(armRight)

	const innerHub = new THREE.TorusGeometry(0.34, 0.1, 4, 50, 6.3)
	innerHub.translate(-0.25, -0.213, 0.415)
	base.merge(innerHub)
	innerHub.translate(0, 0, -1.825)
	base.merge(innerHub)
	innerHub.translate(3.2, 0, 0)
	base.merge(innerHub)
	innerHub.translate(0, 0, 1.825)
	base.merge(innerHub)
	const flatHub = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32)
	flatHub.translate(-0.25, 0.2, 0.25)
	flatHub.rotateX(1.6)
	base.merge(flatHub)
	flatHub.translate(0, 0, -1.3)
	base.merge(flatHub)
	flatHub.translate(3.25, 0, 0)
	base.merge(flatHub)
	flatHub.translate(0, 0, 1.3)
	base.merge(flatHub)

	const BackHoe = new THREE.Mesh(base, truckMaterial)
	shadowHoe.merge(base)

	const glass = new THREE.BoxGeometry(2.75, 1.75, 1.125)
	glass.translate(0.94, 1.375, -0.5)
	glass.vertices[0].x -= 1.1
	glass.vertices[1].x -= 1.1
	glass.vertices[3].y += 0.15
	glass.vertices[2].y += 0.15

	const truckWindow = new THREE.Mesh(glass, windowColor)
	BackHoe.add(truckWindow)
	shadowHoe.merge(glass)

	let verticalBarGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1)
	verticalBarGeometry.translate(-0.45, 1.5, 0.05)
	metal.merge(verticalBarGeometry)
	verticalBarGeometry.translate(0.55, 0, 0)
	metal.merge(verticalBarGeometry)
	verticalBarGeometry.translate(0, 0, -1.1)
	metal.merge(verticalBarGeometry)
	verticalBarGeometry.translate(-0.55, 0, 0)
	metal.merge(verticalBarGeometry)
	verticalBarGeometry = new THREE.BoxGeometry(0.05, 1.5, 0.1)
	verticalBarGeometry.translate(1.23, 1.5, 0.05)
	metal.merge(verticalBarGeometry)
	verticalBarGeometry.translate(0, 0, -1.1)
	metal.merge(verticalBarGeometry)
	const verticalBarGeometryBig = new THREE.BoxGeometry(0.05, 1.75, 0.1)
	verticalBarGeometryBig.translate(1.28, 1.375, 0.05)
	verticalBarGeometryBig.vertices[0].y -= 0.05
	verticalBarGeometryBig.vertices[1].y -= 0.05
	metal.merge(verticalBarGeometryBig)
	verticalBarGeometryBig.translate(0, 0, -1.1)
	metal.merge(verticalBarGeometryBig)
	const verticalBarGeometryLittle = new THREE.BoxGeometry(0.1, 0.25, 0.1)
	verticalBarGeometryLittle.translate(2.3, 0.625, 0.05)
	verticalBarGeometryLittle.vertices[0].y -= 0.05
	verticalBarGeometryLittle.vertices[1].y -= 0.05
	metal.merge(verticalBarGeometryLittle)
	verticalBarGeometryLittle.translate(0, 0, -1.1)
	metal.merge(verticalBarGeometryLittle)
	let horizontalBarGeometry = new THREE.BoxGeometry(1.75, 0.1, 0.1)
	horizontalBarGeometry.translate(0.375, 2.2, 0.05)
	metal.merge(horizontalBarGeometry)
	horizontalBarGeometry.translate(0, 0, -1.1)
	metal.merge(horizontalBarGeometry)
	horizontalBarGeometry = new THREE.BoxGeometry(1, 0.1, 0.1)
	horizontalBarGeometry.translate(1.75, 0.55, 0.05)
	metal.merge(horizontalBarGeometry)
	horizontalBarGeometry.translate(0, 0, -1.1)
	metal.merge(horizontalBarGeometry)
	horizontalBarGeometry = new THREE.BoxGeometry(1.75, 0.5, 0.1)
	horizontalBarGeometry.translate(0.4, 1, 0.05)
	metal.merge(horizontalBarGeometry)
	horizontalBarGeometry.translate(0, 0, -1.1)
	metal.merge(horizontalBarGeometry)
	const backBarGeometry = new THREE.BoxGeometry(0.01, 0.2, 1)
	backBarGeometry.translate(-0.496, 1.3, -0.5)
	metal.merge(backBarGeometry)
	backBarGeometry.translate(0, 0.9, 0)
	metal.merge(backBarGeometry)
	const diagonalBarGeometry = new THREE.BoxGeometry(1.045, 0.1, 0.1)
	diagonalBarGeometry.translate(1.825, 2.155, 0.05)
	diagonalBarGeometry.vertices[0].y -= 1.5
	diagonalBarGeometry.vertices[1].y -= 1.5
	diagonalBarGeometry.vertices[2].y -= 1.5
	diagonalBarGeometry.vertices[3].y -= 1.5
	metal.merge(diagonalBarGeometry)
	diagonalBarGeometry.translate(0, 0, -1.1)
	metal.merge(diagonalBarGeometry)
	const frontBarGeometry = new THREE.BoxGeometry(0.1, 0.1, 1)
	frontBarGeometry.translate(2.3, 0.55, -0.5)
	metal.merge(frontBarGeometry)

	const metalButt = new THREE.BoxGeometry(0.4, 0.1, 0.4)
	metalButt.translate(0.7, 0.75, -0.5)
	metal.merge(metalButt)
	const metalBack = new THREE.BoxGeometry(0.1, 0.7, 0.4)
	metalBack.translate(0.45, 1.05, -0.5)
	metal.merge(metalBack)
	const truckSteering = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32)
	truckSteering.translate(1.5, -0.75, -0.5)
	truckSteering.rotateZ(1.2)
	metal.merge(truckSteering)
	const truckConsole = new THREE.BoxGeometry(0.95, 0.24, 0.98)
	truckConsole.translate(1.75, 0.65, -0.5)
	metal.merge(truckConsole)
	const truckInnerConsole = new THREE.BoxGeometry(0.95, 0.5, 0.98)
	truckInnerConsole.translate(1.75, 1, -0.5)
	truckInnerConsole.vertices[0].x -= 0.4
	truckInnerConsole.vertices[1].x -= 0.4
	metal.merge(truckInnerConsole)

	const shape = new THREE.Shape()
	shape.moveTo(0, 0.75)
	shape.bezierCurveTo(0, 1.75, 1.5, 1.75, 1.5, 0.75)
	shape.lineTo(1.125, 0.75001)
	shape.bezierCurveTo(1.125, 1.25, 0.375, 1.25, 0.375, 0.75)
	shape.bezierCurveTo(0.375, 0.35, 1.125, 0.35, 1.125, 0.75)
	shape.lineTo(1.5, 0.75001)
	shape.bezierCurveTo(1.5, -0.125, 0, -0.125, 0, 0.75)
	const extrudeSettings = {
		amount: 0.5,
		steps: 50,
		bevelEnabled: false,
		curveSegments: 8
	}
	const truckTire = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	truckTire.translate(-1, -1, 0)
	metal.merge(truckTire)
	truckTire.translate(0, 0, -1.5)
	metal.merge(truckTire)
	truckTire.translate(3.2, 0, 0)
	metal.merge(truckTire)
	truckTire.translate(0, 0, 1.5)
	metal.merge(truckTire)
	const nut = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 6)
	nut.rotateX(1.6)
	nut.translate(-0.25, -0.2, 0.3)
	metal.merge(nut)
	nut.translate(0, 0, -1.5)
	metal.merge(nut)
	nut.translate(3.2, 0, 0)
	metal.merge(nut)
	nut.translate(0, 0, 1.5)
	metal.merge(nut)

	let truckBumper = new THREE.BoxGeometry(0.2, 0.2, 1.5)
	truckBumper.translate(-1.25, 0, -0.5)
	metal.merge(truckBumper)
	truckBumper = new THREE.BoxGeometry(0.32, 0.2, 1.5)
	truckBumper.translate(-1.19, -0.2, -0.5)
	metal.merge(truckBumper)
	truckBumper = new THREE.BoxGeometry(1.25, 0.2, 1.5)
	truckBumper.translate(1.25, -0.2, -0.5)
	metal.merge(truckBumper)
	truckBumper = new THREE.BoxGeometry(0.2, 0.2, 0.9)
	truckBumper.translate(2.75, -0.2, -0.45)
	metal.merge(truckBumper)
	const truckLicense = new THREE.BoxGeometry(0.05, 0.2, 0.5)
	truckLicense.translate(-1.25, 0.3, -0.5)
	metal.merge(truckLicense)

	let Scoop = new THREE.BoxGeometry(0.5, 0.2, 2)
	Scoop.rotateZ(0.2)
	Scoop.translate(4.825, 0.7, -0.5)
	metal.merge(Scoop)
	Scoop = new THREE.BoxGeometry(1, 0.2, 2)
	Scoop.rotateZ(1.15)
	Scoop.translate(4.45, 0.25, -0.5)
	metal.merge(Scoop)
	Scoop = new THREE.BoxGeometry(1, 0.2, 2)
	Scoop.rotateZ(-0.7)
	Scoop.translate(4.61, -0.42, -0.5)
	metal.merge(Scoop)
	Scoop = new THREE.BoxGeometry(0.75, 0.2, 2)
	Scoop.translate(5.3, -0.717, -0.5)
	metal.merge(Scoop)
	Scoop = new THREE.BoxGeometry(0.5, 0.25, 0.2)
	Scoop.translate(4.839, 0.53, 0.4)
	Scoop.vertices[6].y += 0.2
	Scoop.vertices[7].y += 0.2
	Scoop.vertices[2].y += 0.1
	Scoop.vertices[3].y += 0.1
	Scoop.vertices[2].x -= 0.15
	Scoop.vertices[3].x -= 0.15
	metal.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	metal.merge(Scoop)
	Scoop = new THREE.BoxGeometry(0.75, 0.25, 0.2)
	Scoop.translate(5.3, -0.5, 0.4)
	Scoop.vertices[4].x += 0.2
	Scoop.vertices[5].x += 0.2
	Scoop.vertices[0].y -= 0.2
	Scoop.vertices[1].y -= 0.2
	metal.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	metal.merge(Scoop)
	Scoop = new THREE.BoxGeometry(0.75, 0.75, 0.2)
	Scoop.translate(4.75, 0.25, 0.4)
	Scoop.vertices[2].x += 0.1
	Scoop.vertices[3].x += 0.1
	Scoop.vertices[4].x += 0.2
	Scoop.vertices[5].x += 0.2
	Scoop.vertices[0].x -= 0.23
	Scoop.vertices[1].x -= 0.23
	Scoop.vertices[0].y += 0.02
	Scoop.vertices[1].y += 0.02
	metal.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	metal.merge(Scoop)
	Scoop = new THREE.BoxGeometry(0.5, 0.5, 0.2)
	Scoop.translate(4.875, -0.375, 0.4)
	Scoop.vertices[0].x += 0.1
	Scoop.vertices[1].x += 0.1
	Scoop.vertices[2].x += 0.3
	Scoop.vertices[3].x += 0.3
	Scoop.vertices[4].x -= 0.25
	Scoop.vertices[5].x -= 0.25
	Scoop.vertices[6].x += 0.05
	Scoop.vertices[7].x += 0.05
	Scoop.vertices[6].y += 0.05
	Scoop.vertices[7].y += 0.05
	metal.merge(Scoop)
	Scoop.translate(0, 0, -1.8)
	metal.merge(Scoop)

	const truckFrame = new THREE.Mesh(metal, gray)
	BackHoe.add(truckFrame)
	shadowHoe.merge(metal)

	const truckShadows = new THREE.Mesh(shadowHoe, shadows)
	BackHoe.add(truckShadows)

	BackHoe.castShadow = true
	BackHoe.position.set(2.5, 1.4, -15)
	scene.add(BackHoe)
}

function flagger(group, color) {
	const vest = new THREE.Geometry()
	const stripes = new THREE.Geometry()
	const pants = new THREE.Geometry()
	const groupColor = new THREE.Geometry()
	const skin = new THREE.Geometry()
	const shadow = new THREE.Geometry()

	const clickGeometry = new THREE.BoxGeometry(1.7, 2, 1)
	clickGeometry.rotateY(-0.5)
	clickGeometry.center()
	clickGeometry.translate(0.05, 0, 0)
	const clickBox = new THREE.Mesh(clickGeometry, clickBoxMaterial)

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
	torso.rotateY(-0.5)
	torso.translate(0.45, 0, 0.7)
	torso.scale(0.5, 0.5, 0.5)
	groupColor.merge(torso)

	const dome = new THREE.SphereGeometry(0.2, 32, 32, 1, 6.3, 0, 1.5)
	dome.translate(0, 0.7, 0)
	const brim = new THREE.CylinderGeometry(0.2, 0.2, 0.02, 32)
	brim.translate(0, 0.72, 0.1)
	dome.merge(brim)
	dome.rotateY(-0.5)
	dome.translate(0.225, 0, 0.345)
	groupColor.merge(dome)

	const sign = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 8)
	sign.translate(0.75, 0.25, -0.55)
	sign.rotateZ(1.25)
	sign.rotateY(0.75)
	sign.rotateX(0.5)
	groupColor.merge(sign)
	groupColor.center()
	groupColor.translate(0, 0.2, 0)
	const coreColor = new THREE.Mesh(groupColor, color)
	coreColor.castShadow = true
	shadow.merge(groupColor)
	clickBox.add(coreColor)

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
	vest.rotateY(-0.5)
	vest.center()
	vest.translate(0.295, -0.12, 0.165)
	const vestBase = new THREE.Mesh(vest, orange)
	vestBase.castShadow = true
	shadow.merge(vest)
	clickBox.add(vestBase)

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
	stripes.rotateY(-0.5)
	stripes.center()
	stripes.translate(0.295, -0.12, 0.165)
	const vestStripes = new THREE.Mesh(stripes, yellow)
	shadow.merge(stripes)
	clickBox.add(vestStripes)

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
	pants.rotateY(-0.5)
	pants.scale(0.5, 0.5, 0.5)
	pants.center()
	pants.translate(0.295, -0.78, 0.165)
	const jeans = new THREE.Mesh(pants, blue)
	vestBase.castShadow = true
	shadow.merge(pants)
	clickBox.add(jeans)

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
	skin.rotateY(-0.5)
	skin.scale(0.5, 0.5, 0.5)
	skin.center()
	skin.translate(0.215, 0.11, 0.155)

	const skinTone = ~~(Math.random() * (4 - 1))
	const skins = [skinTone1, skinTone2, skinTone3, skinTone4]
	const body = new THREE.Mesh(skin, skins[skinTone])
	shadow.merge(skin)
	clickBox.add(body)

	const wood = new THREE.CylinderGeometry(0.05, 0.05, 2.4, 32)
	wood.scale(0.5, 0.5, 0.5)
	wood.center()
	wood.translate(-0.3, -0.3, -0.15)
	const stick = new THREE.Mesh(wood, gray)
	shadow.merge(wood)
	clickBox.add(stick)

	const shadowFlagger = new THREE.Mesh(shadow, shadows)
	clickBox.add(shadowFlagger)

	clickBox.rotation.set(0, -1.4, 0)
	clickBox.position.set(-6, 1.48, -12)
	clickBox.name = group + '-flagger1'
	scene.add(clickBox)
	flaggers.push(clickBox)

	const clickBox2 = clickBox.clone(true)
	clickBox2.rotation.set(0, 1.8, 0)
	clickBox2.position.set(10, 1.48, -28)
	clickBox2.name = group + '-flagger2'
	scene.add(clickBox2)
	flaggers.push(clickBox2)
}

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

function initWorkers() {
	const skin1 = new THREE.Geometry()
	const skin2 = new THREE.Geometry()
	const skin3 = new THREE.Geometry()
	const vest = new THREE.Geometry()
	const stripes = new THREE.Geometry()
	const jean = new THREE.Geometry()
	const shirt = new THREE.Geometry()
	const shadow = new THREE.Geometry()
	const skins = [skinTone1, skinTone2, skinTone3, skinTone4]

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
	people.position.set(-2.35, -0.03, -17.55)
	scene.add(people)
}

function render() {
	scene.position.set(0, 0, 3)
	renderer.render(scene, camera)
}

function animate() {
	render()
	controls.update()
}

init()
animate()

function focusChange(input) {
	input.parentNode.classList.add('inputFocus')
	input.parentNode.classList.add('filled')
}

function focusStop(input) {
	input.parentNode.classList.remove('inputFocus')
	if (!input.value) {
		input.parentNode.classList.remove('filled')
	}
}

const arrows = [[], [], [], [], [], [], []]

function arrowArray(group, checkbox) {
	const idx = arrows[group].indexOf(checkbox.value)

	if (idx !== -1) {
		// If already in array
		arrows[group].splice(idx, 1) // Make sure we remove it
	}

	if (checkbox.checked) {
		// If checked
		arrows[group].unshift(checkbox.value) // Add to end of array
	}
}

function arrowSign(color, group) {
	if (arrows[group].length <= 0) {
		return
	}
	const base = new THREE.Geometry()
	const accent = new THREE.Geometry()

	const clickGeometry = new THREE.BoxGeometry(3.5, 4, 1)
	clickGeometry.rotateY(-1.2)
	clickGeometry.center()
	const clickBox = new THREE.Mesh(clickGeometry, clickBoxMaterial)
	const clickBox2 = clickBox.clone()

	const vertical = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 32)
	vertical.translate(-1.1, 2.95, -16.1)
	accent.merge(vertical)
	vertical.translate(0, -0.5, 0)
	accent.merge(vertical)
	vertical.translate(0, -0.5, 0)
	accent.merge(vertical)
	vertical.translate(0, -0.47, 0)
	accent.merge(vertical)
	vertical.translate(-0.2, 0, 0)
	accent.merge(vertical)
	vertical.translate(0, -0.5, 0)
	accent.merge(vertical)

	vertical.translate(2.501, 0, 0)
	accent.merge(vertical)
	vertical.translate(0, 0.5, 0)
	accent.merge(vertical)
	vertical.translate(-0.2, 0, 0)
	accent.merge(vertical)
	vertical.translate(0, 0.47, 0)
	accent.merge(vertical)
	vertical.translate(0, 0.5, 0)
	accent.merge(vertical)
	vertical.translate(0, 0.5, 0)
	accent.merge(vertical)

	const horizontal = new THREE.CylinderGeometry(0.05, 0.05, 2.601, 32)
	horizontal.rotateZ(1.58)
	horizontal.translate(-0.05, 1.75, -16.1)
	accent.merge(horizontal)
	horizontal.translate(0, -0.5, 0)
	accent.merge(horizontal)
	horizontal.translate(0, -0.5, 0)
	accent.merge(horizontal)

	const hub = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 32, 1, false, 0, 3.1)
	hub.rotateZ(1.58)
	hub.translate(1.4, 0.75, -16.1)
	accent.merge(hub)
	hub.translate(-2.9, 0, 0)
	accent.merge(hub)

	const bulb = new THREE.CylinderGeometry(0.01, 0.1, 0.2, 32)
	bulb.rotateX(1.55)
	bulb.translate(-0.4, 3.7, -16.1)
	accent.merge(bulb)
	bulb.translate(-0.35, -0.35, 0)
	accent.merge(bulb)
	bulb.translate(-0.35, -0.35, 0)
	accent.merge(bulb)
	bulb.translate(0.7, 0, 0)
	accent.merge(bulb)
	bulb.translate(0.35, 0, 0)
	accent.merge(bulb)
	bulb.translate(0.35, 0, 0)
	accent.merge(bulb)
	bulb.translate(0.35, 0, 0)
	accent.merge(bulb)
	bulb.translate(0.35, 0, 0)
	accent.merge(bulb)
	bulb.translate(-1.75, -0.35, 0)
	accent.merge(bulb)
	bulb.translate(0.35, -0.35, 0)
	accent.merge(bulb)
	accent.translate(0, 0, 0.15)
	accent.rotateY(-1.2)
	accent.center()

	const stand = new THREE.Mesh(accent, color)
	stand.castShadow = true
	clickBox.add(stand)
	const stand2 = stand.clone()
	stand2.translateOnAxis(new THREE.Vector3(1, 0, -1).normalize(), 0.09)
	clickBox2.add(stand2)

	const board = new THREE.BoxGeometry(3, 2.2, 0.2)
	board.translate(0, 3, -16)
	base.merge(board)

	const wheel = new THREE.CylinderGeometry(0.26, 0.26, 0.26, 32)
	wheel.rotateZ(1.58)
	wheel.translate(1.4, 0.74, -16)
	base.merge(wheel)
	wheel.translate(-2.9, 0, 0)
	base.merge(wheel)
	base.rotateY(-1.2)
	base.center()
	base.translate(0.025, 0, -0.025)
	const sign = new THREE.Mesh(base, gray)
	sign.castShadow = true
	clickBox.add(sign)
	const sign2 = sign.clone()
	clickBox2.add(sign2)

	clickBox.name = group + '-arrow1'
	clickBox.position.set(-1, 2.3, -16)
	scene.add(clickBox)
	flaggers.push(clickBox)

	clickBox2.name = group + '-arrow2'
	clickBox2.rotation.set(0, -0.8, 0)
	clickBox2.position.set(10, 2.3, -16)
	scene.add(clickBox2)
	flaggers.push(clickBox2)
}

const end = [[], [], [], [], [], [], []]

function endArray(group, checkbox) {
	const idx = end[group].indexOf(checkbox.value)

	if (idx !== -1) {
		end[group].splice(idx, 1)
	}

	if (checkbox.checked) {
		end[group].unshift(checkbox.value)
	}
}

function endSign(color, group) {
	if (end[group].length <= 0) {
		return
	}
	const signBase = new THREE.BoxGeometry(2.8, 2.25, 0.1)
	signBase.rotateX(-1.6)
	const signColor = new THREE.BoxGeometry(3.2, 3.2, 0.1)
	signColor.rotateX(-1.6)
	let xPos = 25

	if (Math.abs(group % 2) !== 0) {
		xPos -= 3
	}

	const groupNumber = group * 4
	signBase.translate(xPos, 0.5, -9.75 + groupNumber)
	const image = new THREE.Mesh(signBase, endSignMaterial)
	signColor.translate(xPos, 0.48, -10 + groupNumber)
	const base = new THREE.Mesh(signColor, color)
	image.add(base)
	image.name = 'signGroup-' + group
	image.castShadow = true
	scene.add(image)
}

const canv = renderer.domElement
const rect = canv.getBoundingClientRect()
let yHolder
let currentHex = []
let movingOn = false

function onDocumentMouseDown(event) {
	event.preventDefault()
	if (hovered) {
		const flaggerMan = hovered.children
		const flaggerMaterial = hovered.children[0].material
		controls.enabled = false

		if (movingOn) {
			const browserWidth = (event.clientX - rect.left) / canv.clientWidth
			const browserHeight = (event.clientY - rect.top) / canv.clientHeight
			mouse.x = browserWidth * 2
			mouse.y = -(browserHeight * 2)
			raycaster.setFromCamera(mouse, camera)
			const ground = raycaster.intersectObject(objectPlane)
			if (ground.length > 0) {
				hovered.position.set(ground[0].point.x, yHolder, ground[0].point.z - 3)
			}

			let i = 0
			flaggerMan.forEach(child => {
				child.material = currentHex[i]
				i++
			})
			currentHex = []

			movingOn = false
			container.addEventListener('mousemove', onDocumentMouseMove, false)
		} else {
			container.removeEventListener('mousemove', onDocumentMouseMove, false)
			movingOn = true
			yHolder = hovered.position.y

			flaggerMan.forEach(child => {
				currentHex.push(child.material)
			})

			glow.color.setHex(flaggerMaterial.color.getHex())

			flaggerMan.forEach(child => {
				child.material = glow
			})

			hovered.position.set(
				hovered.position.x,
				hovered.position.y + 1,
				hovered.position.z
			)
		}
		render()
	}
}

function onDocumentTouchStart(event) {
	event.preventDefault()
	event = event.changedTouches[0]
	const browserWidth = (event.clientX - rect.left) / canv.clientWidth
	const browserHeight = (event.clientY - rect.top) / canv.clientHeight
	mouse.x = browserWidth * 2
	mouse.y = -(browserHeight * 2)

	raycaster.setFromCamera(mouse, camera)
	const people = raycaster.intersectObjects(flaggers)
	const ground = raycaster.intersectObject(objectPlane)
	if (people.length > 0) {
		controls.enabled = false
		if (hovered !== people[0].object) {
			hovered = people[0].object
		}
	}

	if (hovered) {
		const flaggerMan = hovered.children
		const flaggerMaterial = hovered.children[0].material
		if (movingOn) {
			if (ground.length > 0) {
				hovered.position.set(ground[0].point.x, yHolder, ground[0].point.z - 3)
			}

			let i = 0
			flaggerMan.forEach(child => {
				child.material = currentHex[i]
				i++
			})
			currentHex = []
			movingOn = false
			container.addEventListener('touchmove', onDocumentTouchMove, false)
		} else {
			container.removeEventListener('touchmove', onDocumentTouchMove, false)
			movingOn = true
			yHolder = hovered.position.y

			flaggerMan.forEach(child => {
				currentHex.push(child.material)
			})

			glow.color.setHex(flaggerMaterial.color.getHex())

			flaggerMan.forEach(child => {
				child.material = glow
			})
			hovered.position.set(
				hovered.position.x,
				hovered.position.y + 1,
				hovered.position.z
			)
		}
		render()
	}
}

function onDocumentMouseMove(event) {
	event.preventDefault()
	// Subtract the extra space on the left and top and dicide by width and height
	const browserWidth = (event.clientX - rect.left) / canv.clientWidth
	const browserHeight = (event.clientY - rect.top) / canv.clientHeight
	mouse.x = browserWidth * 2
	mouse.y = -(browserHeight * 2)

	raycaster.setFromCamera(mouse, camera)
	const people = raycaster.intersectObjects(flaggers)

	// When mouse is over an object in the flaggers array, change to pointer
	if (people.length > 0) {
		// If the object is in the flaggers array, make it the selected object
		if (hovered !== people[0].object) {
			hovered = people[0].object
		}
		canv.style.cursor = 'pointer'
	} else {
		hovered = null
		canv.style.cursor = 'auto'
	}
}

// Controls modified from above to suit touch Controls

function onDocumentTouchMove(event) {
	event.preventDefault()
	event = event.changedTouches[0]
	// Subtract the extra space on the left and top and dicide by width and height
	const browserWidth = (event.clientX - rect.left) / canv.clientWidth
	const browserHeight = (event.clientY - rect.top) / canv.clientHeight
	mouse.x = browserWidth * 2
	mouse.y = -(browserHeight * 2)

	raycaster.setFromCamera(mouse, camera)
	const ground = raycaster.intersectObject(objectPlane)

	// Touch controls don't need to change selected to dragged
	// Because there is no hover with a touch control
	if (selected) {
		if (ground.length > 0) {
			selected.position.set(
				ground[0].point.x,
				selected.position.y,
				ground[0].point.z
			)
			render()
		}
	}
}

function onDocumentMouseCancel(event) {
	event.preventDefault()
	if (movingOn) {
		//
	} else {
		controls.enabled = true
		hovered = null
		canv.style.cursor = 'auto'
	}
}

function onDocumentTouchEnd(event) {
	event.preventDefault()
	if (movingOn) {
		//
	} else {
		controls.enabled = true
		hovered = null
		canv.style.cursor = 'auto'
	}
}

const clearCones = (group, close) => {
	// Remove old render if it exists
	if (scene.getObjectByName(group + '-cones')) {
		scene.remove(scene.getObjectByName(group + '-cones'))
	}
	if (scene.getObjectByName('signGroup-' + group)) {
		scene.remove(scene.getObjectByName('signGroup-' + group))
	}
	if (scene.getObjectByName(group + '-flagger1')) {
		scene.remove(scene.getObjectByName(group + '-flagger1'))
	}
	if (scene.getObjectByName(group + '-flagger2')) {
		scene.remove(scene.getObjectByName(group + '-flagger2'))
	}
	if (scene.getObjectByName(group + '-arrow1')) {
		scene.remove(scene.getObjectByName(group + '-arrow1'))
	}
	if (scene.getObjectByName(group + '-arrow2')) {
		scene.remove(scene.getObjectByName(group + '-arrow2'))
	}
	if (scene.getObjectByName('spacing-' + group)) {
		scene.remove(scene.getObjectByName('spacing-' + group))
	}
	if (scene.getObjectByName('signGroup-' + group)) {
		scene.remove(scene.getObjectByName('signGroup-' + group))
	}

	if (close) {
		const allSigns = document.getElementsByName('input-' + group)
		for (let i = 0; i < allSigns.length; i++) {
			if (allSigns[i].type === 'checkbox') {
				allSigns[i].checked = false
			}
			if (allSigns[i].type === 'text') {
				allSigns[i].value = ''
			}
		}
		signs[group] = []
		arrows[group] = []
		end[group] = []
		slide('group-' + group)
	}

	const newFlaggers = []
	for (let i = 0; i < flaggers.length; i++) {
		if (
			flaggers[i].name !== group + '-flagger1' &&
			flaggers[i].name !== group + '-flagger2' &&
			flaggers[i].name !== group + '-arrow1' &&
			flaggers[i].name !== group + '-arrow2'
		) {
			newFlaggers.push(flaggers[i])
		}
	}
	flaggers = newFlaggers
	render()
}

const renderCones = (group, color) => {
	clearCones(group, false)
	const shadow = new THREE.Geometry()
	const cone = coneGeometry.clone(true)
	const stripe = stripeGeometry.clone(true)
	const coneGroup = new THREE.Geometry()
	const stripeGroup = new THREE.Geometry()
	let initialX

	switch (group) {
		case 1:
			initialX = -1
			break
		case 2:
			initialX = -1.5
			break
		case 3:
			initialX = -2
			break
		case 4:
			initialX = -2.5
			break
		case 5:
			initialX = -3
			break
		case 6:
			initialX = -3.5
			break
		default:
			break
	}
	const buffer = Number(document.getElementById('buffer-' + group).value) / 50
	cone.translate(initialX, 0.75, -19)
	coneGroup.merge(cone)
	stripe.translate(initialX, 0.75, -19)
	stripeGroup.merge(stripe)

	let x = initialX
	for (let i = initialX; i >= initialX - buffer; i -= 2) {
		cone.translate(-2, 0, 0)
		coneGroup.merge(cone)
		stripe.translate(-2, 0, 0)
		stripeGroup.merge(stripe)
		x -= 2
	}

	const upstream =
		Number(document.getElementById('upstream-' + group).value) / 50
	const height = 4.5
	let cones = Math.pow(upstream, 2) + Math.pow(height, 2)
	cones = Math.floor(Math.sqrt(cones)) / 2
	let spacing = upstream / cones
	let angle = height / cones
	let y = 0

	cone.translate(-2, 0, 0)
	coneGroup.merge(cone)
	stripe.translate(-2, 0, 0)
	stripeGroup.merge(stripe)
	x -= 2
	let end = x - upstream

	for (let a = x; a > end; a -= spacing) {
		cone.translate(-spacing, 0, angle)
		coneGroup.merge(cone)
		stripe.translate(-spacing, 0, angle)
		stripeGroup.merge(stripe)
		y += angle
		x -= spacing
	}

	signSpace(color, group)

	switch (group) {
		case 1:
			initialX = 10
			break
		case 2:
			initialX = 10.5
			break
		case 3:
			initialX = 11
			break
		case 4:
			initialX = 11.5
			break
		case 5:
			initialX = 12
			break
		case 6:
			initialX = 12.5
			break
		default:
			break
	}

	cone.translate(Math.abs(x) + initialX, 0, -y)
	coneGroup.merge(cone)
	stripe.translate(Math.abs(x) + initialX, 0, -y)
	stripeGroup.merge(stripe)

	x = initialX

	const downBuff =
		Number(document.getElementById('downbuff-' + group).value) / 50

	if (downBuff && downBuff > 0) {
		for (let i = initialX; i <= initialX + downBuff; i += 2) {
			cone.translate(2, 0, 0)
			coneGroup.merge(cone)
			stripe.translate(2, 0, 0)
			stripeGroup.merge(stripe)
			x += 2
		}
	}

	const downstream =
		Number(document.getElementById('downstream-' + group).value) / 50

	cone.translate(2, 0, 0)
	coneGroup.merge(cone)
	stripe.translate(2, 0, 0)
	stripeGroup.merge(stripe)
	x += 2
	cones = Math.pow(downstream, 2) + Math.pow(height, 2)
	cones = Math.floor(Math.sqrt(cones)) / 2
	spacing = downstream / cones
	angle = height / cones
	y = 0
	end = x + downstream

	for (let a = x; a < end; a += spacing) {
		cone.translate(spacing, 0, angle)
		coneGroup.merge(cone)
		stripe.translate(spacing, 0, angle)
		stripeGroup.merge(stripe)
		y += angle
	}

	const groupCones = new THREE.Mesh(coneGroup, color)
	shadow.merge(coneGroup)
	const stripes = new THREE.Mesh(stripeGroup, white)
	groupCones.add(stripes)
	shadow.merge(stripeGroup)
	const coneShadow = new THREE.Mesh(shadow, shadows)
	groupCones.add(coneShadow)

	groupCones.castShadow = true
	groupCones.name = group + '-cones'
	scene.add(groupCones)

	slide('group-' + group)
	flagger(group, color)

	arrowSign(color, group)

	endSign(color, group)

	render()
}

function signArray(group, checkbox) {
	const idx = signs[group].indexOf(checkbox.value)
	if (idx !== -1) {
		// If already in array
		signs[group].splice(idx, 1) // Make sure we remove it
	}

	if (checkbox.checked) {
		// If checked
		signs[group].unshift(checkbox.value) // Add to end of array
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
			const groupNumber = group * 4
			textMesh.position.set(xPos + 4, 0.5, -9 + groupNumber)
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

	const groupNumber = group * 4
	signBase.rotateY(1.6)
	signBase.translate(xPos, 0.5, -10 + groupNumber)
	signColor.rotateY(1.6)
	signColor.translate(xPos, 0.48, -10 + groupNumber)

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

for (let i = 1; i <= 6; i++) {
	switch (i) {
		case 6:
			document.getElementById('place-' + i).addEventListener('click', () => {
				renderCones(i, yellow)
			})
			break
		case 5:
			document.getElementById('place-' + i).addEventListener('click', () => {
				renderCones(i, orange)
			})
			break
		case 4:
			document.getElementById('place-' + i).addEventListener('click', () => {
				renderCones(i, green)
			})
			break
		case 3:
			document.getElementById('place-' + i).addEventListener('click', () => {
				renderCones(i, blue)
			})
			break
		case 2:
			document.getElementById('place-' + i).addEventListener('click', () => {
				renderCones(i, purple)
			})
			break
		default:
			document.getElementById('place-' + i).addEventListener('click', () => {
				renderCones(i, red)
			})
	}

	document.getElementById('button-group-' + i).addEventListener('click', () => {
		slide('group-' + i)
	})

	document.getElementById('clear-' + i).addEventListener('click', () => {
		clearCones(i, true)
	})

	document
		.getElementById('option-' + i + '-arrowArray')
		.addEventListener('change', () => {
			arrowArray(i, document.getElementById('option-' + i + '-arrowArray'))
		})

	document
		.getElementById('option-' + i + '-endArray')
		.addEventListener('change', () => {
			endArray(i, document.getElementById('option-' + i + '-endArray'))
		})

	document
		.getElementById('sign-' + i + '-worker')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-worker'))
		})

	document
		.getElementById('sign-' + i + '-flagger')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-flagger'))
		})

	document
		.getElementById('sign-' + i + '-left')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-left'))
		})

	document
		.getElementById('sign-' + i + '-right')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-right'))
		})

	document
		.getElementById('sign-' + i + '-stop')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-stop'))
		})

	document
		.getElementById('sign-' + i + '-lane')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-lane'))
		})

	document
		.getElementById('sign-' + i + '-machine')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-machine'))
		})

	document
		.getElementById('sign-' + i + '-road')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-road'))
		})

	document
		.getElementById('sign-' + i + '-const')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-const'))
		})

	document
		.getElementById('sign-' + i + '-utility')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-utility'))
		})

	document
		.getElementById('sign-' + i + '-rLane')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-rLane'))
		})

	document
		.getElementById('sign-' + i + '-men')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-men'))
		})

	document
		.getElementById('sign-' + i + '-lLane')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-lLane'))
		})

	document
		.getElementById('sign-' + i + '-flag')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-flag'))
		})

	document
		.getElementById('sign-' + i + '-fAhead')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-fAhead'))
		})

	document
		.getElementById('sign-' + i + '-laneAhead')
		.addEventListener('change', () => {
			signArray(i, document.getElementById('sign-' + i + '-laneAhead'))
		})

	document.getElementById('sign-' + i).addEventListener('focus', () => {
		focusChange(document.getElementById('sign-' + i))
	})

	document.getElementById('sign-' + i).addEventListener('blur', () => {
		focusStop(document.getElementById('sign-' + i))
	})

	document.getElementById('upstream-' + i).addEventListener('focus', () => {
		focusChange(document.getElementById('upstream-' + i))
	})

	document.getElementById('upstream-' + i).addEventListener('blur', () => {
		focusStop(document.getElementById('upstream-' + i))
	})

	document.getElementById('buffer-' + i).addEventListener('focus', () => {
		focusChange(document.getElementById('buffer-' + i))
	})

	document.getElementById('buffer-' + i).addEventListener('blur', () => {
		focusStop(document.getElementById('buffer-' + i))
	})

	document.getElementById('downbuff-' + i).addEventListener('focus', () => {
		focusChange(document.getElementById('downbuff-' + i))
	})

	document.getElementById('downbuff-' + i).addEventListener('blur', () => {
		focusStop(document.getElementById('downbuff-' + i))
	})

	document.getElementById('downstream-' + i).addEventListener('focus', () => {
		focusChange(document.getElementById('downstream-' + i))
	})

	document.getElementById('downstream-' + i).addEventListener('blur', () => {
		focusStop(document.getElementById('downstream-' + i))
	})
}
