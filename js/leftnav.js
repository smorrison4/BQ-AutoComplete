// TODO: When edit Autocomplete, set binding back to ainput and label
// TODO: Long term: D3 Graphs, Panes, Tables, Security, S Corp, CCorp, 

var pageToLoad = "";
var browserType = "unknown";
// Check the Netscape or IE version
// Netscape 4, 5, 6. IE 3, 4, 5, 6
bAgent = window.navigator.userAgent;
bAppName = window.navigator.appName;

function onloadbody() {
	var vBody = document.getElementsByTagName('body')[0];
	// True if iPhone, iPod, iPad
	var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	if (iOS) {
		vBody.className += 'for-iphone-and-ipod';
		browsertype = "iOS";
	}
	var isEdge = (window.navigator.userAgent.indexOf("Edge") > -1);
	if (isEdge) {
		var j;
		var elem = document.getElementsByClassName('panel lightblueimage');
		for (j = elem.length - 1; j >= 0; j--) { elem[j].className = 'panel lightbluesolid'; }
		var elem = document.getElementsByClassName('lightblueimage');
		for (j = elem.length - 1; j >= 0; j--) { elem[j].className = 'lightbluesolid'; }
		var elem = document.getElementsByClassName('mediumblueimage');
		for (j = elem.length - 1; j >= 0; j--) { elem[j].className = 'mediumbluesolid'; }
		var elem = document.getElementsByClassName('grayimage');
		for (j = elem.length - 1; j >= 0; j--) { elem[j].className = 'graysolid'; }
		var elem = document.getElementsByClassName('grayslateimage');
		for (j = elem.length - 1; j >= 0; j--) { elem[j].className = 'grayslatesolid'; }
		var elem = document.getElementsByClassName('lightgreenimage');
		for (j = elem.length - 1; j >= 0; j--) { elem[j].className = 'lightgreensolid'; }
		var elem = document.getElementsByClassName('darkgreenimage');
		for (j = elem.length - 1; j >= 0; j--) { elem[j].className = 'darkgreensolid'; }
	}	// End if Edge

	//var ua = navigator.userAgent.toLowerCase();
	//if (ua.indexOf("android") > -1) {
	//	browserType = "Android";
	//}
}

//-webkit-filter: hue-rotate(90deg); /* Safari */
//filter: hue-rotate(90deg);

function accordionClick(idValue) {
	var acc1 = document.getElementById(idValue);
	//acc1.addEventListener('gesturechange', function () { });

	var isActive = false;
	if (acc1.classList.length > 1 && acc.classList[acc.classList.length - 1] == 'active') {
		isActive = true;
	}
	if (isActive) {
		acc1.classList.remove('active');
		acc1.nextElementSibling.classList.remove('show');
	}
	else {
		acc1.classList.add('active');
		acc1.nextElementSibling.classList.add('show');
	}
}
function oninputkeyup0(nbr) {
	var elem = null;
	var labelElem = null;
	if (nbr === '1') {
		labelElem = document.getElementById('label1');
		elem = document.getElementById('input1');
		setbqac1ByEntry(elem.value);
		labelElem.textContent = elem.value;
	}
	else if (nbr === '2') {
		labelElem = document.getElementById('label2');
		elem = document.getElementById('input2');
		setbqac2ByEntry(elem.value);
		labelElem.textContent = elem.value;
	}
	else if (nbr === '3') {
		labelElem = document.getElementById('label3');
		elem = document.getElementById('input3');
		setbqac3ByEntry(elem.value);
		labelElem.textContent = elem.value;
	}
	else if (nbr === '4') {
		labelElem = document.getElementById('label4');
		elem = document.getElementById('input4');
		setbqac4ByEntry(elem.value);
		labelElem.textContent = elem.value;
	}
	else if (nbr === '5') {
		labelElem = document.getElementById('label5');
		elem = document.getElementById('input5');
		setbqac5ByEntry(elem.value);
		labelElem.textContent = elem.value;
	}
	else if (nbr === '6') {
		labelElem = document.getElementById('label6');
		elem = document.getElementById('input6');
		setbqac6ByEntry(elem.value);
		labelElem.textContent = elem.value;
	}
}

function accordionClick(e) {
	var labelElem = null;
	var inputElem = null;
	var acElem = null;
	if (e === '1') {
		setbqac1ByIndex(2);
		inputElem = document.getElementById('input1');
		labelElem = document.getElementById('label1');
		acElem = document.getElementById('bqac1-auto-complete');
		labelElem.textContent = acElem.value;
		inputElem.value = acElem.value;
		return;
	}
	if (e === '2') {
		setbqac2ByIndex(2);
		inputElem = document.getElementById('input2');
		labelElem = document.getElementById('label2');
		acElem = document.getElementById('bqac2-auto-complete');
		labelElem.textContent = acElem.value;
		inputElem.value = acElem.value;
		return;
	}
	if (e === '3') {
		setbqac3ByIndex(2);
		inputElem = document.getElementById('input3');
		labelElem = document.getElementById('label3');
		acElem = document.getElementById('bqac3-auto-complete');
		labelElem.textContent = acElem.value;
		inputElem.value = acElem.value;
		return;
	}
	if (e === '5') {
		setbqac5ByIndex(2);
		inputElem = document.getElementById('input5');
		labelElem = document.getElementById('label5');
		acElem = document.getElementById('bqac5-auto-complete');
		labelElem.textContent = acElem.value;
		inputElem.value = acElem.value;
		return;
	}
	if (e === '6') {
		setbqac6ByIndex(2);
		inputElem = document.getElementById('input6');
		labelElem = document.getElementById('label6');
		acElem = document.getElementById('bqac6-auto-complete');
		labelElem.textContent = acElem.value;
		inputElem.value = acElem.value;
		return;
	}
	if (e === 'Button1') {
		setbqac1ByIndex(4);
		labelElem = document.getElementById('label1');
		acElem = document.getElementById('bqac1-auto-complete');
		labelElem.textContent = acElem.value;
	}
	else if (e === 'Button2') {
		var item = ["1901", "1st VACATION REIMBURSEMENT", ""];
		setbqac1ByItem(item);
		labelElem = document.getElementById('label2');
		acElem = document.getElementById('bqac2-auto-complete');
		labelElem.textContent = acElem.value;
	}
	else if (e === 'Button3') {
		setbqac1ByKey('1901620');
		labelElem = document.getElementById('label3');
		acElem = document.getElementById('bqac3-auto-complete');
		labelElem.textContent = acElem.value;
	}
	else {
		alert('button clicked ' + e);
	}
}
var acc4 = [['Highlander', 'There can be only one', '']];
