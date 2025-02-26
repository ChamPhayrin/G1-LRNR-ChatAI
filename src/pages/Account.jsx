import React from "react";

export default function Account() {
  return (
    <div className="max-w-5xl mx-auto py-12 min-h-[80vh] flex justify-center items-center flex-col">
      <h1 className="text-7xl font-light text-teal-500 mb-12 text-left pb-10">
        Account
      </h1>

      <div className="flex justify-between items-start text-center">
        {/* Streak */}
        <div className="flex-1 mx-8">
          <div className="text-6xl text-teal-400">🔥</div>
          <h2 className="text-xl font-semibold mt-4">Streak</h2>
          <p className="text-gray-600 mt-2">You have a streak of 5 days!</p>
        </div>

        {/* Platinum Quizzes */}
        <div className="flex-1 mx-8">
          <div className="text-6xl text-teal-400">📋</div>
          <h2 className="text-xl font-semibold mt-4">Platinum Quizzes</h2>
          <p className="text-gray-600 mt-2">golang - intermediate</p>
          <p className="text-gray-600">Javascript - beginner</p>
          <p className="text-gray-600">AWS - beginner</p>
        </div>

        {/* Irnr Level */}
        <div className="flex-1 mx-8">
          <div className="text-6xl text-teal-400">👤</div>
          <h2 className="text-xl font-semibold mt-4">Irnr Level: 2</h2>
          <p className="text-gray-600 mt-2">151/200 xp</p>
        </div>
      </div>
    </div>
  );
}
