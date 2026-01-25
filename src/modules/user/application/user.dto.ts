export type CreateUserInput = {
  id?: string
  name: string
  email: string
  passwordHash: string
}

export type ChangeUserNameInput = {
  userId: string
  newName: string
}

export type ChangeUserPasswordInput = {
  userId: string
  newPasswordHash: string
}
