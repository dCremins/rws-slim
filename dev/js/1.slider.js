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
		document.getElementById(id).style.top = '65px'
		showing = id
	}
}
