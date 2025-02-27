import React from "react";
import { useState } from "react";
import "@dotlottie/player-component/dist/dotlottie-player";


export default function Question({ questions }) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswer, setUserAnswer] = useState("");
	const [evaluation, setEvaluation] = useState("");
	const [correct, setCorrect] = useState(false);

	const handleSubmit = async () => {
		try {
			setEvaluation(<dotlottie-player
        src="https://lottie.host/e3e5aeca-f9cb-4daf-ab3d-4d9b98980c23/qyAeM5XqX1.lottie"
        background="transparent"
        speed="1"
        style={{ width: '300px', height: '300px' }}
        loop
        autoplay
      ></dotlottie-player>);
      const response = await fetch("https://g1-lrnr-chatai.onrender.com/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questions[currentQuestionIndex].question,
          answer: userAnswer,
        }),
      });

			const data = await response.json();
			setEvaluation(data.feedback);
			setCorrect(data.correct);
			console.log(data);
		} catch (error) {
			console.error("Error evaluating answer:", error);
			setEvaluation(
				"There was an error evaluating your answer. Please try again."
			);
		}
	};

	const handleNextQuestion = () => {
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		setUserAnswer("");
		setEvaluation("");
	};

	const handleFinalQuestion = () => {
		window.location.href = "/result";
	};

	return (
		<div className="flex justify-center items-center min-h-scree min-w-[100%] pl-10">
			<div className="bg-white text-2xl space-y-4 w-screen">
				<div className="text-5xl font-bold mb-2 text-teal-600 text-center">
					{" "}
					{currentQuestionIndex + 1} of {questions.length}
				</div>

				<>
					<div>
						<label className="block  text-2xl font-bold mb-2 text-teal-600">
							Question:
						</label>
						<div className="text-lg">
							{questions[currentQuestionIndex].question}
						</div>
					</div>
					<div>
						<label className="block text-2xl font-bold mb-2 text-teal-600 pt-5">
							Your Answer:
						</label>
						<input
							type="text"
							value={userAnswer}
							onChange={(e) => setUserAnswer(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight max-w-[70vw]  text-lg focus:outline-none focus:shadow-outline"
						/>
					</div>
					<button
						onClick={handleSubmit}
						className="bg-teal-600 text-white font-medium py-3 px-4"
					>
						Submit Answer
					</button>
				</>
				{evaluation && (
					<>
            <h1 className="text-2xl font-bold mb-4 text-left pt-10">Your Evaluation</h1>
						<div className="text-lg font-medium mt-4 flex justify-between h-auto">
							<div
								className={`text-lg font-medium mt-4 min-w-1/3 ${
									correct ? "text-green-500" : "text-red-500"
								} flex flex-col justify-between`}
							>
								{correct ? "Correct" : "Incorrect"}
							</div>
							<div className="text-lg font-medium text-black mt-4">
								{evaluation}
							</div>
						</div>
						{currentQuestionIndex != questions.length - 1 ? (
							<button
								onClick={handleNextQuestion}
								className="bg-teal-600 text-white font-medium py-3 px-4"
							>
								Next Question
							</button>
						) : (
							<button
								onClick={handleFinalQuestion}
								className="bg-teal-600 text-white font-medium py-3 px-4"
							>
								Finish Quiz
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
}
