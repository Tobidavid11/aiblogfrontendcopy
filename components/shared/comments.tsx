import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  ImageIcon,
  Link2Icon,
  SmileIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  profile_pic: string;
  username: string;
}

interface Image {
  url: string;
  alt: string;
}

interface ItemComment {
  id: string;
  user: User;
  content: string;
  images: Image[];
  createdAt: string;
  likes: number;
  replies: ItemComment[];
  replyCount: number;
}

interface CommentFormData {
  content: string;
  images: File[];
}

interface CommentsProps {
  postId: string;
  initialComments: ItemComment[];
  initialCommentsCount: number;
}

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="flex items-center">
      <Image
        src={user.profile_pic}
        alt={user.name}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="ml-2">
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs text-gray-500">@{user.username}</p>
      </div>
    </div>
  );
};

const Comments: React.FC<CommentsProps> = ({
  initialComments = [],
  initialCommentsCount = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<ItemComment[]>(initialComments);
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);

  const handleToggleComments = () => {
    setIsOpen(!isOpen);
  };

  const handleAddComment = (newComment: CommentFormData) => {
    const createdComment: ItemComment = {
      id: Date.now().toString(),
      user: {
        id: "current-user-id",
        name: "Olamide",
        profile_pic: "/images/data-driven-blog/pic.png",
        username: "Olams",
      },
      content: newComment.content,
      images: newComment.images.map((file) => ({
        url: URL.createObjectURL(file),
        alt: file.name,
      })),
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
      replyCount: 0,
    };
    setComments([createdComment, ...comments]);
    setCommentsCount((prevCount) => prevCount + 1);
  };

  const handleReply = (
    commentChain: string[],
    replyComment: CommentFormData
  ) => {
    const updatedComments = [...comments];
    let currentLevel = updatedComments;
    // let currentComment;

    for (let i = 0; i < commentChain.length; i++) {
      const commentId = commentChain[i];
      const commentIndex = currentLevel.findIndex((c) => c.id === commentId);
      if (commentIndex !== -1) {
        if (i === commentChain.length - 1) {
          const newReply: ItemComment = {
            id: Date.now().toString(),
            user: {
              id: "current-user-id",
              name: "Olamide",
              profile_pic: "/images/data-driven-blog/pic.png",
              username: "Olams",
            },
            content: replyComment.content,
            images: replyComment.images.map((file) => ({
              url: URL.createObjectURL(file),
              alt: file.name,
            })),
            createdAt: new Date().toISOString(),
            likes: 0,
            replies: [],
            replyCount: 0,
          };
          currentLevel[commentIndex].replies.push(newReply);
          currentLevel[commentIndex].replyCount++;
        } else {
          currentLevel = currentLevel[commentIndex].replies;
        }
      } else {
        // Comment not found, break the loop
        break;
      }
    }

    setComments(updatedComments);
    setCommentsCount((prevCount) => prevCount + 1);
  };

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleShare = () => {
    setShares((prevShares) => prevShares + 1);
  };

  return (
    <div className="mt-8 w-full">
      <div className="flex items-center space-x-4 mb-4">
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent outline-none border-none active:bg-gray-400"
          onClick={handleLike}
        >
          <ThumbsUp className="w-4 h-4 mr-2" />
          {likes}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent outline-none border-none active:bg-gray-400"
          onClick={handleToggleComments}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {commentsCount}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent outline-none border-none active:bg-gray-400"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          {shares}
        </Button>
      </div>

      {isOpen && (
        <div className="mt-4  rounded-xl p-4 w-full">
          <CommentList
            comments={comments}
            onReply={handleReply}
            commentChain={[]}
          />
          <div className="bg-[#FDF9D9] mt-4 p-3">
            <CommentBox onAddComment={handleAddComment} />
          </div>
        </div>
      )}
    </div>
  );
};

