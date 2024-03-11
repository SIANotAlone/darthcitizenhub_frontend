<template>
    <div class="statistics">
        <h1 class="page_title">Статистика</h1>
        <div class="wrapper">

            <div class="block">
                <span class="card_title">Всього зібрано</span>
                <p class="count"> {{ statistics['main']['games_news'] }}</p>

            </div>

            <div class="block">
                <span class="card_title">За 30 днів</span>
                <p class="count"> {{ statistics['main']['last_30day'] }} </p>

            </div>
            <div class="block">
                <span class="card_title">Цього місяця</span>
                <p class="count"> {{ statistics['main']['this_month_from_first'] }} </p>

            </div>
            <div class="block">
                <span class="card_title">Усього джерел</span>
                <p class="count"> {{ statistics['main']['origins'] }} </p>

            </div>
            <div class="block">
                <span class="card_title">Всього випусків</span>
                <p class="count"> {{ statistics['main']['episodes'] }} </p>

            </div>
            <div class="block">
                <span class="card_title">Релізів</span>
                <p class="count"> {{ statistics['main']['episodes_released'] }} </p>

            </div>
            <div class="block">
                <span class="card_title">Новин у релізах</span>
                <p class="count"> {{ statistics['main']['notations'] }} </p>

            </div>
            <div class="block">
                <span class="card_title">Новин видалено</span>
                <p class="count"> {{ statistics['main']['deleted_notations'] }} </p>

            </div>
        </div>
        <h4>Youtube</h4>
        <div class="wrapper">
            <div class="block">
                <span class="card_title">Кіл-ть переглядів</span>
                <p class="count"> {{ youtube['viewCount'] }} </p>

            </div>
            <div class="block">
                <span class="card_title">Кіл-ть підписок</span>
                <p class="count"> {{ youtube['subscriberCount'] }} </p>

            </div>

        </div>

        <div style="display: flex; max-width: 150px; ">
            <div class="apex_chart">
                <h4>Новин по джерелу</h4>
                <div class="chart_pie_wrapper">
                    <div id="chart_pie"></div>
                </div>
            </div>
            <div class="apex_chart">
                <h4>В цьому місяці</h4>
                <div class="chart_pie_wrapper">
                    <div id="chart_pie_this_month"></div>
                </div>
            </div>
            <div class="apex_chart">
                <h4>Топ джерел в релізах</h4>
                <div class="chart_pie_wrapper">
                    <div id="chart_pie_released"></div>
                </div>
            </div>
        </div>


        <div class="apex_chart">
            <h4>Новин за останні 12 місяців</h4>
            <div id="chart"></div>
        </div>



    </div>
</template>

<script>
import axios from 'axios';

import server_ip from "@/myconfig/ipconfig.js"
import ApexCharts from 'apexcharts'


export default {
    data() {
        return {
            statistics: {
                main: {

                },
                by_month: {

                },
                by_origin: {
                    origins: [],
                    count: []
                },
                by_origin_this_month: {
                    origins: [],
                    count: []
                },
                by_origin_in_released:{
                    origin: [],
                    count: []
                }
            },
            series: [{

            }],
            months: [],
            count: [],
            youtube: {}


        }
    },
    methods: {},
    mounted() {
        axios.get(server_ip + '/statistics').then(response => {
            this.statistics = response.data
            this.statistics.by_month.forEach(item => {
                this.months.push(item['month_name'] + " " + item['year'])
                this.count.push(item['count_news'])
            });

            var options_pie = {
                series: this.statistics.by_origin.count,
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: this.statistics.by_origin.origins,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };
            var options_pie_this_month = {
                series: this.statistics.by_origin_this_month.count,
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: this.statistics.by_origin_this_month.origins,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };
            var options_pie_released = {
                series: this.statistics.by_origin_in_released.count,
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: this.statistics.by_origin_in_released.origin,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };
            var chart_pie = new ApexCharts(document.querySelector("#chart_pie"), options_pie);
            chart_pie.render();
            var this_months = new ApexCharts(document.querySelector("#chart_pie_this_month"), options_pie_this_month);
            this_months.render();
            var released = new ApexCharts(document.querySelector("#chart_pie_released"), options_pie_released);
            released.render();

            var options = {
                series: [{
                    name: 'Новин зібрано',
                    data: this.count
                }],
                chart: {
                    type: 'bar',
                    height: 350,

                },

                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: this.months,
                },
                yaxis: {
                    title: {
                        text: 'Новин зібрано'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                }
            };

            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();

        })


        
        axios.get(server_ip + '/statistics/youtube').then(response => {
            this.youtube = response.data

        });


    }

}



</script>

<style scoped>
.statistics {

    background-color: #ededed;
}

.apex_chart {
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 20%;
    margin-right: 20%;
}


.block {
    padding: 5px;
    height: 150px;
    background-color: aliceblue;
    width: 150px;
    margin-left: 20px;
    border-radius: 10%;

    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1.5s ease-out forwards;

}

.card_title,
.count {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1.5s ease-out forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.count {
    margin-top: 40px;
    align-self: center;
    font-size: larger;
    font-weight: 700;


}

.wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;

}

.page_title {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-top: 20px;
}

.card_title {
    font-size: small;
    text-align: left;
}

.chart_pie_wrapper {
    display: flex;
    justify-content: center;
}

.pie_wrapper {
    display: flex;
}
</style>