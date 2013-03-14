/*This file basically displays the Home Page and provides an interface for navigating further. 
*/

tourism.views.HomePage = Ext.extend(Ext.Panel,{
	
	//initComponent function is basically called to initialize the page with the values specified.
	initComponent: function(){
	
	this.layout= {
			type: 'vbox',
			pack: 'end',
			},
	this.items= [{
					xtype: 'container',
					height: '240',
					html : "<img src = 'resources/img/background.png' width = '"+window.screen.width+"' height = '"+window.screen.height+"'></img>"
			},{
					xtype: 'panel',
					layout: {
							type: 'hbox',
					},
					items: [{
							xtype: 'button',
							cls:'abtgujarat',
							handler: this.getHandler('About Gujarat',this)
					},{
					xtype: 'spacer',
					width: '15'
			},{
							xtype: 'button',
							cls:'touristattractions',
							handler: this.getHandler('Tourist Places',this)
			
					}]
			},{
					xtype: 'spacer'
			},{
					xtype: 'panel',
					layout: {
							type: 'hbox',
					},
					items: [{
							xtype: 'button',
							cls:'aroundme',
							handler: this.getHandler('Around Me',this)
							
					},{
							xtype: 'spacer',
							width:'15'
					},{
							xtype: 'button',
							cls:'traveltools',
							handler: this.getHandler('Travel Tools',this)
					}]
			},{
					xtype: 'spacer',					
			}]
			
			tourism.views.LocationList.superclass.initComponent.call(this);
		},
	
	getHandler: function(buttonName){
				return function(){
					switch(buttonName){
					case 'Around Me':
						var aroundMe = new tourism.views.AroundMe({prevCard: this.ownerCt});
					      tourism.views.Viewport.setActiveItem(aroundMe);
					
					break;
					case 'About Gujarat':
							var aboutGujarat = new tourism.views.AboutGujarat({prevCard: this.ownerCt});
					      tourism.views.Viewport.setActiveItem(aboutGujarat);					
					break;
					case 'Tourist Places':
						var touristPlaces = new tourism.views.TouristPlaces({prevCard: this.ownerCt});
						tourism.views.Viewport.setActiveItem(touristPlaces);
					break;
					case 'Travel Tools':
							var travelTools = new tourism.views.TravelTools({
								prevCard: this.ownerCt
							});
					      tourism.views.Viewport.setActiveItem(travelTools);
					break;
					}
				}
			}
});
Ext.reg('homePage', tourism.views.HomePage);