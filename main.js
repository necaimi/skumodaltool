/*2014/7/20 2:32 V1.0.0*/

define(function(require, exports, module){
    'use strict';
    
    var CommandManger = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        Commands = brackets.getModule("command/Commands"),
        NativeApp = brackets.getModule("utils/NativeApp"),
        FileUtils   = brackets.getModule("file/FileUtils"),
        FileSystem = brackets.getModule("filesystem/Directory"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Dialogs = brackets.getModule("widgets/Dialogs"),
        Strings = brackets.getModule("strings"),
        MENU_NAME = "SofeBuilder",
        COMMAND_ID = "sofeBuilder.runTool",
        
        UIText  = JSON.parse(require("text!uitext.json")),
        quickKeyPrefs = JSON.parse(require("text!keyboard.json")),
        
        ZCodeManager = require("funcjs/zcode").ZCode,
        ZBuilderManager = require("funcjs/zbuilder").CodeBuilder,
        SofeBuilderTemplate = require("text!htmlContent/sofebuilder-dialog.html");
    
        
     var $dialog, $SysIDS, $btfind, $btcheck, $dtips, $repbt;
    function handleSofeBuilderDialog()
    {
       
        var template = Mustache.render(SofeBuilderTemplate,  {Strings: UIText});
        
        Dialogs.showModalDialogUsingTemplate(template).done(function(id){
            if(id === Dialogs.DIALOG_BTN_OK)
            {
                var cur_text = GetCurrentDocText();
                var ztCode = GetSysZcode();
 
                var builder = new ZBuilderManager(cur_text,ztCode);
                SetCurrentDocText(standardClosure(builder.GetResult(), "img").replace("onclick", "onClick"));
            }
 
        });
        
        $dialog = $('.sofebuilder.instance');
        $SysIDS = $dialog.find("#SysIDS");
        $btfind = $dialog.find("[data-button-id='find']");
        $btcheck= $dialog.find("[data-button-id='check']");
        $dtips  = $dialog.find("#dtips");
        $repbt  = $dialog.find("[data-button-id='ok']");
        $btfind.on("click", function(e){
            if(e.button == 0){
             var cur_text = GetCurrentDocText(),
                    arrys = GetSysCodeByZt(cur_text);   ///ids string;
                    SetSysZcode(arrys.join(","));
            }
        }).on("mouseenter", function(e){
            
            tipani(function(){$dtips.text(UIText.Find.tips);});
        });
        
        $btcheck.on("click", function(e){
            if(e.button == 0){
             var _zcode = GetSysZcode();
                SetSysZcode(_zcode.Recheck(_zcode.GetZCode()));
            }
        }).on("mouseenter", function(e){
            
             tipani(function(){ $dtips.text(UIText.Check.tips);});
        });
        
        $repbt.on("mouseenter", function(e){
              
              tipani(function(){$dtips.text(UIText.Ok.tips);});
        });
        
        
    };
    
    function tipani(cfn){
        $dtips.hide();
        cfn();
        $dtips.stop(true, false).fadeTo(500, 1.0);
    }
             
     var currentDoc = null;
    
    function GetCurrentDocText()
    {
        currentDoc =  DocumentManager.getCurrentDocument();
        return currentDoc.getText();
    };
    
    function SetCurrentDocText(s)
    {
        currentDoc.setText(s);
    };
    
    function GetSysZcode()
    {
      
        var array_ids = $SysIDS[0].value;
        var ztCode = new ZCodeManager(array_ids);
        return ztCode;
    };
    
    function SetSysZcode(ids){
        $SysIDS.val(ids);
    };
    
    function GetSysCodeByZt(txt){
        var ztCodeid = GetSysZcode();
        var ztCode = new ZCodeManager();
        return ztCode.getTxt(txt, ztCodeid.GetZCode());
    };
    
    CommandManger.register(MENU_NAME, COMMAND_ID, handleSofeBuilderDialog);
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID, quickKeyPrefs.OpenSofeBuilder);
    
   
});