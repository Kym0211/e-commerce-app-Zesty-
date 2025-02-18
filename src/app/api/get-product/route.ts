import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';

export async function GET(request: Request, {params}: {params: {productId: string}}) {  
    await dbConnect();

    const { productId } = params;

    try {
        const product = await ProductModel.findById(productId);
        if(!product){
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
                product
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