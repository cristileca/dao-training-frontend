import React from "react";
import {QRCodeSVG} from 'qrcode.react';


export default function FormStep2(){
  return (  <>
                <div className="Rectangle-2 w-[60%] flex mt-6 flex-row m-auto">
                    <div className="relative w-[24px] h-[24px]">
                        <img
                            src="/bsc@3x.png"
                            alt="BSC"
                            className="absolute top-0 left-0 w-[16px] h-[16px] object-contain"
                        />
                        <img
                            src="/tgroup.png"
                            alt="TGroup"
                            className="absolute top-3 left-[4px] w-[16px] h-[16px] object-contain"
                        />
                    </div>

                    <div className="relative ">
                        <span>Selected</span>
                        <span></span>
                    </div>
                </div>

                <div className="Rectangle-2 text-center text-black relative m-auto rounded-md mt-3 w-[60%] ">
                      <span className="font-bold text-[14px]">
                          <span className="text-xl font-bold text-style-1">
                              Send 50 USDT
                          </span>
                          <br/>
                          To The Following Address
                      </span>
                    <QRCodeSVG value="https://reactjs.org/" className={"flex center  m-auto my-3"}/>
                    <span className="text-xs font-bold text-style-1 my-6">0x7B4f8C2A9d3E6F1aB92c5E0D4F8aA6E3C1B9D2F7</span>
                    <button className={"w-[50%] h-11 my-3 rounded-lg text-[14px] bg-blue-500 text-white"}>Copy Address</button>
                    <br/>
                    <span className="text-[12px] font-bold text-style-1 my-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </span>
                </div>
              </>
  );
}