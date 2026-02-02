import { Outlet } from 'react-router-dom'
import Navbar from './components/layouts/Navbars/Navbar'
import Footer from './components/layouts/Footer/Footer'
import 'primeicons/primeicons.css'

function App() {
    return (
        <>
            <div className="scroll-smooth">
                <Navbar />

                <main>
                    <Outlet />
                </main>

                <Footer />
            </div>
        </>
    )
}

export default App
