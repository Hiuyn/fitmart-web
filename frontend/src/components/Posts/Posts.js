import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../api';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>{post.title}</div>
      ))}
    </div>
  );
};

export default Posts;
