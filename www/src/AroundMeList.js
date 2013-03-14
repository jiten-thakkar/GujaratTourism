/* This file basically is used to retrieve the list of places using the Map.
*/
tourism.views.AroundMeList = Ext.extend(Ext.Panel,{
	
	 
	//initComponent function is basically called to initialize the page with the values specified.
  initComponent: function(){
      var maps;
      var service;
	  console.log('in aroundmelist, before: lat='+this.coor.latitude+'lon='+this.coor.longitude);
	  if(typeof google!== "undefined"){
		maps= new Ext.Map({
		mapOptions : {
		  center : new google.maps.LatLng(this.coor.latitude, this.coor.longitude),
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		},
		coor:this.coor,
		keyword: this.kw,
		ui:'map'
	  });
	  maps.on('maprender',this.places,this,[{scope:this}]);
	  }else{
		Ext.Msg.alert('No internet Connection.');
	  }
	
	//dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
	this.dockedItems = [{
		xtype: 'toolbar', //This line specifies that the item should be a toolbar
		title: 'Maps',
		dock: 'top',//This line specifies that the toolbar should be created at the top of the dock.
		//items describes what items would be created in the toolbar and what should each do.
		items: [{
                ui: 'back', // This line specifies the shape of the UI ie. button. It should signify "BACK"
                text: 'Back',//The text visible inside the UI should be "Back"
                scope: this,
				//Following is the handler function for Back Button. ie the function would be called on button press.
                handler: function(){
                    this.ownerCt.setActiveItem(new tourism.views.AroundMe({prevCard:this.prevToprev}));
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
					xtype:'spacer'
			},{
					xtype: 'button',
					text: 'Show List',
					start: this.coor,
					handler: function(b){
							var placelist = new tourism.views.PlacesList({
									start: b.start, results: this.results
							});
							tourism.views.Viewport.setActiveItem(placelist);
					}
			}]
	}];
	 this.items=maps;
    tourism.views.AroundMeList.superclass.initComponent.call(this);
  } ,
  places:function(mapExt,map){
	//Ext.Msg.alert("hi");
	console.log('in aroundmelist '+this.coor.longitude+"and"+this.coor.latitude+".");
    var request = {
		//location:new google.maps.LatLng(this.lon, this.lat),
		location:new google.maps.LatLng(this.coor.latitude,this.coor.longitude),
		radius: '10000',
       keyword:this.kw
    };

	 var infowindow = new google.maps.InfoWindow();
	 var service = new google.maps.places.PlacesService(map);
	 
     service.search(request, function (results, status) {
	 console.log(status);
	 this.results = [];
     if (status == google.maps.places.PlacesServiceStatus.OK) {
	 this.results = results;
     for (var i = results.length; i > 0; i--) {
       createMarker(results[i-1]);
     }
	 function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
			// markersArray.push(marker);
			google.maps.event.addListener(marker, 'mouseup', function() {
				infowindow.setContent(place.name+'<br />'+place.vicinity);
				infowindow.open(map, this);
			});
		}

      }else{
		Ext.Msg.alert("Sorry, Couldn't fetch the data.");
		setTimeout(this.places, 5000);
	}
	});
  
}
});
Ext.reg('AroundMeList', tourism.views.AroundMeList);