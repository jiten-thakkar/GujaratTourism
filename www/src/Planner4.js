tourism.views.Planner4 = Ext.extend(Ext.Panel, {

	fullscreen: true,
        layout: {
           type: 'vbox',
           align: 'stretch'
        },
		//initComponent function is basically called to initialize the page with the values specified. 
	initComponent: function() {
		Ext.regModel('Plan',{
			fields: ['name', 'distance']
		});
		var store = new Ext.data.Store({
			model: 'Plan'
		});
		var cityList = new Ext.List({
			 itemTpl: '<span class="name">{name}</span> <span class="secondary">{distance}</span>',
			 store: store,
			 scroll: 'vertical',
			 singleSelect: true,
			 allowDeselect: true,
			 clearSelectionOnDeactivate: true,
			 flex: 1
		});
		
		if(typeof google !== "undefined"){
		var directionsService = new google.maps.DirectionsService();
		console.log('origin'+this.origin.name+' dest'+this.dest.name);
		var origName = this.origin.name;
		var start = new google.maps.LatLng(this.origin.latitude, this.origin.longitute);
		var end = new google.maps.LatLng(this.dest.latitude, this.dest.longitute);
		var waypoints = [];
		console.log('waypts length='+this.waypts.length);
		for(var i=0;i<this.waypts.length;i++){
			console.log('waypts '+this.waypts[i].data.name);
			waypoints.push({
				location: new google.maps.LatLng(this.waypts[i].data.latitude, this.waypts[i].data.longitute),
				stopover: true
			});
		}
		var request = {
			origin: start, 
			destination: end,
			waypoints: waypoints,
			optimizeWaypoints: true,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
				console.log(status);
			  if (status == google.maps.DirectionsStatus.OK) {
				var route = response.routes[0];
				
				// For each route, display summary information.
				for (var i = 0; i < route.legs.length; i++) {
				  var routeSegment = i + 1;
				  path(route, routeSegment, this);
				}
				cityList.bindStore(store);
			  }
		});
		function path(route, routeSegment, scope){
			if(routeSegment==1){
				store.add({
					name: origName
				});
			}
			store.add({
				name: route.legs[routeSegment-1].end_address, distance: route.legs[routeSegment-1].distance.text
			});
		}
		}else{
			Ext.Msg.alert('No internet connection.');
		}
		cityList.show();
		cityList.on('itemtap', this.handler, this);
		//dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
		this.dockedItems = [{
            xtype: 'toolbar',//This line specifies that the item should be a toolbar
			dock: 'top',//This line specifies that the toolbar should be created at the top of the dock.
			title: 'Planner',
			//items describes what items would be created in the toolbar and what should each do.
            items: [{
                ui: 'back',// This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
                    this.ownerCt.setActiveItem(new tourism.views.Planner1());
					this.destroy();
                }
            },{
			//This basically allows to leave some space between subsequent objects
				xtype: 'spacer'
			},{
			xtype: 'component',
			// The next line allows to place the LOGO of Gujarat Tourism
			html: "<img src='resources/img/icon_57.png' height='60' width='60' border='0'>"
		}]
        },{
				xtype: 'toolbar',
				//This specifies that the new toolbar should be placed at the bottom
				dock: 'bottom',
			items:[{
						xtype: 'button',
						text: 'Home',//The two lines create the "Home" button.
					//The following function is basically the handler function for Home Button.
						handler: function(){
								tourism.views.Viewport.setActiveItem(0);
								this.destroy();
						}
					},{
							xtype: 'spacer'
					},{
							xtype: 'button',
							iconCls: 'locate1',
							text: 'Map',
							iconMask: true,
							handler: function() {
								var geo = new tourism.views.GeoLocate({
									prevCard: this.ownerCt.ownerCt, mapPage: true
								});
							}
					}]
		}];
		this.items = [{html: '<h4><centre>Your Travel Path in this sequence.</centre></h4>'},cityList];
		tourism.views.Planner4.superclass.initComponent.call(this);
	}
});
Ext.reg('Planner4',tourism.views.Planner4);