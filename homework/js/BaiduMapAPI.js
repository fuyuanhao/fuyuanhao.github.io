var map; //定义地图全局变量
function init() {
	//百度地图API功能	
	map = new BMap.Map("baidumap"); // 在接口BMap下new一个Map类型的对象
	//map.doSomething(params);  map是一个对象，doSomeing是对对象的操作，params是操作的参数
	//centerAndZoom就是一个操作，在接口BMap下new一个Point类型的对象，第一个参数是中心点坐标，第二个参数是地图级别
	map.centerAndZoom(new BMap.Point(114.337851,30.579607),11);
	//map.setCurrentCity("武汉");	//设置地图显示的城市
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl());	//卫星、3D控件	
	map.addControl(new BMap.OverviewMapControl());	//右下角可折叠缩略地图
	map.addControl(new BMap.NavigationControl());	//左上角平移和缩放
	map.addControl(new BMap.ScaleControl());	//比例尺
	map.enableScrollWheelZoom(true);	//开启鼠标滚轮缩放
	//----------------------------地图样式控制---------------------------------
	//初始化模板选择的下拉框
	//获取id为stylelist的元素
	/*
	var sel = document.getElementById('stylelist');
	for(var key in mapstyles){
		var style = mapstyles[key];
		var item = new  Option(style.title,key);
		sel.options.add(item);
	}
	changeMapStyle('light')
	sel.value = 'light';
	*/
	/*导航栏效果*/
	$(window).scroll(function () {  
            if ($(".navbar").offset().top > 50) {$(".navbar-fixed-top").addClass("top-nav");  
            }else {$(".navbar-fixed-top").removeClass("top-nav");}  
        })
}	
//改变地图样式
function changeMapStyle(style){
	map.setMapStyle({style:style});
	$('#desc'.html(mapstyles[style].desc));
}
//步行规划函数
function WalkRouteQuery() {
	map.clearOverlays();
	var a = document.getElementById("tex_a").value;
	var b = document.getElementById("tex_b").value;
	var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map,panel: "r-result", autoViewport: true}});
	walking.search(a, b);
}
//驾车路线函数
function DrivingQuery() {
	map.clearOverlays();
	var a = document.getElementById("tex_a").value;
	var b = document.getElementById("tex_b").value;
	var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map,panel: "r-result", autoViewport: true}});
	driving.search(a, b);
}
//公交查询函数
function BusQuery() {
	map.clearOverlays();
	var a = document.getElementById("tex_a").value;
	var b = document.getElementById("tex_b").value;
	var transit = new BMap.TransitRoute(map, {renderOptions: {map: map,panel: "r-result"}});
	transit.search(a, b);
}
//------------------------------------创建三个不同类型的标记点函数------------------------------
//创建单点标记函数
//addMarker()表明这是一个函数，point为函数的参数
function addMarker(point){
	//在接口BMap下new一个以point为参数的marker，marker意为标记
	var marker = new BMap.Marker(point);
	//在marker的标记处add一个Overlay
	map.addOverlay(marker);
	//标记处marker下放置animation动画 ,bounce弹跳,接口，有点像接入一个头文件
}
//创建跳动标记函数
function addMarkerBound(point){
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);
	//标记处marker下放置animation动画，bounce弹跳，接口类似于头文件，BMAP_ANIMATION_BOUNCE类似于全局变量
	marker.setAnimation(BMAP_ANIMATION_BOUNCE);
}
//创建图片标记函数
function addMarkerPic(point){
	//icon 图标  怎么在这应用图片不用加src了？
	var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif",new BMap.Size(300,157));
	var marker = new BMap.Marker(point,{icon:myIcon});
	map.addOverlay(marker);
}
//-----------------------------------创建需要添加的标记点具体内容函数-----------------------------------
//添加小学
function addPrimary(){
	//清除地面覆盖物 ,就是清屏的作用
	map.clearOverlays();
	//创建添加的标记点
	var point = new BMap.Point(111.708265,36.51303);
	//定位地图中心到标记点 
	//第一个参数以point为中心点，第二个参数是地图缩放级别
	map.centerAndZoom(point, 18);
	//调用标记点函数进行标记
	//addMarkerBound(point);
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);
	var content = "这是我的小学";
	//在marker处获取鼠标点击后显示content
	addClickHandler(content,marker);
}
//添加初中
function addJuniormiddle(){
	map.clearOverlays();
	var point = new BMap.Point(111.487539,36.048877);
	map.centerAndZoom(point, 15);
	//addMarkerBound(point);
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);
	var content = "这是我的初中";
	addClickHandler(content,marker);
}
//添加高中
function addSeniormiddle(){
	map.clearOverlays();
	var point = new BMap.Point(111.497404,36.128796);
	map.centerAndZoom(point, 16);
	//addMarkerPic(point);
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);
	marker.setAnimation(BMAP_ANIMATION_BOUNCE);
	var content ="<h4 style='margin:0 0 5px 0;padding:0.2em 0'>这是我的高中</h4>"+
	"<iframe width='450px' height='250px' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' scrolling='no' src='Echarts01.html'/>";;
	addClickHandler(content,marker);
}
//添加大学
function addUniversity(){
	map.clearOverlays();
	var point = new BMap.Point(114.340851,30.583607);
	map.centerAndZoom(point, 15);
	var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif",new BMap.Size(300,157));
	var marker = new BMap.Marker(point,{icon:myIcon});
	map.addOverlay(marker);
	//addMarkerPic(point);
	var content = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>这是我的大学</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo'" +
	"src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493525420090&di=4b9b91d42435458f3fdb5ae809c754b2&imgtype=0&src=http%3A%2F%2Fwww.998xulang.com%2Fpic%2Fbig%2F358_0.jpg'"+ 
	"width='200' height='150' title='湖北大学'/>" +
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>地址：湖北省武汉市 武昌区友谊大道368号;邮政编码：430062</p>";
	var infoWindow = new BMap.InfoWindow(content);
	marker.addEventListener("click",function(){
		this.openInfoWindow(infoWindow);
		//图片加载完毕重绘infowindow
		document.getElementById('ingDemo').onload = function(){
			infoWindow.redraw();
		}
	});
}
//显示全部
function fullscreen(){
	map.clearOverlays();
	//定义地图的中心点，在西安附近
	var point = new BMap.Point(113.049154,33.983158);
	//显示中心与地图级别，看到全国范围
	map.centerAndZoom(point,7);
	//定义信息点坐标集合
	var data_info = [[111.708265,36.513030,"我的小学"],
					 [111.487539,36.048877,"我的初中"],
					 [111.497404,36.128796,"我的高中"],
					 [114.340851,30.583607,"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>这是我的大学</h4>" + 
	"<img style='float:right;margin:4px' id='imgDemo'" +
	"src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493525420090&di=4b9b91d42435458f3fdb5ae809c754b2&imgtype=0&src=http%3A%2F%2Fwww.998xulang.com%2Fpic%2Fbig%2F358_0.jpg'"+ 
	"width='200' height='150' title='湖北大学'/>" +
	"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>地址：湖北省武汉市 武昌区友谊大道368号;邮政编码：430062</p>"]
					];
	//通过二维数组遍历每个坐标点的经纬度
	//data_info[i][0],每一个坐标点的第一列，即经度
	//data_info[i][1],每一个坐标点的第二列，即纬度
	for(var i = 0; i < data_info.length;i++){
		var point = new BMap.Point(data_info[i][0],data_info[i][1]);
		//显示内容
		var content =data_info[i][2];
		//调用添加标注点函数，逐个添加标记点		
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		addClickHandler(content,marker);		
		//addMarker(marker);
	}
	//添加弧线
	var primaryPosition=new BMap.Point(111.708265,36.51303),
		juniormiddlePosition=new BMap.Point(111.487539,36.048877),
		seniormiddlePosition=new BMap.Point(111.497404,36.128796),
		universityPosition=new BMap.Point(114.340851,30.583607);
	var points = [primaryPosition,juniormiddlePosition, seniormiddlePosition,universityPosition];

	var curve = new BMapLib.CurveLine(points, {strokeColor:"blue", strokeWeight:4, strokeOpacity:0.5}); //创建弧线对象
	map.addOverlay(curve); //添加到地图中
	//curve.enableEditing(); 开启编辑功能
}
//点击标注点打开窗口信息
function addClickHandler(content,marker){
	//对对象marker采用方法addEventListener,添加事件聆听者，第一个参数是鼠标点击，第二个参数是函数function(e)的返回值
	marker.addEventListener("click",function(e){
		openInfo(content,e)}
	);
}
//弹出窗口
function openInfo(content,e){
	//创建一个对象opts
	var opts = {
		//width:450,
		//height:280,
		title:"信息窗口",
		enableMessage:true
	}
	var p = e.target;
	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	//创建信息窗口对象
	var infoWindow = new BMap.InfoWindow(content,opts);
	//开启信息窗口
	map.openInfoWindow(infoWindow,point);
}
//地名检索并返回名称、地址、经纬度
function localsearch(){
	//创建对象options
	var options = {
		//第一个属性：渲染选项 
		renderOptions: {map: map,autoViewport: true},
		//第二个属性：页面容量
		pageCapacity: 99,
		//第三个属性：搜素完成
		onSearchComplete: function(results){
			//判断状态是否正确
			if(local.getStatus() == BMAP_STATUS_SUCCESS){
				var s = [];
				//map.clearOverlays();
				//用循环逐个呈现
				for( var i = 0; i < results.getCurrentNumPois(); i++){
					s.push(results.getPoi(i).title + 
					"," +
					results.getPoi(i).address +
					"," +
					results.getPoi(i).point.lng +
					"," +
					results.getPoi(i).point.lat);
					var point = new BMap.Point(results.getPoi(i).point.lng,results.getPoi(i).point.lat);
					var marker = new BMap.Marker(point);
					//之前写的标记点函数，也可以用另外的
					map.addOverlay(marker);
				}
				//在JS中修改HTML
				document.getElementById("r-result").innerHTML = s.join("<br/>");
			}
		}	
	};
	var local = new BMap.LocalSearch(map, options);
	var city = document.getElementById("cityName").value;
	if(city !== ""){
		map.centerAndZoom(city,11);
	}
	else{
		alert('请输入城市名！');
	}
	//注意区分text_search和txt_search
	var txt_search = document.getElementById("text_search").value;
	if(txt_search != ""){
		local.search(txt_search);
	}
	else{
		alert('请输入检索名称!');
	}
}
//地名检索并分页显示结果
function searchpage(){
	var local = new BMap.LocalSearch(map, {
		renderOptions:{map: map,panel:"r-result"}
	});
	var city = document.getElementById("cityName").value;
	if(city !== ""){
		map.centerAndZoom(city,11);
	}
	else{
		alert('请输入城市名！');
	}
	//注意区分text_search和txt_search
	var txt_search = document.getElementById("text_search").value;
	if(txt_search != ""){
		local.search(txt_search);
	}
	else{
		alert('请输入检索名称!');
	}
}
/***********************mapv开源库************************/
function mapv1(){
	map.clearOverlays();
	 map.setMapStyle({
            style: 'midnight'
        });
        map.centerAndZoom(new BMap.Point(105.403119,38.028658),5);
		var randomCount = 1000;

        var data = [];

        var citys = ["北京","天津","上海","重庆","石家庄","太原","呼和浩特","哈尔滨","长春","沈阳","济南","南京","合肥","杭州","南昌","福州","郑州","武汉","长沙","广州","南宁","西安","银川","兰州","西宁","乌鲁木齐","成都","贵阳","昆明","拉萨","海口"];

        // 构造数据
        while (randomCount--) {
            var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
                },
                count: 30 * Math.random(),
                time: 100 * Math.random()
            });
        }

        var dataSet = new mapv.DataSet(data);

        var options = {
            size: 13,
            gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"},
            max: 60,
            animation: {
                type: 'time',
                stepsRange: {
                    start: 0,
                    end: 100
                },
                trails: 10,
                duration: 4,
            },
            draw: 'heatmap'
        }

        var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

}
function mapv2(){
	map.clearOverlays();
	map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5);  // 初始化地图,设置中心点坐标和地图级别
    // 地图自定义样式
    map.setMapStyle({
        styleJson: [{
            "featureType": "water",
            "elementType": "all",
            "stylers": {
                "color": "#044161"
            }
        }, {
            "featureType": "land",
            "elementType": "all",
            "stylers": {
                "color": "#091934"
            }
        }, {
            "featureType": "boundary",
            "elementType": "geometry",
            "stylers": {
                "color": "#064f85"
            }
        }, {
            "featureType": "railway",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry",
            "stylers": {
                "color": "#004981"
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#005b96",
                "lightness": 1
            }
        }, {
            "featureType": "highway",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry",
            "stylers": {
                "color": "#004981",
                "lightness": -39
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#00508b"
            }
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "green",
            "elementType": "all",
            "stylers": {
                "color": "#056197",
                "visibility": "off"
            }
        }, {
            "featureType": "subway",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "manmade",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "local",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "boundary",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#029fd4"
            }
        }, {
            "featureType": "building",
            "elementType": "all",
            "stylers": {
                "color": "#1a5787"
            }
        }, {
            "featureType": "label",
            "elementType": "all",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#ffffff"
            }
        }, {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#1e1c1c"
            }
        }, {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        },{
            "featureType": "road",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }]
    });
    var randomCount = 1000;
    var data = [];
    var timeData = [];
    function curive(fromPoint, endPoint, n) {
        var delLng = (endPoint.lng - fromPoint.lng) / n;
        var delLat = (endPoint.lat - fromPoint.lat) / n;

        for (var i = 0; i < n; i++) {
            var pointNLng = fromPoint.lng + delLng * i;
            var pointNLat = fromPoint.lat + delLat * i;
            timeData.push({
                geometry: {
                    type: 'Point',
                    coordinates: [pointNLng, pointNLat]
                },
                count: 1,
                time: i
            });
        }
    }
    // 构造数据
    $.ajax({
        url: 'data/qianxi-time',
        success: function (rs) {
            var items = rs.split('|');
            var count = 20;
            for (var i = 0; i < items.length; i++) {
                var itemArr = items[i].split(/\n/);
                for (var k = 0; k < itemArr.length; k++) {
                    if (!!itemArr[k]) {
                        var item = itemArr[k].split(/\t/);
                        if (item[0] === '起点城市' || item[0] === '迁出城市') {
                            var cityBegin = item[1];
                        }
                        if (item[0] !== '起点城市' || item[0] !== '迁出城市' && item.length > 1) {
                            var cityCenter1 = mapv.utilCityCenter.getCenterByCityName(item[0].replace(/市|省/, ""));
                            var cityCenter2 = mapv.utilCityCenter.getCenterByCityName(cityBegin.replace(/市|省/, ""));
                            if (cityCenter1) {
                                if(Math.random() > 0.7) {
                                    curive(cityCenter2, cityCenter1, 50);
                                }
                                data.push({
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: [[cityCenter1.lng, cityCenter1.lat], [cityCenter2.lng, cityCenter2.lat]]
                                    },
                                    count: 100 * Math.random()
                                });
                            }
                        }
                    }
                }
            }
            var dataSet = new mapv.DataSet(data);
            var options = {
                strokeStyle: 'rgba(55, 50, 250, 0.3)',
                globalCompositeOperation: 'lighter',
                shadowColor: 'rgba(55, 50, 250, 0.5)',
                methods: {
                    click: function (item) {
                    }
                },
                gradient: {0:'rgba(55, 50, 250, 0)',1:'rgba(55, 50, 250, 1)'},
                lineWidth: .2,
                draw: 'intensity'
            }
            var mapvLineLayer = new mapv.baiduMapLayer(map, dataSet, options);
            var dataSet = new mapv.DataSet(timeData);
            var options = {
                fillStyle: 'rgba(255, 250, 250, 0.9)',
                size: .5,
                animation: {
                    type: 'time',
                    stepsRange: {
                        start: 0,
                        end: 50
                    },
                    trails: 1,
                    duration: 5,
                },
                draw: 'simple'
            }
            var mapvTimeLayer = new mapv.baiduMapLayer(map, dataSet, options);
        }
    });
}
function mapv3(){
	map.clearOverlays();
	map.centerAndZoom(new BMap.Point(114.321317, 30.598428), 12);  // 初始化地图,设置中心点坐标和地图级别
        // 地图自定义样式
        map.setMapStyle({
            styleJson: [{
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#044161"
                }
            }, {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                    "color": "#091934"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry",
                "stylers": {
                    "color": "#064f85"
                }
            }, {
                "featureType": "railway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#005b96",
                    "lightness": 1
                }
            }, {
                "featureType": "highway",
                "elementType": "labels",
                "stylers": {
                    "visibility": "on"
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981",
                    "lightness": -39
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#00508b"
                }
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                    "color": "#056197",
                    "visibility": "off"
                }
            }, {
                "featureType": "subway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "manmade",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "local",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "arterial",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#029fd4"
                }
            }, {
                "featureType": "building",
                "elementType": "all",
                "stylers": {
                    "color": "#1a5787"
                }
            }, {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": {
                    "color": "#ffffff"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": {
                    "color": "#1e1c1c"
                }
            }, {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            },{
                "featureType": "road",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }]
        });

        $.get('data/wuhan-car', function (rs) {

            var data = [];
            var timeData = [];

            rs = rs.split("\n");
            console.log(rs.length);
            var maxLength = 0;
            for (var i = 0; i < rs.length; i++) {
                var item = rs[i].split(',');
                var coordinates = [];
                if (item.length > maxLength) {
                    maxLength = item.length;
                }
                for (j = 0; j < item.length; j += 2) {
                    coordinates.push([item[j], item[j + 1]]);
                    timeData.push({
                        geometry: {
                            type: 'Point',
                            coordinates: [item[j], item[j + 1]]
                        },
                        count: 1,
                        time: j
                    });
                }
                data.push({
                    geometry: {
                        type: 'LineString',
                        coordinates: coordinates
                    }
                });
                
            }

            var dataSet = new mapv.DataSet(data);

            var options = {
                strokeStyle: 'rgba(53,57,255,0.5)',
                coordType: 'bd09mc',
                // globalCompositeOperation: 'lighter',
                shadowColor: 'rgba(53,57,255,0.2)',
                shadowBlur: 3,
                lineWidth: 3.0,
                draw: 'simple'
            }

            var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);


            var dataSet = new mapv.DataSet(timeData);

            var options = {
                fillStyle: 'rgba(255, 250, 250, 0.2)',
                coordType: 'bd09mc',
                globalCompositeOperation: "lighter",
                size: 1.5,
                animation: {
                    stepsRange: {
                        start: 0,
                        end: 100 
                    },
                    trails: 3,
                    duration: 5,
                },
                draw: 'simple'
            }

            var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
        });


}
