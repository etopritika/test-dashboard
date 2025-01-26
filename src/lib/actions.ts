"use server";

import { cookies } from "next/headers";
import { User } from "./types";

export async function create(user: User) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "currentUser",
    value: JSON.stringify(user),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function removeUserCookie() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "currentUser",
    value: "",
    expires: new Date(0),
    path: "/",
  });
}
