'use client'
 
import { useState, createContext, useContext, useEffect } from 'react'
 
type ThemeStyles = {
  background: string
  text: string
  icon: string
  card: string
}
 
export const ThemeContext = createContext<{
  themeStyles: ThemeStyles
  toggleTheme: () => void
  isDarkMode: boolean
}>({
  themeStyles: {
    background: 'bg-gray-100',
    text: 'text-[#000000]',
    icon: 'text-[#333333]',
    card: 'bg-white'
  },
  toggleTheme: () => {},
  isDarkMode: false
})
export type DarkThemeColors = {
  main_background: string
  text: string
  hover: string
  border: string
  sub_text1: string
  sub_text2: string
  sub_text3: string
  background1: string
  background2: string
  background3: string
  background4:string
  green_text: string
  green_border:string
  svg:string  
}
export const darkTheme: DarkThemeColors = {
  main_background: 'dark:bg-[#202020]',
  text: 'dark:text-white',
  hover: 'dark:hover:bg-zinc-800',
  border: 'dark:border-[#5f5f5f]',
  sub_text1:'dark:text-[#fcfcfc]',
  sub_text2: 'dark:text-[#6b7280]',
  sub_text3: 'dark:text-[#a1a2b6]',
  background1: 'dark:bg-[#3e3e3e]',
  background2: 'dark:bg-[#2c2c2c]',
  background3: 'dark:bg-[#3f3f3f]',
  background4: 'dark:bg-[#1A1A1A]',

  svg:'dark:text-[#6b7280]',
  green_text:'dark:text-primary-600',
  green_border:'dark:text-primary-600'
}
export const getDarkThemeClasses = (componet: keyof DarkThemeColors):string => {
  return darkTheme[componet]
}
 
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
 
  const themeStyles = isDarkMode ? {
    background: 'bg-[#202020]',
    text: 'text-[#00FF00]',
    icon: 'text-[#FFFFFF]',
    card: 'bg-[#202020]'
  } : {
    background: 'bg-gray-100',
    text: 'text-[#000000]',
    icon: 'text-[#333333]',
    card: 'bg-white'
  }
 
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', (!isDarkMode).toString())
  }
 
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') === 'true'
    setIsDarkMode(savedTheme)
  }, [])
 
  return (
    <ThemeContext.Provider value={{ themeStyles, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
 