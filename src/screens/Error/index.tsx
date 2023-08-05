import { Button, ErrorBlock } from 'antd-mobile'
import { Link, useRouteError } from 'react-router-dom'
import { routes } from '../../routes'

const Error = () => {
  const error: any = useRouteError()

  return (
    <div>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <ErrorBlock
        className="flex flex-col justify-center items-center"
        fullPage
        title="Oops!"
        description="Sorry, an unexpected error has occurred."
      >
        <Link to={routes.app}>
          <Button color="primary" fill="none" shape="rounded">
            Go back home
          </Button>
        </Link>
      </ErrorBlock>
    </div>
  )
}

export default Error
