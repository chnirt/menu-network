import {
  Button,
  Form,
  ImageUploadItem,
  ImageUploader,
  Input,
  NavBar,
  Radio,
  Space,
  Toast,
} from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { MASTER_MOCK_DATA } from '../../mocks'
import { Loading } from '../../global'
import { useCallback, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { getDocRef, updateDocument } from '../../firebase/service'
import { uploadStorageBytesResumable } from '../../firebase/storage'

const initialValues = MASTER_MOCK_DATA.SETTINGS

const Settings = () => {
  const navigate = useNavigate()
  const { user, fetchUser } = useAuth()
  const [form] = Form.useForm()

  const onFinish = useCallback(
    async (values: typeof initialValues) => {
      if (user === null) return
      try {
        Loading.get.show()
        const { logo, wifi, currency }: any = values
        const uid = user.uid
        const settingsData = {
          ...(wifi ? { wifi } : {}),
          ...(logo.length > 0 ? { logo: logo[0].url } : {}),
          currency,
        }
        console.log(settingsData)
        const settingsDocRef = getDocRef('users', uid)
        await updateDocument(settingsDocRef, settingsData)
        await fetchUser(user)
        navigate(-1)
        Toast.show({
          icon: 'success',
          content: 'Saved',
        })

        return
      } catch (error: any) {
        Toast.show({
          icon: 'error',
          content: error.message,
        })
      } finally {
        Loading.get.hide()
      }
    },
    [user]
  )

  useEffect(() => {
    form.setFieldsValue({
      ...(user?.logo ? { logo: [{ url: user.logo }] } : {}),
      ...(user?.wifi ? { wifi: user.wifi } : {}),
      ...(user?.currency ? { currency: user.currency } : {}),
    })
  }, [user])

  return (
    <div>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
      >
        Settings
      </NavBar>
      <Form
        form={form}
        initialValues={initialValues}
        layout="horizontal"
        onFinish={onFinish}
        mode="card"
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            shape="rounded"
            // disabled={
            //   !form.isFieldsTouched(true) ||
            //   form.getFieldsError().filter(({ errors }) => errors.length)
            //     .length > 0
            // }
          >
            SAVE
          </Button>
        }
      >
        <Form.Header>Settings</Form.Header>
        <Form.Item name="logo" label="Logo">
          <ImageUploader
            upload={function (file: File): Promise<ImageUploadItem> {
              const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png'
              if (!isJpgOrPng) {
                Toast.show({
                  icon: 'error',
                  content: 'You can only upload JPG/PNG file!',
                })
                return Promise.reject(
                  new Error('You can only upload JPG/PNG file!')
                )
              }
              const isLt2M = file.size / 1024 / 1024 < 2
              if (!isLt2M) {
                Toast.show({
                  icon: 'error',
                  content: 'Image must smaller than 2MB!',
                })
                return Promise.reject(new Error('Image must smaller than 2MB!'))
              }

              return new Promise((resolve, reject) => {
                uploadStorageBytesResumable(
                  file,
                  undefined,
                  (error) => reject(error),
                  async ({ downloadURL }) =>
                    resolve({
                      url: downloadURL,
                    })
                )
              })
            }}
            maxCount={1}
          />
        </Form.Item>
        <Form.Item
          name="wifi"
          label="Wifi"
          rules={[
            {
              min: 8,
              message: 'Wifi must be 8 characters long',
            },
          ]}
          shouldUpdate
        >
          <Input autoComplete="none" placeholder="xxxxxxxx" />
        </Form.Item>

        <Form.Item
          name="currency"
          label="Currency"
          rules={[
            {
              required: true,
              message: 'Currency is required',
            },
          ]}
        >
          <Radio.Group>
            <Space>
              <Radio value="vnd">VND</Radio>
              <Radio value="usd">USD</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {/* <Form.Item shouldUpdate className="submit" noStyle>
          {() => (
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              shape="rounded"
              // disabled={
              //   !form.isFieldsTouched(true) ||
              //   form.getFieldsError().filter(({ errors }) => errors.length)
              //     .length > 0
              // }
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0
              }
            >
              SAVE
            </Button>
          )}
        </Form.Item> */}
      </Form>
    </div>
  )
}

export default Settings
