import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TfiClose } from "react-icons/tfi";
import { putData } from "../utils/fetchData";
import { useEffect, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";

const ProfileForm = ({ data, onClose }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bio, setBio] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const queryClient = useQueryClient();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (data.birthdate) setBirthDate(data.birthdate);
    if (data.bio) setBio(data.bio);
  }, []);

  const profileMutation = useMutation((data) =>
    putData(`api/people/me/`, data)
  );

  const handleChange = (e) => {
    setBio(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("birthdate", birthDate);
    if (selectedImage) formData.append("profile_image", selectedImage);
    profileMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"]);
      },
      onError: (error) => console.log(error),
    });
  };

  return (
    <div className='sm:px-5 mx-auto my-auto pt-4 sm:shadow-inner shadow-none sm:rounded-xl shadow-slate-500 max-w-lg w-full h-full bg-[#1c1e21] overflow-hidden'>
      <TfiClose
        onClick={onClose}
        className=' hidden sm:flex bg-gray-700 p-2 rounded-full box-content ml-auto'
        size={16}
      />
      <HiArrowNarrowLeft
        onClick={onClose}
        className='sm:hidden mr-auto text-gray-500'
        size={25}
      />
      <form onSubmit={handleSubmit} className=' space-y-8 h-full px-2 sm:px-5'>
        <div className='w-full justify-center flex mx-auto'>
          <label
            className='bg-slate-300 flex items-center text-gray-950 w-24 h-24 sm:w-32 sm:h-32 rounded-full'
            htmlFor='photo'>
            {selectedImage || data.profile_image ? (
              <img
                className='object-cover w-24 h-24 sm:w-32 sm:h-32 rounded-full'
                src={selectedImage ? previewUrl : data.profile_image}
              />
            ) : (
              <div className='text-center text-lg w-full h-full flex justify-center items-center'>
                Upload image
              </div>
            )}
          </label>
          <input
            onChange={handleImageChange}
            id='photo'
            type='file'
            className='hidden'
          />
        </div>
        <div className='flex items-center gap-x-4'>
          <label htmlFor='bio' className='text-xl'>
            Bio:
          </label>
          <textarea
            className='w-full max-h-24 bg-[#131517] p-2 rounded-lg scrollbar-none outline-none '
            id='bio'
            type='text'
            rows={1}
            placeholder={bio.length < 1 ? `Add bio to your profile` : ""}
            value={bio}
            onChange={handleChange}
          />
        </div>
        <div className='space-x-2'>
          <label className='text-xl' htmlFor='birth-date'>
            Birth Date:
          </label>
          <input
            className='bg-sky-950 w-48 px-2 py-1 rounded'
            id='birth-date'
            type='date'
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div className='flex justify-center'>
          <button
            type='submit'
            className='px-10 py-1 mt-6 bg-sky-900 hover:bg-sky-700 rounded-lg mx-auto'>
            {profileMutation.isLoading ? `loading` : `Submit`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
