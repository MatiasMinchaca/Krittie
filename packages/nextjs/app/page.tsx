"use client";

import type { NextPage } from "next";
import { Button } from "~~/components/ui/button";
import WIDWidget from "~~/components/w-id-widget";
import {BackgroundVectorLine} from "~~/components/svgs";

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-between items-center pt-16 h-[55dvh]'>
      <div className='z-10 space-y-4'>
        <h1 className="font-krittie text-center text-9xl">
          Krittie
        </h1> 
        <h2 className="font-poppins text-xl font-bold">My world pet friendly <br /> with Worldcoin</h2>
      </div>
      <div className="z-10">
        <WIDWidget />
      </div>
      <div className="fixed top-0 bottom-0">
      <BackgroundVectorLine />
      </div>
    </div>
  );
};

export default Home;
