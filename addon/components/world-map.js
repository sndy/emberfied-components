import Ember from 'ember';
import ConfigMixin from 'emberfied/mixins/map-config';

export default Ember.Component.extend(ConfigMixin, {
    title: null,
    type: null,
    dataSeriesName: null,
    setupMap: function () {
        if (this.get('type')) {
            var config = this.get('Config.' + this.get('type'));
            if (this.$('.map-area').highcharts()) {
                this.$('.map-area').highcharts().showLoading();
            }
            jQuery.getJSON(config.dataUrl, (data)=> {
                config.optionsConfig.series.every((item, i)=> {
                    if (item.name === this.get('dataSeriesName')) {
                        this.$('.map-area').highcharts('Map', JSON.parse(JSON.stringify(config.optionsConfig)));
                        this.$('.map-area').highcharts().series[i].setData(data, true, true, true);
                        this.$('.map-area').highcharts().hideLoading();
                        return false;
                    }
                    return true;
                });
            });
        }
    }.on('didInsertElement'),
    typeObserver: Ember.observer('type', function () {
        if (this.get('type')) {
            this.setupMap();
        }
    })
});
