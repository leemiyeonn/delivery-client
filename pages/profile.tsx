import { NextPage } from "next";
import { useState, useEffect } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
}

const Profile: NextPage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // 임시 데이터 정의
    const tempProfile: UserProfile = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "A passionate food lover and adventure seeker.",
    };

    // 상태 업데이트
    setProfile(tempProfile);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {profile ? (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
          <p className="text-gray-700 mb-2">Email: {profile.email}</p>
          <p className="text-gray-700">Bio: {profile.bio}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
