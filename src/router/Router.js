
import config from "../config"
import Categories from "../pages/Categories";
import Home from "../pages/Home";
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.categories, component: Categories },
    { path: config.routes.categories, component: Categories },
    { path: config.routes.categories, component: Categories }

];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
