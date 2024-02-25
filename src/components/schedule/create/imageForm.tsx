import React, { useState, useEffect } from "react";
import Image from "next/image";
import { showToast } from "@/utils";
import { useSetRecoilState } from "recoil";
import { imageFilesSelector } from "@/recoil/schedule/scheduleState";

const ImageForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);
  const setImageFiles = useSetRecoilState(imageFilesSelector);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (previewURLs.length === 3) {
      showToast("이미지 첨부는 3장까지 가능합니다.");
      return;
    }

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const reader = new FileReader();

      if (!imageFileValid(uploadFile)) return;

      reader.onload = (e) => {
        setFiles([...files, uploadFile]);
        setPreviewURLs([...previewURLs, reader.result as string]);
      };

      if (uploadFile) {
        reader.readAsDataURL(uploadFile);
      }
    }
  };

  const imageFileValid = (file: File): boolean => {
    // image extension check
    const lastIndex = file?.name.lastIndexOf(".");
    if (lastIndex < 0) return false;

    const fileType =
      file?.name.substring(lastIndex + 1).toLowerCase() || undefined;
    const ALLOW_FILE_EXTENSION = "jpg,jpeg,png,svg";

    if (!fileType || !ALLOW_FILE_EXTENSION.includes(fileType)) {
      alert(
        `업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`
      );
      return false;
    }

    // image capacity check
    const imgSize = file.size;
    const ALLOW_MAX_SIZE = 2 * 1024 * 1024; // 2MB
    if (imgSize > ALLOW_MAX_SIZE) {
      alert("이미지 용량은 5MB 이내로 등록 가능합니다.");
      return false;
    }

    return true;
  };

  const deleteImage = (target: string, idx: number) => {
    const tempImageURLs = previewURLs.filter((url) => url !== target);
    setFiles(files.splice(idx, 1));
    setPreviewURLs(tempImageURLs);
  };

  useEffect(() => {
    setImageFiles(files);
  }, [files]);

  // form data 만들기
  /*
  const createFormData = (data: ClubFormType, image: File | null) => {
    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    }

    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    return formData;
  };*/

  return (
    <div>
      <div className="flex items-center space-x-4 py-4">
        <span className="font-[700] text-[15px]">이미지첨부</span>
        <div className="flex items-center space-x-5">
          <div className="text-[12px]">0/3</div>
          <label htmlFor="imageUpload">
            <div className="text-[12px] h-[25px] text-[#8DBE3D] font-[700] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] cursor-pointer rounded-[5px] py-1 px-3 hover:bg-[#C6E19B] hover:text-[#fff]">
              추가
            </div>
          </label>
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        {previewURLs.length !== 0 &&
          previewURLs.map((previewURL, idx) => (
            <div key={`image${idx}`}>
              {previewURL && (
                <div className="relative">
                  <Image
                    src={previewURL as string}
                    alt="previewImage"
                    width={0}
                    height={0}
                    style={{
                      width: "149px",
                      height: "107px",
                      border: "1px solid red",
                    }}
                  />
                  <Image
                    src="/icons/delete_image.svg"
                    width={0}
                    height={0}
                    alt="delete image icon"
                    style={{
                      width: "22px",
                      height: "auto",
                      position: "absolute",
                      top: "-7px",
                      right: "-7px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteImage(previewURL, idx)}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
      <div>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={addImage}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageForm;
