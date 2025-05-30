import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import OrderManagementPage from './pages/OrderManagementPage';
import MenuManagementPage from './pages/MenuManagementPage';
import KitchenManagementPage from './pages/KitchenManagementPage';
import TableManagementPage from './pages/TableManagementPage';
import InventoryManagementPage from './pages/InventoryManagementPage';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import ReportPage from './pages/ReportPage';
import TutorialPage from './pages/TutorialPage';
import DashboardPage from './pages/DashboardPage';

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function App() {
  return (
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <DashboardPage />
              {/* <div className="p-4">Trang chủ dashboard</div> */}
            </DashboardLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <DashboardLayout>
              <OrderManagementPage />
            </DashboardLayout>
          }
        />
          <Route
          path="/menu"
          element={
            <DashboardLayout>
            <MenuManagementPage />
            </DashboardLayout>
          }
          />
          <Route
            path="/kitchen"
            element={
              <DashboardLayout>
                <KitchenManagementPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/tables"
            element={
              <DashboardLayout>
                <TableManagementPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/inventory"
            element={
              <DashboardLayout>
                <InventoryManagementPage />
              </DashboardLayout>
            }
          />
          <Route path="/employees" element={
            <DashboardLayout>
              <EmployeeManagementPage />
            </DashboardLayout>
            } />
          <Route path="/report" element={
            <DashboardLayout>
              <ReportPage />
            </DashboardLayout>
            } />
          <Route path="/tutorials" element={
            <DashboardLayout>
              <TutorialPage />
            </DashboardLayout>
            } />
      </Routes>
  );
}
