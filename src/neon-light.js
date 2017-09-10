import {
    PointLight,
    PointLightHelper,
    HemisphereLight,
    RectAreaLight,
    Mesh,
    Group,
    CylinderGeometry,
    MeshLambertMaterial,
    RectAreaLightHelper
} from 'three';

import Noise from '../extra/noise';

/**
 * Creates an emissive cylinder and a matching rect area light
  +---------------+
  |               | ^ width
  +---------------+
    <- height ->
*/
class Neon {
    constructor( scene, width, height ) {
        this.scene = scene;
        this.light = null;
        this.tubeMaterial = null;
        this.mesh = null;
        this.width = width;
        this.height = height;
        this.debugAreaLight = false;
        this.noise = new Noise();
        this.time = 0;
    }

    createAreaLight() {
        const intensity = 7000.0;
        const rectLight = new RectAreaLight( 0xffffff, intensity,  this.width, this.height );
        this.light = rectLight;

        if( this.debugAreaLight ) {
            rectLight.position.set(5,0,0);
            let helper = new RectAreaLightHelper( rectLight );
            this.scene.add(helper)
        }

        return rectLight;
    }

    createTube() {
        const material = new MeshLambertMaterial({
            emissive: 0xffffff,
            color: 0x000000
        });
        const tube = new CylinderGeometry( this.width, this.width, this.height );
        const mesh = new Mesh( tube, material );
        this.tubeMaterial = material;
        this.mesh = mesh;

        return mesh;
    }

    glitch( max = false ) {
        this.time += 0.45;
        let noiseVal = this.noise.getVal( this.time );

        this.light.intensity = ( max ) ? 7000 : noiseVal * 7000;
        let col = Math.floor( 255 * noiseVal );
        col = col.toString(16);
        this.tubeMaterial.emissive.setHex( ( max ) ? 0xffffff : `0x${col}${col}${col}` );
    }

    render() {
        const light = this.createAreaLight();
        const tube = this.createTube();
        const group = new Group();
        group.add( light );
        group.add( tube );

        this.mesh = group;
        this.scene.add( group );
    }
}

export default Neon;