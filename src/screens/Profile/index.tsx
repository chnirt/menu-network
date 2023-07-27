import { Avatar, Dialog, Footer, List } from 'antd-mobile'
import { useCallback } from 'react'
import useAuth from '../../hooks/useAuth'
import { signOutFirebase } from '../../firebase/service'
import { Loading } from '../../global'

const Profile = () => {
    const { user } = useAuth()
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
    return (
        <div>
            <List mode="card">
                <List.Item
                    prefix={<Avatar src={user?.photoURL ?? ''} />}
                    description={user?.email}
                >
                    {user?.fullName}
                </List.Item>
                <List.Item onClick={handleLogout}>Log out</List.Item>
                <Footer content="@ 2004-2023 https://github.com/chnirt All rights reserved"></Footer>
            </List>
        </div>
    )
}

export default Profile
