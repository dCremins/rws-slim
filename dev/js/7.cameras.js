let controls = false

function controler() {
	if (controls) {
		document.getElementById('control_group').style.backgroundColor = 'transparent'
		document.getElementById('camera_buttons').style.right = '100%'
		controls = false
		return
	}
		document.getElementById('camera_buttons').style.right = '14.3%'
		document.getElementById('control_group').style.backgroundColor = 'white'
		controls = true
		return
}

function camera_up() {
  const position = camera.position
  camera.position.set(position.x, position.y, position.z - 2)
  render()
}

function camera_down() {
  const position = camera.position
  camera.position.set(position.x, position.y, position.z + 2)
  render()
}

function camera_left() {
  const position = camera.position
  camera.position.set(position.x - 2, position.y, position.z)
  render()
}

function camera_right() {
  const position = camera.position
  camera.position.set(position.x + 2, position.y, position.z)
  render()
}

function camera_zoomIn() {
  const position = camera.position
  camera.position.set(position.x, position.y - 2, position.z)
  render()
}

function camera_zoomOut() {
  const position = camera.position
  camera.position.set(position.x, position.y + 2, position.z)
  render()
}

document.getElementById('control_up').addEventListener('click', camera_up, false)
document.getElementById('control_down').addEventListener('click', camera_down, false)
document.getElementById('control_left').addEventListener('click', camera_left, false)
document.getElementById('control_right').addEventListener('click', camera_right, false)
document.getElementById('control_in').addEventListener('click', camera_zoomIn, false)
document.getElementById('control_out').addEventListener('click', camera_zoomOut, false)
document.getElementById('control_group').addEventListener('click', controler, false)
