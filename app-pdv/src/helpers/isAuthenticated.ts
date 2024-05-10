import { authSchema } from "@/common/schemas/auth-schema";

export function isAuthenticated() {
  try {
    const storage = sessionStorage.getItem("auth-pdv-blinking-lights");

    if (storage === null) return false;

    const obj = JSON.parse(storage);

    if (obj.state.user === null) return false;

    const success = authSchema.safeParse(obj.state.user).success;

    return success;
  } catch (error) {
    console.warn("[Error] => ", error);
  }
}
