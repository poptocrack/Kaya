import { spawn } from 'child_process'

function openSteam({ login, password }: { login: string, password: string }): void {
  // TODO get the real path from user
  const path = 'C:/Program Files (x86)/Steam/Steam.exe'
  const execArguments = ['-login', login, password, '-remember_password']

  try {
    const spawnedProcess = spawn(path, execArguments, { detached: true, stdio: 'ignore' })
    spawnedProcess.unref()
    console.log(('Success open steam'))
  } catch (error1) {
    console.log(error1)
  }
}

function closeSteam(): void {
  // TODO get the real path from user
  const path = 'C:/Program Files (x86)/Steam/Steam.exe'
  const execArguments = ['-shutdown']

  try {
    const spawnedProcess = spawn(path, execArguments, { detached: true, stdio: 'ignore' })
    spawnedProcess.unref()
    console.log(('Success close steam'))
  } catch (error1) {
    console.log(error1)
  }
}

export {
  openSteam,
  closeSteam,
}
