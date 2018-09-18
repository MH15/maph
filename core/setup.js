// 3d functions and helpers for three.js

import * as THREE from 'three'
window.THREE = THREE
// global THREE = THREE
// import { OrbitControls } from 'three-orbitcontrols-ts'
const OrbitControls = require('three-orbit-controls')(THREE)




// Stack for all 3d

window.Stack3D = {}


function Scene() {
	let scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcccccc );
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );


	let geometry = new THREE.SphereGeometry( 0.5, 10, 10 )
	let material = new THREE.MeshBasicMaterial( { color: 0x000000 } )
	let sphere = new THREE.Mesh( geometry, material )
	scene.add( sphere )

	let lights = []
	lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
	lights[ 0 ].position.set( 0, 200, 0 );
	lights[ 1 ] = new THREE.PointLight( 0xffffff, 3, 0 );
	lights[ 1 ].position.set( 0, -200, 0 );
	scene.add( lights[0] );
	scene.add( lights[1] );

	return scene
}

function Renderer() {
	let renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	return renderer
}

function Camera() {
	// camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set( 40, 5, 30 );

	return camera
}

function Controls(camera, renderer) {
	let controls = new OrbitControls( camera, renderer.domElement );

	//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.enablePan = true;

	controls.screenSpacePanning = false;

	controls.minDistance = 10;
	controls.maxDistance = 500;

	controls.maxPolarAngle = Math.PI;

	return controls
}




function log(string) {
	console.log(string)
}




export {Scene, Renderer, Camera, Controls, log}