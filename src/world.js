import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer
} from 'three';

class World {
    constructor() {
        this.mouse = { x: 0, y:0 };
        this.scene = null;
        this.camera = null;
        this.renderer = null;        
        
        this.createWorld();
        this.renderDOM();
        this.setCanvasSize();
        this.createCamera();
        this.initResizeEvent();
    }
        
    createWorld() {
        this.scene = new Scene();
        this.renderer = new WebGLRenderer({antialias:true});
    }

    createCamera() {
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    renderDOM() {
        document.body.appendChild(this.renderer.domElement);
    }
    
    setCanvasSize() {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    initResizeEvent() {
        window.addEventListener('resize', this.resizeEvent.bind(this) );            
    }

    resizeEvent() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.setCanvasSize();
    }

    setCamera() {
        this.camera.position.x += ( this.mouse.x - this.camera.position.x ) * .1;
        this.camera.position.y += ( - this.mouse.y - this.camera.position.y ) * .1;
    }

    updateMouse( x,y ) {
        x = (x - (window.innerWidth / 2)) / 30;
        y = (y - (window.innerHeight / 2)) / 100;
        this.mouse = { x, y };
    }
}

export default World;