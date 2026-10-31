import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  SquaresFour, PencilSimple, Users, Megaphone,
  Gear, ArrowLeft, ChartBar, CurrencyDollar, Package, Eye,
  BookOpen, Gift, User, Briefcase, GraduationCap, CheckCircle,
  Plus, Trash, FloppyDisk, Upload, WarningCircle, Warning
} from "@phosphor-icons/react";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: SquaresFour },
  { id: "basics", label: "Basics", icon: PencilSimple },
  { id: "story", label: "Story", icon: BookOpen },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "people", label: "People", icon: User },
  { id: "updates", label: "Updates", icon: Megaphone },
  { id: "backers", label: "Backers & Fulfillment", icon: Users },
  { id: "mentors", label: "Mentors", icon: GraduationCap },
  { id: "vendors", label: "Vendors", icon: Briefcase },
  { id: "settings", label: "Settings", icon: Gear },
];

export function CreatorStudio() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-[#082D4D]/08 flex items-center justify-between px-6 bg-white sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="w-8 h-8 rounded-full bg-[#082D4D]/05 flex items-center justify-center text-[#082D4D] hover:bg-[#082D4D]/10 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[#082D4D] font-medium" style={{ fontFamily: CD }}>Creator Studio</span>
            <span className="text-[#082D4D]/30">/</span>
            <span className="text-[#082D4D]/60 text-sm font-medium" style={{ fontFamily: SAT }}>Evo-AIR Makeup System</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={`/campaign/${id}`}
            className="flex items-center gap-2 text-sm text-[#0F4C82] hover:text-[#082D4D] font-medium transition-colors"
            style={{ fontFamily: SAT }}
          >
            <Eye size={14} /> Preview Campaign
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#082D4D]/08 bg-[#FFFFFF] p-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full h-10 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active ? "bg-[#082D4D] text-white shadow-md" : "text-[#082D4D]/70 hover:bg-[#082D4D]/05 hover:text-[#082D4D]"
                }`}
                style={{ fontFamily: SAT }}
              >
                <item.icon size={16} className={active ? "text-white" : "text-[#082D4D]/50"} />
                {item.label}
              </button>
            );
          })}

          <div className="mt-auto pt-8">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0F4C82]/5 to-[#6FD179]/10 p-5 text-center overflow-hidden border border-[#082D4D]/10">
              <p className="text-xs font-bold text-[#082D4D] mb-1" style={{ fontFamily: SAT }}>Need assistance?</p>
              <p className="text-xs text-[#082D4D]/60 leading-relaxed mb-3" style={{ fontFamily: SAT }}>
                Your dedicated coach is available.
              </p>
              <Link to="/contact" className="h-8 flex items-center justify-center bg-white border border-[#082D4D]/10 text-xs text-[#082D4D] font-bold rounded-lg hover:border-[#082D4D]/30 transition-colors" style={{ fontFamily: SAT }}>
                Contact Coach
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-[#FDFDFD] relative" style={{ fontFamily: SAT }}>
          <div className="max-w-4xl mx-auto">
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "basics" && <BasicsTab />}
            {activeTab === "story" && <StoryTab />}
            {activeTab === "rewards" && <RewardsTab />}
            {activeTab === "people" && <PeopleTab />}
            {activeTab === "updates" && <UpdatesTab />}
            {activeTab === "backers" && <BackersTab />}
            {activeTab === "mentors" && <MentorsTab />}
            {activeTab === "vendors" && <VendorsTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// TABS COMPONENTS
// ============================================================================

function OverviewTab() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#082D4D] mb-1" style={{ fontFamily: CD, fontWeight: 400 }}>Campaign Overview</h1>
          <p className="text-[#082D4D]/60 text-sm">Monitor your campaign's performance and recent activity.</p>
        </div>
        <span className="px-4 py-1.5 bg-[#6FD179]/15 text-[#2a8a33] border border-[#6FD179]/30 rounded-full text-sm font-bold shadow-sm">Live - 19 days left</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#6FD179]/15 flex items-center justify-center mb-5 text-[#2a8a33]">
            <CurrencyDollar size={24} />
          </div>
          <p className="text-4xl text-[#082D4D] mb-2" style={{ fontFamily: SAT, fontWeight: 600 }}>₹63,500</p>
          <p className="text-sm font-medium text-[#082D4D]/60">Total Raised (127% of ₹50k goal)</p>
        </div>
        <div className="p-6 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-[#0F4C82]/10 flex items-center justify-center mb-5 text-[#0F4C82]">
            <Users size={24} />
          </div>
          <p className="text-4xl text-[#082D4D] mb-2" style={{ fontFamily: CD, fontWeight: 400 }}>248</p>
          <p className="text-sm font-medium text-[#082D4D]/60">Total Backers</p>
        </div>
        <div className="p-6 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-5 text-purple-700">
            <ChartBar size={24} />
          </div>
          <p className="text-4xl text-[#082D4D] mb-2" style={{ fontFamily: CD, fontWeight: 400 }}>4,102</p>
          <p className="text-sm font-medium text-[#082D4D]/60">Page Views (6% conversion)</p>
        </div>
      </div>

      <div className="p-8 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm">
        <h2 className="text-[#082D4D] text-xl mb-6" style={{ fontFamily: CD, fontWeight: 400 }}>Funding Progress</h2>
        <div className="h-6 bg-[#082D4D]/05 rounded-full overflow-hidden mb-4 border border-[#082D4D]/10">
          <div className="h-full bg-gradient-to-r from-[#6FD179] to-[#5bc468] rounded-full relative" style={{ width: '100%' }}>
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBsNDAtNDBINHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjE1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
          </div>
        </div>
        <div className="flex justify-between text-sm font-bold text-[#082D4D]/80">
          <span>₹63,500 Raised</span>
          <span>₹50,000 Goal</span>
        </div>
      </div>
    </div>
  );
}

function BasicsTab() {
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl text-[#082D4D] mb-1" style={{ fontFamily: CD, fontWeight: 400 }}>Basics</h1>
        <p className="text-[#082D4D]/60 text-sm">Establish the core details of your project.</p>
      </div>
      
      <div className="p-8 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm flex flex-col gap-6">
        <div>
          <label className="block text-xs font-bold uppercase text-[#082D4D]/60 tracking-wider mb-2">Project Title</label>
          <input type="text" className="w-full h-12 px-4 rounded-xl border border-[#082D4D]/20 bg-white text-[#082D4D] focus:border-[#0F4C82] outline-none transition-colors" defaultValue="Evo-AIR: The Ultimate High-Performance Makeup Airbrush System" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-[#082D4D]/60 tracking-wider mb-2">Subtitle / Short Blurb</label>
          <textarea className="w-full p-4 rounded-xl border border-[#082D4D]/20 bg-white text-[#082D4D] focus:border-[#0F4C82] outline-none resize-none h-24 transition-colors" defaultValue="Flawless, professional-grade makeup application at home. Cordless, compact, and designed for all skin types."></textarea>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase text-[#082D4D]/60 tracking-wider mb-2">Category</label>
            <select className="w-full h-12 px-4 rounded-xl border border-[#082D4D]/20 bg-white text-[#082D4D] focus:border-[#0F4C82] outline-none transition-colors appearance-none" defaultValue="Fashion & Beauty">
              <option>Technology</option>
              <option>Fashion & Beauty</option>
              <option>Creative Arts</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#082D4D]/60 tracking-wider mb-2">Subcategory</label>
            <input type="text" className="w-full h-12 px-4 rounded-xl border border-[#082D4D]/20 bg-white text-[#082D4D] focus:border-[#0F4C82] outline-none transition-colors" defaultValue="Beauty Tech" />
          </div>
        </div>

        <div className="border-t border-[#082D4D]/10 pt-6 mt-2">
          <label className="block text-xs font-bold uppercase text-[#082D4D]/60 tracking-wider mb-2">Project Image</label>
          <div className="border-2 border-dashed border-[#082D4D]/20 rounded-xl p-8 flex flex-col items-center justify-center bg-[#082D4D]/[0.02] hover:bg-[#082D4D]/05 transition-colors cursor-pointer group">
            <Upload size={28} className="text-[#082D4D]/40 mb-3 group-hover:text-[#0F4C82] transition-colors" />
            <p className="text-sm font-bold text-[#082D4D]">Click to upload project image</p>
            <p className="text-xs text-[#082D4D]/50 mt-1">16:9 ratio recommended. Max 10MB.</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-[#082D4D]/60 tracking-wider mb-2">Funding Goal (USD)</label>
          <input type="number" disabled className="w-full h-12 px-4 rounded-xl border border-[#082D4D]/10 bg-gray-50 text-[#082D4D]/50 outline-none" defaultValue="50000" />
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1"><WarningCircle size={12}/> Goal cannot be changed while campaign is live.</p>
        </div>

        <div className="pt-4">
          <button onClick={handleSave} className="h-12 px-8 bg-[#082D4D] text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#0F4C82] transition-colors shadow-md hover:shadow-lg">
            {isSaved ? <CheckCircle size={16} /> : <FloppyDisk size={16} />} 
            {isSaved ? "Saved!" : "Save Basics"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StoryTab() {
  const [story, setStory] = useState(`Introducing Evo-AIR: The Future of Flawless Makeup\nFor decades, professional makeup artists have relied on airbrushing to achieve that perfectly blended, HD-ready finish. But traditional airbrush systems are bulky, loud, cord-dependent, and intimidating for everyday users.\n\nWe decided to change that.\n\nMeet the Evo-AIR — the world's most compact, powerful, and intuitive cordless airbrush makeup system designed specifically for your daily routine.\n\nWhy Airbrush?\nAirbrush makeup goes on in a fine mist, resting gently on the skin rather than rubbing into pores. The result? A lightweight, breathable finish that covers imperfections flawlessly while looking completely natural.\n\n...`);
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl text-[#082D4D] mb-1" style={{ fontFamily: CD, fontWeight: 400 }}>Story</h1>
        <p className="text-[#082D4D]/60 text-sm">Tell potential backers who you are, what you're making, and why they should care.</p>
      </div>

      <div className="p-8 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm">
        <div className="border border-[#082D4D]/20 rounded-xl overflow-hidden flex flex-col h-[600px]">
          {/* Editor Toolbar Mock */}
          <div className="h-12 bg-gray-50 border-b border-[#082D4D]/10 flex items-center px-4 gap-4">
            <button className="font-bold text-[#082D4D]/70 hover:text-[#082D4D]">B</button>
            <button className="italic text-[#082D4D]/70 hover:text-[#082D4D]">I</button>
            <button className="underline text-[#082D4D]/70 hover:text-[#082D4D]">U</button>
            <div className="w-px h-6 bg-[#082D4D]/10"></div>
            <button className="text-sm font-medium text-[#082D4D]/70 hover:text-[#082D4D] flex items-center gap-1"><Upload size={14}/> Image</button>
            <button className="text-sm font-medium text-[#082D4D]/70 hover:text-[#082D4D] flex items-center gap-1"><Video size={14}/> Video</button>
          </div>
          <textarea 
            className="flex-1 p-6 text-sm text-[#082D4D] outline-none resize-none" 
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>

        <div className="pt-6">
          <button onClick={handleSave} className="h-12 px-8 bg-[#082D4D] text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#0F4C82] transition-colors shadow-md hover:shadow-lg">
            {isSaved ? <CheckCircle size={16} /> : <FloppyDisk size={16} />} 
            {isSaved ? "Saved!" : "Save Story"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RewardsTab() {
  const [rewards, setRewards] = useState([
    { id: 1, amount: "99", title: "Super Early Bird: Evo-AIR Starter Kit", description: "Get the complete Evo-AIR system at our lowest possible price (40% off retail).", includes: "1x Evo-AIR Compressor\n2x Foundation Pods", eta: "Dec 2026", shipping: "Worldwide (₹15)" },
    { id: 2, amount: "149", title: "Pro Bundle", description: "Everything in the starter kit plus contour and blush pods.", includes: "Pro Evo-AIR Kit\n5x Color Pods", eta: "Jan 2027", shipping: "Worldwide (₹20)" }
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const addReward = () => {
    const newId = Date.now();
    setRewards([...rewards, { id: newId, amount: "", title: "", description: "", includes: "", eta: "", shipping: "" }]);
    setEditingId(newId);
  };

  const updateReward = (id: number, key: string, value: string) => {
    setRewards(rewards.map(r => r.id === id ? { ...r, [key]: value } : r));
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#082D4D] mb-1" style={{ fontFamily: CD, fontWeight: 400 }}>Rewards</h1>
          <p className="text-[#082D4D]/60 text-sm">Set your pledge tiers and what backers get for their money.</p>
        </div>
        <button onClick={addReward} className="h-10 px-4 bg-[#6FD179] text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#5bc468] transition-colors shadow-sm">
          <Plus size={16} /> New Reward
        </button>
      </div>

      <div className="space-y-6">
        {rewards.map(reward => (
          <div key={reward.id} className="p-6 rounded-2xl border border-[#082D4D]/20 bg-white shadow-sm flex flex-col gap-6 relative group">
            {editingId === reward.id ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2 border-b border-[#082D4D]/10 pb-4">
                  <h3 className="font-bold text-[#082D4D] text-lg">Edit Reward</h3>
                  <button onClick={() => setEditingId(null)} className="h-8 px-4 bg-[#082D4D] text-white rounded-lg text-xs font-bold hover:bg-[#0F4C82]">Done</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#082D4D]/70 mb-1">Title</label>
                    <input type="text" className="w-full h-10 px-3 rounded-lg border border-[#082D4D]/20 outline-none text-sm focus:border-[#0F4C82]" value={reward.title} onChange={e => updateReward(reward.id, "title", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#082D4D]/70 mb-1">Price (₹)</label>
                    <input type="number" className="w-full h-10 px-3 rounded-lg border border-[#082D4D]/20 outline-none text-sm focus:border-[#0F4C82]" value={reward.amount} onChange={e => updateReward(reward.id, "amount", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#082D4D]/70 mb-1">Description</label>
                  <textarea className="w-full p-3 rounded-lg border border-[#082D4D]/20 outline-none text-sm h-20 resize-none focus:border-[#0F4C82]" value={reward.description} onChange={e => updateReward(reward.id, "description", e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#082D4D]/70 mb-1">Includes (One per line)</label>
                  <textarea className="w-full p-3 rounded-lg border border-[#082D4D]/20 outline-none text-sm h-20 resize-none focus:border-[#0F4C82]" value={reward.includes} onChange={e => updateReward(reward.id, "includes", e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#082D4D]/70 mb-1">Est. Delivery</label>
                    <input type="text" className="w-full h-10 px-3 rounded-lg border border-[#082D4D]/20 outline-none text-sm focus:border-[#0F4C82]" value={reward.eta} onChange={e => updateReward(reward.id, "eta", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#082D4D]/70 mb-1">Shipping</label>
                    <input type="text" className="w-full h-10 px-3 rounded-lg border border-[#082D4D]/20 outline-none text-sm focus:border-[#0F4C82]" value={reward.shipping} onChange={e => updateReward(reward.id, "shipping", e.target.value)} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button onClick={() => setEditingId(reward.id)} className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[#082D4D] hover:bg-gray-200 transition-colors"><PencilSimple size={14}/></button>
                  <button onClick={() => setRewards(rewards.filter(r => r.id !== reward.id))} className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-red-600 hover:bg-red-100 transition-colors"><Trash size={14}/></button>
                </div>
                <div className="md:w-1/3 pr-6">
                  <h3 className="text-2xl font-bold text-[#0F4C82] mb-1">${reward.amount}</h3>
                  <h4 className="font-bold text-[#082D4D] text-lg mb-2">{reward.title}</h4>
                  <p className="text-sm text-[#082D4D]/70 mb-4">{reward.description}</p>
                  {reward.includes && (
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <span className="text-xs font-bold text-[#082D4D]/50 uppercase tracking-wider block mb-2">Includes</span>
                      <ul className="text-sm text-[#082D4D] space-y-1">
                        {reward.includes.split('\n').map((inc, i) => inc.trim() && (
                          <li key={i} className="flex items-start gap-2"><CheckCircle size={14} className="text-[#6FD179] mt-0.5 shrink-0"/> {inc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-[#082D4D]/10 pt-4 md:pt-0 md:pl-6 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#082D4D]/50 uppercase tracking-wider block mb-1">Est. Delivery</span>
                    <p className="text-sm font-medium text-[#082D4D]">{reward.eta || 'TBD'}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#082D4D]/50 uppercase tracking-wider block mb-1">Shipping</span>
                    <p className="text-sm font-medium text-[#082D4D]">{reward.shipping || 'TBD'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleTab() {
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl text-[#082D4D] mb-1" style={{ fontFamily: CD, fontWeight: 400 }}>People</h1>
        <p className="text-[#082D4D]/60 text-sm">Update your creator bio and add collaborators.</p>
      </div>

      <div className="p-8 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm flex flex-col gap-6">
        <h2 className="text-xl font-bold text-[#082D4D] border-b border-[#082D4D]/10 pb-4">Creator Profile</h2>
        
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-300 relative group cursor-pointer">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Creator" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-bold">Upload</div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#082D4D]/60 tracking-wider mb-2">Display Name</label>
              <input type="text" className="w-full h-12 px-4 rounded-xl border border-[#082D4D]/20 bg-white text-[#082D4D] focus:border-[#0F4C82] outline-none" defaultValue="Sarah Jenkins" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#082D4D]/60 tracking-wider mb-2">Bio</label>
              <textarea className="w-full p-4 rounded-xl border border-[#082D4D]/20 bg-white text-[#082D4D] focus:border-[#0F4C82] outline-none resize-none h-24" defaultValue="A professional makeup artist turned beauty-tech entrepreneur. With 15 years in the industry, I wanted to bring pro-level tools to everyone."></textarea>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <button onClick={handleSave} className="h-10 px-6 bg-[#082D4D] text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#0F4C82] transition-colors">
            {isSaved ? <CheckCircle size={14} /> : <FloppyDisk size={14} />} 
            {isSaved ? "Saved!" : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

function UpdatesTab() {
  const [updates, setUpdates] = useState([
    { id: 1, title: "Production Sample A arrived! Check out the unboxing.", date: "Oct 12, 2026", comments: 24, likes: 112 },
    { id: 2, title: "We hit 100% funding! Stretch goals announced.", date: "Oct 05, 2026", comments: 56, likes: 204 },
    { id: 3, title: "Welcome to the campaign!", date: "Oct 01, 2026", comments: 12, likes: 89 },
  ]);
  const [isEditingId, setIsEditingId] = useState<number | null>(null);

  const addUpdate = () => {
    const newId = Date.now();
    setUpdates([{ id: newId, title: "New Update Title", date: "Just now", comments: 0, likes: 0 }, ...updates]);
    setIsEditingId(newId);
  };

  const updateUpdate = (id: number, val: string) => {
    setUpdates(updates.map(u => u.id === id ? { ...u, title: val } : u));
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#082D4D] mb-1" style={{ fontFamily: CD, fontWeight: 400 }}>Updates</h1>
          <p className="text-[#082D4D]/60 text-sm">Keep your backers informed with news and milestones.</p>
        </div>
        <button onClick={addUpdate} className="h-10 px-4 bg-[#6FD179] text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#5bc468] transition-colors shadow-sm">
          <Plus size={16} /> New Update
        </button>
      </div>

      <div className="space-y-4">
        {updates.map((up) => (
          <div key={up.id} className="p-5 rounded-xl border border-[#082D4D]/10 bg-white flex items-center justify-between hover:border-[#0F4C82]/30 transition-colors group">
            <div className="flex-1 pr-4">
              {isEditingId === up.id ? (
                <input 
                  type="text" 
                  className="w-full border-b border-[#082D4D]/20 outline-none text-[#082D4D] font-bold bg-transparent" 
                  value={up.title} 
                  onChange={e => updateUpdate(up.id, e.target.value)} 
                  autoFocus
                />
              ) : (
                <h3 className="font-bold text-[#082D4D] mb-1 group-hover:text-[#0F4C82] transition-colors">{up.title}</h3>
              )}
              <p className="text-xs text-[#082D4D]/50 font-medium">{up.date} • {up.comments} comments • {up.likes} likes</p>
            </div>
            {isEditingId === up.id ? (
              <button onClick={() => setIsEditingId(null)} className="h-8 px-4 bg-[#082D4D] text-white rounded-lg text-xs font-bold hover:bg-[#0F4C82]">Save</button>
            ) : (
              <button onClick={() => setIsEditingId(up.id)} className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-[#082D4D] hover:bg-gray-200"><PencilSimple size={14}/></button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BackersTab() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-[#082D4D] mb-1" style={{ fontFamily: CD, fontWeight: 400 }}>Backers & Fulfillment</h1>
          <p className="text-[#082D4D]/60 text-sm">Manage pledges, send surveys, and track shipping.</p>
        </div>
        <div className="flex gap-2">
          <button className="h-10 px-4 border border-[#082D4D]/20 text-[#082D4D] bg-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
            Send Surveys
          </button>
          <button className="h-10 px-4 bg-[#082D4D] text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#0F4C82] transition-colors shadow-sm">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#082D4D]/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase tracking-wider text-[#082D4D]/50 border-b border-[#082D4D]/10">
                <th className="p-4 font-bold">Backer</th>
                <th className="p-4 font-bold">Pledge</th>
                <th className="p-4 font-bold">Reward</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#082D4D]">
              {[
                { name: "Alex R.", amount: "₹149", reward: "Pro Bundle", status: "Survey Pending" },
                { name: "Maria S.", amount: "₹99", reward: "Starter Kit", status: "Survey Answered" },
                { name: "John D.", amount: "₹10", reward: "No Reward", status: "Complete" },
                { name: "Emma W.", amount: "₹179", reward: "Pro Bundle + Add-on", status: "Survey Pending" },
              ].map((b, i) => (
                <tr key={i} className="border-b border-[#082D4D]/05 hover:bg-gray-50/50">
                  <td className="p-4 font-medium">{b.name}</td>
                  <td className="p-4">{b.amount}</td>
                  <td className="p-4 text-[#082D4D]/70">{b.reward}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      b.status === "Complete" ? "bg-green-100 text-green-700" :
                      b.status === "Survey Answered" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>{b.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#0F4C82] hover:underline font-medium text-xs">View details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MentorsTab() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl text-[#082D4D] mb-1" style={{ fontFamily: CD, fontWeight: 400 }}>Mentorship</h1>
        <p className="text-[#082D4D]/60 text-sm">Ideakicks Exclusive: Partner with experienced creators to boost your campaign.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-purple-200 bg-purple-50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><GraduationCap size={100}/></div>
          <h2 className="text-xl font-bold text-purple-900 mb-2 relative z-10">Get Matched</h2>
          <p className="text-sm text-purple-800 mb-6 relative z-10 leading-relaxed">Boost your funding chances by 40%. Our experts help with video production, ad strategy, and supply chain.</p>
          <button className="h-10 px-6 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors relative z-10 shadow-sm">Find a Mentor</button>
        </div>
        <div className="p-6 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-[#082D4D]/50 text-sm italic mb-2">You currently have no active mentors.</p>
          <Link to="/mentors" className="text-[#0F4C82] text-sm font-bold hover:underline">Browse Mentor Directory &rarr;</Link>
        </div>
      </div>
    </div>
  );
}

function VendorsTab() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl text-[#082D4D] mb-1" style={{ fontFamily: CD, fontWeight: 400 }}>Vendor Network</h1>
        <p className="text-[#082D4D]/60 text-sm">Ideakicks Exclusive: Verified manufacturing and fulfillment partners.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Briefcase size={100}/></div>
          <h2 className="text-xl font-bold text-blue-900 mb-2 relative z-10">Manufacturing & Logistics</h2>
          <p className="text-sm text-blue-800 mb-6 relative z-10 leading-relaxed">Don't fail at fulfillment. Get quotes from vetted factories and global shipping partners.</p>
          <button className="h-10 px-6 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors relative z-10 shadow-sm">Request Quotes</button>
        </div>
        <div className="p-6 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-[#082D4D]/50 text-sm italic mb-2">No active vendor contracts.</p>
          <Link to="/vendors" className="text-[#0F4C82] text-sm font-bold hover:underline">Browse Vendor Marketplace &rarr;</Link>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const [isCancelled, setIsCancelled] = useState(false);
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel this campaign? This action cannot be undone.")) {
      setIsCancelled(true);
      setTimeout(() => alert("Campaign cancelled."), 500);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl text-[#082D4D] mb-1" style={{ fontFamily: CD, fontWeight: 400 }}>Settings</h1>
        <p className="text-[#082D4D]/60 text-sm">Manage campaign visibility and administrative details.</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="p-6 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm">
          <h2 className="text-lg font-bold text-[#082D4D] mb-4">Project Status</h2>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-lg text-sm font-bold ${isCancelled ? "bg-red-100 text-red-700" : "bg-[#6FD179]/15 text-[#2a8a33]"}`}>
              {isCancelled ? "CANCELLED" : "Currently LIVE"}
            </span>
            <p className="text-sm text-[#082D4D]/60">
              {isCancelled ? "Your project has been cancelled." : "Your project is publicly visible and accepting pledges."}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-[#082D4D]/10 bg-white shadow-sm">
          <h2 className="text-lg font-bold text-[#082D4D] mb-4">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#082D4D] border-[#082D4D]/20 focus:ring-[#0F4C82]"/>
              <span className="text-sm font-medium text-[#082D4D]">Email me for every new pledge</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#082D4D] border-[#082D4D]/20 focus:ring-[#0F4C82]"/>
              <span className="text-sm font-medium text-[#082D4D]">Email me for new comments</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-[#082D4D] border-[#082D4D]/20 focus:ring-[#0F4C82]"/>
              <span className="text-sm font-medium text-[#082D4D]">Daily summary reports</span>
            </label>
          </div>
          <button onClick={handleSave} className="h-10 px-6 bg-[#082D4D] text-white rounded-lg text-sm font-bold mt-6 hover:bg-[#0F4C82] transition-colors flex items-center gap-2">
            {isSaved ? <CheckCircle size={14} /> : null}
            {isSaved ? "Saved!" : "Save Preferences"}
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-red-200 bg-red-50 shadow-sm">
          <h2 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2"><Warning size={18}/> Danger Zone</h2>
          <p className="text-sm text-red-800 mb-6">Canceling your campaign will immediately refund all backers and cannot be undone.</p>
          <button onClick={handleCancel} disabled={isCancelled} className={`h-10 px-6 border-2 font-bold rounded-lg text-sm transition-colors ${isCancelled ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-red-600 text-red-700 hover:bg-red-600 hover:text-white'}`}>
            {isCancelled ? "Campaign Cancelled" : "Cancel Campaign"}
          </button>
        </div>
      </div>
    </div>
  );
}
