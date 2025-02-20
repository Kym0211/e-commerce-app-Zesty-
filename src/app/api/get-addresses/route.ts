import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(request: Request, {params}: {params: {userId: string}}) {  
    await dbConnect();

    const { userId } = params;
    const id = new mongoose.Types.ObjectId(userId);

    try {
        const addresses = await ProductModel.findById(id);
        if(!addresses){
            return Response.json(
                {
                    success: false,
                    message: "Product not found"
                },
                {status: 404}
            )
        }
        return Response.json(
            {
                success: true,
                addresses
            }, {status: 200}
        )
        
    } catch (error) {
        console.error("Error in getting product", error)
        return Response.json(
            {
                success: false,
                message: "Error in getting product"
            },
            {status: 500}
        )
        
    }
}