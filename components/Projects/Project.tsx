import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/slices/sliceModal';
import { ProjectProps } from './Project.interface';

export const Project = ({ title, description, tags, author }: ProjectProps) => {
  const mode = useAppSelector((state) => state.mode.mode);
  const userLogged = useAppSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();
  const handleContribute = () => {
    return;
  };
  const [innerWidth, setInnerWidth] = useState(0);
  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);
  return (
    <div className="w-full p-2 md:p-0">
      <div
        className={`${
          mode
            ? 'text-white bg-box-color border border-[#363D45]'
            : 'text-dark-color border border-[#C9C9C9]'
        } text-white shadow-md rounded-md items-center flex-col md:flex md:flex-row justify-center space-y-2`}
      >
        <div className="w-full p-2 flex justify-center items-center">
          <Image
            src={'/open-source.png'}
            alt={title}
            height={800}
            width={innerWidth/1.2}
          />
        </div>
        <div className="h-full flex flex-col justify-between space-y-2 p-2">
          <h1 className="font-semibold text-xl">
            {title} - <span className="text-lg font-light">{author}</span>
          </h1>
          <p className="text-sm ">{description}</p>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex space-x-2 pb-2 md:pb-0">
              {tags.map((tag: string, i: number) => (
                <p
                  key={i}
                  className={`px-2 py-1 text-sm rounded-full cursor-pointer ${
                    !mode
                      ? 'text-[#373737] bg-[#dedede] border border-[#c9c9c9]'
                      : 'border border-[#363d45] bg-[#31363e]'
                  }`}
                >
                  {tag}
                </p>
              ))}
            </div>
            <button
              onClick={() =>
                userLogged ? handleContribute : dispatch(openModal())
              }
              className={`px-2 py-1.5 mt-2 sm:my-0 flex border border-[#999] focus:ring focus:bg-blue-800 bg-secondary-color ${
                !mode && 'text-white'
              } rounded-md`}
            >
              <span>Contribute</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};