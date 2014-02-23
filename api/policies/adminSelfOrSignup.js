/**
 * adminSelfOrSignup
 *
 * @module      :: Policy
 * @description :: anyone on post, only allow current user for update/delete, nobody for get
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

	if (req.method === 'POST')
		return next();
	console.log(req.param('id'), JSON.stringify(req.user));
	if (!(req.user && req.user.id && req.param('id') && req.user.id !== req.param('id')))
		return res.forbidden('forbidden');
	return next();
};

