import { useState } from "react";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "user",
                content: question,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      setAnswer(data.choices[0].message.content);

    } catch (error) {
      setAnswer("Something went wrong!");
    }

    setLoading(false);
  };


  const suggestionClick = (text) => {
    setQuestion(text);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700">
          🤖 StudyNest AI Assistant
        </h1>

        <p className="mt-3 text-gray-600">
          Ask questions and get instant AI powered study help.
        </p>


        <div className="mt-8 bg-white rounded-2xl shadow p-6">


          <div className="bg-blue-50 rounded-xl p-5 min-h-[180px]">

            {answer ? (
              <>
                <h2 className="font-bold text-blue-600">
                  AI Response
                </h2>

                <p className="mt-3 text-gray-700 whitespace-pre-line">
                  {answer}
                </p>
              </>
            ) : (
              <p className="text-gray-500">
                Your AI answer will appear here...
              </p>
            )}

          </div>


          <input
            className="mt-6 w-full border p-4 rounded-xl"
            placeholder="Ask your study question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />


          <button
            onClick={askAI}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            {loading ? "🤔 Thinking..." : "🚀 Ask AI"}
          </button>

        </div>


        <div className="grid md:grid-cols-3 gap-4 mt-6">


          <div
            onClick={() =>
              suggestionClick("Explain any topic in simple words")
            }
            className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-lg"
          >
            📚 Explain a topic
          </div>


          <div
            onClick={() =>
              suggestionClick("Generate a short summary of this topic")
            }
            className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-lg"
          >
            📝 Generate summary
          </div>


          <div
            onClick={() =>
              suggestionClick("Create a quiz for this topic")
            }
            className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-lg"
          >
            ❓ Create quiz
          </div>


        </div>


      </div>

    </div>
  );
}

export default AIAssistant;