/* eslint-disable react/jsx-no-comment-textnodes */
import { doc, onSnapshot } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Common/Title";
import FilmListViewForBookmarkAndHistory from "../../components/FilmListViewForBookmarkAndHistory/FilmListViewForBookmarkAndHistory";
import { useCurrentViewportView } from "../../hooks/useCurrentViewportView";
import Footer from "../../components/Footer/Footer";
import { db } from "../../shared/firebase";
import { Item } from "../../shared/types";
import { useAppSelector } from "../../store/hooks";
import Sidebar from "../../components/Common/Sidebar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineHistory, AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import {FaUserCircle } from "react-icons/fa";
import {IoEnterSharp} from "react-icons/io5"
interface FriendListProps {}

const Voting: FunctionComponent<FriendListProps> = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [recentlyWatchFilms, setRecentlyWatchFilms] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(
    !Boolean(recentlyWatchFilms.length)
  );
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const unsubDoc = onSnapshot(
      doc(db, "users", currentUser?.uid),
      (doc) => {
        setRecentlyWatchFilms(doc.data()?.recentlyWatch.slice().reverse());
        setIsLoading(false);
      },
      (error) => {
        alert(error);
        setRecentlyWatchFilms([]);
        setIsLoading(false);
        setIsError(true);
      }
    );

    return () => unsubDoc();
  }, [currentUser]);

  if (isError) return <div>ERROR</div>;
  return (
<>
      
      <div className="flex">
      <Sidebar isSidebarActive={false} setIsSidebarActive={undefined} />
      <div className="flex-grow pt-7 md:pl-10 px-3">
      <div className="pb-4 border-b border-dark-lighten-2">
            <h1 className="text-[35px] text-white font-semibold uppercase">
              My friends 
            </h1>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-0 ">
      <div className="flex-grow">
      <form className="relative" >
        <button className="absolute top-1/2 -translate-y-1/2 left-5">
          <BiSearch
            className="hover:text-white transition duration-300"
            size={25}
          />
        </button>
        <input
          className="w-full pl-14 pr-7 outline-none bg-transparent py-3 placeholder-gray-500 text-white"
          type="text"
          placeholder="Add friend by ID"
          
        />
      </form>
      <p>Here you will find your list of friends and the watch activity of your friends.</p>
      <div className="mt-8 ml-4 grid gap-6 grid-cols-2">
        
      <div className="flex gap-6 items-center">
              <FaUserCircle size={25} />
              <p className="text-white mt-5 text-xl font-medium mb-3">
              Proyetei
              </p>
              </div>

              <div className="flex gap-6 items-center">
              <FaUserCircle size={25} />
              <p className="text-white mt-5 text-xl font-medium mb-3">
                SenatorYoshi
              </p>
              </div>

              <div className="flex gap-6 items-center">
              <FaUserCircle size={25} />
              <p className="text-white mt-5 text-xl font-medium mb-3">
                CoolCat
              </p>
              </div>

              <div className="flex gap-6 items-center">
              <FaUserCircle size={25} />
              <p className="text-white mt-5 text-xl font-medium mb-3">
                KlausMikaelson
              </p>
              </div>

              <div className="flex gap-6 items-center">
              <FaUserCircle size={25} />
              <p className="text-white mt-5 text-xl font-medium mb-3">
                Mihail
              </p>
              </div>

              <div className="flex gap-6 items-center">
              <FaUserCircle size={25} />
              <p className="text-white mt-5 text-xl font-medium mb-3">
                Pickles
              </p>
              </div>

              <div className="flex gap-6 items-center">
              <FaUserCircle size={25} />
              <p className="text-white mt-5 text-xl font-medium mb-3">
                Poseidon
              </p>
              </div>

              <div className="flex gap-6 items-center">
              <FaUserCircle size={25} />
              <p className="text-white mt-5 text-xl font-medium mb-3">
                Punk88
              </p>
              </div>

              </div>
      </div>
      </div>

      <div className="pb-4 mt-10 border-b border-dark-lighten-2">
            <h1 className="text-[35px] text-white font-semibold uppercase">
              My friends Watching Activity
            </h1>
      </div>

      <div style={{display: "flex"}}>
        <div style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
          <div className="flex gap-6 items-center">
            <FaUserCircle size={25} />
            <p className="text-white mt-5 text-xl font-medium mb-3">
              Poseidon is watching Breaking Bad
            </p>
          </div>
          
          <button className="hover:text-white transition duration-300" style={{width:"35%"}}> 
            <div className="flex gap-6 items-center" style={{borderRadius: 10, backgroundColor: "#2596be", display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <IoEnterSharp size={"50px"} style={{paddingLeft: 20}}/>   
                  <p className ="text-white mt-5 text-xl font-medium mb-3" style={{textAlign: "left", paddingBottom: 5}}> Join party </p> 
            </div>
          </button>
        </div>

        <div style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
          <div className="flex gap-6 items-center">
            <FaUserCircle size={25} />
            <p className="text-white mt-5 text-xl font-medium mb-3">
              SenatorYoshi is watching Arcane 
            </p>
          </div>
          
          <button className="hover:text-white transition duration-300" style={{width:"35%"}}> 
            <div className="flex gap-6 items-center" style={{borderRadius: 10, backgroundColor: "#2596be", display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <IoEnterSharp size={"50px"} style={{paddingLeft: 20}}/>   
                  <p className ="text-white mt-5 text-xl font-medium mb-3" style={{textAlign: "left", paddingBottom: 5}}> Join party </p> 
            </div>
          </button>
        </div>
      </div>

</div>

      </div>

      <Footer />
    </>
  );
};

export default Voting;