Ext.namespace('tourism', 'tourism.views');

Ext.setup({
    statusBarStyle: 'black',
    onReady: function() {
        tourism.views.Viewport = new tourism.views.App({
            title: 'Gujarat Tourism',
                        
            twitterSearch: '#gujarat tourism'

        });
    }
});
