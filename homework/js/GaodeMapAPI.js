var map;
function init(){
	map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:11,
        center: [114.337851,30.579607]
    });
	//添加地图控件
	AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
    function(){   	
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.OverView({isOpen:true}));       
	});
	//为地图注册click事件获取鼠标点击出的经纬度坐标
    var clickEventListener = map.on('click', function(e) {
        document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
    });
    var auto = new AMap.Autocomplete({
        input: "tipinput"
    });
    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    function select(e) {
        if (e.poi && e.poi.location) {
            map.setZoom(15);
            map.setCenter(e.poi.location);
        }
    }	
}
//3D地图的实现
function mapInit(){
	var map = new AMap.Map('container', {
    pitch:75,
    viewMode:'3D',
    zoom: 17,
    expandZoomRange:true,
    zooms:[3,20],
    center:[116.333926,39.997245]
 	});
  	map.addControl(new AMap.ControlBar({
    showZoomBar:false,
    showControlButton:true,
    position:{
      right:'10px',
      top:'10px'
    }
  }))
}
function trafficLayer(){
	var map = new AMap.Map('container', {
        resizeEnable: true,        
    });
    //实时路况图层
    var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10
    });
    trafficLayer.setMap(map);	
    var isVisible = true;
    //放在JS里面不起作用了
    AMap.event.addDomListener(document.getElementById('control'), 'click', function() {
        if (isVisible) {
            trafficLayer.hide();
            isVisible = false;
        } else {
            trafficLayer.show();
            isVisible = true;
        }
    }, false);
}


