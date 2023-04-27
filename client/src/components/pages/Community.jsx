import React, { useEffect, useState } from "react";
import Channels from './Channels'

const Community = () => {
  const [hasChannels, setHasChannels] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showJoinChannel, setShowJoinChannel] = useState(false);

  const handleCreateChannelClick = () => {
    setShowPrompt(false);
    setShowCreateChannel(true);
  };

  const handleJoinChannelClick = () => {
    setShowPrompt(false);
    setShowJoinChannel(true);
  };

  const handleCancel = () => {
    setShowPrompt(true);
    setShowCreateChannel(false);
    setShowJoinChannel(false);
  };

  return (
    <div className="w-full text-white">
      <div className="w-full h-full">
        <div className="absolute w-full  top-[15%] p-4 md:p-8">
          <div>
            {hasChannels ? (
              <Channels/>
            ) : (
              <div>
                {showPrompt ? (
                  <div className="flex justify-center font-Satoshi">
                    <div className="text-center w-1/3 space-y-4">
                      <p className="text-4xl font-semibold">
                        Welcome To Community!
                      </p>
                      <p className="text-lg">
                        Currently, it's quiet in here. You can create a channel
                        to start a conversation or join an existing channel to
                        join the discussion. Have fun chatting!
                      </p>
                      <div className="space-x-20 pt-10">
                        <button
                          className="px-10 py-5 border border-white rounded-xl"
                          onClick={handleCreateChannelClick}
                        >
                          Create Channel
                        </button>
                        <button
                          className="px-10 py-5 border border-white rounded-xl"
                          onClick={handleJoinChannelClick}
                        >
                          Join Channel
                        </button>
                      </div>
                    </div>
                    <div></div>
                  </div>
                ) : (
                  <div></div>
                )}

                {showCreateChannel && 
                     <div className="flex flex-col justify-center">
                     <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                       <div className="relative px-4 py-10 border border-gray-500 mx-8 md:mx-0 shadow rounded-2xl sm:p-10">
                         <div className="max-w-md mx-auto">
                           <div className="flex items-center space-x-5">
                             <div className="block pl-2 font-semibold text-xl self-start text-white">
                               <h2 className="leading-relaxed text-2xl">Create Channel</h2>
                               <p className="text-sm text-white font-normal leading-relaxed">
                               Start a new channel for discussing TV shows and movies with your team or friends and invite others to join.                  </p>
                             </div>
                           </div>
                           <div className="divide-y divide-gray-200">
                             <div className="py-5 text-base leading-6 space-y-4 text-white sm:text-lg sm:leading-7">
                               <div className="flex flex-col">
                                 <label className="leading-loose">Channel Name</label>
                                 <input
                                   type="text"
                                   className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                   placeholder="Channel Name"
                                 />
                               </div>
                               <div className="flex flex-col">
                                 <label className="leading-loose">Description</label>
                                 <textarea
                                   type="text"
                                   className="px-4 py-2 h-20 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                   placeholder="Description"
                                 />
                               </div>
                             </div>
                             <div className="pt-4 flex items-center space-x-4">
                               <button 
                               onClick={handleCancel}
                               className="flex justify-center items-center w-full text-white border border-white px-4 py-3 rounded-md focus:outline-none">
                                 <svg
                                   className="w-6 h-6 mr-3"
                                   fill="none"
                                   stroke="white"
                                   viewBox="0 0 24 24"
                                   xmlns="http://www.w3.org/2000/svg"
                                 >
                                   <path
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                     strokeWidth={2}
                                     d="M6 18L18 6M6 6l12 12"
                                   />
                                 </svg>{" "}
                                 Cancel
                               </button>
                               <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                                 Create
                               </button>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                }

                {showJoinChannel && (
                    <div className="flex flex-col justify-center">
                    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                      <div className="relative px-4 py-10 border border-gray-500 mx-8 md:mx-0 shadow rounded-2xl sm:p-10">
                        <div className="max-w-md mx-auto">
                          <div className="flex items-center space-x-5">
                            <div className="block pl-2 font-semibold text-xl self-start text-white">
                              <h2 className="leading-relaxed text-2xl">Create Channel</h2>
                              <p className="text-sm text-white font-normal leading-relaxed">
                              Connect with others in existing channels and explore new topics.                                                            
                              </p>
                            </div>
                          </div>
                          <div className="divide-y divide-gray-200 ml-2">
                            <div className="py-5 text-base leading-6 space-y-4 text-white sm:text-lg sm:leading-7">
                              <div className="flex flex-col space-y-4">
                                <label className="leading-loose">Channel Link</label>
                                <input
                                  type="text"
                                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                  placeholder="Link"
                                />
                              </div>
                            </div>
                            <div className="pt-4 flex items-center space-x-4">
                              <button 
                              onClick={handleCancel}
                              className="flex justify-center items-center w-full text-white border border-white px-4 py-3 rounded-md focus:outline-none">
                                <svg
                                  className="w-6 h-6 mr-3"
                                  fill="none"
                                  stroke="white"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>{" "}
                                Cancel
                              </button>
                              <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                                Join
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
