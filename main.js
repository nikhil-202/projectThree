// import * as THREE from 'three';

var renderer = new THREE.WebGLRenderer({ canvas: artifactCanvas });
renderer.setSize(500, 400);
renderer.setClearColor(0xffffff);
// document.body.appendChild( renderer.domElement );


// event listeners
document.getElementById("completeBtn").addEventListener("click", addShape);
document.getElementById("resetBtn").addEventListener("click", reset);

function reset() {
  window.location.reload();
}



// camera position
var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
// grid lines
var grid = new THREE.GridHelper(100, 20);
function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  object.rotateX(THREE.Math.degToRad(degreeX));
  object.rotateY(THREE.Math.degToRad(degreeY));
  object.rotateZ(THREE.Math.degToRad(degreeZ));
}

// rotate grid Line
rotateObject(grid.geometry, 90, 45, 180);
var vector = new THREE.Vector3(1, 0, 1);
grid.lookAt(vector);
scene.add(grid);
renderer.render(scene, camera);


// Line Drawing module
const material = new THREE.LineBasicMaterial({ color: 0x00ff00 ,linewidth: 1});
const x = -250,
  y = 200;
const spoints = [];
const points = [];

var geometry = new THREE.BufferGeometry().setFromPoints(points);
var line = new THREE.Line(geometry, material);
scene.add(line);
renderer.render(scene, camera); 



// Adding the shape
function addShape() {
  const x = -250,
    y = 200;
  const polygonShape = new THREE.Shape();
  polygonShape.moveTo((x + spoints[0]) / 5, (y - spoints[1]) / 4);

  var shapeGeometry = new THREE.ShapeGeometry(polygonShape);
  var shapeMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 });
  var mesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
  scene.add(mesh);

  for (let i = 0; i < spoints.length; i = i + 2) {
    console.log(spoints[i]);
    polygonShape.lineTo((x + spoints[i]) / 5, (y - spoints[i + 1]) / 4);
  }
  shapeGeometry = new THREE.ShapeGeometry(polygonShape);
  shapeMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 ,opacity:0.5,transparent:true});
  mesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
  scene.add(mesh);
  renderer.render(scene, camera);
}

// get curser location

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return [x, y];
}

// line drawing from coordinates

const canvas = document.querySelector("canvas");
canvas.addEventListener("mousedown", function (e) {
  const [mx, my] = getCursorPosition(canvas, e);
  console.log(mx, my);
  spoints.push(mx);
  spoints.push(my);
  points.push(new THREE.Vector3((x + mx) / 5, (y - my) / 4));
  geometry = new THREE.BufferGeometry().setFromPoints(points);
  line = new THREE.Line(geometry, material);
  scene.add(line);


  renderer.render(scene, camera);

  return spoints;
});
