/* eslint-disable react/jsx-no-comment-textnodes */
import { doc, onSnapshot } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../components/Common/Title";
import FilmListViewForBookmarkAndHistory from "../../../components/FilmListViewForBookmarkAndHistory/FilmListViewForBookmarkAndHistory";
import { useCurrentViewportView } from "../../../hooks/useCurrentViewportView";
import Footer from "../../../components/Footer/Footer";
import { db } from "../../../shared/firebase";
import { Item } from "../../../shared/types";
import { useAppSelector } from "../../../store/hooks";
import Sidebar from "../../../components/Common/Sidebar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiOutlineHistory, AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import {FaUserCircle } from "react-icons/fa";
import {IoEnterSharp} from "react-icons/io5"
interface FriendListProps {}

export const Chat: FunctionComponent<FriendListProps> = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [recentlyWatchFilms, setRecentlyWatchFilms] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(
    !Boolean(recentlyWatchFilms.length)
  );
  const [isError, setIsError] = useState(false);
  const defaultMessages = [{
    user: "CoolCat",
    message: "Hey, do we want to watch a movie or a tv show? Let's vote"
  },
  {
    user: "Proyeti",
    message: "Let's watch a movie, we watched a tv show last time",
  }
  ]

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

  const [messages, setMessages] = useState(defaultMessages)
  const [messageToSend, setMessageToSend] = useState("")

  const defaultReadyVals = [false, false, false, false]
  const [ready, setReady] = useState(defaultReadyVals);

  const handleChange = (event:any) => {
    setMessageToSend(event.target.value)
  }

  const handleClick = () => {
    const userName = currentUser?.displayName ?? ''
        setMessages(messages.concat([{ user: userName, message: messageToSend }]))
        setMessageToSend("")
  }

  if (isError) return <div>ERROR</div>;
  return (
    <div>
    <div className="text-[35px] text-white font-semibold uppercase" style={{paddingLeft: 10, paddingTop: 10}}>Chat</div>
    <div style={{backgroundColor: "#d8d8d8", borderRadius: 10, padding:15, color: "black"}}>
    <div>
        {messages.map((message) => {
            return (
                <div>
                    <div>
                        <div>
                            {message.user + ":"}
                        </div>
                        <div>
                            {message.message}    
                        </div>
                    </div>
                </div>
            )
        })}
        
    </div>
    </div>
    <div>
        <input
          className="w-full pl-14 pr-7 outline-none bg-transparent py-3 placeholder-gray-500 text-white"
          type="text"
          id="message"
          placeholder="Send a message"
          value={messageToSend}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Click</button>
        </div>
    </div>
  );
};
