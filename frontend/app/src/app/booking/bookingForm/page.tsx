'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const BookingForm: React.FC = () => {
    const [service, setService] = useState<string>('');
    const [doctorName, setDoctorName] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);

    const router = useRouter();

    const formatTimeToAmPm = (time: string): string => {
        const [hours, minutes] = time.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setPending(true);

        const formattedStartTime = formatTimeToAmPm(startTime);
        const formattedEndTime = formatTimeToAmPm(endTime);

        const formData = {
            service,
            doctor_name: doctorName,
            start_time: formattedStartTime,
            end_time: formattedEndTime,
            date,
        };

        try {
            const res = await fetch('http://host.docker.internal:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const responseText = await res.text();
            if (res.status === 201) {
                toast.success(responseText);
                router.push('/');
                router.refresh();
            }
            else {
                toast.error(responseText);
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            toast.error('An unexpected error occurred. Please try again later.');
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center px-4 md:px-0">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 md:p-8 shadow-md rounded-lg border-t-2 border-gray-500 bg-gray-100 dark:text-white"
            >
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        required
                    />
                    <label htmlFor="service" className="peer-focus:font-medium absolute text-sm md:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Service
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="doctor_name"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        required
                    />
                    <label htmlFor="doctor_name" className="peer-focus:font-medium absolute text-sm md:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Doctor Name
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="time"
                        name="start_time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        required
                    />
                    <label htmlFor="start_time" className="peer-focus:font-medium absolute text-sm md:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Start time
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="time"
                        name="end_time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        required
                    />
                    <label htmlFor="end_time" className="peer-focus:font-medium absolute text-sm md:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        End time
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder=" "
                        className="block py-2.5 px-0 w-full text-sm md:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                        required
                    />
                    <label htmlFor="date" className="peer-focus:font-medium absolute text-sm md:text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Date
                    </label>
                </div>

                <button
                    disabled={pending}
                    type="submit"
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                    {pending ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default BookingForm;
