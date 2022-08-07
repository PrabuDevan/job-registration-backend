'use strict'
import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        username: { type: String },
        password: { type: String },
        mobileNo: { type: String },
        sex: { type: String },
        qualifications: [
            {
                type: { type: String },
                percentage: { type: String },
                courseDuration: { type: String },
                courseStartDate: { type: String },
                courseEndDate: { type: String },
            },
        ],
        jobDetails: [
            {
                company: { type: String },
                jobTitle: { type: String },
                experienceInYears: { type: Number },
                startDate: { type: String },
                endDate: { type: String },
            },
        ],
        isAdmin: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        collection: 'User'
    }
)

const User = model('User', UserSchema)
export default User