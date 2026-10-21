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
    <aside>
        
    <nav>
        <ul>
            <li>
                <Link to='/'>Painel Inicial</Link>
            </li>
            <li>
                <Link to='/faturas'>Faturas</Link>
            </li>
        </ul> 
    </nav>
  </aside>

   <main>
    <Routes>
        <Route path="/" element={<DashboardPage/>} />

        <Route path='/faturas' element={<InvoicePage/>}/>
    </Routes>
    </main>
    
    </BrowserRouter>
}