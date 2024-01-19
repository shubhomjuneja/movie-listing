import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../lib/db";
import Users, { IUser } from "../../model/Users";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const users: IUser[] = await Users.find({});
    return new NextResponse(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const newUserDetails: IUser = await request.json();
    const newUser = await Users.create(newUserDetails);

    return new NextResponse(
      JSON.stringify({ message: 'User created successfully', user: newUser }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
