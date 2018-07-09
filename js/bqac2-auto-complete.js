var bqac2LayerUrl='';
var bqac2LstOffice=acc2;
var bqac2Lst=bqac2LstOffice;
var bqac2LstRole=[];
var bqac2LstBU=[];
var bqac2CtrlName='bqac2-auto-complete';
var bqac2OldByAttrib='Office';
var bqac2ByAttrib='Office';
(function () {
	if (typeof define==='function' && define.amd)
		define('bqACFcn', function () { return bqACFcn;});
	else if (typeof module!=='undefined' && module.exports)
		module.exports=bqACFcn;
	else if (bqACFcn) window.bqACFcn=bqACFcn;
	var btnOne=document.getElementById('bqac2-auto-complete-btn');
	var ctrlVarOne=document.getElementById(bqac2CtrlName);

	var roleCategories=[];
	var buCategories=[];
	var jMax=bqac2LstOffice.length;
	var newRoleCat=null;
	var j=0;
	var k=0;
	var k2=0;
	for (j == 0; j < jMax; j++) {
		if (bqac2LstOffice[j][0].indexOf('-Lvl') !== -1) {
			continue;
		}
		if (bqac2LstOffice[j][0].indexOf('-Lvlback') !== -1) {
			continue;
		}
		var roleCat = bqac2LstOffice[j][3];
		var roleMax=roleCategories.length;
		var roleFound=-1;
		for (k=0; k < roleMax; k++) {
			if (roleCategories[k][0]===roleCat) {
				roleFound=k;
				newRoleCat=roleCategories[k];
				break;
			}
		}
		if (roleFound===-1) {
			var newRoleCat=[roleCat, []];
			roleCategories.push(newRoleCat);
		}
		newRoleCat[1].push(bqac2LstOffice[j]);

		var buCat=bqac2LstOffice[j][4];
		var buMax=buCategories.length;
		var buFound=-1;
		for (k=0; k < buMax; k++) {
			if (buCategories[k][0]===buCat) {
				buFound=k;
				newBuCat=buCategories[k];
				break;
			}
		}
		if (buFound===-1) {
			var newBuCat=[buCat, []];
			buCategories.push(newBuCat);
		}
		newBuCat[1].push(bqac2LstOffice[j]);
	}

	roleMax=roleCategories.length;
	for (k=0; k < roleMax; k++) {
		var k2Max=roleCategories[k][1].length;
		var newEntry=['-Lvl1',roleCategories[k][0],'',''];
		bqac2LstRole.push(newEntry);
		for( k2=0; k2 < k2Max; k2++ ) { bqac2LstRole.push(roleCategories[k][1][k2]);}
	}

	buMax=buCategories.length;
	for (k=0; k < buMax; k++) {
		var k2Max=buCategories[k][1].length;
		var newEntry=['-Lvl1', buCategories[k][0], '', ''];
		bqac2LstBU.push(newEntry);
		for (k2=0; k2 < k2Max; k2++) { bqac2LstBU.push(buCategories[k][1][k2]);}
	}

	if (ctrlVarOne != null && btnOne != null) {
		if (bqac2LstOffice && bqac2LstOffice.length===1) {
			ctrlVarOne.value=bqac2LstOffice[0][0]+' - '+bqac2LstOffice[0][1];
			ctrlVarOne.disabled=true;
			ctrlVarOne.style.opacity=0.5;
			btnOne.disabled=true;
		}
		else {
			ctrlVarOne.disabled=false;
			ctrlVarOne.style.opacity=1.0;
			btnOne.disabled=false;
		}
	}
	bqac2OldByAttrib=bqac2ByAttrib;
	if (bqac2ByAttrib==='Office') { bqac2Lst=bqac2LstOffice;}
	else if (bqac2ByAttrib==='Role') { bqac2Lst=bqac2LstRole;}
	else { bqac2LstToUSe=bqac2LstBU;}
})();
var bqac2Demo=new bqACFcn({
	selector:'#bqac2-auto-complete',
	minChars:2,
	source: function (term, elem, suggester) {
		var s;
		if (bqac2ByAttrib==='Office') {

			if (bqac2LstOffice[0][3] != undefined) {
				s=bqMatcher0(term, bqac2LstOffice, elem);
			}
			else {
				s=bqMatcher(term, bqac2LstOffice, elem);
			}
			this.suggesterCopy=suggester;
			suggester(s);
			return;
		}
		if (bqac2ByAttrib==='BU') {
			s=bqMatcher(term, bqac2LstBU, elem);
			this.suggesterCopy=suggester;
			suggester(s);
			return;
		}
		s=bqMatcher(term, bqac2LstRole, elem);
		this.suggesterCopy=suggester;
		suggester(s);
		return;

	},
	renderItem: function (item, search) {
		search=search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
		var re=new RegExp('('+search+')', 'gi');
		if (bqac2ByAttrib==='Office') {
			try {
				if (re!==null && item[1]!==null) {
					if (item[0].indexOf('-Lvl') === -1) {
						if (item[3] != undefined) {
							return '<div class="ac-sug" dname="'+item[1]+'" dchoice="'+item[2]+'" dval="'+search+'" dlink="'+item[0]+'">'
								+ '<div style="display:table-cell;min-width:15px;max-width:15px"></div>'
								+ '<div style="display:table-cell;min-width:370px;solid;border-width:1px;border-color:gray;background:#ffffff">'+item[1].replace(re,"<b>$1</b>")+'</div>'
							+ '<div style="display:table-cell;min-width:50px;solid;border-width:1px;border-color:gray;background:#ffffff">&nbsp;&nbsp;&nbsp;'+item[3]+'</div></div>';
						}
						else {
							return '<div class="ac-sug" dname="'+item[1]+'" dchoice="'+item[2]+'" dval="'+search+'" dlink="'+item[0]+'">'
								+ '<div style="display:table-cell;min-width:15px;max-width:15px"></div>'
								+ '<div style="display:table-cell;min-width:370px;solid;border-width:1px;border-color:gray;background:#ffffff">'+item[1].replace(re,"<b>$1</b>")+'</div></div>';
						}
					}
					else {
						if (item[0].indexOf('back') !== -1) {
							return '';
						}
						return '<div class="ac-sug" dname="" dchoice="' + item[0] + '" dval="' + item[0] + '"' + search + '" dlink="' + item[1] + '">'
							+ '<div style="display:table-cell;min-width:490px;max-width:490px;background:#ffddcc;border-width:2px;border-color:black"><b>&nbsp;'+item[1]+'</b></div>'
							+ '<div style="display:table-cell;min-width:15px;max-width:15px;background:#ffddcc;"></div>'
							+ '<div style="display:table-cell;background:#ffddcc">'+'</div></div>';
					}
				}
			}
			catch (e) {
				return '<div style="width:70;background:#ff2222" class="ac-sug" dname="'+item[1]+'" dchoice="'+item[2]+'" dval="'+search+'" dlink="'+item[0]+'">'+'<div display:inline-block; style="Width:60">'+'<div display:inline-block; style="background:#ffffdd">'+item[0]+'</div>'+item[1]+'</div>'+'<div display:inline-block; style="width:50">'+item[0]+'</div></div>';
			}
			return;
		}
		// By Role or BU
		try {
			if (re!==null && item[1]!==null) {
				if (item[0].indexOf('-Lvl') === -1) {
					if (item[0].indexOf('-Lvlback') !== -1) {
						return;
					}
					return '<div class="ac-sug" dname="'+item[1]+'" dchoice="'+item[2]+'" dval="'+search+'" dlink="'+item[0]+'">'
						//+ '<div style="display:table-cell;min-width:70px;max-width:70px;border-width:2px;border-color:black">'+item[0]+'</div>'
						+ '<div style="display:table-cell;min-width:25px;max-width:25px"></div>'
						+ '<div style="display:table-cell;background:#ffffff">'+item[1].replace(re,"<b>$1</b>")+'</div></div>';
				}
				else {
					return '<div class="ac-sug" dname="" dchoice="'+item[0]+'" dval="'+item[0]+'"'+search+'" dlink="'+item[1]+'">'
						+ '<div style="display:table-cell;min-width:70px;max-width:70px;border-width:2px;border-color:black"><b>'+item[1]+'</b></div>'
						+ '<div style="display:table-cell;min-width:25px;max-width:25px"></div>'
						+ '<div style="display:table-cell;background:#ffffff">'+'</div></div>';
				}
			}
		}
		catch (e) {
			return '<div style="width:70;background:#ff2222" class="ac-sug" dname="'+item[1]+'" dchoice="'+item[2]+'" dval="'+search+'" dlink="'+item[0]+'">'+'<div display:inline-block; style="Width:60">'+'<div display:inline-block; style="background:#ffffdd">'+item[0]+'</div>'+item[1]+'</div>'+'<div display:inline-block; style="width:50">'+item[0]+'</div></div>';
		}
	},
	onSelect: function (e, term, item) {
		var selectedItem=item.getAttribute('dlink');
		var selDataChoice=item.getAttribute('dchoice');
		var selLongName=item.getAttribute('dname');
		var elem=document.getElementById(bqac2CtrlName);
		elem.bqItem={ ctrl: 'bqac2', selectedItem: selectedItem, longName: selLongName, dataChoice: selDataChoice};
		var selection=selectedItem;
		if (bqac2ByAttrib==='Office' && selDataChoice.indexOf('-Lvl')!==-1) {
			elem.value=selection;
			elem.focus();
			triggerEvent(elem, 'keyup');
			return elem;
		}
		else if (bqac2ByAttrib === 'Office' && selDataChoice.indexOf('-Lvlback') !== -1) {
			return;
		}
		else if (bqac2ByAttrib !== 'Office' && selDataChoice.indexOf('-Lvl') !== -1) {
			elem.value = selection;
			elem.focus();
			triggerEvent(elem, 'keyup');
			return elem;
		}
		else if (bqac2ByAttrib !== 'Office' && selDataChoice.indexOf('-Lvlback') !== -1) {
			return;
		}
		if (selectedItem != '') { selection=selLongName;}
		else selection=selLongName;
		elem.value=selection;
		//if (selectedItem.indexOf('http' != -1)) {
		//	selectedItem=bqac2LayerUrl+selectedItem;
		//  top.location.assign(selectedItem);
		//}
		return elem;
	}
});
function bqac2AutoCompleteCategoryList() {
	var elem=document.getElementById(bqac2CtrlName);
	elem.bqItem={ ctrl: 'bqac2', selectedItem: '', longName: '', dataChoice: ''};
	elem.value='';
	elem.focus();
	bqac2OldByAttrib=bqac2ByAttrib;
	if (bqac2ByAttrib==='Office') {
		bqac2ByAttrib='Role';
		bqac2Lst=bqac2LstRole;
	}
	else if (bqac2ByAttrib==='Role') {
		bqac2ByAttrib='BU';
		bqac2Lst=bqac2LstBU;
	}
	else {
		bqac2ByAttrib='Office';
		bqac2Lst=bqac2LstOffice;
	}
	bqac2AutoCompleteFullOrCategories();
}
function bqac2AutoCompleteFullOrCategories() {
	var elem=document.getElementById(bqac2CtrlName);
	if (bqac2Lst.length < 41) { elem.bqItem = { ctrl: 'bqac2', selectedItem: '*', longName: '', dataChoice: '' }; }
	else {elem.bqItem={ctrl:'bqac2',selectedItem:':',longName:'',dataChoice:''};}
	elem.value=elem.bqItem.selectedItem;
	elem.focus();
	triggerEvent(elem,'keyup');
}
function bqac2AutoCompleteFullOnly() {
	var elem=document.getElementById(bqac2CtrlName);
	elem.bqItem={ctrl:'bqac2',selectedItem:'*',longName:'',dataChoice:''};
	elem.value=elem.bqItem.selectedItem;
	elem.focus();
	triggerEvent(elem,'keyup');
}
function setbqac2ByItem(item) {
	var selectedItem = item[0];
	var selLongName = item[1];
	var selDataChoice = item[2];
	var elem = document.getElementById(bqac2CtrlName);
	elem.bqItem = { ctrl: 'bqac2', selectedItem: selectedItem, longName: selLongName, dataChoice: selDataChoice };
	if (item[0].indexOf('-Lvl') !== -1 || item[0] === '') {
		elem.value = item[1];
		elem.focus();
		triggerEvent(elem, 'keyup');
		return elem;
	}
	if (item[0].indexOf('-Lvlback') !== -1 || item[0] === '') {
		return;
	}
	elem.value = item[0] + ' - ' + item[1];
}
function setbqac2ByEntry(entry) {
	var elem = document.getElementById(bqac2CtrlName);
	elem.bqItem = { ctrl: 'bqac2', selectedItem: '', longName: '', dataChoice: '' };
	elem.value = entry;
	triggerEvent(elem, 'keyup');
}
function setbqac2ByIndex(index) {
	if (index < 0 || index >= bqac2Lst.length) { return; }
	var item = bqac2Lst[index];
	setbqac2ByItem(item);
}
function setbqac2ByKey(key) {
	var jMax = bqac2Lst.length;
	var item = null;
	for (var j = 0; j < jMax; j++) {
		if (bqac2Lst[j][0] === key) {
			setbqac2ByIndex(j);
			return;
		}
	}
}
