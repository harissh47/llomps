'use client';
import { useEffect,useState } from 'react';
import useSWR from 'swr';
import { fetchAppMeta } from '@/service/share';


// const [isInstalledApp] = useState(true);

// const [appId] = useState('')

const Home = () => {
  const [isInstalledApp] = useState(true);
 
  const [appId] = useState('')
  const { data: appMetaResponse, error: appMetaError, isLoading: appMetaLoading } = useSWR(
    ['meta', isInstalledApp, appId], 
    () => fetchAppMeta(isInstalledApp, appId) 
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      // setIsDarkMode(true)
    }
  }, [])
  useEffect(() => {
    // const { data: appMetaResponse, error: appMetaError, isLoading: appMetaLoading } = useSWR(
    //   ['meta', isInstalledApp, appId], 
    //   () => fetchAppMeta(isInstalledApp, appId) 
    // );
   
    if (appMetaResponse) {
      console.log('meta:', appMetaResponse); 
    }
  }, [appMetaResponse]); 

  return (
    <div>
      <h1>Hello!!!</h1>

      {/* App Meta Section */}
      <h2>App Meta:</h2>
      {appMetaLoading ? (
        
        <p>Loading app meta...</p>
      ) : appMetaError ? (
        
        <p>Error loading app meta</p>
      ) : appMetaResponse ? (
        
        <pre>{JSON.stringify(appMetaResponse, null, 2)}</pre>
      ) : (
       
        <p>No app meta data available.</p>
      )}
    </div>
  );
};

export default Home;

// 'use client'
// import { useEffect, useState } from 'react';
// import useSWR from 'swr';
// import { fetchUserProfile, fetchModelList } from '@/service/common';
// import {fetchAppMeta} from '@/service/share'
// import { result } from 'lodash-es';
// // import {isInstalledApp, appId} from '@/service/share'
// // import {,getUrl} from '@/service/share'
// const isInstalledApp = false; // or true, depending on your use case
// const appId = '';
// const Home = () => {
//   // Fetch user profile data using useSWR
//   // const { data: userProfileResponse, error: userProfileError, isLoading: userProfileLoading } = useSWR(
//   //   { url: '/account/profile', params: {} },
//   //   fetchUserProfile
//   // );

//   // Fetch model list data using useSWR
//   // const { data: modelListResponse, error: modelListError, isLoading: modelListLoading } = useSWR(
//   //   '/models/list',
//   //   fetchModelList
//   // );
//   // const { data: appMetaResponse, error: appMetaError, isLoading: appMetaLoading } = useSWR(
//   //   '/app/meta', 
//   //   () => fetchAppMeta(false) 
//   // );
//   const { data: appMeta } = useSWR(['appMeta', isInstalledApp, appId], () => fetchAppMeta(isInstalledApp, appId))
//   // const [appMetaResponse, setAppMetaResponse] = useState<AppMeta | null>(null);

//   useEffect(() => {
//     const fetchAppMetaData = async () => {
//       try {
//         const response = await fetchAppMeta(false);
//          console.log(response)
//       } catch (error) {
//         console.error('Failed to fetch app metadata:', error);
//       }
//     };
//     fetchAppMetaData();
//   }, []);

//   // Handling the user profile response
//   // useEffect(() => {
//   //   const fetchUserProfileData = async () => {
//   //     if (userProfileResponse && !userProfileResponse.bodyUsed) {
//   //       const result = await userProfileResponse.json();
//   //       console.log(result);
//   //     }
//   //   };
//   //   fetchUserProfileData();
//   // }, [userProfileResponse]);

  
//   // useEffect(() => {
//   //   const fetchModelListData = async () => {
//   //     if (modelListResponse && !modelListResponse) {
//   //       const result = await modelListResponse;
//   //       console.log(result);
//   //     }
//   //   };
//   //   fetchModelListData();
//   // }, [modelListResponse]);

//   return (
//     <div>
//       <h1>Hello!!!</h1>

    

//       {/* Model List Section */}
      
//        {/* App Meta Section */}
//        <h2>App Meta:</h2>
//       {appMetaLoading ? (
//         <p>Loading app meta...</p>
//       ) : appMetaError ? (
//         <p>Error loading app meta</p>
//       ) : appMetaResponse ? (
//         <pre>{JSON.stringify(appMetaResponse, null, 2)}</pre>
//       ) : (
//         <p>No app meta data available.</p>
//       )}

//     </div>
//   );
// };

// export default Home;
