import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function encryptPassword(pwd: string) {
  // generate a salt for a strong hashing
  const salt = await bcrypt.genSalt(10)
  // Hash the password with the salt
  const hash  = await bcrypt.hash(pwd, salt)
  return hash
}

export async function comparePassword(password: string, hash_password: string) {
  return await bcrypt.compare(password, hash_password)
}

export function findUserByEmail(users: any, email: any): number {
  // find users from local storage using email
  const user_id: number = users.findIndex((user: any) => user.email === email)
  return user_id
}

export function getUsersFromStorage(storage_name: string) {
  // get data form local storage
  const storage = localStorage.getItem(storage_name)
  if (storage) {
    return JSON.parse(storage)
  }
  return []
}

export function writeStorage(storage_name: string, data: any): void {
  // create and write local storage
  localStorage.setItem(
    storage_name,
    JSON.stringify(data)
  )
}

export function createUserInStorage(users: any, id: number, form_data: any): void {
  if (id === -1) {
    const user = {
      email: form_data.email,
      businessName: form_data.businessName,
      password: form_data.password,
      isLoggedIn: true,
    }
    writeStorage("fleetUser", [...users, user])
  }
}

export function updateUserInStorage(users: any, id: number, isLoggedIn: boolean): void {
  if (id >= 0) {
    users[id] = {...users[id], isLoggedIn: true}
    writeStorage("fleetUser", users)
  }
}