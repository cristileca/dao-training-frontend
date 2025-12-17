import React from "react";

interface FormStep1Props {
    onContinue: () => void;
}
export default function FormStep1({ onContinue }: FormStep1Props){
    return (
         <>
            <span className="Select-Network-Cur">
              Select Network & Currency
            </span>

            <span className="Please-select-your-n mx-auto mb-3 text-[14px] text-gray-600">
                  Please select your network & currency
                </span>

            <div className="flex flex-col items-center justify-center">
                    <span className="w-[337px]  my-2 text-left text-black">
                        Network
                    </span>
                <div className="Rectangle-3"></div>
                <span className="w-[337px] mt-3  text-black">
                      Currency
                    </span>
                <div className="Rectangle-3"></div>
            </div>

            <button
                onClick={onContinue}
                className={"w-[337px] h-15 mx-auto mt-5 rounded-md bg-[#1c91e9] text-white"}>
                Continue
            </button>
        </>
    )
}