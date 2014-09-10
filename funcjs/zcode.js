// JavaScript Document
//zcode
 
define(function(require, exports, module){
    "use strict";
    
    String.prototype.trim = function()
{
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
    
    function ZCode(wparam)
    {
     var m_zcode = null;
	
	 if(wparam == null)
	 return null;
	 
	 var code_Array = GetCodeArray(wparam);
	 function GetCodeArray(c)
	 {
		 var code_array = null;
		 if(c)
		 {
			 code_array = c.trim().split(',');
		 }
		 
		 return code_array;
	 };
	 
	 this.GetZCode = function()
	 {
		return code_Array;
	 };
	 
    };
    module.exports.ZCode = ZCode;
});


 