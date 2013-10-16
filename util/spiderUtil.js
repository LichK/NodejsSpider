var http = require('http'),
    request = require('request');

var spiderUtil = {
    /**
     * GET
     * 
     * @param  {[type]} url
     * @param  {[type]} options {
     *                              onError: function(response),
     *                              onSuccess: function(body)
     *                          }
     * @return {[type]}
     */
    get: function(url, options) {
        request(url, function(error, response, body) {
            if(error) {
                options.onError(response);
            } else {
                options.onSuccess(body);
            }
        });
    }
};

module.export = spiderUtil;