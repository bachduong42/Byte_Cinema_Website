
import config from "../config"
import ChangePassword from "../modules/auth/ChangePassword";
import Categories from "../pages/Categories";
import Movie from "../pages/Movie";
import Home from "../pages/Home";
import FilmManagement from "../pages/FilmManagement";
import TheaterManagement from "../pages/TheaterManagement";
import ShowTimeManagement from "../pages/ShowTimeManagement";
import AddMovie from "../pages/AddMovie";
import DetailedMovieList from "../pages/DetailedMovieList";
import MovieSchedule from "../components/MovieSchedule/MovieSchedule";
import MovieSchedules from "../pages/MovieSchedules";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.categories, component: Categories },
  { path: config.routes.movie, component: Movie },
  { path: config.routes.resetPass, component: ChangePassword },
  { path: config.routes.filmManagement, component: FilmManagement },
  { path: config.routes.theaterManagement, component: TheaterManagement },
  { path: config.routes.showtimeManagement, component: ShowTimeManagement },
  { path: config.routes.addFilm, component: AddMovie },
  { path: config.routes.detailedMovieList, component: DetailedMovieList },
  { path: config.routes.movieShchedules, component: MovieSchedules },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
