import mongoose from 'mongoose';
import  Color from 'colors';

const connectDB = async() =>{
    try{
        const con = await mongoose.connect(process.env.DB_URL)
        console.log(`Connected To Mongodb DataBase `.bgMagenta.white);
    } catch (error) {
console.log(`MongoDB Error ${error}`.bgRed.white);
    }
}

export default connectDB;