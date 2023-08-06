import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { getDocs, query, where } from 'firebase/firestore'
import { getColGroupRef, getColRef } from '../../firebase/service'

type MenuContextType = {
  categories?: any[]
  fetchMenu?: (menuId: string) => void
  refetchMenu?: (menuId: string) => void
}

export const MenuContext = createContext<MenuContextType>({
  categories: [],
})

export const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categories, setCategories] = useState<any[] | undefined>()

  let querySnapshot
  const fetchMenu = useCallback(async (menuId: string) => {
    if (categories?.length) return
    refetchMenu(menuId)
    return
  }, [categories])

  const refetchMenu = useCallback(async (menuId: string) => {
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
    setCategories(data)

    return
  }, [])

  return (
    <MenuContext.Provider
      value={{ categories, fetchMenu, refetchMenu }}
    >
      {children}
    </MenuContext.Provider>
  )
}
