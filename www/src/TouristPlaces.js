tourism.views.TouristPlaces = Ext.extend(Ext.Panel,{
	//initComponent function is basically called to initialize the page with the values specified.  
	initComponent: function(){
	
	this.layout = 'vbox';
		this.items=	[{
							xtype: 'spacer'
					},{
							xtype: 'button',
							ui: 'action',
							text: 'Hubs',
							width: 200,
							centered: true,
							handler: this.getHandler('Tourist Hubs')
							
					},{
							xtype: 'spacer'
					},{
							xtype: 'button',
							ui: 'action',
							text: 'Categories',
							width: 200,
							centered: true,
							handler: this.getHandler('Categories')
					},{
							xtype: 'spacer'
					},{
							xtype: 'button',
							ui: 'action',
							text: 'Gems of Gujarat',
							width: 200,
							centered: true,
							handler: this.getHandler('Gems of Gujarat')
					},{
							xtype: 'spacer'
					},{
							xtype: 'button',
							ui: 'action',
							text: 'Gandhi Circuit',
							width: 200,
							centered: true,
							handler: this.getHandler('Gandhi Circuit')
					},{
							xtype: 'spacer'
					},{
							xtype: 'button',
							ui: 'action',
							text: 'Festivities',
							width: 200,
							centered: true,
							handler: this.getHandler('Festive Seasons')
					},{
							xtype: 'spacer'
					}];
	//dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
	this.dockedItems = [{
		xtype: 'toolbar',//This line specifies that the item should be a toolbar
		title: 'Attractions',
		dock: 'top',//This line specifies that the toolbar should be created at the top of the dock.
		//items describes what items would be created in the toolbar and what should each do.
		items: [{
                ui: 'back',// This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
                    this.ownerCt.setActiveItem(0);
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
	
	tourism.views.TouristPlaces.superclass.initComponent.call(this);
	
	},
	
	getHandler: function(buttonName){
				return function(){
					//Ext.Msg.alert(buttonName);
					switch(buttonName){
						case 'Tourist Hubs':
							var locationCard = new tourism.views.TouristHubs({
										prevCard: this.ownerCt, byCategory: false});
							tourism.views.Viewport.setActiveItem(locationCard);
						break;
						case 'Gems of Gujarat':
							//Ext.Msg.alert(buttonName);
							var locationCard = new tourism.views.GemsGujarat({
								prevCard: this.ownerCt});
							tourism.views.Viewport.setActiveItem(locationCard);
						break;
						case 'Gandhi Circuit':
							//Ext.Msg.alert(buttonName);
							var locationCard = new tourism.views.LocationList({
								prevCard: this.ownerCt, filterBy: 'Gandhi', byCategory: true});
							tourism.views.Viewport.setActiveItem(locationCard);
						break;
						case 'Festive Seasons':
						//Ext.Msg.alert(buttonName);
						var locationCard = new tourism.views.FestivalGujarat({
							prevCard: this.ownerCt});
						tourism.views.Viewport.setActiveItem(locationCard);
						break;
						case 'Categories':
							var locationCard = new tourism.views.TouristHubs({
										prevCard: this.ownerCt,byCategory: true});
							tourism.views.Viewport.setActiveItem(locationCard);
						break;
					}
				}
			}
});
Ext.reg('touristPlaces', tourism.views.TouristPlaces);