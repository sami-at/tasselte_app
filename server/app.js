require("dotenv").config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const globalErrorHandler = require('./controllers/errorContrller');
const CustomError = require('./lib/CustomError');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const app = express();

app.use((req, res, next) => {
    res.removeHeader("X-Powered-By");
    res.setHeader("Referrer-Policy", 'origin-when-cross-origin');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
})
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.use(morgan('tiny'));

// routes
const product = require('./routes/product');
const user = require('./routes/user');

app.use('/api/v1', product);
app.use('/api/v1', user);


app.all("*", (req, res, next) => {

    return next(new CustomError("page not found", 404));
})

app.use(globalErrorHandler);

module.exports = app;