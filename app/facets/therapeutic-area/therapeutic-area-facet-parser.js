angular.module('facets')

    .factory('therapeuticAreaFacetParser', ['$log', 'cttvDictionary', 'cttvConsts', 'datasourceFacetParser', function($log, cttvDictionary, cttvConsts, datasourceFacetParser) {
        'use strict';



        var parser = {}

        /**
         * Parse function
         * Every FacetParser *must* expose a parse().
         * The function essentially maps and returns the filters (values) for a specific collection
         * (i.e. a facet, like the datatype facet or score distribution facet).
         *
         * Parser function must take the following parameters:
         *     collection [String] the type/id of facet, e.g. "datatype"
         *     data [Object] the data object for this facet (from the API)
         *     countsToUse [String] e.g. "unique_disease_count"
         *     options [Object] this contains "heading" and "open" options
         *     isSelected [Function] this is the FiltersService.isSelected(). The problem is we cannot reference the FiltersService here (circular dependency)
         *
         * It returns an Array of filters.
         */
        parser.parse = function(collection, data, countsToUse, options, isSelected){

            // array of filters
            var f = data.buckets.map( function(obj){
                var conf = {};
                conf.key = obj.key;
                conf.label = obj.label;
                conf.count = obj[countsToUse].value;
                conf.facet = collection;
                conf.collection = null;
                conf.selected = isSelected(collection, obj.key);
                return conf;
            });

            return f;
        }

        return parser;
    }])


