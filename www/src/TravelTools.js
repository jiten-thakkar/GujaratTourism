tourism.views.TravelTools = Ext.extend(Ext.Panel,{
	//initComponent function is basically called to initialize the page with the values specified.
	initComponent: function(){
		this.layout = 'vbox';
		this.items=	[{
							xtype: 'spacer'
					},{
							xtype: 'button',
							ui: 'action',
							text: 'Travel Planner',
							width: 250,
							centered: true,
							handler: this.getHandler('Travel Planner')
							
					},{
							xtype: 'spacer'
					},{
							xtype: 'button',
							ui: 'action',
							text: 'Emergency Contacts',
							width: 250,
							centered: true,
							handler: this.getHandler('Emergency Contacts')
							
					},{
							xtype: 'spacer'
					},{
							xtype: 'button',
							ui: 'action',
							text: 'Lodging',
							width: 250,
							centered: true,
							handler: this.getHandler('Lodging')
					},{
							xtype: 'spacer'
					 },{
							xtype: 'button',
							ui: 'action',
							text: 'Map',
							width: 250,
							centered: true,
							handler: this.getHandler('Map')
					},{
							xtype: 'spacer'
					}];
	//dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
	this.dockedItems = [{
		xtype: 'toolbar', //This line specifies that the item should be a toolbar
		title: 'Travel Tools',
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
				xtype: 'spacer'//This basically allows to leave some space between subsequent objects
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
							xtype: 'button', // This button is Map Button which would be contained in the toolbar. 
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
	
	tourism.views.TravelTools.superclass.initComponent.call(this);
	
	},
	
	getHandler: function(buttonName){
				return function(){
					switch(buttonName){
					case 'Travel Planner':
						//Ext.Msg.alert(buttonName);
						var travelPlanner = new tourism.views.Planner1({
							prevCard: this.ownerCt});
						tourism.views.Viewport.setActiveItem(travelPlanner);
					break;
					case 'Emergency Contacts':
						// Ext.Msg.alert(buttonName);
						var locationCard = new tourism.views.EmergencyContact({
							prevCard: this.ownerCt});
						tourism.views.Viewport.setActiveItem(locationCard);
					break;
					case 'Lodging':
						//Ext.Msg.alert(buttonName);						
						var lodging = new tourism.views.GeoLocate({
							prevCard: this.ownerCt, mapPage: false, kw: 'lodging', prevToprev: this.ownerCt});
						tourism.views.Viewport.setActiveItem(lodging);
					break;
					case 'Map':
						var geo = new tourism.views.GeoLocate({
									prevCard: this.ownerCt, mapPage: true
								});
					break;
					}
				}
			}
});
Ext.reg('TravelTools', tourism.views.TravelTools);