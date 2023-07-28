import {
  Avatar,
  Dialog,
  Footer,
  ImageUploadItem,
  ImageUploader,
  List,
} from 'antd-mobile'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PictureOutline } from 'antd-mobile-icons'
import useAuth from '../../hooks/useAuth'
import { signOutFirebase, updateProfileFirebase } from '../../firebase/service'
import { Loading } from '../../global'
import { routes } from '../../routes'
import { uploadStorageBytesResumable } from '../../firebase/storage'

const AvatarUploader = ({
  photoURL = "",
  onUpload,
}: {
  photoURL: string
  onUpload: (downloadURL: string) => void
}) => {
  console.log(photoURL)
  const handleUpload = useCallback(() => {}, [])
  if (photoURL) {
    return <Avatar src={photoURL} />
  }
  return (
    <ImageUploader
      upload={function (file: File): Promise<ImageUploadItem> {
        const isJpgOrPng =
          file.type === 'image/jpeg' || file.type === 'image/png'
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
      }}
      maxCount={1}
      style={{ '--cell-size': '44px' }}
      preview={false}
      deletable={false}
    >
      <span
        className="adm-image-uploader-cell adm-image-uploader-upload-button"
        onClick={handleUpload}
      >
        <span className="adm-image-uploader-upload-button-icon">
          <PictureOutline style={{ fontSize: 32 }} />
        </span>
      </span>
    </ImageUploader>
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
    const result: any = await updateProfileFirebase({
      photoURL: downloadURL,
    })
    if (result) {
      setPhotoURL(downloadURL)
    }
  }, [])
  return (
    <div>
      <List mode="card">
        <List.Item
          // prefix={<Avatar src={user?.photoURL ?? ''} />}
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
