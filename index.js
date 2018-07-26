var jwt = require('jwt_module');

module.exports.checkRole = (roles) => {
    return (req, res, next) => {
        var token = req.get('Authorization');
        if(token == null) 
            next({
                status: 401,
                message: 'unathorized'
            });
        else {
            jwt.verifyToken(token).then((tokenData) => {
                console.log(tokenData);
                req.tokenData = tokenData;
                if(roles.includes(tokenData.role))
                    next();
                else if(roles.includes('OWNER') && tokenData.userId == req.params.id)
                    next();
                else 
                    next({
                        status: 401,
                        message: 'unathorized'
                    });
            }).catch((err) => {
                next({
                    status: 401,
                    message: 'unathorized'
                });
            });
        }
    };
};