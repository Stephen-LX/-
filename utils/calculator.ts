import { DivinationResult, SixRenType } from '../types';
import { EARTHLY_BRANCHES, SIX_REN_ORDER } from '../constants';

/**
 * Calculates the Earthly Branch index (1-12) based on the hour.
 * Zi (1) is 23:00 - 00:59
 */
export const getZhiIndex = (date: Date): number => {
  const hour = date.getHours();
  // 23:00 - 01:00 is Index 1 (Zi)
  // 01:00 - 03:00 is Index 2 (Chou)
  
  if (hour >= 23 || hour < 1) return 1;
  const index = Math.floor((hour + 1) / 2) + 1;
  return index; // Returns 2 through 12
};

/**
 * Performs the Xiao Liu Ren calculation with Month -> Day -> Hour progression.
 */
export const calculateXiaoLiuRen = (date: Date): DivinationResult => {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate(); // 1-31
  const timeIndex = getZhiIndex(date); // 1-12

  // 1. Month Calculation (Base)
  // Formula: (Month - 1) % 6
  const monthIndex = (month - 1) % 6;
  const monthRen = SIX_REN_ORDER[monthIndex];

  // 2. Day Calculation (Process)
  // Formula: (MonthIndex + Day - 1) % 6
  // Note: We use the index from the previous step as the starting point.
  // Standard algo effectively is (Month + Day - 2) % 6
  const dayIndex = (monthIndex + day - 1) % 6;
  const dayRen = SIX_REN_ORDER[dayIndex];

  // 3. Time Calculation (Result)
  // Formula: (DayIndex + Time - 1) % 6
  // Standard algo effectively is (Month + Day + Time - 3) % 6
  const finalIndex = (dayIndex + timeIndex - 1) % 6;
  const timeRen = SIX_REN_ORDER[finalIndex];

  return {
    date,
    lunarMonth: month,
    lunarDay: day,
    timeZhi: EARTHLY_BRANCHES[timeIndex - 1],
    timeIndex,
    monthRen,
    dayRen,
    timeRen,
    result: timeRen, // The final result is the Time Ren
    resultIndex: finalIndex
  };
};