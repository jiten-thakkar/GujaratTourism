/* This file provides an implementation to provide complete detail about the selected place.
*/
	tourism.views.LocationDetail = Ext.extend(Ext.Panel, {
    scroll: 'vertical',
    cls: 'location-detail',
	//initComponent function is basically called to initialize the page with the values specified.
    initComponent: function(){
		//dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
        this.dockedItems = [{
            xtype: 'toolbar',//This line specifies that the item should be a toolbar
			dock: 'top',//This line specifies that the toolbar should be created at the top of the dock.
		//items describes what items would be created in the toolbar and what should each do.
            items: [{
                ui: 'back',// This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				ifGems: this.ifGems,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
					if (this.ifGems==true){
						var newPage = new tourism.views.GemsGujarat({
							prevCard:this.prevToprev
						});
					}else{
						var newPage = new tourism.views.LocationList({
							prevCard:this.prevToprev, filterBy:this.filterBy, byCategory:this.byCategory,
						});
					}
                    this.ownerCt.setActiveItem(newPage);
					this.destroy();
                }
            },{
			//This basically allows to leave some space between subsequent objects
				xtype: 'spacer'
			},{
			xtype: 'component',
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
        
        this.items = [{
            tpl: new Ext.XTemplate('<h3>{name} <small>{type}</small></h3><h4 class="subdata">{area} area in {hub} hub</h4> {description}<br />{additional_info}'),
            data: this.record.data,
            styleHtmlContent: true
        }];
        
        tourism.views.LocationDetail.superclass.initComponent.call(this);
    }
});

Ext.reg('LocationDetail', tourism.views.LocationDetail);