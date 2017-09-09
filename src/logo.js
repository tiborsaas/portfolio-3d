import {
    MeshStandardMaterial,
    TextureLoader,
    CubeGeometry,
    Mesh,
    // constants
    RepeatWrapping
} from 'three';

/**
 * Todo: add this to a group to transform it more easily
 */
class Logo {
    constructor(scene) {
        this.scene = scene;
        // Binary encoded blocks, each hex is a line
        this.model = [0xfe, 0x82, 0xee, 0x28, 0xee, 0, 0xfe];
        this.standardMaterial = null;
        
        this.createMaterial();
        this.loadTextures();
    }

    createMaterial() {
        this.standardMaterial = new MeshStandardMaterial({
            map: null,
            color: 0xffffff,
            metalness: 1.0,
            roughness: 0.5,
            // envMap: textureEquirec
        });
    }

    loadTextures() {
        let textureLoader = new TextureLoader();
        textureLoader.load( "./assets/Pluto_Normal.jpg", map => {
            map.wrapS = RepeatWrapping;
            map.wrapT = RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set( 0.5, 0.5 );
            // this.standardMaterial.roughnessMap = map;
            // this.standardMaterial.roughness = 0.8;
            this.standardMaterial.normalMap = map;
            this.standardMaterial.normalScale.set( 1, 1 ).multiplyScalar( 0.12 );
            this.standardMaterial.needsUpdate = true;
        });

        textureLoader.load( "./assets/silver.jpg", map => {
            this.standardMaterial.map = map;
            this.standardMaterial.needsUpdate = true;
        });

        textureLoader.load( "./assets/tile.png", map => {
            this.standardMaterial.displacementMap = map;
            this.standardMaterial.displacementScale = 0.5;
            this.standardMaterial.needsUpdate = true;
            this.standardMaterial.displacementMap.needsUpdate = true;
        });
    }

    render() {
        this.model.forEach( (row, y) => {
            let bin = row.toString(2);
            while(bin.length < 8) {
                bin = "0" + bin;
            }
            for( let i=0; i<7; i++ ) {
                if( bin[i] == '1' ) {
                    const geometry = new CubeGeometry(1, 1, 1, 1, 1, 1);
                    const mesh = new Mesh(geometry, this.standardMaterial);
                    mesh.position.x = 3.5 - i;
                    mesh.position.y = 3.5 - y;
                    this.scene.add(mesh);
                }
            }
        });
    }
}

export default Logo;