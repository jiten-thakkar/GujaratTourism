/* This file is used to start the App.
*/

tourism.cfg = {};

tourism.views.App = Ext.extend(Ext.Panel, {
    //initComponent function is basically called to initialize the page with the values specified.  
    initComponent: function() {
	
    this.fullscreen= true,
	this.layout='card',
	this.cardSwitchAnimation= 'fade',
    
            this.items = [{
                xtype: 'homePage'
            }];		
        
        tourism.cfg = {};

        tourism.cfg.title = this.title;
        
        tourism.views.App.superclass.initComponent.call(this);
    },
	
    
});