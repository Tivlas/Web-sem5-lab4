import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    id: Number,
    title: String,
    briefDescription: String,
    url: {
        type: String,
        validate: {
            validator: function (value) {
                const urlRegex = /^(http|https):\/\/[^ "]+$/;
                return urlRegex.test(value);
            },
            message: 'Invalid URL format'
        }
    }
});

NewsSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

const News = mongoose.model('News', NewsSchema);


export default News;