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
  main_background: string;
  text: string;
  hover: string;
  grouphover:string;
  border: string;
  border1:string;
  sub_text1: string;
  sub_text2: string;
  sub_text3: string;
  background1: string;
  background2: string;
  background3: string;
  background4: string;
  green_text: string;
  green_border: string;
  svg: string;
  shadow:string;
  lab_activatedbutton:string;
  hover1:string;
  hover2:string;
  hover3:string;
  hover4:string;
  placeholder:string;
  sub_text4:string;
  border2:string;
  border3:string;
  borderhover:string;
  borderhover2:string;
  shadow1:string;
  sub_text5:string;
  focus:string;
  borderfocus: string;
  sub_text6: string
  sub_text7: string;
  sub_text8: string;
  sub_text9:string;
  texthover: string;
  borderhover1:string;
  hovershadow:string;
  groupBorderHover:string;
  ring:string;
  border4:string;
  shadow2:string;
  placeholder1:string;
  caret:string;
  focus1:string;
  background5: string
  hover5: string
  divide: string
  hover6: string
  hovershadow1: string
  hovershadow2: string
  borderhover3: string
  focusring: string
  hovertransparent: string
  hover7: string
  background6:string
  appcardBorder:string
  outline:string
  focusoutline:string
  borderradius:string
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
  main_background: 'dark:!bg-[#202020]',
  text: 'dark:text-white',
  hover: 'dark:hover:!bg-zinc-800',
  grouphover:'dark:group-hover:!bg-zinc-800',
  border: 'dark:!border-[#5f5f5f]',
  border1:'dark:!border-[#202020]',
  border4:'dark:border-[#3e3e3e]',
  sub_text1: 'dark:text-[#fcfcfc]',
  sub_text2: 'dark:text-[#6b7280]',
  sub_text3: 'dark:text-[#a1a2b6]',
  background1: 'dark:!bg-[#3e3e3e]',
  background2: 'dark:!bg-[#2c2c2c]',
  background3: 'dark:!bg-[#3f3f3f]',
  background4: 'dark:bg-[#1A1A1A]',
  background6: 'dark:bg-[#5f5f5f]',
  svg: 'dark:text-[#6b7280]',
  green_text: 'dark:text-primary-600',
  green_border: 'dark:text-primary-600',
  shadow:'dark:shadow-[#5f5f5f]',
  lab_activatedbutton:'dark:bg-zinc-600',
  hover1:'dark:hover:bg-[#3f3f3f]',
  hover2:'dark:hover:bg-gray-800',
  hover3:'dark:hover:bg-zinc-700',
  hover4: 'dark:hover:bg-[#E35B5B]',
  placeholder:'dark:placeholder:text-white',
  placeholder1:'dark:placeholder:text-[#FCFCFC]',
  caret:'dark:caret-primary-600',
  sub_text4:'dark:text-[#E1E1E1]',
  border2:'dark:border-slate-400',
  border3:'dark:border-primary-400',
  borderhover:'dark:hover:!border-[#5F5F5F]',
  borderhover2:'dark:hover:border-primary-400',
  shadow1:'dark:shadow-slate-700',
  shadow2:'dark:shadow-[#3e3e3e]',
  sub_text5:'dark:text-[#F5F5F5]',
  focus:' dark:focus:bg-[#3f3f3f]',
  focus1:'dark:focus:bg-[#3e3e3e]',
  borderfocus: 'dark:focus:border-[#5F5F5F]',
  sub_text6: 'dark:text-gray-200',
  sub_text7: 'dark:text-gray-400',
  sub_text8: 'dark:text-slate-400',
  sub_text9:'dark:text-[#3f3f3f]',
  texthover: 'dark:hover:text-[#b7e724]',
  borderhover1:'dark:hover:border-[#B2CCFF]',
  hovershadow:'dark:hover:bg-transparent dark:hover:shadow-[#5F5F5F]',
  groupBorderHover:'dark:group-hover:border-gray-700',
  ring:'dark:ring-primary-500',
  background5: 'dark:bg-[#a1a6b2]',
  hover5:'dark:hover:bg-[#b8b8b8]',
  divide:'dark:divide-[#5f5f5f]',
  hover6:'dark:hover-!bg-[#202020]',
  hovershadow1:'dark:hover:shadow-[#3f3f3f]',
  hovershadow2:'dark:hover:shadow-[#2e2e2e]',
  borderhover3:'dark:hover:border-[#4CAF50] dark:hover:shadow-none',
  focusring:'dark:focus:ring-[#5F5F5F]',
  hovertransparent:'dark:hover:bg-transparent',
  hover7:'dark:hover:bg-[#2E2E2E]',
  appcardBorder:'dark:border-[#3f3f3f] dark:border-2',
  outline:'dark:hover:outline-[#5f5f5f]',
  focusoutline:'dark:focus:outline-none',
  borderradius:'dark:border-2'

});
 
export const getDarkThemeClasses = (componet: keyof DarkThemeColors): string => {
    const currentTheme = getDarkTheme();
    console.log('Current Provider in Theme:', storedProvider);
    return currentTheme[componet];
}