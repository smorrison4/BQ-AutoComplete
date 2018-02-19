var bqac3LayerUrl='';
var bqac3Lst=acc3;
var bqac3CtrlName='bqac3-auto-complete';
(function () {
	if (typeof define==='function' && define.amd)
		define('bqACFcn', function () {return bqACFcn;});
	else if (typeof module!=='undefined' && module.exports)
		module.exports=bqACFcn;
	else if (bqACFcn) window.bqACFcn=bqACFcn;
	var btnOne=document.getElementById('bqac3-auto-complete-btn');
	var ctrlVarOne=document.getElementById(bqac3CtrlName);
	if (ctrlVarOne != null && btnOne != null) {
		if (bqac3Lst && bqac3Lst.length===1) {
			ctrlVarOne.value=bqac3Lst[0][0]+' - '+bqac3Lst[0][1];
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
})();
var bqac3Demo=new bqACFcn({
	selector:'#bqac3-auto-complete',
	minChars:2,
	source:function (term, elem, suggester) {
		var s=bqMatcher(term, bqac3Lst, elem);
		this.suggesterCopy=suggester;
		suggester(s);
	},
	renderItem:function (item, search) {
		search=search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
		var re=new RegExp('('+search+')', 'gi');
		try {
			if (re!==null && item[1]!==null) {
				if (item[0].indexOf('-Lvl')===-1) {
					return '<div class="ac-sug" dname="'+item[1]+'" dchoice="'+item[2]+'" dval="'+search+'" dlink="'+item[0]+'">'
						+'<div style="display:table-cell;min-width:70px;max-width:70px;border-width:2px;border-color:black">'+item[0]+'</div>'
						+'<div style="display:table-cell;min-width:15px;max-width:15px"></div>'
						+'<div style="display:table-cell;background:#ffffff">'+item[1].replace(re,"<b>$1</b>")+'</div></div>';
				}
				else {
					return '<div class="ac-sug" dname="" dchoice="'+item[0]+'" dval="'+item[0]+'"'+search+'" dlink="'+item[1]+'">'
						+'<div style="display:table-cell;min-width:70px;max-width:70px;border-width:2px;border-color:black"><b>'+item[1]+'</b></div>'
						+'<div style="display:table-cell;min-width:15px;max-width:15px"></div>'
						+'<div style="display:table-cell;background:#ffffff">'+'</div></div>';
				}
			}
		}
		catch (e) {
			return '<div style="width:70;background:#ff2222" class="ac-sug" dname="'+item[1]+'" dchoice="'+item[2]+'" dval="'+search+'" dlink="'+item[0]+'">'+'<div display:inline-block; style="Width:60">'+'<div display:inline-block; style="background:#ffffdd">'+item[0]+'</div>'+item[1]+'</div>'+'<div display:inline-block; style="width:50">'+item[0]+'</div></div>';
		}
	},
	onSelect:function (e, term, item) {
		var selectedItem=item.getAttribute('dlink');
		var selDataChoice=item.getAttribute('dchoice');
		var selLongName=item.getAttribute('dname');
		var elem=document.getElementById(bqac3CtrlName);
		elem.bqItem={ctrl:'bqac3', selectedItem:selectedItem, longName:selLongName, dataChoice:selDataChoice};
		var selection=selectedItem;
		if (selDataChoice.indexOf('-Lvl')!==-1) {
			elem.value=selection;
			elem.focus();
			triggerEvent(elem, 'keyup');
			return elem;
		}
		if (selectedItem != '') {selection=selectedItem+' - '+selLongName;}
		else selection=selLongName;
		elem.value=selection;
		//if (selectedItem.indexOf('http' != -1)) {
		//	selectedItem=bqac3LayerUrl+selectedItem;
		//  top.location.assign(selectedItem);
		//}
		return elem;
	}
});
function bqac3AutoCompleteFullOrCategories() {
	var elem=document.getElementById(bqac3CtrlName);
	if (bqac3Lst.length < 41) {elem.bqItem={ctrl:'bqac3',selectedItem:'*',longName:'',dataChoice:''};}
	else {elem.bqItem={ctrl:'bqac3',selectedItem:':',longName:'',dataChoice:''};}
	elem.value=elem.bqItem.selectedItem;
	elem.focus();
	triggerEvent(elem,'keyup');
}
function bqac3AutoCompleteFullOnly() {
	var elem=document.getElementById(bqac3CtrlName);
	elem.bqItem={ctrl:'bqac3',selectedItem:'*',longName:'',dataChoice:''};
	elem.value=elem.bqItem.selectedItem;
	elem.focus();
	triggerEvent(elem,'keyup');
}
function setBq3ByItem(item) {
	var selectedItem = item[0];
	var selLongName = item[1];
	var selDataChoice = item[2];
	var elem = document.getElementById(Bq3CtrlName);
	elem.bqItem = { ctrl: 'Bq3', selectedItem: selectedItem, longName: selLongName, dataChoice: selDataChoice };
	elem.value = item[0] + ' - ' + item[1];
	elem.focus();
	triggerEvent(elem, 'keyup');
}
function setBq3ByIndex(index) {
	if (index < 0 || index >= Bq3Lst.length) { return; }
	var item = Bq3Lst[index];
	setBq3ByItem(item);
}
function setBq3ByKey(key) {
	var jMax = Bq3Lst.length;
	var item = null;
	for (var j = 0; j < jMax; j++) {
		if (Bq3Lst[j][0] === key) {
			setBq3ByIndex(j);
			return;
		}
	}
}
