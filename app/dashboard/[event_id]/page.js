"use client";
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaImages } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { AlertDestructive } from '@/components/ui/ErrorAlert';
import codeclash from '../../../image/codeclash.jpg';
import ideathon from '../../../image/ideathon.jpg';
import techmela from '../../../image/techmela.jpg';
import neoncricket from '../../../image/neoncricket.jpg';
import Image from 'next/image';
import { getDemoEvents, saveDemoEvents } from '@/helper/EventData';

const CreateEvent = () => {
  const params = useParams();
  const router = useRouter();
  const eventId = params.event_id;
  const cardImage = { codeclash, ideathon, techmela, neoncricket };
  const [formData, setFormData] = useState({ title: '', description: '', committee: '' });
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const fileInputRef = useRef(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (eventId && eventId !== 'create-event') {
      const event = getDemoEvents().find((item) => item.id === eventId);
      if (event) {
        setFormData({ title: event.Slogan || '', description: event.description || '', committee: event.Committee || '' });
        const eventImage = cardImage[event.Image] || event.Image;
        setImage(eventImage);
        setUrl(typeof eventImage === 'string' ? eventImage : eventImage.src);
      }
    }
  }, [eventId]);

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const setSelectedFile = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setUrl(URL.createObjectURL(selectedFile));
    setImage(URL.createObjectURL(selectedFile));
  };
  const handleDrop = (e) => { e.preventDefault(); setSelectedFile(e.dataTransfer?.files?.[0]); };
  const handleFileInputChange = (e) => setSelectedFile(e.target.files?.[0]);
  const handleRemoveImage = () => { setImage(''); setUrl(''); setFile(null); };
  const handleOpenFileDialog = () => fileInputRef.current?.click();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.committee.trim() || !image) {
      setIsError(true);
      return;
    }
    let imageValue = image;
    if (file) {
      imageValue = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } else if (typeof image === 'object') {
      imageValue = Object.keys(cardImage).find((key) => cardImage[key] === image) || 'codeclash';
    }
    const events = getDemoEvents();
    const existing = events.find((event) => event.id === eventId);
    const nextEvent = {
      id: existing ? existing.id : `event-${Date.now()}`,
      Slogan: formData.title,
      description: formData.description,
      Committee: formData.committee,
      Image: imageValue,
      date: existing?.date || new Date().toLocaleDateString('en-GB'),
    };
    saveDemoEvents(existing ? events.map((event) => event.id === eventId ? nextEvent : event) : [...events, nextEvent]);
    router.push('/dashboard');
  };

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setIsError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  return (
    <div className='relative pb-10 bg-gray-100 dark:bg-zinc-950'>
      <div className="saveSection h-[7rem] p-5 flex justify-between">
        <input onChange={handleFormChange} value={formData.title} name="title" type="text" className='p-1 bg-transparent border-b-[2px] dark:border-b-zinc-800 outline-none text-gray-100 dark:text-zinc-900 placeholder-gray-100 dark:placeholder-zinc-900 h-10 w-[30rem]' placeholder='Untitled Event' />
        <div className="flex space-x-5">
          <a href='/dashboard'><button className='h-8 p-1 px-6 font-semibold bg-gray-100 text-[0.8rem] rounded-full shadow-lg dark:bg-zinc-800'>Cancel</button></a>
          <button onClick={handleFormSubmit} className='h-8 p-1 px-6 rounded-full bg-gray-100 text-[0.8rem] font-semibold shadow-lg dark:bg-zinc-800'>Save</button>
        </div>
      </div>
      <div className="dark:bg-zinc-800 bg-white shadow-lg overflow-hidden w-[50rem] h-[25rem] ml-5 -mt-5 rounded-lg">
        <div className="p-3 px-4 border-b-2 dark:border-b-zinc-600"><h1>Image</h1></div>
        <div className="h-[calc(100%-3.2rem)] flex justify-center items-center">
          {image === '' ? (
            <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={handleOpenFileDialog} className="bg-teal-400 cursor-pointer flex justify-center items-center w-[90%] h-[80%] rounded-lg">
              <input type="file" className="hidden" accept="image/*" ref={fileInputRef} onChange={handleFileInputChange} />
              <FaImages className='text-[3rem] text-gray-200 dark:text-zinc-800' />
            </div>
          ) : (
            <div className="relative overflow-hidden text-slate-600 flex justify-center space-x-3 items-center w-[95%] h-[20rem] rounded-md">
              <div className="absolute z-10 w-full h-full ease-in-out duration-200 transition-all cursor-pointer text-white bg-slate-950 opacity-0 hover:opacity-[0.4] flex justify-center items-center">
                <MdModeEditOutline onClick={handleRemoveImage} className="text-2xl hover:scale-[1.05] ease-in-out duration-150" />
              </div>
              <Image unoptimized className="object-cover w-full h-full" width={300} height={300} src={url} alt="uploadedImage" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-7 bg-white shadow-lg dark:bg-zinc-800 overflow-hidden w-[50rem] ml-5 rounded-lg">
        <div className="p-3 px-4 border-b-2 dark:border-b-zinc-600"><h1>Event Info</h1></div>
        <div className="h-[calc(100%-3.2rem)] p-3 px-4">
          <div className="mb-5"><h1 className='ml-1 dark:font-semibold dark:text-zinc-300'>Event Title</h1><input type="text" onChange={handleFormChange} value={formData.title} name="title" className='p-2 pl-3 mt-2 w-[20rem] bg-gray-100 dark:bg-zinc-700 placeholder-gray-400 text-[0.9rem] rounded-md outline-none' placeholder='Event Title' /></div>
          <div className="mb-5"><h1 className='ml-1 dark:font-semibold dark:text-zinc-300'>Event Committee</h1><input type="text" onChange={handleFormChange} value={formData.committee} name="committee" className='p-2 pl-3 mt-2 bg-gray-100 dark:bg-zinc-700 w-[20rem] placeholder-gray-400 text-[0.9rem] rounded-md outline-none' placeholder='Event Committee' /></div>
          <div className="mb-5"><h1 className='ml-1 dark:font-semibold dark:text-zinc-300'>Event Description</h1><textarea onChange={handleFormChange} value={formData.description} name="description" className='p-2 pl-3 mt-2 bg-gray-100 dark:bg-zinc-700 w-[30rem] h-[12rem] res placeholder-gray-400 text-[0.9rem] rounded-md outline-none' placeholder='Add Event Description' /></div>
        </div>
      </div>
      <AlertDestructive className={`absolute w-[20rem] font-semibold ease-linear transition-all right-3 top-32 ${isError ? "block" : "hidden"}`}>
        Please fill all the fields
      </AlertDestructive>
    </div>
  );
};
export default CreateEvent;
