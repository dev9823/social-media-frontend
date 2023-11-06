import { useQuery } from "@tanstack/react-query";
import Feed from "../components/Feed";
import Widget from "../components/Widget";
import { getData } from "../utils/fetchData";
import { getCurrentUserId } from "../service/authService";
import { TailSpin } from "react-loader-spinner";

const Saved = () => {
  const userId = getCurrentUserId();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["saved-posts"],
    queryFn: () => getData(`posts/?save_post=${userId}`),
  });
  return (
    <div className='w-full flex sm:pb-1 gap-2 pb-8'>
      {isLoading ? (
        <div className='mx-auto mt-3'>
          <TailSpin
            height='80'
            width='80'
            color='#b0b0b0e4'
            ariaLabel='tail-spin-loading'
            radius='1'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className='w-full max-w-[32rem] lg:w-[32rem] 2xl:w-[40rem] mx-auto'>
            {posts.length === 0 ? (
              <h1 className='text-2xl text-slate-200 h-full flex items-center justify-center'>
                No saved post
              </h1>
            ) : (
              <Feed posts={posts} />
            )}
          </div>
          <div className='hidden md:flex w-64 md:w-80 h-full ml-auto'>
            <Widget />
          </div>
        </>
      )}
    </div>
  );
};

export default Saved;
