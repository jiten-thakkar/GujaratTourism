/* This file is used to get the direction between two places.
*/

tourism.views.DirectionMap=Ext.extend(Ext.Panel, {
    //initComponent function is basically called to initialize the page with the values specified.
	initComponent: function(){
	//dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
		this.dockedItems = [{
		xtype: 'toolbar',//This line specifies that the item should be a toolbar
		title: 'Maps',
		dock: 'top',//This line specifies that the toolbar should be created at the top of the dock.
		//items describes what items would be created in the toolbar and what should each do.
		items: [{
                ui: 'back',// This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard);
					this.destroy();
                }
            },{
			//This basically allows to leave some space between subsequent objects
		xtype: 'spacer'
	    },{
		xtype: 'component',
		html: "<img src='resources/img/icon_57.png' height='60' width='60' border='0'>"
	    }],
	},{
			xtype: 'spacer'
	},{
			xtype: 'toolbar',
			//This specifies that the new toolbar should be placed at the bottom
			dock: 'bottom',//The two lines create the "Home" button.
			//The following function is basically the handler function for Home Button.
			items:[{
					xtype: 'button',
					text: 'Home',
					handler: function(){
							tourism.views.Viewport.setActiveItem(0);
							this.destroy();
					}
					}]
	}];
		if(typeof google!== "undefined"){
		var maps=new Ext.Map({
			mapOptions : {
			  center : new google.maps.LatLng(this.start.latitude, this.start.longitude),  
			  zoom: 15,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			},
			listeners:{
			  maprender:this.direction
			},
			ui:'map',
			start: this.start,
			dest: this.dest
		});
		}else{
			Ext.Msg.alert('No internet connection.');
		}
		
		this.items = maps;
		tourism.views.DirectionMap.superclass.initComponent.call(this);
	},
	direction: function(mapExt,map) {
		// console.log('start'+this.start.lon+','+this.start.lat);
		// console.log('dest'+this.dest.lon+','+this.dest.lat);
		var directionsDisplay;
		var directionsService;
		var stepDisplay;
		var markerArray = [];

		directionsService = new google.maps.DirectionsService();
		var myOptions = {
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: new google.maps.LatLng(this.start.latitude, this.start.longitude)
        };

		  // Create a renderer for directions and bind it to the map.
		  var rendererOptions = {
			map: map
		  };
		  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

		  // Instantiate an info window to hold step text.
		  stepDisplay = new google.maps.InfoWindow();

		  // First, clear out any existing markerArray
		  // from previous calculations.
		  for (i = 0; i < markerArray.length; i++) {
			markerArray[i].setMap(null);
		  }

		  // Retrieve the start and end locations and create
		  // a DirectionsRequest using WALKING directions.
		  var request = {
			  origin: new google.maps.LatLng(this.start.latitude, this.start.longitude),
			  destination: this.dest,
			  travelMode: google.maps.TravelMode.DRIVING
		  };

		  // Route the directions and pass the response to a
		  // function to create markers for each step.
		  directionsService.route(request, function(response, status) {
			console.log(status);
			if (status == google.maps.DirectionsStatus.OK) {
			  // var warnings = document.getElementById("warnings_panel");
			  // warnings.innerHTML = "" + response.routes[0].warnings + "";
			  directionsDisplay.setDirections(response);
			  showSteps(response);
			}else{
				Ext.Msg.alert("Sorry, couldn't fetch data.");
			} 
		  });


		function showSteps(directionResult) {
		  // For each step, place a marker, and add the text to the marker's
		  // info window. Also attach the marker to an array so we
		  // can keep track of it and remove it when calculating new
		  // routes.
		  var myRoute = directionResult.routes[0].legs[0];

		  for (var i = 0; i < myRoute.steps.length; i++) {
			  var marker = new google.maps.Marker({
				position: myRoute.steps[i].start_point,
				map: map
			  });
			  attachInstructionText(marker, myRoute.steps[i].instructions);
			  markerArray[i] = marker;
		  }
		}

		function attachInstructionText(marker, text) {
		  google.maps.event.addListener(marker, 'mouseup', function() {
		  stepDisplay.setContent(text);
		  stepDisplay.setContent(text);
		 stepDisplay.open(map, marker);
		  });
	}
	}
});
Ext.reg('DirectionMap',tourism.views.DirectionMap);