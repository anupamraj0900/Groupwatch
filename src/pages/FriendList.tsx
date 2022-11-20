import { doc, onSnapshot } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Common/Title";
import FilmListViewForBookmarkAndHistory from "../components/FilmListViewForBookmarkAndHistory/FilmListViewForBookmarkAndHistory";
import { useCurrentViewportView } from "../hooks/useCurrentViewportView";
import Footer from "../components/Footer/Footer";
import { db } from "../shared/firebase";
import { Item } from "../shared/types";
import { useAppSelector } from "../store/hooks";
import Sidebar from "../components/Common/Sidebar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineHistory, AiOutlineHome } from "react-icons/ai";

interface FriendListProps {}

const FriendList: FunctionComponent<FriendListProps> = () => {
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
      <p>Here you will find your list of friends and the watch activity of your friends.</p>
      <div className="mt-8 ml-4 grid gap-6 grid-cols-2">
        
      
              <p className="text-white mt-5 text-xl font-medium mb-3">
              Proyetei
              </p>
              <p className="text-white mt-5 text-xl font-medium mb-3">
                SenatorYoshi
              </p>
              <p className="text-white mt-5 text-xl font-medium mb-3">
                CoolCat
              </p>
              <p className="text-white mt-5 text-xl font-medium mb-3">
                KlausMikaelson
              </p>
              <p className="text-white mt-5 text-xl font-medium mb-3">
                Mihail
              </p>
              <p className="text-white mt-5 text-xl font-medium mb-3">
                Pickles
              </p>
              <p className="text-white mt-5 text-xl font-medium mb-3">
                Poseidon
              </p>
              <p className="text-white mt-5 text-xl font-medium mb-3">
                Punk88
              </p>
              </div>
      </div>
      
      </div>

      <div className="flex-grow pt-7 md:pl-10 px-3">
      <div className="pb-4 border-b border-dark-lighten-2">
            <h1 className="text-[35px] text-white font-semibold uppercase">
              My friends Watching Activity
            </h1>
      </div>
      <p className="text-white mt-5 text-xl font-medium mb-3">
                SenatorYoshi is watching Arcane 
              </p>
      </div>
      </div>


      </div>

      <Footer />
    </>
      
    
  );
};

export default FriendList;