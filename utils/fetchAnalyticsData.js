"use server";

const fetchAnalyticsData = async () => {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/analytics/views?expression=video_public_id=${process.env.NEXT_PUBLIC_CLOUDINARY_PUBLIC_ID}`,
    {
      headers: {
        Authorization: `Basic ${btoa(
          `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}`
        )}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch analytics data");
  }

  const data = await response.json();
  console.log("data", data);
  return data;
};

export default fetchAnalyticsData;
