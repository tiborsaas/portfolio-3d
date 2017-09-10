import {
    MeshStandardMaterial,
    SphereBufferGeometry,
    Mesh,
    BackSide
} from 'three';

class Dome {
    constructor( scene ) {
        this.scene = scene;
    }

    getMaterial( color ) {
        return new MeshStandardMaterial({
            color: color,
            flatShading: true,
            metalness: 0.4,
            roughness: 0.7,
            side: BackSide,
        });
    }

    render( size, resolution ) {
        let sphere = new SphereBufferGeometry( size, resolution, resolution );

        let positions = sphere.attributes.position.array;

        let x, y, z, index;
        x = y = z = index = 0;
        let distRate = 25;

        for ( let i = 0, l = positions.length - 50; i < l; i ++ ) {
            positions[ index ++ ] += Math.random() * distRate;
            positions[ index ++ ] += 0//Math.random()*3;
            positions[ index ++ ] += Math.random() * distRate;
        }
        sphere.verticesNeedUpdate = true;
        sphere.normalsNeedUpdate = true;

        let material = this.getMaterial( 0x0088ff );
        let envMesh = new Mesh( sphere, material );
        this.scene.add(envMesh)
    }
}

export default Dome;
