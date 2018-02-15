var bq5LayerUrl='';
var bq5Lst=acc5;
var bq5CtrlName='bq5-auto-complete';
(function () {
	if (typeof define==='function' && define.amd)
		define('bqAC', function (){return bqAC;});
	else if (typeof module!=='undefined' && module.exports)
		module.exports=bqAC;
	else if (bqAC) window.bqAC=bqAC;
	var btnOne=document.getElementById('bq5-auto-complete-btn');
	var ctrlVarOne=document.getElementById(bq5CtrlName);
	if (ctrlVarOne != null && btnOne != null) {
		if (bq5Lst && bq5Lst.length===1) {
			ctrlVarOne.value=bq5Lst[0][0]+' - '+bq5Lst[0][1];
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
var bq5Demo=new bqAC({
	selector: '#bq5-auto-complete',
	minChars: 2,
	source: function (term, elem, suggester) {
		var s=bqMatcher(term, bq5Lst, elem);
		this.suggesterCopy=suggester;
		suggester(s);
	},
	renderItem: function (item, search) {
		search=search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
		var re=new RegExp('('+search+')','gi');
		try {
			if (re!==null && item[1]!==null) {
				if (item[0].indexOf('-Lvl')===-1) {
					return '<div class="ac-sug" dname="'+item[1]+'" dchoice="'+item[2]+'" dval="'+search+'" dlink="'+item[0]+'">'
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
	onSelect: function (e, term, item) {
		var selectedItem=item.getAttribute('dlink');
		var selDataChoice=item.getAttribute('dchoice');
		var selLongName=item.getAttribute('dname');
		var elem=document.getElementById(bq5CtrlName);
		elem.bqItem ={ctrl: 'bq5', selectedItem: selectedItem, longName: selLongName, dataChoice: selDataChoice};
		var selection=selectedItem;
		if (selDataChoice.indexOf('-Lvl')!==-1) {
			elem.value=selection;
			elem.focus();
			triggerEvent(elem, 'keyup');
			return elem;
		}
		if (selectedItem != ''){selection=selLongName;}
		else selection=selLongName;
		elem.value=selection;
		//if (selectedItem.indexOf('http' != -1)) {
		//	selectedItem=bq5LayerUrl+selectedItem;
		//  top.location.assign(selectedItem);
		//}
		return elem;
	}
});
function bq5AutoCompleteFullOrCategories() {
	var elem=document.getElementById(bq5CtrlName);
	if (bq5Lst.length < 41) {elem.bqItem={ctrl:'bq5',selectedItem:'*',longName:'',dataChoice:''};}
	else {elem.bqItem={ctrl:'bq5',selectedItem:':',longName:'',dataChoice:''};}
	elem.value=elem.bqItem.selectedItem;
	elem.focus();
	triggerEvent(elem,'keyup');
}
function bq5AutoCompleteFullOnly() {
	var elem=document.getElementById(bq5CtrlName);
	elem.bqItem={ctrl:'bq5',selectedItem:'*',longName:'',dataChoice:''};
	elem.value=elem.bqItem.selectedItem;
	elem.focus();
	triggerEvent(elem,'keyup');
}
