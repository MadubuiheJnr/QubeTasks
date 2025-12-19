import type { Route } from "../../+types/root";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { LogoIcon, LogoText } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, FileText, Info, Menu, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "QubeTasks" },
    { name: "description", content: "Welcome to QubeTasks!" },
  ];
}

const HomePage = () => {
  return (
    <div className="w-full h-screen flex flex-col overflow-y-auto lg:p-4">
      <div className="flex items-center justify-between p-3">
        <LogoText className="text-2xl font-semibold text-primary" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"sm"}>
              <Menu />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mr-2.5">
            <DropdownMenuLabel>App Support </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <Info className="size-5" /> About Us
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <FileText className="size-5" />
                Terms of Use
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <ShieldCheck className="size-5" />
                Privacy Policy
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className={`justify-self-end mt-10 space-y-10 
        md:bg-[url(/onboarding_bg.png)] bg-no-repeat bg-size-[120%] bg-center md:h-full md:mt-0 md:rounded-xl
        md:flex items-end md:object-cover`}
      >
        <img
          src="/onboarding_bg.png"
          alt=""
          className="md:hidden object-cover"
        />
        <div className="p-3 space-y-2 md:w-[50%] md:p-6">
          <Badge variant={"outline"} className="py-2 px-4 md:text-muted">
            <LogoIcon className="size-5 mr-1" /> Plan with QueTask
          </Badge>
          <p className="text-4xl text-primary font-medium md:text-muted md:text-7xl">
            <span>A smarter way to organize your </span>
            <span className="font-extralight font-italic">work</span>
          </p>
          <p className="text-base font-light md:text-muted md:text-2xl">
            Plan tasks, track progress, and collaborate effortlessly — all in
            one clean, distraction-free workspace.
          </p>

          <Link to={"/sign-in"}>
            <Badge className="cursor-pointer py-2 px-5 text-base mt-3">
              Get Started <ChevronRight />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
