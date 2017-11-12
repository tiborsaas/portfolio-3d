import {
    MeshStandardMaterial,
    SphereGeometry,
    BufferAttribute,
    Mesh,
    BackSide
} from 'three';

class Dome {
    constructor( scene ) {
        this.scene = scene;
        this.geometry = null;
    }

    getMaterial( color ) {
        return new MeshStandardMaterial({
            color: color,
            flatShading: true,
            metalness: 0.6,
            roughness: 0.5,
            side: BackSide,
        });
    }

    render( size, resolution ) {
        let sphere = new SphereGeometry( size, resolution, resolution );
        this.geometry = sphere;
        this.geometry.merge

        let x, y, z;
        let index = 0;
        let distRate = 50;
        let topRandom = Math.random() * distRate;

        for ( let i = 0; i < sphere.vertices.length; i+=3 ) {
            sphere.vertices[i].x += Math.random() * distRate;
            sphere.vertices[i].z += Math.random() * distRate;
            sphere.vertices[i].y += Math.random() * distRate;
        }

        sphere.verticesNeedUpdate = true;
        sphere.normalsNeedUpdate = true;

        let material = this.getMaterial( 0x991133 );
        let envMesh = new Mesh( sphere, material );
        this.scene.add(envMesh)
    }
}

function isPrevious( positions, index ) {
    console.log( positions[index    ], positions[index-3],
                 positions[index + 1], positions[index-2],
                 positions[index + 2], positions[index-1])
    return ( 
        positions[index    ] == positions[index-3] &&
        positions[index + 1] == positions[index-2] &&
        positions[index + 2] == positions[index-1]
    )
}

export default Dome;

function removeDuplicateVertices(vertices) {
    var positionLookup = [];
    var finalShit = [];

    for( let i = 0; i < vertices.length-3; i += 3 ) {
        var index = vertices[i] + vertices[i + 1] + vertices[i + 2];
        
        if( positionLookup.indexOf( index ) == -1 ) {
            positionLookup.push( index );
            finalShit.push(vertices[i])
            finalShit.push(vertices[i+1])
            finalShit.push(vertices[i+2])
        }
    }
    return finalShit;
}
