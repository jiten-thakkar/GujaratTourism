/* This file is used to define the Around Me module. A list containing  most searched keywords is maintained. 
*/
tourism.views.AroundMe = Ext.extend(Ext.Panel,{
  
  fullscreen: true,
  layout: {
          type: 'vbox',
          align: 'stretch'
  },  
  //initComponent function is basically called to initialize the page with the values specified.  
  initComponent: function() {
   Ext.regModel('aroundMe',{
    fields: ['am']
  }); 
  var aroundMe= new Ext.data.JsonStore({
    model: 'aroundMe',
    data: [
      {am: 'Nearby Attraction'},
      {am: 'Food Joint'},
      {am: 'Lodging'},
      {am: 'Shopping'},
      {am: 'Travel Service'},
      {am: 'ATM'},
      {am: 'Emergency Contact'}
    ]
  });
    
   var list= new Ext.List({
     itemTpl: '{am}',
     store: aroundMe,
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
		xtype: 'toolbar', //This line specifies that the item should be a toolbar
		title: 'Around Me',
		dock: 'top',//This line specifies that the toolbar should be created at the top of the dock.
		//items describes what items would be created in the toolbar and what should each do.
		items: [{
                ui: 'back', // This line specifies the shape of the UI ie. button. It should signify "BACK"
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
  onDsListItemTap: function(list, index, item, e) {
	},
  handler: function(dataview,index,item){
	var locationCard = new tourism.views.GeoLocate({
		prevToprev:this.prevCard, kw:this.amNames[index],mapPage: false});
	this.destroy();
	},  
   amNames:['Nearby Attraction','Food','Hotel', 'Shopping','Travel','ATM','hospitals']
});
Ext.reg('AroundMe', tourism.views.AroundMe);