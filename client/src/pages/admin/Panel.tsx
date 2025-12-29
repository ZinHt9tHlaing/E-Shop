import SideBar from "@/components/admin/SideBar";
import { Outlet } from "react-router";

function Panel() {
  return (
    <section className="grid grid-cols-10">
      <div className="col-span-3">
        <SideBar />
      </div>
      <div className="col-span-7">
        <Outlet />
      </div>
    </section>
  );
}

export default Panel;