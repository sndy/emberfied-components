import Ember from 'ember';

export default Ember.Mixin.create({
    Config: {
        worldPopulationDensity: {
            dataUrl: 'https://www.highcharts.com/samples/data/jsonp.php?filename=world-population-density.json&callback=?',
            optionsConfig: {
                chart : {
                    borderWidth : 1
                },
                title : {
                    text : 'Map Component'
                },
                credits: {
                    enabled: false
                },
                loading: {
                    hideDuration: 1000,
                    showDuration: 1000,
                    labelStyle: {
                        color: 'white'
                    },
                    style: {
                        backgroundColor: 'gray'
                    }
                },
                mapNavigation: {
                    enabled: true,
                    enableDoubleClickZoomTo: true
                },
                colorAxis: {
                    min: 1,
                    max: 1000,
                    type: 'logarithmic'
                },
                series : Ember.A([{
                    mapData: Highcharts.maps['custom/world'],
                    joinBy: ['iso-a2', 'code'],
                    name: 'Population density',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    },
                    tooltip: {
                        valueSuffix: '/km²'
                    }
                }])
            }
        },
        worldPopulationBubble: {
            dataUrl: 'https://www.highcharts.com/samples/data/jsonp.php?filename=world-population.json&callback=?',
            optionsConfig: {
                chart : {
                    borderWidth : 1
                },
                loading: {
                    hideDuration: 1000,
                    showDuration: 1000,
                    labelStyle: {
                        color: 'white'
                    },
                    style: {
                        backgroundColor: 'gray'
                    }
                },
                title: {
                    text: 'World population 2013 by country'
                },
                subtitle : {
                    text : 'Demo of World map with bubbles'
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
                series : Ember.A([{
                    name: 'Countries',
                    color: '#E0E0E0',
                    enableMouseTracking: false,
                    mapData: Highcharts.geojson(Highcharts.maps['custom/world'])
                }, {
                    type: 'mapbubble',
                    mapData: Highcharts.geojson(Highcharts.maps['custom/world']),
                    name: 'Population 2013',
                    joinBy: ['iso-a2', 'code'],
                    minSize: 4,
                    maxSize: '12%',
                    tooltip: {
                        pointFormat: '{point.code}: {point.z} thousands'
                    }
                }])
            }
        },
        worldMapFixedTooltip: {
            dataUrl: 'https://www.highcharts.com/samples/data/jsonp.php?filename=world-population-density.json&callback=?',
            optionsConfig: {
                chart : {
                    borderWidth : 1
                },
                loading: {
                    hideDuration: 1000,
                    showDuration: 1000,
                    labelStyle: {
                        color: 'white'
                    },
                    style: {
                        backgroundColor: 'gray'
                    }
                },
                title: {
                    text: 'Fixed tooltip with HTML'
                },
                legend: {
                    title: {
                        text: 'Population density per km²',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    }
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },
                tooltip: {
                    backgroundColor: 'none',
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    padding: 0,
                    pointFormat: '<span class="f32"><span class="flag {point.flag}"></span></span>' +
                    ' {point.name}: <b>{point.value}</b>/km²',
                    positioner: function () {
                        return { x: 0, y: 250 };
                    }
                },
                colorAxis: {
                    min: 1,
                    max: 1000,
                    type: 'logarithmic'
                },
                series : Ember.A([{
                    mapData: Highcharts.maps['custom/world'],
                    joinBy: ['iso-a2', 'code'],
                    name: 'Population density Fixed HTML',
                    states: {
                        hover: {
                            color: '#BADA55'
                        }
                    }
                }])
            }
        }
    }
});
