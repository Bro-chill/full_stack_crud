import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import FeatureCard from "~/components/FeatureCard";
import Card from "~/components/Card";
import { Users, FileText, LayoutDashboard } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Database Manager - Home" },
    { name: "description", content: "MongoDB Database Management System" },
  ];
}

const features = [
  {
    icon: Users,
    title: "User Management",
    description: "Create, update, and delete users. View all users in one place.",
    link: "/user",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: FileText,
    title: "Post Management",
    description: "Create and manage posts. Assign posts to users.",
    link: "/post",
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "View statistics and analytics about your data.",
    link: "/dashboard",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const gettingStartedSteps = [
  "Make sure your FastAPI backend is running on port 8000",
  "Navigate to User Management to create some users",
  "Create posts and assign them to users",
  "View your dashboard to see analytics",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            MongoDB Database Manager
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your users and posts with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature) => (
            <FeatureCard key={feature.link} {...feature} />
          ))}
        </div>

        <Card className="mt-16 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Getting Started
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
            {gettingStartedSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </Card>
      </div>
    </main>
  );
}
