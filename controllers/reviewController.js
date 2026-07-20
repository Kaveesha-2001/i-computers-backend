import Review from "../models/review.js"
import { isAdmin } from "./userController.js"

export async function createReview(req,res){

    try{

        const newReview = new Review({
            reviewId : new Date().getTime().toString(),
            name : req.body.name,
            email : req.body.email,
            rating : req.body.rating,
            comment : req.body.comment
        })

        await newReview.save()

        res.json({
            message : "Review submitted successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message : "Error submitting review"
        })
    }
}

export async function getReviews(req,res){

    try{

        const reviews = await Review.find().sort({ createdTime : -1 })
        res.json(reviews)

    }catch(error){
        res.status(500).json({
            message : "Error fetching reviews"
        })
    }
}

export async function deleteReview(req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            message : "You are not authorized to delete reviews"
        })
        return
    }

    try{

        await Review.deleteOne({ reviewId : req.params.reviewId })

        res.json({
            message : "Review deleted successfully"
        })

    }catch(error){
        res.status(500).json({
            message : "Error deleting review"
        })
    }
}