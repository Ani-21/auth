import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#6a5c8a] backdrop-blur-lg items-center p-8">
      <Outlet />
    </div>
  );
};

export default Layout;
