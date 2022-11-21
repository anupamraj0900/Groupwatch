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
import { Chat } from "./Chat/Chat"
import Voting from "./Voting";
import { ImExit } from "react-icons/im";

interface FriendListProps {}

const Group: FunctionComponent<FriendListProps> = () => {
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

  const defaultReadyVals = [true, true, true, false]
  const [isUserReady, setIsUserReady] = useState(false);
  const [ready, setReady] = useState(defaultReadyVals);

  if (isError) return <div>ERROR</div>;
  return (
<>
      <div className="flex">
      <div className="flex-grow pt-7 md:pl-10 px-3">
      <div className="pb-4 border-b border-dark-lighten-2" style={{borderBottom: "1px solid black", display: "flex", alignItems: "center"}}>
            <h1 className="text-[35px] text-white font-semibold uppercase">
              CoolCats' Group
            </h1>
            
            <div style={{paddingLeft: "5%"}}>
            <Link to="/" style={{display: "flex"}}>
              <ImExit size={25} style={{marginRight: 15}}/> Leave group
            </Link>
            </div>
            
      </div>

      <div style={{display: "flex", flexDirection: "row", borderBottom: "1px solid black", height: "75vh"}}>
        <div style={{width: "80%", float: "left", borderLeft: "1px solid black", borderRight: "1px solid black", overflow: "auto"}}><Voting isUserReady={isUserReady} setIsUserReady={setIsUserReady} /></div>
        <div style={{width: "20%", float: "right", borderLeft: "1px solid black"}}><Chat /></div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-0 " style={{float: "inline-end", width: "80%", marginLeft:"200px", marginRight:"50px"}}>
      <div className="flex-grow">
      <div className="mt-8 ml-4 grid gap-6 grid-cols-2">
        
            <div className="flex gap-6 items-center">
            <FaUserCircle size={25} />
            <p className="text-white mt-5 text-xl font-medium mb-3">
            Proyetei
            </p>
            
            {!ready[0] ?
            <div className="flex gap-6 items-center" style={{borderRadius: 10, backgroundColor: "#CE2121", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height:30, width:90, marginTop: 8, marginLeft: 10}}>  
                <p className ="text-white mt-5 text-xl font-medium mb-3" style={{textAlign: "center", paddingBottom: 5, fontSize: "100%"}}> Not Ready </p> 
            </div> 
            :
            <div className="flex gap-6 items-center" style={{borderRadius: 10, backgroundColor: "#2596be", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height:30, width:70, marginTop: 8, marginLeft: 10}}>  
                <p className ="text-white mt-5 text-xl font-medium mb-3" style={{textAlign: "center", paddingBottom: 5, fontSize: "100%"}}> Ready </p> 
            </div>
            }
        </div>

        <div className="flex gap-6 items-center">
            <FaUserCircle size={25} />
            <p className="text-white mt-5 text-xl font-medium mb-3">
            SenatorYoshi
            </p>
            {!ready[1] ?
            <div className="flex gap-6 items-center" style={{borderRadius: 10, backgroundColor: "#CE2121", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height:30, width:90, marginTop: 8, marginLeft: 10}}>  
                <p className ="text-white mt-5 text-xl font-medium mb-3" style={{textAlign: "center", paddingBottom: 5, fontSize: "100%"}}> Not Ready </p> 
            </div> 
            :
            <div className="flex gap-6 items-center" style={{borderRadius: 10, backgroundColor: "#2596be", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height:30, width:70, marginTop: 8, marginLeft: 10}}>  
                <p className ="text-white mt-5 text-xl font-medium mb-3" style={{textAlign: "center", paddingBottom: 5, fontSize: "100%"}}> Ready </p> 
            </div>
            }
        </div>

        <div className="flex gap-6 items-center">
            <FaUserCircle size={25} />
            <p className="text-white mt-5 text-xl font-medium mb-3">
            CoolCat
            </p>
            {!ready[2] ?
            <div className="flex gap-6 items-center" style={{borderRadius: 10, backgroundColor: "#CE2121", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height:30, width:90, marginTop: 8, marginLeft: 10}}>  
                <p className ="text-white mt-5 text-xl font-medium mb-3" style={{textAlign: "center", paddingBottom: 5, fontSize: "100%"}}> Not Ready </p> 
            </div> 
            :
            <div className="flex gap-6 items-center" style={{borderRadius: 10, backgroundColor: "#2596be", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height:30, width:70, marginTop: 8, marginLeft: 10}}>  
                <p className ="text-white mt-5 text-xl font-medium mb-3" style={{textAlign: "center", paddingBottom: 5, fontSize: "100%"}}> Ready </p> 
            </div>
            }
        </div>

        <div className="flex gap-6 items-center">
            <FaUserCircle size={25} />
            <p className="text-white mt-5 text-xl font-medium mb-3">
            {currentUser?.displayName} (You)
            </p>
            {!isUserReady ?
            <div className="flex gap-6 items-center" style={{borderRadius: 10, backgroundColor: "#CE2121", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height:30, width:90, marginTop: 8, marginLeft: 10}}>  
                <p className ="text-white mt-5 text-xl font-medium mb-3" style={{textAlign: "center", paddingBottom: 5, fontSize: "100%"}}> Not Ready </p> 
            </div> 
            :
            <div className="flex gap-6 items-center" style={{borderRadius: 10, backgroundColor: "#2596be", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height:30, width:70, marginTop: 8, marginLeft: 10}}>  
                <p className ="text-white mt-5 text-xl font-medium mb-3" style={{textAlign: "center", paddingBottom: 5, fontSize: "100%"}}> Ready </p> 
            </div>
            }
        </div>
      </div>
      </div>
      </div>
</div>

      </div>

    </>
  );
};

export default Group;