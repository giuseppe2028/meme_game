// App.js
import './App.css'
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { MemePage } from "./pages/MemePage.jsx";
import { ResultGamePage } from "./pages/ResultGamePage.jsx";
import UserContext from "./Context/userContext.js";
import { useContext, useState } from "react";
import { HistoryPage } from "./pages/HistoryPage.jsx";
import { PageNotFound } from "./pages/PageNotFound.jsx";
import {CustomNavbar} from "./Components /Common/CustomNavbar.jsx";
import {ProfilePage} from "./pages/ProfilePage.jsx";

function App() {
    const [usernameContext, setUsernameContext] = useState('');

    return (
        <UserContext.Provider value={{ usernameContext, setUsernameContext }}>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path='/login' element={<LoginPage />} />
                <Route element={<PrivateRoutes />}>
                    <Route path='/' element={<CustomNavbar />}>
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/gamePlay' element={<MemePage />} />
                        <Route path='/gamePlay/results' element={<ResultGamePage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/history' element={<HistoryPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </UserContext.Provider>
    );
}

const PrivateRoutes = () => {
    const { usernameContext } = useContext(UserContext);
    return (
        usernameContext === '' ? <Navigate to="/login" /> : <Outlet/>
    );
}

export default App;
