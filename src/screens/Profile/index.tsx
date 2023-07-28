import { Avatar, Dialog, Footer, ImageUploadItem, List } from 'antd-mobile'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { signOutFirebase, updateProfileFirebase } from '../../firebase/service'
import { Loading } from '../../global'
import { routes } from '../../routes'
import { uploadStorageBytesResumable } from '../../firebase/storage'

const AvatarUploader = ({
  photoURL = '',
  onUpload,
}: {
  photoURL: string
  onUpload: (downloadURL: string) => void
}) => {
  const upload = useCallback((file: File): Promise<ImageUploadItem> => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      return Promise.reject(new Error('You can only upload JPG/PNG file!'))
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      return Promise.reject(new Error('Image must smaller than 2MB!'))
    }

    return new Promise((resolve, reject) => {
      uploadStorageBytesResumable(
        file,
        undefined,
        (error) => reject(error),
        async ({ downloadURL }) => {
          typeof onUpload === 'function' ? onUpload(downloadURL) : undefined
          resolve({
            url: downloadURL,
          })
        }
      )
    })
  }, [])
  return (
    <div>
      <label htmlFor="file-input">
        {photoURL ? <Avatar src={photoURL} /> : <Avatar src={photoURL} />}
      </label>
      <input
        id="file-input"
        className="hidden"
        type="file"
        onChange={async (e) => {
          if (e.target.files) {
            await upload(e.target.files[0])
          }
        }}
      />
    </div>
  )
}

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
        Loading.get().show()
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
