export const columnData = [
  {
    Header: "선수이름",
    accessor: "name",
  },
  {
    Header: "나이",
    accessor: "age",
  },
  {
    Header: "전화번호",
    accessor: "phone",
  },
  {
    Header: "키(cm)",
    accessor: "height",
  },
  {
    Header: "몸무게(kg)",
    accessor: "weight",
  },
  {
    Header: "포지션",
    accessor: "position",
  },
  {
    Header: "소속",
    accessor: "belongto",
  },
];

export const columnData2 = [
  {
    Header: "선수이름",
    accessor: "name",
  },
  {
    Header: "나이",
    accessor: "age",
  },
  {
    Header: "전화번호",
    accessor: "phone",
  },
  {
    Header: "키(cm)",
    accessor: "height",
  },
  {
    Header: "몸무게(kg)",
    accessor: "weight",
  },
  {
    Header: "포지션",
    accessor: "position",
  },
];

export const playerDetail = {
  userInfo: {
    // 유저 정보
    id: 1, // 유저 ID
    profile: "string", // 유저 프로필
    name: "정하진", // 유저 이름
    height: 180, // 유저 키
    weight: 75, // 유저 몸무게
    positions: [
      // 유저 포지션
      "공격수",
    ],
    leftValue: 6, // 유저 왼발 수치
    rightValue: 4, // 유저 오른발 수치
    importantYn: true, // 유저 중요선수 여부
  },
  unregisteredInfo: [
    // 미등록 알람 정보
    {
      day: "월요일", // 요일
      unregisteredCategory: "WELLNESS", // 미등록 카테고리
      unregisteredDate: "2024-01-22", // 미등록 날짜
    },
    {
      day: "월요일",
      unregisteredCategory: "SPORTS",
      unregisteredDate: "2024-01-22",
    },
    {
      day: "월요일",
      unregisteredCategory: "PHYSICAL",
      unregisteredDate: "2024-01-22",
    },
    {
      day: "화요일",
      unregisteredCategory: "WELLNESS",
      unregisteredDate: "2024-01-23",
    },
    {
      day: "화요일",
      unregisteredCategory: "SPORTS",
      unregisteredDate: "2024-01-23",
    },
    {
      day: "화요일",
      unregisteredCategory: "PHYSICAL",
      unregisteredDate: "2024-01-23",
    },
    {
      day: "수요일",
      unregisteredCategory: "WELLNESS",
      unregisteredDate: "2024-01-24",
    },
    {
      day: "수요일",
      unregisteredCategory: "SPORTS",
      unregisteredDate: "2024-01-24",
    },
    {
      day: "수요일",
      unregisteredCategory: "PHYSICAL",
      unregisteredDate: "2024-01-24",
    },
    {
      day: "목요일",
      unregisteredCategory: "PHYSICAL",
      unregisteredDate: "2024-01-25",
    },
    {
      day: "금요일",
      unregisteredCategory: "WELLNESS",
      unregisteredDate: "2024-01-26",
    },
    {
      day: "금요일",
      unregisteredCategory: "SPORTS",
      unregisteredDate: "2024-01-26",
    },
    {
      day: "토요일",
      unregisteredCategory: "WELLNESS",
      unregisteredDate: "2024-01-27",
    },
    {
      day: "토요일",
      unregisteredCategory: "SPORTS",
      unregisteredDate: "2024-01-27",
    },
    {
      day: "토요일",
      unregisteredCategory: "PHYSICAL",
      unregisteredDate: "2024-01-27",
    },
    {
      day: "일요일",
      unregisteredCategory: "WELLNESS",
      unregisteredDate: "2024-01-28",
    },
    {
      day: "일요일",
      unregisteredCategory: "SPORTS",
      unregisteredDate: "2024-01-28",
    },
    {
      day: "일요일",
      unregisteredCategory: "PHYSICAL",
      unregisteredDate: "2024-01-28",
    },
  ],
  hooperIndexInfo: {
    // 후퍼인덱스 정보
    id: 31, // ID
    sleep: "적정(2단계)", // 수면의 질
    stress: "적정(2단계)", // 스트레스
    fatigue: "적정(2단계)", // 피로
    muscleSoreness: "적정(2단계)", // 근육통
    recordDate: "2024-01-25", // 기록 일자
  },
  intensityInfo: [
    // 운동 강도 정보
    {
      id: 21, // ID
      type: "스포츠", // 운동 타입
      level: 10, // 운동 강도
      recordDate: "2024-01-25", // 기록 일자
    },
    {
      id: 21, // ID
      type: "스포츠", // 운동 타입
      level: 10, // 운동 강도
      recordDate: "2024-01-25", // 기록 일자
    },
  ],
  riskInfo: {
    // 위험 정보
    id: 31, // ID
    injuryLevel: 16, // 부상 위험 수치
    injuryPercent: 57, // 부상 위험 %
    recordDate: "2024-01-25", // 기록 일자
  },
  urineResponseDto: {
    // 소변 검사 정보
    id: 31, // ID
    weight: 40, // 몸무게
    differenceFat: null, // 전날 대비 몸무게 %
    urine: "적정", // 검사 결과
    recordDate: "2024-01-25", // 기록 일자
  },
  feedBackInfo: null, // 오늘의 피드백
  weekIntensityGraph: [
    // 운동 주간 그래프
    {
      id: 21, // ID
      type: "스포츠", // 타입
      level: 10, // 운동 강도
      xvalue: "2024-01-25 목요일", // x 값
    },
    {
      id: 19,
      type: "피지컬",
      level: 7,
      xvalue: "2024-01-26 금요일",
    },
  ],
  weekHooperIndexGraph: {
    // 주간 후퍼인덱스 그래프
    sleepInfo: [
      // 수면의 질 정보
      {
        level: 4, // 수면의 질
        xvalue: "목", // x 값
      },
    ],
    stressInfo: [
      // 스트레스 정보
      {
        level: 4, // 스트레스
        xvalue: "목", // x 값
      },
    ],
    fatigueInfo: [
      // 피로 정보
      {
        level: 4, // 피로
        xvalue: "목", // x 값
      },
    ],
    muscleSorenessInfo: [
      // 근육통 정보
      {
        level: 4, // 근육통
        xvalue: "목", // x 값
      },
    ],
  },
  weekWorkoutTimeGraph: [
    // 운동시간 그래프
    {
      id: 21, // ID
      type: "스포츠", // 타입
      workoutTime: "01:00:00", // 운동 시간
      xvalue: "2024-01-25 목요일", // x 값
    },
    {
      id: 22, // ID
      type: "스포츠", // 타입
      workoutTime: "01:00:00", // 운동 시간
      xvalue: "2024-01-26 금요일", // x 값
    },
    {
      id: 19,
      type: "피지컬",
      workoutTime: "01:00:00",
      xvalue: "2024-01-25 목요일",
    },
    {
      id: 20,
      type: "피지컬",
      workoutTime: "03:00:00",
      xvalue: "2024-01-26 금요일",
    },
  ],
  monthIntensityGraph: [
    // 월간 운동 강도 그래프
    {
      id: null,
      type: null,
      level: 6, // 월 평균 값
      xvalue: "2023-12", // x 값
    },
    {
      id: null,
      type: null,
      level: 6,
      xvalue: "2024-01",
    },
  ],
  monthHooperIndexGraph: {
    // 월간 후퍼인덱스 그래프
    sleepInfo: [
      // 수면의 질 정보
      {
        level: 1, // 월 평균 값
        xvalue: "2023-10", // x 값
      },
      {
        level: 2,
        xvalue: "2023-12",
      },
      {
        level: 4,
        xvalue: "2024-01",
      },
    ],
    stressInfo: [
      // 스트레스 정보
      {
        level: 1,
        xvalue: "2023-10",
      },
      {
        level: 3,
        xvalue: "2023-12",
      },
      {
        level: 7,
        xvalue: "2024-01",
      },
    ],
    fatigueInfo: [
      // 피로 정보
      {
        level: 1,
        xvalue: "2023-10",
      },
      {
        level: 3,
        xvalue: "2023-12",
      },
      {
        level: 3,
        xvalue: "2024-01",
      },
    ],
    muscleSorenessInfo: [
      // 근육통 정보
      {
        level: 1,
        xvalue: "2023-10",
      },
      {
        level: 4,
        xvalue: "2023-12",
      },
      {
        level: 4,
        xvalue: "2024-01",
      },
    ],
  },
  monthWorkoutTimeGraph: [
    // 월별 운동 시간 그래프
    {
      id: null, // ID
      type: "스포츠", // 타입
      workoutTime: "03:23:46", // 운동 시간
      xvalue: "2023-12", // x 값
    },
    {
      id: null,
      type: "스포츠",
      workoutTime: "00:49:07",
      xvalue: "2024-01",
    },
    {
      id: null,
      type: "피지컬",
      workoutTime: "02:52:25",
      xvalue: "2023-12",
    },
    {
      id: null,
      type: "피지컬",
      workoutTime: "00:28:17",
      xvalue: "2024-01",
    },
  ],
  injuryInfo: [
    // 부상 정보
    {
      id: 5, // ID
      injuryType: "CONTACT", // 부상 경위
      distinctionType: "BACK", // 앞, 뒤 구분
      bodyType: "LOWER_BODY", // 상체 하체 구분
      bodyPart: "ARM_LEFT", // 몸 부위 구분
      muscleType: "ADDUCTOR_LONGUS", // 근육 부위 구분
      recordDate: "2024-01-21", // 기록 일자
      injuryLevelType: "HIGH_PAIN", // 고통 정도
      injuryLevelString: "워밍업 후에도 지속, 특정 동작에서 제한 발생", // 고통 텍스트
      comment: "string", // 부상 코멘트
    },
    {
      id: 6,
      injuryType: "NON_CONTACT",
      distinctionType: "FRONT",
      bodyType: "UPPER_BODY",
      bodyPart: "TORSO",
      muscleType: "PECTORALIS_MAJOR",
      recordDate: "2024-01-21",
      injuryLevelType: "MILD_DISCOMFORT",
      injuryLevelString: "주로 뻣뻣함과 뻐근함이 느껴짐",
      comment: null,
    },
    {
      id: 7,
      injuryType: "NON_CONTACT",
      distinctionType: "FRONT",
      bodyType: "UPPER_BODY",
      bodyPart: "TORSO",
      muscleType: "RECTUS_ABDOMINIS",
      recordDate: "2024-01-21",
      injuryLevelType: "INJURED",
      injuryLevelString: "의료 상담 필요",
      comment: "efe",
    },
    {
      id: 8,
      injuryType: "NON_CONTACT",
      distinctionType: "FRONT",
      bodyType: "UPPER_BODY",
      bodyPart: "TORSO",
      muscleType: "TRAPEZIUS",
      recordDate: "2024-01-21",
      injuryLevelType: "MILD_DISCOMFORT",
      injuryLevelString: "주로 뻣뻣함과 뻐근함이 느껴짐",
      comment: "fefee",
    },
    {
      id: 9,
      injuryType: "NON_CONTACT",
      distinctionType: "FRONT",
      bodyType: "UPPER_BODY",
      bodyPart: "TORSO",
      muscleType: "EXTERNAL_OBLIQUE",
      recordDate: "2024-01-21",
      injuryLevelType: "VERY_HIGH_PAIN",
      injuryLevelString: "운동 또는 일상 동작이 어려움",
      comment: "",
    },
    {
      id: 10,
      injuryType: "NON_CONTACT",
      distinctionType: "FRONT",
      bodyType: "UPPER_BODY",
      bodyPart: "ARM_LEFT",
      muscleType: "DELTOID",
      recordDate: "2024-01-22",
      injuryLevelType: "NO_PAIN",
      injuryLevelString: "활동 제약 없음",
      comment: "",
    },
    {
      id: 11,
      injuryType: "NON_CONTACT",
      distinctionType: "FRONT",
      bodyType: "UPPER_BODY",
      bodyPart: "ARM_RIGHT",
      muscleType: "BRACHIALIS",
      recordDate: "2024-01-22",
      injuryLevelType: "MODERATE_PAIN",
      injuryLevelString:
        "활동 가능, 하지만 땀이 나거나 열을 내면 통증 완화 가능",
      comment: "fefe",
    },
    {
      id: 15,
      injuryType: "DISEASE",
      distinctionType: null,
      bodyType: null,
      bodyPart: null,
      muscleType: null,
      recordDate: "2024-01-23",
      injuryLevelType: null,
      injuryLevelString: null,
      comment: "야로나...",
    },
    {
      id: 16,
      injuryType: "DISEASE",
      distinctionType: null,
      bodyType: null,
      bodyPart: null,
      muscleType: null,
      recordDate: "2024-01-21",
      injuryLevelType: null,
      injuryLevelString: null,
      comment: "야로나...",
    },
    {
      id: 17,
      injuryType: "NON_CONTACT",
      distinctionType: "BACK",
      bodyType: "LOWER_BODY",
      bodyPart: "LEG_RIGHT",
      muscleType: "GLUTEUS",
      recordDate: "2024-01-23",
      injuryLevelType: "MILD_DISCOMFORT",
      injuryLevelString: "주로 뻣뻣함과 뻐근함이 느껴짐",
      comment: "",
    },
  ],
};
