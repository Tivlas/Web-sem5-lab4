import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
    id: Number,
    name: String,
    country_id: Number,
    duration: {
        type: Number,
        enum: [1, 2, 4],
        required: true
    },
    description: String,
    departureDate: Date,
    price: {
        type: Number,
        min: [0, 'Price cannot be negative']
    },
});

TripSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

const Trip = mongoose.model('Trip', TripSchema);


export default Trip;