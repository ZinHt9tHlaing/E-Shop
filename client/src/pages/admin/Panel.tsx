import SideBar from "@/components/admin/SideBar";
import { Outlet } from "react-router";

function Panel() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-10 min-h-screen gap-4">
      <div className="lg:col-span-3">
        <SideBar />
      </div>
      <div className="lg:col-span-7 p-4 lg:p-0">
        <Outlet />
      </div>
    </section>
  );
}

export default Panel;