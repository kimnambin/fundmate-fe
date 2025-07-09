import { Outlet } from 'react-router-dom'
import { Layout } from '../../../../../packages/ui/styles/Layout.style'

const CommonLayout = () => {
  return (
    <Layout className='mt-[40px]'>
      <Outlet />
    </Layout>
  )
}

export default CommonLayout
