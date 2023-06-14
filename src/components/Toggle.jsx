

import { useState } from 'react'

export default function Toggle({ enabled, setEnabled }) {


  return (
    <div className="absotute flex flex-col items-center justify-center overflow-hidden h-[calc(2vh)] bottom-0 left-0 z-1000 mb-1">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            readOnly
          />
          <div
            onClick={() => {
              setEnabled(!enabled);
            }}
            className="w-8 h-4 bg-gray-200 rounded-full peer  peer-focus:ring-pink-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-04 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"
          ></div>
          <span className="ml-2 text-xs font-semibold text-black">
            Compress The Files
          </span>
        </label>
      </div>
    </div>
  );
}
