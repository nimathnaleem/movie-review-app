import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./DAO/ReviewsDAO.js";


const MongoClient = mongodb.MongoClient;
const mongo_username = "db_manager";
const mongo_password = "aQe5yuXGCUbONKgr";
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@db1.pkoi0xk.mongodb.net/?retryWrites=true&w=majority`;

const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () =>{
            console.log(`listening on port ${port}`)
        })
    })