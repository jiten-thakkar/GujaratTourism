/*This file is analogous to Festival List and used to retrieve the list of Locations of Gujarat and display it.
*/

tourism.views.GujaratList=Ext.extend(Ext.Panel,{

	 fullscreen: true,
        layout: {
           type: 'vbox',
           align: 'stretch'
        },
//initComponent function is basically called to initialize the page with the values specified.
	initComponent:function(){
		this.data =new Ext.data.Store({
                model: 'About',
                sorters: 'about',
				getGroupString: function(r){
                    return r.get('about');
                },
                proxy: {
                    type: 'ajax',
                    url : 'resources/data/aboutgujarat.json',
                    reader: {
                        type: 'json',
                        root: 'aboutgujarat'
                    }
                },
                autoLoad: true
            });
		if(this.byCategory){
			this.data.filter('type',this.filterBy);
			this.template = '<span class="name">{topic}</span>';}
		else{	
		this.data.filter('about',this.filterBy);
		this.template='<span class="name">{about}</span>';}
		
		var list= new Ext.List({
     itemTpl: '<span class="name">{topic}</span>',
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
		title: 'About Gujarat',
		dock: 'top',//This line specifies that the toolbar should be created at the top of the dock.
		//items describes what items would be created in the toolbar and what should each do.
		items: [{
                ui: 'back',// This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
                    this.ownerCt.setActiveItem(new tourism.views.AboutGujarat({prevCard:this.prevToprev,filterBy: this.filterBy}));
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
		var locationCard = new tourism.views.AboutDetail({
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
Ext.reg('GujaratList', tourism.views.GujaratList);