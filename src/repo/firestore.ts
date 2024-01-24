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
import bcrypt from 'bcryptjs'
import { Status, User } from '../types/api'

export class FirestoreDB {
  private bc = bcrypt
  private config: object
  private app: FirebaseApp
  private db: Firestore

  constructor(config: object) {
    this.config = config
    this.app = initializeApp(this.config)
    this.db = getFirestore(this.app)
  }

  async findUser(userData: User): Promise<Status> {
    const q = query(
      collection(this.db, 'users'),
      where('email', '==', userData.email)
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty)
      return {
        status: false,
        message: 'User not found',
        field: 'email',
        data: null
      }

    const user = querySnapshot.docs[0].data()
    const id = querySnapshot.docs[0].id

    if (!(await this.bc.compare(userData.password, user.password)))
      return {
        status: false,
        message: 'Wrong password',
        field: 'password',
        data: null
      }

    const response = {
      id: id,
      name: user.name
    }

    return {
      status: true,
      message: 'Login successful',
      field: null,
      data: response
    }
  }

  async addUser(userData: User) {
    const q = query(
      collection(this.db, 'users'),
      where('email', '==', userData.email)
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      const password = await this.bc.hash(userData.password, 10)
      return await addDoc(collection(this.db, 'users'), {
        name: userData.name,
        email: userData.email,
        password: password
      })
    }
    return null
  }
}
