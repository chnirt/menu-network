import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import { getColGroupRef, getColRef } from '../../firebase/service'
import { getDocs, query, where } from 'firebase/firestore'

type MenuContextType = {
  categories?: any[]
  fetchCategory?: (menuId: string) => void
}

export const MenuContext = createContext<MenuContextType>({
  categories: [],
})

export const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categories, setCategories] = useState<any[] | undefined>()

  let querySnapshot
  const fetchCategory = useCallback(async (menuId: string) => {
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
    <MenuContext.Provider value={{ categories, fetchCategory }}>
      {children}
    </MenuContext.Provider>
  )
}
