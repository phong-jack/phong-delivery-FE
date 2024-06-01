import { BarChart } from "@mui/x-charts";
import { MonthsInYearArray } from "../../../constant";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../api/axiosConfig";
import { loginSuccess } from "../../../redux/authSlice";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getVietNamDongFormat } from "../../../utils/func.ulti";

const getYears = (yearNow) => {
  useEffect(() => {
    document.title = "Thống kê";
  }, []);

  const years = [];
  for (let i = yearNow; i >= yearNow - 3; i--) {
    years.push(i);
  }
  return years;
};

const DashboardPage = () => {
  const yearNow = new Date().getFullYear();
  const years = getYears(yearNow);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [orderCoutByYear, setOrderCountByYear] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const shopId = user?.shopId;
  const [dataKeyArray, setDataKeyArray] = useState();
  const [dataValueArray, setDataValueArray] = useState();
  const [orderCount, setOrderCount] = useState();
  const [income, setIncome] = useState();

  const axiosJWT = createAxios(user, dispatch, loginSuccess);
  const fetchData = async () => {
    try {
      const response = await axiosJWT.get("order/report/" + shopId, {
        params: {
          dateStart: new Date(startDate).toLocaleDateString(),
          dateEnd: new Date(endDate).toLocaleDateString(),
        },
      });
      if (response.data && response.data.metadata) {
        setOrderData(response.data.metadata);
        setDataKeyArray(Object.keys(response.data.metadata));
        const totalOrdersArray = Object.values(response.data.metadata).map(
          (item) => item.totalOrders
        );
        setDataValueArray(totalOrdersArray);
        const totalOrdersSum = totalOrdersArray.reduce(
          (acc, curr) => acc + curr,
          0
        );
        setOrderCount(totalOrdersSum);
        const totalAmountSum = Object.values(response.data.metadata).reduce(
          (acc, curr) => acc + curr.totalAmount,
          0
        );
        console.log(totalAmountSum);
        setIncome(totalAmountSum);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const handleSubmitDate = async (e) => {
    e.preventDefault();
    console.log("Start date:", startDate);
    console.log("End date:", endDate);
    // Thực hiện xử lý submit tại đây
    await fetchData();
  };

  return (
    <>
      <div className="my-5" style={{ minHeight: "200px" }}>
        <h1>Thống kê đơn hàng</h1>
        <form id="date-range-form" onSubmit={handleSubmitDate}>
          <div className="row">
            <div className="col-4">
              <label htmlFor="from">Từ ngày:</label>
              <DatePicker
                id="from"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Chọn ngày bắt đầu"
                className="form-control"
              />
            </div>
            <div className="col-4">
              <label htmlFor="to">Đến ngày:</label>
              <DatePicker
                id="to"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Chọn ngày kết thúc"
                className="form-control"
              />
            </div>
            <div className="col-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="row">
          <div class="card mt-3 col-3 mx-3" style={{ width: "18rem" }}>
            <div class="card-body fs-2">
              <h5 class="card-title fs-3">Tổng số đơn: </h5>
              <p class="card-text">{orderCount ? orderCount : 0} đơn</p>
            </div>
          </div>
          <div class="card mt-3 col-3 mx-3" style={{ width: "18rem" }}>
            <div class="card-body fs-2">
              <h5 class="card-title fs-3">Doanh thu: </h5>
              <p class="card-text">
                {income ? getVietNamDongFormat(income) : "0 VND"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ minHeight: "1000px" }} className="mt-5">
        {setDataValueArray && (
          <BarChart
            series={[{ data: dataValueArray ? dataValueArray : [] }]}
            height={700}
            xAxis={[
              {
                data: dataKeyArray ? dataKeyArray : [],
                scaleType: "band",
              },
            ]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        )}
      </div>
    </>
  );
};

export default DashboardPage;
