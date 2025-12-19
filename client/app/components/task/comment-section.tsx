import type { Comment, User } from "@/types";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import {
  useAddCommentMutation,
  useGetCommentsByTaskIdQuery,
} from "@/hooks/use-task";
import { toast } from "sonner";
import Loader from "../loader";
import { NoDataFound } from "../no-data-found";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";

export const CommentSection = ({
  taskId,
  members,
}: {
  taskId: string;
  members: User[];
}) => {
  const [newComment, setNewComment] = useState("");

  const { mutate: addComment, isPending } = useAddCommentMutation();
  const { data: comments, isLoading } = useGetCommentsByTaskIdQuery(taskId) as {
    data: Comment[];
    isLoading: boolean;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    addComment(
      { taskId, text: newComment },
      {
        onSuccess: () => {
          setNewComment("");
          toast.success("Comment added successfully");
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
          console.log(error);
        },
      }
    );
  };
  return (
    <div className="bg-card rounded-lg shadow-sm">
      <div className="">
        <h3 className="text-md text-primary py-4 px-6">Comments</h3>
        <Separator />
      </div>

      <ScrollArea className="h-[300px] mb-4 p-6">
        {isLoading ? (
          <Loader />
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 py-3">
              <Avatar className="size-8">
                <AvatarImage src={comment.author.profilePicture} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1 ">
                  <span className="font-medium text-xs">
                    {comment.author.name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.createdAt, {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full p-6 mt-5">
            <NoDataFound
              title="No comments found"
              description="Comments will appear here when users add a comment"
            />
          </div>
        )}
      </ScrollArea>

      <Separator className="my-4" />

      <div className="mt-4 px-6 py-4">
        <Textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isPending}
          className="resize-none"
        />

        <div className="flex justify-end mt-3">
          <Button
            disabled={!newComment.trim() || isPending}
            onClick={handleAddComment}
          >
            <Send /> Send
          </Button>
        </div>
      </div>
    </div>
  );
};
