import { useEffect, useState } from "react";
import ShowImage from "./ShowImage";
import axios from "axios";
import { Image } from "../../models/Images";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const ShowImageList = () => {
  const [images, setImages] = useState<Image[]>();
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("dogs");
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<{ next_page: string; prev_page: string }>();
  const [isNextPage, setIsNextPage] = useState(false);
  const [count, setCount] = useState(0);
  const [button, setButton] = useState("");

  useEffect(() => {
    setLoading(true);
    console.log("loading Pehele", loading);

    let url: any = `https://api.pexels.com/v1/search?query=${search}`;
    console.log("button", button);

    if (isNextPage === true && button === "next") {
      url = data?.next_page;
    } else if (isNextPage === true && button === "prev") {
      url = data?.prev_page;
    }

    axios
      .get(url, {
        headers: { Authorization: process.env.REACT_APP_MY_KEY },
      })
      .then((res) => res.data)
      .then((response) => {
        setImages(response.photos);
        setData(response);
        setLoading(false);
        console.log("response", response);
      });
  }, [search, count]);

  // useEffect(() => {
  //   axios
  //     .get(page, {
  //       headers: { Authorization: process.env.REACT_APP_MY_KEY },
  //     })
  //     .then((res) => res.data)
  //     .then((data) => {
  //       console.log("pagesNextResult", data.photos);
  //     });
  // }, [page]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearch(query);
    setIsNextPage(false);
  };

  const handleOnKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setSearch(query);
      setIsNextPage(false);
      console.log("handleOnKeyDown");
    }
  };

  const handleNextClicked = () => {
    setIsNextPage(true);
    setCount(count + 1);
    setButton("next");
  };

  const handlePrevClicked = () => {
    setCount(count + 1);

    setButton("prev");
  };

  return (
    <div className="py-10 mx-5">
      <div className="flex items-center justify-center max-w-xl ml-10 space-x-4">
        <input
          onKeyDown={handleOnKeyDown}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-full"
          placeholder="Search...."
          required
        />
        <button
          onClick={handleSearch}
          type="submit"
          className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Search
        </button>
        <div className="">
          <Link to="/ShowVideoList">Videos</Link>
        </div>
      </div>

      <div className="flex grid flex-wrap justify-center grid-cols-2 space-x-6 space-y-6 rounded-md md:grid-cols-4 md:grid">
        <span className="hidden"></span>

        {loading ? (
          <Loading />
        ) : (
          images?.map((list) => (
            <ShowImage key={list.id} id={list.id} src={list.src.tiny} />
          ))
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
          onClick={() => handleNextClicked()}
          className="px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShowImageList;
