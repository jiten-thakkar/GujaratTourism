tourism.views.PlaceDetail = Ext.extend(Ext.Panel, {
	initComponent: function (){
		this.dockedItems = [{
		xtype: 'toolbar',
		title: 'Around Me',
		dock: 'top',
		items: [{
                ui: 'back',
                text: 'Back',
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(new tourism.views.PlacesList({
						results:this.results, map: this.map, start: this.start
					}));
					this.destroy();
                }
            },{
				xtype: 'spacer'
			},{
			xtype: 'component',
			html: "<img src='resources/img/icon_57.png' height='60' width='60' border='0'>"
		}],
	},{
			xtype: 'spacer'
	},{
			xtype: 'toolbar',
			dock: 'bottom',
			items:[{
					xtype: 'button',
					text: 'Home',
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
		this.items = [{
            tpl: new Ext.XTemplate('<h3>{name}</h3><br /><h4>{vicinity}<br />{website}<br />{formatted_phone_number}</h4>'),
            data: this.selection.data,
            styleHtmlContent: true
         },{
			xtype: 'button',
			text: 'Get Direction',
			ui: 'action',
			dest: this.selection.data.location,
			start: this.start,
			handler: function(b, e) {
				console.log('here'+b.dest);
				var locationcard = new tourism.views.DirectionMap({
						prevCard: this.ownerCt,
						start: b.start, dest: b.dest
				});
				tourism.views.Viewport.setActiveItem(locationcard);
			}
		}];
		tourism.views.PlaceDetail.superclass.initComponent.call(this);
	}
});
Ext.reg('PlaceDetail',tourism.views.PlaceDetail);