// TODO: Can add nested and columns. Can add D3 Graphs. Can add WebAPI.

//Controller
var bqlistbox = {
	searchText: '',
	availableStaffs: [],
	leftStaffs: [],
	allSelectedStaffs: [],

	availableStaffs: acc1,
	//availableStaffs: AppService.availableStaffs();
	//includedStaffs: AppService.initIncludedStaffs();
	includedStaffs: [],

	renderSelectItem: function(item, search) {
		search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
		var re = new RegExp('(' + search + ')', 'gi');
		try {
			if (re !== null && item[1] !== null) {
				if (item[0].indexOf('-Lvl') === -1) {
					if (item[0].indexOf('-Lvlback') !== -1) {
						return;
					}
					return '<div class="ac-sug" dname="' + item[1] + '" dchoice="' + item[2] + '" dval="' + search + '" dlink="' + item[0] + '">'
						+ '<div style="display:table-cell;min-width:70px;max-width:70px;border-width:2px;border-color:black">' + item[0] + '</div>'
						+ '<div style="display:table-cell;min-width:15px;max-width:15px"></div>'
						+ '<div style="display:table-cell;background:#ffffff">' + item[1].replace(re, "<b>$1</b>") + '</div></div>';
				}
				else {
					return '<div class="ac-sug" dname="" dchoice="' + item[0] + '" dval="' + item[0] + '"' + search + '" dlink="' + item[1] + '">'
						+ '<div style="display:table-cell;min-width:70px;max-width:70px;border-width:2px;border-color:black"><b>' + item[1] + '</b></div>'
						+ '<div style="display:table-cell;min-width:15px;max-width:15px"></div>'
						+ '<div style="display:table-cell;background:#ffffff">' + '</div></div>';
				}
			}
		}
		catch (e) {
			return '<div style="width:70;background:#ff2222" class="ac-sug" dname="' + item[1] + '" dchoice="' + item[2] + '" dval="' + search + '" dlink="' + item[0] + '">' + '<div display:inline-block; style="Width:60">' + '<div display:inline-block; style="background:#ffffdd">' + item[0] + '</div>' + item[1] + '</div>' + '<div display:inline-block; style="width:50">' + item[0] + '</div></div>';
		}
	},

	getLeftStaffs: function (searchText) {
		//input-available
		var jLen = bqlistbox.availableStaffs.length;
		var j = 0;
		var k = 0;
		leftStaffs = [];
		searchText = searchText.toLowerCase();
		var kLen = bqlistbox.includedStaffs.length;
		if (searchText.length >= 2) {
			for (j = 0; j < jLen; j++) {
				var aStaff = bqlistbox.availableStaffs[j];
				var sString = (aStaff[1] + '|' + aStaff[2]).toLowerCase();
				if( sString.indexOf(searchText) == -1 ) {
					continue;
				}
				var isFound = false;
				for (k = 0; k < kLen; k++) {
					if (bqlistbox.includedStaffs[k][1] === aStaff[1]) {
						isFound = true;
						break;
					}
				}
				if (isFound === false) {
					bqlistbox.leftStaffs.push(aStaff);
				}
			}
		}
		//else {
		//	for (j = 0; j < jLen; j++) {
		//		var aStaff = availableStaffs[j];
		//		var isFound = false;
		//		for (k = 0; k < kLen; k++) {
		//			if (includedStaffs[k][1] === aStaff[1]) {
		//				isFound = true;
		//				break;
		//			}
		//		}
		//		if (isFound === false) {
		//			leftStaffs.push(aStaff);
		//		}
		//	}
		//}
		if (bqlistbox.leftStaffs && bqlistbox.leftStaffs.length > 1) {
			bqlistbox.leftStaffs.sort(function (a, b) { return (a[1]).localeCompare(b[1]) });
		}

		var elem = document.getElementById('select-available');
		elem.innerHTML = '';
		for (var t = 0; t < bqlistbox.leftStaffs.length; t++) {
			var s = bqlistbox.renderSelectItem(bqlistbox.leftStaffs[t], searchText);
			var option = document.createElement('option');
			option.innerHTML = s;
			elem.add(option);
		}
	},

	selectedLeftStaffs: [],
	selectedIncludedStaffs: [],
	isShowMenu: false,

	filterMenu: function () {
		isShowMenu = true;
	},

	inputAvailableChanged: function(searchText) {
		// Future: Set timer for debounce
		bqlistbox.getLeftStaffs(searchText);
	},

	//function copy list left staffs selected to list right staffs
	copyRight: function () {
		if (leftStaffs) {
			//alert(selectedLeftStaffs[0].staff_id);
			//includedStaffs.push(selectedLeftStaffs[0]); //push one object		
			var iMax = bqlistbox.leftStaffs.length;
			for (var i = iMax; i--;) {
				if (bqlistbox.selectedLeftStaffs.includes(bqlistbox.leftStaffs[i])) {
					bqlistbox.leftStaffs.splice(i, 1); //remove element
				}
				//leftStaffs.pop(selectedLeftStaffs[i]);
			}
			bqlistbox.includedStaffs = bqlistbox.includedStaffs.concat(bqlistbox.selectedLeftStaffs); //copy many objects
			if (bqlistbox.includedStaffs && bqlistbox.includedStaffs.length > 1) {
				bqlistbox.includedStaffs.sort(function (a, b) { return (a[1]).localeCompare(b[1]) });
			}
		}
	},

	//function copy list right staffs selected to list left staffs
	copyLeft: function () {
		if (bqlistbox.includedStaffs) {
			for (var i = bqlistbox.includedStaffs.length; i--;) {
				if (bqlistbox.selectedIncludedStaffs.includes(bqlistbox.includedStaffs[i])) {
					bqlistbox.includedStaffs.splice(i, 1); //remove element
				}
			}
			bqlistbox.getLeftStaffs(searchText);
		}
	},

	copyRightAll: function () {
		bqlistbox.includedStaffs = bqlistbox.includedStaffs.concat(bqlistbox.leftStaffs); //copy many objects
		bqlistbox.leftStaffs.splice(0, bqlistbox.leftStaffs.length);
		if (bqlistbox.includedStaffs && bqlistbox.includedStaffs.length > 1) {
			bqlistbox.includedStaffs.sort(function (a, b) { return (a[1]).localeCompare(b[1]) });
		}
	},

	copyLeftAll: function () {
		bqlistbox.includedStaffs.splice(0, bqlistbox.includedStaffs.length);
		bqlistbox.getLeftStaffs(searchText);
	}
}