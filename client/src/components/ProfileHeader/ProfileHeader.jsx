
const ProfileHeader = ({image, name}) => {
  return (
    <div className="flex flex-row justify-around items-center p-10 border-b-2">
        <img className="w-80 h-80 object-cover rounded-full shadow-md" src={image} alt="profile pic" />

        <h1 className="text-6xl text-left w-3/5">{name}</h1>
    </div>
  )
}

export default ProfileHeader