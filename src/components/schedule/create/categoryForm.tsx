import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { categorySelector } from "@/recoil/schedule/scheduleState";
import Button from "@/components/common/button";
import CategoryModal from "@/components/schedule/create/categoryModal";
import { CategoryListType } from "@/types/schedule";
import Api from "@/api/schedule";
import { showToast } from "@/utils";

const CategoryForm = () => {
  const [category, setCategory] = useRecoilState(categorySelector);
  const [isOpenCategoryModal, setIsOpenCategoryModal] =
    useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<CategoryListType[]>([]);
  const [isEditCategory, setIsEditCategory] = useState<boolean>(false);

  const selectCategory = (item: CategoryListType) => {
    if (item.id == category.id) {
      setCategory({
        id: -1,
        name: "",
        colorCode: "",
      });
    } else {
      setCategory(item);
    }
  };

  const editCategory = () => {
    if (category.id === -1) {
      showToast("수정할 카테고리를 선택해주세요.");
      return;
    }
    setIsOpenCategoryModal(true);
    setIsEditCategory(true);
  };

  const addCategory = () => {
    setIsOpenCategoryModal(true);
    setCategory({ id: -1, name: "", colorCode: "" });
  };

  const getCategoryList = async () => {
    await Api.v1GetCategoryList().then((res) => {
      setCategoryList(res.data);
    });
  };

  useEffect(() => {
    if (!isOpenCategoryModal) {
      setIsEditCategory(false);
    }
    getCategoryList();
  }, [isOpenCategoryModal]);

  return (
    <>
      <div className="flex items-center space-x-4 mt-2 mb-6">
        {categoryList.length !== 0 ? (
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2 text-[12px]">
              {categoryList.map((el, idx) => (
                <div
                  key={`category${idx}`}
                  className="flex justify-center items-center min-w-[60px] h-[30px] px-3 py-1 font-[700] rounded-[10px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] cursor-pointer"
                  style={{
                    backgroundColor: `${category.id === el.id ? "#EDFBD5" : "#fff"}`,
                  }}
                  onClick={() => selectCategory(el)}
                >
                  {el.name}
                </div>
              ))}
            </div>
            <Button
              text="수정"
              type="button"
              classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
              onClick={editCategory}
            />
          </div>
        ) : (
          <div className="text-[#B9B9C3] text-[12px]">
            카테고리를 등록하세요.
          </div>
        )}
        <Button
          text="추가"
          type="button"
          classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
          onClick={addCategory}
        />
      </div>
      {isOpenCategoryModal && (
        <CategoryModal
          setIsOpen={setIsOpenCategoryModal}
          isEdit={isEditCategory}
          handleEvent={getCategoryList}
        />
      )}
    </>
  );
};

export default CategoryForm;
