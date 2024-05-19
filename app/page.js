// page.js
"use client";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <section className="flex flex-col items-center w-full max-w-6xl mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
          Video Engagement Metrics with Cloudinary in Next.js
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="w-full md:w-1/2 p-4">
            <CldVideoPlayer
              width="320"
              height="180"
              src="samples/elephants"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <p className="text-lg font-semibold text-gray-700 text-center text-red-500">
              Add video analytics data here
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
