import FleaModel from "../models/fleaModel";

export default class fleaRepository {
    constructor() {
        this.speciesModel = FleaModel.mongooseSchema;
    }

    getFleas() {
        return new Promise((resolve, reject) => {
            this.speciesModel.find({})
                .then(fleas => resolve(fleas))
                .catch(err => reject(err));
        });
    }

    getFleaByName(name) {
        return new Promise((resolve, reject) => {
            this.speciesModel.findOne({name: name})
                .then(flea => resolve(flea))
                .catch(err => reject(err));
        });
    }

    createFlea(name) {
        return new Promise((resolve, reject) => {
            this.speciesModel.create({name: name, number: 0})
                .then(flea => resolve(flea))
                .catch(err => reject(err));
        });
    }

    killFlea(name) {
        return new Promise((resolve, reject) => {
            this.speciesModel.remove({name: name})
                .then(msg => resolve(msg))
                .catch(err => reject(err));
        });
    }
}
