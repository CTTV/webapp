angular.module('facets')

    .factory('datatypeFacetParser', ['$log', 'cttvDictionary', 'cttvConsts', 'datasourceFacetParser', function($log, cttvDictionary, cttvConsts, datasourceFacetParser) {
        'use strict';



        var datatypes = [
            {key: cttvConsts.datatypes.GENETIC_ASSOCIATION, selected:true},
            {key: cttvConsts.datatypes.SOMATIC_MUTATION, selected:true},
            {key: cttvConsts.datatypes.KNOWN_DRUG, selected:true},
            {key: cttvConsts.datatypes.AFFECTED_PATHWAY, selected:true},
            {key: cttvConsts.datatypes.RNA_EXPRESSION, selected:true},
            {key: cttvConsts.datatypes.LITERATURE, selected:true},
            {key: cttvConsts.datatypes.ANIMAL_MODEL, selected:false}
        ];



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
            var f = datatypes.map( function(obj){
                var conf = {};
                var def = {};
                def[countsToUse] = {};
                var dtb = data.buckets.filter(function(o){return o.key===obj.key;})[0] || def;
                conf.key = obj.key;
                conf.label = cttvDictionary[obj.key.toUpperCase()] || "";
                conf.count = dtb[countsToUse].value; //dtb.doc_count;
                conf.enabled = dtb.key !== undefined; // it's actually coming from the API and not {}
                conf.selected = isSelected(collection, obj.key); // && conf.count>0;    // do we want to show disabled items (with count==0) as selected or not?
                conf.facet = collection;
                conf.collection = null;

                if(dtb.datasource){
                    // if there are subfilters, we pass those as a Collection config object with the parameter "filters"
                    conf.collection = {
                        filters: datasourceFacetParser.parse("datasources", dtb.datasource, countsToUse, undefined, isSelected )
                    }
                }

                /*.filter( function(obj){
                    // Use a filter function to keep only those returned by the API??
                    return obj.count>0;
                });*/

                return conf;
            });

            return f;
        }

        return parser;
    }])


