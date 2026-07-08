function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-bold text-blue-600">
          📚 StudyNest AI
        </h1>

        <div className="space-x-4">
          <a
            href="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </a>

          <a
            href="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl"
          >
            Get Started
          </a>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="text-center px-6 py-16">

        <h2 className="text-5xl font-bold text-gray-800">
          Learn Smarter with
          <span className="text-blue-600">
            {" "}StudyNest AI
          </span>
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          An AI powered learning platform that helps students manage notes,
          generate summaries, create quizzes and track their progress.
        </p>

        <a
          href="/signup"
          className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-blue-700"
        >
          Start Learning 🚀
        </a>

      </section>


      {/* Features */}
      <section className="px-8 pb-16">

        <h2 className="text-3xl font-bold text-center mb-8">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
            <h3 className="text-xl font-bold">
              🤖 AI Assistant
            </h3>
            <p className="mt-3 text-gray-600">
              Get instant answers and learning support.
            </p>
          </div>


          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
            <h3 className="text-xl font-bold">
              📝 Smart Notes
            </h3>
            <p className="mt-3 text-gray-600">
              Create and manage your study notes easily.
            </p>
          </div>


          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
            <h3 className="text-xl font-bold">
              📊 Analytics
            </h3>
            <p className="mt-3 text-gray-600">
              Track your learning progress.
            </p>
          </div>

        </div>

      </section>


      {/* Tech Stack */}
      <section className="bg-white py-10 text-center">

        <h2 className="text-2xl font-bold mb-5">
          Built With
        </h2>

        <p className="text-gray-600">
          React • Tailwind CSS • Supabase • Groq AI • Recharts
        </p>

      </section>

    </div>
  );
}

export default Landing;