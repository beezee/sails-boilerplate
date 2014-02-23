var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');

function findById(id, fn){
	User.findOne(id).done(fn);
};

function findByUsername(u, fn) {
	User.findOne({username: u}).done(fn);
};

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(findById);

passport.use(new LocalStrategy(
	function(username, password, done) {
		process.nextTick(function() { 
			findByUsername(username, function(err, user){
				if (err) return done(null, err);
				if (!user) return done(null, false, {message: 'Unknown user '+username});
				bcrypt.compare(password, user.password, function(err, res){
					if (!res)
						return done(null, false, {message: 'Invalid password'});
					var returnUser = {
						username: user.username,
						createdAt: user.createdAt,
						id: user.id
					};
					return done(null, returnUser);
				});
			});
		});
	}
));
