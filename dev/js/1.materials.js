/* Variables */
let scene
let camera
let controls
let renderer
let ambient
let lightSource
let objectPlane
let flaggers = []
const signs = [[], [], [], [], [], [], []]

const container = document.getElementById('container')
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const selected = null
let hovered = null

const glow = new THREE.MeshLambertMaterial({color: 0xB78DD1, emissive: 0x333333})

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
const windowColor = new THREE.MeshLambertMaterial({color: 0xD0DDE3, transparent: true, opacity: 0.5})
const clickBoxMaterial = new THREE.MeshLambertMaterial({color: 0xD0DDE3, transparent: true, opacity: 0})
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
const prepareStopSignMaterial = new THREE.MeshBasicMaterial({map: prepareStopSign})
// One Lane Road Ahead
const oneLaneSign = new THREE.TextureLoader().load('images/sign-06.png')
const oneLaneSignMaterial = new THREE.MeshBasicMaterial({map: oneLaneSign})
// Road Machinery Ahead
const machineAheadSign = new THREE.TextureLoader().load('images/sign-07.png')
const machineAheadSignMaterial = new THREE.MeshBasicMaterial({map: machineAheadSign})
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
const coneGeometry = new THREE.CylinderGeometry(0.07, 0.2, 0.5, 32, 0.8, false, 0.8)
const coneBottomG = new THREE.BoxGeometry(0.5, 0.06, 0.5)
coneBottomG.translate(0, -0.23, 0)
coneGeometry.merge(coneBottomG)
coneGeometry.scale(1.5, 1.5, 1.5)
coneGeometry.translate(0, 0.125, 0)
const stripeGeometry = new THREE.CylinderGeometry(0.116, 0.155, 0.15, 32, 1, false, 0.8)
stripeGeometry.scale(1.5, 1.5, 1.5)
stripeGeometry.translate(0, 0.125, 0)
