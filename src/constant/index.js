const BACKEND_URL = "http://localhost:3055";

const ORDER_STATUS = {
  INIT: 0,
  ACCEPTED: 1,
  SHIPPING: 2,
  FINISHED: 3,
  CANCEL: 4,
  REJECTED: 5,
};

const MAPBOX_API_KEY =
  "pk.eyJ1IjoibmdvdGllbnBob25nMDUzIiwiYSI6ImNsdmR1aWYxMjAydG0ybG1vaWU2NHA5azYifQ.HFF4Ao-EqPB8GhA9zBM1Zg";

const MonthsInYearArray = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export { BACKEND_URL, ORDER_STATUS, MAPBOX_API_KEY, MonthsInYearArray };
