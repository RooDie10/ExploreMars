import { initializeApp, FirebaseApp } from 'firebase/app'
import { Firestore, doc, getDoc, updateDoc } from 'firebase/firestore'
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
      name: user.name,
      level: null,
      admin: user.admin
    }

    if (user.level) response.level = user.level

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
      const newUserRef = await addDoc(collection(this.db, 'users'), {
        name: userData.name,
        email: userData.email,
        password: password
      })
      const newUserSnap = await getDoc(newUserRef)
      return { id: newUserSnap.id, userData: newUserSnap.data() }
    }
    return null
  }

  async getLevels(id?: string) {
    let docRef
    let docSnap
    let result

    if (id) {
      docRef = doc(this.db, 'levels', id)
      docSnap = await getDoc(docRef)
      result = { id: docSnap.id, data: docSnap.data() }
    } else {
      docRef = query(collection(this.db, 'levels'))
      docSnap = await getDocs(docRef)
      result = docSnap.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return { id, data }
      })
    }

    return result
  }

  async buyLevel(userId: string, levelId: string) {
    const userRef = doc(this.db, 'users', userId)

    await updateDoc(userRef, {
      level: levelId
    })
    return true
  }

  async getUserById(id: string) {
    const docRef = doc(this.db, 'users', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  }

  async getUsers() {
    const usersSnap = await getDocs(collection(this.db, 'users'))
    let data: any = []
    usersSnap.forEach((doc) => data.push(doc.data()))
    return data
  }

  async getUsersByLevel(levelId?: string) {
    let q
    if (!levelId)
      q = query(collection(this.db, 'users'), where('level', '!=', null))
    else q = query(collection(this.db, 'users'), where('level', '==', levelId))

    const usersSnap = await getDocs(q)
    let users: any[] = []
    usersSnap.forEach((item) => users.push(item.data()))
    return users
  }
}
