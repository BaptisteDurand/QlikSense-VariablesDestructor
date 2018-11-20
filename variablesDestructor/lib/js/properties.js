define([], function () {

    /**
     * Panel Properties
     * 
     */
    
    var prop = 
        {
            type : "items",
            component : "accordion",
            items: {
    
                appearance: {
                    //basics
                    uses: "settings",
    
                    //button name
                    items: {
                        button : {
                            ref: "buttonName",
                            label: "Overwrite Button Name",
                            type: "string"
                        }
                    }
                },
    
                //Extension Settings
                customSettings:{
                    component: "expandable-items",
                    label: "Settings",
    
                    items: {  
                        //Variables Settings : filter variables to delete
                        variableListSettings : {
                            type :"items",
                            label: "Variables Settings",
                            items:{
    
                                //Include Script Variables : 
                                scriptCheckBox :{
                                    type: "boolean",
                                    label: "Include Script Variables",
                                    ref: "variableListSettings.ScriptVar",
                                    defaultValue: false                                
                                },
    
                                //Include NoScript Variables : 
                                designCheckBox :{
                                    type: "boolean",
                                    label: "Include Design Variables",
                                    ref: "variableListSettings.DesignVar",
                                    defaultValue: false
                                },
    
                                //Delete All Y/N
                                defineVariables: {
                                    type: "boolean",
                                    component: "switch",
                                    label: "Specific variables",
                                    ref: "defineVariables",
                                    options: [{
                                        value: true,
                                        label: "Yes"
                                    }, {
                                        value: false,
                                        label: "No"
                                    }],
                                    defaultValue: false
                                },
    
                                //Search text? : 
                                searchString :{
                                    type: "boolean",
                                    label: "Search String",
                                    ref: "variableListSettings.searchString",
                                    defaultValue: false,
                                    show : function(data) {
                                        if (data.defineVariables) {
                                            return true;
                                        }
                                    }
                                },
    
                                //Text Box for variables string
                                varList: {
                                    ref: "variableListSettings.varList",
                                    label: "Overwrite Variable List",
                                    type: "string",
                                    defaultValue: "Variable list ( ; sep.) or Search String",
                                    show : function(data) {
                                        if (data.defineVariables) {
                                            return true;
                                        }
                                    }
                                },
    
                                //Help Text
                                listHelp:{
                                    label:"List variable names (delimitor is ; ) "
                                        +"or a search string (no * require)."
                                        +" Case Sensitive",
                                    component: "text",
                                    show : function(data) {
                                        if (data.defineVariables) {
                                            return true;
                                        }
                                    }
                                }
    
                            }
                            
                        }
                    }
                }
            }
        };
    
    return prop;
    });