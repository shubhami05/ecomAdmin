import dbConnect from "@/lib/dbConnect";
import { Product } from "@/models/product";
import { User, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
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
        const { title, desc, price } = await request.json();
        const productDoc = await Product.create({
            title,
            desc,
            price
        })
        await productDoc.save();
        return Response.json(
            {
                success: true,
                message: "Product has been Added Successfully"
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

export async function GET(request: NextRequest) {
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
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (id) {
            if (!ObjectId.isValid(id)) {
                return Response.json(
                    {
                        success: false,
                        message: "Invalid product ID"
                    },
                    {
                        status: 400
                    }
                );
            }

            const product = await Product.findOne({ _id: new ObjectId(id) });

            if (!product) {
                return Response.json(
                    {
                        success: false,
                        message: "Product not found"
                    },
                    {
                        status: 404
                    }
                );
            }

            return Response.json(
                {
                    success: true,
                    message: "Product has been fetched successfully",
                    productsData: product
                },
                {
                    status: 200
                }
            );
        }
        const products = await Product.find({});
        return Response.json(
            {
                success: true,
                message: "Product Fetched Successfully",
                productsData: products
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

export async function PUT(request: NextRequest) {
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
        const { id, productData } = await request.json();
        const { title, desc, price } = productData;
        const pid = id[0];

        await Product.updateOne(
            {
                _id: ObjectId.createFromHexString(pid)
            },
            {
                $set: {
                    title: title,
                    desc: desc,
                    price: price
                }
            }
        )
        return Response.json(
            {
                success: true,
                message: "Product has been updated successfully!"
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log(error)
        return Response.json(
            {
                success: false,
                message: "Something Went wrong!"
            },
            {
                status: 500
            }
        )
    }
}

export async function DELETE(request: NextRequest) {
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
        const data = await request.json();
        const id = data.productToDelete;
        const productExist = await Product.findOne({ _id: ObjectId.createFromHexString(id) });
        if (productExist) {
            await Product.deleteOne({ _id: ObjectId.createFromHexString(id) });
            return Response.json(
                {
                    success: true,
                    message: "Product has been deleted successfully"
                },
                {
                    status: 200
                }
            )
        }
        return Response.json(
            {
                success: false,
                message: 'Product does not exist!'
            },
            {
                status: 400
            }
        )
    }
    catch (error) {
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