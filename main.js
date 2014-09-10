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
    
        
     var $dialog, $SysIDS;
    function handleSofeBuilderDialog()
    {
       
        var template = Mustache.render(SofeBuilderTemplate,  {Strings: UIText});
        Dialogs.showModalDialogUsingTemplate(template).done(function(id){
            if(id === Dialogs.DIALOG_BTN_OK)
            {
                var cur_text = GetCurrentDocText();
                var ztCode = GetSysZcode();
 
                var builder = new ZBuilderManager(cur_text,ztCode);
                SetCurrentDocText(builder.GetResult());
                
            }
        });
        
        $dialog = $('.sofebuilder.instance');
        $SysIDS = $dialog.find("#SysIDS");
     
    };
             
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
    
    CommandManger.register(MENU_NAME, COMMAND_ID, handleSofeBuilderDialog);
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID, quickKeyPrefs.OpenSofeBuilder);
    
   
});