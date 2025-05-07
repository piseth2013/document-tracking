import mongoose from "mongoose";

const connectToDb = () =>
    mongoose.connect(
        `mongodb+srv://${process.env.ATLASUSER}:${process.env.ATLASPASSWORD}@${process.env.MONGO_URI}/${process.env.REACT_API_DB_NAME}`,
        {useNewUrlParser: true, useUnifiedTopology: true},
    );

export default connectToDb;
