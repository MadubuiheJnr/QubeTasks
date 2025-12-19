import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div className="container max-w-3xl mx-auto">
      <Outlet />
    </div>
  );
};

export default UserLayout;
