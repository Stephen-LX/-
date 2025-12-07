import { SixRenType } from './types';

export const EARTHLY_BRANCHES = [
  'Zi (Rat)', 'Chou (Ox)', 'Yin (Tiger)', 'Mao (Rabbit)', 
  'Chen (Dragon)', 'Si (Snake)', 'Wu (Horse)', 'Wei (Goat)', 
  'Shen (Monkey)', 'You (Rooster)', 'Xu (Dog)', 'Hai (Pig)'
];

export const SIX_REN_DETAILS: Record<SixRenType, { 
  cn: string; 
  meaning: string; 
  color: string; 
  description: string;
  stockImplication: string;
}> = {
  [SixRenType.DA_AN]: {
    cn: '大安',
    meaning: 'Great Peace',
    color: 'text-amber-400',
    description: 'Everything is stable and peaceful. Things go smoothly.',
    stockImplication: 'Steady accumulation, slow rise, low volatility.'
  },
  [SixRenType.LIU_LIAN]: {
    cn: '留连',
    meaning: 'Delay / Lingering',
    color: 'text-slate-400',
    description: 'Things are dragging on. Progress is slow or halted.',
    stockImplication: 'Sideways movement, stagnation, trapped liquidity.'
  },
  [SixRenType.SU_XI]: {
    cn: '速喜',
    meaning: 'Quick Joy',
    color: 'text-red-500',
    description: 'Good news arrives quickly. Success is immediate.',
    stockImplication: 'Sharp rally, quick profits, positive news breakout.'
  },
  [SixRenType.CHI_KOU]: {
    cn: '赤口',
    meaning: 'Red Mouth',
    color: 'text-rose-700',
    description: 'Disputes, arguments, and conflict.',
    stockImplication: 'Panic selling, volatility, rumors, bearish sentiment.'
  },
  [SixRenType.XIAO_JI]: {
    cn: '小吉',
    meaning: 'Small Luck',
    color: 'text-emerald-400',
    description: 'A small success. Good things are coming.',
    stockImplication: 'Healthy correction, organic growth, buy the dip.'
  },
  [SixRenType.KONG_WANG]: {
    cn: '空亡',
    meaning: 'Void / Emptiness',
    color: 'text-gray-500',
    description: 'Bad luck. Efforts are wasted. Empty results.',
    stockImplication: 'Market crash, low volume, capitulation, bearish.'
  }
};

export const SIX_REN_ORDER = [
  SixRenType.DA_AN,
  SixRenType.LIU_LIAN,
  SixRenType.SU_XI,
  SixRenType.CHI_KOU,
  SixRenType.XIAO_JI,
  SixRenType.KONG_WANG
];