
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
import MovieSchedules from "../pages/MovieSchedules";
import ScheduleManagement from "../pages/ScheduleManagement";

import UpdateMovie from "../pages/UpdateMovie"
import BookTicket from "../pages/BookTicket";
import BillSuccessfull from "../modules/Booking/BillSuccesfull";
import BillFailure from "../modules/Booking/BillFailure";
import AuditoriumManagement from "../pages/AuditoriumManagement";
import ReportRevenue from "../pages/ReportRevenue";
import { Transactions } from "../pages/Transactions";
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
  { path: config.routes.movieSchedules, component: MovieSchedules },
  { path: config.routes.manageSchedules, component: ScheduleManagement },
  { path: config.routes.updateMovie, component: UpdateMovie },
  { path: config.routes.bookTicket, component: BookTicket },
  { path: config.routes.paymentSuccess, component: BillSuccessfull },
  { path: config.routes.paymentFailure, component: BillFailure },
  { path: config.routes.bookMovieTicket, component: BookTicket },
  {
    path: config.routes.manageAuditorium,
    component: AuditoriumManagement,
  },
  {
    path: config.routes.reportRevenue,
    component: ReportRevenue,
  },
  { path: config.routes.transactions, component: Transactions },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
