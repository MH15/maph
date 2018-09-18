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
	console.log(all)
	return all
}




export { Array }