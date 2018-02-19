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
function accordionClick(e) {
	setBq1ByIndex(4);
	var item = ["1901", "1st VACATION REIMBURSEMENT", ""];
	setBq1ByItem(item);
	//alert('button clicked ' + e);
}
var acc4 = [['Highlander', 'There can be only one', '']];
