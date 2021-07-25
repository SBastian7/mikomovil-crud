import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
    doc: { type: Number, required: true, unique:true },
    name: { type: String, required: true},
    email: { type: String, required: true, unique:true },
    date: { type: Date, required: true},
    deleted: {type: Boolean, default: false}
},{
    timestamps: true
})

// Fx to search by Name
UserSchema.statics = {
    searchPartial: function(q, callback) {
        console.log("searching ",q)
        return this.find({
            "name": new RegExp(q, "gi") 
        }, callback);
    }
}

const User = mongoose.model('User', UserSchema)

export default User;