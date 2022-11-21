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
      
      <div className="flex" style={{marginBottom: 40}}>
        <div className="flex-grow pt-7 md:pl-10 px-3">
          <div className="pb-4 border-b border-dark-lighten-2">
            <h1 className="text-[35px] text-white font-semibold uppercase">
              Vote! 
            </h1>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-0 ">
            <div className="flex-grow">
              <p style={{paddingTop: 10}}>Vote with your friends on what movie to watch!</p>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Voting;