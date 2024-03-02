import React, { useEffect, useState } from "react";

const useDebounce = (inputValue: string, delay: number) => {
  const [debouncedInputValue, setDebounceInputValue] =
    useState<string>(inputValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      // delay 시간 이후 inputValue값으로 상태 업데이트
      inputValue && setDebounceInputValue(inputValue);
    }, delay);

    // setTimeout 함수가 반환한 타이머 ID를 제거하지 않으면
    // 이전에 생성된 타이머가 계속되기 때문에 메모리 누수 발생
    return () => clearTimeout(timer);
  }, [inputValue, delay]);

  return debouncedInputValue;
};

export default useDebounce;
