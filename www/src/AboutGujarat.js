/*This file gives an insight into About Gujarat Module. It creates the Object of GujaratList which helps in displaying the data extracted.
*/

tourism.views.AboutGujarat = Ext.extend(Ext.Panel,{
  
  fullscreen: true,
  layout: {
          type: 'vbox',//This line allows the page & list to be scrollable vertically
          align: 'stretch'// This line specifies the streched allignment.
  },
//initComponent function is basically called to initialize the page with the values specified.  
  initComponent: function() {
   Ext.regModel('aboutguj',{
    fields: ['about']
  }); 
  //The following snippet creates the JsonStore object to model data.
  var aboutguj= new Ext.data.JsonStore({
    model: 'aboutguj',
    data: [
      {about: 'Culture'},
      {about: 'Food'},
      {about: 'History'},
      {about: 'Facts'},
      {about: 'Specialities'},
	  {about: 'Festivals'}
    ]
  });
    //The following snippet helps in creating a list which helps in storing and displaying data in the form of lists.
   var list= new Ext.List({

     itemTpl: '{about}',
     store: aboutguj,
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
		title: 'About Gujarat',
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
			//This basically allows to leave some space between subsequent objects
		xtype: 'spacer'
	    },{
		xtype: 'component',
		// The next line allows to place the LOGO of Gujarat Tourism
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
	tourism.views.TouristHubs.superclass.initComponent.call(this);
  },
  //Following is the Handler function which helps in creating the Gujarat List object which shows the list and retrieved data.
  handler: function(dataview,index,item){
	var locationCard = new tourism.views.GujaratList({
						filterBy:this.aboutNames[index]});
	tourism.views.Viewport.setActiveItem(locationCard);
	this.destroy();
	},  
   aboutNames:['Culture','Food','History', 'Facts','Specialities','Festivals']
});
Ext.reg('AboutGujarat', tourism.views.AboutGujarat);