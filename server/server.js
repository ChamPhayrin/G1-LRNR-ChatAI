const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

//Making call to open ai to fetch questions
app.post("/api/questions", async (req, res) => {
	const { topic, expertise, numQuestions, style } = req.body;
	// API key below
	const apiKey = process.env.OPENAI_API_KEY;
	const openai = new OpenAI({ apiKey: apiKey });
	// AI model
	const aiModel = "gpt-4";
	//Messages Array
	const messages = [
		{
			role: "system",
			content: `You are a quiz master. Generate ${numQuestions} random questions about the topic "${topic}" at an "${expertise}" level in the style of "${style}". Provide the questions and answers in the following JSON format: {"questions":[{"id":0,"question":"<question>"},...]}. Only provide the JSON response, nothing else. Do not include the answer.`,
		},
	];
	try {
		const completion = await openai.chat.completions.create({
			model: aiModel,
			messages: messages,
		});

		const aiResponse = completion.choices[0].message.content.trim();

		// Ensure the response is valid JSON
		let json;
		try {
			const jsonString = aiResponse.substring(
				aiResponse.indexOf("{"),
				aiResponse.lastIndexOf("}") + 1
			);
			if (jsonString) {
				json = JSON.parse(jsonString);
			} else {
				throw new Error("Empty JSON string");
			}
		} catch (parseError) {
			console.error("Failed to parse AI response:", parseError);
			return res
				.status(500)
				.send({
					errorMessage: "Invalid JSON response from OpenAI",
					error: parseError.message,
				});
		}

		// return the question json
		res.json(json);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error fetching questions from OpenAI");
	}
});


app.post("/api/evaluate", async (req, res) => {
    const { question, answer } = req.body;
    // API key below
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey: apiKey });
    // AI model
    const aiModel = "gpt-4";
    //Messages Array
    const messages = [
        {
            role: "system",
            content: `You are a grader. Your task is to grade whether the user's answer loosely or directly addresses the given question, even if the question is phrased creatively or informally. Grade the response based on relevance and intent, not just strict wording. If the user's answer captures the essence of the correct response, consider it valid. Provide feedback in a kind and encouraging tone, and calculate a percentage (0-100) indicating how close the user's answer is to the correct answer..Respond strictly in the following JSON format: {"correct": true/false, "feedback": "<your_feedback_here>", "percent": <percentage_value>}. Do not include any additional text or explanations outside the JSON format. Be flexible and understanding, focusing on the user's intent rather than strict adherence to phrasing. Remember to embody your personality.`,
        },
        {
            role: "user",
            content: `Question: ${question}\nUser's Answer: ${answer}`,
        },
    ];
    try {
        const completion = await openai.chat.completions.create({
            model: aiModel,
            messages: messages,
        });

        const aiResponse = completion.choices[0].message.content.trim();

        // Ensure the response is valid JSON
        let json;
        try {
            const jsonString = aiResponse.substring(
                aiResponse.indexOf("{"),
                aiResponse.lastIndexOf("}") + 1
            );
            if (jsonString) {
                json = JSON.parse(jsonString);
            } else {
                throw new Error("Empty JSON string");
            }
        } catch (parseError) {
            console.error("Failed to parse AI response:", parseError);
            return res
                .status(500)
                .send({
                    errorMessage: "Invalid JSON response from OpenAI",
                    error: parseError.message,
                });
        }

        // return the evaluation json
        res.json(json);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error evaluating answer with OpenAI");
    }
});

app.listen(PORT, () => {
	console.log("server is running on port 5000 ");
});
