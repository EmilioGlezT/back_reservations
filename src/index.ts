import express from 'express';
import { MongoDatabase } from './data/init';
const app = express();

app.use(express.json());


app.use(AppRoutes.routes);
console.log(process.env.PORT);

(async () =>{
    const mongoUrl = process.env.MONGO_URL;
    const dbName = process.env.MONGO_DB;

    if (!mongoUrl) {
        throw new Error("La variable de entorno MONGO_URL no está definida");
    }
    if (!dbName) {
        throw new Error("La variable de entorno MONGO_DB no está definida");
    }

    await MongoDatabase.connect({
        mongoUrl: mongoUrl,
        dbName: dbName
    });
})();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});