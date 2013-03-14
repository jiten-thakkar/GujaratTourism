/* This file specifies the different format in which data is to be extracted from different .json files.
*/

Ext.regModel('Location', {
	hasMany: {
		model:'Photo',
		name:'photos'
	},
	fields: ['id', 'hub', 'area', 'type', 'name', 'description', 'address', 'latlong', 'additional_info','id']
});

Ext.regModel('Photo', {
	hasMany: {
		model: 'Location',
		name: 'locations'
	},
	fields: ['id', 'title', 'url']
});
Ext.regModel('Festivals', {
	fields: ['id', 'name', 'dates','description'],
});

Ext.regModel('Planner', {
    fields: ['name'],
	proxy: {
		type: 'localstorage',
        id  : 'planner-list4'
	}
});