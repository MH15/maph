// link between dat.gui and the real code
import * as dat from 'dat.gui'

const ControlKit = require('controlkit');


function Generate(R2, V, R2_cb, V_cb, redrawVectors,redrawFunctions) {
	const controlKit = new ControlKit();
	var obj = {
				value : 1,
				str : 'abcd'
			};
			var select = {
				key : ['Option 1', 'Option 2', 'Option 3'],
				value : [
					function(time) {
						return Math.sin(time*0.75) * (Math.sin(time * 0.125) * Math.sin(time))
					},
					function(time){
						return Math.sin(time);
					},
					function(time){
						return Math.sin(time) * Math.sin(time);
					}
				]
			};
			var func = select.value[0];


	console.log(controlKit)


	let vectors_group = controlKit.addPanel({label: 'Vectors', align : 'left', width: 200, enable: true})
	// create vector inputs
	vectors_group.addButton('update', redrawVectors)
	vectors_group.addButton('new vector', function () {
		data.vectors.push({
			name: `vector${data.vectors.length}`,
			string: '0, 0, 0; 1, 1, 1',
			tail: [0, 0, 0],
			head: [1, 1, 1],
			color: '#d35400'
		})
		let l = data.vectors.length - 1
		vectors_group.addStringInput(data.vectors[l], `string`, {label: data.vectors[l].name})
	})
	for (var i = 0; i < data.vectors.length; i ++) {
		// TODO: make it actually work
		vectors_group.addStringInput(data.vectors[i], `string`, {label: data.vectors[i].name})
	}
	let functions_group = controlKit.addPanel({label: 'Functions', align : 'left', width: 200, enable: false})
	// create function inputs
	functions_group.addButton('update', redrawFunctions)
	functions_group.addButton('new function', function () {
		data.functions.push({
			name: `function${data.functions.length}`,
			string: 'x',
			color: 0xd35400,
			parsed: {}
		})
		let l = data.functions.length - 1
		functions_group.addStringInput(data.functions[l], `string`, {label: data.functions[l].name})
		console.log(data)
	})
	for (var i = 0; i < data.functions.length; i ++) {
		functions_group.addStringInput(data.functions[i], `string`, {label: data.functions[i].name})
	}


	// Inspector
	// controlKit.addPanel({label:'Inspector', align : 'right', fixed: false, position: [window.innerWidth - 250, window.innerHeight -250]})
	// 		.addNumberInput(obj, 'value')
	// 		.addStringInput(obj, 'value');



	let r2 = new R2()
	let v = new V()

	const tools = new dat.GUI()

	const function_folder = tools.addFolder('Functions')
	function_folder.add(r2, 'function0')
	function_folder.add(r2, 'function1')


	const vectors_folder = tools.addFolder('Vectors')

	vectors_folder.add(v, 'new')
	for (let i = 0; i < 3; i++) {
		vectors_folder.add(v, `vector${i}`).onFinishChange(value => {
			V_cb(`vector${i}`, value)
		})
	}

	const analysis_folder = tools.addFolder('Analysis')
	const settings_folder = tools.addFolder('Settings')
	return {tools, function_folder, vectors_folder}
}



export { Generate }