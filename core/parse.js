// parse arrays, functions, vectors, etc


function Array(string) {
	let out = string.split(';')

	let left = out[0]
	left = left.split(',')

	let right = out[1]
	right = right.split(',')

	let all = left.concat(right)
	all.forEach(item => {
		item = Number(item)
	})
	return all
}

function Color(hex_string) {
	return parseInt(hex_string.replace(/^#/, ''), 16);

}




export { Array, Color }