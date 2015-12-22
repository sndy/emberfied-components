/* jshint node: true */
'use strict';

module.exports = {
  name: 'emberfied-components',
  included: function(app) {
    this._super.included(app);

  	app.import(app.bowerDirectory + '/highcharts/lib/highcharts.js');
  	app.import(app.bowerDirectory + '/highcharts/lib/highcharts-more.js');
  	app.import(app.bowerDirectory + '/highcharts/lib/highcharts-3d.js');
  	app.import(app.bowerDirectory + '/highcharts/lib/modules/map.js');
  	app.import(app.bowerDirectory + '/highcharts/lib/modules/exporting.js');
  	app.import(app.bowerDirectory + '/highcharts/lib/modules/no-data-to-display.js');
	  
  	app.import('vendor/highcharts/js/world.js');
  },
  isDevelopingAddon: function () {
  	return true;
  }
};
