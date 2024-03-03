// 부상 체크 Enum
const InjuryMap: Record<string, string> = {
  // 부상 유형
  NON_CONTACT: "비접촉(오버트레이닝)",
  CONTACT: "접촉(타박부상)",
  DISEASE: "질병",

  // 통증 양상
  TINGLING: "찌릿함",
  PRESSURE: "압박감",
  WEAKNESS: "힘이 빠짐",
  NUMBNESS: "저리거나 둔해짐",
  TIGHTNESS: "뭉치거나 올라올 것 같음",
  POSTURE_SENSITIVE: "특정자세에 민감",
  ACHING: "쑤시는",
  STIFF: "타이트",
  SORENESS: "뻐근함",
  SHARP_PAIN: "날카로운 통증",
  RADIATING_PAIN: "통증이 주변으로 확산",

  // 통증 시기
  INTERMITTENT: "간헐적",
  CONSTANT: "일정함",
  REST: "휴식기",
  DURING_EXERCISE: "운동중",

  // 통증 수준/강도
  NO_PAIN: "통증 없음-활동 제약 없음",
  MILD_DISCOMFORT: "가벼운 불편함-주로 뻣뻣함과 뻐근함이 느껴짐",
  MODERATE_PAIN:
    "보통 통증-활동 가능, 하지만 땀이 나거나 열을 내면 통증 완화 가능",
  HIGH_PAIN: "높은 통증-워밍업 후에도 지속, 특정 동작에서 제한 발생",
  VERY_HIGH_PAIN: "매우 높은 통증-운동 또는 일상 동작이 어려움",
  INJURED: "부상 상태-의료 상담 필요",
};

const InjuryLevelMap: Record<string, string> = {
  NO_PAIN: "0단계",
  MILD_DISCOMFORT: "1단계",
  MODERATE_PAIN: "2단계",
  HIGH_PAIN: "3단계",
  VERY_HIGH_PAIN: "4단계",
  INJURED: "5단계",
};

const InjuryLevelColorMap: Record<string, string> = {
  NO_PAIN: "#8DBE3D",
  MILD_DISCOMFORT: "#B7D487",
  MODERATE_PAIN: "#FBDD73",
  HIGH_PAIN: "#FFC808",
  VERY_HIGH_PAIN: "#F27C21",
  INJURED: "#FF0000",
};

// 근육 타입
const MuscleMap: Record<string, string> = {
  TRAPEZIUS: "승모근",
  INFRASPINATUS: "오훼완근",
  TRICEPS: "삼두근",
  RECTUS_ABDOMINIS: "복직근",
  EXTERNAL_OBLIQUE: "외복사근",
  ILIACUS: "장골근",
  GLUTEUS: "둔근",
  TENSOR_FASCIAE_LATAE: "대퇴근막장근",
  PSOAS_MAJOR: "대요근",
  TERES_MAJOR: "봉공근",
  RECTUS_FEMORIS: "대퇴이두근",
  SOLEUS: "박근",
  MEDIAL_GASTROCNEMIUS: "내측광근",
  LATERAL_GASTROCNEMIUS: "외측광근",
  PERONEUS_LONGUS: "중간광근",
  ILIOTIBIAL_BAND: "장경인대",
  TIBIALIS_ANTERIOR: "전경골근",
  EXTENSOR_DIGITORUM_LONGUS: "장지신근",
  SARTORIUS: "가자미근",
  EXTENSOR_DIGITORUM_BREVIS: "장모지신근",
  DELTOID: "삼각근",
  PECTORALIS_MAJOR: "대흉근",
  LATISSIMUS_DORSI: "광배근",
  BICEPS: "이두근",
  BRACHIALIS: "상완근",
  PRONATOR_TERES: "원회내근",
  BRACHIORADIALIS: "완요골근",
  SERRATUS_ANTERIOR: "장장근",
  PUBICUS: "치골근",
  ADDUCTOR_LONGUS: "장내전근",
  ADDUCTOR_MAGNUS: "대내전근",
  GRACILIS: "비복근",
  PERONEUS_BREVIS: "장비골근",
  FLEXOR_CARPI_RADIALIS: "주근",
  PALMARIS_LONGUS: "척측수근신근",
  EXTENSOR_CARPI_ULNARIS: "충지신근",
  SUPINATOR: "요측수근신근",
  OBLIQUE: "소원근",
  QUADRATUS_LUMBORUM: "대원근",
  SEMITENDINOSUS: "척추기립근",
  BICEPS_FEMORIS: "반건반막양근",
  SEMIMEMBRANOSUS: "장경인대",
  LARGE_RETIREMENT: "대퇴직근",
};

export const formatInjuryType = (type: string): string => {
  return InjuryMap[type] || "-";
};

export const formatInjuryLevel = (type: string): string => {
  return InjuryLevelMap[type] || "0단계";
};

export const formatInjuryColor = (type: string): string => {
  return InjuryLevelColorMap[type] || "#8DBE3D";
};

export const formatMuscleName = (type: string): string => {
  return MuscleMap[type] || "-";
};
