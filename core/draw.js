// drawing helpers for graphs, vectors, etc

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
	let material = new THREE.LineBasicMaterial( { color: color, linewidth:4 } );
	let geometry = new THREE.Geometry();
	geometry.vertices.push(tail)
	geometry.vertices.push(head)
	let line = new THREE.Line( geometry, material )
	line.name = name

	let cyl_geom = new THREE.CylinderGeometry( 0.5, 0.5, length, 10)
	let cyl_mat = new THREE.MeshLambertMaterial({color: color, vertexColors: THREE.FaceColors})
	let cyl_mesh = new THREE.Mesh( cyl_geom, cyl_mat )
	cyl_mesh.name = name
	scene.add(cyl_mesh)




	let cone_geom = new THREE.ConeGeometry( 1, 3, 10 )
	let cone_mat = new THREE.MeshLambertMaterial({color: color, vertexColors: THREE.FaceColors})
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


export { Arrow }