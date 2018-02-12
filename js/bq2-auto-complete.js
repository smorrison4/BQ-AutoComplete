var bq2LayerUrl='';
var bq2LstOffice=acc2;
var bq2LstToUse=bq2LstOffice;
var bq2LstRole=[];
var bq2LstBU=[];
var bq2CtrlName='bq2-auto-complete';
var bq2OldByAttrib='Office';
var bq2ByAttrib='Office';
(function () {
	if (typeof define==='function' && define.amd)
		define('bqAC', function () { return bqAC;});
	else if (typeof module!=='undefined' && module.exports)
		module.exports=bqAC;
	else if (bqAC) window.bqAC=bqAC;
	var btnOne=document.getElementById('bq2-auto-complete-btn');
	var ctrlVarOne=document.getElementById(bq2CtrlName);

	var roleCategories=[];
	var buCategories=[];
	var jMax=bq2LstOffice.length;
	var newRoleCat=null;
	var j=0;
	var k=0;
	var k2=0;
	for (j == 0; j < jMax; j++) {
		if (bq2LstOffice[j][0].indexOf('-Lvl') != -1) {
			continue;
		}
		var roleCat=bq2LstOffice[j][3];
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
		newRoleCat[1].push(bq2LstOffice[j]);

		var buCat=bq2LstOffice[j][4];
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
		newBuCat[1].push(bq2LstOffice[j]);
	}

	roleMax=roleCategories.length;
	for (k=0; k < roleMax; k++) {
		var k2Max=roleCategories[k][1].length;
		var newEntry=['-Lvl1',roleCategories[k][0],'',''];
		bq2LstRole.push(newEntry);
		for( k2=0; k2 < k2Max; k2++ ) { bq2LstRole.push(roleCategories[k][1][k2]);}
	}

	buMax=buCategories.length;
	for (k=0; k < buMax; k++) {
		var k2Max=buCategories[k][1].length;
		var newEntry=['-Lvl1', buCategories[k][0], '', ''];
		bq2LstBU.push(newEntry);
		for (k2=0; k2 < k2Max; k2++) { bq2LstBU.push(buCategories[k][1][k2]);}
	}

	if (ctrlVarOne != null && btnOne != null) {
		if (bq2LstOffice && bq2LstOffice.length===1) {
			ctrlVarOne.value=bq2LstOffice[0][0]+' - '+bq2LstOffice[0][1];
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
	bq2OldByAttrib=bq2ByAttrib;
	if (bq2ByAttrib==='Office') { bq2LstToUse=bq2LstOffice;}
	else if (bq2ByAttrib==='Role') { bq2LstToUse=bq2LstRole;}
	else { bq2LstToUSe=bq2LstBU;}
})();
var bq2Demo=new bqAC({
	selector: '#bq2-auto-complete',
	minChars: 2,
	source: function (term, elem, suggester) {
		var s;
		if (bq2ByAttrib==='Office') {

			if (bq2LstOffice[0][3] != undefined) {
				s=bqMatcher0(term, bq2LstOffice, elem);
			}
			else {
				s=bqMatcher(term, bq2LstOffice, elem);
			}
			this.suggesterCopy=suggester;
			suggester(s);
			return;
		}
		if (bq2ByAttrib==='BU') {
			s=bqMatcher(term, bq2LstBU, elem);
			this.suggesterCopy=suggester;
			suggester(s);
			return;
		}
		s=bqMatcher(term, bq2LstRole, elem);
		this.suggesterCopy=suggester;
		suggester(s);
		return;

	},
	renderItem: function (item, search) {
		search=search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
		var re=new RegExp('('+search+')', 'gi');
		if (bq2ByAttrib==='Office') {
			try {
				if (re!==null && item[1]!==null) {
					if (item[0].indexOf('-Lvl')===-1) {
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
						return '<div class="ac-sug" dname="" dchoice="'+item[0]+'" dval="'+item[0]+'"'+search+'" dlink="'+item[1]+'">'
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
				if (item[0].indexOf('-Lvl')===-1) {
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
		var elem=document.getElementById(bq2CtrlName);
		elem.bqItem={ ctrl: 'bq2', selectedItem: selectedItem, longName: selLongName, dataChoice: selDataChoice};
		var selection=selectedItem;
		if (bq2ByAttrib==='Office' && selDataChoice.indexOf('-Lvl')!==-1) {
			elem.value=selection;
			elem.focus();
			triggerEvent(elem, 'keyup');
			return elem;
		}
		else if (bq2ByAttrib!=='Office' && selDataChoice.indexOf('-Lvl')!==-1) {
			elem.value=selection;
			elem.focus();
			triggerEvent(elem, 'keyup');
			return elem;
		}
		if (selectedItem != '') { selection=selLongName;}
		else selection=selLongName;
		elem.value=selection;
		//if (selectedItem.indexOf('http' != -1)) {
		//	selectedItem=bq2LayerUrl+selectedItem;
		//  top.location.assign(selectedItem);
		//}
		return elem;
	}
});
function bq2AutoCompleteCategoryList() {
	var elem=document.getElementById(bq2CtrlName);
	elem.bqItem={ ctrl: 'bq2', selectedItem: '', longName: '', dataChoice: ''};
	elem.value='';
	elem.focus();
	bq2OldByAttrib=bq2ByAttrib;
	if (bq2ByAttrib==='Office') {
		bq2ByAttrib='Role';
		bq2LstToUse=bq2LstRole;
	}
	else if (bq2ByAttrib==='Role') {
		bq2ByAttrib='BU';
		bq2LstToUse=bq2LstBU;
	}
	else {
		bq2ByAttrib='Office';
		bq2LstToUse=bq2LstOffice;
	}
	bq2AutoCompleteFullOrCategories();
}
function bq2AutoCompleteFullOrCategories() {
	var elem=document.getElementById(bq2CtrlName);
	if (bq2LstToUse.length < 41) { elem.bqItem = { ctrl: 'bq2', selectedItem: '* ', longName: '', dataChoice: '' }; }
	else {elem.bqItem={ctrl:'bq2',selectedItem:': ',longName:'',dataChoice:''};}
	elem.value=elem.bqItem.selectedItem;
	elem.focus();
	triggerEvent(elem,'keyup');
}
function bq2AutoCompleteFullOnly() {
	var elem=document.getElementById(bq2CtrlName);
	elem.bqItem={ctrl:'bq2',selectedItem:'* ',longName:'',dataChoice:''};
	elem.value=elem.bqItem.selectedItem;
	elem.focus();
	triggerEvent(elem,'keyup');
}
function btnMoveRight() {
}
function btnMoveAllRight() {
}
function btnMoveLeft() {
}
function btnMoveAllLeft() {
}
