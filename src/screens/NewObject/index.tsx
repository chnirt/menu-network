import { Button, Form, Input, NavBar, Radio, Space, Toast } from 'antd-mobile'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import {
  addDocument,
  getColRef,
  getDocRef,
  getDocument,
  // getDocument,
  updateDocument,
} from '../../firebase/service'
import useAuth from '../../hooks/useAuth'
import { MASTER_MOCK_DATA } from '../../mocks'
import { Loading } from '../../global'
import useOrder from '../../hooks/useOrder'
// import useMenu from '../../hooks/useMenu'

const initialValues = MASTER_MOCK_DATA.NEW_OBJECT

const NewObject = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { user } = useAuth()
  const { objectId } = useParams()
  const { fetchObject } = useOrder()
  const isEditMode = Boolean(objectId)
  const [form] = Form.useForm()
  const [objectDocRefState, setObjectDocRefState] = useState<DocumentReference<
    DocumentData,
    DocumentData
  > | null>(null)

  const onFinish = useCallback(
    async (values: typeof initialValues) => {
      if (user === null) return
      try {
        Loading.get.show()
        const { objectType, objectName } = values
        const uid = user.uid
        const categoryData = {
          objectType,
          objectName,
          deleted: false,
          uid,
        }

        if (isEditMode) {
          if (objectDocRefState === null) return
          await updateDocument(objectDocRefState, categoryData)
        } else {
          const objectDocRef = getColRef('objects')
          await addDocument(objectDocRef, categoryData)
        }

        if (typeof fetchObject === 'function') {
          fetchObject()
        }

        navigate(-1)
        Toast.show({
          icon: 'success',
          content: isEditMode ? 'Object is updated' : 'Object is created',
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
    [user, isEditMode, objectDocRefState, navigate, fetchObject]
  )

  const fetchObjectById = useCallback(
    async (objectId: string) => {
      if (user === null) return
      setLoading(true)
      const objectDocRef = getDocRef('objects', objectId)
      setObjectDocRefState(objectDocRef)
      const objectDocData: any = await getDocument(objectDocRef)
      form.setFieldsValue(objectDocData)
      setLoading(false)
    },
    [user, form]
  )

  useEffect(() => {
    if (objectId === undefined) return
    fetchObjectById(objectId)
  }, [objectId, fetchObjectById])

  return (
    <Fragment>
      <NavBar
        className="sticky top-0 z-[100] bg-white"
        onBack={() => navigate(-1)}
      >
        {isEditMode ? 'EDIT OBJECT' : 'NEW OBJECT'}
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
            {isEditMode ? 'EDIT' : 'CREATE'}
          </Button>
        }
        disabled={loading}
      >
        <Form.Header>{isEditMode ? 'Edit Object' : 'New Object'}</Form.Header>
        <Form.Item name="objectType" label="Object Type">
          <Radio.Group>
            <Space>
              <Radio value="table">Table</Radio>
              <Radio value="customer">Customer</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="objectName"
          label="Object Name"
          rules={[
            {
              required: true,
              message: 'Object Name is required',
            },
          ]}
          shouldUpdate
        >
          <Input autoComplete="none" placeholder="A1" />
        </Form.Item>
      </Form>
    </Fragment>
  )
}

export default NewObject
