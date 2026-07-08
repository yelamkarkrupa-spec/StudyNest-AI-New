import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Notes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setNotes(data);
    }
  }

  async function addNote() {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("notes")
      .insert([
        {
          title,
          content,
          user_id: user.id,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setContent("");
    fetchNotes();
  }

  async function deleteNote(id) {
    await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    fetchNotes();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">
          📝 Smart Notes
        </h1>

        <div className="bg-blue-600 text-white px-5 py-3 rounded-xl">
          Total Notes: {notes.length}
        </div>
      </div>


      {/* Add Note */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Create New Note
        </h2>

        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-3 rounded-xl h-32 mb-4"
        />

        <button
          onClick={addNote}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          + Add Note
        </button>

      </div>


      {/* Notes List */}
      <div className="grid md:grid-cols-2 gap-6">

        {notes.length === 0 ? (
          <p className="text-gray-500">
            No notes added yet.
          </p>
        ) : (

          notes.map((note) => (

            <div
              key={note.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition"
            >

              <h2 className="text-xl font-bold text-gray-800">
                📌 {note.title}
              </h2>

              <p className="mt-3 text-gray-600">
                {note.content}
              </p>


              <button
                onClick={() => deleteNote(note.id)}
                className="mt-5 bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Notes;