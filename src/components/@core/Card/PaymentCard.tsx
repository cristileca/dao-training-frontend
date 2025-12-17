'use client'
import React, { useState } from "react";
import FormStep1 from "@/components/@core/Card/FormStep1";
import FormStep2 from "@/components/@core/Card/FormStep2";
import Loader from "@/components/@core/Stepper/ProgressStepper";

export default function PaymentCard({ txId, dueValue, display }) {
    const [currentStep, setCurrentStep] = useState(1);

    const handleContinue = () => setCurrentStep(2);

    return (
                <>
                        {
                            display?
                                <div className="fixed inset-0 flex backdrop-blur-xs items-center justify-center bg-black/30 z-50">
                                    <div className="absolute center  m-auto w-[593px] h-[592px] bg-white flex flex-col rounded-[20px] shadow-sm">

                                        <div className="h-[83px] flex justify-between items-center rounded-[20px] bg-[#f8f8f9]">
                                            <div className="flex flex-col justify-center px-[23px]">
                                                <p className="text-[#10314a] text-[14px]">
                                                    Transaction ID: <span className="text-black font-bold">#{txId}</span>
                                                </p>
                                                <p className="text-black text-[14px]">
                                                    Time left: <span className="text-blue-500">29:59</span>
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-center px-[23px] text-black">
                                                <h1 className="font-bold text-3xl">
                                                    Due: <span className="text-[#1c91e9]">{dueValue} USDT</span>
                                                </h1>
                                            </div>
                                        </div>

                                        <Loader step={currentStep}/>

                                        {currentStep === 1 && <FormStep1 onContinue={handleContinue}/>}
                                        {currentStep === 2 && <FormStep2/>}

                                        <div className="w-max flex flex-row m-auto text-black  mb-4">
                                            <img src="/group.png" alt="Group" className="w-[14px] m-auto h-[16px] object-contain"/>
                                            <span className="ml-2 text-[11px]">All payments secured</span>
                                        </div>
                                    </div>
                                </div>
                        : ""}
                </>
    );
}
