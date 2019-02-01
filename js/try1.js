function init(){
	//Create an OpenLayer Map object
    var map = new ol.Map({
    //attach the map object to the <div>
    target: 'map',
    layers: [
        new ol.layer.Tile({
        source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
    center: ol.proj.fromLonLat([37.41, 8.82]),
    zoom: 4
    })
    });
}