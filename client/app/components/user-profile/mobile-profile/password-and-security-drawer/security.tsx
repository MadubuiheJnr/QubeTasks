import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { MapPin } from "lucide-react";

export const loginActivities = [
  {
    id: "1",
    device: "Chrome on macOS",
    location: "San Francisco, United States",
    ipAddress: "192.168.1.24",
    lastActive: "2 minutes ago",
    current: true,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "Toronto, Canada",
    ipAddress: "172.16.4.102",
    lastActive: "Yesterday at 8:41 PM",
    current: false,
  },
  {
    id: "3",
    device: "Firefox on Windows",
    location: "Berlin, Germany",
    ipAddress: "10.0.0.56",
    lastActive: "Aug 28, 2025 at 11:13 AM",
    current: false,
  },
  {
    id: "4",
    device: "Edge on Windows",
    location: "Tokyo, Japan",
    ipAddress: "203.0.113.9",
    lastActive: "Aug 22, 2025 at 6:02 AM",
    current: false,
  },
];

export const Security = () => {
  return (
    <div className="p-3 space-y-2">
      {loginActivities.map(
        (data) =>
          data.current && (
            <Item key={data.id} variant={"outline"}>
              <ItemContent>
                <Badge variant={"outline"} className="py-1 px-3 mb-2">
                  Current Session
                </Badge>
                <ItemTitle>{data.device}</ItemTitle>
                <ItemDescription>
                  <p className="flex items-center gap-1 text-sm">
                    <MapPin className="size-5" /> {data.location}
                  </p>
                  <p className="text-xs mt-0.5">{data.lastActive}</p>
                </ItemDescription>
              </ItemContent>
            </Item>
          )
      )}

      <div className="mt-7">
        <p className="text-sm font-semibold text-primary">Login Activity</p>
        <Card className="border-0 shadow-none py-3 gap-2">
          {loginActivities.map(
            (data) =>
              !data.current && (
                <Item key={data.id} variant={"outline"}>
                  <ItemContent>
                    <ItemTitle>{data.device}</ItemTitle>
                    <ItemDescription>
                      <p className="flex items-center gap-1 text-sm">
                        <MapPin className="size-5" /> {data.location}
                      </p>
                      <p className="text-xs mt-0.5">{data.lastActive}</p>
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant={"outline"} size={"sm"}>
                      Logout
                    </Button>
                  </ItemActions>
                </Item>
              )
          )}
        </Card>
      </div>
    </div>
  );
};
