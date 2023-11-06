const ProfileImage = ({ image, name, size }) => {
  return (
    <div>
      {image ? (
        <img
          className={`object-cover w-${size} h-${size} rounded-full`}
          src={image}
        />
      ) : (
        <div
          className={`text-2xl text-black font-bold rounded-full w-${size} h-${size} flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}>
          {name ? name.charAt(0).toUpperCase() : ""}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
