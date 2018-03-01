import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FleaSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
    });

// Tricks pour pouvoir nester les schemas
const handler = {
    usualSchema: FleaSchema,
    mongooseSchema: mongoose.model('Flea', FleaSchema)
};

module.exports = handler;