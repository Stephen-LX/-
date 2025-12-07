export enum SixRenType {
  DA_AN = 'Da An',     // 大安
  LIU_LIAN = 'Liu Lian', // 留连
  SU_XI = 'Su Xi',     // 速喜
  CHI_KOU = 'Chi Kou', // 赤口
  XIAO_JI = 'Xiao Ji', // 小吉
  KONG_WANG = 'Kong Wang' // 空亡
}

export interface DivinationResult {
  date: Date;
  lunarMonth: number;
  lunarDay: number; // Simplified to Gregorian index for this app version
  timeZhi: string;  // Earthly branch name
  timeIndex: number; // 1-12
  
  // The Three States
  monthRen: SixRenType; // The state calculated from the Month
  dayRen: SixRenType;   // The state calculated from the Month + Day
  timeRen: SixRenType;  // The final state (Month + Day + Hour)
  
  result: SixRenType; // Alias for timeRen (the final result)
  resultIndex: number; // 0-5
}

export interface GeminiAnalysis {
  sentiment: 'Bullish' | 'Bearish' | 'Neutral' | 'Volatile';
  probability: number; // 0-100
  explanation: string;
  advice: string;
}

export interface HistoryItem {
  id: string;
  divination: DivinationResult;
  analysis: GeminiAnalysis | null;
}