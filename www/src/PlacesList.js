tourism.views.PlacesList=Ext.extend(Ext.Panel, {

	fullscreen: true,
	layout: {
          type: 'card',
          align: 'stretch'
	}, 
	//initComponent function is basically called to initialize the page with the values specified.
	initComponent: function(){
		Ext.regModel('PlaceModel',{
			fields: ['name', 'website', 'formatted_phone_number', 'vicinity', 'location']
		});
		var result = this.results;
		var places=[];
		for(var i=0;i<results.length;i++) {
			places.push({name:results[i].name,
						 website: results[i].website,
						 formatted_phone_number: results[i].formatted_phone_number,
						 vicinity: results[i].vicinity,
						 location: results[i].geometry.location
			});
		}
		var dataToshow = new Ext.data.JsonStore({
			model: 'PlaceModel',
			data: places
		});
		var placeList = new Ext.List({
			itemTpl: '{name}',
			store: dataToshow,
			scroll: 'vertical',
			singleSelect: true,
			allowDeselect: true,
			clearSelectionOnDeactivate: true,
			flex: 1
		});
		placeList.on('selectionchange', this.handler, this);
		//dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
		this.dockedItems = [{
		xtype: 'toolbar',//This line specifies that the item should be a toolbar
		title: 'Around Me',
		dock: 'top',//This line specifies that the toolbar should be created at the top of the dock.
		//items describes what items would be created in the toolbar and what should each do.
		items: [{
                ui: 'back',// This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
                    this.ownerCt.setActiveItem(new tourism.views.AroundMe({}));
					this.destroy();
                }
            },{
				xtype: 'spacer' //This basically allows to leave some space between subsequent objects
			},{
			xtype: 'component',
			// The next line allows to place the LOGO of Gujarat Tourism
			html: "<img src='resources/img/icon_57.png' height='60' width='60' border='0'>"
		}],
	},{
			xtype: 'spacer'
	},{
			xtype: 'toolbar',
			dock: 'bottom',//This specifies that the new toolbar should be placed at the bottom
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
		this.items = placeList;
		tourism.views.PlacesList.superclass.initComponent.call(this);
	},
	handler: function(selectionmodel, records) {
		var locationcard = new tourism.views.PlaceDetail({
			selection:records[0], results: this.results, 
			start: this.start, map: this.map
		});
		tourism.views.Viewport.setActiveItem(locationcard);
		this.destroy();
	}
});
Ext.reg('PlaceList',tourism.views.PlacesList);