"use client";

import { SVGAttributes } from "react";
import { motion } from "framer-motion";

export const PlusSvg = (props: SVGAttributes<SVGElement>) => (
  <svg
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    className="-ml-1 mr-1 h-6 w-6"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const CloseSvg = (props: SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export function LoadingIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      aria-hidden="true"
      role="status"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const ArrowIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    className="-mr-1 ml-2 h-4 w-4"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const ArrowDownSvg = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2 h-3 w-3"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  );
};

export const SearchSvg = (props: SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500 dark:text-gray-400"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  </svg>
);

export const ArrowLongLeftIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
      />
    </svg>
  );
};

export const UserCircleIcon = (props: SVGAttributes<SVGElement>) => {
  // https://heroicons.dev/?iconset=v2-24-solid&search=userCircle
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
};

export const UploadCloudIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    ></path>
  </svg>
);

export const GoogleIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="48px"
    height="48px"
    fill="#FFC107"
    {...props}
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

export const SpeedlineIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="28"
    height="29"
    viewBox="0 0 28 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.17903 27.743C4.44803 27.714 4.71603 27.665 4.98603 27.649C5.77803 27.602 6.57103 27.576 7.36203 27.525C7.94103 27.488 8.51803 27.425 9.09603 27.372C9.55103 27.333 10.006 27.3 10.461 27.267C10.599 27.257 10.627 27.277 10.68 27.407C10.777 27.674 10.967 27.897 11.216 28.034C11.3004 28.0928 11.4044 28.1163 11.5058 28.0995C11.6073 28.0827 11.6982 28.0269 11.759 27.944C11.8514 27.8287 11.9093 27.6897 11.926 27.543C11.939 27.435 11.957 27.328 11.975 27.201C12.113 27.186 12.246 27.167 12.375 27.158C12.71 27.135 13.045 27.115 13.38 27.1C13.656 27.086 13.933 27.08 14.209 27.071C14.293 27.071 14.378 27.079 14.461 27.071C14.697 27.045 14.932 26.998 15.169 26.984C15.625 26.958 16.083 26.95 16.54 26.933C16.591 26.93 16.642 26.923 16.693 26.914C16.782 26.901 16.87 26.878 16.959 26.872C17.217 26.855 17.474 26.838 17.732 26.832C18.015 26.826 18.299 26.832 18.582 26.832C18.75 26.842 18.918 26.828 19.082 26.791C19.238 26.752 19.398 26.73 19.559 26.724C19.629 26.726 19.695 26.75 19.751 26.791C20.017 26.99 20.343 27.091 20.675 27.076C21.082 27.055 21.481 26.956 21.85 26.783C22.095 26.638 22.372 26.553 22.656 26.538C22.956 26.538 23.261 26.52 23.563 26.507C23.748 26.487 23.935 26.48 24.121 26.485C24.37 26.515 24.622 26.492 24.862 26.418C25.062 26.346 25.279 26.329 25.489 26.368C25.774 26.423 26.067 26.413 26.348 26.339C26.386 26.335 26.423 26.332 26.461 26.332C26.71 26.08 26.943 25.812 27.177 25.545H27.027C26.84 25.551 26.654 25.567 26.467 25.582C26.134 25.607 25.801 25.636 25.467 25.66C25.294 25.672 25.121 25.67 24.948 25.683C24.833 25.692 24.72 25.723 24.605 25.73C24.232 25.755 23.859 25.776 23.486 25.793C23.345 25.8 23.204 25.793 23.063 25.793C23.005 25.6732 22.9106 25.5749 22.7933 25.5121C22.676 25.4492 22.5419 25.425 22.41 25.443C21.9974 25.4518 21.5847 25.4273 21.176 25.37C21.1266 25.3703 21.0788 25.3523 21.0418 25.3194C21.0049 25.2865 20.9815 25.2411 20.976 25.192C20.9578 25.084 20.9494 24.9745 20.951 24.865C20.951 24.704 20.98 24.544 20.986 24.383C21.006 23.88 21.056 23.38 21.135 22.883C21.185 22.603 21.213 22.321 21.22 22.038C21.22 21.459 21.27 20.88 21.22 20.301C21.1991 20.1932 21.1874 20.0838 21.185 19.974C21.1924 19.7085 21.127 19.446 20.996 19.215C20.6906 18.5229 20.1373 17.97 19.445 17.665C19.0851 17.5063 18.7305 17.3355 18.382 17.153C17.982 16.942 17.594 16.715 17.205 16.488C16.8352 16.2902 16.4811 16.0642 16.146 15.812C16.0986 15.7795 16.0594 15.7363 16.0317 15.6859C16.0039 15.6356 15.9883 15.5794 15.986 15.522C15.979 15.309 15.955 15.097 15.941 14.885C15.89 14.119 15.841 13.353 15.791 12.585C15.774 12.302 15.771 12.018 15.764 11.734C15.761 11.664 15.765 11.592 15.776 11.522C15.86 11.007 15.94 10.491 16.034 9.97798C16.074 9.75698 16.132 9.53898 16.21 9.32798C16.293 9.13998 16.388 8.95798 16.494 8.78098C16.5095 8.74575 16.5286 8.71223 16.551 8.68098C16.8412 8.28756 17.0895 7.86494 17.292 7.41998C17.543 6.91998 17.769 6.40998 17.981 5.89298C18.157 5.46498 18.341 5.03998 18.524 4.61498C18.5695 4.49362 18.6452 4.38588 18.744 4.30198C19.132 4.01098 19.454 3.64198 19.691 3.21898C19.7058 3.1962 19.7222 3.17448 19.74 3.15398C19.793 3.16298 19.84 3.17298 19.894 3.17898C20.071 3.20098 20.135 3.15898 20.189 2.98498C20.2667 2.75812 20.2667 2.51185 20.189 2.28498C20.108 2.06098 20.028 1.83598 19.94 1.61398C19.9298 1.56233 19.9066 1.51414 19.8725 1.47403C19.8384 1.43392 19.7946 1.40322 19.7452 1.38486C19.6959 1.36651 19.6426 1.36111 19.5906 1.36919C19.5386 1.37726 19.4895 1.39854 19.448 1.43098C19.2348 1.53809 19.0495 1.69356 18.907 1.88498C18.807 2.03998 18.707 2.20398 18.617 2.36398C18.535 2.50298 18.451 2.63998 18.376 2.78198C18.301 2.92398 18.232 3.08198 18.154 3.22998C18.0873 3.3551 18.0163 3.47784 17.941 3.59798C17.824 3.79098 17.715 3.98998 17.58 4.17098C17.388 4.42898 17.172 4.67098 16.973 4.92398C16.695 5.26398 16.48 5.65198 16.338 6.06798C16.238 6.37998 16.144 6.69598 16.031 7.00398C15.981 7.14398 15.907 7.27398 15.815 7.38898C15.691 7.54398 15.538 7.67598 15.401 7.82198C15.237 7.99698 15.078 8.17498 14.924 8.34498C14.893 8.17598 14.861 7.99898 14.824 7.82198C14.7751 7.62853 14.7387 7.43213 14.715 7.23398C14.6874 6.99639 14.6097 6.76735 14.487 6.56198C14.4407 6.47268 14.3752 6.39478 14.2951 6.3339C14.2151 6.27302 14.1225 6.2307 14.024 6.20998C13.8404 6.17123 13.6499 6.18011 13.4707 6.23577C13.2914 6.29143 13.1294 6.39202 13 6.52798C12.716 6.80798 12.552 7.18798 12.543 7.58598C12.5306 7.7343 12.5525 7.8835 12.607 8.02198C12.718 8.29598 12.862 8.55598 12.991 8.82198C13.069 8.98498 13.148 9.14698 13.216 9.31398C13.236 9.36198 13.241 9.44798 13.216 9.47298C13.1913 9.49111 13.163 9.50392 13.1331 9.51063C13.1032 9.51734 13.0722 9.5178 13.042 9.51198C12.9799 9.49342 12.9237 9.45895 12.879 9.41198C12.8102 9.35258 12.7485 9.28547 12.695 9.21198C12.4564 8.88284 12.2573 8.52672 12.102 8.15098C12.0288 7.93545 11.9265 7.73091 11.798 7.54298C11.6746 7.37615 11.6115 7.17236 11.619 6.96498C11.625 6.62822 11.5873 6.29209 11.507 5.96498C11.4068 5.65252 11.344 5.32925 11.32 5.00198C11.3139 4.89252 11.2937 4.7843 11.26 4.67998C11.197 4.45898 11.125 4.23898 11.06 4.01898C11.027 3.91898 10.997 3.81098 10.96 3.70898C10.9414 3.66448 10.9331 3.61631 10.9359 3.56813C10.9386 3.51996 10.9524 3.47305 10.976 3.43098C11.062 3.29498 11.129 3.14698 11.176 2.99298C11.2821 2.59995 11.5183 2.25449 11.846 2.01298C11.8914 1.96689 11.9203 1.90712 11.9282 1.84295C11.9362 1.77877 11.9228 1.71376 11.89 1.65798C11.844 1.58098 11.769 1.55798 11.632 1.61398C11.53 1.65398 11.432 1.70198 11.337 1.75698C11.237 1.81298 11.145 1.87798 11.037 1.94698C11.0239 1.91465 11.0139 1.88118 11.007 1.84698C10.978 1.55198 10.946 1.25698 10.923 0.961984C10.909 0.761984 10.897 0.745984 10.675 0.698984C10.557 0.956984 10.499 1.23898 10.506 1.52298C10.4703 1.46363 10.4427 1.39972 10.424 1.33298C10.364 1.11498 10.311 0.895984 10.247 0.679984C10.225 0.603984 10.212 0.499984 10.101 0.500984C9.99003 0.501984 9.96503 0.600984 9.93103 0.686984C9.92203 0.709984 9.92403 0.737984 9.91703 0.762984C9.89215 0.921924 9.89486 1.08396 9.92503 1.24198C9.93703 1.42898 9.92503 1.61798 9.92503 1.84198C9.89796 1.80146 9.8739 1.75901 9.85303 1.71498C9.77803 1.51498 9.70403 1.31498 9.63303 1.11498C9.58603 0.985984 9.53303 0.864984 9.37103 0.834984C9.33091 0.891045 9.30503 0.956024 9.29562 1.02432C9.28621 1.09261 9.29356 1.16216 9.31703 1.22698C9.37703 1.45798 9.45003 1.68498 9.51703 1.91398C9.55203 2.03098 9.59003 2.14798 9.63703 2.29598C9.47374 2.18092 9.33193 2.03808 9.21803 1.87398C9.11103 1.73698 9.03803 1.72898 8.85503 1.82798C8.85739 1.90134 8.86984 1.97402 8.89203 2.04398C8.96003 2.20998 9.04203 2.36998 9.13903 2.52198C9.30903 2.77198 9.50303 3.00498 9.68103 3.25098C9.83103 3.46198 9.91103 3.71498 9.90903 3.97398C9.90903 4.26398 9.94303 4.55298 9.96603 4.84198C9.99703 5.22698 10.013 5.61498 10.072 5.99698C10.122 6.40698 10.15 6.81798 10.154 7.23098C10.158 7.55398 10.222 7.87398 10.344 8.17298L10.693 8.97298C10.751 9.12298 10.821 9.26898 10.903 9.40798C11.166 9.82947 11.3814 10.2789 11.545 10.748C11.774 11.346 11.89 11.982 11.888 12.622C11.888 12.867 11.868 13.111 11.862 13.355C11.847 13.877 11.835 14.399 11.822 14.921C11.814 15.263 11.822 15.607 11.792 15.947C11.7489 16.3121 11.7432 16.6807 11.775 17.047C11.799 17.265 11.804 17.485 11.84 17.7C11.879 17.934 11.947 18.164 11.996 18.4C12.123 18.98 12.305 19.545 12.54 20.09C12.664 20.39 12.764 20.69 12.859 20.952C12.704 21.176 12.559 21.359 12.443 21.552C12.2364 21.8393 12.0547 22.1437 11.9 22.462C11.833 22.63 11.752 22.791 11.678 22.956C11.496 23.361 11.306 23.763 11.137 24.174C11.0816 24.3109 10.9908 24.4306 10.874 24.521C10.762 24.599 10.661 24.691 10.574 24.796C10.493 24.905 10.374 25.003 10.374 25.159C10.374 25.345 10.374 25.532 10.369 25.719V26.362C10.146 26.381 9.94803 26.403 9.74903 26.414C9.39603 26.433 9.04003 26.425 8.69003 26.467C8.10503 26.537 7.51803 26.542 6.93203 26.554C6.31303 26.567 5.69603 26.59 5.07903 26.642C4.98903 26.65 4.90003 26.67 4.81003 26.674C4.25603 26.695 3.70103 26.714 3.14603 26.732C2.77103 26.744 2.39503 26.757 2.02003 26.761C2.41103 27.129 2.81803 27.479 3.24003 27.812C3.40503 27.796 3.56903 27.78 3.73303 27.766C3.88403 27.763 4.03203 27.761 4.17903 27.743ZM14.925 8.50198H14.947C14.939 8.53598 14.931 8.57098 14.922 8.60198C14.922 8.60198 14.911 8.60898 14.906 8.60798C14.901 8.60698 14.899 8.59998 14.895 8.59698L14.925 8.50198ZM14.792 8.80198L14.836 8.81798L14.756 9.03698L14.713 9.02098L14.792 8.80198ZM12.21 24.974C12.443 24.659 12.721 24.374 12.945 24.055C13.228 23.655 13.564 23.296 13.871 22.915C13.916 22.851 13.958 22.784 13.996 22.715C14.135 22.498 14.278 22.283 14.413 22.064C14.608 21.712 14.713 21.317 14.719 20.915C14.753 20.42 14.77 19.923 14.794 19.427L14.847 18.343C15.008 18.382 15.16 18.406 15.303 18.455C15.766 18.614 16.23 18.772 16.686 18.949C17.203 19.149 17.711 19.371 18.223 19.582C18.342 19.631 18.462 19.682 18.584 19.722C18.67 19.742 18.724 19.826 18.708 19.912C18.699 19.995 18.7 20.079 18.692 20.163C18.639 20.554 18.676 20.953 18.801 21.327C18.906 21.611 19.013 21.894 19.128 22.174C19.219 22.387 19.278 22.614 19.302 22.844C19.334 23.177 19.402 23.507 19.442 23.839C19.464 24.005 19.471 24.173 19.48 24.339C19.489 24.505 19.499 24.686 19.501 24.86C19.501 24.989 19.494 25.118 19.486 25.246C19.473 25.458 19.456 25.669 19.44 25.89C19.04 25.988 18.624 26.017 18.214 25.974H17.85C17.657 25.984 17.464 26.003 17.271 26.014C16.936 26.032 16.602 26.046 16.271 26.063C16.226 26.063 16.181 26.075 16.137 26.079C15.919 26.1 15.702 26.128 15.484 26.139C14.957 26.168 14.429 26.198 13.9 26.21C13.34 26.222 12.779 26.217 12.218 26.21C12.011 26.21 11.952 26.145 11.926 25.938C11.843 25.319 11.833 25.485 12.21 24.974ZM8.24603 11.934C8.98603 11.928 9.72503 11.905 10.465 11.891C10.596 11.888 10.718 11.882 10.865 11.882C11.012 11.882 11.036 11.901 11.059 12.038C11.0783 12.1455 11.0916 12.254 11.099 12.363C11.1018 12.399 11.091 12.4347 11.0688 12.4632C11.0466 12.4917 11.0146 12.5109 10.979 12.517C10.9344 12.5237 10.8891 12.5254 10.844 12.522C10.161 12.52 9.47803 12.523 8.79503 12.514C8.25103 12.506 7.70703 12.482 7.16303 12.468C6.75603 12.458 6.34803 12.468 5.94203 12.44C5.58903 12.416 5.23903 12.452 4.88903 12.423C4.79503 12.414 4.70403 12.423 4.60403 12.423C4.55568 12.4124 4.5087 12.3963 4.46403 12.375C4.50003 12.231 4.52603 12.096 4.56403 11.964C4.57545 11.9331 4.5973 11.9073 4.62579 11.8908C4.65427 11.8744 4.68761 11.8684 4.72003 11.874C4.83003 11.874 4.93903 11.881 5.04903 11.881C5.53703 11.892 6.02503 11.904 6.51303 11.912C7.09003 11.922 7.66803 11.939 8.24603 11.934ZM2.93603 9.09998L2.34403 9.08398C2.08703 9.08398 1.83003 9.07698 1.57303 9.08398C1.52928 9.0914 1.48432 9.08351 1.4457 9.06166C1.40709 9.0398 1.37719 9.00531 1.36103 8.96398C1.35831 8.9518 1.35831 8.93917 1.36103 8.92698C1.51703 8.68798 1.51703 8.68598 1.81703 8.69398C2.45303 8.70898 3.08803 8.73198 3.72403 8.74298C4.10903 8.74898 4.49403 8.73698 4.88003 8.74298C5.23903 8.74898 5.59703 8.76598 5.95603 8.78298C6.23603 8.82098 6.51903 8.83498 6.80103 8.82498C7.09569 8.80056 7.39148 8.79254 7.68703 8.80098C8.20203 8.79098 8.71703 8.81198 9.23303 8.81198H9.38703C9.60803 8.79598 9.70303 8.88998 9.70303 9.12898C9.66425 9.17172 9.61603 9.20481 9.56222 9.22565C9.5084 9.24648 9.45047 9.25447 9.39303 9.24898C8.62203 9.22398 7.85003 9.20798 7.07803 9.18098C6.67503 9.16698 6.26903 9.13498 5.86903 9.14698C5.53803 9.15798 5.20603 9.11598 4.87403 9.10698C4.63403 9.10098 4.39403 9.11398 4.15403 9.11398C3.74803 9.11198 3.34203 9.10598 2.93603 9.09998ZM5.57503 7.20998L3.11803 7.13898L0.763027 7.07498L0.478027 7.06298C0.528027 6.97398 0.550027 6.92798 0.578027 6.88598C0.600703 6.84769 0.63409 6.81687 0.674071 6.79732C0.714053 6.77778 0.758881 6.77036 0.803027 6.77598C1.24003 6.80198 1.67603 6.81898 2.11403 6.83198C2.76103 6.85198 3.41203 6.86298 4.06103 6.88098C4.76103 6.89998 5.46103 6.92198 6.16103 6.94298C6.69403 6.95898 7.22803 6.98198 7.76103 6.98898C8.11803 6.99298 8.46603 6.96798 8.81803 6.96798C8.84172 6.96741 8.86524 6.97214 8.88687 6.98183C8.90849 6.99152 8.92768 7.00592 8.94303 7.02398C8.94882 7.04653 8.94949 7.07009 8.94499 7.09293C8.94049 7.11577 8.93093 7.13732 8.91703 7.15598C8.88653 7.20125 8.84476 7.23779 8.79583 7.26199C8.7469 7.28619 8.69252 7.29721 8.63803 7.29398C8.09303 7.27598 7.54703 7.26898 7.00103 7.25498C6.52603 7.24298 6.05103 7.22498 5.57503 7.20998ZM4.77703 24.272C4.27503 24.252 3.77303 24.235 3.27103 24.22C3.21301 24.2183 3.1569 24.199 3.11024 24.1644C3.06357 24.1299 3.0286 24.082 3.01003 24.027C2.99069 23.9726 2.97565 23.9167 2.96503 23.86L3.24903 23.567L3.28503 23.7L6.22603 23.861L6.28603 23.699C6.27903 23.852 6.30603 24.004 6.36503 24.145C6.42403 24.3 6.38403 24.346 6.22403 24.338C5.74203 24.315 5.26003 24.291 4.77703 24.272ZM10.773 15.443C10.7804 15.4667 10.7897 15.4898 10.801 15.512C10.7677 15.5442 10.7272 15.568 10.6829 15.5814C10.6385 15.5948 10.5916 15.5974 10.546 15.589C9.99403 15.555 9.44103 15.517 8.88803 15.489C8.41203 15.465 7.93703 15.453 7.46103 15.433C7.16703 15.421 6.87303 15.411 6.58103 15.383C6.50403 15.375 6.43203 15.305 6.35403 15.261C6.40303 15.116 6.47403 15.052 6.59503 15.067C7.08103 15.127 7.57103 15.116 8.05903 15.136C8.68303 15.161 9.30703 15.21 9.93003 15.246C10.142 15.258 10.355 15.265 10.567 15.271C10.731 15.277 10.731 15.275 10.773 15.443ZM7.23903 7.88298C7.70103 7.88998 8.16203 7.90498 8.62303 7.91698H9.11203C9.10803 8.08998 9.10403 8.10198 8.97303 8.10198C8.70303 8.10898 8.43203 8.10898 8.16303 8.10198C7.80303 8.09298 7.44203 8.08898 7.08403 8.05898C6.88685 8.0696 6.68931 8.04626 6.50003 7.98998C6.33493 8.02234 6.16512 8.02234 6.00003 7.98998C5.68303 7.98698 5.37703 7.97698 5.04703 7.97098C4.71703 7.96498 4.38703 7.95798 4.05703 7.95798L1.56903 7.91498C1.53265 7.91259 1.49653 7.90724 1.46103 7.89898C1.48003 7.74898 1.49903 7.73398 1.63703 7.73398C1.96503 7.74098 2.29303 7.74898 2.62203 7.75998C3.20003 7.77798 3.77903 7.79898 4.35803 7.81598H4.84103C4.8795 7.81046 4.91856 7.81046 4.95703 7.81598C5.30598 7.86945 5.65954 7.88654 6.01203 7.86698C6.41903 7.89398 6.83003 7.87598 7.23903 7.88298ZM3.79503 20.443C3.53803 20.443 3.28003 20.433 3.02203 20.444C2.97842 20.4513 2.9336 20.4434 2.89516 20.4216C2.85671 20.3997 2.827 20.3652 2.81103 20.324C2.80993 20.3114 2.81164 20.2988 2.81603 20.287C2.97203 20.048 2.97203 20.046 3.27203 20.054C3.90703 20.069 4.54303 20.092 5.17803 20.103C5.56403 20.11 5.94903 20.097 6.33403 20.103C6.69303 20.109 7.05203 20.126 7.41003 20.143C7.69203 20.179 7.97603 20.19 8.26003 20.177C8.55503 20.153 8.85003 20.145 9.14603 20.153C9.66103 20.143 10.176 20.159 10.691 20.164H10.846C11.067 20.148 11.162 20.242 11.162 20.482C11.123 20.5243 11.0747 20.557 11.0209 20.5777C10.9672 20.5983 10.9094 20.6063 10.852 20.601C10.08 20.576 9.30803 20.56 8.53703 20.533C8.13403 20.519 7.73303 20.487 7.32803 20.499C6.99703 20.51 6.66503 20.468 6.33303 20.459C6.09303 20.453 5.85303 20.466 5.61203 20.466C5.20703 20.464 4.80103 20.453 4.39503 20.453L3.79503 20.443ZM7.03103 18.563L4.57503 18.492L2.22003 18.428L1.93403 18.416C1.98403 18.327 2.00603 18.281 2.03403 18.239C2.0567 18.2007 2.09009 18.1699 2.13007 18.1503C2.17005 18.1308 2.21488 18.1234 2.25903 18.129C2.69503 18.155 3.13203 18.172 3.56903 18.185C4.21703 18.205 4.86803 18.216 5.51703 18.234C6.21703 18.253 6.91703 18.275 7.61703 18.296C8.15003 18.312 8.68303 18.335 9.21703 18.342C9.57403 18.346 9.92203 18.321 10.274 18.321C10.322 18.321 10.368 18.341 10.399 18.377C10.4049 18.3996 10.4055 18.4232 10.4008 18.4461C10.3962 18.469 10.3863 18.4905 10.372 18.509C10.3418 18.5543 10.3003 18.5909 10.2515 18.6151C10.2027 18.6394 10.1484 18.6503 10.094 18.647C9.54803 18.629 9.00203 18.622 8.45703 18.608C7.98203 18.596 7.50603 18.578 7.03103 18.563ZM8.69503 19.236C9.15546 19.2443 9.61581 19.2566 10.076 19.273H10.565C10.561 19.446 10.556 19.458 10.425 19.458C10.155 19.46 9.88503 19.46 9.61503 19.453C9.25503 19.444 8.89503 19.44 8.53703 19.41C8.33984 19.4207 8.14229 19.3973 7.95303 19.341C7.78793 19.3733 7.61812 19.3733 7.45303 19.341C7.13503 19.338 6.83003 19.328 6.50003 19.322C6.17003 19.316 5.84003 19.314 5.51003 19.309L3.02203 19.268C2.98531 19.2657 2.94886 19.2603 2.91303 19.252C2.93303 19.102 2.95103 19.087 3.08903 19.087C3.41803 19.094 3.74603 19.102 4.07403 19.113C4.65303 19.131 5.23203 19.152 5.81003 19.169C5.97103 19.174 6.13303 19.169 6.29403 19.169C6.3325 19.1635 6.37156 19.1635 6.41003 19.169C6.76003 19.223 7.11403 19.239 7.46703 19.22C7.87503 19.247 8.28603 19.229 8.69503 19.236ZM2.75003 6.04298C2.68103 6.04298 2.59203 6.07498 2.54303 5.97298C2.56411 5.92915 2.59871 5.89324 2.64174 5.87055C2.68477 5.84787 2.73395 5.83961 2.78203 5.84698C3.23103 5.86498 3.68103 5.88298 4.13103 5.89198C4.77903 5.90398 5.42903 5.90498 6.07903 5.91498C6.63803 5.92398 7.19703 5.94298 7.75603 5.95198C8.07703 5.95898 8.39903 5.95198 8.72003 5.95198C8.78703 5.95698 8.85403 5.96698 8.92003 5.98198C8.90303 6.12698 8.81203 6.13998 8.72003 6.13998C8.35903 6.13798 7.99903 6.12798 7.63803 6.12798L7.21303 6.11998C6.01703 6.09298 4.81903 6.06698 3.61903 6.04298H2.75003ZM7.25103 22.51C7.99003 22.543 8.73003 22.578 9.47003 22.608C9.56768 22.609 9.66278 22.6393 9.74303 22.695C9.71749 22.7347 9.68087 22.7662 9.63769 22.7854C9.59451 22.8045 9.54665 22.8107 9.50003 22.803C9.3583 22.8003 9.21662 22.7956 9.07503 22.789C8.34803 22.749 7.62203 22.707 6.89503 22.669C6.38803 22.642 5.88103 22.62 5.37403 22.595C5.26203 22.589 5.18803 22.543 5.20003 22.484C5.21803 22.393 5.29603 22.384 5.36603 22.384C5.45503 22.386 5.54403 22.41 5.63303 22.41C6.17203 22.446 6.71103 22.482 7.25103 22.51ZM8.43803 11.243C8.75303 11.243 9.06803 11.229 9.37903 11.219C9.72103 11.209 10.074 11.193 10.421 11.18C10.4543 11.1778 10.4877 11.1778 10.521 11.18C10.579 11.185 10.647 11.19 10.647 11.269C10.6487 11.2868 10.6467 11.3048 10.6413 11.3219C10.6358 11.339 10.627 11.3548 10.6154 11.3684C10.6037 11.382 10.5895 11.3931 10.5734 11.4011C10.5574 11.4092 10.5399 11.4139 10.522 11.415C10.485 11.424 10.445 11.415 10.407 11.415C9.67403 11.4493 8.93976 11.4467 8.20703 11.407C7.82103 11.401 7.42103 11.407 7.02103 11.407C7.01503 11.23 7.01803 11.218 7.14803 11.218C7.37303 11.21 7.59803 11.213 7.82303 11.218C8.02803 11.223 8.23303 11.243 8.43803 11.243ZM7.97803 13.652C7.93403 13.806 7.90403 13.834 7.79303 13.824C7.25403 13.8 6.71503 13.773 6.17603 13.754C5.91803 13.745 5.66103 13.751 5.40403 13.745C5.18603 13.74 4.98103 13.719 4.75003 13.719H4.05803C3.98182 13.7126 3.90603 13.7019 3.83103 13.687C3.86003 13.548 3.92803 13.522 4.01203 13.522C4.22303 13.535 4.43303 13.553 4.64403 13.569C4.65603 13.57 4.66903 13.578 4.68103 13.578C4.98903 13.59 5.29703 13.605 5.60503 13.612C5.95103 13.624 6.29803 13.624 6.64403 13.624H7.77803C7.84503 13.628 7.91203 13.637 7.97803 13.652ZM11.11 14.372C11.13 14.455 11.068 14.478 10.984 14.475C10.9 14.472 10.816 14.462 10.732 14.462V14.447L7.64103 14.347C7.53203 14.347 7.42103 14.357 7.31303 14.347C7.28944 14.344 7.26689 14.3355 7.24724 14.3221C7.2276 14.3087 7.21141 14.2909 7.20003 14.27C7.18403 14.202 7.24403 14.161 7.30603 14.161C7.44603 14.155 7.58603 14.154 7.72603 14.161C8.16303 14.183 8.60003 14.21 9.03703 14.236C9.24203 14.248 9.44803 14.266 9.65303 14.277C9.81303 14.286 9.97403 14.294 10.134 14.294C10.417 14.295 10.7 14.289 10.983 14.289C11.028 14.29 11.104 14.336 11.11 14.372ZM7.30403 23.343C7.32887 23.3412 7.3538 23.345 7.37703 23.354C7.40403 23.373 7.44203 23.403 7.44203 23.429C7.44074 23.447 7.43517 23.4645 7.42578 23.48C7.41639 23.4955 7.40345 23.5085 7.38803 23.518C7.3327 23.5349 7.27471 23.5413 7.21703 23.537C6.77403 23.515 6.33103 23.487 5.88803 23.466C5.67603 23.453 5.46403 23.46 5.25103 23.453C5.14603 23.453 5.14603 23.445 5.05103 23.353C5.06584 23.306 5.09825 23.2665 5.14149 23.2428C5.18473 23.2192 5.23544 23.2131 5.28303 23.226C5.70503 23.268 6.12903 23.29 6.55203 23.315C6.80403 23.329 7.05303 23.334 7.30403 23.343Z"
      fill="currentColor"
    />
  </svg>
);

