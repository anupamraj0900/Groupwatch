import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { useCurrentViewportView } from "../hooks/useCurrentViewportView";

interface FriendListProps {}

const FriendList: FunctionComponent<FriendListProps> = () => {
  
  return (
    <>
      

      <div className="md:bg-black/60 bg-dark min-h-screen tw-flex-center">
        <div>
          <p className="text-[150px] text-white font-semibold leading-none">
            404
          </p>
          <p className="mt-6 text-white text-2xl text-center">
            There is nothing here
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="px-8 py-2 bg-primary rounded-md text-white text-xl mt-8 inline-block hover:bg-blue-600 transition duration-300"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendList;