import { createContext, useEffect, useState } from 'react'
import './App.css'
import Layout from './_Layout'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Transactions from './Pages/Transactions'
import Dashboard from './Pages/Dashboard'
import LayananDetail from './Pages/LayananDetail'
import AddLayananDetail from './Pages/LayananDetail/AddLayananDetail'
import Staff from './Pages/Staff'
import AddStaff from './Pages/Staff/AddStaff'
import Customer from './Pages/Customer'
import AddCustomer from './Pages/Customer/AddCustomer'
import AddTransactions from './Pages/Transactions/AddTransactions'
import DetailTransactions from './Pages/Transactions/DetailTransactions'
import Auth from './Pages/Auth'
import { LogOut, token } from './Utils'
import axios from 'axios'
import { Api_Url } from './env'
import PageNotFound from './Pages/PageNotFound'

export const AppContexs = createContext<any>(null)

type UserData = {
  id: string
  role: "Admin" | "Staff"
  username: string
} | null

function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData>(null)

  const checkToken = async () => {
    try {
      const res = await axios.get(`${Api_Url}/check-token/${token}`)
      console.log(res)
      if (res.status === 200) {
        setLoggedIn(true)
        setUserData({
          id: res.data.data.id,
          role: res.data.data.role,
          username: res.data.data.username
        })
        if (pathname.includes("Login")) {
          navigate("/")
        }
        return;
      } else {
        LogOut()
        throw new Error;
      }
    } catch (error) {
      console.log("Token Invalid", error)
      if (!pathname.includes("Login")) {
        navigate("/Login")
      }
      // getError(error, "Your Session is Expired");
      return;
    }
  }

  useEffect(() => {
    if (!pathname.includes("Login")) {
      checkToken()
    }
  }, [])
  console.log(userData)

  return (
    <AppContexs.Provider value={{ userData, setUserData }}>
      <div className="">
        {loggedIn && userData && userData.role === "Staff" ?
          <Layout>
            <Routes>
              <Route path='*' element={<PageNotFound />} />
              <Route path='/' element={<Dashboard />} />
              <Route path='/Login' element={<Auth />} />
              <Route path='/Settings' element={<Dashboard />} />
              <Route path='/Transactions' element={<Transactions />} />
              <Route path='/Transactions/Detail/:nota' element={<DetailTransactions />} />
              <Route path='/Transactions/Add' element={<AddTransactions />} />
              {/* <Route path='/Staff' element={<Staff />} />
            <Route path='/Staff/Add' element={<AddStaff />} /> */}
              <Route path='/Customer' element={<Customer />} />
              <Route path='/Customer/Add' element={<AddCustomer />} />
              <Route path='/Detail-Layanan' element={<LayananDetail />} />
              <Route path='/Detail-Layanan/Add' element={<AddLayananDetail />} />
              {/* <Route path='/Layanan' element={<Layanan />} />
              <Route path='/Layanan/Add' element={<AddLayanan />} /> */}
            </Routes>
          </Layout>
          : loggedIn && userData && userData.role === "Admin" ?
            <Layout>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/Login' element={<Auth />} />
                <Route path='/Settings' element={<Dashboard />} />
                <Route path='/Transactions' element={<Transactions />} />
                <Route path='/Transactions/Detail/:nota' element={<DetailTransactions />} />
                <Route path='/Transactions/Add' element={<AddTransactions />} />
                <Route path='/Staff' element={<Staff />} />
                <Route path='/Staff/Add' element={<AddStaff />} />
                <Route path='/Customer' element={<Customer />} />
                <Route path='/Customer/Add' element={<AddCustomer />} />
                <Route path='/Detail-Layanan' element={<LayananDetail />} />
                <Route path='/Detail-Layanan/Add' element={<AddLayananDetail />} />
                {/* <Route path='/Layanan' element={<Layanan />} />
                <Route path='/Layanan/Add' element={<AddLayanan />} /> */}
              </Routes>
            </Layout>
            :
            <Routes>
              <Route path='/Login' element={<Auth />} />
            </Routes>
        }
      </div>
    </AppContexs.Provider>

  )
}

export default App

// export const userData = await getUserData()