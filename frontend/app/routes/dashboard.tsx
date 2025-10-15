import { Users, FileText, TrendingUp, Calendar } from "lucide-react";
import PageLayout from "~/components/PageLayout";
import StatCard from "~/components/StatCard";
import Card from "~/components/Card";
import LoadingSpinner from "~/components/LoadingSpinner";
import EmptyState from "~/components/EmptyState";
import { useUsers } from "~/hooks/useUsers";
import { usePosts } from "~/hooks/usePosts";

export const meta = () => ([
  { title: 'Dashboard' },
  { name: 'description', content: 'Dashboard overview' }
]);

export default function Dashboard() {
  const { users, loading: usersLoading } = useUsers();
  const { posts, loading: postsLoading } = usePosts();

  const loading = usersLoading || postsLoading;

  const stats = {
    totalUsers: users.length,
    totalPosts: posts.length,
    averageAge: users.length > 0
      ? (users.reduce((sum, user) => sum + user.age, 0) / users.length).toFixed(1)
      : '0',
    postsPerUser: users.length > 0
      ? (posts.length / users.length).toFixed(1)
      : '0',
  };

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <PageLayout title="Dashboard">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Users}
              title="Total Users"
              value={stats.totalUsers}
              iconColor="text-blue-600"
              bgColor="bg-blue-100"
            />
            <StatCard
              icon={FileText}
              title="Total Posts"
              value={stats.totalPosts}
              iconColor="text-green-600"
              bgColor="bg-green-100"
            />
            <StatCard
              icon={TrendingUp}
              title="Average Age"
              value={stats.averageAge}
              iconColor="text-purple-600"
              bgColor="bg-purple-100"
            />
            <StatCard
              icon={Calendar}
              title="Posts per User"
              value={stats.postsPerUser}
              iconColor="text-orange-600"
              bgColor="bg-orange-100"
            />
          </div>

          {/* Recent Posts */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Posts
            </h2>
            {recentPosts.length > 0 ? (
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="No posts yet" />
            )}
          </Card>
        </>
      )}
    </PageLayout>
  );
}
