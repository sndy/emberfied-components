import Ember from 'ember';
import layout from '../templates/components/world-map';
import ConfigMixin from 'emberfied-components/mixins/map-config';

export default Ember.Component.extend(ConfigMixin, {
    layout: layout,
    title: null,
    type: null,
    dataSeriesName: null,
    drawMap () {
        if (this.get('type')) {
            var config = this.get('Config.' + this.get('type'));
            if (this.$().highcharts()) {
                this.$().highcharts().showLoading();
            }
            jQuery.getJSON(config.dataUrl, (data)=> {
                config.optionsConfig.series.every((item, i)=> {
                    if (item.name === this.get('dataSeriesName')) {
                        this.$().highcharts('Map', JSON.parse(JSON.stringify(config.optionsConfig)));
                        this.$().highcharts().series[i].setData(data, true, true, true);
                        this.$().highcharts().hideLoading();
                        return false;
                    }
                    return true;
                });
            });
        }
    },
    didInsertElement () {
        this.drawMap();
        this._super();
    },
    typeObserver: Ember.observer('type', function () {
        if (this.get('type')) {
            this.drawMap();
        }
    })
});
