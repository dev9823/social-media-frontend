export function SendMessage() {
  return (
    <button className='bg-[#137271] w-full py-1  text-gray-300'>
      Send Message
    </button>
  );
}

export const GroupDownList = () => {
  return (
    <div>
      <ul>
        <li>Groups</li>
        <li>Groups You created</li>
        <li>Groups You've joined</li>
      </ul>
    </div>
  );
};
