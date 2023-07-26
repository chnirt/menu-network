import { SpinLoading } from 'antd-mobile'

const Loading = () => {
    return (
        <div
            role="status"
            className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
        >
            <SpinLoading color="primary" />
        </div>
    )
}

export default Loading
