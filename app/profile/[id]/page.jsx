"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {  useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";
import { router} from 'next/client';
const MyProfile = ({ params }) => {
  const userName = useSearchParams().get("name");
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you wanna delete it?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${params.id}/posts`);
    const data = await response.json();
    setPosts(data);
  };
  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);
  useEffect(() => {
    fetchPosts();
  }, [params.id]);
  return (
    <Profile
      name={`${userName} Profile`}
      desc="Welcome to your personalized page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
