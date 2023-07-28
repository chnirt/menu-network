import { Button, Form, Input, NavBar, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { MASTER_MOCK_DATA } from '../../mocks'
import { Loading } from '../../global'
import { useCallback, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { getDocRef, updateDocument } from '../../firebase/service'

const initialValues = MASTER_MOCK_DATA.SETTINGS

const Settings = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [form] = Form.useForm()

  const onFinish = useCallback(
    async (values: typeof initialValues) => {
      if (user === null) return
      try {
        Loading.get().show()
        const { wifi } = values
        const uid = user.uid
        const settingsData = {
          wifi,
        }
        const settingsDocRef = getDocRef('users', uid)
        await updateDocument(settingsDocRef, settingsData)

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
        Loading.get().hide()
      }
    },
    [user]
  )

  useEffect(() => {
    form.setFieldsValue({ wifi: user?.wifi })
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
        // footer={
        //   <Button
        //     block
        //     type="submit"
        //     color="primary"
        //     size="large"
        //     disabled={
        //       !form.isFieldsTouched(true) ||
        //       form.getFieldsError().filter(({ errors }) => errors.length)
        //         .length > 0
        //     }
        //   >
        //     {isEditMode ? "EDIT" : "CREATE"}
        //   </Button>
        // }
      >
        <Form.Header>Settings</Form.Header>
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

        <Form.Item shouldUpdate className="submit">
          {() => (
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0
              }
            >
              SAVE
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default Settings
