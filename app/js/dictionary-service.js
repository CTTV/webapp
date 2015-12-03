'use strict';


/* Services */

angular.module('cttvServices').



    /**
     * The API services, with methods to call the ElasticSearch API
     */
    factory('cttvDictionary', ['$log', function($log) {

        var dictionary = {


            // A
            AFFECTED_PATHWAY :               "Affected pathways",
            ANIMAL_MODEL :                   "Animal models",
            ASSOCIATION_SCORE :              "Association score",

            // B
            // C
            CANCER_GENE_CENSUS :             "Cancer Gene Census",
            CHEMBL :                         "CHEMBL",
            COMMON_DISEASES :                "Common diseases",
            CTTV_PIPELINE :                  "CTTV pipeline",

            // D
            DATA_DISTRIBUTION :              "Data distribution",
            DATATYPES :                      "Datatypes",
            DISEASE :                        "Disease",
            DISGENET :                       "DisGeNET",

            // E
            ENSEMBL_ID :                     "Ensembl ID",
            EPMC :                           "Europe PMC",
            EXPRESSION_ATLAS :               "Expression Atlas",
            EVA :                            "European Variation Archive (EVA)",
            EVA_SOMATIC :                    "European Variation Archive (EVA)",
            EXP_DISEASE_ASSOC_LABEL :        "targets_associated_with_",
            EXP_TARGET_ASSOC_LABEL :         "diseases_associated_with_",

            // F
            // G
            GENETIC_ASSOCIATION :            "Genetic associations",
            GWAS :                           "GWAS catalog",

            // H
            // I
            // J
            // K
            KNOWN_DRUG :                     "Drugs",

            // L
            LITERATURE :                     "Text mining",

            // M
            MOUSE_MODEL :                    "Animal models",

            // N
            NA :                             "N/A",
            NO_DATA :                        "No data",

            // O
            // P
            PHENODIGM :                      "Phenodigm",

            // Q
            // R
            RARE_DISEASES :                  "Rare diseases",
            REACTOME :                       "Reactome",
            RNA_EXPRESSION:                  "RNA expression",

            // S
            SCORE :                          "Association strength", //confidence", // "Score",
            SOMATIC_MUTATION :               "Somatic mutations",

            // T
            TARGET_NAME :                    "Target name",
            TARGET_SYMBOL :                  "Target symbol",
            THERAPEUTIC_AREA :               "Therapeutic area",

            // U
            UNIPROT :                        "UniProt",
            UNIPROT_LITERATURE:              "UniProt literature",
            UP_OR_DOWN:                      "unclassified",

            // V
            // W
            // X
            // Y
            // Z

        };


        dictionary.get = function(w){
            //return en[w] || undefined;
        }

        dictionary.invert = function(val){
            var a = invLookup(dictionary, val);
            return a;
        }

        function invLookup(o ,v){
            var k = undefined;
            for(var i in o){
                if(o.hasOwnProperty(i)){
                    //$log.log(v+") "+i+" = "+o[i]);
                    if(o[i]==v){
                        k = i;
                        //$log.log("   "+k);
                        return k;
                    }
                    if( typeof o[i] == 'object' ){
                        k = invLookup(o[i],v);
                        if(k){return k;}
                    }
                }
            }
            return k;
        }

        return dictionary;
    }]);


