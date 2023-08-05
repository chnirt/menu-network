import { Dialog, Footer, List } from 'antd-mobile'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { signOutFirebase, updateProfileFirebase } from '../../firebase/service'
import { Loading } from '../../global'
import { routes } from '../../routes'
import AvatarUploader from '../../components/AvatarUploader'

const Profile = () => {
  const { user } = useAuth()
  const [photoURL, setPhotoURL] = useState(user?.photoURL ?? '')
  const navigate = useNavigate()
  const handleLogout = useCallback(() => {
    Dialog.confirm({
      content: 'Are you sure want to log out?',
      cancelText: 'Cancel',
      confirmText: 'Log out',
      onConfirm: async () => {
        Loading.get.show()
        signOutFirebase()
        // const logoutFromAPI = async () => {
        //   const data: boolean = await new Promise((resolve) =>
        //     setTimeout(() => resolve(true), 1000)
        //   );
        //   return data;
        // };
        // logout(logoutFromAPI);
      },
    })
  }, [])
  const handleOnUpload = useCallback(async (downloadURL: string) => {
    await updateProfileFirebase({
      photoURL: downloadURL,
    })
    setPhotoURL(downloadURL)
  }, [])
  return (
    <div>
      <List mode="card">
        <List.Item
          prefix={
            <AvatarUploader photoURL={photoURL} onUpload={handleOnUpload} />
          }
          description={user?.email}
        >
          {user?.fullName}
        </List.Item>
        <List.Item onClick={() => navigate(routes.settings)}>
          Settings
        </List.Item>
        <List.Item onClick={handleLogout} arrow={false}>
          Log out
        </List.Item>
        <Footer content="@ 2004-2023 https://github.com/chnirt All rights reserved"></Footer>
      </List>
    </div>
  )
}

export default Profile
