import type { StatsCardProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle, Clipboard, Hourglass } from "lucide-react";

export const StatsCard = ({ data }: { data: StatsCardProps }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold">
            Total Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalProjects}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-3">
            <Badge variant={"outline"} className="text-yellow-600">
              <Hourglass /> {data.totalProjectInProgress} in progress
            </Badge>
            <Badge variant={"outline"} className="text-emerald-600">
              <CheckCircle /> {data.totalProjectCompleted} completed
            </Badge>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold">Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalTasks}</div>

          <Badge variant={"outline"} className="text-emerald-600 text-xs ">
            <CheckCircle /> {data.totalTaskCompleted} completed
          </Badge>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold">Tasks To Do</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalTaskToDo}</div>

          <Badge variant={"outline"} className="text-red-600 text-xs ">
            <Clipboard /> waiting to be done
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold">
            Tasks in progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalTaskInProgress}</div>

          <Badge variant={"outline"} className="text-yellow-600 text-xs ">
            <Hourglass /> in progress
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};
