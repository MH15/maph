// maph.js

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcccccc );
// scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );



var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 0.5, 10, 10 );
var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

// helper
scene.add( new THREE.AxesHelper( 200 ) );


camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 40, 5, 30 );

// controls

controls = new THREE.OrbitControls( camera, renderer.domElement );

//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enablePan = true;

controls.screenSpacePanning = false;

controls.minDistance = 10;
controls.maxDistance = 500;

controls.maxPolarAngle = Math.PI;


// // testing the first quadratic line
// //create a blue LineBasicMaterial
// var material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth:2 } );
// var geometry = new THREE.Geometry();
// for(let x = -100; x < 100; x+=0.1) {
// 	geometry.vertices.push(new THREE.Vector3( x, Math.pow(x,2), 0) );

// }
// var line0 = new THREE.Line( geometry, material );
// scene.add( line0 );

// // testing the first cubed line
// //create a blue LineBasicMaterial
// var material = new THREE.LineBasicMaterial( { color: 0xf00000, linewidth:2 } );
// var geometry = new THREE.Geometry();
// for(let x = -100; x < 100; x+=0.1) {
// 	geometry.vertices.push(new THREE.Vector3( x, Math.pow(x,3), 0) );

// }
// var line1 = new THREE.Line( geometry, material );
// scene.add( line1 );

// testing the first cosine line
//create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial( { color: 0x00a400, linewidth:2 } );
var geometry = new THREE.Geometry();
for(let x = -100; x < 100; x+=0.01) {
	geometry.vertices.push(new THREE.Vector3( x, 1*Math.cos(x), 0) );

}
var line2 = new THREE.Line( geometry, material );
scene.add( line2 );


// meshing test
var geom = new THREE.Geometry(); 

// resolution of mesh
let r = 1;
for(let z = 0; z < 20; z+= r) {
	for(let x = 0; x < 30; x += 1) {
		var v1 = new THREE.Vector3(x,Math.cos(x),z);
		var v2 = new THREE.Vector3(x,Math.cos(x),z+10);
		var v3 = new THREE.Vector3(x+r,Math.cos(x+r),z+10);
		var v4 = new THREE.Vector3(x+r,Math.cos(x+r),z);
		// console.log(v1)

		geom.vertices.push(v1);
		geom.vertices.push(v2);
		geom.vertices.push(v3);
		geom.vertices.push(v4);

		geom.faces.push( new THREE.Face3( (x*4) + 0, (x*4) + 1, (x*4) + 2 ) );
		geom.faces.push( new THREE.Face3( (x*4) + 0, (x*4) + 3, (x*4) + 2 ) );
		geom.computeFaceNormals();

	}
		geom.computeFaceNormals();
}

var object = new THREE.Mesh( geom, new THREE.MeshNormalMaterial({side: THREE.DoubleSide}) );

// object.position.z = -10;//move a bit back - size of 500 is a bit big
// object.rotation.y = -Math.PI * .5;//triangle is pointing in depth, rotate it -90 degrees on Y

scene.add(object);



// stats monitoring
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );


function removeEntity(name) {
    var selectedObject = scene.getObjectByName(name);
    scene.remove( selectedObject );
    animate();
}


// dat controller
function GraphFunctionR1 () {
	this.equation = 'x^2';
	this.speed = 0.8;
	this.displayOutline = false;

	// Define render logic ...

	// TODO: auto-update the scene when the equation changes
	var fObj = new Formula(this.equation)

	var material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth:2 } );
	var geometry = new THREE.Geometry();
	for(let x = -100; x < 100; x+=0.1) {
		geometry.vertices.push(new THREE.Vector3( x, fObj.evaluate({x:x}), 0) );

	}
	var line0 = new THREE.Line( geometry, material );
	line0.name = "formula"
	scene.add( line0 );

	this.update = () => {
		removeEntity("formula")
		var fObj = new Formula(this.equation)

		var material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth:2 } );
		var geometry = new THREE.Geometry();
		for(let x = -100; x < 100; x+=0.1) {
			geometry.vertices.push(new THREE.Vector3( x, fObj.evaluate({x:x}), 0) );

		}
		var line0 = new THREE.Line( geometry, material );
		line0.name = "formula"
		scene.add( line0 );

	}

};

// dat controller
function GraphFunctionR2 () {
	this.equation = 'x*y';

	// Define render logic ...

	// TODO: auto-update the scene when the equation changes
	var fObj = new Formula(this.equation)

	var material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth:1 } );
	var geometry = new THREE.Geometry();
	for(let x = -100; x < 100; x+=.1) {
		for(let y = -100; y < 100; y += .1) {
				geometry.vertices.push(new THREE.Vector3( x, y, fObj.evaluate({x:x, y:y})) );
			}
	}
	var line0 = new THREE.Line( geometry, material );
	line0.name = "formula"
	scene.add( line0 );

	this.update = () => {
		removeEntity("formula")
		var fObj = new Formula(this.equation)

		var material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth:1 } );
		var geometry = new THREE.Geometry();
		for(let x = -100; x < 100; x+=.1) {
			for(let y = -100; y < 100; y += .1) {
				geometry.vertices.push(new THREE.Vector3( x, y, fObj.evaluate({x:x, y:y})) );
			}
		}
		var line0 = new THREE.Line( geometry, material );
		line0.name = "formula"
		scene.add( line0 );

	}

};

window.onload = function() {
	let graphR1 = new GraphFunctionR1();
	// let graphR2 = new GraphFunctionR2();
	var gui = new dat.GUI();
	gui.add(graphR1, 'equation');
	gui.add(graphR1, 'update');
	// gui.add(graphR2, 'equation');
	// gui.add(graphR2, 'update');

};
    



function animate() {
	stats.begin()
	requestAnimationFrame( animate );
	controls.update()
	renderer.render( scene, camera );
	stats.end()
}
animate();