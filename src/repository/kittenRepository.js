import KittenModel from "../models/kittenModel";
import FleaRepository from "./fleaRepository";
import _ from "underscore";

export default class kittenRepository {
    constructor() {
        this.kittenModel = KittenModel;
        this.fleaRepository = new FleaRepository();
    }

    getKittens() {
        return new Promise((resolve, reject) => {
            this.kittenModel.find({})
                .then(kittens => resolve(kittens))
                .catch(err => reject(err));
        });
    }

    getKittenByName(name) {
        return new Promise((resolve, reject) => {
            this.kittenModel.findOne({name: name})
                .then(kitten => resolve(kitten))
                .catch(err => reject(err));
        });
    }

    createKitten(kitten) {
        return new Promise((resolve, reject) => {
            this.kittenModel.create(kitten)
                .then(kitten => resolve(kitten))
                .catch(err => reject(err));
        });
    }

    updateKitten(name, object) {
        return new Promise((resolve, reject) => {
            this.getKittenByName(name)
                .then(kitten => {
                    if(_.isNull(kitten)) {
                        reject({erreur: 'Chaton introuvable'});
                    } else {
                        kitten.weight = (object.weight === null)? kitten.weight : object.weight;
                        kitten.colors.primary = (object.primaryColor === null)? kitten.colors.primary : object.primaryColor;
                        kitten.colors.secondary = (object.secondaryColor === null)? kitten.colors.secondary : object.secondaryColor;
                        kitten.save().then(kitten => resolve(kitten)).catch(err => reject(err));
                    }
                }).catch(err => reject(err));
        });
    }

    killKitten(name) {
        return new Promise((resolve, reject) => {
            this.kittenModel.remove({name: name})
                .then(msg => resolve(msg))
                .catch(err => reject(err));
        });
    }

    addFlea(kittenName, fleaName) {
        return new Promise((resolve, reject) => {
            this.getKittenByName(kittenName).then(kitten => {
                if(!_.isNull(kitten)) {
                    this.fleaRepository.getFleaByName(fleaName).then(flea => {
                        if(_.isNull(flea)) {
                            this.fleaRepository.createFlea(fleaName).then(flea => {
                                if(this.infestKitten(kitten, flea)) {
                                    kitten.save()
                                        .then(kitten => resolve(kitten))
                                        .catch(err => reject(err));
                                } else {
                                    reject({error: 'WTF you shouldn\'t be able to go here'});
                                }
                            }).catch(err => reject(err));
                        } else {
                            if(this.infestKitten(kitten, flea)) {
                                kitten.save().then(kitten => {
                                    resolve(kitten);
                                }).catch(err => reject(err));
                            } else {
                                reject({error: 'Erreur, la puce est déjà présente'});
                            }
                        }
                    }).catch(err => reject(err));
                } else {
                    reject({error: 'Le chaton n\'existe pas'});
                }
            }).catch(err => reject(err));
        });
    }

    infestKitten(kitten, flea) {
        const index = kitten.fleas.findIndex(fleaInArray => fleaInArray.name === flea.name);
        if (index === -1) {
            kitten.fleas.push(flea);
            return true
        } else {
            return false;
        }
    }

    removeFlea(kittenName, fleaName) {
        return new Promise((resolve, reject) => {
            this.getKittenByName(kittenName).then(kitten => {
                if(!_.isNull(kitten)) {
                    if(this.vermifugeKitten(kitten, fleaName)) {
                        kitten.save()
                            .then(kitten => resolve(kitten))
                            .catch(err => reject(err));
                    } else {
                        reject({error: 'Erreur, rien à vermifuger'})
                    }
                } else {
                    reject({error: 'Le chaton n\'existe pas'});
                }
            }).catch(err => reject(err));
        });
    }

    vermifugeKitten(kitten, fleaName) {
        const index = kitten.fleas.findIndex(fleaInArray => fleaInArray.name === fleaName);
        if (index !== -1) {
            kitten.fleas.splice(index, 1);
            return true
        } else {
            return false;
        }
    }
}
