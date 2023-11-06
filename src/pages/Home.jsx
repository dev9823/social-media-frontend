import { useQueryClient } from "@tanstack/react-query";
import Feed from "../components/Feed";
import Widget from "../components/Widget";
import { getPosts } from "../service/postService";
import { TailSpin } from "react-loader-spinner";

const Home = () => {
  const { data: posts, isLoading } = getPosts();
  return (
    <div className='w-full flex sm:pb-0 sm:gap-x-2 pb-8'>
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
          <div className='max-w-[32rem] w-full 2xl:w-[40rem] mx-auto '>
            <Feed posts={posts} />
          </div>
          <div className='hidden md:flex w-64 md:w-[320px] h-full'>
            <Widget />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
