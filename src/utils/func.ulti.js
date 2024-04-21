export const getVietNamDongFormat = (money) => {
  if (typeof money !== "number" || isNaN(money)) {
    return "Số tiền không hợp lệ";
  }
  return money.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
