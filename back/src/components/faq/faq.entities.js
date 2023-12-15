import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
    id: Number,
    question: String,
    answer: String,
    postDate: {
        type: Date,
        default: Date.now,
    }
});

FaqSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

const Faq = mongoose.model('Faq', FaqSchema);


export default Faq;