const routes = {
  home: "/",
  categories: "/categories",
  event: "/event",
  movie: "movie/:id",
  resetPass: "/reset-password",
  filmManagement: "/film-management",
  addFilm: "/film-management/add",
  theaterManagement: "/theater-management",
  showtimeManagement: "/showtime-management",
  detailedMovieList: "/movies/:type",
  movieSchedules: "/schedule-movie/:id",
  manageSchedules: "/manage-schedules",
  updateMovie: "/update-movie/:id",
  bookTicket: "/book-a-ticket",
  updateMovie: "/update-movie/:id",
  bookTicket: "/book-a-ticket",
  paymentSuccess: "/payment-success",
  paymentFailure: "/payment-failure/:transactionId",
  bookMovieTicket: "/book-movie-ticket/:id",
  manageAuditorium: "/manage-auditorium",
  reportRevenue: "/report-revenue",
  transactions: "/transactions"
};

export default routes;
