"use client";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Parameter {
  imageUrl: string;
  userId: string;
}

const PhotoProfile: FC<Parameter> = ({ imageUrl, userId }) => {
  const [hover, setHover] = useState(false);
  const [photo, setPhoto] = useState<File | any>(null);
  const [preview, setPreview] = useState<any>();
  const dispatch = useDispatch();
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPreview(objectUrl);
    }
  }, [photo]);

  const handlePost = async () => {
    setDisabled(true);
    try {
      const data = new FormData();
      data.set("photo", photo);
      if (userId !== "") {
        const response = await axios.post("/api/user/" + userId, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status == 200) {
          dispatch(
            setToastState({
              isShown: true,
              message: response.data.message,
              type: "success",
            })
          );
          setPhoto(null);
        }
        router.refresh();
      }
      setDisabled(false);
    } catch (error: any) {
      dispatch(
        setToastState({
          isShown: true,
          message: error.message,
          type: "error",
        })
      );
      setDisabled(false);
    }
  };
  return (
    <div className="text-center  lg:w-1/2 w-full  justify-center">
      <label
        htmlFor="photo"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative w-[250px] mx-auto ">
          <div
            className={`absolute inset-0 bg-black opacity-30  mx-auto h-full w-full rounded-full ${
              hover ? "" : "hidden"
            }`}
          ></div>
          <p
            className={`text-white flex items-center justify-center absolute inset-0 ${
              hover ? "" : "hidden"
            }`}
          >
            Upload your photo
          </p>
          <img
            className=" object-contain h-[250px] w-[250px] rounded-full"
            src={
              photo
                ? preview
                : `https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${imageUrl}`
            }
            alt="Photo profile user"
          />
          <input
            type="file"
            id="photo"
            className="hidden"
            onChange={(e) => setPhoto(e.target.files?.[0])}
          />
        </div>
      </label>
      <button
        onClick={handlePost}
        disabled={disabled}
        className="btn btn-primary text-white mt-5"
      >
        Update Photo
      </button>
    </div>
  );
};

export default PhotoProfile;
