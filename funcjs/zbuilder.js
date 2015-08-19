// JavaScript Document
// [SysNo_ProductLink] [NSysNo_Src] [SysNo_ProductName] [SysNo_CurrentPrice] [SysNo_OldPrice]...


function standardClosure(src, ele){
    
    var _regx = new RegExp("<"+ ele +"+.+['\"\s]>", "g");
    var _poss = src.match(_regx);
    if(_poss.length != 0){
        
        for(var itr = 0, _len = _poss.length; itr < _len; itr++){
            var _des = _poss[itr].replace(">", "/>");
            src = src.replace(_poss[itr], _des);
        }
    }
 
    return src;
}


define(function(require, exports, module){
    "use strict";
   
    function CodeBuilder(src, zt)
    {
        	var m_src = src;
	var baseDom = $("<div></div>");
	var m_srcobj = baseDom.html(src);
	var zcode_array = null;
	
	function Building(src, zt)
	{
	if(typeof(zt) != "object")
	return;

        
	var targetsobj = m_srcobj.find('.zcode');
	
	if(targetsobj.length == 0)
	return;
	
    
	   zcode_array =  zt.GetZCode();
		
		targetsobj.each(function(index, element) {
           
			SetSysNo(index, $(element));
        });
	
		
	};
	
	this.GetResult = function()
	{
		return m_srcobj.html();
	};
	
	function SetSysNo(i, e)
	{
		if(typeof(zcode_array[i]) == "undefined")
		return;
		
		var cur_Target_text = e.html();
		cur_Target_text = cur_Target_text.replace(/SysNo(?!_)/g, zcode_array[i]);
		e.html(cur_Target_text);
		
	};
	
	Building(src, zt);

    };
    module.exports.CodeBuilder = CodeBuilder;
});
