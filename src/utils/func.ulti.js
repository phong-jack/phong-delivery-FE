import moment from "moment";

export const getVietNamDongFormat = (money) => {
  if (typeof money !== "number" || isNaN(money)) {
    return "Số tiền không hợp lệ";
  }
  return money.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export function convertUTCtoVietnamTime(dateTime) {
  const dateTimeMoment = moment(dateTime);

  // Chuyển đổi thành định dạng "MMMM Do YYYY, h:mm:ss a"
  const formattedDateTime = dateTimeMoment.format("MMMM Do YYYY, h:mm:ss a");

  // Trả về ngày giờ được định dạng
  return formattedDateTime;
}

export const sortOrdersByTime = (orders) => {
  return [...orders].sort((a, b) =>
    moment(a.updatedAt).isAfter(moment(b.updatedAt)) ? -1 : 1
  );
};

export function roundToKm(distance) {
  return distance.toFixed(2);
}
