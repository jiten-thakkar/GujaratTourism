tourism.views.Planner1 = Ext.extend(Ext.Panel, {

	fullscreen: true,
        layout: {
           type: 'vbox',
           align: 'stretch'
        },
		//initComponent function is basically called to initialize the page with the values specified.
	initComponent: function() {
		
		Ext.regModel('Cities',{
			fields: ['name', 'lat', 'lon']
		});
		
		this.cities = new Ext.data.Store({
				model: 'Cities',
				data :[{
        "name" : "Ahmedabad",
        "latitude" : "23.0333",
        "longitute" : "72.6167"
    },
    {
        "name" : "Amreli",
        "latitude" : "21.6200",
        "longitute" : "71.2300"
    },
    {
        "name" : "Anand",
        "latitude" : "22.5700",
        "longitute" : "72.9300"
    },
    {
        "name" : "Anklesvar",
        "latitude" : "21.6000",
        "longitute" : "73.0000"
    },
    {
        "name" : "Bharuch",
        "latitude" : "21.7000",
        "longitute" : "72.9700"
    },
    {
        "name" : "Bhavnagar",
        "latitude" : "21.7700",
        "longitute" : "72.1500"
    },
    {
        "name" : "Dabhoi",
        "latitude" : "22.1800",
        "longitute" : "73.4300"
    },
    {
        "name" : "Dang",
        "latitude" : "20.7500",
        "longitute" : "73.6833"
    },
    {
        "name" : "Dahod",
        "latitude" : "22.8341",
        "longitute" : "74.2542"
    },
    {
        "name" : "Dwarka",
        "latitude" : "22.2300",
        "longitute" : "68.9700"
    },
    {
        "name" : "Gir Forest",
        "latitude" : "21.1356",
        "longitute" : "70.7967"
    },
    {
        "name" : "Godhra",
        "latitude" : "22.7500",
        "longitute" : "73.6333"
    },
    {
        "name" : "Himmatnagar",
        "latitude" : "23.6000",
        "longitute" : "72.9500"
    },
    {
        "name" : "Idar",
        "latitude" : "23.8300",
        "longitute" : "73.0000"
    },
    {
        "name" : "Jamnagar",
        "latitude" : "22.4700",
        "longitute" : "70.0700"
    },
    {
        "name" : "Junagadh",
        "latitude" : "21.5200",
        "longitute" : "70.4700"
    },
    {
        "name" : "Kutch",
        "latitude" : "23.9150",
        "longitute" : "70.3670"
    },
    {
        "name" : "Kheda",
        "latitude" : "22.7500",
        "longitute" : "72.6800"
    },
    {
        "name" : "Khambhat",
        "latitude" : "22.3000",
        "longitute" : "72.6200"
    },
    {
        "name" : "Mahesana",
        "latitude" : "23.6000",
        "longitute" : "72.4000"
    },
    {
        "name" : "Navsari",
        "latitude" : "20.8500",
        "longitute" : "72.9166"
    },
    {
        "name" : "Patan",
        "latitude" : "23.8300",
        "longitute" : "72.1200"
    },
    {
        "name" : "Panchmahal",
        "latitude" : "22.8208",
        "longitute" : "73.7477"
    },
    {
        "name" : "Porbandar",
        "latitude" : "21.6300",
        "longitute" : "69.6000"
    },
    {
        "name" : "Rajkot",
        "latitude" : "22.3000",
        "longitute" : "70.7800"
    },
    {
        "name" : "Vadodara",
        "latitude" : "22.3000",
        "longitute" : "73.1900"
    }]
	});
		
		var cityList = new Ext.List({
			 itemTpl: '{name}',
			 store: this.cities,
			 scroll: 'vertical',
			 singleSelect: true,
			 allowDeselect: true,
			 clearSelectionOnDeactivate: true,
			 flex: 1
		});
		
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
                    this.ownerCt.setActiveItem(this.prevCard);
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
		this.items = [{html: '<h4><centre>Select Origin of your journey.</centre></h4>'},cityList];
		tourism.views.Planner1.superclass.initComponent.call(this);
	},
	handler: function(dataView, index, item, e) {
				var store = dataView.getStore();
				var origin = store.getAt(index).data;
				console.log(store.getAt(index).data);
				store.removeAt(index);
				var planner = new tourism.views.Planner2({
					origin: origin, store: store, prevToprev: this.prevCard
				});
				tourism.views.Viewport.setActiveItem(planner);
				this.destroy();
			}
});
Ext.reg('Planner1',tourism.views.Planner1);