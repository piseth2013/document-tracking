import {AppProvider, useApp} from './context/AppContext';
import LoginForm from "./components/Auth/LoginForm.tsx";
import Dashboard from "./pages/Dashboard.tsx";

const AppContent = () => {
    const { isAuthenticated } = useApp();
    return isAuthenticated ? <Dashboard /> : <LoginForm />;
};

function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

export default App;