export const EnduranceIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="25"
    height="30"
    viewBox="0 0 25 30"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.349 26.876a2.131 2.131 0 0 0-.291-.757.565.565 0 0 0-.672-.24.974.974 0 0 0-.6.415 5.694 5.694 0 0 1-1.131-1.162 16.072 16.072 0 0 1-.95-1.579c-.021-.042-.047-.081-.067-.123a11.634 11.634 0 0 1-.505-1.051c-.3-.811-.566-1.633-.843-2.452-.1-.288-.185-.578-.27-.869a1.477 1.477 0 0 1 .06-.734c.086-.419.187-.834.26-1.254.063-.352.107-.707.133-1.064.022-.264.016-.53-.016-.793-.072-.547-.173-1.089-.259-1.634-.093-.591-.19-1.181-.273-1.773-.089-.64-.163-1.282-.243-1.922a2.862 2.862 0 0 1-.043-.44c.01-.3.032-.591.065-.884.054-.494.129-.987.181-1.481.044-.41.059-.823.1-1.233.02-.169.001-.34-.057-.5a2.419 2.419 0 0 0-.51-.853c-.5-.522-.99-1.055-1.5-1.571a1.69 1.69 0 0 1-.382-.677 4.474 4.474 0 0 0-.379-.823 1.2 1.2 0 0 0-.611-.488c-.2-.078-.34.041-.316.251a.952.952 0 0 0 .07.215c.066.178.134.355.2.538-.111.032-.211-.079-.291.055.11.216.257.411.434.577.109.13.211.3.419.3.012 0 .027.017.035.029.089.136.184.269.262.41.09.162.158.337.249.5.247.441.5.876.75 1.318a5 5 0 0 1 .289.61.784.784 0 0 1 .02.318c-.022.325-.049.65-.08.975a3.084 3.084 0 0 1-.089.691c-.098.215-.217.42-.357.61l-.187-.228c.044-.106.084-.206.129-.3.116-.223.169-.473.154-.723-.021-.193-.064-.383-.088-.576a1.021 1.021 0 0 0-.213-.486.748.748 0 0 0-.926-.269c-.112.043-.17.1-.145.226.026.08.01.167-.044.232l-.055-.273-.049-.034a.367.367 0 0 1-.035.089 1.417 1.417 0 0 0-.232.888c0 .3.021.592.053.886.003.343.18.661.471.845l-.049.425c-.1.051-.194.107-.294.146-.426.153-.812.4-1.131.72-.142.153-.32.267-.519.331a.9.9 0 0 0-.228.119c-.232.153-.455.32-.668.5a.365.365 0 0 1-.36.091 2.53 2.53 0 0 0-.547-.111 9.771 9.771 0 0 0-1.488.061c-.509.057-1.02.085-1.532.083a1.12 1.12 0 0 1-.57-.1.787.787 0 0 0-.45-.083 4.188 4.188 0 0 1-.533.048.873.873 0 0 0-.544.162c-.214.142-.146.125-.13.318.01.114.1.172.191.217.073.027.143.06.209.1.192.137.424.207.66.2.248-.006.494-.055.741-.081a.622.622 0 0 1 .274-.007c.41.127.84.173 1.267.136.125 0 .25-.026.373-.017.38.028.758.074 1.138.1.301.03.604.042.907.034a4.572 4.572 0 0 0 1.209-.332c.365-.127.735-.236 1.111-.356.163.521.308 1.021.476 1.512.168.491.36.994.553 1.485a.786.786 0 0 1 .01.654c-.111.239-.215.482-.335.716-.2.4-.422.78-.616 1.179-.343.706-.671 1.42-1.008 2.13a2.665 2.665 0 0 0-.23.945 9.1 9.1 0 0 0 .133 1.768c.088.775.122 1.553.194 2.328.005.053 0 .107 0 .178-.16.087-.313.177-.472.256-.362.178-.729.346-1.09.526-.15.075-.31.15-.322.373-.109-.016-.2-.024-.289-.045-.513-.126-1.025-.259-1.539-.383-1.754-.423-3.51-.836-5.262-1.267-.989-.243-1.99-.441-2.963-.75a.283.283 0 0 0-.208.057c-.073.052-.025.129.01.189.081.142.163.283.252.419a.55.55 0 0 0 .372.253c.64.124 1.28.252 1.92.377.557.108 1.116.21 1.672.323.48.1.954.229 1.438.3.484.071.94.231 1.425.29.547.066 1.083.212 1.624.322l2.424.493c.846.173 1.691.348 2.536.523.049.011.122.041.133.077.069.241.271.263.462.285.34.041.682.076 1.023.091.287.012.575-.026.861-.012.5.023.992.069 1.488.105.3.022.6.04.9.068.41.037.82.077 1.229.123.2-.012.398.016.587.081a2.35 2.35 0 0 0 .407 1.694.462.462 0 0 0 .231.181.7.7 0 0 0 .206.016c.231-.114.467-.221.692-.345a.737.737 0 0 0 .09-.12c.09-.206.163-.419.22-.636.063-.213.108-.432.166-.666l1.508.126c.167-.124.338-.244.5-.374l-1.85-.1c-.181-.003-.179-.003-.22-.181zm-6.874-1.51a.831.831 0 0 1-.282.3c-.131.082-.27.153-.4.231-.174.1-.35.2-.519.308a.283.283 0 0 1-.236.064l-2.042-.484c-.019 0-.034-.026-.087-.068.263.025.528-.028.762-.151a.748.748 0 0 1 .2-.046c.3-.078.407-.209.449-.543a1.875 1.875 0 0 0-.09-.754.779.779 0 0 1-.035-.34c.118-.64.246-1.279.378-1.916.08-.301.086-.618.016-.922-.051-.179-.1-.361-.158-.537-.058-.176-.138-.341-.219-.537.611-.66 1.353-1.23 1.956-2.013-.016.312-.024.571-.045.83-.035.426-.08.852-.12 1.277 0 .047.013.1-.009.139-.11.177-.018.337.015.51.084.434.164.871.216 1.31.08.672.13 1.347.2 2.019.023.216.079.428.12.641a.939.939 0 0 1-.07.682zm4.175 1.453a.147.147 0 0 0-.106-.031c-.237.044-.48.039-.716-.015-.5-.023-1.008-.074-1.512-.116-.245-.02-.491-.046-.75-.071.028-.41-.02-.82-.145-1.212a1.453 1.453 0 0 1 .054-.549c.1-.536.192-1.071.3-1.6.093-.37.123-.753.087-1.133a5.928 5.928 0 0 0-.172-.89c-.092-.29-.092-.6 0-.889.042-.13.069-.264.112-.429.075.282.132.539.211.789.219.689.427 1.383.679 2.06.266.739.586 1.456.959 2.147a8.509 8.509 0 0 0 1.082 1.657c.1.108.209.2.306.326a.509.509 0 0 1-.389-.044zm1.818-.631a1 1 0 0 1 .363.8c-.117 0-.216.006-.315 0a.2.2 0 0 1-.117-.058c-.106-.111-.205-.229-.315-.353l.384-.389zm.3 2.255a.587.587 0 0 1-.433.384.252.252 0 0 1-.17-.034.61.61 0 0 1-.29-.408 3.039 3.039 0 0 1-.016-1.1l1.018.08c.035.363-.002.73-.11 1.078h.001zM11.589 6.2a.425.425 0 0 1-.23-.401.459.459 0 0 1 .37-.365.9.9 0 0 1 .378.072c.277.16.486.417.589.72a.243.243 0 0 1-.055.284c-.191-.04-.367-.066-.536-.116a4.332 4.332 0 0 1-.516-.194zm2.362-1.083a4.4 4.4 0 0 1-.221-.728.383.383 0 0 1 .309-.491.5.5 0 0 1 .543.4c.008.054.01.108.02.208.027.078-.025.176-.081.283-.045.107-.08.218-.105.331a.9.9 0 0 1-.054.176.137.137 0 0 1-.233.034.673.673 0 0 1-.178-.213zm-1.423 3.152a.191.191 0 0 1 .141.057.128.128 0 0 1 0 .123.558.558 0 0 0-.075.416c.026.402-.119.595-.506.637a.362.362 0 0 1-.35-.468.857.857 0 0 1 .62-.692c.06-.013.112-.066.17-.073zm-1.041-.41a.361.361 0 0 1-.313-.328.622.622 0 0 1 .333-.578c.244-.127.524-.168.795-.117.039.004.074.043.146.088-.269.18-.473.441-.582.746a.293.293 0 0 1-.379.189zm.302-3.478a.39.39 0 0 1-.165-.626.311.311 0 0 1 .469-.073.605.605 0 0 1 .3.42c.022.127.057.252.086.374-.011.052-.016.099-.03.142-.039.098-.143.131-.2.047a.827.827 0 0 0-.46-.284z"
      fill="currentColor"
      fillRule="nonzero"
      fillOpacity="0.87"
    ></path>
  </svg>
);

