import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
    id: Number,
    name: String
});

CountrySchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

const Country = mongoose.model('Country', CountrySchema);


export default Country;