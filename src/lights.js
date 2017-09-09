import {
    PointLight,
    PointLightHelper,
    HemisphereLight
} from 'three';

class Lights {
    constructor( scene ) {
        this.scene = scene;
        this.lights = [];
    }

    createPointLight( x, y, z ) {
        const light = new PointLight(0xffffff, 0.5);
        light.position.x = x;
        light.position.y = y;
        light.position.z = z;
        light.initialPosition = { x, y, z };

        var pointLightHelper = new PointLightHelper( light, 1 );
        this.scene.add( pointLightHelper );
       
        this.lights.push(light);
        this.scene.add(light);
    }

    addHemisphereLight( top, bottom ) {        
        const hemisphere = new HemisphereLight( top, bottom,  1 );
        this.scene.add(hemisphere);
    }
}

export default Lights;
