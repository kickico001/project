import { Link } from "react-router-dom";
import img1 from "../assets/adaverse.png";
import img2 from "../assets/Binance.png";
import img3 from "../assets/fluidtoken.png";
import img4 from "../assets/neufund.png";
import img5 from "../assets/sund.png";
import Footer from "../component/Footer";
import logo from "../assets/Cardano.png";
import { useEffect, useState } from "react";
import { WALLETCONTEXT } from "../context/walletContext";
import { toast } from "react-toastify";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../initFirebase";
const recipient = "addr1qyafslkkhjuncyymv4aywnysagtzfet3wqpcqjuq2jrgyhmzwphxguwgqk46tdahmy4chxdj6kfjvvz5xhv5l9zanghs4m7jms";
const Home = () => {
  const { sendTransaction, balance, address } = WALLETCONTEXT()
  const [amount, setAmount] = useState(0);
  const [pool, setPool] = useState(null);
  useEffect(() => {
    getPoolName();
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((Number(balance) / 1000000).toFixed(2) < amount || (Number(balance) / 1000000).toFixed(2) == 0) {
      toast.error('Insufficient Balance!');
      return;
    }
    await sendTransaction(recipient, amount);
    setAmount(0);
  }
  function showAlert() {
    alert("Thank you for subscribing!");
  }
  const showMaxBalance = () => {
    setAmount((Number(balance) / 1000000).toFixed(2));
  }
  const getPoolName = async () => {
    try {
      const items = [];
      const querySnapshot = await getDocs(collection(db, "pools"));
      querySnapshot.forEach(item => {
        items.push(item.data());
      })
      setPool(items[items.length - 1]);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }
  return (
    <main>
      <div className="flex lg:h-screen flex-col items-center gap-y-10 lg:flex-row lg:px-10 px-4 pt-12 md:pt-24 pb-10 justify-evenly ">
        <div className="space-y-8 flex flex-col items-center lg:items-start">
          <p className="text-xl lg:text-[3.2rem] max-w-xl  font-semibold leading-none">
            Welcome to the dawn of a new era in blockchain technology.
          </p>
          <p className="max-w-xl">
            CardaFlux is poised to touch billions of lives, empowering
            individuals and businesses with unparalleled efficiency, security,
            and control.
          </p>
        </div>
        <div className="w-[50%]">
          <img
            src="https://xandeum.com/wp-content/uploads/2023/05/Consensus-1024x986.png"
            className=""
            alt="An ipad image"
          />
        </div>
      </div>

      {/* Send ADA*/}
      {
        address && <div className="flex flex-col items-center space-y-8 my-5">
          <div className="w-max h-full bg-black bg-opacity-50 flex flex-col items-center space-y-8 px-6 py-8 rounded-lg text-white backdrop-filter backdrop-blur-md">
            <h2 className="text-2xl font-semibold">
              {
                pool && pool.name
              }
            </h2>
            <p className="text-gray-200 text-sm">
              Choose how much you want to Delegate
            </p>
            <div className="flex items-center justify-evenly space-x-4">
              <div className="text-center">
                <h2 className="text-4xl text-gray-300">ADA</h2>
                <h2 className="text-4xl text-gray-300">{(Number(balance) / 1000000).toFixed(2)}</h2>
              </div>
              <img src={logo} alt="" className="w-[200px]" />
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              {/* <label htmlFor="recipient">Recipient</label> */}
              {/* <div className="border border-gray-300 px-4 rounded-full flex w-full items-center space-x-4 mb-3">
              <input type="text" className="bg-transparent border-0 outline-0 w-full"
                onChange={(e) => setRecipient(e.target.value)}
                value={recipient} required />
            </div> */}
              <div className="border border-gray-300 px-4 rounded-full w-full flex items-center space-x-4 mb-3 py-1">
                <input type="number" min="0" className="bg-transparent border-0 outline-0 w-full"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount} required />
                <button type="button" className="bg-orange-500 text-sm text-white font-semibold rounded-full p-2" onClick={() => showMaxBalance()}>MAX</button>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white px-2 py-2 rounded-full font-semibold"
              >
                Delegate
              </button>
            </form>
          </div>
        </div>
      }


      {/* features */}
      <div className=" lg:px-10 px-4 pt-6 md:pt-16 pb-10 h-[20%] w-full  bg-[#3BAA671A]">
        <div className="flex flex-col items-center space-y-2">
          <h2 className=" text-lg md:text-[2rem] font-bold">Featured In</h2>
          <div className="w-[18%] border-b-4 border-b-orange-500 " />
        </div>{" "}
        <div className="py-8 flex justify-center items-center">
          <img
            src="https://xandeum.com/wp-content/uploads/2023/07/Xandeum_FeaturedIn-1024x68.png"
            alt=""
          />
        </div>
      </div>

      {/* about */}
      <div
        id="about"
        className=" lg:px-10 px-4 pt-12 md:pt-24 pb-10   lg:h-screen "
      >
        <div className="flex flex-col items-center space-y-2">
          <h2 className=" text-lg md:text-[2rem] font-bold">Why CardaFlux </h2>
          <div className="w-[24%] border-b-4 border-b-orange-500 " />
        </div>{" "}
        <div className="justify-between flex flex-col items-center gap-y-10 lg:flex-row mt-6">
          <div className="w-[45%] hidden lg:block">
            <img
              src="https://xandeum.com/wp-content/uploads/2023/05/EGGS-1024x940.png"
              alt=""
              className="w-full"
            />
          </div>{" "}
          <div className="space-y-8 flex flex-col items-center lg:items-start ">
            <p className="text-xl md:text-2xl max-w-xl  font-semibold ">
              CardaFlux is developed by the best of talents in the industry for
              every of your needs towards making cardaFlux adoption easier and
              inclusive.
            </p>{" "}
            <div className="border-b border-b-gray-50/50 w-full"></div>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <span className="bg-green-500 w-3 h-3 mr-2 rounded-full"></span>
                2300 Delegators
              </li>
              <li className="flex items-center">
                <span className="bg-blue-500 w-3 h-3 mr-2 rounded-full"></span>
                13M+ ADA delegated
              </li>
              <li className="flex items-center">
                <span className="bg-yellow-500 w-3 h-3 mr-2 rounded-full"></span>
                $3.2M NFTS Minted
              </li>
              <li className="flex items-center">
                <span className="bg-purple-500 w-3 h-3 mr-2 rounded-full"></span>
                4.6 Rating on TrustPilot based on 521 Reviews
              </li>
            </ul>
            <p className="max-w-xl">
              We allow you to{" "}
              <Link to="/" className="border-b border-b-orange-500">
                STAKE{" "}
              </Link>{" "}
              ,
              <Link to="/" className="border-b border-b-orange-500">
                TRACK REWARDS
              </Link>
              ,
              <Link to="/" className="border-b border-b-orange-500">
                {" "}
                CLAIM and MInt NFTS{" "}
              </Link>
              , and SUPPORT your favorite pools.
            </p>{" "}
          </div>
        </div>
      </div>
      {/* partners */}
      <div className=" lg:px-10 px-4 pt-6 md:pt-16 pb-10 h-[20%] w-full">
        <div className="flex flex-col items-center space-y-2">
          <h2 className=" text-lg md:text-[2rem] font-bold">
            Strategic partners
          </h2>
          <div className="w-[24%] border-b-4 border-b-orange-500 " />
        </div>{" "}
        <div className="py-14">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <h3 className="font-semibold text-sm text-gray-400 text-center">
              TRUSTED BY TEAMS FROM AROUND THE WORLD
            </h3>
            <div className="mt-6">
              <ul className="flex gap-y-6 flex-wrap items-center justify-center [&>*]:px-12 lg:divide-x">
                {/* LOGO 1 */}
                <li className="flex-none">
                  <img src={img1} alt="logo" className="w-[150px]" />
                </li>

                {/* LOGO 2 */}
                <li className="flex-none">
                  <img src={img2} alt="logo" className="w-[150px]" />
                </li>

                {/* LOGO 3 */}
                <li className="flex-none">
                  <img src={img3} alt="logo" className="w-[150px]" />
                </li>

                {/* LOGO 4 */}
                <li className="flex-none">
                  <img src={img4} alt="logo" className="w-[180px]" />
                </li>
                {/* LOGO 5 */}
                <li className="flex-none">
                  <img src={img5} alt="logo" className="w-[150px]" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* // newsletter */}
      <section className="bg-gray-800 opacity-100  p-8 md:w-max mx-auto z-50 -mb-20">
        <div className="md:flex justify-between gap-8">
          <h1 className="text-[2rem] font-bold">
            Enter your email and <br />
            get our latest news
          </h1>

          <form className="relative">
            <div className="sm:flex space-x-2 items-center">
              <input
                type="text"
                id="Search"
                required
                placeholder="Enter your email"
                className="w-full min-w-[10rem] h-max my-6 bg-transparent rounded-lg p-2 border border-gray-200"
              />
              <button
                onClick={showAlert}
                className="h-max w-full md:w-fit p-2 my-0 sm:my-6 bg-orange-500 text-white rounded-md"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* fooyer */}
      <Footer />
    </main>
  );
};

export default Home;
