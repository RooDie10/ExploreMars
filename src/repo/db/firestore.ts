import { initializeApp, FirebaseApp } from 'firebase/app'
import {
  Firestore,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where
} from 'firebase/firestore'
import bcrypt from 'bcryptjs'
import { Level, LevelData, Status, User } from '../../types/api'

export class FirestoreDB {
  public bc = bcrypt
  public config: object
  public app: FirebaseApp
  public db: Firestore

  constructor(config: object) {
    this.config = config
    this.app = initializeApp(this.config)
    this.db = getFirestore(this.app)
  }

  async getLevels() {
    const docRef = query(collection(this.db, 'levels'))
    const docSnap = await getDocs(docRef)
    const result = docSnap.docs.map((doc) => {
      const data = doc.data()
      const id = doc.id
      return { id, data }
    })
    return result
  }

  async getLevel(id: string): Promise<Level> {
    const docRef = doc(this.db, 'levels', id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) return null
    const data = {
      type: docSnap.data().type,
      description: docSnap.data().description,
      price: docSnap.data().price,
      included: docSnap.data().included,
    }
    const result = { id: docSnap.id, data: data }

    return result
  }

  async buyLevel(userId: string, levelId: string) {
    const userRef = doc(this.db, 'users', userId)

    await updateDoc(userRef, {
      level: levelId
    })
    return true
  }

  // wip
  async deleteLevel(levelId: string) {
    const q = query(collection(this.db, 'users'), where('level', '==', levelId))
    const usersRef = await getDocs(q)
    if (!usersRef.empty) return false
    await deleteDoc(doc(this.db, 'levels', levelId))
    return true
  }

  // wip
  async addLevel(levelData: LevelData) {
    const newLevelRef = await addDoc(collection(this.db, 'levels'), levelData)
    return true
  }
  // wip
  async editLevel(levelData: LevelData, id: string) {
    const levelRef = doc(this.db, 'levels', id)
    const result = updateDoc(levelRef, levelData)
    return true
  }
}

export class UsersFirestoreDB extends FirestoreDB {
  constructor(config: object) {
    super(config)
  }

  async getUsersByLevel(levelId?: string) {
    let q
    if (!levelId)
      q = query(collection(this.db, 'users'), where('level', '!=', null))
    else q = query(collection(this.db, 'users'), where('level', '==', levelId))

    const usersSnap = await getDocs(q)

    let users: any[] = []
    const levels = await this.getLevels()
    usersSnap.forEach((item) => {
      let user = item.data()
      if (user.level) {
        const levelType = levels.filter((level) => level.id === user.level)
        user.level = levelType[0].data.type
      }
      users.push(user)
    })
    return users
  }

  async getUsers() {
    const usersSnap = await getDocs(collection(this.db, 'users'))
    const levels = await this.getLevels()
    let data: any = []
    usersSnap.forEach((doc) => {
      let user = doc.data()
      if (user.level) {
        const levelType = levels.filter((level) => level.id === user.level)
        user.level = levelType[0].data.type
      }
      user.id = doc.id
      data.push(user)
    })
    return data
  }

  async getUserById(id: string) {
    const docRef = doc(this.db, 'users', id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) return false
    let data = docSnap.data()
    if (data.level) {
      const level = await this.getLevel(data.level)
      data.level = level!.data.type
    }
    data.id = docSnap.id
    return data
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

  async findUser(userData: User): Promise<Status> {
    const q = query(
      collection(this.db, 'users'),
      where('email', '==', userData.email)
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty)
      return {
        error: false,
        message: 'User not found',
        field: 'email',
        data: null
      }

    const user = querySnapshot.docs[0].data()
    const id = querySnapshot.docs[0].id

    if (!(await this.bc.compare(userData.password, user.password)))
      return {
        error: false,
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
      error: true,
      message: 'Login successful',
      field: null,
      data: response
    }
  }

  async deleteUser(userId: string) {
    await deleteDoc(doc(this.db, 'users', userId))
    return true
  }

  async editUser(userData: any, id: string) {
    const userRef = doc(this.db, 'users', id)
    const result = updateDoc(userRef, userData)
    return true
    
  }
}
