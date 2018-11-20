/**
 * OnClick : list variables to destroy and destroy them
 * @param {*} element 
 * @param {*} app 
 * @param {*} layout 
 * @param {*} qix 
 */
function onSubmitDestruction(element, text, app, layout, qix) {
    element.onclick = function(){
       
        /*
        * Get Document Variables
        */
        //Array for variables list
        let variableListArray = new Array();
        let flagNewSubmit = true;

        //Get the app Id
        app.getAppLayout(function(appLayout){
            //List variables via Capability API
  
            //promises.push(
            app.getList("VariableList", function(reply){
                //Get manual list of variables to destroy (if needed)
                let manualVariableListArray = [];
                if(layout.variableListSettings.varList){
                    manualVariableListArray = layout.variableListSettings.varList.split(';');
                };

                //Loop on all variables
                reply.qVariableList.qItems.forEach(function(variableList){
        
                    if(layout.variableListSettings.ScriptVar === true && variableList.qIsScriptCreated === true
                        || layout.variableListSettings.DesignVar === true && variableList.qIsScriptCreated != true)
                    {
                        // Variables list overwrite
                        switch (layout.defineVariables) {

                            //Delete Selected variables
                            case true :
                                if(layout.variableListSettings.searchString === true){
                                    //console.log("search string "+ layout.variableListSettings.varList);
                                    //Check variables depending search text
                                    if(variableList.qName.includes(layout.variableListSettings.varList)){variableListArray.push(variableList.qName);}
                                }
                                else{
                                    //console.log("List string "+ manualVariableListArray);
                                    //verify if the variable is on the list of variables selected variables
                                    if(manualVariableListArray.includes(variableList.qName)){variableListArray.push(variableList.qName);}
                                }
                            break;

                            //Delete All Variables
                            case false :
                                //console.log("Delete All");
                                variableListArray.push(variableList.qName);
                            break;

                            //default - no case
                            default: break;
                        }
                    }
                });
                
                /*** 
                 * If variables to destroy > 0, call descturtion function
                 * 
                 */
                if(variableListArray.length > 0 && flagNewSubmit === true){	
                    element.className = 'lui-button  lui-button--danger';
                    element.innerHTML = 'Processing... Do Not Touch!';
                    //console.log('Destruction Ammorcée. Listing des targets...')
                    //console.log(variableListArray.length+' à détruire');
                    try{
                        for (let elt of variableListArray) {
                            qix.app.destroyVariableByName(elt).then(function(variable){  
                                //console.log("Destruction variable : "+elt);
                                text.innerHTML = 'Processing variable '+ elt;
                            });
                        }
                    }
                    catch(error){
                                //console("Error occurs.")
                                text.innerHTML = 'Error occurs.';
                                }
                        //Reinit variableListArry and SubmitFlag
                        variableListArray = [];
                        flagNewSubmit = false;
                }
                else{
                    flagNewSubmit = false;
                    element.className = 'lui-button';
                    if(layout.buttonName) {element.innerHTML = layout.buttonName} else {element.innerHTML = 'Destroy Variables'};
                    text.innerHTML = 'Processing finished';
                } //Reinit listner if nothing has been destroy at the last submit

            }); // End of getGetVarList

        }); // End of getAppLayout

}; // End of OnClick Function

} // End of onSubmitDestruction