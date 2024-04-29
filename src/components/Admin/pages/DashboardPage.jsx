import React from "react";

const DashboardPage = () => {
  return (
    <>
      <div id="my-chart">
        <table class="charts-css column show-labels show-primary-axis">
          <caption className="h3">Doanh thu tháng 4 - 2024</caption>
          <thead>
            <tr>
              <th scope="col"> Year </th>
              <th scope="col"> Progress </th>
              <th scope="col"> Progress </th>
              <th scope="col"> Progress </th>
              <th scope="col"> Progress </th>
              <th scope="col"> Progress </th>
              <th scope="col"> Progress </th>
              <th scope="col"> Progress </th>
              <th scope="col"> Progress </th>
              <th scope="col"> Progress </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"> 2016 </th>
              <td style={{ "--size": "1.0" }}>
                <span class="data"> $ 20K </span>
              </td>
            </tr>
            <tr>
              <th scope="row"> 2016 </th>
              <td style={{ "--size": "1.0" }}>
                <span class="data"> $ 20K </span>
              </td>
            </tr>
            <tr>
              <th scope="row"> 2016 </th>
              <td style={{ "--size": "1.0" }}>
                <span class="data"> $ 20K </span>
              </td>
            </tr>
            <tr>
              <th scope="row"> 2016 </th>
              <td style={{ "--size": "1.0" }}>
                <span class="data"> $ 20K </span>
              </td>
            </tr>
            <tr>
              <th scope="row"> 2016 </th>
              <td style={{ "--size": "1.0" }}>
                <span class="data"> $ 20K </span>
              </td>
            </tr>
            <tr>
              <th scope="row"> 2016 </th>
              <td style={{ "--size": "1.0" }}>
                <span class="data"> $ 20K </span>
              </td>
            </tr>
            <tr>
              <th scope="row"> 2016 </th>
              <td style={{ "--size": "1.0" }}>
                <span class="data"> $ 20K </span>
              </td>
            </tr>
            <tr>
              <th scope="row"> 2016 </th>
              <td style={{ "--size": "1.0" }}>
                <span class="data"> $ 20K </span>
              </td>
            </tr>
            <tr>
              <th scope="row"> 2016 </th>
              <td style={{ "--size": "1.0" }}>
                <span class="data"> $ 20K </span>
              </td>
            </tr>
          </tbody>
        </table>
        <ul class="charts-css legend"></ul>
      </div>
    </>
  );
};

export default DashboardPage;
