import React, { useState, useRef } from "react";
import {
  createSession,
  resetSessionState,
} from '../../redux/slices/sessionSlice';
import { ImFolderUpload } from "react-icons/im";
import { resetChat } from '../../redux/slices/chatSlice';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store"; // Adjust path as needed
import { uploadImages } from "../../redux/slices/imageUploadSlice"; // Adjust path if needed
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { setImageData } from "../../redux/slices/imageSlice";
const ImageUploader = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Store uploaded image URLs
  const [dragging, setDragging] = useState(false);
  const [customInput, setCustomInput] = useState(""); // Store user input
   // Redux state selectors
   const { sessionId, status, startedAt, loading: sessionLoading, error: sessionError } = useSelector(
    (state: RootState) => state.session
  );
  // Handle file selection
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadFiles(Array.from(files));
    }
  };

  // Handle drag-and-drop upload
  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files.length > 0) {
      uploadFiles(Array.from(event.dataTransfer.files));
    }
  };

  // Upload files
  const uploadFiles = async (files: File[]) => {
    for (const file of files) {
      try {
        const imageUrl = await dispatch(uploadImages(file)).unwrap(); // Get the actual URL
        setImageUrls((prev) => [...prev, imageUrl]); // Add each uploaded image URL
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  // Remove an image from the list
  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };



 const startAIChat = async () => {
  try {
   await dispatch(createSession()).unwrap();  
    

    dispatch(resetChat());

    if (sessionId) {
      dispatch(setImageData({ images: imageUrls, customQuestion: customInput }));
      router.push(`/AiChat?chatSessionId=${sessionId}`);
    }
  } catch (error) {
    console.error("Error starting AI chat:", error);
  }
};

  return (
    <div>
      <section className="bg-white rounded shadow p-5 my-4">
        <h3 className="text-2xl font-bold">Upload & Pick Images → AI Chat</h3>
        <p className="text-base mb-4 leading-relaxed">
          Upload images, then ask AI about them. Choose an AI avatar/personality for a unique experience.
        </p>

        <div className={`border-dashed w-4/5 mx-auto my-8 border rounded-lg p-6 text-center cursor-pointer transition-all ${
          dragging ? "border-[#418BBB]" : "border-gray-700"
        }`}>
          {/* Hide Drag & Drop if images are uploaded */}
          {imageUrls.length === 0 && (
            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex w-full my-4 justify-center">
              <ImFolderUpload size={40} className="text-gray-600" />
              </div>
              <p className="text-sm text-gray-600">
                {dragging ? "Drop your files here..." : "Drag & Drop your files here, or click to select"}
              </p>
            </div>
          )}
       

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleImageChange}
        />

        {/* Uploaded Files Grid */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative w-24 h-24 rounded-lg border-2 border-[#418BBB] overflow-hidden">
              {/* Uploaded Image */}
              <img
                src={url}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover"
              />

              {/* Checkmark Icon (Centered) */}
              <FaCircleCheck className="absolute inset-0 m-auto text-green-500 text-xl opacity-90" />

              {/* Close Button (Top Right Corner) */}
              <button
                className="absolute top-0 right-0 rounded-full p-0.5 text-[#418BBB] hover:text-[#4080aa]"
                onClick={() => handleRemoveImage(index)}
              >
                <IoMdCloseCircle size={25} />
              </button>
            </div>
          ))}
        </div>
        </div>
        {/* Input Field Below Dropdown */}
        <div className="mt-4 w-full my-4">
        <label className="text-lg font-semibold" > Quick Question (Optional):</label>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter your message..."
            className="w-full p-2 border rounded-lg outline-none bg-gray-200"
          />
        </div>

        {/* Start AI Chat Button */}
        <div className="flex w-full items-center">
          <button
            className="mt-4 py-4 px-8 text-md font-medium bg-[#418BBB] text-white rounded-lg hover:bg-[#4080aa] mx-auto transition-colors"
            onClick={startAIChat}
          >
            Start AI Chat
          </button>
        </div>
      </section>
    </div>
  );
};

export default ImageUploader;
