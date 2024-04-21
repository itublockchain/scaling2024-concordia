"use client";
import { useRef } from "react";

interface ImageUploadComponentProps {
  returnImage?: (file: any) => void;
  deleteImageCallback?: () => void;
}

export function SingleImageUpload(props: ImageUploadComponentProps) {
  let deleted = false;

  const dropzone = useRef<Element>(null);

  const preview = useRef<HTMLImageElement>(null);

  const input = useRef<Element>(null);

  const textzone = useRef<Element>();

  const displayPreview = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      props.returnImage(reader.result);
      let data = preview.current;
      preview.current!.src = reader.result.toString();
      preview.current!.classList.remove("hidden");
      textzone.current!.classList.add("hidden");
    };
    deleted = false;
  };

  const onDragOverF = (e: any) => {
    e.preventDefault();

    dropzone.current!.classList.add("border-indigo-600");
  };

  const onDragLeaveF = (e: any) => {
    e.preventDefault();

    dropzone.current!.classList.remove("border-indigo-600");
  };

  const onDropF = (e: any) => {
    e.preventDefault();

    dropzone.current!.classList.remove("border-indigo-600");
    const file = e.dataTransfer.files[0];
    displayPreview(file);
  };

  const onDeleteF = () => {
    if (!deleted) {
      preview.current!.classList.add("hidden");
      textzone.current!.classList.remove("hidden");
      deleted = true;
      props?.returnImage("");
      if (props.deleteImageCallback != undefined) {
        props.deleteImageCallback();
      }
    }
  };

  const onInputChangeF = (e: any) => {
    const file = e.target.files[0];
    displayPreview(file);
  };

  return (
    <div
      className="w-full aspect-square relative border-2 border-gray-300 border-dashed rounded-xl"
      ref={dropzone}
      onDragOver={(event) => onDragOverF(event)}
      onDragLeave={(event) => onDragLeaveF(event)}
      onDrop={(event) => onDropF(event)}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 z-50"
        onInput={(event) => onInputChangeF(event)}
      />
      <div className="text-center" ref={textzone}>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          <label className="relative cursor-pointer">
            <span>Drag and drop</span>
            <span className="text-indigo-600"> or browse</span>
            <span>to upload</span>
            <input
              ref={input}
              name="file-upload"
              type="file"
              className="sr-only"
            />
          </label>
        </h3>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        <img
          width="100"
          height="100"
          src="https://www.svgrepo.com/show/357902/image-upload.svg"
          className="w-3/4 mt-4 mx-auto object-cover object-center rounded-xl"
        />
      </div>

      <img
        width="100"
        height="100"
        src="https://www.svgrepo.com/show/357902/image-upload.svg"
        className="w-full h-full hidden object-cover overflow-hidden object-center rounded-xl"
        ref={preview}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 absolute top-2 right-2 cursor-pointer z-50 hover:bg-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        onClick={onDeleteF}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
