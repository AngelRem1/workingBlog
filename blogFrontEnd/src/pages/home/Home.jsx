import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import { axiosInstance } from "../../config";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  const [hasError, setError] = useState(false);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     let url = "http://localhost:3900/posts"
  //     const res = await axios.get(url + search);
  //     setPosts(res.data);
  //     console.log(posts);
  //   };
  //   fetchPosts();
  // }, [search]);
  useEffect(() => {
    let mounted = true;
    async function fetchDataAsync() {
      console.log("Fetch Data");
      try {
        const url = "http://localhost:3900/posts/" + search;
        console.log("search" , search);
        const res = await axios.get(url);
        setPosts(res.data );
        console.log("hello", posts._id);
        console.log(posts.data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }
    if (hasError) {
      return <p>Loading posts failed.</p>
    }
    if (mounted) fetchDataAsync();
    return () => {
      mounted = false;
    };
  }, [search]);
  
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
