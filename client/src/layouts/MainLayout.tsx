import { Outlet } from "react-router";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const MainLayout = () => {
  return (
    <section>
      <Navbar />
      <main className="max-w-6xl mx-auto py-6 px-3">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default MainLayout;
