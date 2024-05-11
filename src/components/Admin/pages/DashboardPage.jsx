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
  const [seriesData, setSeriesData] = useState();

  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    statisticsByYear(yearNow);
  }, []);

  const statisticsByYear = async (year) => {
    const barChartData = Array.from({ length: 12 }, () => 0);
    try {
      const res = await axiosJWT.get("/order/statisticsByYear/" + year);
      if (res.data && res.data.metadata) {
        setYearData(res.data.metadata);
        yearData.forEach((item) => {
          const monthIndex = item.order_month - 1;
          barChartData[monthIndex] = item.total_orders;
        });
        setSeriesData([{ data: barChartData }]);
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

      <div style={{ minHeight: "1000px" }}>
        <BarChart
          series={seriesData}
          height={290}
          xAxis={[{ data: MonthsInYearArray, scaleType: "band" }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </div>
    </>
  );
};

export default DashboardPage;
