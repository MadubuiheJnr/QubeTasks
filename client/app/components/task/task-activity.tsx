import { getData } from "@/lib/fetch-utils";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loader";
import type { ActivityLog } from "@/types";
import { getActivityIcon } from "./task-icon";
import { Separator } from "../ui/separator";

export const TaskActivity = ({ resourceId }: { resourceId: string }) => {
  const { data, isPending } = useQuery({
    queryKey: ["task-activity", resourceId],
    queryFn: () => getData(`tasks/${resourceId}/activity`),
  }) as {
    data: ActivityLog[];
    isPending: boolean;
  };

  if (isPending) return <Loader />;
  return (
    <div className="bg-card rounded-lg  shadow-sm ">
      <div className="">
        <h3 className="text-lg text-primary py-4 px-6">Activities</h3>
        <Separator orientation="horizontal" />
      </div>

      <div className="space-y-4 p-6">
        {data?.map((activity) => (
          <div key={activity._id} className="flex gap-3">
            <div className="size-8 rounded-full flex items-center justify-center">
              {getActivityIcon(activity.action)}
            </div>

            <div>
              <p className="text-xs text-primary">
                <span className="font-medium">{activity.user.name}</span>{" "}
                <span className="text-muted-foreground ">
                  {activity.details?.description}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
