'use client'
import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import Script from 'next/script'
import Loading from '../components/base/loading'
import Forms from './forms'
import Header from './_header'

import style from './page.module.css'
import UserSSOForm from './userSSOForm'
import { IS_CE_EDITION } from '@/config'

import type { SystemFeatures } from '@/types/feature'
import { defaultSystemFeatures } from '@/types/feature'
import { getSystemFeatures } from '@/service/common'

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [systemFeatures, setSystemFeatures] = useState<SystemFeatures>(defaultSystemFeatures)

  useEffect(() => {
    getSystemFeatures().then((res) => {
      setSystemFeatures(res)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <>
      {!IS_CE_EDITION && (
        <>
          <Script strategy="beforeInteractive" async src={'https://www.googletagmanager.com/gtag/js?id=AW-11217955271'}></Script>
          <Script
            id="ga-monitor-register"
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer2 = window.dataLayer2 || [];
function gtag(){dataLayer2.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-11217955271"');
        `,
            }}
          >
          </Script>
        </>
      )}
      <div  className={cn(
        style.background,
        // 'flex w-full min-h-screen',
        // 'sm:p-4 lg:p-8',
        // 'gap-x-20',
        // 'justify-center lg:justify-start',
 
        // 'flex flex-col items-center justify-center min-h-screen',
        //         'p-4 lg:p-8',
        'flex flex-col items-center justify-center min-h-screen',
                'p-4 lg:p-8',
                'overflow-hidden',
      )}
>
        <div className={
          cn(
            // 'flex w-full flex-col bg-white shadow rounded-2xl shrink-0',
            // 'space-between',

            // 'flex flex-col bg-white shadow rounded-2xl',
            // 'w-full max-w-xl',
            // 'p-6',
            // 'space-y-6',
            'flex flex-col bg-white dark:bg-[#333333] shadow rounded-2xl',
            'w-full max-w-xl',
            'p-6',
            'space-y-6',
            'overflow-y-auto',
            'max-h-[90vh]',
          )
        }>
          <Header />

          {loading && (
            <div className={
              cn(
                // 'flex flex-col items-center w-full grow justify-center',
                // 'px-6',
                // 'md:px-[108px]',

                // 'flex items-center justify-center'

                'flex flex-col items-center bg-white rounded-2xl',
                'p-6 space-y-6',
              )
            }>
              <Loading type='area' />
            </div>
          )}

          {!loading && !systemFeatures.sso_enforced_for_signin && (
            <>
              <Forms />
              {/* <div className='px-8 py-6 text-sm font-normal text-gray-500'>
                © {new Date().getFullYear()} LangGenius, Inc. All rights reserved.
              </div> */}
            </>
          )}

          {!loading && systemFeatures.sso_enforced_for_signin && (
            <UserSSOForm protocol={systemFeatures.sso_enforced_for_signin_protocol} />
          )}
        </div>

      </div>

    </>
  )
}

export default SignIn


// code with left and right 
// 'use client'
// import React, { useEffect, useState } from 'react'
// import cn from 'classnames'
// import Script from 'next/script'
// import Loading from '../components/base/loading'
// import Forms from './forms'
// import Header from './_header'
// import style from './page.module.css'
// import UserSSOForm from './userSSOForm'
// import { IS_CE_EDITION } from '@/config'
// // import './assets/Floating_Robot.jpg'
// // import Floating_Robot from './assets/Floating_Robot.jpg'

// import type { SystemFeatures } from '@/types/feature'
// import { defaultSystemFeatures } from '@/types/feature'
// import { getSystemFeatures } from '@/service/common'

// const SignIn = () => {
//   const [loading, setLoading] = useState<boolean>(true)
//   const [systemFeatures, setSystemFeatures] = useState<SystemFeatures>(defaultSystemFeatures)

//   useEffect(() => {
//     getSystemFeatures().then((res) => {
//       setSystemFeatures(res)
//     }).finally(() => {
//       setLoading(false)
//     })
//   }, [])

//   return (
//     <>
//       {!IS_CE_EDITION && (
//         <>
//           <Script strategy="beforeInteractive" async src={'https://www.googletagmanager.com/gtag/js?id=AW-11217955271'}></Script>
//           <Script
//             id="ga-monitor-register"
//             dangerouslySetInnerHTML={{
//               __html: `
// window.dataLayer2 = window.dataLayer2 || [];
// function gtag(){dataLayer2.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'AW-11217955271');
//         `,
//             }}
//           >
//           </Script>
//         </>
//       )}

//       <div className={cn(
//         style.background,
//         'flex justify-center items-center min-h-screen',
//         'p-4 lg:p-8',
//       )}>
//         <div className='flex flex-grow max-w-screen-xl'>
//           <div className='w-full lg:w-1/2 bg-blue-100'>
//             {/* Left side (Login card) */}
//             <div className={
//               cn(
//                 'flex flex-col bg-white shadow-lg rounded-2xl',
//                 'p-6 space-y-6',
//               )
//             }>
//               <Header />

//               {loading && (
//                 <div className='flex items-center justify-center'>
//                   <Loading type='area' />
//                 </div>
//               )}

//               {!loading && !systemFeatures.sso_enforced_for_signin && (
//                 <Forms />
//               )}

//               {!loading && systemFeatures.sso_enforced_for_signin && (
//                 <UserSSOForm protocol={systemFeatures.sso_enforced_for_signin_protocol} />
//               )}

//             </div>
//           </div>

//         <div className='lg:block w-1/2 bg-gray-200 relative'>
//             <img
//             src='./assets/Floating_Robot.jpg'
//             alt='Background Image'
//             className='absolute inset-0 object-cover w-full h-full'
//           />
//         </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default SignIn
