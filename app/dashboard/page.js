"use client";
import EventCard from '@/components/EventCard';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import notfound from '../../image/notfound.png';
import Image from 'next/image';
import { getDemoEvents } from '@/helper/EventData';

const Dashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const refresh = () => setData(getDemoEvents());
    refresh();
    window.addEventListener('bigowl-events-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('bigowl-events-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return (
    <div className='h-screen p-4 bg-gray-100 dark:bg-zinc-950'>
      <Header eventCount={data.length} />
      {data.length === 0 ? (
        <div className="mt-5">
          <div className="flex flex-col items-center justify-center ">
            <Image src={notfound} className='w-[50rem] bg-cover' alt='not found' />
            <div className="-mt-20 text-center ">
              <h1 className="text-2xl font-semibold">No Event Found</h1>
              <p className='text-lg'>Please create an event first </p>
            </div>
          </div>
        </div>
      ) : (
        <div className=' mt-5 grid grid-cols-6 gap-4 '>
          <EventCard data={data} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
