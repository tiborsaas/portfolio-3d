import {
    MeshPhongMaterial,
    SphereBufferGeometry,
    Mesh,
    BackSide
} from 'three';

class Dome {
    constructor( scene ) {
        this.scene = scene;
    }

    getMaterial( color ) {
        return new MeshPhongMaterial({
            color: color,
            flatShading: true,
            shininess: 0,
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

        let material = this.getMaterial( 0x333333 );
        let envMesh = new Mesh( sphere, material );
        this.scene.add(envMesh)
    }
}

export default Dome;
