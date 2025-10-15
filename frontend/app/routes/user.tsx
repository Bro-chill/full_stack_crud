import { useState } from "react";
import { Trash2, Edit2, Plus, X } from "lucide-react";
import PageLayout from "~/components/PageLayout";
import Card from "~/components/Card";
import FormInput from "~/components/FormInput";
import Button from "~/components/Button";
import IconButton from "~/components/IconButton";
import LoadingSpinner from "~/components/LoadingSpinner";
import ErrorMessage from "~/components/ErrorMessage";
import EmptyState from "~/components/EmptyState";
import { api } from "~/services/api";
import type { User, UserCreate } from "~/services/api";
import { useUsers } from "~/hooks/useUsers";

export const meta = () => ([
  { title: 'User Management' },
  { name: 'description', content: 'Manage users' }
]);

export default function UserPage() {
  const { users, loading, error, refreshUsers } = useUsers();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserCreate>({
    name: '',
    email: '',
    age: 25,
  });

  const resetForm = () => {
    setFormData({ name: '', email: '', age: 25 });
    setShowCreateForm(false);
    setEditingUser(null);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createUser(formData);
      resetForm();
      await refreshUsers();
    } catch (err) {
      alert('Failed to create user');
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    try {
      await api.updateUser(editingUser.id, formData);
      resetForm();
      await refreshUsers();
    } catch (err) {
      alert('Failed to update user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure? This will delete the user and all their posts.')) return;
    
    try {
      await api.deleteUser(userId);
      await refreshUsers();
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
    });
    setShowCreateForm(false);
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setEditingUser(null);
  };

  const handleAgeChange = (value: string) => {
    // Parse the value, if empty or invalid, use 0 or previous value
    const parsedAge = value === '' ? 0 : parseInt(value, 10);
    setFormData({ 
      ...formData, 
      age: isNaN(parsedAge) ? 0 : parsedAge 
    });
  };

  return (
    <PageLayout
      title="User Management"
      actions={
        <Button
          onClick={toggleCreateForm}
          icon={showCreateForm ? X : Plus}
        >
          {showCreateForm ? 'Cancel' : 'New User'}
        </Button>
      }
    >
      {error && <ErrorMessage message={error} />}

      {/* Create/Edit Form */}
      {(showCreateForm || editingUser) && (
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-[#ff00ff] neon-text tracking-wider uppercase">
            {editingUser ? '&gt;&gt; Edit User' : '&gt;&gt; Create New User'}
          </h2>
          <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                label="Name"
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                required
              />
              <FormInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                required
              />
              <FormInput
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleAgeChange}
                required
                min={1}
                max={120}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit">
                {editingUser ? 'Update' : 'Create'}
              </Button>
              {editingUser && (
                <Button onClick={resetForm} variant="secondary">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>
      )}

      {/* Users Table */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#0a0e27] border-b-2 border-[#00ffff]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#00ffff] uppercase tracking-wider">
                    &gt; Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#00ffff] uppercase tracking-wider">
                    &gt; Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#00ffff] uppercase tracking-wider">
                    &gt; Age
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#00ffff] uppercase tracking-wider">
                    &gt; Created At
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-[#00ffff] uppercase tracking-wider">
                    &gt; Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3561]">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-[#2d3561]/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-[#e0e7ff] font-mono">
                        {user.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9ca3af] font-mono">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#00ff00] font-mono font-bold">
                      {user.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9ca3af] font-mono">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <IconButton
                        icon={Edit2}
                        onClick={() => startEdit(user)}
                        variant="primary"
                        title="Edit user"
                      />
                      <IconButton
                        icon={Trash2}
                        onClick={() => handleDeleteUser(user.id)}
                        variant="danger"
                        title="Delete user"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <EmptyState message="No users found. Create one to get started!" />
          )}
        </Card>
      )}
    </PageLayout>
  );
}