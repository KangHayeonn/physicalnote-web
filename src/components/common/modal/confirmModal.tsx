import React from "react";
import ModalForm from "./modalForm";
import Button from "@/components/common/button";
import { ConfirmModalProps } from "@/types/common";

const ConfirmModal = ({ setIsOpen, handleSubmit, text }: ConfirmModalProps) => {
  const onClickEvent = () => {
    handleSubmit();
    document.body.style.overflow = "unset";
    setIsOpen(false);
  };

  const onClickClose = () => {
    document.body.style.overflow = "unset";
    setIsOpen(false);
  };

  return (
    <ModalForm onClickEvent={onClickClose}>
      <div className="flex flex-col items-center space-y-10">
        <div className="h-[50px] flex items-center font-[700] text-[17px]">
          {text}
        </div>
        <div className="flex space-x-20">
          <Button
            text="네"
            type="button"
            classnames="text-[14px] w-[70px] h-[32px] text-[#8DBE3D] font-[700]"
            onClick={onClickEvent}
          />
          <Button
            text="아니오"
            type="button"
            classnames="text-[14px] w-[70px] h-[32px] text-[#8DBE3D] font-[700]"
            onClick={onClickClose}
          />
        </div>
      </div>
    </ModalForm>
  );
};

export default ConfirmModal;
