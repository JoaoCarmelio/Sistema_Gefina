import DashboardPage from "./DashboardPage";
import InvoicePage from "./InvoicePage.tsx";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router'

export default function App() {
    return <BrowserRouter>
    <nav>
        <Link to='/'>Painel Inicial</Link>
        <Link to='/faturas'>Faturas</Link>
    </nav>

    <Routes>
        <Route path="/" element={<DashboardPage/>} />

        <Route path='/faturas' element={<InvoicePage/>}/>
    </Routes>
    </BrowserRouter>
}