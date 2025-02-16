import mongoose, { Schema, Document } from "mongoose";

// Address Interface & Schema
export interface Address {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: number;
}

const AddressSchema = new Schema<Address>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
});

// Cart Interface & Schema
export interface Cart {
    productId: string;
    quantity: number;
}

const CartSchema = new Schema<Cart>({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
});

// Order Interface & Schema
export interface Order {
    productId: string;
    quantity: number;
    status: "pending" | "delivered";
}

const OrderSchema = new Schema<Order>({
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ["pending", "delivered"], default: "pending" },
});

// User Interface & Schema
export interface User extends Document {
    email: string;
    password: string;
    phoneNo: string;
    addresses: Address[];
    cart: Cart[];
    orders: Order[];
    role: "user" | "admin";
}

const UserSchema = new Schema<User>({
    email: { type: String, unique: true, sparse: true},
    password: { type: String, required: true },
    phoneNo: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    addresses: [AddressSchema],
    cart: [CartSchema],
    orders: [OrderSchema],
}, { discriminatorKey: "role" });  // Required for discriminator

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema);
export default UserModel;

// Banking Details Interface & Schema
export interface BankingDetails {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifsc?: string;
}

const BankingDetailsSchema = new Schema<BankingDetails>({
    accountHolderName: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifsc: { type: String },
});

// Admin Interface & Schema
export interface Admin extends User {
    gstNumber?: string;
    panNumber?: string;
    storeName?: string;
    bankingDetails?: BankingDetails;
}

const AdminSchema = new Schema<Admin>({
    gstNumber: { type: String },
    panNumber: { type: String },
    storeName: { type: String },
    bankingDetails: BankingDetailsSchema,
});

// Create Admin Model as a discriminator of User
export const AdminModel = mongoose.models.Admin as mongoose.Model<Admin> 
    || UserModel.discriminator<Admin>("Admin", AdminSchema);

