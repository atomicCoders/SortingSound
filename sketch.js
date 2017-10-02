
let bs, osc, fft, env,//audio is the sound library
cyan, magenta,
	range,//declare global min and max sorting number as constant!!
	arraySize = 50, myArray = [],//, myArrayCopy = [];
	arraySizeSlider, 
	barSpacing = 5, w, h, 
	initialized = false, pause = false,//consider adding a pause function
	mono, BGText, txtCanvas;//monospace font

	function preload(){
		mono = loadFont("font/SourceCodePro-Bold.otf")
	}
	function setup(){
		pixelDensity(1);
		w = window.innerWidth;
		h = window.innerHeight;
		let cnv = createCanvas(w, h);
		cyan = color(0, 255, 255);
		magenta = color(255, 0, 255);
	//declaring text
	textFont(mono);
	textSize(5);
	txtCanvas = document.getElementById("txtCanvas");
	// txtCanvas.position(0, 0);
	// txtCanvas.size(w, h);
	//
	//slider
	arraySizeSlider = createSlider
	//
	background(51);
	range = h / 2 - 100;
	myArray = filltheArray(myArray, arraySize);
	BGText = myArray.toString();
	// console.log(myArray);
	// console.log(myArray);
	// initialize the sound library
	osc = new p5.Oscillator();
	osc.setType('sine');
	// osc.freq(240);
	
	fft = new p5.FFT();
	env = new p5.Env();
    // set attackTime, decayTime, sustainRatio, releaseTime
	env.setADSR(0.001, 0.5, 0.1, 0.5);
	env.setRange(1, 0);
	osc.amp(0.0);
	osc.start();
}

function draw (){
	background(255);
	if(bs != null){
		bs.update();
		drawWaveForm();
		bs.show();
	}else{
		show(myArray, null, null, true);
	}
}

function initSorting(){
	let select = document.getElementById("kernel");
	let answer = select.options[select.selectedIndex].value;
	let myArrayCopy = [];
	for(let i = 0; i < myArray.length; i++)myArrayCopy[i] = myArray[i];//this should 
		if(answer == 0)bs = new bubbleSort(myArrayCopy);
	if(answer == 1)bs = new selectionSort(myArrayCopy);
	if(answer == 2)bs = new insertionSort(myArrayCopy);
	if(answer == 3)bs = new mergeSort(myArrayCopy);	
	if(answer == 4)bs = new shellSort(myArrayCopy);
	initialized = true;
}

function filltheArray(arr, arrSize){
	arr = [];
	for (let i = 0; i < arrSize; i++) {
		arr.push(floor(random(-range, range)));
	}
	return arr;
}

function drawWaveForm(){
	var spectrum = fft.analyze();
  	noStroke();
  	fill(0, 200, 0); // spectrum is green
  	for (var i = 0; i< spectrum.length; i+=5){
	    var x = map(i, 0, spectrum.length, 0, width);
	    var h = -height + map(spectrum[i], 0, 255, height, 0);
	    rect(x, height, width / spectrum.length, h )
	  }
	// var waveform = fft.waveform();  // analyze the waveform
	// noFill();
	// stroke(200);
	// beginShape();
	// strokeWeight(1);
	// for (var i = 0; i < waveform.length; i++){
	// 	var x = map(i, 0, waveform.length, 0, width);
	// 	var y = map(waveform[i], -1, 1, height, 0);
	// 	vertex(x, y);
	// }
	// endShape();
}

function resizeArray(){
	let theArraySize = document.getElementById("arraySize").value;
	theArraySize = floor(map(theArraySize, 0, 100, 20, floor(w / barSpacing)));	
	console.log(theArraySize);
	myArray = filltheArray(myArray, theArraySize);	
	BGText = myArray.toString();
	if(initialized)initSorting()
}

function setWave(){	
	let select = document.getElementById("waveForm");
	let answer = select.options[select.selectedIndex].value;
	if(answer == 0)osc.setType('sine');
	if(answer == 1)osc.setType('triangle');
	if(answer == 2)osc.setType('sawtooth');
	if(answer == 3)osc.setType('square');
}


