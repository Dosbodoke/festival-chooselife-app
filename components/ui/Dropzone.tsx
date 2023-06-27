import { UseFormRegisterReturn } from "react-hook-form";
import { UploadCloudIcon } from "@/assets";
import React from "react";
import Image from "next/image";

interface Props {
  id: string;
  label: string;
  registerFunction: UseFormRegisterReturn;
  errorMessage?: string;
  file?: Blob;
}

function Dropzone({ id, label, registerFunction, errorMessage, file }: Props) {
  return (
    <div className="relative flex h-64 w-full items-center justify-center">
      {file ? (
        <Image
          src={URL.createObjectURL(file)}
          alt="Preview"
          fill
          className="rounded-lg object-cover"
        />
      ) : (
        <label
          htmlFor={id}
          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <UploadCloudIcon className="mb-3 h-10 w-10 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{label}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG ou JPG
            </p>
          </div>
          <input {...registerFunction} id={id} type="file" className="hidden" />
        </label>
      )}
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default Dropzone;
