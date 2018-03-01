import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const KittenSchema = new Schema(
    {
        name: {type: String, required: true},
        weight: {type: String, required: true},
        birth: {type: Date, required: false},
        colors: [{
            primary: {type: String},
            secondary: {type: String}
        }]
    });

KittenSchema.methods.speak = () => {
    console.log(this.name);
};

module.exports = mongoose.model('Kitten', KittenSchema);