import {
    MeshStandardMaterial,
    TextureLoader,
    CubeGeometry,
    Shape,
    Mesh,
    Group,
    ExtrudeGeometry,
    // constants
    RepeatWrapping
} from 'three';

/**
 * Todo: add this to a group to transform it more easily
 */
class Logo {
    constructor(scene) {
        this.scene = scene;
        this.model = {};
        this.standardMaterial = null;
        
        this.createMaterial();
        this.loadTextures();
    }
    
    createLogoShapes() {
        const logo = new Shape();
        logo.moveTo(0,0);
        logo.lineTo(-70,0);
        logo.lineTo(-70,-30);
        logo.lineTo(-50,-30);
        logo.lineTo(-50,-40);
        logo.lineTo(-70,-40);
        logo.lineTo(-70,-50);
        logo.lineTo(-40,-50);
        logo.lineTo(-40,-20);
        logo.lineTo(-60,-20);
        logo.lineTo(-60,-10);
        logo.lineTo(-10,-10);
        logo.lineTo(-10,-20);
        logo.lineTo(-30,-20);
        logo.lineTo(-30,-50);
        logo.lineTo(0,-50);
        logo.lineTo(0,-40);
        logo.lineTo(-20,-40);
        logo.lineTo(-20,-30);
        logo.lineTo(0,-30);
        logo.lineTo(0,0);

        const bottom = new Shape();
        bottom.moveTo(0,-60);
        bottom.lineTo(-70,-60);
        bottom.lineTo(-70,-70);
        bottom.lineTo(0,-70);
        bottom.lineTo(0,-60);

        return { logo, bottom };
    }
    
    createGeometry() {
        const shapes = this.createLogoShapes();

        const settings = { 
            amount: 10, 
            bevelEnabled: true, 
            bevelSegments: 3, 
            steps: 5, 
            bevelSize: 1, 
            bevelThickness: 1 
        };

        const logo = new ExtrudeGeometry( shapes.logo, settings );
        const bottom = new ExtrudeGeometry( shapes.bottom, settings );

        return { logo, bottom };
    }

    createMaterial() {
        this.standardMaterial = new MeshStandardMaterial({
            map: null,
            color: 0xffffff,
            metalness: 1.0,
            roughness: 0.45,
        });
    }

    loadTextures() {
        const textureLoader = new TextureLoader();
        textureLoader.load( "./assets/greasy-pan-2-albedo.png", map => {
            map.wrapS = RepeatWrapping;
            map.wrapT = RepeatWrapping;
            map.repeat.set( 0.01, 0.01);
            this.standardMaterial.map = map;
            this.standardMaterial.needsUpdate = true;
        });

        const mapLoader = new TextureLoader();
        mapLoader.load( "./assets/greasy-pan-2-normal.png", map => {
            map.wrapS = RepeatWrapping;
            map.wrapT = RepeatWrapping;
            map.repeat.set( 0.01, 0.01);
            this.standardMaterial.normalMap = map;
        });
    }

    render() {
        const geometries = this.createGeometry();
        const logo = new Mesh(geometries.logo, this.standardMaterial);
        const bottom = new Mesh(geometries.bottom, this.standardMaterial);
        const group = new Group();
        group.add( logo );
        group.add( bottom );

        group.position.x = 37;
        group.position.y = 35;
        this.scene.add(group);
    }
}

export default Logo;