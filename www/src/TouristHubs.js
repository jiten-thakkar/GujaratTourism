tourism.views.TouristHubs = Ext.extend(Ext.Panel,{
  
  fullscreen: true,
  layout: {
          type: 'vbox',
          align: 'stretch'
  },  
  //initComponent function is basically called to initialize the page with the values specified.
  initComponent: function() {
  
   Ext.regModel('hubs',{
    fields: ['hub']
  }); 
  Ext.regModel('cat',{
    fields: ['category']
  }); 
  
  var hubs= new Ext.data.JsonStore({
    model: 'hubs',
    data: [
      {hub: 'Ahmedabad Metro'},
      {hub: 'North Gujarat'},
      {hub: 'Surat'},
      {hub: 'Vadodara'},
      {hub: 'Rajkot'},
      {hub: 'Junagadh'},
      {hub: 'Jamnagar'},
      {hub: 'Kutch'}
    ]
  });
  
  var categories= new Ext.data.JsonStore({
	model: 'cat',
	data: [
		{category: 'Religious Sites'},
		{category: 'Archaeological & Architectures'},
		{category: 'Heritage Monuments & Structures'}, 
		{category: 'Museums & Learning Spaces'},
		{category: 'Forests & Natural Ecosystems'},
		{category: 'Gandhi'},
		{category: 'Gardens & Lakes'},
		{category: 'Buddhist Foot Print in Gujarat'},
		{category: 'Others'}
	]
  });  
  if(this.byCategory){
	this.whatToshow = categories;
	this.template = '{category}';
	this.title='Types'}
  else{
	this.whatToshow = hubs;
	this.template = '{hub}';
	this.title='Categories'}
   
   var list= new Ext.List({
     itemTpl: this.template,
     store: this.whatToshow,
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
		title: 'Tourist Places',
		dock: 'top', //This line specifies that the toolbar should be created at the top of the dock.
		//items describes what items would be created in the toolbar and what should each do.
		items: [{
                ui: 'back',// This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
                    this.ownerCt.setActiveItem(new tourism.views.TouristPlaces({}));
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
	handler: function(dataview,index,item){
	var filter;
	
	if(this.byCategory)
		filter = this.categoryNames[index];
	else
		filter = this.hubNames[index];
	var locationCard = new tourism.views.LocationList({
						prevToprev:this.prevCard,filterBy:filter,byCategory:this.byCategory});
	tourism.views.Viewport.setActiveItem(locationCard);
	this.destroy();
	},  
   hubNames:['Ahmedabad Metro','North Gujarat','Surat', 'Vadodara','Rajkot','Junagadh','Jamnagar','kutch'],
   categoryNames: ['Religious Sites', 'Archaeological & Architectures', 'Heritage Monuments & Structures', 'Museums & Learning Spaces', 'Forests & Natural Ecosystems', 'Gandhi', 'Gardens & Lakes', 'Buddhist Foot Print in Gujarat', 'Others']
});
Ext.reg('TouristHubs', tourism.views.TouristHubs);