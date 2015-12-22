import Ember from 'ember';
import layout from '../templates/components/sndy-chart';
import ConfigMixin from 'emberfied-components/mixins/chart-config';

export default Ember.Component.extend(ConfigMixin, {
    layout: layout,
    renderTo: null,
    didInsertElement () {
        var config = this.get('Config.' + this.get('type'));
        this.$('#' + this.get('renderTo')).highcharts('Chart', config);
        this._super();
    }
});