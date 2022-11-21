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
import SectionSlider from "../../components/Slider/SectionSlider";

interface FriendListProps {isUserReady: boolean, setIsUserReady: React.Dispatch<React.SetStateAction<boolean>>}
const films: Item[] = [
  {
      "backdrop_path": "/5kkw5RT1OjTAMh3POhjo5LdaACZ.jpg",
      "first_air_date": "2021-10-12",
      "genre_ids": [
          80,
          10765
      ],
      "id": 90462,
      "name": "Chucky",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_name": "Chucky",
      "overview": "After a vintage Chucky doll turns up at a suburban yard sale, an idyllic American town is thrown into chaos as a series of horrifying murders begin to expose the town’s hypocrisies and secrets. Meanwhile, the arrival of enemies — and allies — from Chucky’s past threatens to expose the truth behind the killings, as well as the demon doll’s untold origins.",
      "popularity": 2369.271,
      "poster_path": "/kY0BogCM8SkNJ0MNiHB3VTM86Tz.jpg",
      "vote_average": 7.9,
      "vote_count": 3495,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/3XjDhPzj7Myr8yzsTO8UB6E2oAu.jpg",
      "first_air_date": "2011-02-28",
      "genre_ids": [
          18,
          80
      ],
      "id": 31586,
      "name": "La Reina del Sur",
      "origin_country": [
          "US"
      ],
      "original_language": "es",
      "original_name": "La Reina del Sur",
      "overview": "After years of blood, sweat and tears, a woman of humble origin ends up becoming a drug trafficking legend, with all that that means...",
      "popularity": 2201.343,
      "poster_path": "/uBTlJDdPpRxYTfUnKw4wbuIGSEK.jpg",
      "vote_average": 7.8,
      "vote_count": 1418,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/zaulpwl355dlKkvtAiSBE5LaoWA.jpg",
      "first_air_date": "2010-10-31",
      "genre_ids": [
          10759,
          18,
          10765
      ],
      "id": 1402,
      "name": "The Walking Dead",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_name": "The Walking Dead",
      "overview": "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way.",
      "popularity": 1918.41,
      "poster_path": "/xf9wuDcqlUPWABZNeDKPbZUjWx0.jpg",
      "vote_average": 8.1,
      "vote_count": 14029,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
      "first_air_date": "2022-08-21",
      "genre_ids": [
          10765,
          18,
          10759
      ],
      "id": 94997,
      "name": "House of the Dragon",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_name": "House of the Dragon",
      "overview": "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
      "popularity": 1337.508,
      "poster_path": "/1X4h40fcB4WWUmIBK0auT4zRBAV.jpg",
      "vote_average": 8.5,
      "vote_count": 2439,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/cl8NLaoztP877hTSYSy6YIUkChF.jpg",
      "first_air_date": "2022-09-26",
      "genre_ids": [
          10764
      ],
      "id": 210855,
      "name": "Now what",
      "origin_country": [
          "BE"
      ],
      "original_language": "nl",
      "original_name": "Now what",
      "overview": "7 young people co-house in Antwerp. They are all at the beginning of their adult life and have to decide what that should look like.",
      "popularity": 1298.142,
      "poster_path": "/89kiLK0S7Rbfjorvhm0vxTAgAH3.jpg",
      "vote_average": 3,
      "vote_count": 3,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/hIZFG7MK4leU4axRFKJWqrjhmxZ.jpg",
      "first_air_date": "2022-10-20",
      "genre_ids": [
          10765,
          18
      ],
      "id": 95403,
      "name": "The Peripheral",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_name": "The Peripheral",
      "overview": "Stuck in a small Appalachian town, a young woman’s only escape from the daily grind is playing advanced video games. She is such a good player that a company sends her a new video game system to test…but it has a surprise in store. It unlocks all of her dreams of finding a purpose, romance, and glamour in what seems like a game…but it also puts her and her family in real danger.",
      "popularity": 1294.111,
      "poster_path": "/ccBe5BVeibdBEQU7l6P6BubajWV.jpg",
      "vote_average": 8.3,
      "vote_count": 260,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/o8zk3QmHYMSC7UiJgFk81OFF1sc.jpg",
      "first_air_date": "2022-08-22",
      "genre_ids": [
          10766,
          18
      ],
      "id": 204095,
      "name": "Mar do Sertão",
      "origin_country": [
          "BR"
      ],
      "original_language": "pt",
      "original_name": "Mar do Sertão",
      "overview": "",
      "popularity": 1240.471,
      "poster_path": "/ixgnqO8xhFMb1zr8RRFsyeZ9CdD.jpg",
      "vote_average": 4.3,
      "vote_count": 16,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/6nQNLJEv4PgJlck3G4FIB4vJ99o.jpg",
      "first_air_date": "2018-10-05",
      "genre_ids": [
          80,
          9648,
          18
      ],
      "id": 76669,
      "name": "Elite",
      "origin_country": [
          "ES"
      ],
      "original_language": "es",
      "original_name": "Élite",
      "overview": "When three working class kids enroll in the most exclusive school in Spain, the clash between the wealthy and the poor students leads to tragedy.",
      "popularity": 1221.521,
      "poster_path": "/3NTAbAiao4JLzFQw6YxP1YZppM8.jpg",
      "vote_average": 8.1,
      "vote_count": 8447,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/5DUMPBSnHOZsbBv81GFXZXvDpo6.jpg",
      "first_air_date": "2022-10-12",
      "genre_ids": [
          16,
          10759,
          10765,
          35
      ],
      "id": 114410,
      "name": "Chainsaw Man",
      "origin_country": [
          "JP"
      ],
      "original_language": "ja",
      "original_name": "チェンソーマン",
      "overview": "Denji has a simple dream—to live a happy and peaceful life, spending time with a girl he likes. This is a far cry from reality, however, as Denji is forced by the yakuza into killing devils in order to pay off his crushing debts. Using his pet devil Pochita as a weapon, he is ready to do anything for a bit of cash.",
      "popularity": 1205.788,
      "poster_path": "/yVtx7Xn9UxNJqvG2BkvhCcmed9S.jpg",
      "vote_average": 8.6,
      "vote_count": 286,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/o5GsA1G5YEruuUNOYvWjlArIC37.jpg",
      "first_air_date": "2022-09-19",
      "genre_ids": [
          10766
      ],
      "id": 210506,
      "name": "Sangue Oculto",
      "origin_country": [
          "PT"
      ],
      "original_language": "pt",
      "original_name": "Sangue Oculto",
      "overview": "",
      "popularity": 1202.106,
      "poster_path": "/myCEG6C5Nk181jXzBek5MQEXpM2.jpg",
      "vote_average": 2,
      "vote_count": 1,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/1UCGE1Dl7iClKIbDMcGWiHKVWCU.jpg",
      "first_air_date": "2022-05-30",
      "genre_ids": [
          35,
          10759,
          10766
      ],
      "id": 197189,
      "name": "Cara e Coragem",
      "origin_country": [
          "BR"
      ],
      "original_language": "pt",
      "original_name": "Cara e Coragem",
      "overview": "",
      "popularity": 1191.235,
      "poster_path": "/8CXbCCGiJxi4AXPBQ1QPrehMIGG.jpg",
      "vote_average": 5.6,
      "vote_count": 26,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/jANJGWIKavzyREXUMCHiXFzitDO.jpg",
      "first_air_date": "2022-10-10",
      "genre_ids": [
          10766,
          18
      ],
      "id": 204370,
      "name": "Travessia",
      "origin_country": [
          "BR"
      ],
      "original_language": "pt",
      "original_name": "Travessia",
      "overview": "",
      "popularity": 1181.733,
      "poster_path": "/jFZJEoPzt2RKSsZG8QEWptX5Xyw.jpg",
      "vote_average": 4.8,
      "vote_count": 5,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/5vUux2vNUTqwCzb7tVcH18XnsF.jpg",
      "first_air_date": "2022-09-21",
      "genre_ids": [
          80,
          18
      ],
      "id": 113988,
      "name": "Dahmer – Monster: The Jeffrey Dahmer Story",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_name": "Dahmer – Monster: The Jeffrey Dahmer Story",
      "overview": "Across more than a decade, 17 teen boys and young men were murdered by convicted killer Jeffrey Dahmer. How did he evade arrest for so long?",
      "popularity": 1151.145,
      "poster_path": "/f2PVrphK0u81ES256lw3oAZuF3x.jpg",
      "vote_average": 8.2,
      "vote_count": 1577,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/1rO4xoCo4Z5WubK0OwdVll3DPYo.jpg",
      "first_air_date": "2022-09-01",
      "genre_ids": [
          10765,
          10759,
          18
      ],
      "id": 84773,
      "name": "The Lord of the Rings: The Rings of Power",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_name": "The Lord of the Rings: The Rings of Power",
      "overview": "Beginning in a time of relative peace, we follow an ensemble cast of characters as they confront the re-emergence of evil to Middle-earth. From the darkest depths of the Misty Mountains, to the majestic forests of Lindon, to the breathtaking island kingdom of Númenor, to the furthest reaches of the map, these kingdoms and characters will carve out legacies that live on long after they are gone.",
      "popularity": 1106.751,
      "poster_path": "/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg",
      "vote_average": 7.6,
      "vote_count": 1531,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/caGVr9Il2gj8bN4ow6qsLm60TxM.jpg",
      "first_air_date": "2005-03-27",
      "genre_ids": [
          18
      ],
      "id": 1416,
      "name": "Grey's Anatomy",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_name": "Grey's Anatomy",
      "overview": "Follows the personal and professional lives of a group of doctors at Seattle’s Grey Sloan Memorial Hospital.",
      "popularity": 1007.97,
      "poster_path": "/daSFbrt8QCXV2hSwB0hqYjbj681.jpg",
      "vote_average": 8.3,
      "vote_count": 8624,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/uGy4DCmM33I7l86W7iCskNkvmLD.jpg",
      "first_air_date": "2013-12-02",
      "genre_ids": [
          16,
          35,
          10765,
          10759
      ],
      "id": 60625,
      "name": "Rick and Morty",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_name": "Rick and Morty",
      "overview": "Rick is a mentally-unbalanced but scientifically gifted old man who has recently reconnected with his family. He spends most of his time involving his young grandson Morty in dangerous, outlandish adventures throughout space and alternate universes. Compounded with Morty's already unstable family life, these events cause Morty much distress at home and school.",
      "popularity": 926.103,
      "poster_path": "/cvhNj9eoRBe5SxjCbQTkh05UP5K.jpg",
      "vote_average": 8.7,
      "vote_count": 7400,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
      "first_air_date": "2011-04-17",
      "genre_ids": [
          10765,
          18,
          10759
      ],
      "id": 1399,
      "name": "Game of Thrones",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_name": "Game of Thrones",
      "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
      "popularity": 883.923,
      "poster_path": "/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg",
      "vote_average": 8.4,
      "vote_count": 19782,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/xXRsKNJHTOGrs5wfYAxkbM2RiyT.jpg",
      "first_air_date": "2017-09-25",
      "genre_ids": [
          18
      ],
      "id": 71712,
      "name": "The Good Doctor",
      "origin_country": [
          "US"
      ],
      "original_language": "en",
      "original_name": "The Good Doctor",
      "overview": "Shaun Murphy, a young surgeon with autism and savant syndrome, relocates from a quiet country life to join a prestigious hospital's surgical unit. Unable to personally connect with those around him, Shaun uses his extraordinary medical gifts to save lives and challenge the skepticism of his colleagues.",
      "popularity": 882.623,
      "poster_path": "/53P8oHo9cfOsgb1cLxBi4pFY0ja.jpg",
      "vote_average": 8.5,
      "vote_count": 10938,
      "media_type": "tv"
  },
  {
      "backdrop_path": "/rv5gu2gYbOEYoArzH7bqJuMxvBB.jpg",
      "first_air_date": "2021-01-25",
      "genre_ids": [
          18,
          10751
      ],
      "id": 115646,
      "name": "Lisa",
      "origin_country": [
          "BE"
      ],
      "original_language": "nl",
      "original_name": "Lisa",
      "overview": "",
      "popularity": 856.397,
      "poster_path": "/w2nOl7KhwcUj11YxEi9Nknj9cqu.jpg",
      "vote_average": 6.7,
      "vote_count": 29,
      "media_type": "tv"
  }
]


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

  const handleClick_g1 = () => {setSelectedGenre("action")}
  const handleClick_g2 = () => {setSelectedGenre("horror")}
  const handleClick_g3 = () => {setSelectedGenre("drama")}
  const handleClick_g4 = () => {setSelectedGenre("comedy")}


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
        { !props.isUserReady ? ( <>
        <div style={{display: "flex", flexDirection: "row", marginLeft: 50}}>
          <div style = {{width:"50%"}}>
            <div style={{color: "white", fontSize: 25, paddingBottom: 20, textAlign: "center"}}>Would you rather watch a movie or a TV show?</div>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "12%"}}>
              <div onClick={handleClick_t1} style={{backgroundColor: "#d8d8d8", cursor: "pointer", marginBottom: 50, width: "30%", height: 80, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "7%"}}> 
                  <span style={{color: "black", paddingLeft: 60, paddingRight: 20}} >Movie</span> {selectedType == "movie" && <FcCheckmark size={30}/>} 
                </div>
              </div>
              <div onClick={handleClick_t2} style={{backgroundColor: "#d8d8d8", cursor: "pointer", marginBottom: 50, width: "30%", height: 80, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "7%"}}> 
                  <span style={{color: "black", paddingLeft: 60, paddingRight: 20}} >TV Show</span> {selectedType == "tvshow" && <FcCheckmark size={30}/>} 
                </div>
              </div>
            </div>
          </div >
             
          <div style = {{width:"50%"}}>
            <div style={{color: "white", fontSize: 25, paddingBottom: 20, textAlign: "center"}}>What genre would you like to watch?</div>
            <div style={{display: "flex", flexDirection: "column", marginLeft: "12%"}}>

              <div onClick={handleClick_g1} style={{backgroundColor: "#d8d8d8", cursor: "pointer", marginBottom: 50, width: "30%", height: 80, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "7%"}}> 
                  <span style={{color: "black", paddingLeft: 60, paddingRight: 20}} >Action</span> {selectedGenre == "action" && <FcCheckmark size={30}/>} 
                </div>
              </div>
              <div onClick={handleClick_g2} style={{backgroundColor: "#d8d8d8", cursor: "pointer", marginBottom: 50, width: "30%", height: 80, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "7%"}}> 
                  <span style={{color: "black", paddingLeft: 60, paddingRight: 20}} >Horror</span> {selectedGenre == "horror" && <FcCheckmark size={30}/>} 
                </div>
              </div>
              <div onClick={handleClick_g3} style={{backgroundColor: "#d8d8d8", cursor: "pointer", marginBottom: 50, width: "30%", height: 80, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "7%"}}> 
                  <span style={{color: "black", paddingLeft: 60, paddingRight: 20}} >Drama</span> {selectedGenre == "drama" && <FcCheckmark size={30}/>} 
                </div>
              </div>
              <div onClick={handleClick_g4} style={{backgroundColor: "#d8d8d8", cursor: "pointer", marginBottom: 50, width: "30%", height: 80, borderRadius: 30, marginLeft: "25%", fontSize: 30}}> 
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "7%"}}> 
                  <span style={{color: "black", paddingLeft: 60, paddingRight: 20}} >Comedy</span> {selectedGenre == "comedy" && <FcCheckmark size={30}/>} 
                </div>
              </div>

            </div>
          </div>
        </div>
        <div style={{marginTop: 20, marginLeft: "45%", marginRight: 100}}>
          <button onClick={onReady} style={{marginLeft: 15, marginRight: 10, width: "25%"}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ready?</button>
        </div>
        </>)


  : (
  
      <div style={{display: "flex", flexDirection: "column", marginLeft: 50}}>
        <div style={{color: "white", fontSize: 25, paddingBottom: 20, textAlign: "center"}}>Based on your group's votes, we think you should watch one of these titles together.</div>
        <div style={{color: "#a6a6a6", fontSize: 20, paddingBottom: 20, textAlign: "center"}}>Discuss what to watch in the chat. When you're ready, the host may start the movie by clicking on the selected title.</div>
        <div style={{paddingTop: "10%"}}><SectionSlider films={films}/></div>
      </div>
    )}
      </div>
  </>   
  );
};

export default Voting;