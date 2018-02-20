let showing = 'none'

function slide(id) {
	showing !== 'none' && (document.getElementById(showing).style.top = '-535px')
	showing !== 'none' && document.getElementById('button-'+showing).classList.remove("selected");

	if (showing === id) {
		showing = 'none'
	} else {
		document.getElementById('button-'+id).classList.add("selected");
		document.getElementById(id).style.top = '100px'
		showing = id
	}
}
