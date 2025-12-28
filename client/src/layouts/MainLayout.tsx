import { Outlet, useLocation } from "react-router";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  // exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const MainLayout = () => {
  const location = useLocation();

  return (
    <section>
      <Navbar />
      <AnimatePresence>
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="max-w-6xl mx-auto py-6 px-4 mt-32"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </section>
  );
};

export default MainLayout;
