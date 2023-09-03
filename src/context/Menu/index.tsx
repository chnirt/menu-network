import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { getDocs, query, where } from 'firebase/firestore'
import { getColRef } from '../../firebase/service'
import useAuth from '../../hooks/useAuth'

type MenuContextType = {
  fetchCategories: () => Promise<void>
  categories?: any[]
  fetchDishes: () => Promise<void>
  dishes?: any[]
}

export const MenuContext = createContext<MenuContextType>({
  fetchCategories: async () => {},
  fetchDishes: async () => {},
})

export const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth()
  const [categories, setCategories] = useState<any[] | undefined>()
  const [dishes, setDishes] = useState<any[] | undefined>()

  const fetchCategories = useCallback(async () => {
    if (user === null) return
    const categoryColRef = getColRef('categories')
    const q = query(categoryColRef, where('uid', '==', user.uid))
    const queryOrderSnapshot = await getDocs(q)
    const docs = queryOrderSnapshot.docs
    const data = docs.map((docSnapshot) => {
      const data = docSnapshot.data()
      return {
        id: docSnapshot.id,
        ref: docSnapshot.ref,
        ...data,
        name: data?.categoryName,
      }
    })
    setCategories(data)
  }, [user])

  const fetchDishes = useCallback(async () => {
    if (user === null) return
    const categoryColRef = getColRef('dishes')
    const q = query(categoryColRef, where('uid', '==', user.uid))
    const queryOrderSnapshot = await getDocs(q)
    const docs = queryOrderSnapshot.docs
    const data = docs.map((docSnapshot) => {
      const data = docSnapshot.data()
      const price = data?.price ?? 0
      return {
        id: docSnapshot.id,
        ref: docSnapshot.ref,
        ...data,
        photo: data?.dishFiles?.[0],
        name: data?.dishName,
        description: data?.dishDescription,
        price,
      }
    })
    setDishes(data)
  }, [user])

  const value = useMemo(
    () => ({
      fetchCategories,
      categories,
      fetchDishes,
      dishes,
    }),
    [fetchCategories, categories, fetchDishes, dishes]
  )

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}
