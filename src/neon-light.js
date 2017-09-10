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
        this.width = width;
        this.height = height;
        this.mesh = null;
        this.debugAreaLight = false;
    }

    createAreaLight() {
        const intensity = 7000.0;
        const rectLight = new RectAreaLight( 0xffffff, intensity,  this.width, this.height );

        if( this.debugAreaLight ) {
            rectLight.position.set(5,0,0);
            let helper = new RectAreaLightHelper( rectLight );
            this.scene.add(helper)
        }
        return rectLight;
    }

    createTube() {
        const material = new MeshLambertMaterial({
            emissive: 0xffffff
        });
        const tube = new CylinderGeometry( this.width, this.width, this.height );
        const mesh = new Mesh( tube, material );
        return mesh;
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