const themeTransition = {
  type: "spring",
  stiffness: 200,
  damping: 10,
};

export const MoonIcon = () => {
  const variants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: { scale: 1, rotate: 0, themeTransition },
    whileTap: { scale: 0.95, rotate: 15 },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 50 50"
      key="moon"
      fill="currentColor"
      className="text-gray-900"
    >
      <motion.path
        d="M 43.81 29.354 C 43.688 28.958 43.413 28.626 43.046 28.432 C 42.679 28.238 42.251 28.198 41.854 28.321 C 36.161 29.886 30.067 28.272 25.894 24.096 C 21.722 19.92 20.113 13.824 21.683 8.133 C 21.848 7.582 21.697 6.985 21.29 6.578 C 20.884 6.172 20.287 6.022 19.736 6.187 C 10.659 8.728 4.691 17.389 5.55 26.776 C 6.408 36.163 13.847 43.598 23.235 44.451 C 32.622 45.304 41.28 39.332 43.816 30.253 C 43.902 29.96 43.9 29.647 43.81 29.354 Z"
        fill="currentColor"
        initial="initial"
        animate="animate"
        whileTap="whileTap"
        variants={variants}
      />
    </motion.svg>
  );
};

export const SunIcon = () => {
  const whileTap = { scale: 0.95, rotate: 15 };

  const raysVariants = {
    initial: { rotate: 45 },
    animate: { rotate: 0, themeTransition },
  };

  const coreVariants = {
    initial: { scale: 1.5 },
    animate: { scale: 1, themeTransition },
  };

  return (
    <motion.svg
      key="sun"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileTap={whileTap}
      // Centers the rotation anchor point vertically & horizontally
      style={{ originX: "50%", originY: "50%" }}
    >
      <motion.circle
        cx="11.9998"
        cy="11.9998"
        r="5.75375"
        fill="currentColor"
        initial="initial"
        animate="animate"
        variants={coreVariants}
      />
      <motion.g initial="initial" animate="animate" variants={raysVariants}>
        <circle
          cx="3.08982"
          cy="6.85502"
          r="1.71143"
          transform="rotate(-60 3.08982 6.85502)"
          fill="currentColor"
        />
        <circle
          cx="3.0903"
          cy="17.1436"
          r="1.71143"
          transform="rotate(-120 3.0903 17.1436)"
          fill="currentColor"
        />
        <circle cx="12" cy="22.2881" r="1.71143" fill="currentColor" />
        <circle
          cx="20.9101"
          cy="17.1436"
          r="1.71143"
          transform="rotate(-60 20.9101 17.1436)"
          fill="currentColor"
        />
        <circle
          cx="20.9101"
          cy="6.8555"
          r="1.71143"
          transform="rotate(-120 20.9101 6.8555)"
          fill="currentColor"
        />
        <circle cx="12" cy="1.71143" r="1.71143" fill="currentColor" />
      </motion.g>
    </motion.svg>
  );
};
