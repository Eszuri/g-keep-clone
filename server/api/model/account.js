// import module
import mongoose from "mongoose";


const dataNoteSchema = new mongoose.Schema({
    label: String,
    content: String,
    date: Number,
    pinned: Boolean,
    updateDate: Number,
}, { _id: false }); // Disable _id for subdocument

// schema
const dataSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    age: String,
    avatar: String,
    resetPasswordToken: String,
    dataNote: [dataNoteSchema]
},
    {
        versionKey: false // remove __v in data mongodb
    });


// export model
const collectionsUser = mongoose.model('accounts', dataSchema);
export default collectionsUser;


// NOTE:
// rename "accounts" for change collection name