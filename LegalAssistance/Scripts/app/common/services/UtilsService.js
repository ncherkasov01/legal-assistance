﻿(function () {
    'use strict';

    angular
        .module('LASite.common')
        .factory("UtilsService", UtilsService);

    function UtilsService() {
        var factory = {
            init: function () {
                angular.utils = utils;
            }
        }

        var utils = {
            buildSentence: function () {
                var args = arguments;
                var result = '';

                for (var i = 0; i < arguments.length; i++) {
                    if (utils.isNotNullOrEmpty(arguments[i])) {
                        result += '{0}, '.format(arguments[i]);
                    }
                }

                if (utils.isNotNullOrEmpty(result)) {
                    result = result.substring(0, result.length - 2);
                }

                return result;
            },

            isNotNullOrEmpty: function (value) {
                return !(value === null || value === undefined || value === '');
            },

            toDate: function (date) {
                return '{0}.{1}.{2}'.format(date.getDate(), date.getMonth() + 1, date.getFullYear());
            },

            toRub: function (value) {
                var str = value.toString();
                var lastNumber = parseInt(str.substring(str.length - 1));
                var template = value + ' {0}';

                if (lastNumber == 1) {
                    return template.format('рубль');
                } else if ((value < 10 || value >= 20) && (lastNumber == 2 || lastNumber == 3 || lastNumber == 4)) {
                    return template.format('рубля')
                } else {
                    return template.format('рублей');
                }

            },

            getDatePeriod: function (startDate, endDate) {
                // get total seconds between the times
                var delta = Math.abs(endDate.getTime() - startDate.getTime()) / 1000;

                // calculate (and subtract) whole days
                var days = Math.floor(delta / 86400);
                delta -= days * 86400;

                // calculate (and subtract) whole hours
                var hours = Math.floor(delta / 3600) % 24;
                delta -= hours * 3600;

                // calculate (and subtract) whole minutes
                var minutes = Math.floor(delta / 60) % 60;

                var model = {
                    days: days,
                    hours: hours,
                    minutes: minutes
                };

                return model;
            }
        }

        //Prototype utils
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                  ? args[number]
                  : match
                ;
            });
        };

        return factory;
    }
})();

