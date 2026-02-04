import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import articles from '../article-content';
import CommentList from '../CommentList';
import AddCommentForm from '../AddCommentForm';
import axios from 'axios';

export default function ArticlePage() {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  const article = articles.find(article => article.name === name);
  
  if (!article) {
    return <h1>Article not found</h1>;
  }

  const onUpVoteClicked = async () => {
    const response =  await axios.post(`/api/articles/${name}/upvote`);
    const updatedArticle = response.data;
    setUpvotes(updatedArticle.upvotes);
  }

  async function onAddComment({ nameText, commentText }) {
    const response = await axios.post(`/api/articles/${name}/comments`, {
      postedBy: nameText,
      text: commentText,
    });
    const updatedArticle = response.data;
    setComments(updatedArticle.comments);
  }
  
  return (
    <>
    <h1>{article.title}</h1>
    <button onClick={onUpVoteClicked}>UpVote</button>
    <p>This article has {upvotes} upvotes.</p>
    { article.content.map((p, index) => <p key={index}>{p}</p>) }
    <AddCommentForm onAddComment={onAddComment} />
    <CommentList comments={comments} />
    </>
  );
}

export async function loader({ params }) {
  const response = await axios.get(`/api/articles/${params.name}`);
  const { upvotes, comments } = response.data;
  return {
    upvotes: upvotes,
    comments: comments,
  };
}