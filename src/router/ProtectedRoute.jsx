import { Outlet, Navigate } from "react-router-dom";
import { getJwt } from "../service/authService";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import getProfile from "../service/userService";
const ProtectedRoute = () => {
  const token = getJwt();

  if (token) {
    const { isLoading } = getProfile();
    return (
      <div className='flex w-full h-screen fixed bg-[#131517]'>
        <div className='w-80 flex flex-col flex-grow md:w-full'>
          {!isLoading && (
            <>
              <Navbar />
              <div className='flex w-full overflow-scroll h-full sm:px-1 xl:px-16 sm:pt-1 sm:gap-x-2 scrollbar-none'>
                <div className='sm:w-16 lg:w-[30%] '>
                  <Sidebar />
                </div>
                <Outlet />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  return <Navigate to='/login' />;
};

export default ProtectedRoute;
