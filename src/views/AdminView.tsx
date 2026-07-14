import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Users, LayoutDashboard, LogOut, Code, History, Terminal,
  MessageSquareMore, Mail, Activity, Sun, X, Check, Plus,
} from 'lucide-react';
import type { AdminData, BlogPost, ChatMessage, RichMenu, Language, Theme, ToastState } from '../types';
import { API_BASE, API_CREDENTIALS } from '../constants';

interface AdminViewProps {
  isAuthenticated: boolean;
  authChecked: boolean;
  adminData: AdminData | null;
  blogPosts: BlogPost[];
  richMenus: RichMenu[];
  activeRichMenuId: string | null;
  isMenuLoading: boolean;
  lang: Language;
  theme: Theme;
  userFilter: string;
  pushingTo: string | null;
  pushMessage: string;
  labPrompt: string;
  labResult: string;
  isLabLoading: boolean;
  isSubmitting: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onSetToast: (toast: ToastState) => void;
  onSetUserFilter: (v: string) => void;
  onSetPushingTo: (v: string | null) => void;
  onSetPushMessage: (v: string) => void;
  onSetLabPrompt: (v: string) => void;
  onSetLabResult: (v: string) => void;
  onSetIsLabLoading: (v: boolean) => void;
  onSetIsSubmitting: (v: boolean) => void;
  onSetActiveRichMenuId: (v: string | null) => void;
  onSetIsMenuLoading: (v: boolean) => void;
  onSetEditingPost: (post: BlogPost | null) => void;
  onRefreshAdmin: () => void;
  onRefreshBlog: () => void;
  onFetchChatHistory: (user: AdminData['users'][0]) => void;
  selectedUser: AdminData['users'][0] | null;
  chatHistory: ChatMessage[];
  isHistoryLoading: boolean;
  onCloseHistory: () => void;
  editingPost: BlogPost | null;
}

