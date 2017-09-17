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
import Neon from './src/neon-light';


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
lights.createPointLight( 230, 60, 230, 0xDC143C, 1 );
lights.createPointLight( -250, 40, -250, 0xaa00de, 1 );
lights.addHemisphereLight( 0x2200ff, 0x000000 );

let neon = new Neon( world.scene, 2, 120 );
neon.render();
neon.mesh.position.x = 80;
neon.mesh.position.y = -28;
neon.mesh.rotateX( 90 * Math.PI/180 );
neon.mesh.rotateZ( 30 * Math.PI/180 );

let neonLeft = new Neon( world.scene, 2, 120 );
neonLeft.render();
neonLeft.mesh.position.x = -80;
neonLeft.mesh.position.y = -28;
neonLeft.mesh.rotateX( 90 * Math.PI/180 );
neonLeft.mesh.rotateZ( -30 * Math.PI/180 );

let tau = 0;
const render = () => {
	requestAnimationFrame(render);
	world.renderer.render(world.scene, world.camera);

	lights.lights.forEach( light => {
		light.position.z = Math.sin(tau) * light.initialPosition.z;
		light.position.x = Math.cos(tau) * light.initialPosition.x;
	});
	tau += 0.01;

	if( Math.floor(tau)%4 == 0 ) {
		neonLeft.glitch();
	} else {
		neonLeft.glitch(true);
	}

	// world.setCamera();
};

render();
