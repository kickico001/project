import { Link } from "react-router-dom";
import { WALLETCONTEXT } from '../context/walletContext';
const Navbar = () => {
  const { initWallet, account, DisconnectWallet } = WALLETCONTEXT();
  const connectToWallet = async (e) => {
    e.preventDefault();
    initWallet();
  }
  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <div className="p-3 bg-[#030015] rounded-xl w-full">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <p className="font-semibold text-xs md:text-lg ">
            Your One-Stop Platform For Everything Cardano!🏆
          </p>
          <div className="flex items-center space-x-6 ">
            <Link to="/" className="font-semibold">
              Home
            </Link>
            <Link to="/contact" className="font-semibold">
              Contact
            </Link>
            <Link
              to="/stake"
              className="bg-orange-500  hover:border-orange-500  text-white font-semibold py-3 px-4 rounded-md transition duration-200 transform hover:scale-105"
            >
              Stake Here!
            </Link>
            {
              !account ? <a href="#" onClick={(e) => connectToWallet(e)}>
                Connect
              </a> : <a href="#" onClick={(e) => DisconnectWallet()}>
                Disconnect
              </a>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
