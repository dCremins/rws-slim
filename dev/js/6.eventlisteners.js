
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

	document.getElementById('option-' + i + '-arrowArray').addEventListener('change', () => {
		arrowArray(i, document.getElementById('option-' + i + '-arrowArray'))
	})

	document.getElementById('option-' + i + '-endArray').addEventListener('change', () => {
		endArray(i, document.getElementById('option-' + i + '-endArray'))
	})

	document.getElementById('sign-' + i + '-worker').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-worker'))
	})

	document.getElementById('sign-' + i + '-flagger').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-flagger'))
	})

	document.getElementById('sign-' + i + '-left').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-left'))
	})

	document.getElementById('sign-' + i + '-right').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-right'))
	})

	document.getElementById('sign-' + i + '-stop').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-stop'))
	})

	document.getElementById('sign-' + i + '-lane').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-lane'))
	})

	document.getElementById('sign-' + i + '-machine').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-machine'))
	})

	document.getElementById('sign-' + i + '-road').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-road'))
	})

	document.getElementById('sign-' + i + '-const').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-const'))
	})

	document.getElementById('sign-' + i + '-utility').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-utility'))
	})

	document.getElementById('sign-' + i + '-rLane').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-rLane'))
	})

	document.getElementById('sign-' + i + '-men').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-men'))
	})

	document.getElementById('sign-' + i + '-lLane').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-lLane'))
	})

	document.getElementById('sign-' + i + '-flag').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-flag'))
	})

	document.getElementById('sign-' + i + '-fAhead').addEventListener('change', () => {
		signArray(i, document.getElementById('sign-' + i + '-fAhead'))
	})

	document.getElementById('sign-' + i + '-laneAhead').addEventListener('change', () => {
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
