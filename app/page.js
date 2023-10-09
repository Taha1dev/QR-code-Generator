'use client';
import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { FaDownload } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    if (!url) {
      setIsGenerated(false);
    }
    if (isLoading || isGenerated) {
      setIsError(null);
    }
    if (isLoading) {
      setIsGenerated(false);
    }
  }, [url, isLoading, isGenerated]);

  // Function to handle QR code generation
  const handleGenerate = () => {
    if (!url) {
      setIsError('Please add a valid URL');
      return;
    }

    // Regular expression pattern to match URL format
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlPattern.test(url)) {
      setIsError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsGenerated(true);
      setIsLoading(false);
    }, 2000);
  };

  // Function to handle QR code download
  const handleDownload = () => {
    const canvas = document.getElementById('qrcode');
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = 'qrcode.png';
    downloadLink.click();
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex justify-center items-center">
      <div className="bg-white p-12 rounded-lg flex justify-center flex-col shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        {isLoading && (
          <div className="text-3xl font-bold text-gray-800">
            Generating QR Code...
          </div>
        )}
        {isGenerated && (
          <div className="flex justify-center items-center flex-col">
            <QRCodeCanvas
              id="qrcode"
              value={url}
              size={200}
              bgColor="#fff"
              fgColor="#000"
              level="L"
              includeMargin={false}
            />
            <div className="flex justify-evenly items-baseline">
              <p className="bg-slate-200 p-1 rounded-md text-gray-800">
                Download QR as an Image?
              </p>
              <button
                className="mt-4 p-2 text-main rounded-full"
                onClick={handleDownload}
              >
                <FaDownload size={20} />
              </button>
            </div>
          </div>
        )}
        {!isGenerated && !isLoading && (
          <div className="text-2xl px-6 h-32 font-bold w-full flex justify-center items-center">
            Add URL to generate 😙🌚
          </div>
        )}
        <div className="mt-8 flex justify-between flex-col">
          <div className="mb-4">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="p-4 bg-gray-200 rounded-md w-full focus:outline-none"
              placeholder="Add a URL"
              type="text"
            />
          </div>
          <button
            className="p-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleGenerate}
          >
            {isLoading ? 'Generating...' : 'Generate QR Code'}
          </button>
          {isError && <span className="text-red-600">{isError}</span>}
        </div>
        <span className="flex justify-center items-center mt-5">
          Made with 💚 by&nbsp;
          <Link
            prefetch
            target="_blank"
            className="font-bold"
            href={'https://tahamulla.vercel.app'}
          >
            Taha
          </Link>
        </span>
      </div>
    </div>
  );
}
