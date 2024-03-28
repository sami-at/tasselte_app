const app = require('./app');
const connectToDB = require('./config/db');
const cloudinary = require('cloudinary');


process.on("uncaughtException", (error) => {
    server.close(() => {
        process.exit(1);
    })
})
connectToDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true
});


const server = app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));


process.on('unhandledRejection', (error) => {
    server.close(() => {
        process.exit(1);
    });
})