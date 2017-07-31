;(function($) {

    $.fn.extend({
        weatherapi: function(options) {
            var defaultOptions = {
                tempValueElement: $(this).find('.temp-value'),
                tempScaleSeletor: $(this).find('.temp-scale'),
                weatherIconElement: $(this).find('.weather-icon'),
                appid: '6deb4af898f6436899a76f4587001dd4',
                unit: 'Celcius'
            };

            var tempScaleValue = {
                'Celcius': 'metric',
                'Fahrenheit': 'imperial'
            };

            var weatherIconMap = {
                '01d': 'wi-day-sunny',
                '02d': 'wi-day-cloudy',
                '03d': 'wi-cloudy',
                '04d': 'wi-smoke',
                '09d': 'wi-showers',
                '10d': 'wi-day-showers',
                '11d': 'wi-thunderstorm',
                '13d': 'wi-snow',
                '50d': 'wi-fog',

                '01n': 'wi-night-sunny',
                '02n': 'wi-night-cloudy',
                '03n': 'wi-cloudy',
                '04n': 'wi-smoke',
                '09n': 'wi-showers',
                '10n': 'wi-night-showers',
                '11n': 'wi-thunderstorm',
                '13n': 'wi-snow',
                '50n': 'wi-fog'
            };

            $.extend(defaultOptions, options);

            fetchWeatherApi();            


            // SCALE SELECTOR
            var scaleSelector = $(this).find('.temp-scale>ul');

            $(scaleSelector).click(function(){
                $(this).find('li').toggleClass('active');

                var scale = $(this).find('li.active').attr('title');

                fetchWeatherApi(scale);

            });           
            
            // FETCH WEATHER
            function fetchWeatherApi( unit ) {

                var unitMetric = (unit == undefined)? tempScaleValue[defaultOptions.unit]: tempScaleValue[unit];

                var url = "http://api.openweathermap.org/data/2.5/weather?lat="+ defaultOptions.lat +
                    "&lon="+ defaultOptions.long +
                    "&units="+ unitMetric +
                    "&appid="+ defaultOptions.appid;

                $.ajax({
                    "method": "GET",
                    "url": url
                }).done(function(res){
                    var temp = res.main.temp;
                    var icon = res.weather[0].icon;
                    var iconHtml = '<i class="wi '+ weatherIconMap[icon] +'"></i>';
                    $(defaultOptions.tempValueElement).html( Math.round( temp * 10 ) / 10 );
                    $(defaultOptions.weatherIconElement).html(iconHtml);
                });
            }
        }
    });

    $(document).ready(function() {

        $('#weather-widget').weatherapi({
            lat: 24.0410304,
            long: 84.0629977
        });

        
    });

})(jQuery);