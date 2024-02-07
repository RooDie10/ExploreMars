import dotenv from 'dotenv'

dotenv.config()

export const firestoreConfig = {
  apiKey: process.env.APIKEY,
  authDomain: 'explore-mars-f3583.firebaseapp.com',
  projectId: 'explore-mars-f3583',
  storageBucket: 'explore-mars-f3583.appspot.com',
  messagingSenderId: '453220317668',
  appId: '1:453220317668:web:03cbf8192a0aa742502ff1',
  measurementId: 'G-3HRVEY2785'
}