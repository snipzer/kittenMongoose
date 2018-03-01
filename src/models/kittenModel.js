import mongoose from 'mongoose';
import FleaModel from './fleaModel';

const fleaModel = FleaModel.usualSchema;

const Schema = mongoose.Schema;

const KittenSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        weight: {type: Number, required: true},
        birth: {type: Date},
        colors: {
            primary: {type: String},
            secondary: {type: String}
        },
        fleas: [{type: fleaModel, unique: true}]
    });

KittenSchema.methods.speak = () => {
    console.log(`My name is ${this.name}`);
};

module.exports = mongoose.model('Kitten', KittenSchema);