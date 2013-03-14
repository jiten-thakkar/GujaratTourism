tourism.views.GeoLocate = Ext.extend(Ext.Panel,{
//initComponent function is basically called to initialize the page with the values specified.
	initComponent: function(){
		this.geo= new Ext.util.GeoLocation({
    autoUpdate: true,
	mappage: this.mapPage,
	kw: this.kw
});
	this.geo.updateLocation(function(geo){
		console.log('in geolocate');
		if(geo!=null){
			console.log('lon='+geo.longitude+'lat='+geo.latitude);
			console.log('mapPage='+this.mapPage);
			if(this.mapPage==false){
				var aroundmelist = new tourism.views.AroundMeList({
					prevToprev:this.prevToprev, kw:this.kw, coor: geo
				});
				tourism.views.Viewport.setActiveItem(aroundmelist);
			}else{
				var map = new tourism.views.MapPage({
					prevCard: this.prevCard, coor: geo
				});
				tourism.views.Viewport.setActiveItem(map);
			}
		}else{
			console.log('Error occurred.');
			console.log('mapPage='+this.mapPage);
			if(this.mapPage==false){
				var aroundmelist = new tourism.views.AroundMeList({
					prevToprev:this.prevToprev,kw:this.kw, coor: {latitude: 23.039722,longitude: 72.565899}
				});
				tourism.views.Viewport.setActiveItem(aroundmelist);
			}else{
				var map = new tourism.views.MapPage({
					prevCard: this.prevCard, coor: {latitude: 23.039722,longitude: 72.565899}
				});
				tourism.views.Viewport.setActiveItem(map);
			}
		}
	},this);
		tourism.views.GeoLocate.superclass.initComponent.call(this);
	}
});
Ext.reg('GeoLocate',tourism.views.GeoLocate);