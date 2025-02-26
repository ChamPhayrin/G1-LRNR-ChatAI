import React, { useState, useRef, useEffect } from 'react';
import Question from '../components/Question';
// import 'tailwindcss/tailwind.css';



export default function Quiz() {
  const [topic, setTopic] = useState('golang');
  const [expertise, setExpertise] = useState('Beginner');
  const [numQuestions, setNumQuestions] = useState('5');
  const [style, setStyle] = useState('Master Oogway');
  const [questions, setQuestions] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ topic, expertise, numQuestions, style });

    return fetch('http://localhost:5000/api/questions', {  
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ topic, expertise, numQuestions, style }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data.questions);
      });
  }



  const [loading, setLoading] = useState(false);

  return (
    <main className="container p-4 min-h-[80vh] h-full w-full flex justify-center items-center">
      <div className="w-full w-auto">
        {questions.length === 0 ? (
          <form className="space-y-6" onSubmit={(e) => {
            setLoading(true);
            handleSubmit(e).finally(() => setLoading(false));
          }}>
            <h1 className="text-3xl font-bold mb-4 text-left">Quiz Generation Options</h1>
            <p className="mb-4 text-left">Please choose your preferences below to generate your personalized quiz</p>
            <div>
              <label className="block mb-2 text-gray-400 text-left">Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 border-b-2 border-teal-600 rounded-none"
                disabled={loading}
              >
                <option value="golang">golang</option>
                <option value="aws">aws</option>
                <option value="javascript">javascript</option>
                <option value="CI/CD">CI/CD</option>
                <option value="home gardens">home gardens</option>
                <option value="coffee">coffee</option>
                <option value="finger foods">finger foods</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-400 text-left">Expertise</label>
              <select
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                className="w-full p-2 border-b-2 border-teal-600 rounded-none"
                disabled={loading}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-400 text-left">Number of Questions</label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                className="w-full p-2 border-b-2 border-teal-600 rounded-none"
                disabled={loading}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-400 text-left">Style of Questions</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-2 border-b-2 border-teal-600 rounded-none"
                disabled={loading}
              >
                <option value="Master Oogway">Master Oogway</option>
                <option value="1940's gangster">1940's gangster</option>
                <option value="Like I'm an 8-year old">Like I'm an 8-year old</option>
                <option value="Jedi">Jedi</option>
                <option value="Captain Jack Sparrow">Captain Jack Sparrow</option>
                <option value="Matthew Mcconaughey">Matthew Mcconaughey</option>
              </select>
            </div>
            <button type="submit" className="bg-teal-600 text-white font-medium py-3 px-4 rounded w-full sm:w-auto hover:cursor-pointer" disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>
        ) : (
          <Question questions={questions} />
        )}
      </div>
    </main>
  );
}