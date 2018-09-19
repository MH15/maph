// drawing helpers for graphs, vectors, etc
import * as parse from './parse.js'
const Parser = require('expr-eval').Parser;


function removeEntity(name) {
	while (scene.getObjectByName(name)) {
    	scene.remove(scene.getObjectByName(name))

	}
    // var selectedObject = scene.getObjectByName(name);
    // scene.remove( selectedObject );
    // animate();
}

function Arrow(tail, head, color, name) {
	tail = new THREE.Vector3( tail[0], tail[1], tail[2] )
	head = new THREE.Vector3( head[0], head[1], head[2] )

	// remove the old arrow from the scene
	removeEntity(name)

	// create quaternion
	let h2 = head.clone()
	let t2 = tail.clone()
	var axis = new THREE.Vector3(0, 1, 0);
	let delta = h2.sub(tail)
	let halfLength = delta.clone().divideScalar(2)
	let length = delta.length()
	let unit = delta.clone().normalize()

	// add new arrow
	let material = new THREE.LineBasicMaterial( { color: parse.Color(color), linewidth:4 } );
	let geometry = new THREE.Geometry();
	geometry.vertices.push(tail)
	geometry.vertices.push(head)
	let line = new THREE.Line( geometry, material )
	line.name = name

	let cyl_geom = new THREE.CylinderGeometry( 0.5, 0.5, length, 10)
	let cyl_mat = new THREE.MeshLambertMaterial({color: parse.Color(color), vertexColors: THREE.FaceColors})
	let cyl_mesh = new THREE.Mesh( cyl_geom, cyl_mat )
	cyl_mesh.name = name
	scene.add(cyl_mesh)


	let cone_geom = new THREE.ConeGeometry( 1, 3, 10 )
	let cone_mat = new THREE.MeshLambertMaterial({color: parse.Color(color), vertexColors: THREE.FaceColors})
	let cone_mesh = new THREE.Mesh( cone_geom, cone_mat )
	cone_mesh.name = name
	scene.add( cone_mesh )

	// change positions
	cone_mesh.position.set(head.x, head.y, head.z)
	cone_mesh.quaternion.setFromUnitVectors(axis, delta.clone().normalize());
	cyl_mesh.quaternion.setFromUnitVectors(axis, delta.clone().normalize());
	cyl_mesh.position.set(tail.x + unit.x*length/2,tail.y + unit.y*length/2, tail.z + unit.z*length/2)

	// var group = new THREE.Group()
	scene.add(line)
	// group.add(cone)


	// scene.add(group)
}

function redrawVectors() {
	data.vectors.forEach(vector => {
		let p = parse.Array(vector.string)
		vector.tail = [p[0],p[1],p[2]]
		vector.head = [p[3],p[4],p[5]]

		Arrow(vector.tail, vector.head, vector.color, vector.name)
	})
}









import imageURL from '../images/square.png';

function Graph(equation, name) {
	removeEntity(name)

	var normMaterial = new THREE.MeshNormalMaterial;
	var shadeMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
	var wireTexture = new THREE.TextureLoader().load(imageURL);
	wireTexture.wrapS = wireTexture.wrapT = THREE.RepeatWrapping; 
	wireTexture.repeat.set( 40, 40 );
	let wireMaterial = new THREE.MeshBasicMaterial( { map: wireTexture, vertexColors: THREE.VertexColors, side:THREE.DoubleSide } );
	var vertexColorMaterial  = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

	var segments = 20, 
	xMin = -10, xMax = 10, xRange = xMax - xMin,
	yMin = -10, yMax = 10, yRange = yMax - yMin,
	zMin = -10, zMax = 10, zRange = zMax - zMin;
		xRange = xMax - xMin;
	yRange = yMax - yMin;
	let zFunc = Parser.parse(equation).toJSFunction( ['x','y'] );
	let meshFunction = function(x, y, target) 
	{
		x = xRange * x + xMin;
		y = yRange * y + yMin;
		var z = zFunc(x,y); //= Math.cos(x) * Math.sqrt(y);
		if ( isNaN(z) )
			target.set(0,0,0); // TODO: better fix
		else
			target.set(x, z, y);
	};
	
	// true => sensible image tile repeat...
	let graphGeometry = new THREE.ParametricGeometry( meshFunction, segments, segments, true );
	
	///////////////////////////////////////////////
	// calculate vertex colors based on Z values //
	///////////////////////////////////////////////
	graphGeometry.computeBoundingBox();
	zMin = graphGeometry.boundingBox.min.y;
	zMax = graphGeometry.boundingBox.max.y;
	zRange = zMax - zMin;
	var color, point, face, numberOfSides, vertexIndex;
	// faces are indexed using characters
	var faceIndices = [ 'a', 'b', 'c', 'd' ];
	// first, assign colors to vertices as desired
	for ( var i = 0; i < graphGeometry.vertices.length; i++ ) 
	{
		point = graphGeometry.vertices[ i ];
		color = new THREE.Color( 0x0000ff );
		color.setHSL( 0.7 * (zMax - point.y) / zRange, 1, 0.5 );
		graphGeometry.colors[i] = color; // use this array for convenience
	}
	// copy the colors as necessary to the face's vertexColors array.
	for ( var i = 0; i < graphGeometry.faces.length; i++ ) 
	{
		face = graphGeometry.faces[ i ];
		numberOfSides = ( face instanceof THREE.Face3 ) ? 3 : 4;
		for( var j = 0; j < numberOfSides; j++ ) 
		{
			vertexIndex = face[ faceIndices[ j ] ];
			face.vertexColors[ j ] = graphGeometry.colors[ vertexIndex ];
		}
	}
	///////////////////////
	// end vertex colors //
	///////////////////////
	
	// material choices: vertexColorMaterial, wireMaterial , normMaterial , shadeMaterial
	
	// if (graphMesh) 
	// {
	// 	scene.remove( graphMesh );
	// 	// renderer.deallocateObject( graphMesh );
	// }
	wireMaterial.map.repeat.set( segments, segments );
	
	let graphMesh = new THREE.Mesh( graphGeometry, wireMaterial );
	graphMesh.doubleSided = true;
	graphMesh.name = name
	scene.add(graphMesh);
}

function redrawGraphs() {
	data.functions.forEach(graph => {
		console.log(graph.string)
		Graph(graph.string, graph.name)
	})
}


export { Arrow, redrawVectors, Graph, redrawGraphs }