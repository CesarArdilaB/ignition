import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { auth } from "auth";

export async function action({ request }: ActionFunctionArgs) {
  try {
    await auth.api.signOut({
      headers: request.headers,
      method: "POST",
    });
    return redirect("/");
  } catch (error) {
    // Even if logout fails, redirect to home
    return redirect("/");
  }
}

export async function loader() {
  return redirect("/");
} 