import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    alert("Logged Out Successfully!");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[450px]">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          👤 My Profile
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Email</h2>
            <p className="text-gray-600">
              {user?.email}
            </p>
          </div>

          <div>
            <h2 className="font-semibold">User ID</h2>
            <p className="text-gray-600 break-all">
              {user?.id}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;