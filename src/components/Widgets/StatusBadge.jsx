import React from "react";
import { ORDER_STATUS } from "../../constant";

const StatusBadge = (props) => {
  /**INIT (Khởi tạo): Màu Primary 
    ACCEPTED (Đã chấp nhận): Màu Info 
    SHIPPING (Đang giao hàng): Màu Success 
    FINISHED (Đã hoàn thành): Màu Secondary 
    CANCEL (Đã hủy): Màu Danger 
    REJECTED (Đã từ chối): Màu Warning  */
  const { statusCode } = props;
  switch (statusCode) {
    case ORDER_STATUS.INIT:
      return (
        <>
          <span class="badge bg-secondary">Vừa đặt đơn</span>
        </>
      );
    case ORDER_STATUS.ACCEPTED:
      return (
        <>
          <span class="badge bg-info">Đã xác nhận</span>
        </>
      );
    case ORDER_STATUS.SHIPPING:
      return (
        <>
          <span class="badge bg-primary">Đang ship</span>
        </>
      );
    case ORDER_STATUS.FINISHED:
      return (
        <>
          <span class="badge bg-success">Hoàn thành</span>
        </>
      );
    case ORDER_STATUS.CANCEL:
      return (
        <>
          <span class="badge bg-danger">Đã hủy</span>
        </>
      );
    case ORDER_STATUS.REJECTED:
      return (
        <>
          <span class="badge bg-warning">Quán từ chối</span>
        </>
      );
  }
  return <div></div>;
};

export default StatusBadge;
