
var firebaseAdmin = require('firebase');

module.exports = class FirebaseAdminNode {
    constructor(config) {
        if (!firebaseAdmin.apps.length) {
            firebaseAdmin.initializeApp(config.serviceAccountJson)

            this.core = firebaseAdmin;
            this.firestore = firebaseAdmin.firestore();
        } else {
            firebaseAdmin.app()
        }
    }

    onClose(removed, done) {
        let deletePromises = [];
        firebaseAdmin.apps.forEach((app) => {
            deletePromises.push(app.delete());
        });
        Promise.all(deletePromises)
            .then(() => {
                done()
            })
            .catch((e) => {
                console.log(e)
                done()
            });
    }
}