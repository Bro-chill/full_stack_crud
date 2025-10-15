import { Edit2, Trash2 } from "lucide-react";
import IconButton from "./IconButton";
import Card from "./Card";
import type { Post } from "~/services/api";

interface PostCardProps {
  post: Post;
  authorName: string;
  onEdit: (post: Post) => void;
  onDelete: (postId: string) => void;
}

export default function PostCard({
  post,
  authorName,
  onEdit,
  onDelete,
}: PostCardProps) {
  return (
    <Card className="p-6 hover:border-[#00ffff] transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-[#00ffff] tracking-wider uppercase group-hover:neon-text transition-all">
          &gt;&gt; {post.title}
        </h3>
        <div className="flex gap-2">
          <IconButton 
            icon={Edit2} 
            onClick={() => onEdit(post)} 
            variant="primary" 
            title="Edit post" 
          />
          <IconButton 
            icon={Trash2} 
            onClick={() => onDelete(post.id)} 
            variant="danger" 
            title="Delete post" 
          />
        </div>
      </div>
      
      <p className="text-[#9ca3af] font-mono text-sm mb-6 leading-relaxed">
        {post.content}
      </p>
      
      <div className="border-t-2 border-[#2d3561] pt-4 flex justify-between items-center">
        <div>
          <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-1">AUTHOR:</p>
          <p className="text-sm text-[#e0e7ff] font-bold">{authorName}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-1">DATE:</p>
          <p className="text-xs text-[#00ff00] font-mono">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
}
