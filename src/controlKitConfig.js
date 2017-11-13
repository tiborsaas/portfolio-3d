
let padDefault = {
    params: [0.015873015873015817,-0.4920634920634921],
    searchArea: 200,
    getScale: function() {
        return {
            x: this.params[1] * -this.searchArea / 2,
            y: this.params[0] * this.searchArea / 2,
        }
    }
};
