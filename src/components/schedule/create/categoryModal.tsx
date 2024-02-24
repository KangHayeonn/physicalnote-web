import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import ModalForm from "@/components/common/modal/modalForm";
import Button from "@/components/common/button";
import {
  CategoryModalProps,
  CategoryColorResponseType,
} from "@/types/schedule";
import { categorySelector } from "@/recoil/schedule/scheduleState";
import Api from "@/api/schedule";
import { showToast } from "@/utils";

const CategoryModal = ({
  setIsOpen,
  isEdit,
  handleEvent,
}: CategoryModalProps) => {
  const [category, setCategory] = useRecoilState(categorySelector);
  const [name, setName] = useState<string>("");
  const [textCnt, setTextCnt] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<CategoryColorResponseType[]>(
    []
  );
  const [checkList, setCheckList] = useState<boolean[]>([]);

  const getTextCnt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length <= 10) {
      setName(value);
      setTextCnt(value.length);
    }
  };

  const onClickEvent = async () => {
    setCategory({ ...category, name: name });
    updateCategory();
    document.body.style.overflow = "unset";
    setIsOpen(false);
  };

  const onClickClose = () => {
    document.body.style.overflow = "unset";
    setIsOpen(false);
  };

  const onClickDelete = async () => {
    deleteCategory();
    document.body.style.overflow = "unset";
    setIsOpen(false);
  };

  const updateCategory = async () => {
    const params = {
      name: name,
      colorCode: category.colorCode,
    };
    await Api.v1AddCategory(params).then((res) => {
      const { status } = res;
      if (status === 200) {
        showToast("카테고리가 등록되었습니다.");
        handleEvent();
      }
    });
  };

  const deleteCategory = async () => {
    await Api.v1DeleteCategory(category.id).then((res) => {
      const { status } = res;
      if (status === 200) {
        showToast("카테고리가 삭제되었습니다.");
        handleEvent();
      }
    });
  };

  const getCategoryColorList = async () => {
    await Api.v1GetCategoryColor().then((res) => {
      setCategoryList([...res.data]);
      onCheckCategory(category.colorCode);
    });
  };

  const onCheckCategory = (code: string) => {
    setCategory({ ...category, colorCode: code });
  };

  useEffect(() => {
    const check = categoryList.map(
      (item) => item.colorCode === category.colorCode
    );
    setCheckList(check);
  }, [category, categoryList]);

  useEffect(() => {
    getCategoryColorList();
    setName(category.name);
  }, []);

  return (
    <ModalForm onClickEvent={onClickClose}>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="text-[15px]">목록 이름</div>
          <div className="relative">
            <input
              type="text"
              value={name}
              placeholder="목록 이름을 입력하세요."
              className="w-full h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:border-transparent focus:ring-0 text-[16px]"
              onChange={getTextCnt}
              maxLength={10}
            />
            <div className="absolute top-2 right-4 text-[14px] text-[#B9B9C3] font-[400]">
              <span>{textCnt}</span>
              <span>/10</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-[15px]">목록 색상</div>
          <div className="flex space-x-2 px-1 min-h-[35px]">
            {categoryList.length !== 0 && (
              <>
                {categoryList.map((item, idx) => (
                  <div
                    key={`category-color${idx}`}
                    className="w-[35px] h-[35px] rounded-[50%] flex justify-center items-center cursor-pointer"
                    style={{ backgroundColor: `${item.colorCodeValue}` }}
                    onClick={() => onCheckCategory(item.colorCode)}
                  >
                    {checkList[idx] && (
                      <Image
                        src="/icons/checked.svg"
                        width={0}
                        height={0}
                        alt="checked icon"
                        style={{ width: "16px", height: "auto" }}
                      />
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="h-[35px] flex justify-between items-end">
          <div>
            {isEdit && (
              <Button
                text="삭제"
                type="button"
                classnames="text-[12px] h-[30px] px-4 text-[#FF0000] font-[700]"
                onClick={onClickDelete}
              />
            )}
          </div>
          <div className="flex space-x-4">
            <Button
              text="취소"
              type="button"
              classnames="text-[12px] h-[30px] px-4 text-[#8DBE3D] font-[700]"
              onClick={onClickClose}
            />
            <Button
              text="저장"
              type="button"
              classnames="text-[12px] h-[30px] px-4 text-[#8DBE3D] font-[700]"
              onClick={onClickEvent}
            />
          </div>
        </div>
      </div>
    </ModalForm>
  );
};

export default CategoryModal;
