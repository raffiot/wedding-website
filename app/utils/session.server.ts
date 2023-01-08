import { json, redirect } from "@remix-run/node";
import { getUserSession } from "~/session";

type LoginType = "mariage" | "vinDHonneur";

export async function requireLogin(request: Request) {
  const session = await getUserSession(request);
  const loginType = session.get("LoginType");
  if (!loginType || typeof loginType !== "string") {
    throw redirect("/");
  }
  return json({});
}

export async function login({
  password,
}: {
  password: string;
}): Promise<{ success: boolean; loginType?: LoginType }> {
  const isPassword = process.env.PASSWORD_MARIAGE
    ? password === process.env.PASSWORD_MARIAGE
    : false;
  if (isPassword) return { success: true, loginType: "mariage" };

  const isPasswordVinDHonneur = process.env.PASSWORD_VIN_D_HONNEUR
    ? password === process.env.PASSWORD_VIN_D_HONNEUR
    : false;
  if (isPasswordVinDHonneur) return { success: true, loginType: "vinDHonneur" };

  return { success: false };
}
