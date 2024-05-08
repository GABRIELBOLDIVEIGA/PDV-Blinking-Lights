import { authSchema } from "@/common/schemas/Auth.schema";

export function isAuthenticated() {
  try {
    const storage = sessionStorage.getItem("pdv-blinking-lights-auth");

    if (storage === null) return false;

    const obj = JSON.parse(storage);

    if (obj.state.user === null) return false;

    const success = authSchema.safeParse(obj.state.user).success;

    return success;
  } catch (error) {
    console.warn("[Error] => ", error);
  }
}