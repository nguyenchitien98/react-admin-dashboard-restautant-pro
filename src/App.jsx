import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
import Sidebar1 from './components/Sidebar1';
import OrderManagementPage from './pages/OrderManagementPage';
import MenuManagementPage from './pages/MenuManagementPage';
import KitchenManagementPage from './pages/KitchenManagementPage';
import TableManagementPage from './pages/TableManagementPage';
import InventoryManagementPage from './pages/InventoryManagementPage';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import ReportPage from './pages/ReportPage';
import TutorialPage from './pages/TutorialPage';
import DashboardPage from './pages/DashboardPage';
import AccountPage from './pages/AccountPage';
import NotificationsPage from './pages/NotificationsPage';
import { useEffect, useState, useRef } from 'react';
import SidebarNotification from './components/ui/SidebarNotification';
import POSPage from './pages/POSPage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import DeviceManagementPage from './pages/DeviceManagementPage';

function DashboardLayout({ children }) {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('error');

  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotificationMessage('🔔 Có đơn hàng mới vừa tạo!');
      setNotificationType('succes');
      setShowNotification(true);

      // Phát âm thanh
      if (audioRef.current) {
        audioRef.current.play().catch((e) => {
          console.warn('Cannot auto-play sound:', e);
        });
      }

      // 3 giây sau tắt thông báo
      setTimeout(() => setShowNotification(false), 5000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-background">
        <Sidebar1 />
        <main className="flex-1">{children}</main>
      </div>

       {/* Notification */}
       <SidebarNotification
        message={notificationMessage}
        visible={showNotification}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />

      {/* Âm thanh ping */}
      <audio ref={audioRef} src="/sounds/ding.wav" preload="auto" />
    </>
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
            <Route
              path="/accounts"
              element={
                <DashboardLayout>
                  <AccountPage />
                </DashboardLayout>
              }
            />
            <Route path="/notifications"
            element={
              <DashboardLayout>
                <NotificationsPage />
              </DashboardLayout>
            }/>
            <Route path="/pos" element={
            <DashboardLayout>
              <POSPage />
            </DashboardLayout>
          } />
          <Route path="/product-categories" element={
          <DashboardLayout>
            <ProductCategoryPage />
          </DashboardLayout>
        } />
        <Route path="/device" element={
          <DashboardLayout>
            <DeviceManagementPage />
          </DashboardLayout>
        } />
      </Routes>
  );
}
