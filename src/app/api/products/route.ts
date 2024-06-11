import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/product";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not authentiated"
            },
            {
                status: 401
            }
        )
    }
    await dbConnect();
    try {
        const {title,desc,price} = await request.json();
        const productDoc = await Product.create({
            title,
            desc,
            price
        })
        await productDoc.save();
        return Response.json(
            {
                success: true,
                message: "Product Added Successfully"
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                success: false,
                message: "Something went wrong"
            },
            {
                status: 500
            }
        )
    }


}