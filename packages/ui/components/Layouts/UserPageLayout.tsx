import { Outlet } from "react-router-dom"
import { Layout } from "../../styles"
import { Sidebar } from "../Sidebar"

export const UserPageLayout = () => {
  return (
    <Layout className='mt-16'>
      <div className="flex flex-row gap-16">
        <div className="flex basis-auto shrink-1 order-0">
          <Sidebar />
        </div>
        <div className="flex grow shrink">
          <Outlet />
        </div>
      </div>
    </Layout>
  )
}

