const STORAGE_KEY = 'deskfit_user_data_v1';

const getTodayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const getDefaultStats = () => ({
  date: getTodayKey(),
  breaksCompleted: 0,
  postureChecks: 0,
  waterMl: 0,
  focusMinutes: 0,
  streak: 1,
  lastActiveDate: getTodayKey()
});

export const loadStoredData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        lang: 'en',
        theme: 'dark',
        sound: true,
        stats: getDefaultStats()
      };
    }
    const data = JSON.parse(raw);
    const today = getTodayKey();

    // Check if new day
    if (data.stats?.date !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
      
      const prevStreak = data.stats?.streak || 1;
      const isConsecutive = data.stats?.date === yesterdayKey;
      const newStreak = isConsecutive ? prevStreak + 1 : 1;

      data.stats = {
        ...getDefaultStats(),
        streak: newStreak,
        lastActiveDate: today
      };
    }

    return {
      lang: ['en', 'ru', 'uz'].includes(data.lang) ? data.lang : 'en',
      theme: ['dark', 'light'].includes(data.theme) ? data.theme : 'dark',
      sound: typeof data.sound === 'boolean' ? data.sound : true,
      stats: {
        ...getDefaultStats(),
        ...(data.stats || {})
      }
    };
  } catch (e) {
    console.error("Failed to parse DeskFit localStorage", e);
    return {
      lang: 'en',
      theme: 'dark',
      sound: true,
      stats: getDefaultStats()
    };
  }
};

export const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};

export const calculateErgoScore = (stats) => {
  if (!stats) return 0;
  
  // 1. Breaks: up to 40 pts (4 breaks = full score)
  const breakScore = Math.min(40, (stats.breaksCompleted || 0) * 10);
  
  // 2. Posture resets: up to 25 pts (5 resets = full score)
  const postureScore = Math.min(25, (stats.postureChecks || 0) * 5);
  
  // 3. Hydration: up to 25 pts (2000 ml = full score)
  const waterRatio = Math.min(1, (stats.waterMl || 0) / 2000);
  const waterScore = Math.round(waterRatio * 25);
  
  // 4. Focus engagement: up to 10 pts (>= 25 mins)
  const focusScore = Math.min(10, Math.round(((stats.focusMinutes || 0) / 25) * 10));

  const total = Math.min(100, breakScore + postureScore + waterScore + focusScore);
  return total;
};
