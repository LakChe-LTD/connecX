import React, { useState } from 'react';
import { Wifi, ChevronDown } from 'lucide-react';

export default function KonnectXSetupGuide() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I reset my hotspot device?",
      answer: "To reset your hotspot device, locate the reset button on the device and hold it for 10 seconds until the LED lights flash."
    },
    {
      question: "What should I do if my device isn't connecting?",
      answer: "Ensure your hotspot device is powered on and within range of your computer or mobile device."
    },
    {
      question: "How can I improve my hotspot's signal strength?",
      answer: "Place your device in an open area away from obstructions and electronic interference for optimal signal strength."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col ">

      {/* Main Content */}
      <div className=" flex-1 flex">
        {/* Left Panel */}
        <div className="flex-1 bg-white p-8 dark:bg-black">
          {/* Step Header */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2 ">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Step 1: Device Connection</h2>
              <span className="text-sm text-gray-500 dark:text-white">Step 1 of 4</span>
                
             
            </div>
          
          {/* Connection Instructions */}
          <div className="mb-8">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-1">
                <Wifi className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1 dark:text-white">Connect Your Device</h3>
                <p className="text-sm text-gray-600 dark:text-white">
                  Next Reward: $100 Bonus
                </p>
                <p className="text-sm text-gray-500 mt-1 dark:text-white">
                  Ensure your hotspot device is powered on and within range of your computer or mobile device.
                </p>
              </div>
            </div>

            {/* Available Devices */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 dark:text-white">Available Devices</h4>
              <div className="space-y-2">
                <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="font-medium text-gray-800 text-sm dark:text-white">Hotspot_Device_323</div>
                  <div className="text-xs text-gray-500 dark:text-white">Signal Strength: Excellent</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="font-medium text-gray-800 text-sm dark:text-white">Hotspot_Device_323</div>
                  <div className="text-xs text-gray-500 dark:text-white">Signal Strength: Excellent</div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button className="bg-black text-white px-6 py-2.5 rounded text-sm font-medium dark:bg-blue-600 dark:text-black hover:bg-gray-800 transition-colors flex items-center gap-2">
            Continue to Network Setup
            <span>→</span>
          </button>

        </div>
           <span>→</span>
            <span>→</span>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left"
                  >
                    <span className="text-sm font-medium text-gray-800 dark:text-white ">{faq.question}</span>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        expandedFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-4 pb-3 text-sm text-gray-600 dark:text-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white dark:bg-[#333436] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 dark:text-white ">Setup Progress</h3>
          
          {/* Progress Steps */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-black flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium  text-black  dark:text-blue-600 ">Device Connection</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-gray-600">2</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-white">Network Configuration</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-gray-600">3</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-white">Security Setup</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-gray-600">4</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-white">Authentication Confirmation</span>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">?</span>
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium dark:text-white">Estimated time: 5 minutes</span>
                <div className="mt-1 dark:text-white">
                  Need help? Contact support at 1-800-123-4567
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-white dark:bg-black border-t border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="text-xs text-white">
          © 2024 Hotspot Setup. All rights reserved.
        </div>
        <button className="bg-black dark:bg-blue-600 text-white px-4 py-1.5 rounded text-xs dark:text-white hover:bg-gray-800 transition-colors">
          Need Help?
        </button>
      </div>
    </div>
  );
}