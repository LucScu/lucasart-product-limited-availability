define([
    'jquery',
    'Magento_Swatches/js/swatch-renderer'
], function ($) {

    var selectedOptions = {};
    var swatchChild = {};

    var _getSelectedChild = function () {

        // attributes
        var allOptionsSelected = true;

        $('div.swatch-attribute').each(function () {

            if (Object.keys(selectedOptions).indexOf($(this).attr('attribute-id')) == '-1' ) {
                allOptionsSelected = false;
            }

        });


        //
        if (!allOptionsSelected ) {
            return false;
        } else {
            var selectedChild,
            obj1,
            obj2;

            for (var property in swatchChild) {
                obj1 = JSON.stringify(swatchChild[property]);
                obj2 = JSON.stringify(selectedOptions)

                if (obj1 === obj2 ) {
                    var selectedChildId = property;
                    return selectedChildId;
                }
            }
        }

    }

    var stockStatusLabelComponent = function (options) {

        console.log(options);



        if (options.productData.type == 'configurable' ) {
            // console.log('configurable');

            swatchChild = options.swatchOptions.index;
            var childs = options.productData.childs;

            $('.swatch-option').on('click', function () {

                var attributeId = $(this).closest('.swatch-attribute').attr('attribute-id');
                var optionId = $(this).attr('option-id');
                selectedOptions[attributeId] = optionId;

                // recupero il child in base alle opzioni selezionate
                var selectedChild = _getSelectedChild();

                if (selectedChild ) {
                    var stock_status = childs[selectedChild];
                    $('#stock_status_label').removeClass();
                    $('#stock_status_label').addClass(stock_status);
                    $('#stock_status_label').html(options.labels[stock_status]);
                }

            });
        } else if (options.productData.type == 'simple' ) {
            // console.log('simple');

            var sku = options.productData.sku;
            var stock_status = options.productData.stock_status;
            $('#stock_status_label').addClass(stock_status);
            $('#stock_status_label').html(options.labels[stock_status]);
        }

    }

    return stockStatusLabelComponent;

});
