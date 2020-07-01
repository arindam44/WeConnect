const admin = require('../../functions/adminConfig');
let user = require('../../Models/users.model');

let idToken;

const verifyAuth = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
        
    }
    else {
        console.error('No token found');
        return res.status(403).json({ error: 'Unauthorized' });
    }
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            user.findOne({ "fbAuthId": req.user.uid })
                .then(data => {
                     req.user.userHandle = data.userHandle;
                     req.user.imageUrl = data.imageUrl;
                     return next();
                })  
        })
        .catch(err => {
            console.error('Error while verifying token!');
            return res.status(403).json({ 'error': 'Error while verifying token!'});
        })
};

module.exports = verifyAuth;