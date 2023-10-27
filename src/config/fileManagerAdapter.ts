import { rename, readFile } from 'fs/promises'

export async function renameFile (currentName: string, newName: string) {
  try {
    await rename(currentName, newName)
    console.log(`Renamed ${currentName} to ${newName}`)
  } catch (error: any) {
    console.error(`Got an error trying to rename the file: ${error.message}`)
  }
}

export async function readThisFile (fileName: string) {
  try {
    const data = await readFile(fileName)
    console.log(data.toString())
  } catch (error: any) {
    console.error(`Got an error trying to read the file: ${error.message}`)
  }
}
