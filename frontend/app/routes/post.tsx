import { useState } from "react";
import { Plus, X } from "lucide-react";
import PageLayout from "~/components/PageLayout";
import Card from "~/components/Card";
import FormInput from "~/components/FormInput";
import FormTextarea from "~/components/FormTextarea";
import FormSelect from "~/components/FormSelect";
import Button from "~/components/Button";
import LoadingSpinner from "~/components/LoadingSpinner";
import ErrorMessage from "~/components/ErrorMessage";
import EmptyState from "~/components/EmptyState";
import PostCard from "~/components/PostCard";
import { api } from "~/services/api";
import type { Post, PostCreate } from "~/services/api";
import { usePosts } from "~/hooks/usePosts";
import { useUsers } from "~/hooks/useUsers";

export const meta = () => ([
  { title: 'Post Management' },
  { name: 'description', content: 'Manage posts' }
]);

export default function PostPage() {
  const { posts, loading: postsLoading, error: postsError, refreshPosts } = usePosts();
  const { users, loading: usersLoading } = useUsers();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<PostCreate>({
    user_id: '',
    title: '',
    content: '',
  });

  const loading = postsLoading || usersLoading;
  const error = postsError;

  const resetForm = () => {
    setFormData({ user_id: '', title: '', content: '' });
    setShowCreateForm(false);
    setEditingPost(null);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createPost(formData);
      resetForm();
      await refreshPosts();
    } catch (err) {
      alert('Failed to create post');
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    
    try {
      await api.updatePost(editingPost.id, formData.title, formData.content);
      resetForm();
      await refreshPosts();
    } catch (err) {
      alert('Failed to update post');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await api.deletePost(postId);
      await refreshPosts();
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setFormData({
      user_id: post.user_id,
      title: post.title,
      content: post.content,
    });
    setShowCreateForm(false);
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setEditingPost(null);
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const userOptions = users.map(user => ({
    value: user.id,
    label: `${user.name} (${user.email})`,
  }));

  return (
    <PageLayout
      title="Post Management"
      actions={
        <Button
          onClick={toggleCreateForm}
          icon={showCreateForm ? X : Plus}
        >
          {showCreateForm ? 'Cancel' : 'New Post'}
        </Button>
      }
    >
      {error && <ErrorMessage message={error} />}

      {/* Create/Edit Form */}
      {(showCreateForm || editingPost) && (
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-[#ff00ff] neon-text tracking-wider uppercase">
            {editingPost ? '&gt;&gt; Edit Post' : '&gt;&gt; Create New Post'}
          </h2>
          <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost} className="space-y-6">
            {editingPost ? (
              <FormInput
                label="Author"
                value={getUserName(formData.user_id)}
                onChange={() => {}}
                disabled
              />
            ) : (
              <FormSelect
                label="Select User"
                value={formData.user_id}
                onChange={(value) => setFormData({ ...formData, user_id: value })}
                options={userOptions}
                placeholder="Choose a user..."
                required
              />
            )}
            <FormInput
              label="Title"
              value={formData.title}
              onChange={(value) => setFormData({ ...formData, title: value })}
              required
            />
            <FormTextarea
              label="Content"
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              required
              rows={4}
            />
            <div className="flex gap-3 pt-4">
              <Button type="submit">
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
              {editingPost && (
                <Button onClick={resetForm} variant="secondary">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>
      )}

      {/* Posts Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                authorName={getUserName(post.user_id)}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
          {posts.length === 0 && (
            <EmptyState message="No posts found. Create one to get started!" />
          )}
        </>
      )}
    </PageLayout>
  );
}