import Ember from 'ember';
import layout from '../templates/components/select-box';

export default Ember.Component.extend({
    layout: layout,
    action: null,
    select2Instance: null,
    didInsertElement () {
        var select2 = this.getSelect2Instance(), _this = this;
        select2.onSelect = function (onSelect) {
            return function (model) {
                _this.bindAction(model);
                onSelect.apply(this, arguments);
            };
        }(select2.onSelect);
        this._super();
    },
    getSelect2Instance () {
        if (Ember.isEmpty(this.select2Instance)) {
            this.select2Instance = this.$().find('input.form-control').data('select2');
        }

        return this.select2Instance;
    },
    bindAction (model) {
        var action = this.get('action');
        if (action) {
            this.sendAction('action', model);
        }
    }
});
