
import config from "../config"
import ChangePassword from "../modules/auth/ChangePassword";
import Categories from "../pages/Categories";
import Movie from "../pages/Movie";
import Home from "../pages/Home";
import FilmManagement from "../pages/FilmManagement";
import TheaterManagement from "../pages/TheaterManagement";
import ShowTimeManagement from "../pages/ShowTimeManagement";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.categories, component: Categories },
    { path: config.routes.movie, component: Movie },
    { path: config.routes.resetPass, component: ChangePassword },
    { path: config.routes.filmManagement, component: FilmManagement },
    { path: config.routes.theaterManagement, component: TheaterManagement },
    { path: config.routes.showtimeManagement, component: ShowTimeManagement },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
