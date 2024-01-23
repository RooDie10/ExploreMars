import { initializeApp, FirebaseApp } from 'firebase/app'
import { Firestore } from 'firebase/firestore'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where
} from 'firebase/firestore'
import { User } from '../types/user_type'

export class FirestoreDB {
  private config: object
  private app: FirebaseApp
  private db: Firestore
  constructor(config: object) {
    this.config = config
    this.app = initializeApp(this.config)
    this.db = getFirestore(this.app)
  }

  async findUser(userData: User) {
    const q = query(
      collection(this.db, 'users'),
      where('email', '==', userData.email),
      where('password', '==', userData.password)
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return undefined
    return querySnapshot.docs[0].data()
  }

  async addUser(userData: User) {
    return await addDoc(collection(this.db, 'users'), userData)
  }
}
