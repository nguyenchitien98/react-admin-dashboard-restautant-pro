// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { FaUserCircle, FaBell, FaLock, FaGoogle, FaFacebook, FaTwitter, FaPlus } from 'react-icons/fa';
import Switch from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';

export default function AccountPage() {
  const [pushNoti, setPushNoti] = useState(true);
  const [emailNoti, setEmailNoti] = useState(false);
  const [smsNoti, setSmsNoti] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="p-4 space-y-6">
      {/* Profile */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <FaUserCircle className="text-green-600 w-6 h-6 mr-2" />
          <h2 className="text-lg font-semibold text-green-800">Profile</h2>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src="https://i.pravatar.cc/100?img=3"
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-green-900">John Doe</p>
            <p className="text-gray-600 text-sm">john.doe@example.com</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button className="bg-green-600 hover:bg-green-700 text-white">Edit Profile</Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              console.log('Logging out...');
              // TODO: Thêm logic đăng xuất thật ở đây
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <FaBell className="text-green-600 w-6 h-6 mr-2" />
          <h2 className="text-lg font-semibold text-green-800">Notifications</h2>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <Switch checked={pushNoti} onCheckedChange={setPushNoti} />
          </div>
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Switch checked={emailNoti} onCheckedChange={setEmailNoti} />
          </div>
          <div className="flex items-center justify-between">
            <span>SMS Notifications</span>
            <Switch checked={smsNoti} onCheckedChange={setSmsNoti} />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <FaLock className="text-green-600 w-6 h-6 mr-2" />
          <h2 className="text-lg font-semibold text-green-800">Security</h2>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span>Two-Factor Authentication</span>
          <Switch checked={twoFA} onCheckedChange={setTwoFA} />
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">Change Password</Button>
      </div>

       {/* Connected Accounts */}
       <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <FaGoogle className="text-green-600 w-6 h-6 mr-2" />
          <h2 className="text-lg font-semibold text-green-800">Connected Accounts</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaGoogle className="text-red-500" />
              <span>Google</span>
            </div>
            <span className="text-green-600 font-medium">Connected</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaFacebook className="text-blue-600" />
              <span>Facebook</span>
            </div>
            <Button size="sm" variant="outline">Connect</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaTwitter className="text-black" />
              <span>Twitter</span>
            </div>
            <span className="text-green-600 font-medium">Connected</span>
          </div>
        </div>
        <Button variant="ghost" className="mt-4 flex items-center text-white hover:underline">
          <FaPlus className="mr-2 text-white" />
          Add Account
        </Button>
      </div>
      
    </div>
  );
}