import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Subjects() {
  const [subjectName, setSubjectName] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  async function fetchSubjects() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setSubjects(data);
  }

  async function addSubject() {
    if (subjectName.trim() === "") {
      alert("Please enter a subject");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("subjects").insert([
      {
        subject_name: subjectName,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setSubjectName("");
    fetchSubjects();
  }

  async function deleteSubject(id) {
    const { error } = await supabase
      .from("subjects")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchSubjects();
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        📚 Subjects
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-80"
        />

        <button
          onClick={addSubject}
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
        >
          Add Subject
        </button>
      </div>

      {subjects.length === 0 ? (
        <p className="text-gray-500">No subjects added yet.</p>
      ) : (
        subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <h2 className="text-xl font-semibold">
              {subject.subject_name}
            </h2>

            <button
              onClick={() => deleteSubject(subject.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Subjects;