import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [subjects, setSubjects] = useState(0);
  const [notes, setNotes] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { count: subjectCount } = await supabase
      .from("subjects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    const { count: noteCount } = await supabase
      .from("notes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    setSubjects(subjectCount || 0);
    setNotes(noteCount || 0);
  }


  const chartData = [
    {
      name: "Subjects",
      value: subjects,
    },
    {
      name: "Notes",
      value: notes,
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-8">

      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        📊 Learning Analytics
      </h1>


      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-bold text-blue-600">
            📚 Total Subjects
          </h2>

          <p className="text-5xl font-bold mt-5">
            {subjects}
          </p>
        </div>


        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-bold text-green-600">
            📝 Total Notes
          </h2>

          <p className="text-5xl font-bold mt-5">
            {notes}
          </p>
        </div>

      </div>


      {/* Chart */}
      <div className="bg-white rounded-2xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          📈 Study Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={chartData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" />

          </BarChart>

        </ResponsiveContainer>

      </div>


    </div>
  );
}

export default Analytics;