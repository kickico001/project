import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <div className="p-3 bg-[#030015] rounded-xl w-full">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <p className="font-semibold text-xs md:text-lg ">
            Your One-Stop Platform For Everything CardaFlux!🏆
          </p>
          <div className="flex items-center space-x-6 ">
            <Link to="/" className="font-semibold">
              Home
            </Link>
            <a href="#about" className="font-semibold">
              Why CardaFlux
            </a>
            <Link
              to="/contact"
              className=" bg-orange-500 hover:bg-transparent hover:border-orange-500 hover:text-orange-500 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
