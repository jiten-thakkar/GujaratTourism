/*This file retrieves the list of festivals from the json file.
*/
tourism.views.FestivalList=Ext.extend(Ext.Panel,{

	 fullscreen: true,
        layout: {
           type: 'vbox',
           align: 'stretch'
        },
 //initComponent function is basically called to initialize the page with the values specified. 
	initComponent:function(){
		this.data =new Ext.data.Store({
                model: 'Festivals',
                sorters: 'name',
				getGroupString: function(r){
                    return r.get('name');
                },
                proxy: {
                    type: 'ajax',
                    url : 'resources/data/festivals.json',
                    reader: {
                        type: 'json',
                        root: 'festivals'
                    }
                },
                autoLoad: true
            });
		if(this.byCategory){
			this.data.filter('name',this.filterBy);
			this.template = '<span class="name">{name}</span>';}
		else{	
		this.data.filter('name',this.filterBy);
		this.template='<span class="name">{name}</span>';}
		
		var list= new Ext.List({
     itemTpl: '<span class="name">{name}</span>',
     store: this.data,
     scroll: 'vertical',

     singleSelect: true,
     allowDeselect: true,
	 clearSelectionOnDeactivate: true,
	 flex: 1
  });
  list.show();
  list.on('selectionchange', this.handler, this);
  //dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
  this.dockedItems = [{
		xtype: 'toolbar',//This line specifies that the item should be a toolbar
		title: 'Festivities',
		dock: 'top',//This line specifies that the toolbar should be created at the top of the dock.
		//items describes what items would be created in the toolbar and what should each do.
		items: [{
                ui: 'back',// This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
                    this.ownerCt.setActiveItem(new tourism.views.FestivalGujarat({prevCard:this.prevToprev}));
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
							xtype: 'button',// This button is Map Button which would be contained in the toolbar.
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
		this.items = list;
		tourism.views.GujaratList.superclass.initComponent.call(this);
	},
	handler: function(selectionmodel, records) {
		var locationCard = new tourism.views.FestivalDetail({
                prevToprev: this.prevToprev,
				filterBy: this.filterBy,
				byCategory:this.byCategory,
                record: records[0]
            });

            // Tell the parent panel to animate to the new card
            tourism.views.Viewport.setActiveItem(locationCard);
			this.destroy();
		}
});
Ext.reg('FestivalList', tourism.views.FestivalList);