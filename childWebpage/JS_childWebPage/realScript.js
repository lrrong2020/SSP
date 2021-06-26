const DOUBLE_SAMPLE_MIN = 15099
const DOUBLE_SAMPLE_MAX = 20459
const SINGLE_SAMPLE_MIN = 0
const SINGLE_SAMPLE_MAX = 2710
const TS_CONVERTER_CONST = 1000
const ONE_THOUSAND_MS = 1000
const TWO_HOURS = 7200000
const FIVE_MINUTE = 1
const REAL_INTERVAL = ONE_THOUSAND_MS * FIVE_MINUTE

var doubleCameraArr
var singleCameraArr
var myChart
var singlePlotArr = [[]]
var doublePlotArr = [[]]

console.log('loaded')



function openwindow(){
		//获取弹窗得div
		var modal = document.getElementById('myModal');
		// 获取 <span> 元素，用于关闭弹窗 （X）
		var span = document.getElementsByClassName("close")[0];
		//获取弹窗中得确定按钮
		var ok=document.getElementsByClassName("ok")[0];
		//获取弹窗中得取消按钮
		var no=document.getElementsByClassName("no")[0];
		//窗体弹出
		modal.style.display = "block";

		// 在用户点击其他地方时，关闭弹窗
		window.onclick = function(event) {
			//点击窗口外内容，关闭窗口
			if (event.target == modal) modal.style.display = "none";
		}
	}



//check if 2d array has empty child and return empty index
function childIsEmpty(arr, a){
	n = arr.length
	for(var i = 0;i < n;i++){
		if(arr[i].length != 0)
			continue
		else return i
	}
	return a
}

//append array with length 12
function appendArr(num, arr){
	n = arr.length
	if(n<12){
		arr.push(num)
	}
	else{
		var i = childIsEmpty(arr, -1)
		if(i === -1){
		for(var j = 0;j < 12;j++){
			arr[j] = arr[j + 1]			
		}
    arr[n - 1] = num
		}
		else arr[i] = num
	}	
}

function presentArray(sb){
	return sb

}


//fetch needed data in remote repository and store them in arrays
let doubleCameraData = 'https://raw.githubusercontent.com/lrrong2020/Smart-Campus/main/double_camera.csv'
let singleCameraData = 'https://raw.githubusercontent.com/lrrong2020/Smart-Campus/main/single_camera.csv'

fetch (singleCameraData)
.then(response => response.text())
.then(result => singleCameraArr = result.split('\n').map(function (line){return line.split(',')}))


fetch (doubleCameraData)
.then(response => response.text())
.then(result => doubleCameraArr = presentArray(result.split('\n').map(function (line){return line.split(',')})))

/* For display time string
	  for(var i = DOUBLE_SAMPLE_MIN;i < DOUBLE_SAMPLE_MAX;i++){
		  var timestamp = parseInt(lines[i][0])
		  var date = new Date(timestamp * TS_CONVERTER_CONST + TWO_HOURS)
		  //console.log(date.getTime())
		  var isoTime = date.toISOString()
		  var isoYear = isoTime.slice(0,4)
		  var isoMonth = isoTime.slice(5,7)
		  var isoDay = isoTime.slice(8,10)
		  var isoHour = isoTime.slice(11,13)
		  var isoMinute = isoTime.slice(14,16)
		  var isoSecond = isoTime.slice(17,19)		  
		  console.log(isoTime)
		  console.log(isoYear + "-" + isoMonth + "-" + isoDay + " " + isoHour + ":" + isoMinute + " " + isoSecond)
	  }
*/

//convert timestamp to Italy time
function timeConverter(arr, i){
	var ts = parseInt(arr[i][0])
	return (new Date(ts * TS_CONVERTER_CONST + TWO_HOURS)).toISOString()
}
//format time string
function formatTime(time){
	return (time.slice(11,13) + ":" + time.slice(14,16) + ":" + time.slice(17,19))
}


//plot
function plot(arr){
		

		
		var ctx = document.getElementById('myChart').getContext('2d')
		var lb = []
		var dt = []
		for(var i = 0;i < arr.length;i++){
			lb.push(arr[i][0])
			dt.push(arr[i][1])
		}
		myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: lb,
			datasets: [{
				label: '# of Students',
				data: dt,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
setTimeout(function(){
		myChart.destroy()
		
		
		}, 8000)
		document.getElementById("loading").style.display = "none";
		setTimeout(function(){document.getElementById("loading").style.display = "block";},8000)

}


//present single camera array
var singleCounter = SINGLE_SAMPLE_MIN







setInterval(function (){
if(singleCounter <= SINGLE_SAMPLE_MAX){
	var lastTime = timeConverter(singleCameraArr, singleCounter)
	var studentNumberFromSingle =  parseInt(singleCameraArr[singleCounter][1])

	if(singlePlotArr[0].length === 0){singlePlotArr[0] = [formatTime(lastTime),studentNumberFromSingle]}
	else {appendArr([formatTime(lastTime), studentNumberFromSingle], singlePlotArr)}

	console.log("single: " + lastTime + "no: " + studentNumberFromSingle)
	

	plot(singlePlotArr)

	document.getElementById('camera1').innerHTML=studentNumberFromSingle

	//console.log(formatTime(lastTime))
	singleCounter = singleCounter + 1
}
}, REAL_INTERVAL)


//present double camera array
var doubleCounter = DOUBLE_SAMPLE_MIN

setInterval(function (){
if(doubleCounter <= DOUBLE_SAMPLE_MAX){
	var lastTime = timeConverter(doubleCameraArr, doubleCounter)
	var studentNumberFromCamera1 = parseInt(doubleCameraArr[doubleCounter][1])
	var studentNumberFromCamera2 = parseInt(doubleCameraArr[doubleCounter + 1][1])
	var studentNumberFromDouble = studentNumberFromCamera1 + studentNumberFromCamera2
	
	if(doublePlotArr[0].length === 0){doublePlotArr[0] = [formatTime(lastTime),studentNumberFromDouble]}
	else {appendArr([formatTime(lastTime), studentNumberFromDouble], doublePlotArr)}

	document.getElementById('camera2').innerHTML=studentNumberFromDouble

	plot(doublePlotArr)
	//console.log(formatTime(lastTime))
	doubleCounter = doubleCounter + 2}
}, REAL_INTERVAL)

