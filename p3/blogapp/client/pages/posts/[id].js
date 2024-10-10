import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { commentOnPost, getPost } from '../../services/api';

export default function PostDetail() {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      const res = await getPost(id);
      setPost(res.data);
    };
    if (id) fetchPost();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await commentOnPost(id, { body: comment }, token);
      setComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <form onSubmit={handleComment}>
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Comment</button>
      </form>

      <div>
        {post.comments?.map((c, index) => (
          <div key={index}>
            <p>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
