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
import {FcCheckmark} from 'react-icons/fc';

interface FriendListProps {isUserReady: boolean, setIsUserReady: React.Dispatch<React.SetStateAction<boolean>>}

const Voting: FunctionComponent<FriendListProps> = (props) => {
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

  const [selectedType, setSelectedType] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")

  const handleClick_t1 = () => {setSelectedType("movie")}
  const handleClick_t2 = () => {setSelectedType("tvshow")}

  const handleClick_g1 = () => {setSelectedGenre("adventure")}
  const handleClick_g2 = () => {setSelectedGenre("action")}
  const handleClick_g3 = () => {setSelectedGenre("drama")}
  const handleClick_g4 = () => {setSelectedGenre("comedy")}
  const handleClick_g5 = () => {setSelectedGenre("horror")}

  const onReady = () => { if (selectedType != "" && selectedGenre != "") props.setIsUserReady(true) }

  if (isError) return <div>ERROR</div>;
  return (
<>
      <div>
        <div style={{marginBottom: 40}}>
          <div className="flex-grow pt-7 md:pl-10 px-3">
            <div className="pb-4 border-b border-dark-lighten-2">
              <h1 className="text-[35px] text-white font-semibold uppercase">
                Vote! 
              </h1>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-0 ">
              <div className="flex-grow">
                <p style={{paddingTop: 10}}>Vote with your friends on what title to watch!</p>
              </div>
            </div>

            
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "row", marginLeft: 50}}>
          <div style = {{width:"50%"}}>
            <div style={{color: "white", fontSize: 25, paddingBottom: 20, textAlign: "center"}}>Would you rather watch a movie or a TV show?</div>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "12%"}}>
              <div onClick={handleClick_t1} style={{backgroundColor: "#d8d8d8", cursor: "pointer", marginBottom: 50, width: "30%", height: 150, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}> 
                  <span style={{paddingTop: 50, color: "black"}} >Movie</span> {selectedType == "movie" && <FcCheckmark size={30}/>} 
                </div>
              </div>
              <div onClick={handleClick_t2} style={{backgroundColor: "#d8d8d8", cursor: "pointer", marginBottom: 50, width: "30%", height: 150, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}> 
                  <span style={{paddingTop: 50, color: "black"}} >TV Show</span> {selectedType == "tvshow" && <FcCheckmark size={30}/>} 
                </div>
              </div>
            </div>
          </div >
             
          <div style = {{width:"50%"}}>
            <div style={{color: "white", fontSize: 25, paddingBottom: 20, textAlign: "center"}}>What genre would you like to watch?</div>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "12%"}}>
              <div onClick={handleClick_g1} style={{backgroundColor: "#d8d8d8", cursor: "pointer", paddingTop: 0, marginBottom: 50, width: "30%", height: 100, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}> 
                  <span style={{paddingTop: 15, color: "black"}} >Adventure</span> {selectedGenre == "adventure" && <FcCheckmark size={30}/>} 
                </div>
              </div>
              <div onClick={handleClick_g2} style={{backgroundColor: "#d8d8d8", cursor: "pointer", paddingTop: 0, marginBottom: 50, width: "30%", height: 100, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}> 
                  <span style={{paddingTop: 15, color: "black"}} >Action</span> {selectedGenre == "action" && <FcCheckmark size={30}/>} 
                </div>
              </div>
              <div onClick={handleClick_g3} style={{backgroundColor: "#d8d8d8", cursor: "pointer", paddingTop: 0, marginBottom: 50, width: "30%", height: 100, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}> 
                  <span style={{paddingTop: 15, color: "black"}} >Drama</span> {selectedGenre == "drama" && <FcCheckmark size={30}/>} 
                </div>
              </div>
              <div onClick={handleClick_g4} style={{backgroundColor: "#d8d8d8", cursor: "pointer", paddingTop: 0, marginBottom: 50, width: "30%", height: 100, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}> 
                  <span style={{paddingTop: 15, color: "black"}} >Comedy</span> {selectedGenre == "comedy" && <FcCheckmark size={30}/>} 
                </div>
              </div>
              <div onClick={handleClick_g5} style={{backgroundColor: "#d8d8d8", cursor: "pointer", paddingTop: 0, marginBottom: 50, width: "30%", height: 100, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}> 
                  <span style={{paddingTop: 15, color: "black"}} >Horror</span> {selectedGenre == "horror" && <FcCheckmark size={30}/>} 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginTop: 20, marginLeft: "45%", marginRight: 100}}>
          <button onClick={onReady} style={{marginLeft: 15, marginRight: 10, width: "25%"}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ready?</button>
        </div>
      </div>
    </>
  );
};

export default Voting;