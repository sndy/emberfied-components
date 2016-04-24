/* jshint node: true */
'use strict';

var path = require('path'),
    mergeTrees = require('broccoli-merge-trees'),
    Funnel = require('broccoli-funnel'),
    fs = require('fs'), self = {},
    appRef;
    
module.exports = {
  name: 'emberfied-components',
  // treeForPublic: function (tree) {
  //       var extras, treePath;

  //       tree = this._super.treeForPublic.call(this, tree);

  //       treePath = path.join('addon', 'styles');
  //       if (fs.existsSync(treePath) !== true) {
  //           treePath = path.join('addon', 'styles');
  //       }

  //       extras = new Funnel(treePath, {
  //           srcDir: '/',
  //           include: ['*.*'],
  //           destDir: '/assets'
  //       });

  //       return mergeTrees([tree, extras]);
  //   },
    treeFor: function (type) {
        var pkgPath = path.join(process.cwd(), 'package.json'),
            pkg = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' })),
            env = process.env.EMBER_ENV || 'development';
        if (env === 'production') {
            if (pkg.includeDevDepsAddonInProdBuild === true) {
                return this._super.treeFor.apply(this, [type]);
            }
        } else {
            return this._super.treeFor.apply(this, [type]);
        }
    },
  included: function(app) {
    var modulePath;

  	app.import(app.bowerDirectory + '/highcharts/lib/highcharts.js');
  	app.import(app.bowerDirectory + '/highcharts/lib/highcharts-more.js');
  	app.import(app.bowerDirectory + '/highcharts/lib/highcharts-3d.js');
  	app.import(app.bowerDirectory + '/highcharts/lib/modules/map.js');
  	app.import(app.bowerDirectory + '/highcharts/lib/modules/exporting.js');
  	app.import(app.bowerDirectory + '/highcharts/lib/modules/no-data-to-display.js');
	  
  	app.import('vendor/highcharts/js/world.js');

    modulePath = path.relative(app.project.root, __dirname);
    app.options.sassOptions = app.options.sassOptions || {};
    app.options.sassOptions.includePaths = app.options.sassOptions.includePaths || [];

    console.log(path.join(modulePath, 'addon', 'styles'));
    app.options.sassOptions.includePaths.push(path.join(modulePath, 'addon', 'styles'));

    this._super.included(app);
  },
  isDevelopingAddon: function () {
  	return true;
  }
};

