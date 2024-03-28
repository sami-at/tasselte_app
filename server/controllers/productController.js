const { safeParse } = require('valibot');
const cloudinary = require('cloudinary').v2;
const BigPromise = require('../lib/BigPromise');
const CustomError = require('../lib/CustomError');
const { productValidation } = require('../lib/product');
const Product = require('../models/Product');
const WhereClause = require('../lib/WhereClause');


exports.createProduct = BigPromise(async (req, res, next) => {
    const result = safeParse(productValidation, req.body);
    if (!result.success) return next(new CustomError(result.issues[0].message, 400));

    const data = result.output;
    if (!req.files) return next(new CustomError("You should provide at least one image", 400));
    if (req.files) {

        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            folder: 'tasselte'
        })

        if (!result) return (new CustomError("promise could not be resolved", 400))
        data.image = { id: result.public_id, src: result.secure_url };
    }
    console.log("before created");
    const product = await Product.create({ ...data });
    console.log("created");
    if (!product) return next(new CustomError('product creation failed', 422))

    res.status(201).json({ staus: "success", message: "product has been created successfully", product })

})

exports.singleProduct = BigPromise(async (req, res, next) => {

    const { productId } = req.params;
    if (!productId) return next(new CustomError("you must provide a product id", 400));

    const product = await Product.findById(productId);

    if (!product) return next(new CustomError("product not found", 404));

    res.status(200).json({ status: "success", message: "Product found", product });
})

exports.allProducts = BigPromise(async (req, res, next) => {
    const resultPerPage = 7;
    const totalProducts = await Product.countDocuments();
    const productsObj = new WhereClause(Product.find(), req.query).search().paginator(resultPerPage);
    const products = await productsObj.base;
    res.status(200).json({ message: "all the products", status: "success", resultPerPage, totalProducts, products });

});

exports.updateProduct = BigPromise(async (req, res, next) => {
    const { productId } = req.params;
    if (!productId) return next(new CustomError('please provide a product id', 400));
    const result = safeParse(productValidation, req.body);
    if (!result.success) return next(new CustomError(result.issues[0].message, 400));
    const data = result.output;
    const product = await Product.findById(productId);
    if (!product) return next(new CustomError('Product not found', 404));

    if (req.files) {
        await cloudinary.uploader.destroy(product.image.id);
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            folder: 'tasselte'
        })

        if (!result) return (new CustomError("promise could not be resolved", 400))
        data.image = { id: result.public_id, src: result.secure_url };
    }

    const updatedProduct = await Product.findByIdAndUpdate(product._id, { ...data }, { new: true, runValidators: true })

    if (!updatedProduct) return next(new CustomError("failed to update the product", 422));

    res.status(200).json({ status: "success", message: "product updated successfully", data: updatedProduct });

});

exports.deleteProduct = BigPromise(async (req, res, next) => {

    const { productId } = req.params;
    if (!productId) return next(new CustomError('please provide a product id', 400));

    const product = await Product.findById(productId);
    if (!product) return next(new CustomError('product notfound', 404));
    await cloudinary.uploader.destroy(product.image.id);
    const deleteProduct = await Product.findByIdAndDelete(product._id);
    if (!deleteProduct) return next(new CustomError('failed to delete product', 400));
    res.status(200).json({ status: "success", message: "product deleted successfully" })
});