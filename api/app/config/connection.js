import mongoose from "mongoose"
// const LOCAL_MONGO_URI = 'mongodb://localhost:27017/zentodo';
// const LIVE_MONGO_URI = 'mongodb+srv://TaskManager:Paparocks_123@cluster0.3rcip.mongodb.net/zentodo';
const mongoUri =  'mongodb+srv://TaskManager:Paparocks_123@cluster0.3rcip.mongodb.net/zentodo'
mongoose.connect(mongoUri).then((data) => {
    console.log('Connction successfull !!', process.env.DATABASESTRING,);
}).catch((e) => {
    console.log("No Connection", e);
});