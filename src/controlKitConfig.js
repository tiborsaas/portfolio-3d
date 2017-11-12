
window.addEventListener('load',function() {

    let padDefault = {
        params : [0.015873015873015817,-0.4920634920634921]
    };

    world.camera.position.x = 30
    world.camera.position.y = 6.1
    world.camera.position.z = 103
    world.camera.position.range = [-250,250]

    var controlKit = new ControlKit();
        controlKit.addPanel()
            .addGroup()
                .addSubGroup()
                .addSlider( world.camera.position, 'y', 'range')
                .addPad( padDefault, 'params',{
                    onChange: function(x) { 
                        world.camera.position.x = padDefault.params[0] * 200 
                        world.camera.position.z = padDefault.params[1] * -200
                        console.log('camera pad params', padDefault.params.toString())
                    }
                });
});
