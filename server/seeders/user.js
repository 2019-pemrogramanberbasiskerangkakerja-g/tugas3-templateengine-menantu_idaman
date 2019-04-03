const user = require('../models').User;

module.exports = {
    seed() {
        user
            .create({
                username: 'arinanda',
                email: 'arinanda.adib@gmail.com',
                password: '$2y$12$.Oe5SKvZ1KpxCOI3G2YsMeLNO7pi6Of1KCk3Vdyo.iHS8Z.CYW4Pu.'
            }),
        user
            .create({
                username: 'ivan',
                email: 'ivanfadhb@gmail.com',
                password: '$2y$12$.Oe5SKvZ1KpxCOI3G2YsMeLNO7pi6Of1KCk3Vdyo.iHS8Z.CYW4Pu.'
            }),
        user
            .create({
                username: 'sidqi',
                email: 'sidqi@gmail.com',
                password: '$2y$12$.Oe5SKvZ1KpxCOI3G2YsMeLNO7pi6Of1KCk3Vdyo.iHS8Z.CYW4Pu.'
            })
    }
};