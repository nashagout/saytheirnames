import React from "react";
import { NameType } from "types/common";
import placeholder from "public/images/placeholder.jpg";

type CardProps = { id: number; data: NameType };

function Card({ id, data }: CardProps) {
  const domain = window.location.origin;

  const src = `${domain}/images/faces/${data.id}.jpg`;

  return (
    <div
      className={`before: group relative w-full  grayscale   before:rounded-sm   hover:grayscale-0`}
    >
      <div className="test__body absolute bottom-0 z-10 flex flex-col p-6 text-white">
        <div className="relative">
          <a className="test__link absolute " target="_blank" href="/"></a>
          <h1 className="test__title mb-1 text-xl font-black sm:text-3xl">
            {data?.firstName}
          </h1>
          <p className="test__author text-xs font-black sm:text-sm">
            {data.lastName}
          </p>
        </div>
      </div>
      <div
        className={`relative h-auto	 w-full rounded-sm bg-[url('/bg-01.jpg')] `}
      >
        <img
          alt={`${data?.firstName} ${data?.lastName}`}
          onError={(e) => {
            // @ts-ignore
            e.target.src = placeholder?.src;
          }}
          className=" blur-sm transition-all group-hover:blur-none"
          src={src}
        />
      </div>
    </div>
  );
}

export default Card;
