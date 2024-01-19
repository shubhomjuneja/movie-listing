import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secretKey = "JWT-SCERET";

const authenticateToken = (token: string) => {
  if (!token) {
    throw new Error("Unauthorized: Token missing");
  }

  try {
    const res = jwt.verify(token, secretKey);
    return res
  } catch (error) {
    throw new Error("false");
  }
};

export async function POST(request: NextRequest) {
  const token: any = await request?.json();
  console.debug({token})
  try {
    const res = authenticateToken(token?.token);
    return new NextResponse(
        JSON.stringify({ res:"true" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
