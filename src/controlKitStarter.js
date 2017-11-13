
function startControlKit() {
    world.camera.position.x = 30
    world.camera.position.y = 6.1
    world.camera.position.z = 103
    world.camera.position.range = [-250,250]

    var controlKit = new ControlKit();

    controlKit.addPanel({enable: false})
        .addGroup()
            .addSubGroup()
            .addSlider( world.camera.position, 'y', 'range')
            .addPad( padDefault, 'params',{
                onChange: function(x) { 
                    world.camera.position.x = padDefault.params[0] * padDefault.searchArea 
                    world.camera.position.z = padDefault.params[1] * -padSearchArea.searchArea
                    console.log('camera pad params', padDefault.params.toString())
                }
            });
};
