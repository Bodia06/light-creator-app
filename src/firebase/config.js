import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get } from 'firebase/database'
import { ASSEMBLY } from '@/data/assemblyData'
import BINDING from '@/data/bindingData'

const firebaseConfig = {
  apiKey: 'AIzaSyBwiD9J5dOXUKi-bBrJFa1n58i9gEg_7BI',
  authDomain: 'light-creator-app-701a5.firebaseapp.com',
  databaseURL: 'https://light-creator-app-701a5-default-rtdb.firebaseio.com',
  projectId: 'light-creator-app-701a5',
  storageBucket: 'light-creator-app-701a5.appspot.com',
  messagingSenderId: '844032503914',
  appId: '1:844032503914:web:cd31afa2eee5b0f284da13'
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

const saveData = (nameData, id, name, src, type) => {
  return set(ref(db, `${nameData}/` + id), {
    Id: id,
    Name: name,
    SrcImg: src,
    Type: type
  })
}

const takeData = async nameData => {
  try {
    const snapshot = await get(ref(db, nameData))
    if (snapshot.exists()) {
      const data = snapshot.val()
      const result = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }))
      return result
    } else {
      console.warn(`No data found in Firebase for ${nameData}`)
      return []
    }
  } catch (err) {
    console.error(`Error reading ${nameData} from Firebase:`, err)
    return []
  }
}

const createReactiveArray = (nameData, arr, typeKey = 'type') => {
  const proxyHandler = {
    set (target, prop, value) {
      target[prop] = value
      if (!isNaN(prop)) {
        const item = target[prop]
        saveData(
          nameData,
          item.id,
          item.name,
          item.srcImg,
          item[typeKey] || item.settings
        )
      }
      return true
    }
  }

  const reactiveArr = new Proxy(arr, {
    set (target, prop, value) {
      target[prop] = value
      if (!isNaN(prop)) {
        const item = target[prop]
        saveData(
          nameData,
          item.id,
          item.name,
          item.srcImg,
          item[typeKey] || item.settings
        )
      }
      return true
    },
    get (target, prop) {
      return target[prop]
    }
  })

  for (let i = 0; i < reactiveArr.length; i++) {
    reactiveArr[i] = new Proxy(reactiveArr[i], proxyHandler)
  }

  return reactiveArr
}

export const ASSEMBLY_REACTIVE = createReactiveArray(
  'assembly',
  ASSEMBLY,
  'type'
)
export const BINDING_REACTIVE = createReactiveArray(
  'binding',
  BINDING,
  'settings'
)

const saveAllData = () => {
  ASSEMBLY_REACTIVE.forEach(item =>
    saveData('assembly', item.id, item.name, item.srcImg, item.type)
  )
  BINDING_REACTIVE.forEach(item =>
    saveData('binding', item.id, item.name, item.srcImg, item.settings)
  )
}

export { saveAllData, takeData }
