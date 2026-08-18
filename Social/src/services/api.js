const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

export const getPostById = async postId => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  return response.json();
};

export const getCommentsByPostId = async postId => {
  const response = await fetch(
    `${BASE_URL}/comments?postId=${postId}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  return response.json();
};

export const getUserPosts = async userId => {
  const response = await fetch(
    `${BASE_URL}/posts?userId=${userId}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }

  return response.json();
};