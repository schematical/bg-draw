
    var PrintfulClient = require('./printfulclient.js');

    //
    // Replace this with your API key
    //
    var key = 'YOUR_API_KEY';

    /**
     * Callback for success
     * data - result element from the API response
     * info - additional data about the request and response
     */
    var ok_callback = function(data, info){
        console.log('SUCCESS');
        console.log(data);
        //If response includes paging information, show total number available
        if(info.total_items){
            console.log('Total items available: '+info.total_items);
        }
    }

    /**
     * Callback for failure
     * data - error message
     * info - additional data about the request
     */
    var error_callback = function(message, info){
        console.log('ERROR ' + message);
        //Dump raw response
        console.log(info.response_raw);
    }

    ///Construct client
    var pf = new PrintfulClient(key);

    //
    //Uncomment any of the following examples to test it
    //

    //Get information about the store
    //pf.get('store').success(ok_callback).error(error_callback);

    //Get product list
    //pf.get('products').success(ok_callback).error(error_callback);

    //Get variants for product 10
    //pf.get('products/10').success(ok_callback).error(error_callback);

    //Get information about Variant 1007
    //pf.get('products/variant/1007').success(ok_callback).error(error_callback);

    //Select 10 latest orders and get the total number of orders
    //pf.get('orders',{limit: 10}).success(ok_callback).error(error_callback);

    //Select order with ID 12345 (Replace with your order's ID)
    //pf.get('orders/12345').success(ok_callback).error(error_callback);

    //Select order with External ID 9900999 (Replace with your order's External ID)
    //pf.get('orders/@9900999').success(ok_callback).error(error_callback);

    //Confirm order with ID 12345 (Replace with your order's ID)
    //pf.post('orders/12345/confirm').success(ok_callback).error(error_callback);

    //Cancel order with ID 12345 (Replace with your order's ID)
    //pf.delete('orders/23479').success(ok_callback).error(error_callback);

    //Create an order
/*
    pf.post('orders',
        {
            recipient:  {
                name: 'John Doe',
                address1: '172 W Providencia Ave //105',
                city: 'Burbank',
                state_code: 'CA',
                country_code: 'US',
                zip: '91502'
            },
            items: [
                {
                    variant_id: 1, //Small poster
                    name: 'Niagara Falls poster', //Display name
                    retail_price: '19.99', //Retail price for packing slip
                    quantity: 1,
                    files: [
                        {url: 'http://example.com/files/posters/poster_1.jpg'}
                    ]
                },
                {
                   variant_id: 1118,
                   quantity: 2,
                   name: 'Grand Canyon T-Shirt', //Display name
                   retail_price: '29.99', //Retail price for packing slip
                   files: [
                        {url: 'http://example.com/files/tshirts/shirt_front.ai'}, //Front print
                        {type: 'back', url: 'http://example.com/files/tshirts/shirt_back.ai'}, //Back print
                        {type: 'preview', url: 'http://example.com/files/tshirts/shirt_mockup.jpg'} //Mockup image
                   ],
                   options: [ //Additional options
                        {id: 'remove_labels', value: true}
                   ]
                }
            ]
         }
    ).success(ok_callback).error(error_callback);
*/

    //Create an order and confirm immediately
/*
    pf.post('orders',
        {
            recipient:  {
                name: 'John Doe',
                address1: '172 W Providencia Ave //105',
                city: 'Burbank',
                state_code: 'CA',
                country_code: 'US',
                zip: '91502'
            },
            items: [
                {
                    variant_id: 1, //Small poster
                    name: 'Niagara Falls poster', //Display name
                    retail_price: '19.99', //Retail price for packing slip
                    quantity: 1,
                    files: [
                        {url: 'http://example.com/files/posters/poster_1.jpg'}
                    ]
                }
            ]
        },
        {confirm: 1}
    ).success(ok_callback).error(error_callback);
*/

    //Calculate shipping rates for an order
/*
    pf.post('shipping/rates',{
        recipient: {
            country_code: 'US',
            state_code: 'CA'
        },
        items: [
           {variant_id: 1,  quantity: 1}, //Small poster
           {variant_id: 1118, quantity: 2} //Alternative T-Shirt
        ]
    }).success(ok_callback).error(error_callback);
*/
