import KittenModel from "../models/kittenModel";
import _ from "underscore";


export default class entrepriseHandler {
    constructor() {
        this.kittenModel = KittenModel;
    }

    getKittens() {
        return new Promise((resolve, reject) => {
            this.kittenModel.find({})
                .then(kittens => resolve(kittens))
                .catch(err => reject(err));
        });
    }

    getKittenById(id) {
        return new Promise((resolve, reject) => {
            this.kittenModel.findById(id)
                .then(kitten => resolve(kitten))
                .catch(err => reject(err));
        });
    }

    createKitten() {
        return new Promise((resolve, reject) => {
            this.kittenModel.create({name: 'fluffy'})
                .then(fluffy => resolve(fluffy))
                .catch(err => reject(err));
        });
    }
}
