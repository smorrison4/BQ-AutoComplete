var bq6LayerUrl='';
var bq6Lst=acc6;
var bq6CtrlName='bq6-auto-complete';
(function () {
	if (typeof define==='function' && define.amd)
		define('bqAC', function () {return bqAC;});
	else if (typeof module!=='undefined' && module.exports)
		module.exports=bqAC;
	else if (bqAC) window.bqAC=bqAC;
	var btnOne=document.getElementById('bq6-auto-complete-btn');
	var ctrlVarOne=document.getElementById(bq6CtrlName);
	if (ctrlVarOne != null && btnOne != null) {
		if (bq6Lst && bq6Lst.length===1) {
			ctrlVarOne.value=bq6Lst[0][0]+' - '+bq6Lst[0][1];
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
var bq6Demo=new bqAC({
	selector:'#bq6-auto-complete',
	minChars:2,
	source:function (term, elem, suggester) {
		var s=bqMatcher(term, bq6Lst, elem);
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
		var elem=document.getElementById(bq6CtrlName);
		elem.bqItem={ctrl:'bq6', selectedItem:selectedItem, longName:selLongName, dataChoice:selDataChoice};
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
		//	selectedItem=bq6LayerUrl+selectedItem;
		//  top.location.assign(selectedItem);
		//}
		return elem;
	}
});
function bq6AutoCompleteFullOrCategories() {
	var elem=document.getElementById(bq6CtrlName);
	elem.bqItem={ctrl:'bq6', selectedItem:'', longName:'', dataChoice:''};
	if (bq6Lst.length < 41) {elem.value='* ';}
	else {elem.value=': ';}
	elem.focus();
	triggerEvent(elem, 'keyup');
}
function bq6AutoCompleteFullOnly() {
	var elem=document.getElementById(bq6CtrlName);
	elem.value='* ';
	elem.bqItem={ctrl:'bq6', selectedItem:'', longName:'', dataChoice:''};
	elem.focus();
	triggerEvent(elem, 'keyup');
}