const AdminView: React.FC<AdminViewProps> = ({
  isAuthenticated, authChecked, adminData, blogPosts, richMenus, activeRichMenuId,
  isMenuLoading, theme, userFilter, pushingTo, pushMessage,
  labPrompt, labResult, isLabLoading, isSubmitting,
  onToggleTheme, onLogout, onSetToast, onSetUserFilter, onSetPushingTo,
  onSetPushMessage, onSetLabPrompt, onSetLabResult, onSetIsLabLoading,
  onSetIsSubmitting, onSetActiveRichMenuId, onSetIsMenuLoading,
  onSetEditingPost, onRefreshAdmin, onRefreshBlog,
  onFetchChatHistory, selectedUser, chatHistory, isHistoryLoading,
  onCloseHistory, editingPost,
}) => {
  const aiUsage = adminData?.stats?.aiMessagesToday || 0;
  const aiQuota = 150;
  const aiPercentage = Math.min((aiUsage / aiQuota) * 100, 100);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await fetch(`${API_BASE}/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        ...API_CREDENTIALS,
        body: JSON.stringify({ status }),
      });
      onRefreshAdmin();
    } catch { alert('Update failed'); }
  };

  const handleToggleAI = async (userId: string, currentStatus: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        ...API_CREDENTIALS,
        body: JSON.stringify({ ai_enabled: currentStatus === 1 ? 0 : 1 }),
      });
      if (res.ok) { onRefreshAdmin(); onSetToast({ show: true, message: 'AI Status updated!', type: 'success' }); }
      else throw new Error();
    } catch { onSetToast({ show: true, message: 'Failed to update AI status', type: 'error' }); }
  };

  const handleUpdateTags = async (userId: string, tags: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        ...API_CREDENTIALS,
        body: JSON.stringify({ tags }),
      });
      if (res.ok) { onRefreshAdmin(); onSetToast({ show: true, message: 'Tags updated!', type: 'success' }); }
      else throw new Error();
    } catch { onSetToast({ show: true, message: 'Failed to update tags', type: 'error' }); }
  };

  const handleSetDefaultRichMenu = async (menuId: string) => {
    onSetIsMenuLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/richmenus/default/${menuId}`, {
        method: 'POST',
        ...API_CREDENTIALS,
      });
      if (res.ok) { onSetActiveRichMenuId(menuId); onSetToast({ show: true, message: 'Rich Menu updated!', type: 'success' }); }
    } catch { onSetToast({ show: true, message: 'Update failed', type: 'error' }); }
    finally { onSetIsMenuLoading(false); }
  };

  const handlePushMessage = async (userId: string) => {
    if (!pushMessage.trim()) return;
    onSetIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        ...API_CREDENTIALS,
        body: JSON.stringify({ userId, message: pushMessage }),
      });
      if (res.ok) {
        onSetToast({ show: true, message: 'Message sent successfully!', type: 'success' });
        onSetPushMessage('');
        onSetPushingTo(null);
      } else {
        const err = await res.json();
        throw new Error(err.error || 'Failed to send');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      onSetToast({ show: true, message: msg, type: 'error' });
    } finally { onSetIsSubmitting(false); }
  };

  const generateWithAI = async (customPrompt?: string) => {
    const prompt = customPrompt || labPrompt;
    if (!prompt.trim()) return;
    onSetIsLabLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/ai/gen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        ...API_CREDENTIALS,
        body: JSON.stringify({ prompt }),
      });
      if (res.ok) {
        const data = await res.json();
        onSetLabResult(data.choices[0].message.content);
        if (!customPrompt) onSetLabPrompt('');
      } else throw new Error('AI Hub unreachable. Try again later.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      onSetToast({ show: true, message: msg, type: 'error' });
    } finally { onSetIsLabLoading(false); }
  };

  const handleSavePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = {
      id: formData.get('id') as string,
      title: formData.get('title') as string,
      title_en: formData.get('title_en') as string,
      excerpt: formData.get('excerpt') as string,
      content_th: formData.get('content_th') as string,
      content_en: formData.get('content_en') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      image: formData.get('image') as string,
      category: formData.get('category') as string,
    };
    try {
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        ...API_CREDENTIALS,
        body: JSON.stringify(postData),
      });
      if (res.ok) {
        onSetToast({ show: true, message: 'Post saved successfully!', type: 'success' });
        onSetEditingPost(null);
        onRefreshBlog();
      }
    } catch { onSetToast({ show: true, message: 'Failed to save post', type: 'error' }); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', padding: '2rem 0' }}>
      <Helmet><title>Admin Hub | MYITDEV</title></Helmet>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LayoutDashboard size={32} color="var(--primary)" />
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Admin Hub</h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={onToggleTheme} className="theme-toggle" aria-label="Toggle Dark/Light Mode"><Sun size={20} /></button>
            {isAuthenticated && <button onClick={onLogout} className="theme-toggle" style={{ color: '#ef4444' }} aria-label="Logout"><LogOut size={20} /></button>}
            <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>Exit Admin</Link>
          </div>
        </div>

        {/* Auth Gate */}
        {!authChecked ? (
          <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--muted)' }}>Checking session...</div>
        ) : !isAuthenticated ? (
          <div style={{ textAlign: 'center', padding: '10rem 0' }}>
            <h2 style={{ marginBottom: '2rem' }}>Authentication Required</h2>
            <a href={`${API_BASE}/auth/login`} className="cta-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: '#06c755' }}>Login with LINE</a>
          </div>
        ) : !adminData ? (
          <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--muted)' }}>Loading dashboard...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div className="service-card" style={{ padding: '1.5rem' }}>
                <div style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><Users size={16} /> Total Leads</div>
                <div style={{ fontSize: '2rem', fontWeight: '700' }}>{adminData?.leads.length || 0}</div>
              </div>
              <div className="service-card" style={{ padding: '1.5rem' }}>
                <div style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><MessageSquareMore size={16} /> LINE Community</div>
                <div style={{ fontSize: '2rem', fontWeight: '700' }}>{adminData?.users.length || 0}</div>
              </div>
              <div className="service-card" style={{ padding: '1.5rem', borderColor: aiPercentage > 80 ? '#ef4444' : 'var(--card-border)' }}>
                <div style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={16} color={aiPercentage > 80 ? '#ef4444' : '#10b981'} /> AI Quota</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{aiUsage} / {aiQuota}</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--input-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${aiPercentage}%`, height: '100%', background: aiPercentage > 80 ? '#ef4444' : 'var(--primary)' }} />
                </div>
              </div>
            </div>

            {/* Blog CMS */}
            <div className="service-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Code size={18} /> Content Management (Blog)</h3>
                <button
                  onClick={() => onSetEditingPost({ id: '', title: '', title_en: '', excerpt: '', content_th: '', content_en: '', date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), time: '5 min', image: '', category: 'General' })}
                  className="theme-toggle" style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Plus size={16} /> New Post
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                    <th style={{ padding: '1rem', color: 'var(--muted)' }}>Post Title</th>
                    <th style={{ padding: '1rem', color: 'var(--muted)' }}>Slug/ID</th>
                    <th style={{ padding: '1rem', color: 'var(--muted)' }}>Action</th>
                  </tr></thead>
                  <tbody>
                    {(blogPosts ?? []).map((post) => (
                      <tr key={post.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                        <td style={{ padding: '1rem' }}><div style={{ fontWeight: '600' }}>{post.title}</div><div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{post.category} | {post.date}</div></td>
                        <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>{post.id}</td>
                        <td style={{ padding: '1rem' }}><button onClick={() => onSetEditingPost(post)} className="theme-toggle" style={{ padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem' }}>Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* LINE Community */}
            <div className="service-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={18} /> LINE Community</h3>
                <input type="text" placeholder="Search..." value={userFilter} onChange={(e) => onSetUserFilter(e.target.value)} style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '20px', padding: '0.4rem 1rem', fontSize: '0.8rem', color: 'var(--foreground)' }} />
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                    <th style={{ padding: '1rem', color: 'var(--muted)' }}>User</th>
                    <th style={{ padding: '1rem', color: 'var(--muted)' }}>Tags</th>
                    <th style={{ padding: '1rem', color: 'var(--muted)' }}>Bot</th>
                    <th style={{ padding: '1rem', color: 'var(--muted)' }}>Action</th>
                  </tr></thead>
                  <tbody>
                    {(adminData.users ?? [])
                      .filter(u => (u.display_name || '').toLowerCase().includes(userFilter.toLowerCase()) || (u.tags || '').toLowerCase().includes(userFilter.toLowerCase()))
                      .map((user) => (
                        <tr key={user.user_id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                          <td style={{ padding: '1rem' }}><div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><img src={user.picture_url} alt={user.display_name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} /><div>{user.display_name}</div></div></td>
                          <td style={{ padding: '1rem' }}><input type="text" defaultValue={user.tags || ''} onBlur={(e) => handleUpdateTags(user.user_id, e.target.value)} style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: 'var(--foreground)', width: '100px' }} /></td>
                          <td style={{ padding: '1rem' }}>
                            <button onClick={() => handleToggleAI(user.user_id, user.ai_enabled)} style={{ background: user.ai_enabled === 1 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: user.ai_enabled === 1 ? '#10b981' : '#ef4444', border: '1px solid currentColor', borderRadius: '20px', padding: '0.2rem 0.6rem', fontSize: '0.7rem', cursor: 'pointer' }}>
                              {user.ai_enabled === 1 ? 'AI ON' : 'MANUAL'}
                            </button>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button onClick={() => onFetchChatHistory(user)} className="theme-toggle" style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}><History size={12} /> History</button>
                              <button onClick={() => { onSetPushingTo(user.user_id); onSetPushMessage(''); }} className="theme-toggle" style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>Message</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Push Message Panel */}
            {pushingTo && (
              <div className="service-card" style={{ padding: '1.5rem', borderColor: 'var(--primary)' }}>
                <h3 style={{ marginBottom: '1rem' }}>Send Direct Message</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <textarea value={pushMessage} onChange={(e) => onSetPushMessage(e.target.value)} placeholder="Type your message..." style={{ flex: 1, height: '80px', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.75rem', color: 'var(--foreground)', resize: 'vertical' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button onClick={() => handlePushMessage(pushingTo)} disabled={isSubmitting} className="cta-button" style={{ borderRadius: '8px', padding: '0.5rem 1rem' }}>{isSubmitting ? 'Sending...' : 'Send'}</button>
                    <button onClick={() => onSetPushingTo(null)} className="theme-toggle" style={{ borderRadius: '8px' }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Rich Menu Manager */}
            <div className="service-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LayoutDashboard size={18} /> Rich Menu Manager</h3>
              {isMenuLoading ? <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>Loading...</div> : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                      <th style={{ padding: '1rem', color: 'var(--muted)' }}>Menu Name</th>
                      <th style={{ padding: '1rem', color: 'var(--muted)' }}>Status</th>
                    </tr></thead>
                    <tbody>
                      {(richMenus ?? []).map((menu) => (
                        <tr key={menu.richMenuId} style={{ borderBottom: '1px solid var(--card-border)' }}>
                          <td style={{ padding: '1rem' }}><div style={{ fontWeight: '600' }}>{menu.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{menu.chatBarText}</div></td>
                          <td style={{ padding: '1rem' }}>
                            {activeRichMenuId === menu.richMenuId
                              ? <span style={{ color: '#10b981', fontWeight: '700' }}>ACTIVE</span>
                              : <button onClick={() => handleSetDefaultRichMenu(menu.richMenuId)} className="theme-toggle" style={{ padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem' }}>Use This</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Bot Traffic */}
            <div className="service-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} color="#f59e0b" /> Bot Traffic (AI & Search Crawlers)</h3>
              <div style={{ overflowX: 'auto', maxHeight: '300px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                    <th style={{ padding: '1rem', color: 'var(--muted)', position: 'sticky', top: 0, background: 'var(--card-bg)' }}>Time</th>
                    <th style={{ padding: '1rem', color: 'var(--muted)', position: 'sticky', top: 0, background: 'var(--card-bg)' }}>Bot Name</th>
                    <th style={{ padding: '1rem', color: 'var(--muted)', position: 'sticky', top: 0, background: 'var(--card-bg)' }}>Path</th>
                    <th style={{ padding: '1rem', color: 'var(--muted)', position: 'sticky', top: 0, background: 'var(--card-bg)' }}>IP Address</th>
                  </tr></thead>
                  <tbody>
                    {!adminData?.bot_logs || adminData.bot_logs.length === 0 ? (
                      <tr><td colSpan={4} style={{ padding: '1rem', textAlign: 'center', color: 'var(--muted)' }}>No bot traffic detected yet. Check back later!</td></tr>
                    ) : (
                      adminData.bot_logs.map((log) => (
                        <tr key={log.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                          <td style={{ padding: '1rem', fontSize: '0.75rem' }}>{new Date(log.created_at + 'Z').toLocaleString('en-GB')}</td>
                          <td style={{ padding: '1rem', fontWeight: '600', color: '#f59e0b' }}>{log.bot_name}</td>
                          <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>{log.path}</td>
                          <td style={{ padding: '1rem', fontSize: '0.75rem', color: 'var(--muted)' }}>{log.ip_address}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inquiries */}
            <div className="service-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={18} /> Inquiries</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead><tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                    <th style={{ padding: '1rem', color: 'var(--muted)' }}>Status</th>
                    <th style={{ padding: '1rem', color: 'var(--muted)' }}>Customer</th>
                    <th style={{ padding: '1rem', color: 'var(--muted)' }}>Message</th>
                  </tr></thead>
                  <tbody>
                    {(adminData.leads ?? []).map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid var(--card-border)', opacity: lead.status === 'done' ? 0.6 : 1 }}>
                        <td style={{ padding: '1rem' }}>
                          <button onClick={() => handleUpdateStatus(lead.id, lead.status === 'done' ? 'new' : 'done')} style={{ border: 'none', background: lead.status === 'done' ? '#10b981' : 'rgba(59,130,246,0.1)', color: lead.status === 'done' ? '#fff' : 'var(--primary)', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer' }}><Check size={16} /></button>
                        </td>
                        <td style={{ padding: '1rem' }}><div style={{ fontWeight: '600' }}>{lead.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{lead.source}</div></td>
                        <td style={{ padding: '1rem' }}><div style={{ fontSize: '0.8rem' }}>{lead.message}</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Code Lab */}
            <div className="service-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(59,130,246,0.05), transparent)' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Terminal size={18} color="var(--primary)" /> AI Code Lab</h3>
              <div style={{ display: 'grid', gridTemplateColumns: labResult ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <textarea value={labPrompt} onChange={(e) => onSetLabPrompt(e.target.value)} placeholder="Write a program to..." style={{ height: '120px', background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '1rem', color: 'var(--foreground)' }} />
                  <button onClick={() => generateWithAI()} disabled={isLabLoading} className="cta-button" style={{ borderRadius: '12px' }}>{isLabLoading ? 'Generating...' : 'Run AI'}</button>
                </div>
                {labResult && <div style={{ background: '#1e1e1e', borderRadius: '12px', padding: '1rem', color: '#d4d4d4', overflow: 'auto', maxHeight: '300px' }}><pre style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>{labResult}</pre></div>}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* CMS Edit Modal */}
      {editingPost && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="service-card" style={{ maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h3>{editingPost.id ? 'Edit Blog Post' : 'Create New Post'}</h3>
              <button onClick={() => onSetEditingPost(null)} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Slug / ID</label><input name="id" defaultValue={editingPost.id} className="form-control" required placeholder="e.g. cloudflare-tips" /></div>
                <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Category</label><input name="category" defaultValue={editingPost.category} className="form-control" required /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Title (TH)</label><input name="title" defaultValue={editingPost.title} className="form-control" required /></div>
                <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Title (EN)</label><input name="title_en" defaultValue={editingPost.title_en} className="form-control" required /></div>
              </div>
              <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Excerpt</label><textarea name="excerpt" defaultValue={editingPost.excerpt} className="form-control" required style={{ height: '60px' }} /></div>
              <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Content (TH)</label><textarea name="content_th" defaultValue={editingPost.content_th} className="form-control" required style={{ height: '150px' }} /></div>
              <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Content (EN)</label><textarea name="content_en" defaultValue={editingPost.content_en} className="form-control" required style={{ height: '150px' }} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Image URL</label><input name="image" defaultValue={editingPost.image} className="form-control" required /></div>
                <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Date</label><input name="date" defaultValue={editingPost.date} className="form-control" required /></div>
                <div><label style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Read Time</label><input name="time" defaultValue={editingPost.time} className="form-control" required /></div>
              </div>
              <button type="submit" className="cta-button" style={{ marginTop: '1rem' }}>Save Post</button>
            </form>
          </div>
        </div>
      )}

      {/* Chat History Modal */}
      {selectedUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="service-card" style={{ maxWidth: '800px', width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', padding: 0 }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={selectedUser.picture_url} alt={selectedUser.display_name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div><div style={{ fontWeight: '700' }}>{selectedUser.display_name}</div><div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>History</div></div>
              </div>
              <button onClick={onCloseHistory} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }} aria-label="Close History"><X size={24} /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {isHistoryLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
              ) : chatHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>No history found.</div>
              ) : chatHistory.map((chat) => (
                <div key={chat.id} style={{ alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', padding: '1rem', borderRadius: '16px', background: chat.role === 'user' ? 'var(--primary)' : 'var(--input-bg)', color: chat.role === 'user' ? '#fff' : 'inherit' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.7rem', marginBottom: '0.3rem', opacity: 0.8 }}>{chat.role === 'user' ? 'USER' : 'AI BOT'}</div>
                  <div style={{ fontSize: '0.85rem' }}>{chat.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(AdminView);
