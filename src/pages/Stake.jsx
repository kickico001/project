import { toast } from "react-toastify";
import logo from "../assets/Cardano.png";
import { useLink } from 'react-router-dom';
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../initFirebase';
import { useEffect, useState } from "react";
const Stake = () => {
  const [pools, setPools] = useState([]);
  const [tempPools, setTempPools] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    getPoolList();
  }, []);
  const getPoolList = async () => {
    try {
      const result = await axios.get(`https://js.cexplorer.io/api-static/pool/list.json`);
      setPools(result.data.data);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }
  const getPoolBySearch = (value) => {
    if (value !== '') {
      const result = pools.filter(item => String(item.name).toLowerCase().includes(String(value).toLowerCase()));
      setTempPools(result);
    } else {
      setTempPools([]);
    }
  }
  const selectPool = async (pool) => {
    try {
      const docRef = await addDoc(collection(db, "pools"), pool);
      console.log("Document written with ID: ", docRef.id);
      setSearch('');
      setTempPools([]);
      toast.success(`${pool.name} Pool Selected`);
    } catch (error) {
      console.error("Error Selecting Pool: ", error);
    }

  }
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
        <div className="h-full bg-black bg-opacity-50 flex flex-col items-center space-y-8 px-6 py-8 rounded-lg text-white backdrop-filter backdrop-blur-md">
          <Link to={useLink('/Home')} className="w-full bg-gray-700 text-gray-400 px-2 py-2 rounded-full font-semibold">
            Stake ADA
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Stake;
