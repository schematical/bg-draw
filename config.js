module.exports = {
    app_dir: __dirname,
    cache_dir: __dirname + '/_test',
    port:3030,
    aws:{
        accessKeyId:'x',
        secretAccessKey:'xxxx',
        bucket_name:'byobob',
        associateId:'holiday_helper-20'
    },
    postmark:{
        api_key:'7510dc07-9252-11e3-a73b-0025909414ec',
        from_address:'mlea@schematical.com'
    },
    stripe:{
        private_api_key:'sk_sk3VF1S2GK9kwsa8PfLkQNWfma5pD',
        public_api_key:'pk_RXEN6DBtQiZeFKULC66vTD2ycP0hJ'
    }
}