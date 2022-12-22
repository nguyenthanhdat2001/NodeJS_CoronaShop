import mongoose from 'mongoose';

async function Connect(){
    try{
        mongoose.set("strictQuery", true);
        await mongoose.connect('mongodb://localhost:27017/CozaStore');
        console.log("Connect successfully !");
    }catch(error){
        console.log("Connect fail !");
    }
}

export default {Connect}
