import mongoose, {Schema, Document} from "mongoose";

interface Detail extends Document {
    key: string;
    value: string;
}
const DetailSchema = new Schema<Detail>({
    key: {type: String, required: true},
    value: {type: String, required: true},
})
interface Description extends Document {
    key: string;
    value: string;
}
const DescriptionSchema = new Schema<Description>({
    key: {type: String, required: true},
    value: {type: String, required: true},
})
interface Review extends Document {
    rating: number;
    title: string;
    photoOrVideo: string;
    description: string;
    recommended: boolean;
}
const ReviewSchema = new Schema<Review>({
    rating: {type: Number, required: true},
    title: {type: String, required: true},
    photoOrVideo: {type: String, required: true},
    description: {type: String, required: true},
    recommended: {type: Boolean},
})
interface Availability extends Document {
    size: string;
    stock: number;
}
const AvailabilitySchema = new Schema<Availability>({
    size: {type: String, required: true},
    stock: {type: Number, required: true},
})
interface Offer extends Document {
    offer: string;
    description: string;
    terms: string;
    validTill: Date;
}
const OfferSchema = new Schema<Offer>({
    offer: {type: String, required: true},
    description: {type: String, required: true},
    terms: {type: String, required: true},
    validTill: {type: Date, required: true},
})

// Product Interface & Schema
export interface Product extends Document {
    name: string;
    category: string;
    photos: string[];
    brand: string;
    availability: Availability[];
    rating: number;
    price: number;
    discount: number;
    details: Detail[];
    description: Description[];
    reviews: Review[];
}

const ProductSchema = new Schema<Product>({
    name: {type: String, required: true},
    category: {type: String, required: true},
    photos: {type: [String], required: true},
    brand: {type: String, required: true},
    availability: {type: [AvailabilitySchema], required: true},
    rating: {type: Number, required: true},
    price: {type: Number, required: true},
    discount: {type: Number, required: true},
    details: {type: [DetailSchema], required: true},
    description: {type: [DescriptionSchema], required: true},
    reviews: {type: [ReviewSchema], required: true},
})

const ProductModel = mongoose.models.Product as mongoose.Model<Product> || mongoose.model<Product>("User", ProductSchema);
export default ProductModel;

