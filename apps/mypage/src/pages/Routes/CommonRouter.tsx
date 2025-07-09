import { Route, Routes } from 'react-router-dom';
import UserProfileSetting from '../UserProfileSettings/UserProfileSettings';
import Withdrawal from '../withdrawal/withdrawal';
import CommonLayout from '../../components/common/CommonLayout';

const CommonRouter = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />}>
        <Route path="/userprofile/settings" element={<UserProfileSetting />} />
        <Route path="withdrawal" element={<Withdrawal />} />
      </Route>
    </Routes>
  )
}

export default CommonRouter
