import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, CheckCircle, Clock, Users, ShareNetwork, Bookmark, TwitterLogo, Globe, MapPin, ThumbsUp, Bell, CaretRight } from "@phosphor-icons/react";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { CAMPAIGNS } from "../data/campaigns";
import { toast } from "sonner";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";
const getTabs = (project: any) => [
  { id: "campaign", label: "Campaign" },
  { id: "rewards", label: "Rewards" },
  { id: "creator", label: "Creator" },
  { id: "faq", label: "FAQ", count: project.faqs?.length || 0 },
  { id: "updates", label: "Updates", count: project.updates },
  { id: "comments", label: "Comments", count: project.comments },
];

function Sidebar({ id, project, isSaved, onToggleSave }: { id: string | undefined; project: any; isSaved: boolean; onToggleSave: () => void }) {
  const pct = Math.min(project.funded, 100);
  return (
    <div className="lg:sticky lg:top-[140px] h-fit flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-[#0F4C82]/08 shadow-[0_12px_42px_rgba(8,45,77,0.1)] p-6 hover:shadow-[0_14px_48px_rgba(8,45,77,0.12)] transition-all duration-300">
        <div className="mb-5">
          <div className="flex items-end justify-between mb-2">
            <span className="text-[#082D4D]" style={{ fontFamily: SAT, fontSize: "2rem", fontWeight: 500 }}>{project.raised}</span>
            <span className={`text-sm font-bold ${project.funded >= 100 ? "text-[#6FD179]" : "text-[#0F4C82]"}`}>{project.funded}% funded</span>
          </div>
          <div className="h-2 bg-[#0F4C82]/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#6FD179] to-[#8be994] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-[#082D4D]/45 mt-1.5">of {project.goal} goal</p>
        </div>

        <div className="grid grid-cols-2 gap-px mb-5 border-y border-[#082D4D]/08">
          <div className="py-3 pr-3">
            <p className="text-[#082D4D] font-bold flex items-center gap-1.5 mb-0.5 text-sm">
              <Users size={13} className="text-[#6FD179]" /> {project.backers.toLocaleString()}
            </p>
            <p className="text-xs text-[#082D4D]/45">backers</p>
          </div>
          <div className="border-l border-[#082D4D]/08 py-3 pl-4">
            <p className="text-[#082D4D] font-bold flex items-center gap-1.5 mb-0.5 text-sm">
              <Clock size={13} className="text-[#6FD179]" /> {project.daysLeft}
            </p>
            <p className="text-xs text-[#082D4D]/45">days to go</p>
          </div>
        </div>

        <Link
          to={`/campaign/${id}/back`}
          className="flex items-center justify-center h-12 w-full bg-[#6FD179] text-white font-bold rounded-full hover:bg-[#5bc468] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_4px_12px_rgba(111,209,121,0.25)] mb-3"
          style={{ fontFamily: SAT }}
        >
          Back This Project
        </Link>
        <div className="flex gap-2">
          <button 
            onClick={onToggleSave}
            className={`flex-1 flex items-center justify-center gap-1.5 h-10 border rounded-full text-sm font-medium transition-all duration-200 ${
              isSaved 
                ? "bg-[#6FD179]/10 border-[#6FD179] text-[#6FD179] hover:bg-[#6FD179]/20" 
                : "border-[#0F4C82]/20 text-[#082D4D]/70 hover:border-[#0F4C82] hover:text-[#082D4D]"
            }`}
          >
            <Bookmark size={13} fill={isSaved ? "#6FD179" : "none"} /> {isSaved ? "Saved" : "Save"}
          </button>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Campaign link copied to clipboard!");
            }}
            className="flex-1 flex items-center justify-center gap-1.5 h-10 border border-[#0F4C82]/20 rounded-full text-sm text-[#082D4D]/70 font-medium hover:border-[#0F4C82] hover:text-[#082D4D] transition-colors"
          >
            <ShareNetwork size={13} /> Share
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#0F4C82]/08 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#6FD179]/20">
            <ImageWithFallback src={project.creatorAvatar} alt={project.creator} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm text-[#082D4D] font-bold flex items-center gap-1.5">{project.creator} <CheckCircle size={12} className="text-[#6FD179]" /></p>
            <p className="text-xs text-[#082D4D]/50">{project.creatorLocation}</p>
          </div>
        </div>
        <p className="text-xs text-[#082D4D]/60 leading-relaxed">{project.creatorStats.created} campaigns · {project.creatorStats.backed} backed · {project.creatorStats.successRate} success</p>
      </div>

    </div>
  );
}

