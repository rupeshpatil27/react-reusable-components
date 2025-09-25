import { useEffect, useState } from "react";
import Pagination from "./component/Pagination";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch("https://dummyjson.com/posts?limit=0");
        const data = await response.json();
        setPosts(data?.posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }
    getPosts();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = posts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-center font-bold text-3xl mt-5">Posts</h1>

      <div className="h-full w-[50rem] m-auto p-2 rounded-xl flex flex-col items-start justify-center gap-5">
        <ul className="space-y-2 w-full">
          {currentPageData.map((item, index) => (
            <li
              className="space-y-2 space-x-3 bg-white rounded-md px-3 py-3 hover:[box-shadow:2px_3px_5px_-1px_rgba(0,0,0,0.5)] hover:scale-101 duration-200"
              key={index}
            >
              <span>{item.id}.</span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>

        <div className="bg-white w-full p-2 rounded-xl">
          <Pagination
            totalItems={posts?.length || 0}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            showSizeChanger={true}
            showTotal={true}
            pageSizeOptions={["2", "5"]}
            position="right"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
