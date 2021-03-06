/*
THIS IS THE FUNCTION THAT IS CALLED BY THE SORTING CLASSES
IT GETS THE ARRAY AND TWO INDEXES AS ARGUMENT
IT IS USED TO COLOR THE BARS WITH DIFFERENT COLORS
*/
function show(arr, idx1, idx2){
	strokeWeight(3);
	noFill();
	for (let i = 0; i < arr.length; i++) {
		if(i == idx1)stroke(cyan);
		else if(i == idx2){
			stroke(magenta);
			playSound(arr[i]);
		} else stroke(0);
		let posX = leftMargin;// + floor((w / 2) - ((arr.length * barSpacing) / 2));
		drawLine(arr, posX, i);
	}	
}
/**
THIS IS THE DRAWING FUNCTION, IT GETS THREE ARGUMENTS
IT IS TAUGHT TO DISPLAY THE ELEMENTS ALONG THE X AXIS
*/
function drawLine(arr, x, index){
	line(x + index * barSpacing, (h / 2) + arr[index], x + index * barSpacing, (h / 2) - arr[index]);
}
function playSound(num){
	let midiValue = map(num, 0, range, 60, 100);
    var freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);
    env.play(osc, 0, 0.1);
}
//THIS FUNCTION CHECKS IF AN ARRAY IS SORTED AND RETURNS TRUE OR FALSE
function isSorted(arr) {
	let sorted = true;
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] > arr[i+1]) {
			sorted = false;
			break;
		}
	}
	return sorted;
}
//THE FLLOWING FUNCTIONS TURN ON AND OFF THE SOUND
function volume0(){
	masterVolume(0, 0.5);
}
function volumeUp(){	
	masterVolume(1, 0.5);
}


/***********************************************************
STOPWATCH CLASS
Copyright (c) 2010-2015 Giulia Alfonsi <electric.g@gmail.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

**************************************************************/

let x = new Stopwatch();
let time, clocktimer;
function Stopwatch () {
		// Private vars
		let	startAt	= 0;	// Time of last start / resume. (0 if not running)
		let	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

		let	now	= function() {
				return (new Date()).getTime(); 
			}; 
 
		// Public methods
		// Start or resume
		this.start = function() {
				startAt	= startAt ? startAt : now();
			};

		// Stop or pause
		this.stop = function() {
				// If running, update elapsed time otherwise keep it
				lapTime	= startAt ? lapTime + now() - startAt : lapTime;
				startAt	= 0; // Paused
			};

		// Reset
		this.reset = function() {
				lapTime = startAt = 0;
			};

		// Duration
		this.time = function() {
				return lapTime + (startAt ? now() - startAt : 0); 
			};
	}


function pad(num, size) {
	let s = "0000" + num;
	return s.substr(s.length - size);
}

function formatTime(time) {
	let h = m = s = ms = 0;
	let newTime = '';

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	ms = time % 1000;

	newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
	return newTime;
}

function showTime() {
	time = document.getElementById("time2");
	updateTime();
}

function updateTime() {
	time.innerHTML = formatTime(x.time());
}

function start() {
	clocktimer = setInterval("updateTime()", 1);
	x.start();
}

function stop() {
	x.stop();
	clearInterval(clocktimer);
}

function reset() {
	stop();
	x.reset();
	updateTime();
}