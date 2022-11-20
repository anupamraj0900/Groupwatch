import { signOut } from "firebase/auth";
import { FC, useState } from "react";
import { AiOutlineHistory, AiOutlineHome } from "react-icons/ai";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineExplore } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useCurrentViewportView } from "../../hooks/useCurrentViewportView";
import { auth } from "../../shared/firebase";
import { useAppSelector } from "../../store/hooks";

interface SidebarProps {
  isSidebarActive: boolean;
  setIsSidebarActive: any;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarActive, setIsSidebarActive }) => {
  const location = useLocation();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useCurrentViewportView();

  const signOutHandler = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        toast.success("Sign out successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const personalPageHandler = (destinationUrl: string) => {
    if (!currentUser) {
      toast.info("You need to login to use this feature", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    navigate(destinationUrl);
  };

  return (
    <>
      <ToastContainer />

      {isLoading && (
        <div className="z-10 tw-flex-center fixed top-0 left-0 w-full h-full">
          <div className="w-28 h-28 border-[10px] rounded-full border-primary border-t-transparent animate-spin "></div>
        </div>
      )}

      <div
        className={`shrink-0 md:max-w-[260px] w-[70vw] pl-8 top-0 pt-10  
        md:sticky md:translate-x-0 md:bg-transparent md:shadow-none
    
      -translate-x-full fixed h-screen shadow-md transition duration-300 bg-dark-lighten z-50 ${
        isSidebarActive && "translate-x-0"
      }`}
      >
        {!isMobile && (
          <Link to="/" className="flex items-center gap-3">
            <LazyLoadImage
              alt="Logo"
              src="/logo.png"
              effect="opacity"
              className="w-10 h-10"
            />
            <h1 className="text-xl text-white tracking-widest font-semibold uppercase">
              <span>Group</span>
              <span>Watch</span>
            </h1>
          </Link>
        )}

        <div
          className={`text-white text-lg font-medium ${
            isSidebarActive ? "-mt-6" : "mt-12"
          }`}
        >
       General
        </div>
        <div className="mt-8 ml-4 flex flex-col gap-6">
          <Link
            to="/"
            className={`flex gap-6 items-center  ${
              location.pathname === "/" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <AiOutlineHome size={25} />
            <p>Home</p>
          </Link>

          <Link
            to="/explore"
            className={`flex gap-6 items-center  ${
              location.pathname === "/explore" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <MdOutlineExplore size={25} />
            <p>Discover</p>
          </Link>

          {/* <Link
            to="/shorts"
            className={`flex gap-5 items-center  ${
              location.pathname === "/shorts" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <TbBrandTiktok size={30} />
            <p>Shorts</p>
          </Link> */}

      <Link
            to="/"
            className={`flex gap-6 items-center  ${
              location.pathname === "/" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <AiOutlineHome size={25} />
            <p>Public Lobbies</p>
          </Link>

          
        </div>

        <div className="text-white text-lg font-medium mt-12">Social</div>
        <div className="mt-8 ml-4 flex flex-col gap-6">
          <button
            onClick={() => personalPageHandler("/friends")}
            className={`flex gap-6 items-center  ${
              location.pathname === "/friends" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <BsBookmarkHeart size={25} />
            <p>Your Friends</p>
          </button>
          <button
            onClick={() => personalPageHandler("/bookmarked")}
            className={`flex gap-6 items-center  ${
              location.pathname === "/bookmarked" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <BsBookmarkHeart size={25} />
            <p>Join Private</p>
          </button>

      

          <button
            onClick={() => personalPageHandler("/bookmarked")}
            className={`flex gap-6 items-center  ${
              location.pathname === "/bookmarked" &&
              "!text-primary border-r-4 border-primary font-medium"
            } hover:text-white transition duration-300`}
          >
            <BsBookmarkHeart size={25} />
            <p>Party</p>
          </button>
        </div>

        <div className="text-white text-lg font-medium mt-12">See you again! </div>
        <div className="mt-8 ml-4 flex flex-col gap-6">
    

          {!currentUser && (
            <Link
              to={`/auth?redirect=${encodeURIComponent(location.pathname)}`}
              className="flex gap-5 items-center"
            >
              <HiOutlineLogin size={30} />
              <p>Logout</p>
            </Link>
          )}

          {currentUser && (
            <button
              onClick={signOutHandler}
              className="flex gap-5 items-center"
            >
              <HiOutlineLogout size={30} />
              <p>Logout</p>
            </button>
          )}
        </div>
      </div>

      <div
        onClick={() => setIsSidebarActive(false)}
        className={`bg-black/60 z-[5] fixed top-0 left-0 w-full h-full md:opacity-100 transition duration-300 ${
          isSidebarActive ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>
    </>
  );
};

export default Sidebar;
