
import React, { useState, useEffect } from 'react';

const AdminPanel: React.FC = () => {
  const [stats, setStats] = useState({
    users: 0,
    rooms: 0,
    reports: 0
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('tbym_all_users') || '[]');
    const rooms = JSON.parse(localStorage.getItem('tbym_rooms') || '[]');
    setStats({
      users: users.length,
      rooms: rooms.length,
      reports: 0
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-10">Admin Control Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard label="Total Discerners" value={stats.users} />
        <StatCard label="Active Rooms" value={stats.rooms} />
        <StatCard label="Pending Reports" value={stats.reports} color="text-red-600" />
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 bg-stone-50">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">System Activity</h2>
        </div>
        <div className="divide-y divide-stone-100">
          <ActivityRow user="Sarah D." action="Completed Emotional Module" time="2 mins ago" />
          <ActivityRow user="Rahul K." action="Created New Room" time="15 mins ago" />
          <ActivityRow user="Priya S." action="Joined Room VAX391" time="1 hour ago" />
          <ActivityRow user="James P." action="Exported Summary Report" time="3 hours ago" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }: { label: string, value: number, color?: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm text-center">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
    <p className={`text-4xl font-bold ${color || 'text-slate-900'}`}>{value}</p>
  </div>
);

const ActivityRow = ({ user, action, time }: { user: string, action: string, time: string }) => (
  <div className="p-4 flex items-center justify-between hover:bg-stone-50 transition">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">{user[0]}</div>
      <div>
        <p className="text-sm font-bold text-slate-900">{user}</p>
        <p className="text-xs text-slate-500">{action}</p>
      </div>
    </div>
    <span className="text-[10px] font-bold text-slate-300 uppercase">{time}</span>
  </div>
);

export default AdminPanel;
