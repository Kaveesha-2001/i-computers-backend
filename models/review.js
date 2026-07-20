import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    reviewId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    },
    comment : {
        type : String,
        required : true
    },
    createdTime : {
        type : Date,
        default : Date.now
    }
})

const Review = mongoose.model("reviews", reviewSchema)

export default Review