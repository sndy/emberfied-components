import Ember from 'ember';

export default Ember.Route.extend({
    setupController (controller) {
        this._super.apply(this, arguments);
        var Config = {
            selectedMap: {id: 'worldPopulationDensity', text: 'Population density', description: 'Map Component'},
            mapTypes: Ember.A([{
                id: "worldPopulationDensity",
                text: "Population density",
                description: "Population Density Map"
            }, {
                id: "worldPopulationBubble",
                text: "Population 2013",
                description: "World Population Bubble Map"
            }, {
                id: "worldMapFixedTooltip",
                text: "Population density Fixed HTML",
                description: "Population density Fixed HTML"
            }])
        };
        Config = Ember.Object.create(Config);
        controller.set('Config', Config);
        controller.set('selectedMap', Config.selectedMap);
    }
});
