
import config from "../config"
import ChangePassword from "../modules/auth/ChangePassword";
import Categories from "../pages/Categories";
import Movie from "../pages/Movie";
import Home from "../pages/Home";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.categories, component: Categories },
    { path: config.routes.movie, component: Movie },
    { path: config.routes.resetPass, component: ChangePassword },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
