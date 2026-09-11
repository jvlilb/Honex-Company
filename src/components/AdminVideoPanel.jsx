import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Trash2, Check, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ONYX_ADMIN_2026 = 'ONYX_ADMIN_2026';

const AdminVideoPanel = ({ onClose }) => {
  const { language } = useAppContext();
  const [auth, setAuth] = useState(sessionStorage.getItem('admin_auth') === '1');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('videos');
  const [error, setError] = useState(false);

  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: '', type: 'url', src: '', thumbnail: '' });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (auth) {
      setVideos(JSON.parse(localStorage.getItem('onyx_videos') || '[]'));
      setReviews(JSON.parse(localStorage.getItem('honex_reviews') || '[]'));
    }
  }, [auth]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ONYX_ADMIN_2026) {
      sessionStorage.setItem('admin_auth', '1');
      setAuth(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.src) return;
    const v = { ...newVideo, id: Date.now().toString() };
    const updated = [...videos, v];
    setVideos(updated);
    localStorage.setItem('onyx_videos', JSON.stringify(updated));
    setNewVideo({ title: '', type: 'url', src: '', thumbnail: '' });
  };

  const deleteVideo = (id) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    localStorage.setItem('onyx_videos', JSON.stringify(updated));
  };

  const updateReview = (id, approved) => {
    const updated = reviews.map(r => r.id === id ? { ...r, approved } : r);
    setReviews(updated);
    localStorage.setItem('honex_reviews', JSON.stringify(updated));
    window.dispatchEvent(new Event('reviews_updated'));
  };

  const deleteReview = (id) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem('honex_reviews', JSON.stringify(updated));
    window.dispatchEvent(new Event('reviews_updated'));
  };

  if (!auth) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 rounded-3xl p-8 max-w-sm w-full border border-white/10 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={20}/></button>
          <h2 className="text-xl font-bold text-white mb-4">Admin Access</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" autoFocus className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white" />
            {error && <p className="text-red-400 text-sm">Incorrect password</p>}
            <button type="submit" className="bg-brand-cyan text-slate-900 font-bold py-2 rounded-xl">Login</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col border border-white/10 relative overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-black text-white">Admin Dashboard</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex gap-4 px-6 pt-4 border-b border-white/10">
          <button onClick={() => setActiveTab('videos')} className={`pb-3 font-bold ${activeTab === 'videos' ? 'text-brand-cyan border-b-2 border-brand-cyan' : 'text-slate-400'}`}>Videos</button>
          <button onClick={() => setActiveTab('reviews')} className={`pb-3 font-bold ${activeTab === 'reviews' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-slate-400'}`}>Reviews</button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'videos' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 h-fit">
                <h3 className="font-bold text-white mb-4">Add New Video</h3>
                <form onSubmit={handleAddVideo} className="flex flex-col gap-3">
                  <input required placeholder="Title" value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                  <select value={newVideo.type} onChange={e => setNewVideo({...newVideo, type: e.target.value})} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm [&>option]:bg-slate-900">
                    <option value="url">External URL (MP4, YouTube src)</option>
                    <option value="embed">Embed Code (Iframe)</option>
                  </select>
                  <textarea required placeholder={newVideo.type === 'url' ? 'Video URL' : '<iframe>...</iframe>'} rows={3} value={newVideo.src} onChange={e => setNewVideo({...newVideo, src: e.target.value})} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none" />
                  <input placeholder="Thumbnail URL (optional)" value={newVideo.thumbnail} onChange={e => setNewVideo({...newVideo, thumbnail: e.target.value})} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                  <button type="submit" className="bg-brand-cyan text-slate-900 font-bold py-2 rounded-lg mt-2">Save Video</button>
                </form>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-white mb-1">Current Videos ({videos.length})</h3>
                {videos.length === 0 && <p className="text-slate-500 text-sm">No videos found.</p>}
                {videos.map(v => (
                  <div key={v.id} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="w-16 h-12 bg-slate-800 rounded flex-shrink-0 bg-cover bg-center flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url(${v.thumbnail})` }}>
                      {!v.thumbnail && <Play size={16} className="text-slate-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white truncate">{v.title}</div>
                      <div className="text-xs text-slate-400 uppercase">{v.type}</div>
                    </div>
                    <button onClick={() => deleteVideo(v.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" /> Pending Approval
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {reviews.filter(r => !r.approved).map(r => (
                    <div key={r.id} className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-white">{r.anonymous ? 'Anonymous' : r.name} {r.anonymous && <span className="text-xs font-normal text-slate-400">(Real: {r.name})</span>}</div>
                          <div className="text-xs text-slate-400">{r.role} • {r.country}</div>
                        </div>
                        <div className="flex items-center text-amber-400 font-bold text-sm"><Star size={12} className="fill-amber-400 mr-1"/> {r.rating}</div>
                      </div>
                      <p className="text-sm text-slate-300 bg-black/20 p-3 rounded-xl">"{r.quote?.en || r.quote}"</p>
                      <div className="flex gap-2 mt-auto pt-2">
                        <button onClick={() => updateReview(r.id, true)} className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 py-1.5 rounded-lg flex justify-center items-center gap-1 text-sm font-bold"><Check size={16}/> Approve</button>
                        <button onClick={() => deleteReview(r.id)} className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 py-1.5 rounded-lg flex justify-center items-center gap-1 text-sm font-bold"><Trash2 size={16}/> Delete</button>
                      </div>
                    </div>
                  ))}
                  {reviews.filter(r => !r.approved).length === 0 && <p className="text-slate-500 col-span-2">No pending reviews.</p>}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white mb-3 text-lg mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" /> Approved Reviews
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reviews.filter(r => r.approved).map(r => (
                    <div key={r.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col gap-3 opacity-70 hover:opacity-100 transition-opacity">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-white text-sm">{r.anonymous ? 'Anonymous' : r.name}</div>
                        </div>
                        <div className="flex items-center text-amber-400 font-bold text-xs"><Star size={10} className="fill-amber-400 mr-0.5"/> {r.rating}</div>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">"{r.quote?.en || r.quote}"</p>
                      <div className="flex gap-2 mt-auto pt-2">
                        <button onClick={() => updateReview(r.id, false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-1 rounded border border-white/10 text-xs">Revoke</button>
                        <button onClick={() => deleteReview(r.id)} className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-1 rounded border border-red-500/20 text-xs"><Trash2 size={12}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
export default AdminVideoPanel;
