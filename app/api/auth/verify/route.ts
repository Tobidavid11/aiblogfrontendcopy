import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const userDataCookie = cookieStore.get("userData");
  const accessToken = cookieStore.get("accessToken");

  if (!userDataCookie || !accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const userData = JSON.parse(userDataCookie.value);
    return NextResponse.json({ user: userData });
  } catch (error) {
    return NextResponse.json({ error: "Invalid user data" }, { status: 401 });
  }
}
