import { prisma } from "@/lib/database";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { updateUserScheme, userSchema } from "./validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password, name, image } = body;

    const { error } = userSchema.validate(body, {
      abortEarly: false,
    });

    if (error)
      return NextResponse.json(error.details, {
        status: 403,
      });

    // check if user exist by email
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: "Email is already exists!" },
        { status: 409 }
      );
    }
    //check if user exist by username
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { message: "Username is already exists!" },
        { status: 409 }
      );
    }
    const hashPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        id: `user-${uuidv4()}`,
        email,
        username,
        image,
        name,
        password: hashPassword,
      },
      select: {
        id: true,
        email: true,
        password: false,
        name: true,
        username: true,
      },
    });

    return NextResponse.json(
      {
        message: "User success created",
        data: newUser,
      },
      { status: 201, statusText: "Success" }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Someting went wrong!",
      },
      {
        status: 500,
        statusText: "Internal Server Error!",
      }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { noTelp, name, username, email } = body;

    const { error } = updateUserScheme.validate(body, {
      abortEarly: false,
    });

    if (error)
      return NextResponse.json(error.details, {
        status: 403,
      });

    const updateUser = await prisma.user.update({
      data: {
        noTelp,
        name,
        username,
      },
      where: {
        email,
      },
    });
    return NextResponse.json(
      {
        message: "User success updated",
        data: updateUser,
      },
      { status: 200, statusText: "Success" }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Someting went wrong!",
      },
      {
        status: 500,
        statusText: "Internal Server Error!",
      }
    );
  }
}
