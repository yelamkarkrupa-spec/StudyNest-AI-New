import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert("Logged out successfully!");
    navigate("/login");
  };

  const cards = [
    {
      title: "Subjects",
      icon: "📚",
      desc: "Manage your subjects and study topics.",
      path: "/subjects",
    },
    {
      title: "Smart Notes",
      icon: "📝",
      desc: "Create, edit and manage your notes.",
      path: "/notes",
    },
    {
      title: "AI Assistant",
      icon: "🤖",
      desc: "Ask questions and get AI powered answers.",
      path: "/ai",
    },
    {
      title: "Analytics",
      icon: "📊",
      desc: "Track your learning progress.",
      path: "/analytics",
    },
    {
      title: "Profile",
      icon: "👤",
      desc: "View and update your profile.",
      path: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-8">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-8 mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          📚 StudyNest AI
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Your smart learning companion powered by Artificial Intelligence.
        </p>

        <div className="mt-5 flex gap-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-bold text-blue-600">AI Learning</h3>
            <p className="text-sm text-gray-600">
              Smart assistance anytime
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-bold text-blue-600">Smart Notes</h3>
            <p className="text-sm text-gray-600">
              Organize your study
            </p>
          </div>
        </div>
      </div>


      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
          >
            <div className="text-4xl mb-4">
              {card.icon}
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              {card.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {card.desc}
            </p>

            <button className="mt-5 text-blue-600 font-semibold">
              Open →
            </button>

          </div>
        ))}


        {/* Logout */}
        <div
          onClick={handleLogout}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
        >
          <div className="text-4xl mb-4">
            🚪
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            Logout
          </h2>

          <p className="mt-2 text-gray-600">
            Sign out from your account.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;