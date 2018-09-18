
import * as THREE from 'three'
import * as setup from './core/setup.js'
import * as gui from './core/gui.js'
import * as draw from './core/draw.js'
import * as parse from './core/parse.js'

// data store primitives
import * as store from './core/data.js'
window.data = store.data
window.draw = draw


setup.log("Init")

window.scene = setup.Scene()
let renderer = setup.Renderer()
let camera = setup.Camera()

let controls = setup.Controls(camera, renderer)


// helper
scene.add(new THREE.AxesHelper(200));
scene.add(new THREE.GridHelper(300,30))


function animate() {
	// stats.begin()
	requestAnimationFrame( animate );
	controls.update()
	renderer.render( scene, camera );
	// stats.end()
}
animate();


console.log(data)

// Draw all existing vectors, functions, and plot any other data
data.vectors.forEach(vector => {
	draw.Arrow(vector.tail, vector.head, vector.color, vector.name)
})



function R2() {
	this.function0 = 'x'
	this.function1 = 'x^2'
}

window.numbers = {
	vector: 2
}

function V() {
	this.vector0 = '40,50,20; 10,30,-20'

	// const watchedObject = onChange(this.vector0, () => {
	// 	console.log('Object changed:');
	// });
	this.vector1 = '10,30,-20; 0,0,0'
	this.vector2 = '0,0,0; 40,50,20'

	let self = this;
	this.new = () => {
		numbers.vector++
		this[`vector${numbers.vector}`] = '0, 0, 0; 1, 1, 1'
		tools.vectors_folder.add(self, `vector${numbers.vector}`).onFinishChange(value => {
			V_cb(`vector${numbers.vector}}`, value)
		})
	}

}


function V_cb(identifier, value) {

	let p = parse.Array(value)
	let tail = [p[0],p[1],p[2]]
	let head = [p[3],p[4],p[5]]
	draw.Arrow(tail, head, 0xf00000, identifier)
}

// initiate default GUI elements
const tools = gui.Generate(R2, V, null, V_cb)

var material = new THREE.LineBasicMaterial( { color: 0x00a400, linewidth:2 } );
var geometry = new THREE.Geometry();
for(let x = -100; x < 100; x+=0.01) {
	geometry.vertices.push(new THREE.Vector3( x, 1*Math.cos(x), 0) );

}
var line2 = new THREE.Line( geometry, material );
scene.add( line2 );