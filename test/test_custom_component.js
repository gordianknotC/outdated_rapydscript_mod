comp_tags = [ "square", "custombutton" ];

attrs = jQuery("body").comments()[0].getElementsByTagName("square")[0].attributes;

var _$rapyd$_Iter0 = dict.items(attrs);
for (var _$rapyd$_Index0 = 0; _$rapyd$_Index0 < _$rapyd$_Iter0.length; _$rapyd$_Index0++) {
    _$rapyd$_Unpack = _$rapyd$_Iter0[_$rapyd$_Index0];
    k = _$rapyd$_Unpack[0];
    v = _$rapyd$_Unpack[1];
    console.log(k, v);
}

var _$rapyd$_Iter1 = attrs;
for (var _$rapyd$_Index1 = 0; _$rapyd$_Index1 < _$rapyd$_Iter1.length; _$rapyd$_Index1++) {
    node = _$rapyd$_Iter1[_$rapyd$_Index1];
    console.log(node.nodeName, node.nodeValue);
}

comp_list = [];

var _$rapyd$_Iter2 = comp_tags;
for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
    comp_tag = _$rapyd$_Iter2[_$rapyd$_Index2];
    comps = jQuery("body").comments()[0].getElementsByTagName(comp_tag);
    var _$rapyd$_Iter3 = comps;
    for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
        comp = _$rapyd$_Iter3[_$rapyd$_Index3];
        comp_list.append(comp);
    }
}

console.log(comp_list);

var _$rapyd$_Iter4 = comp_list;
for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
    comp = _$rapyd$_Iter4[_$rapyd$_Index4];
    dom = {};
    var _$rapyd$_Iter5 = comp.attributes;
    for (var _$rapyd$_Index5 = 0; _$rapyd$_Index5 < _$rapyd$_Iter5.length; _$rapyd$_Index5++) {
        node = _$rapyd$_Iter5[_$rapyd$_Index5];
        dom[node.nodeName] = node.nodeValue;
    }
    console.log(dom);
}