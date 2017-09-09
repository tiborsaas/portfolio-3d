import {
    MeshPhongMaterial,
    PlaneGeometry,
    Mesh
} from 'three';

class Floor {
    constructor( scene ) {
        this.scene = scene;
    }

    getMaterial( color ) {
        return new MeshPhongMaterial({
            color: color,
            flatShading: true,
            shininess: 1
        });
    }

    render( size, resolution ) {
        const floor = new PlaneGeometry( size, size, resolution, resolution );
        const floorMesh = new Mesh( floor, this.getMaterial( 0x111111 ) );
        
        floorMesh.rotateX( -90 * Math.PI / 180 );
        floorMesh.position.y = -35;

        this.scene.add( floorMesh );
    }
}

export default Floor;