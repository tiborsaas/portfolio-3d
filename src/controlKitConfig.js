
window.addEventListener('load',function() {

    var obj = {
        number : world.camera.position.z
    };

    world.camera.position.x = 250
    world.camera.position.y = 10
    world.camera.position.z = 10
    world.camera.position.range = [-250,250]

    var controlKit = new ControlKit();
        controlKit.addPanel()
            .addGroup()
                .addSubGroup()
                .addSlider(world.camera.position,'x','range')
                .addSlider(world.camera.position,'y','range')
                .addSlider(world.camera.position,'z','range')
});
