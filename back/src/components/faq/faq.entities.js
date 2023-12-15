import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
    id: Number,
    question: String,
    answer: String,
    postDate: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function (value) {
                return value >= this.postDate;
            },
            message: 'Post date must not be earlier than the current date.'
        }
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