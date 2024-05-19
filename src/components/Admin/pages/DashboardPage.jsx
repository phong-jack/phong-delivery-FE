import { BarChart } from "@mui/x-charts";
import { MonthsInYearArray } from "../../../constant";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../api/axiosConfig";
import { loginSuccess } from "../../../redux/authSlice";
import { useEffect, useState } from "react";

const getYears = (yearNow) => {
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
  const [yearSelected, setYearSelected] = useState(yearNow);
  const [yearData, setYearData] = useState();
  const [orderCoutByYear, setOrderCountByYear] = useState();

  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    statisticsByYear(yearSelected);
  }, [yearSelected]);

  const statisticsByYear = async (year) => {
    try {
      const res = await axiosJWT.get("/order/statisticsByYear/" + year);
      if (res.data && res.data.metadata) {
        let yearDataArray = res.data.metadata;
        const barChartData = Array.from({ length: 12 }, () => 0);
        yearDataArray.forEach((item) => {
          const monthIndex = item.order_month - 1;
          barChartData[monthIndex] = item.total_orders;
        });
        setYearData(barChartData);

        const orderCount = barChartData.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        setOrderCountByYear(orderCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeYear = async (year) => {
    statisticsByYear(year);
  };

  return (
    <>
      <div className="my-5" style={{ minHeight: "200px" }}>
        <h1>Thống kê đơn hàng</h1>
        <select
          class="form-select"
          aria-label="Default select example"
          onChange={(e) => handleChangeYear(e.target.value)}
        >
          {years &&
            years.map((year) => {
              return (
                <>
                  <option value={year}>{year}</option>
                </>
              );
            })}
        </select>
        <div class="card mt-3" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">Doanh thu: </h5>
            <p class="card-text">
              Tổng {orderCoutByYear ? orderCoutByYear : 0} đơn
            </p>
          </div>
        </div>
      </div>

      <div style={{ minHeight: "1000px" }} className="mt-5">
        {yearData && (
          <BarChart
            series={[{ data: yearData ? yearData : [] }]}
            height={700}
            xAxis={[{ data: MonthsInYearArray, scaleType: "band" }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        )}
      </div>
    </>
  );
};

export default DashboardPage;
