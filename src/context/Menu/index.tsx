import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { getDocs, query, where } from 'firebase/firestore'
import {
  getColGroupRef,
  getColRef,
  getDocRef,
  getDocument,
} from '../../firebase/service'

type IMenu = {
  wifi?: string
  currency?: string
  logo?: string
}

type MenuContextType = {
  categories?: any[]
  fetchMenu?: (menuId: string) => Promise<void>
  refetchMenu?: (menuId: string) => Promise<void>
  menu?: IMenu
}

export const MenuContext = createContext<MenuContextType>({})

export const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const [menu, setMenu] = useState<IMenu | undefined>()
  const [categories, setCategories] = useState<any[] | undefined>()

  let querySnapshot
  const fetchMenu = useCallback(
    async (menuId: string) => {
      if (categories?.length) return
      await refetchMenu(menuId)
      return
    },
    [categories]
  )

  const refetchMenu = useCallback(async (menuId: string) => {
    const menuDocRef = getDocRef('users', menuId)
    const menuDocData: any = await getDocument(menuDocRef)

    if (menuDocData) {
      setCategories(undefined)
      const categoryColGroupRef = getColGroupRef('categories')
      const q = query(categoryColGroupRef, where('uid', '==', menuId))
      querySnapshot = await getDocs(q)
      const docs = querySnapshot.docs
      const data = await Promise.all(
        docs.map(async (docSnapshot) => {
          const dishesDocs = await getDocs(
            getColRef(docSnapshot.ref.path, 'dishes')
          )
          return {
            // ...docSnapshot,
            id: docSnapshot.id,
            ...docSnapshot.data(),
            ref: docSnapshot.ref,
            title: docSnapshot.data().categoryName,
            data: dishesDocs.docs.map((dishDoc) => ({
              id: dishDoc.id,
              ...dishDoc.data(),
              ref: dishDoc.ref,
              name: dishDoc.data().dishName,
              photo: dishDoc.data().dishFiles?.[0],
              price: dishDoc.data().price,

              parentId: docSnapshot.id,
            })),
          }
        })
      )

      // console.log(data)
      setMenu(menuDocData)
      setCategories(data)
    }
  }, [])

  return (
    <MenuContext.Provider value={{ categories, fetchMenu, refetchMenu, menu }}>
      {children}
    </MenuContext.Provider>
  )
}
