import { db } from "@/lib/prismadb";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from 'zod'

const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })


export const GET = () => {
  return NextResponse.json({ succeess: true })
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    })
    if (existingUserByEmail) return NextResponse.json({ user: null, message: 'user already exist' }, { status: 409 })

    const existingUserByUsername = await db.user.findUnique({
      where: { email: email }
    })
    if (existingUserByUsername) return NextResponse.json({ user: null, message: 'username not available' }, { status: 409 })

    const hashedPassword = await hash(password, 10)


    const newUser = await db.user.create({
      data: { username: username, email: email, password: hashedPassword }
    })

    //  To remove 
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({ user: rest, message: "user created sucessfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" }, { status: 500 });
  }
}