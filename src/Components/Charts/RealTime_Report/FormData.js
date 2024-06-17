import axios from "axios";
import { useState, useEffect } from "react";
import BarChartT from "../../Templates/BarChartT";


const mapper = (data) => {
  const labels = [];
  const seriesData = {
    form_submit: [],
    form_start: [],
  };

  const dataMap = {};

  for (const item of data) {
    const s = item.label1.length;
    let pagePath = "Bhumi Website Form Stats"
    const eventType = item.label1;
    const value = parseInt(item.value1);

    if (!dataMap[pagePath]) {
      dataMap[pagePath] = { form_submit: 0, form_start: 0 };
      labels.push(pagePath);
    }

    if (eventType === "form_submit") {
      dataMap[pagePath].form_submit += value;
    } else if (eventType === "form_start") {
      dataMap[pagePath].form_start += value;
    }
  }

  for (const label of labels) {
    seriesData.form_submit.push(dataMap[label].form_submit);
    seriesData.form_start.push(dataMap[label].form_start);
  }
  return { labels, seriesData };
};

const FormData = () => {
  const [data, setData] = useState({
    labels: [],
    seriesData: { form_submit: [], form_start: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND}/analytics/realtime`,
          {
            dimensions: ["eventName"],
            metrics: ["eventCount"],
            dimensionFilter: [
              {
                fieldName: "eventName",
                filters: ["form_submit", "form_start"],
              },
            ],
          }
        );
        setData(mapper(response.data.data));
      } catch (e) {
        setData({
          labels: [],
          seriesData: { form_submit: [], form_start: [] },
        });
      }
    };

    fetchData();
  }, []);

  return <BarChartT data={data} />;
};

export default FormData;