function CampaignTab({ project }: { project: any }) {
  return (
    <div>
      <div className="rounded-2xl overflow-hidden mb-8 aspect-video shadow-md border border-[#082D4D]/08 relative group">
        {project.video ? (
          <video src={project.video} autoPlay loop muted playsInline className="w-full h-full object-contain bg-[#082D4D]/05" />
        ) : (
          <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-contain bg-[#082D4D]/05 hover:scale-[1.01] transition-transform duration-700" />
        )}
      </div>
      <div className="prose-like mb-8">
        {project.description.map((block: any, i: number) => {
          if (typeof block === "string") {
            return <p key={i} className="text-[#082D4D]/75 text-[0.9375rem] leading-relaxed mb-6 last:mb-0" style={{ fontFamily: SAT }}>{block}</p>;
          }
          if (block.type === "text") {
            return <p key={i} className="text-[#082D4D]/75 text-[0.9375rem] leading-relaxed mb-6 last:mb-0" style={{ fontFamily: SAT }}>{block.content}</p>;
          }
          if (block.type === "image") {
            return (
              <div key={i} className="rounded-2xl overflow-hidden my-8 border border-[#082D4D]/08 shadow-sm hover:shadow-md transition-shadow duration-300">
                <ImageWithFallback src={block.src} alt="Campaign visual" className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-500" />
              </div>
            );
          }
          if (block.type === "video") {
            return (
              <div key={i} className="rounded-2xl overflow-hidden my-8 border border-[#082D4D]/08 shadow-sm transition-shadow duration-300">
                <video src={block.src} autoPlay loop muted playsInline className="w-full h-auto object-contain" />
              </div>
            );
          }
          if (block.type === "subtitle") {
            return (
              <h3 key={i} className="text-[#082D4D] text-[1.25rem] font-normal mb-4 mt-10 pl-4 border-l-4 border-[#6FD179] leading-tight" style={{ fontFamily: CD, fontWeight: 400 }}>
                {block.content}
              </h3>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="flex flex-col gap-3 my-6 pl-2" style={{ fontFamily: SAT }}>
                {block.items.map((item: string, j: number) => (
                  <li key={j} className="flex items-start gap-3 text-[#082D4D]/75 text-[0.9375rem] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6FD179] mt-2.5 flex-shrink-0 animate-pulse" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          return null;
        })}
      </div>
      <div className="border-t border-[#082D4D]/08 pt-8 mb-8">
        <h3 className="text-[#082D4D] mb-3" style={{ fontFamily: CD, fontSize: "1.125rem", fontWeight: 500 }}>Risks & Challenges</h3>
        <p className="text-[#082D4D]/65 leading-relaxed text-sm" style={{ fontFamily: SAT }}>{project.risks}</p>
      </div>
      <Link
        to={`/campaign/${project.id}/updates`}
        className="flex items-center justify-between bg-[#FFFFFF] border border-[#082D4D]/08 rounded-2xl p-5 hover:border-[#0F4C82]/30 hover:shadow-sm transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#6FD179]/12 rounded-xl flex items-center justify-center">
            <Bell size={16} className="text-[#6FD179]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#082D4D]">Campaign Updates</p>
            <p className="text-xs text-[#082D4D]/50">{project.updates} updates posted</p>
          </div>
        </div>
        <CaretRight size={16} className="text-[#082D4D]/35 group-hover:text-[#0F4C82] group-hover:translate-x-0.5 transition-all" />
      </Link>
    </div>
  );
}

function RewardsTab({ id, project }: { id: string | undefined; project: any }) {
  return (
    <div className="flex flex-col gap-5">
      {project.rewards?.map((r: any) => (
        <div
          key={r.id}
          className={`bg-white rounded-2xl border-2 p-6 transition-all hover:-translate-y-0.5 hover:border-[#6FD179]/50 ${r.featured ? "border-[#6FD179] shadow-[0_0_0_4px_rgba(111,209,121,0.08)]" : "border-[#0F4C82]/10"}`}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              {r.featured && (
                <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6FD179] mb-1">Most popular</p>
              )}
              <p style={{ fontFamily: SAT, fontSize: "1.5rem", fontWeight: 500, color: "#0F4C82" }}>{r.amount}</p>
              <p style={{ fontFamily: CD, fontSize: "1rem", fontWeight: 400, color: "#082D4D" }}>{r.title}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-[#082D4D]">{r.backers.toLocaleString()}</p>
              <p className="text-xs text-[#082D4D]/45">backers</p>
            </div>
          </div>
          <p className="text-sm text-[#082D4D]/65 leading-relaxed mb-4" style={{ fontFamily: SAT }}>{r.description}</p>
          <ul className="flex flex-col gap-1.5 mb-4">
            {r.includes.map((item: string) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[#082D4D]/70" style={{ fontFamily: SAT }}>
                <CheckCircle size={12} className="text-[#6FD179] flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 border-t border-[#082D4D]/06 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#082D4D]/40" style={{ fontFamily: SAT }}>Estimated delivery: {r.eta}</p>
            <Link
              to={`/campaign/${id}/back?reward=${r.id}`}
              className={`h-9 px-5 rounded-full text-sm font-bold transition-colors ${r.featured ? "bg-[#6FD179] text-white hover:bg-[#5bc468]" : "border-2 border-[#0F4C82] text-[#0F4C82] hover:bg-[#0F4C82] hover:text-white"}`}
              style={{ fontFamily: SAT, display: "inline-flex", alignItems: "center" }}
            >
              Select Reward
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function CreatorTab({ project }: { project: any }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? `Unfollowed ${project.creator}` : `You are now following ${project.creator}!`);
  };

  const handleWebsite = () => {
    const url = project.id === "evo-air" ? "https://evoluir.in" : "https://ecolife-example.com";
    window.open(url, "_blank", "noopener,noreferrer");
    toast.info(`Opening ${project.creator}'s website...`);
  };

  return (
    <div>
      <div className="flex items-start gap-5 mb-8 pb-8 border-b border-[#082D4D]/08">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border border-[#0F4C82]/10 ring-4 ring-[#6FD179]/10">
          <ImageWithFallback src={project.creatorAvatar} alt={project.creator} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h2 style={{ fontFamily: CD, fontSize: "1.375rem", fontWeight: 500, color: "#082D4D" }}>{project.creator}</h2>
            <CheckCircle size={16} className="text-[#6FD179]" />
          </div>
          <p className="text-sm text-[#082D4D]/50 mb-3" style={{ fontFamily: SAT }}>
            <MapPin size={12} className="inline mr-1" />{project.creatorLocation}
          </p>
          <div className="flex gap-5">
            <div>
              <p className="text-[#082D4D] font-bold text-sm">{project.creatorStats.created}</p>
              <p className="text-xs text-[#082D4D]/45">campaigns created</p>
            </div>
            <div>
              <p className="text-[#082D4D] font-bold text-sm">{project.creatorStats.backed}</p>
              <p className="text-xs text-[#082D4D]/45">campaigns backed</p>
            </div>
            <div>
              <p className="text-[#082D4D] font-bold text-sm">{project.creatorStats.successRate}</p>
              <p className="text-xs text-[#082D4D]/45">success rate</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-[#082D4D] mb-3" style={{ fontFamily: CD, fontSize: "1.0625rem", fontWeight: 500 }}>About</h3>
      <p className="text-[#082D4D]/70 leading-relaxed mb-8 text-sm" style={{ fontFamily: SAT }}>{project.creatorAbout}</p>

      <div className="flex gap-3 mb-10">
        <button 
          onClick={handleFollow}
          className={`flex items-center gap-1.5 h-9 px-4 border rounded-full text-sm font-medium transition-all duration-200 ${
            isFollowing 
              ? "bg-[#6FD179]/10 border-[#6FD179] text-[#6FD179]" 
              : "border-[#0F4C82]/20 text-[#082D4D]/70 hover:border-[#0F4C82]"
          }`}
          style={{ fontFamily: SAT }}
        >
          <TwitterLogo size={13} fill={isFollowing ? "#6FD179" : "none"} /> {isFollowing ? "Following" : "Follow"}
        </button>
        <button 
          onClick={handleWebsite}
          className="flex items-center gap-1.5 h-9 px-4 border border-[#0F4C82]/20 rounded-full text-sm text-[#082D4D]/70 hover:border-[#0F4C82] hover:text-[#082D4D] transition-colors"
          style={{ fontFamily: SAT }}
        >
          <Globe size={13} /> Website
        </button>
      </div>

      <div className="border-t border-[#082D4D]/08 pt-8">
        <h3 className="text-[#082D4D] mb-5" style={{ fontFamily: CD, fontSize: "1.0625rem", fontWeight: 500 }}>Other Projects</h3>
        <Link to="/explore" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#0F4C82]/08 hover:border-[#0F4C82]/20 transition-colors cursor-pointer">
          <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <ImageWithFallback src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&q=80" alt="prev project" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#082D4D] mb-0.5 truncate" style={{ fontFamily: CD, fontWeight: 400 }}>AquaLight — Portable Solar Lantern</p>
            <p className="text-xs text-[#082D4D]/50" style={{ fontFamily: SAT }}>Funded · ₹28,400 raised · 2024</p>
          </div>
          <span className="text-xs font-bold text-[#6FD179] flex-shrink-0">✓ Funded</span>
        </Link>
      </div>
    </div>
  );
}

function FAQTab({ project }: { project: any }) {
  return (
    <div>
      <p className="text-sm text-[#082D4D]/55 mb-6" style={{ fontFamily: SAT }}>{(project.faqs || []).length} questions answered by the creator.</p>
      <Accordion type="single" collapsible>
        {(project.faqs || []).map((faq: any, i: number) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>
              {faq.q}
            </AccordionTrigger>
            <AccordionContent>
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function UpdatesTab({ project }: { project: any }) {
  return (
    <div>
      <p className="text-sm text-[#082D4D]/55 mb-6" style={{ fontFamily: SAT }}>{project.updates} updates from the creator.</p>
      <div className="flex flex-col gap-10">
        {(project.updatesList || []).map((u: any) => (
          <article key={u.id}>
            <p className="text-xs text-[#082D4D]/40 uppercase tracking-widest mb-2" style={{ fontFamily: SAT }}>{u.date}</p>
            <h3 className="text-[#082D4D] mb-3" style={{ fontFamily: CD, fontSize: "1.125rem", fontWeight: 500 }}>{u.title}</h3>
            {u.image && (
              <div className="rounded-xl overflow-hidden aspect-video mb-4 shadow-sm">
                <ImageWithFallback src={u.image} alt={u.title} className="w-full h-full object-cover" />
              </div>
            )}
            {u.body.split("\n\n").map((para: string, i: number) => (
              <p key={i} className="text-sm text-[#082D4D]/70 leading-relaxed mb-3 last:mb-0" style={{ fontFamily: SAT }}>{para}</p>
            ))}
            <div className="mt-4 pt-4 border-t border-[#082D4D]/06 flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-xs text-[#082D4D]/45 hover:text-[#0F4C82] transition-colors" style={{ fontFamily: SAT }}>
                <ThumbsUp size={12} /> Like update
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CommentsTab({ project }: { project: any }) {
  const [comment, setComment] = useState("");
  return (
    <div>
      <p className="text-sm text-[#082D4D]/55 mb-6" style={{ fontFamily: SAT }}>{project.comments} comments from the community.</p>
      <div className="flex flex-col gap-6 mb-8">
        {(project.commentsList || []).map((c: any) => (
          <div key={c.id} className="flex gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-[#0F4C82]/10">
              <ImageWithFallback src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-[#082D4D]" style={{ fontFamily: SAT }}>{c.name}</span>
                {c.backer && <span className="text-[0.6rem] font-bold tracking-wider uppercase text-[#6FD179]">Backer</span>}
                <span className="text-xs text-[#082D4D]/35" style={{ fontFamily: SAT }}>{c.time}</span>
              </div>
              <p className="text-sm text-[#082D4D]/70 leading-relaxed mb-2" style={{ fontFamily: SAT }}>{c.text}</p>
              <button className="flex items-center gap-1 text-xs text-[#082D4D]/35 hover:text-[#0F4C82] transition-colors" style={{ fontFamily: SAT }}>
                <ThumbsUp size={11} /> {c.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#082D4D]/08 pt-6">
        <h4 className="text-sm font-bold text-[#082D4D] mb-3" style={{ fontFamily: SAT }}>Leave a comment</h4>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Share your thoughts or ask the creator a question…"
          className="w-full px-4 py-3 rounded-xl border border-[#0F4C82]/18 bg-white text-[#082D4D] placeholder:text-[#082D4D]/30 outline-none focus:border-[#0F4C82] transition-colors text-sm resize-none mb-3"
          style={{ fontFamily: SAT }}
        />
        <button className="h-10 px-6 bg-[#082D4D] text-white text-sm font-bold rounded-full hover:bg-[#0F4C82] transition-colors" style={{ fontFamily: SAT }}>
          Post Comment
        </button>
      </div>
    </div>
  );
}



export function Campaign() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("campaign");
  const [isSaved, setIsSaved] = useState(false);

  const project = CAMPAIGNS[id as string] || CAMPAIGNS["1"];
  const tabs = getTabs(project);

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? `Removed ${project.title} from saved campaigns.` : `Saved ${project.title} to your library!`);
  };

  const renderTab = () => {
    switch (activeTab) {
      case "campaign": return <CampaignTab project={project} />;
      case "rewards": return <RewardsTab id={id} project={project} />;
      case "creator": return <CreatorTab project={project} />;
      case "faq": return <FAQTab project={project} />;
      case "updates": return <UpdatesTab project={project} />;
      case "comments": return <CommentsTab project={project} />;
      default: return <CampaignTab project={project} />;
    }
  };

  return (
    <main className="bg-[#FFFFFF] min-h-screen" style={{ fontFamily: SAT }}>
      <div className="pt-24 pb-4 container-base">
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm text-[#0F4C82] font-medium hover:underline">
          <ArrowLeft size={13} /> Back to Projects
        </Link>
      </div>

      <div className="container-base pb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#6FD179]">{project.category}</span>
          {project.funded >= 100 && (
            <span className="flex items-center gap-1 text-[0.7rem] font-bold text-[#6FD179]">
              <CheckCircle size={11} /> Goal Reached
            </span>
          )}
        </div>
        <h1 className="text-[#082D4D] leading-tight mb-4 animate-fade-in" style={{ fontFamily: CD, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 500 }}>
          {project.title}
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#0F4C82]/10 ring-2 ring-[#6FD179]/10">
            <ImageWithFallback src={project.creatorAvatar} alt={project.creator} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm text-[#082D4D]/70">by <strong className="text-[#082D4D]">{project.creator}</strong></span>
          <CheckCircle size={13} className="text-[#6FD179]" />
        </div>
      </div>

      <div className="sticky top-[68px] z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#082D4D]/08">
        <div className="container-base">
          <div className="flex overflow-x-auto" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-[0.8125rem] whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "border-[#082D4D] text-[#082D4D] font-bold"
                    : "border-transparent text-[#082D4D]/50 hover:text-[#082D4D]/80"
                }`}
                style={{ fontFamily: SAT }}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-[0.65rem] font-bold ${activeTab === tab.id ? "text-[#6FD179]" : "text-[#6FD179]/70"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-base py-8 pb-32 lg:pb-24">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div>{renderTab()}</div>
          <Sidebar id={id} project={project} isSaved={isSaved} onToggleSave={handleToggleSave} />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-md border-t border-[#082D4D]/08 px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[#082D4D] leading-none" style={{ fontFamily: SAT, fontSize: "1.25rem", fontWeight: 500 }}>{project.raised}</p>
          <p className="text-xs text-[#082D4D]/50 mt-0.5">{project.funded}% funded · {project.daysLeft}d left</p>
        </div>
        <Link
          to={`/campaign/${id}/back`}
          className="h-11 px-6 bg-[#6FD179] text-white text-sm font-bold rounded-full hover:bg-[#5bc468] transition-colors shadow-[0_4px_12px_rgba(111,209,121,0.25)] flex-shrink-0 flex items-center"
          style={{ fontFamily: SAT }}
        >
          Back This Project
        </Link>
      </div>
    </main>
  );
}
