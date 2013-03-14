/* This file provides the implementation to retrieve list of locations from .json file and display it.
*/
tourism.views.LocationList=Ext.extend(Ext.Panel,{

	 fullscreen: true,
        layout: {
           type: 'vbox',
           align: 'stretch'
        },
//initComponent function is basically called to initialize the page with the values specified. 
	initComponent:function(){
	this.data =new Ext.data.Store({
                model: 'Location',
                sorters: 'hub',
				getGroupString: function(r){
                    return r.get('hub');
                },
                proxy: {
                    type: 'ajax',
                    url : 'resources/data/locations.json',
                    reader: {
                        type: 'json',
                        root: 'locations'
                    }
                },
                autoLoad: true
            });
		if(this.byCategory){
			this.data.filter('type',this.filterBy);
			this.template = '<span class="name">{name}</span>';}
		else{
			this.data.filter('hub',this.filterBy);
			this.template='<span class="name">{name}</span> <span class="secondary">{type}</span>';}
		var list= new Ext.List({
		 itemTpl: this.template,
		 store: this.data,
		 scroll: 'vertical',
		 singleSelect: true,
		 allowDeselect: true,
		 clearSelectionOnDeactivate: true,
		 flex: 1
		});
  list.show();
  list.on('selectionchange',this.handler,this);
  //dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
  this.dockedItems = [{
		xtype: 'toolbar',
		title: 'Tourist Places',
		dock: 'top',
		items: [{
                ui: 'back',// This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
                    this.ownerCt.setActiveItem(new tourism.views.TouristHubs({prevCard:this.prevToprev,byCategory: this.byCategory}));
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
		this.items = list;
		tourism.views.LocationList.superclass.initComponent.call(this);
	},
	handler: function(selectionmodel, records) {
		var locationCard = new tourism.views.LocationDetail({
                prevToprev: this.prevCard,
				filterBy: this.filterBy,
				byCategory:this.byCategory,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            tourism.views.Viewport.setActiveItem(locationCard);
			this.destroy();
	}
});
Ext.reg('LocationList', tourism.views.LocationList);