import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VideoData } from "../../models/VideoData";
import { Videos } from "../../models/Videos";
import Loading from "../Loading";

import ShowVideo from "./ShowVideo";

const ShowVideoList = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("dogs");
  const [mainData, setMainData] = useState<VideoData[]>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);

    console.log("loading Pehele", loading);

    axios
      .get(`https://api.pexels.com/videos/search?query=${search}`, {
        headers: { Authorization: process.env.REACT_APP_MY_KEY },
      })
      .then((res) => res.data)
      .then((response) => {
        setMainData(response.videos);
        setLoading(false);
      });
    console.log("loading bbadme", loading);
  }, [search]);

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setSearch(query);
    }
  };

  const handlePrevClicked = () => {};
  const handleNextClicked = () => {};

  return (
    <div className="py-10 mx-5">
      <div className="flex items-center justify-center max-w-xl ml-10 space-x-4">
        <input
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-full"
          placeholder="Search...."
          required
        />
        <button className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
          Search
        </button>
        <div className="">
          <Link to="/">Images</Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center grid-cols-4 space-x-6 space-y-6 rounded-md md:grid">
        <span className="hidden"></span>

        {loading ? (
          <Loading />
        ) : (
          mainData?.map((list) => <ShowVideo list={list} key={list.id} />)
        )}
      </div>
      <div className="flex justify-between px-6 py-10 space-x-4">
        <button
          onClick={handlePrevClicked}
          className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Back
        </button>
        <button
          onClick={handleNextClicked}
          className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowVideoList;
