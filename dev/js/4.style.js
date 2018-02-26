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
