import { Outlet } from 'react-router-dom'
import NavBar from '../components/Navbar'

const MainLayout = ()=>{
    return (
        <div>
            <NavBar/>
            <div >
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout
