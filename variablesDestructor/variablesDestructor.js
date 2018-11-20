'use strict';

define( [ 
	'jquery',
	'qlik',
	'./lib/js/common',
	'./lib/js/properties',
	'./lib/js/destructor'
],
function ( $, qlik, common, properties, destructor) {
	
	/**
	 * Return de la fonction principale
	 */

    return {
		// Panel Properties
		definition : properties,

		/**
		 *  Paint resp.Rendering logic
		*/
		paint: function ( $element, layout) {

			// re-init de l'élément HTML
			$element.empty();

			/*
			* Variables
			*/
           // *** Qlik Variables *************************************************************************************** 
			// Get current app
			let app = qlik.currApp(this);
			//Get Current Session
			let qix = this.backendApi.model;
			// old version : What's the difference? let qix = this.backendApi.model.enigmaModel.session;
			// console.log(this.backendApi);

			// ***** JS variables for HTML element *********************************************************************
			//*** Buttons and layout *
			
			//Def. Button name & Informative texts
			let $buttonName = 'Destroy All Variables';
			if(layout.buttonName){$buttonName = layout.buttonName};
			let descriptionButtonText = 'Destroy variables from script : '+layout.variableListSettings.ScriptVar+'<br/>'+'Destroy variables from design : '+layout.variableListSettings.DesignVar;
			let actionText = '';

			//Create html divs and button
			let $buttonSubmit = createElement('button', 'lui-button', '' , $buttonName);
			let $buttonDescription = createElement('div','lui-text-default','margin : 5px 5px 5px 5px',descriptionButtonText);
			let $actionDescription = createElement('div','lui-text-default','margin : 5px 5px 5px 5px',actionText);
			// Create Container
			let $buttonContainer = createElement('div');


			/*
			* Actions and display
			*/
			//Add listener on button : On Click Destroy Variables
			onSubmitDestruction($buttonSubmit, $actionDescription, app, layout, qix);
			//add button in container
			$buttonContainer.appendChild($buttonDescription);
			$buttonContainer.appendChild($buttonSubmit);
			$buttonContainer.appendChild($actionDescription);
			//display container
			$element.append($buttonContainer);
			
		}
	};
} ); 
