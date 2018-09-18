// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"core/maph.js":[function(require,module,exports) {
// maph.js


var scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);
// scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(0.5, 10, 10);
var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// helper
scene.add(new THREE.AxesHelper(200));

camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(40, 5, 30);

// controls

controls = new THREE.OrbitControls(camera, renderer.domElement);

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
var material = new THREE.LineBasicMaterial({ color: 0x00a400, linewidth: 2 });
var geometry = new THREE.Geometry();
for (var x = -100; x < 100; x += 0.01) {
	geometry.vertices.push(new THREE.Vector3(x, 1 * Math.cos(x), 0));
}
var line2 = new THREE.Line(geometry, material);
scene.add(line2);

// meshing test
var geom = new THREE.Geometry();

// resolution of mesh
var r = 1;
for (var z = 0; z < 20; z += r) {
	for (var _x = 0; _x < 30; _x += 1) {
		var v1 = new THREE.Vector3(_x, Math.cos(_x), z);
		var v2 = new THREE.Vector3(_x, Math.cos(_x), z + 10);
		var v3 = new THREE.Vector3(_x + r, Math.cos(_x + r), z + 10);
		var v4 = new THREE.Vector3(_x + r, Math.cos(_x + r), z);
		// console.log(v1)

		geom.vertices.push(v1);
		geom.vertices.push(v2);
		geom.vertices.push(v3);
		geom.vertices.push(v4);

		geom.faces.push(new THREE.Face3(_x * 4 + 0, _x * 4 + 1, _x * 4 + 2));
		geom.faces.push(new THREE.Face3(_x * 4 + 0, _x * 4 + 3, _x * 4 + 2));
		geom.computeFaceNormals();
	}
	geom.computeFaceNormals();
}

var object = new THREE.Mesh(geom, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }));

// object.position.z = -10;//move a bit back - size of 500 is a bit big
// object.rotation.y = -Math.PI * .5;//triangle is pointing in depth, rotate it -90 degrees on Y

scene.add(object);

// stats monitoring
var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

function removeEntity(name) {
	var selectedObject = scene.getObjectByName(name);
	scene.remove(selectedObject);
	animate();
}

// dat controller
function GraphFunctionR1() {
	var _this = this;

	this.equation = 'x^2';
	this.speed = 0.8;
	this.displayOutline = false;

	// Define render logic ...

	// TODO: auto-update the scene when the equation changes
	var fObj = new Formula(this.equation);

	var material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 2 });
	var geometry = new THREE.Geometry();
	for (var _x2 = -100; _x2 < 100; _x2 += 0.1) {
		geometry.vertices.push(new THREE.Vector3(_x2, fObj.evaluate({ x: _x2 }), 0));
	}
	var line0 = new THREE.Line(geometry, material);
	line0.name = "formula";
	scene.add(line0);

	this.update = function () {
		removeEntity("formula");
		var fObj = new Formula(_this.equation);

		var material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 2 });
		var geometry = new THREE.Geometry();
		for (var _x3 = -100; _x3 < 100; _x3 += 0.1) {
			geometry.vertices.push(new THREE.Vector3(_x3, fObj.evaluate({ x: _x3 }), 0));
		}
		var line0 = new THREE.Line(geometry, material);
		line0.name = "formula";
		scene.add(line0);
	};
};

// dat controller
function GraphFunctionR2() {
	var _this2 = this;

	this.equation = 'x*y';

	// Define render logic ...

	// TODO: auto-update the scene when the equation changes
	var fObj = new Formula(this.equation);

	var material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 1 });
	var geometry = new THREE.Geometry();
	for (var _x4 = -100; _x4 < 100; _x4 += .1) {
		for (var y = -100; y < 100; y += .1) {
			geometry.vertices.push(new THREE.Vector3(_x4, y, fObj.evaluate({ x: _x4, y: y })));
		}
	}
	var line0 = new THREE.Line(geometry, material);
	line0.name = "formula";
	scene.add(line0);

	this.update = function () {
		removeEntity("formula");
		var fObj = new Formula(_this2.equation);

		var material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 1 });
		var geometry = new THREE.Geometry();
		for (var _x5 = -100; _x5 < 100; _x5 += .1) {
			for (var _y = -100; _y < 100; _y += .1) {
				geometry.vertices.push(new THREE.Vector3(_x5, _y, fObj.evaluate({ x: _x5, y: _y })));
			}
		}
		var line0 = new THREE.Line(geometry, material);
		line0.name = "formula";
		scene.add(line0);
	};
};

window.onload = function () {
	var graphR1 = new GraphFunctionR1();
	// let graphR2 = new GraphFunctionR2();
	var gui = new dat.GUI();
	gui.add(graphR1, 'equation');
	gui.add(graphR1, 'update');
	// gui.add(graphR2, 'equation');
	// gui.add(graphR2, 'update');
};

function animate() {
	stats.begin();
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
	stats.end();
}
animate();
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '49519' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","core/maph.js"], null)
//# sourceMappingURL=/maph.f5967322.map