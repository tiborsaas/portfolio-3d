import {
	BackSide,
	RectAreaLight,
	Scene, 
	PerspectiveCamera, 
	WebGLRenderer, 
	MeshStandardMaterial,
	MeshPhongMaterial, 
	Mesh,
	HemisphereLight,
	PointLight,
	TextureLoader,
	RepeatWrapping,
	EquirectangularReflectionMapping,
	LinearFilter,
	LinearMipMapLinearFilter,
	TrianglesDrawMode
} from 'three';

import {OrbitControls} from './extra/OrbitControls.legacy';
import World from './src/world';
import Logo from './src/logo';
import Dome from './src/dome';
import Floor from './src/floor';
import Lights from './src/lights';


let world = new World();
world.camera.position.z = 140;

document.addEventListener( 'mousemove', event => {
	// world.updateMouse( event.clientX, event.clientY );
});

const controls = new OrbitControls(world.camera);

let dome = new Dome( world.scene );
dome.render( 250, 25 );

let floor = new Floor( world.scene );
floor.render( 500, 20 );

let logo = new Logo( world.scene );
logo.render();

let lights = new Lights( world.scene );
lights.createPointLight( 230, 90, 230, 0xee0011, 1 );
lights.createPointLight( -250, 40, -250, 0xaa00de, 1 );
lights.createPointLight( 0, -30, -5, 2 );
lights.addHemisphereLight( 0x2200ff, 0x000000 );

let tau = 0;
const render = () => {
	requestAnimationFrame(render);
	world.renderer.render(world.scene, world.camera);

	lights.lights.forEach( light => {
		light.position.z = Math.sin(tau) * light.initialPosition.z;
		light.position.x = Math.cos(tau) * light.initialPosition.x;
	});
	tau += 0.01;

	// world.setCamera();
};

render();
