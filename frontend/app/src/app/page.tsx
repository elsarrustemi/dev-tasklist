import Link from "next/link";
import BookingList from "./components/bookingList";


const Home: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-prose mx-auto p-8 shadow-md rounded-lg border-t-2 border-gray-500 bg-gray-100 dark:text-white">
        <div>
          <BookingList />
        </div>
        <div className="py-7">
          <Link href="booking/bookingForm" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Add a booking</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
