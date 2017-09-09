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
            shininess: 0.1
        });
    }

    render( size, resolution ) {
        const floor = new PlaneGeometry( size, size, resolution, resolution );
        let distRate = 5;

        for ( let i = 0, l = floor.vertices.length; i < l; i ++ ) {
            floor.vertices[i].x += Math.random() * distRate;
            floor.vertices[i].y += 0//Math.random()*3;
            floor.vertices[i].z += Math.random() * distRate;
        }
        floor.verticesNeedUpdate = true;
        floor.normalsNeedUpdate = true;
        
        const floorMesh = new Mesh( floor, this.getMaterial( 0x444444 ) );
        
        floorMesh.rotateX( -90 * Math.PI / 180 );
        floorMesh.position.y = -35;

        this.scene.add( floorMesh );
    }
}

export default Floor;