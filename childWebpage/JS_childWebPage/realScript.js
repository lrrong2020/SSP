const DOUBLE_SAMPLE_MIN = 35981
const DOUBLE_SAMPLE_MAX = 36460
const SINGLE_SAMPLE_MIN = 2804
const SINGLE_SAMPLE_MAX = 2823
const TS_CONVERTER_CONST = 1000
const ONE_THOUSAND_MS = 1000
const TWO_HOURS = 7200000
const FIVE_MINUTE = 8
const REAL_INTERVAL = ONE_THOUSAND_MS * FIVE_MINUTE

var doubleCameraArr
var singleCameraArr
var myChart
var singlePlotArr = [[]]
var doublePlotArr = [[]]


console.log('loaded')


//pop-up
function openwindowS(){
		var modal = document.getElementById('myModalS');
		var span = document.getElementsByClassName("close")[0];
		var ok=document.getElementsByClassName("ok")[0];
		var no=document.getElementsByClassName("no")[0];
		modal.style.display = "block";
		window.onclick = function(event) {
			if (event.target == modal) modal.style.display = "none";
		}
	}
//pop-up
function openwindowD(){
		var modal = document.getElementById('myModalD');
		var span = document.getElementsByClassName("close")[0];
		var ok=document.getElementsByClassName("ok")[0];
		var no=document.getElementsByClassName("no")[0];
		modal.style.display = "block";
		window.onclick = function(event) {
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


//fetch needed data in remote repository and store them in arrays
let doubleCameraData = 'https://raw.githubusercontent.com/lrrong2020/Smart-Campus/main/double_camera.csv'
let singleCameraData = 'https://raw.githubusercontent.com/lrrong2020/Smart-Campus/main/single_camera.csv'

fetch (singleCameraData)
.then(response => response.text())
.then(result => singleCameraArr = result.split('\n').map(function (line){return line.split(',')}))


fetch (doubleCameraData)
.then(response => response.text())
.then(result => doubleCameraArr = result.split('\n').map(function (line){return line.split(',')}))


//convert timestamp to Italy time
function timeConverter(arr, i){
	var ts = parseInt(arr[i][0])
	return (new Date(ts * TS_CONVERTER_CONST + TWO_HOURS)).toISOString()
}


//format time string
function formatTime(time){
	return (time.slice(11,13) + ":" + time.slice(14,16))
}


//plot
function plotS(arr){
		var ctx = document.getElementById('myChartS').getContext('2d')
		var lb = []
		var dt = []
		for(var i = 0;i < arr.length;i++){
			lb.push(arr[i][0])
			dt.push(arr[i][1])
		}
		myChartS = new Chart(ctx, {
		type: 'line',
		data: {
			labels: lb,
			datasets: [{
				label: '# of Students',
				data: dt,
				backgroundColor: [
					'rgba(52, 128, 235, 0.2)',
				],
				borderColor: [
					'rgba(52, 128, 235, 1)',
				],
				borderWidth: 3
			}]
		},
		options: {
			scales: {
				y: {	
					suggestedMin: 0,
					suggestedMax: 20,
					beginAtZero: true
				}
			}
		}
	});

setTimeout(function(){myChartS.destroy()}, 6000)
		document.getElementById("loadingS").style.display = "none";
		setTimeout(function(){document.getElementById("loadingS").style.display = "block";},6000)

}

//plotD
function plotD(arr){
		var ctx = document.getElementById('myChartD').getContext('2d')
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
					'rgba(52, 128, 235, 0.2)',
				],
				borderColor: [
					'rgba(52, 128, 235, 1)',
				],
				borderWidth: 3
			}]
		},
		options: {
			scales: {
				y: {	
					suggestedMin: 0,
					suggestedMax: 50,
					beginAtZero: true
				}
			}
		}
	});
setTimeout(function(){myChart.destroy()}, 6000)
		document.getElementById("loadingD").style.display = "none";
		setTimeout(function(){document.getElementById("loadingD").style.display = "block";},6000)
}

//present single camera array
var singleCounter = SINGLE_SAMPLE_MIN

setInterval(function (){
if(singleCounter <= SINGLE_SAMPLE_MAX){
	var lastTime = timeConverter(singleCameraArr, singleCounter)
	var studentNumberFromSingle =  parseInt(singleCameraArr[singleCounter][1])

	if(singlePlotArr[0].length === 0){singlePlotArr[0] = [formatTime(lastTime),studentNumberFromSingle]}
	else {appendArr([formatTime(lastTime), studentNumberFromSingle], singlePlotArr)}
	document.getElementById('C2_5').innerHTML=studentNumberFromSingle
	document.getElementById('C2_6').innerHTML=studentNumberFromSingle
	document.getElementById('C2_10').innerHTML=studentNumberFromSingle
	document.getElementById('C2_13').innerHTML=studentNumberFromSingle
	
	setTimeout(plotS(singlePlotArr),6000)

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
	document.getElementById('C2_1').innerHTML=studentNumberFromDouble
	document.getElementById('L2_2').innerHTML=studentNumberFromDouble
	document.getElementById('C2_9').innerHTML=studentNumberFromDouble
	plotD(doublePlotArr)



	doubleCounter = doubleCounter + 2}
}, REAL_INTERVAL)
