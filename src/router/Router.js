
import config from "../config"
import Categories from "../pages/Categories";
import Movie from "../pages/Movie";
import Home from "../pages/Home";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.categories, component: Categories },
    { path: config.routes.movie, component: Movie }

];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
