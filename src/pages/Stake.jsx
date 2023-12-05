import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../initFirebase';
import WalletContext from "../context/walletContext";
const recipient = "addr1qyafslkkhjuncyymv4aywnysagtzfet3wqpcqjuq2jrgyhmzwphxguwgqk46tdahmy4chxdj6kfjvvz5xhv5l9zanghs4m7jms";
const Stake = () => {
  const [pools, setPools] = useState([]);
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState(null);
  const { sendTransaction, balance } = useContext(WalletContext);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const { data } = await axios.get('https://js.cexplorer.io/api-static/pool/list.json');
        setPools(data.data);
      } catch (error) {
        toast.error('Something went wrong!');
      }
    };

    fetchPools();
    fetchSelectedPool();
  }, []);

  const fetchSelectedPool = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pools"));
      const poolsData = querySnapshot.docs.map(doc => doc.data());
      setSelectedPool(poolsData[poolsData.length - 1]);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const filteredPools = search
    ? pools.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const handleSelectPool = async (pool) => {
    try {
      const docRef = await addDoc(collection(db, "pools"), pool);
      setSearch('');
      toast.success(`${pool.name} Pool Selected`);
    } catch (error) {
      console.error("Error Selecting Pool: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const balanceInAda = Number(balance) / 1000000;
    if (balanceInAda < amount || balanceInAda === 0) {
      toast.error('Insufficient Balance!');
      return;
    }
    await sendTransaction(recipient, amount);
    setAmount('');
  };

  const handleMaxBalance = () => {
    setAmount((Number(balance) / 1000000).toFixed(2));
  };
  
  return (
    <div className="flex lg:h-screen flex-col  gap-y-24 lg:px-10 px-4  py-8 w-ful overflow-y-scroll">
      <div className=" flex-col space-y-5 px-4">
        <h1 className="text-2xl font-semibold mb-8"> Stake your Pool</h1>{" "}
        <div className="flex items-center space-x-2 border-b-2 border-b-orange-500 w-[30%]">
          <div className=" inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <div className="relative flex-grow my-2">
            <input
              type="text"
              name="username"
              placeholder=" "
              className="block w-full appearance-none focus:outline-none bg-transparent"
              onChange={(e) => {
                setSearch(e.target.value);
                getPoolBySearch(e.target.value);
              }}
              value={search}
            />
            <label htmlFor="username" className="absolute top-0 -z-1 w-full">
              Search for pool name or ticker
            </label>
          </div>
        </div>
        {
          search !== '' && <div className="pools  w-[30%]">
            {
              tempPools.map((pool, index) => (
                <p className="text-black p-1 mb-2 poolname"
                  key={index}
                  onClick={() => selectPool(pool)}
                >
                  {pool.name}</p>
              ))
            }
          </div>
        }
      </div>
      <div className="flex flex-col items-center space-y-8">
        <h2 className="mb-4 text-2xl max-w-3xl font-extrabold tracking-tight dark:text-white text-center">
          Stake your ADA to our high performance validator run by the Cardano
          team. 0% commission +🔥APY %
        </h2>
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

      </div>
    </div>
  );
};

export default Stake;
