import mongoose from "mongoose"
// const mongoUri = 'mongodb://localhost:27017/zentodo';
const mongoUri = 'mongodb+srv://TaskManager:Paparocks_123@cluster0.3rcip.mongodb.net/zentodo';
mongoose.connect(mongoUri).then((data) => {
    console.log('Connction successfull !!');
}).catch((e) => {
    console.log("No Connection", e);
});