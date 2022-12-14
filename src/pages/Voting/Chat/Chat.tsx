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
    <div style={{height: "100%", overflow: "auto"}}>
      <div className="text-[35px] text-white font-semibold uppercase" style={{padding: 10}}>Chat</div>
      <div style={{backgroundColor: "#d8d8d8", borderRadius: 10, padding:15, color: "black", height: "85%", overflow: "scroll"}}>
        <div>
            {messages.map((message) => {
                return (
                    <div>
                        <div style={{paddingTop: 15}}>
                            <div>
                                <b>{message.user + (message.user == currentUser?.displayName ? " (you)" : "") + ":"}</b>
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
      <div style={{display: "flex", paddingTop: 15, height: "6%"}}>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            id="message"
            placeholder="Send a message"
            value={messageToSend}
            onChange={handleChange}
            style={{color: "black", width:"70%", borderRadius:10, marginLeft: 10}}
          />
          <button onClick={handleClick} style={{marginLeft: 15, marginRight: 10, width: "25%"}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
      </div>
    </div>
  );
};
