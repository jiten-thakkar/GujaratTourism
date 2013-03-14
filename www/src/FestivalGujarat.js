/* This file basically maintains the list of Major Festivals in Gujarat and provides an interface to know more about them.
*/

tourism.views.FestivalGujarat = Ext.extend(Ext.Panel,{
  
  fullscreen: true,
  layout: {
          type: 'vbox',
          align: 'stretch'
  },  
  //initComponent function is basically called to initialize the page with the values specified. 
  initComponent: function() {
   Ext.regModel('festivals',{
    fields: ['name']
  }); 
  var festivals= new Ext.data.JsonStore({
    model: 'festivals',
    data: [
      {name: 'Rann Utsav'},
      {name: 'Navratri'},
      {name: 'Kite Festival'},
      {name: 'Tarnetar Fair'},
	  {name: 'Modhera Dance Festival'},
	  {name: 'Saptak Music Festival'}
	  ]
  });
    
   var list= new Ext.List({

     itemTpl: '{name}',
     store: festivals,
     scroll: 'vertical',
     singleSelect: true,
     allowDeselect: true,
	 clearSelectionOnDeactivate: true,
	 flex: 1
  });

   list.on('itemtap',this.handler,this);
    
   list.show();
   //dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
   this.dockedItems = [{
		xtype: 'toolbar',//This line specifies that the item should be a toolbar
		title: 'Festive Seasons',
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
	tourism.views.TouristPlaces.superclass.initComponent.call(this);
  },
  handler: function(dataview,index,item){
	var locationCard = new tourism.views.FestivalList({
						filterBy:this.aboutNames[index], prevToprev: this.prevCard});
	tourism.views.Viewport.setActiveItem(locationCard);
	this.destroy();
	},  
   aboutNames:['Rann Utsav','Navratri','Kite Festival', 'Tarnetar Fair','Modhera Dance Festival','Saptak Music Festival']
});
Ext.reg('FestivalGujarat', tourism.views.FestivalGujarat);