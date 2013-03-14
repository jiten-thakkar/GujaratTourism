tourism.views.Planner3 = Ext.extend(Ext.Panel, {

	fullscreen: true,
        layout: {
           type: 'vbox',
           align: 'stretch'
        },
		//initComponent function is basically called to initialize the page with the values specified.  
	initComponent: function() {
			
		this.store.add(this.origin);
		var cityList = new Ext.List({
			 itemTpl: '{name}',
			 store: this.store,
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
		this.items = [{html: '<h4><centre>Select destination of your journey.</centre></h4>'},cityList];
		tourism.views.Planner3.superclass.initComponent.call(this);
	},
	handler: function(dataView, index, item, e) {
				var store = dataView.getStore();
				var dest = store.getAt(index).data;
				store.removeAt(index);
				var planner = new tourism.views.Planner4({
					origin: this.origin, dest: dest, store: store, waypts: this.waypts, prevToprev: this.prevToprevToprev
				});
				tourism.views.Viewport.setActiveItem(planner);
				this.destroy();
			}
});
Ext.reg('Planner3',tourism.views.Planner3);