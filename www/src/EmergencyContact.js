/* This file is basically used to implement feature to retrieve Emergency Contacts.
*/

tourism.views.EmergencyContact = Ext.extend(Ext.Panel,{	
	//initComponent function is basically called to initialize the page with the values specified. 
	
  initComponent: function(){
	//dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.  
	this.layout= 'vbox';
	this.dockedItems = [{
		xtype: 'toolbar',//This line specifies that the item should be a toolbar
		title: 'Emergency',
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
			},{
					xtype:'spacer'
			},{
					xtype: 'button',
					iconCls: 'locate1',
					text: 'Map',
					iconMask: true,
					handler: function(b){
							var geo = new tourism.views.GeoLocate({
									prevCard: this.ownerCt.ownerCt, mapPage: true
							});
					}
			}]
	}];
	this.html = 'Emergency: Call 108<br />Police: Call 100<br />Fire: Call 101<br />';
	this.items=[{
		xtype: 'button',
		docked: 'bottom',
		text: 'Search Hospitals',
		ui: 'action',
		handler: function() {
			var locationCard = new tourism.views.GeoLocate({
				prevToprev:this.ownerCt, kw:'hospitals' ,mapPage: false});
		}
	 }];
    tourism.views.EmergencyContact.superclass.initComponent.call(this);
  }
});
Ext.reg('EmergencyContact', tourism.views.EmergencyContact);