import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import fetchAnalyticsData from "../utils/fetchAnalyticsData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VideoAnalyticsData = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center w-full mt-8">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-500"></div>
      </div>
    );
  }

  const totalViews = analyticsData.data.length;
  const totalVideoDuration = analyticsData.data[0]?.video_duration || 0;
  const countries = analyticsData.data.map(
    (item) => item.viewer_location_country_code
  );
  const os = analyticsData.data.map((item) => item.viewer_os_identifier);
  const applications = analyticsData.data.map(
    (item) => item.viewer_application_name
  );
  const watchTimes = analyticsData.data.map((item) => item.view_watch_time);

  const countryCounts = countries.reduce((acc, country) => {
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const osCounts = os.reduce((acc, system) => {
    acc[system] = (acc[system] || 0) + 1;
    return acc;
  }, {});

  const appCounts = applications.reduce((acc, app) => {
    acc[app] = (acc[app] || 0) + 1;
    return acc;
  }, {});

  const totalWatchTime = watchTimes.reduce((acc, time) => acc + time, 0);
  const averageWatchTime = (totalWatchTime / totalViews).toFixed(2);
  const engagementRate =
    totalVideoDuration > 0
      ? ((averageWatchTime / totalVideoDuration) * 100).toFixed(2)
      : 0;

  const countryChartData = {
    labels: Object.keys(countryCounts),
    datasets: [
      {
        label: "Views by Country",
        data: Object.values(countryCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const osChartData = {
    labels: Object.keys(osCounts),
    datasets: [
      {
        label: "Views by OS",
        data: Object.values(osCounts),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const appChartData = {
    labels: Object.keys(appCounts),
    datasets: [
      {
        label: "Views by Application",
        data: Object.values(appCounts),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    // ...
    <div className="flex flex-col items-center w-full bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Video Analytics Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="bg-gray-100 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Total Views
          </h3>
          <p className="text-2xl font-bold text-gray-900 text-center">
            {totalViews}
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Avg Watch Time (seconds)
          </h3>
          <p className="text-2xl font-bold text-gray-900 text-center">
            {averageWatchTime}
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
            Engagement Rate (%)
          </h3>
          <p className="text-2xl font-bold text-gray-900 text-center">
            {engagementRate}
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-700 text-center">
            Countries
          </h3>
          <Bar data={countryChartData} />
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-700 text-center">
            Operating Systems
          </h3>
          <Bar data={osChartData} />
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-700 text-center">
            Applications
          </h3>
          <Bar data={appChartData} />
        </div>
      </div>
    </div>
  );
};

export default VideoAnalyticsData;
