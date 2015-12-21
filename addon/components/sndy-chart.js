import Ember from 'ember';
import ConfigMixin from 'emberfied/mixins/chart-config';

export default Ember.Component.extend(ConfigMixin, {
    renderTo: null,
    setupChart: function () {
        var config = this.get('Config.' + this.get('type'));
        this.$('#' + this.get('renderTo')).highcharts('Chart', config);
    }.on('didInsertElement')
});
