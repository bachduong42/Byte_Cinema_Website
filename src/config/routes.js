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
  movieShchRedules: "/schedule-movie/:id",
  manageSchedules: "/manage-schedules",
  updateMovie: '/update-movie/:id',
  bookTicket: '/book-a-ticket',
  paymentSuccess: '/payment-success/:transactionId',
  paymentFailure: '/payment-failure/:transactionId'
};

export default routes;
