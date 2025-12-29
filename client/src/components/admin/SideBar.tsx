import { ChartLine, Edit, Package } from "lucide-react";
import { NavLink } from "react-router";

interface Page {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const pages: Page[] = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <ChartLine className="size-6" />,
  },
  {
    name: "Product management",
    path: "/admin/manage-products",
    icon: <Package className="size-6" />,
  },
  {
    name: "Order management",
    path: "/admin/manage-orders",
    icon: <Edit className="size-6" />,
  },
];
const SideBar = () => {
  return (
    <nav className="h-full">
      <div className="flex gap-2 space-y-2 flex-col pr-4">
        {pages.map((page, index) => (
          <NavLink
            to={page.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 rounded-lg font-medium text-sm py-2 transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-transform duration-200"
              }`
            }
          >
            {page.icon}
            {page.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default SideBar;
