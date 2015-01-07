// JavaScript Document
//zcode
 
define(function(require, exports, module){
    "use strict";
    
    String.prototype.trim = function()
{
	return this.replace(/(^\s*)|(\s*$)/g, "").replace("，", ",");
};
    
    function ZCode(wparam)
    {
     var m_zcode = null;
	
    function GetCodeArray(c)
	 {
		 var code_array = null;
		 if(c)
		 {
			 code_array = c.trim().split(',');
		 }
		 
		 return code_array;
	 };
	 
        var code_Array = null;
	 if(wparam != null){
	    code_Array = GetCodeArray(wparam);
     }

	
	 this.GetZCode = function()
	 {
		return code_Array;
	 };
	 
	 this.getTxt = function(txt, ids){
		 
		 var _matchs = txt.match(/[^()\D0](\d+[_,])/g);
		 	
		 if(_matchs == null){
			 alert("此专题没有sku id");
			 return "";
		 }
		 
		 _matchs  = _matchs.join(",").replace(/[_]/g,"").replace(/^,*|,*$/g,"").match(/(\d+)(?!.*\1)/g).join(",");
		
		 ids 	  = ids.sort().reverse().join(",").match(/(\d+)(?!.*\1)/g);
		 var _newID = [], _cur = 0;
		 for(var i = 0, len = ids.length; i < len ; i++){
			  if(_matchs.match(ids[i])){
				  _newID[_cur] = ids[i];
				  _cur++;
			  }
		  }
		 
		 return _newID;
	 };
	 
	 this.Recheck = function(ids){
		 return ids != null ? ids.sort().reverse().join(",").trim().match(/(\d+)(?!.*\1)/g).join(",") : null;
	 };
	 
    };
    module.exports.ZCode = ZCode;
});


 