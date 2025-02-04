let storedProvider: string | undefined;

export const setCurrentProvider = (provider: string) => {
  if (provider && !storedProvider) {
    const providers = provider.split(','); 
    storedProvider = providers[0].trim();
    console.log('Theme.tsx - New Provider Stored:', storedProvider);
  }
};

export const getCurrentProvider = () => {
  return storedProvider;
};

export type DarkThemeColors = {
    background: string
    text: string
    hover: string
    border: string
}

// // Function to determine background color based on provider
// const getProviderBackground = (provider?: string): string => {
//   if (!provider) return 'bg-zinc-800'; // Default dark theme
  
//   if (provider.includes('nvidia')) {
//     return 'bg-green-800';
//   }
  
//   if (provider.includes('openai')) {
//     return 'bg-black';
//   }
  
//   return 'bg-zinc-800'; // Fallback dark theme
// };

// export const getDarkTheme = (): DarkThemeColors => ({
//     background: `dark:${getProviderBackground(storedProvider)}`,
//     text: 'dark:text-white',
//     hover: 'dark:hover:bg-zinc-800',
//     border: 'dark:border-zinc-700'
// });

export const getDarkTheme = (): DarkThemeColors => ({
  // background: `dark:${getProviderBackground(storedProvider)}`,
  background: 'dark:bg-[#220020]',
  text: 'dark:text-white',
  hover: 'dark:hover:bg-zinc-800',
  border: 'dark:border-zinc-700'
});

export const getDarkThemeClasses = (componet: keyof DarkThemeColors): string => {
    const currentTheme = getDarkTheme();
    console.log('Current Provider in Theme:', storedProvider);
    return currentTheme[componet];
}
