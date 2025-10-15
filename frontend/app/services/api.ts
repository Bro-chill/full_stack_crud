const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface UserCreate {
  name: string;
  email: string;
  age: number;
}

export interface PostCreate {
  user_id: string;
  title: string;
  content: string;
}

class ApiService {
  // User endpoints
  async createUser(userData: UserCreate) {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  }

  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users/`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  }

  async getUser(userId: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  }

  async updateUser(userId: string, userData: UserCreate) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  }

  async deleteUser(userId: string) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  }

  // Post endpoints
  async createPost(postData: PostCreate) {
    const response = await fetch(`${API_BASE_URL}/posts/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  }

  async getAllPosts(): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/posts/`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  }

  async getUserPosts(userId: string): Promise<Omit<Post, 'user_id'>[]> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
    if (!response.ok) throw new Error('Failed to fetch user posts');
    return response.json();
  }

  async updatePost(postId: string, title: string, content: string) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  }

  async deletePost(postId: string) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return response.json();
  }

  async checkConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const api = new ApiService();