const CommentBox: React.FC<{
  onAddComment: (comment: CommentFormData) => void;
  replyingTo?: string;
}> = ({ onAddComment, replyingTo }) => {
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() || images.length > 0) {
      onAddComment({ content: comment, images });
      setComment("");
      setImages([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length !== files.length) {
      toast({
        title: "Invalid format",
        description: "Only image files are allowed.",
        variant: "destructive",
      });
    }

    setImages((prevImages) => [...prevImages, ...imageFiles]);
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4">
      <div className="border border-neutral-200 rounded overflow-hidden bg-white">
        <div className="p-4 min-h-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              replyingTo ? `Reply to ${replyingTo}...` : "Add a comment..."
            }
            className="w-full h-24 resize-none focus:outline-none"
          />
          <div className="flex justify-between items-center text-[#D6D5D573] mt-2">
            <div className="flex space-x-2">
              <label className="cursor-pointer">
                <ImageIcon className="w-5 h-5 text-gray-500" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                />
              </label>
              <Link2Icon className="w-5 h-5 text-gray-500 cursor-pointer" />
              <SmileIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
            </div>
            <Button type="submit" variant="secondary">
              {replyingTo ? "Reply" : "Comment"}
            </Button>
          </div>
        </div>
        {images.length > 0 && (
          <div className="flex overflow-x-auto gap-2 p-4 bg-gray-50">
            {images.map((file, index) => (
              <div key={index} className="relative">
                <Image
                  src={URL.createObjectURL(file)}
                  width={100}
                  height={100}
                  alt={file.name}
                  className="rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-white rounded-full p-1"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
};

const CommentList: React.FC<{
  comments: ItemComment[];
  onReply: (commentChain: string[], replyComment: CommentFormData) => void;
  depth?: number;
  commentChain: string[];
}> = ({ comments, onReply, depth = 0, commentChain }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onReply={onReply}
          depth={depth}
          commentChain={[...commentChain, comment.id]}
        />
      ))}
    </div>
  );
};

const CommentItem: React.FC<{
  comment: ItemComment;
  onReply: (commentChain: string[], replyComment: CommentFormData) => void;
  depth: number;
  commentChain: string[];
}> = ({ comment, onReply, depth, commentChain }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [showAllReplies, setShowAllReplies] = useState(depth < 2);

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleReply = (replyComment: CommentFormData) => {
    onReply(commentChain, replyComment);
    setIsReplying(false);
  };

  const handleReplyClick = () => {
    setIsReplying(!isReplying);
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - commentDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className={`bg-[#FDFFFC] rounded-lg p-4  ${depth > 0 ? "ml-2" : ""}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="">
              <UserProfile user={comment.user} />
              <p className="text-xs text-gray-500">
                <span className="w-2 h-2 bg-[#9CA3AF] rounded-full mr-2 inline-block"></span>
                {formatTimeAgo(comment.createdAt)}
              </p>
            </div>

            <div className="">
              <Button
                // onClick={followAction}
                className="bg-[#171717] hover:bg-[#525252] text-[#FAFAFA] font-medium capitalize rounded-full transition duration-300 ease-in-out"
              >
                Follow
              </Button>
            </div>
          </div>

          <p className="mt-2">{comment.content}</p>
          {comment.images && comment.images.length > 0 && (
            <div className="flex mt-2 space-x-2 overflow-x-auto">
              {comment.images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  width={100}
                  height={100}
                  alt={image.alt}
                  className="rounded"
                />
              ))}
            </div>
          )}
          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={handleLike}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              {likes}
            </button>
            <button
              onClick={handleReplyClick}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Reply
            </button>
            {comment.replyCount > 0 && (
              <span className="text-sm text-gray-500">
                {comment.replyCount}{" "}
                {comment.replyCount === 1 ? "reply" : "replies"}
              </span>
            )}
          </div>
          {isReplying && (
            <div className="mt-2">
              <CommentBox
                // onAddComment={(replyComment) =>
                //   onReply([...commentChain, comment.id], replyComment)
                // }
                onAddComment={handleReply}
                replyingTo={comment.user.name}
              />
            </div>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <>
              {showAllReplies ? (
                <div className="mt-4">
                  <CommentList
                    comments={comment.replies}
                    onReply={onReply}
                    depth={depth + 1}
                    commentChain={commentChain}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowAllReplies(true)}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                >
                  Show more replies...
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
export type { ItemComment };
