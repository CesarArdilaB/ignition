import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  // TODO: Implement logout
  console.log("Logout attempt");

  return redirect("/");
}

export async function loader() {
  return redirect("/");
} 