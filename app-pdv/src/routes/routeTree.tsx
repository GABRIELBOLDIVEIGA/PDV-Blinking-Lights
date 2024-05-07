import { rootRoute } from "./root";
import { loginRoute } from "./login";

export const routeTree = rootRoute.addChildren([loginRoute]);
