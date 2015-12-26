import Ember from 'ember';

export default Ember.Route.extend({
    setupController (controller) {
        this._super.apply(this, arguments);
        var Config = {
            combinationChart: {
                chart: {},
                title: {
                    text: 'Combination chart'
                },
                xAxis: {
                    categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
                },
                labels: {
                    items: [{
                        html: 'Total fruit consumption',
                        style: {
                            left: '50px',
                            top: '18px',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    }]
                },
                series: [{
                    type: 'column',
                    name: 'Jane',
                    data: [3, 2, 1, 3, 4]
                }, {
                    type: 'column',
                    name: 'John',
                    data: [2, 3, 5, 7, 6]
                }, {
                    type: 'column',
                    name: 'Joe',
                    data: [4, 3, 3, 9, 0]
                }, {
                    type: 'spline',
                    name: 'Average',
                    data: [3, 2.67, 3, 6.33, 3.33],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }, {
                    type: 'pie',
                    name: 'Total consumption',
                    data: [{
                        name: 'Jane',
                        y: 13,
                        color: Highcharts.getOptions().colors[0] // Jane's color
                    }, {
                        name: 'John',
                        y: 23,
                        color: Highcharts.getOptions().colors[1] // John's color
                    }, {
                        name: 'Joe',
                        y: 19,
                        color: Highcharts.getOptions().colors[2] // Joe's color
                    }],
                    center: [100, 80],
                    size: 100,
                    showInLegend: false,
                    dataLabels: {
                        enabled: false
                    }
                }]
            },
            donut: {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: 'Contents of Highsoft\'s weekly fruit delivery'
                },
                subtitle: {
                    text: '3D donut in Highcharts'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'Delivered amount',
                    data: [
                        ['Bananas', 8],
                        ['Kiwi', 3],
                        ['Mixed nuts', 1],
                        ['Oranges', 6],
                        ['Apples', 8],
                        ['Pears', 4],
                        ['Clementines', 4],
                        ['Reddish (bag)', 1],
                        ['Grapes (bunch)', 1]
                    ]
                }]
            },
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
            },
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
