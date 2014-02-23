/**
 * onlyPost
 *
 * @module      :: Policy
 * @description :: Only allows POST
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

	if (req.method !== 'POST')
		return res.forbidden('forbidden');
};

