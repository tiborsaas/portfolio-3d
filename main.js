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
import Lights from './src/lights';


let world = new World();
world.camera.position.z = 10;

document.addEventListener( 'mousemove', event => {
	world.updateMouse( event.clientX, event.clientY );
});

// const controls = new OrbitControls(world.camera);

let dome = new Dome( world.scene );
dome.render( 50, 50 );

let logo = new Logo( world.scene );
logo.render();

let lights = new Lights( world.scene );
lights.createPointLight( 50, 10, 25 );
lights.createPointLight( -50, -10, -25 );
lights.addHemisphereLight( 0xcc00ff, 0x000000 );

let tau = 0;
const render = () => {
	requestAnimationFrame(render);
	world.renderer.render(world.scene, world.camera);

	lights.lights.forEach( light => {
		light.position.z = Math.sin(tau) * light.initialPosition.z;
		light.position.x = Math.cos(tau) * light.initialPosition.x;
	});
	tau += 0.01;

	world.setCamera();
};

render();
