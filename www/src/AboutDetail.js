/* This file allows to extract data from aboutgujarat.json file placed in www\resources\data folder.
   It extracts and displays the data in the form specified by the developer. 
*/

tourism.views.AboutDetail = Ext.extend(Ext.Panel, {
	scroll: 'vertical', //This line allows the page & list to be scrollable vertically
    layout: {
        type: 'vbox', // This line specifies the layout to be a vertical box.
        align: 'stretch'// This line specifies the streched allignment.
    },
	//initComponent function is basically called to initialize the page with the values specified.
    initComponent: function(){

		//dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
        this.dockedItems = [{
            xtype: 'toolbar', //This line specifies that the item should be a toolbar
			dock: 'top',      //This line specifies that the toolbar should be created at the top of the dock.
            //items describes what items would be created in the toolbar and what should each do.
			items: [{
                ui: 'back',// This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
                    this.ownerCt.setActiveItem(new tourism.views.GujaratList({
						prevCard:this.prevToprev, filterBy:this.filterBy, byCategory:this.byCategory,
					}));
					this.destroy();
                }
            },{
				xtype: 'spacer' //This basically allows to leave some space between subsequent objects
			},{
			xtype: 'component', 
			// The next line allows to place the LOGO of Gujarat Tourism
			html: "<img src='resources/img/icon_57.png' height='60' width='60' border='0'>"
		}]
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
							xtype: 'button',// This button is Map Button which would be contained in the toolbar. 
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
        //The following snippet allows to extract data from aboutgujarat.json file.
        this.items = [{
            tpl: new Ext.XTemplate( '<h3>{about} </h3><h4 class="subdata">{topic} {about}</h4> {description}'),
            data: this.record.data,
            styleHtmlContent: true
        }];
        
        tourism.views.AboutDetail.superclass.initComponent.call(this);
    }
});

Ext.reg('AboutDetail', tourism.views.AboutDetail);