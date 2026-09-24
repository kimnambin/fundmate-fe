import { Outlet } from "react-router-dom"
import { Layout } from "../../styles"
import { Sidebar } from "../Sidebar"

export const UserPageLayout = () => {
  return (
    <Layout className='mt-16'>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="flex w-full lg:w-auto basis-auto shrink-1 order-0">
          <Sidebar />
        </div>
        <div className="flex grow shrink min-w-0">
          <Outlet />
        </div>
      </div>
    </Layout>
  )
}

