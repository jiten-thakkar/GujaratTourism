tourism.views.MapPage=Ext.extend(Ext.Panel,{
	//initComponent function is basically called to initialize the page with the values specified.
	initComponent: function() {
		if(typeof google!== "undefined"){
		this.maps=new Ext.Map({
		mapOptions : {
		  center : new google.maps.LatLng(this.coor.latitude, this.coor.longitude),  
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		},
		coor:this.coor,
		listeners:{
		  maprender: this.showPlace
		},
		ui:'map'
	  });
	  }else{
		Ext.Msg.alert('No internet Connection.');
	  }
	  
	 Ext.regModel('names',{
    fields: ['formatted_address','lat','lon','bound']
  }); 
  
   this.store= new Ext.data.JsonStore({
    model: 'names'
  });
	
	 this.list= new Ext.List({
     itemTpl: '{formatted_address}',
     store: this.store,
     scroll: 'vertical',
     singleSelect: true,
     allowDeselect: true,
	 map: this.maps,
	 form: this.form,
	 clearSelectionOnDeactivate: true,
	 flex: 1
  });
  this.list.on('itemtap', this.selectHandler, this);
  this.form = new Ext.form.Search({
				label: 'Search',
				scope: this,
				list: this.list,
				listeners: {
					keyup: this.geocoderHandler,
					scope: this
				}
	});
	
		//dockedItems specifies the differnt items which would be present in the dock and their handlers/functionalities.
        this.dockedItems = [{
            xtype: 'toolbar', //This line specifies that the item should be a toolbar
			dock: 'top',      //This line specifies that the toolbar should be created at the top of the dock.
			title: 'Map',
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
		}]
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
							text: 'Show Me Around',
							handler: function() {
								var aroundMe = new tourism.views.AroundMe({prevCard: this.ownerCt});
								tourism.views.Viewport.setActiveItem(aroundMe);
							}
					}]
		}];
		this.items = [this.form,this.list,this.maps];
		tourism.views.MapPage.superclass.initComponent.call(this);
	},
	showPlace: function(mapExt,map) {
		 var infowindow = new google.maps.InfoWindow();
		var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(this.coor.latitude, this.coor.longitude)
		});

        google.maps.event.addListener(marker, 'mouseup', function() {
          infowindow.setContent('You Are Here!!!');
          infowindow.open(map, this);
		});
	},
	geocoderHandler: function(text, e) {
		// if(typeof google!== "undefined"){
		var geocoder = new google.maps.Geocoder();  
          if (geocoder == null){
           geocoder = new google.maps.Geocoder();
          }
             geocoder.geocode( {'address': text.getValue()+'Gujarat,India' }, function(results, status) {
               if (status == google.maps.GeocoderStatus.OK) {
				 store = this.store;
                  var searchLoc = results[0].geometry.location;
               var lat = results[0].geometry.location.lat();
                  var lng = results[0].geometry.location.lng();
                  var latlng = new google.maps.LatLng(lat, lng);
                  var bounds = results[0].geometry.bounds;
					var results1=[];
                  geocoder.geocode({'latLng': latlng}, function(results1, status1) {
                      if (status1 == google.maps.GeocoderStatus.OK) {
                        if (results1[1]) {
							this.store= new Ext.data.JsonStore({
								model: 'names'
							});

							for (var i=1;i<results1.length;i++){
								console.log(results1[i].formatted_address);
								this.store.add({formatted_address: results1[i].formatted_address, 
									lat: results1[i].geometry.location.lat(), lon: results1[i].geometry.location.lng(),
									bound: results1[i].geometry.bounds});	
							}
							text.list.bindStore(this.store);
                        }
                      }
                    });
            }
              });
	},
	selectHandler: function(dataView, index, item, e) {
		
		var lat = dataView.getStore().getAt(index).data.lat;
		var lon = dataView.getStore().getAt(index).data.lon;
		var latlon = new google.maps.LatLng(lat, lon);
		var map = this.maps.map;
		var bound = dataView.getStore().getAt(index).data.bound;
		var formatted_address = dataView.getStore().getAt(index).data.formatted_address;
		
		var store= new Ext.data.JsonStore({
								model: 'names'
					});
		dataView.bindStore(store);
		this.form.setValue(formatted_address);
		this.maps.map.setCenter(latlon);
		this.maps.map.fitBounds(bound);
		var marker = new google.maps.Marker({
          map: this.maps.map,
          position: latlon
		});
		var infowindow = new google.maps.InfoWindow();

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [new google.maps.LatLng(this.coor.latitude, this.coor.longitude)],
            destinations: [latlon],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }, callback);

      function callback(response, status) {
		console.log(status);
        if (status != google.maps.DistanceMatrixStatus.OK) {			
          Ext.Msg.alert('Error was: ' + status);
        } else {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;

          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
				setInfowindow(results[j]);
            }
          }
		  
		
        }
		
      }
	  function setInfowindow(results){
		google.maps.event.addListener(marker, 'mouseup', function() {
				if(results.duration!=null){
					// this.string = formatted_address+'<br />Distance: '+this.results[j].distance.text+'<br />Duration: '+this.results[j].duration.text;
					infowindow.setContent(formatted_address+'<br />Distance: '+results.distance.text+'<br />Duration: '+results.duration.text);
					infowindow.open(map, this);
				}else{
					// this.string = formatted_address+'<br />Distance: Too Far<br />Duration: Too Long';
					infowindow.setContent(formatted_address+'<br />Distance: Too Far<br />Duration: Too Long');
					infowindow.open(map, this);
				}
				});
	  }
	  
			
			
	  }
});
Ext.reg('MapPage',tourism.views.MapPage);