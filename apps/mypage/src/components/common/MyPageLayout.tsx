import { Outlet } from 'react-router-dom'
import { Layout } from '../../../../../packages/ui/styles/Layout.style'
import Sidebar from './Sidebar'

const MyPageLayout = () => {
  return (
    <Layout className='mt-[40px]'>
      <div className='flex flex-row gap-16'>
        <div className='flex basis-auto shrink-1 order-0'>
          <Sidebar />
        </div>
        <div className='flex grow shrink'>
          <Outlet />
        </div>
      </div>

    </Layout>
  )
}

export default MyPageLayout
