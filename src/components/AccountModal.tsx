import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen } = useCart();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isAccountOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsAccountOpen(false);
      alert(`Login link sent to ${email}`);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="fixed inset-0" onClick={() => setIsAccountOpen(false)} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 animate-[fadeIn_0.2s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-semibold text-[20px] text-neutral-900">
            Sign in or create account
          </h2>
          <button
            onClick={() => setIsAccountOpen(false)}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center cursor-pointer transition-colors"
          >
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => alert('Viewing your orders...')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-neutral-200 hover:border-black text-[13px] font-medium text-neutral-800 transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-neutral-600">
              <path d="M4.667 2.32v-.75a.75.75 0 0 0-.624.333zm-2 10.666h-.75c0 .414.336.75.75.75zm8.666-10.667.624-.416a.75.75 0 0 0-.624-.334zm2 10.667v.75a.75.75 0 0 0 .75-.75zM2.667 5.319l-.624-.416a.75.75 0 0 0-.126.416zm10.666 0h.75a.75.75 0 0 0-.126-.416zm-8 4.25a.75.75 0 0 0 0 1.5v-1.5M8 11.07a.75.75 0 0 0 0-1.5v1.5m-5.333 1.917v.75h10.666v-1.5H2.667zm2-10.667-.624-.416-2 3 .624.416.624.416 2-3zm6.666 0-.624.416 2 3 .624-.416.624-.416-2-3zm2 3h-.75v7.667h1.5V5.319zm-8.666-3v.75H8v-1.5H4.667zM8 2.32v.75h3.333v-1.5H8zm-5.333 3v.75H8v-1.5H2.667zM8 5.32v.75h5.333v-1.5H8zm0 0h.75v-3h-1.5v3zm-5.333 0h-.75v7.667h1.5V5.319zm2.666 5v.75H8v-1.5H5.333z" />
            </svg>
            <span>Orders</span>
          </button>
          <button
            onClick={() => alert('Customer profile settings')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-neutral-200 hover:border-black text-[13px] font-medium text-neutral-800 transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-4 h-4 text-neutral-600">
              <path d="M4.077 12.54c.887-1.144 2.257-1.873 3.923-1.873s3.036.73 3.923 1.873m-7.846 0A5.98 5.98 0 0 0 8 14c1.5 0 2.87-.55 3.923-1.46m-7.846 0a6 6 0 1 1 7.845 0M10 6.667a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
            </svg>
            <span>Profile</span>
          </button>
        </div>

        {/* Sign in with Shop */}
        <button
          type="button"
          onClick={() => {
            alert('Connected to Shop Pay account authentication');
            setIsAccountOpen(false);
          }}
          className="w-full py-3 px-4 rounded-xl bg-[#5433eb] hover:bg-[#4524db] text-white font-medium text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer mb-5 shadow-sm"
        >
          <span>Sign in with</span>
          <svg viewBox="0 0 60 25" fill="currentColor" className="h-4 w-auto">
            <path d="M7.74 11.067c-2.35-.509-3.396-.708-3.396-1.612 0-.85.708-1.274 2.125-1.274 1.246 0 2.157.544 2.828 1.609.05.082.155.11.24.066l2.644-1.334a.186.186 0 0 0 .076-.259c-1.098-1.9-3.125-2.94-5.794-2.94-3.507 0-5.686 1.727-5.686 4.47 0 2.914 2.653 3.65 5.006 4.16 2.353.509 3.403.708 3.403 1.612 0 .904-.765 1.33-2.293 1.33-1.41 0-2.457-.644-3.09-1.896a.185.185 0 0 0-.25-.082L.916 16.222a.188.188 0 0 0-.082.253c1.046 2.102 3.194 3.284 6.062 3.284 3.653 0 5.86-1.697 5.86-4.526 0-2.83-2.666-3.65-5.015-4.16v-.006Z" />
          </svg>
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-neutral-200" />
          <span className="px-3 text-[11px] font-semibold tracking-wider text-neutral-400">OR</span>
          <div className="flex-1 border-t border-neutral-200" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-[14px] text-neutral-900 outline-none focus:border-black transition-colors"
            />
          </div>

          <label className="flex items-start gap-2.5 text-[12px] text-neutral-600 cursor-pointer">
            <input type="checkbox" defaultChecked className="mt-0.5 rounded border-neutral-300 accent-black" />
            <span>Email me with news and secret drops</span>
          </label>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-medium text-[13px] tracking-wider uppercase transition-colors cursor-pointer"
          >
            {submitted ? 'Sending link...' : 'Continue with email'}
          </button>
        </form>
      </div>
    </div>
  );
};
