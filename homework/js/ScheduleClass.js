//加
function add(a,b){
	return Number(a)+Number(b);
}
//减
function minus(a,b){
	return a-b;
}
//乘
function multiply(a,b){
	return a*b;
}
//除以
function divide(a,b){
	return a/b;
}
//计算函数
function compute(){
	//获取文本输入框a的值
	var a=document.getElementById('txt_a').value;
	//获取文本输入框b的值
	var b=document.getElementById('txt_b').value;
	//获取下拉框计算符号选择的值
	var type=document.getElementById('computeType').value;
	if(a==''||b==''){
		//弹出对话窗
		alert('请输入参数！');
		//返回
		return;
	}
	else{
		var y;
		//如果运算符是+，就调用add函数
		if(type=='add'){
			y=add(a,b);
			//弹出对话框
			alert('加的结果是：'+y);
		}
		//如果运算符是-，就调用minus函数
		else if(type=='minus'){
			y=minus(a,b);
			//弹出对话框
			alert('减的结果是：'+y);
		}
		//如果运算符是*，就调用mulitiply函数
		else if(type=='multiply'){
			y=multiply(a,b);
			//弹出对话框
			alert('乘的结果是：'+y);
		}
		//如果运算符是/，就调用add函数
		else if(type=='divide'){
			y=divide(a,b);
			//弹出对话框
			alert('除以的结果是：'+y);
		}
		//将计算结果填写到计算结果文本框C中
		document.getElementById('txt_c').value=y;
	}
}
window.onload = function(){
    var obj_lis = document.getElementById("test").getElementsByTagName("li");
    for(i=0;i<obj_lis.length;i++){
        obj_lis[i].onclick = function(){
            alert(this.innerHTML);
        }
    }
}
//函数沟通了HTML和JS
function loadEcharts(){
	$(window).scroll(function () {  
            if ($(".navbar").offset().top > 50) {$(".navbar-fixed-top").addClass("top-nav");  
            }else {$(".navbar-fixed-top").removeClass("top-nav");}  
        })
	
	//基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('echartsTest'));
	//创建一个对象来指定图表的配置项和数据
	var option = {
		title:{
			text:'一周时间统计'
		},
		//鼠标移至柱状图上时，显示数据
		tooltip:{},
		//图例
		legend:{
			data:['小时']
		},
		xAxis:{
			data:["吃饭","睡觉","学习","锻炼","free","音乐","其他"]
		},
		yAxis:{},
		//数据集
		series:[{
			name:'销量',
			type:'bar',
			//改变柱状图颜色					
			itemStyle: {
            	normal: {
　　　　　　　　　	//定义一个list，然后根据不同的值改变柱的颜色
                    color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                        '#B5C334','#FCCE10','#E87C25','#27727B',
                        '#FE8463','#9BCA63','#FAD860'
                        ];
                    return colorList[params.dataIndex]
                    },
                }
            },
　　　　　　　//设置柱的宽度,使效果更加美观
　　　　　　　barWidth:40,
			data:[10,50,60,12,15,10,20]
		}]							
	};
	//使用刚指定的配置项和数据显示图表
	myChart.setOption(option);
}
