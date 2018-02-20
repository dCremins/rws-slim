
function render() {
	scene.position.set(0, 0, 3)
	renderer.render(scene, camera)
}

function animate() {
	//requestAnimationFrame(animate)
	render()
	controls.update()
}

init()
animate()
