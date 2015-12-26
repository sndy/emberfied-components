import Ember from 'ember';
import layout from '../templates/components/sndy-chart';

export default Ember.Component.extend({
    layout: layout,
    renderTo: null,
    didInsertElement () {
        this.$('#' + this.get('renderTo')).highcharts('Chart', this.get('config'));
        this._super();
    }
});