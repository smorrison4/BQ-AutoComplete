// This only does matching, not rendering
function bqMatcher0(term, lst, elem) {
	var selDataChoice=elem.bqItem.dataChoice;
	term=term.trim().toLowerCase();
	var s=[];	// suggestions
	var c='';	// category
	var subC='';
	var anyC='';
	if (typeof lst==='undefined') {return s;}
	var cnt=lst.length;
	var cntM1=cnt-1;
	var lfc='';
    var lvlIndex=-1;
    var termLen=term.length;
    var origLvl='-Lvl1';
	if (term.indexOf(':')!==-1) {
		for (i=0; i < cnt; i++) {
			if (lst[i][0].indexOf('-Lvl1') > -1) {s.push(lst[i]);}
		}
		if (s.length > 0) {	return s;}
		selDataChoice='';
		term='*';
	}
	else if (selDataChoice.indexOf('-Lvl')!==-1) {
		c='';
		var curLvl=parseInt(selDataChoice.slice(4, 5));
		var upperLvls='';
		for (var kk=curLvl - 1; kk > 0; kk--) {upperLvls=upperLvls+'-Lvl'+kk;}
		var lowerLvl='-Lvl'+(curLvl+1);
		var hasLowerLvl=false;
		termLen=term.length;
		for (i=0; i < cnt; i++) {
			if (lst[i][0]===selDataChoice) {
				var achk1=lst[i][1].toLowerCase();
				if (achk1!==term) {
					if (c!=='') {	return s;}
					continue;
				}
				if (i < cntM1 && lst[i+1][0]===lowerLvl) { hasLowerLvl=true;}
				c=term;
				continue;
			}
			if (c!=='') {
				if (lst[i][0].indexOf('-Lvl')!==-1) {
					if (upperLvls.indexOf(lst[i][0])!==-1 ) {
						return s;
					}
				}
				if (hasLowerLvl===false || lst[i][0]===lowerLvl) {
					s.push(lst[i]);
				}
			}
		}
		return s;
	}
    var isPush=false;
    if (term.indexOf('*')===-1) {
		termLen=term.length;
		var aLvl='-Lvl1';
		var nOper=term.indexOf('|');
		if (nOper===-1) nOper=term.indexOf('!');
		if (nOper===-1) nOper=term.indexOf('&');
		selDataChoice='';
		if (nOper===-1) {
			for (i=0; i < cnt; i++) {
            	if (lst[i][0].indexOf(aLvl) > -1) {
					// Changed this to have nested partial
					//newLvlNo=lst[i][0].slice(4, 5);
					//if (lastLvlNo < newLvlNo) {
						//c=c+('|'+lst[i][1]+'|'+lst[i][2]).toLowerCase();
					//}
					//else {
						c=('|'+lst[i][1]+'|'+lst[i][2]).toLowerCase();
					//}
					//lastLvlNo=newLvlNo;
						//if (lst[i][0]===origLvl) {
						//	continue;
						//}
            	}
            	var cc=lst[i][1].toLowerCase();
				lfc=lst[i][0].toLowerCase().slice(0, termLen); // lowerFirstCol
				chk=(lst[i][1]+'|'+lst[i][2]).toLowerCase()+c;
				//chk=(lst[i][1]+'|'+lst[i][2]+'|'+lst[i][3]).toLowerCase()+c;
				var lowerTerm=term.toLowerCase();
				if (~chk.indexOf(term) || lfc===term) {
					if (cc===term) {
						aLvl=lst[i][0];
						selDataChoice=aLvl;
						c=('|'+lst[i][1]+'|'+lst[i][2]).toLowerCase();
						continue;
					}
					if (lvlIndex!==-1) {
						s.push(lst[lvlIndex]);
						lvlIndex=-1;
					}
					s.push(lst[i]);
				}
				else {
					var lowerTerm=term.toLowerCase();
					if ((lowerTerm===lst[i][3].toLowerCase()) || (lowerTerm===lst[i][4].toLowerCase())) {
						s.push(lst[i]);
					}
				}
			}
			return s;
		}
		var oper=term.slice(nOper, nOper+1);
		var lastChar=term.slice(termLen - 1);
		if (nOper===termLen - 1) {
			return s;
		}
		var term1=term.slice(0, nOper).trim();
		var term2=term.slice(nOper+1).trim();
		var chk='';
		if (oper==='&') {
			for (i=0; i < cnt; i++) {
				if (lst[i][0].indexOf('-Lvl') > -1) {
					c=('|'+lst[i][1]+'|'+lst[i][2]).toLowerCase();
					lvlIndex=i;
					continue;
				}
				lfc=lst[i][0].toLowerCase().slice(0, termLen); // lowerFirstCol
				chk=(lst[i][1]+'|'+lst[i][2]).toLowerCase()+c;
				isPush=false;
				if (~chk.indexOf(term1) && ~chk.indexOf(term2)) {isPush=true;}
				else if (lfc===term1 && ~chk.indexOf(term2)) {isPush=true;}
				else if (lfc===term2 && ~chk.indexOf(term1)) {isPush=true;}
				if (isPush) {
					if (lvlIndex!==-1) {
						s.push(lst[lvlIndex]);
						lvlIndex=-1;
					}
					s.push(lst[i]);
				}
			}
		} // End if &
		if (oper==='!') {
			for (i=0; i < cnt; i++) {
				if (lst[i][0].indexOf('-Lvl') > -1) {
					c=('|'+lst[i][1]+'|'+lst[i][2]).toLowerCase();
					lvlIndex=i;
					continue;
				}
				lfc=lst[i][0].toLowerCase().slice(0, termLen); // lowerFirstCol
				chk=(lst[i][1]+'|'+lst[i][2]).toLowerCase()+c;
				isPush=false;
				if (~chk.indexOf(term1) && chk.indexOf(term2)===-1 && lfc!==term2) {isPush=true;}
				else if (lfc===term1 && chk.indexOf(term2)===-1 && lfc!==term2) {isPush=true;}
				if (isPush) {
					if (lvlIndex!==-1) {
						s.push(lst[lvlIndex]);
						lvlIndex=-1;
					}
					s.push(lst[i]);
				}
			}
		} // End if !
		if (oper==='|') {
			for (i=0; i < cnt; i++) {
				if (lst[i][0].indexOf('-Lvl') > -1) {
					c=('|'+lst[i][1]+'|'+lst[i][2]).toLowerCase();
					lvlIndex=i;
					continue;
				}
				lfc=lst[i][0].toLowerCase().slice(0, termLen); // lowerFirstCol
				chk=(lst[i][1]+'|'+lst[i][2]).toLowerCase()+c;
				isPush = false;
				if (~chk.indexOf(term1) || ~chk.indexOf(term2)) { isPush = true; }
				else if (lfc===term1 || lfc===term2) {isPush=true;}
				if (isPush) {
					if (lvlIndex!==-1) {
						s.push(lst[lvlIndex]);
						lvlIndex=-1;
					}
					s.push(lst[i]);
				}
			}
		} // End if |
		return s;
	}
	else {// not Lvl
    	for (i=0; i < cnt; i++) {
			if (lst[i][0].indexOf('-Lvl1') > -1) {
				s.push(lst[i]);
				continue;
			}
			s.push(lst[i]);
		}
		return s;
	}
}
function triggerEvent(el, type) {
	if ('createEvent' in document) {
		var e=document.createEvent('HTMLEvents');
		e.initEvent(type, false, true);
		el.dispatchEvent(e);
	} else {/* IE 8 */ var e2=document.createEventObject(); e2.eventType=type; el.fireEvent('on'+e.eventType, e2);}
}
