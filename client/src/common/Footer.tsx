import { Link } from "react-router";

const Footer = () => {
  const date = new Date();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t md:px-0 mt-10 lg:ml-0 lg:px-20 mb-0 text-white bg-black">
      <div className="container mx-auto py-4 text-center lg:py-6">
        © {date.getFullYear()} . Made with love by{" "}
        <Link
          to="/"
          onClick={scrollToTop}
          className="underline font-semibold text-yellow-400 hover:text-yellow-500 active:scale-90 duration-300"
        >
          E-SHOP
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
