import { Link, useParams } from "react-router";
import { ArrowLeft, Calendar } from "@phosphor-icons/react";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { CAMPAIGNS } from "../data/campaigns";

const CD = "'Clash Display', sans-serif";
const SAT = "'Satoshi', sans-serif";

const UPDATES = [
  {
    id: "u1",
    date: "February 7, 2026",
    title: "We hit 80% funding! Thank you!",
    image: "https://images.unsplash.com/photo-1684326203813-3986af3ecc04?w=900&q=80",
    body: `Incredible news — we've reached 80% of our goal thanks to this amazing community! We're blown away by your support and enthusiasm for our project.\n\nWith just 18 days left, we're confident we'll hit our goal and begin production. Here's what happens next: our manufacturing partner has been confirmed, tooling is underway, and we expect to begin shipping within 6 months of the campaign closing.\n\nThank you. Every single backer has made this possible.`,
    backerOnly: false,
  },
  {
    id: "u2",
    date: "January 28, 2026",
    title: "Manufacturing Partner Confirmed",
    image: "https://images.unsplash.com/photo-1448301858776-07f780e9c9da?w=900&q=80",
    body: `We're thrilled to announce that we've signed our manufacturing agreement with certified sustainable manufacturing partners.\n\nThey share our commitment to zero-waste production. We've already begun the initial tooling process.\n\nExpected first production run: Q3 2026.`,
    backerOnly: false,
  },
  {
    id: "u3",
    date: "January 15, 2026",
    title: "Campaign Launch — We're Live!",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=900&q=80",
    body: `Today is the day! After months of development, our campaign is officially live on ideakicks.\n\nWe couldn't be more excited to share this with you. Whether you've been following since the prototype days or you're discovering us now — welcome to our campaign family.\n\nWith your support, we can turn this vision into reality for thousands of supporters.`,
    backerOnly: false,
  },
];

export function CampaignUpdates() {
  const { id } = useParams();
  const project = (id && CAMPAIGNS[id]) || CAMPAIGNS["1"];
  const updatesToRender = (project.updatesList && project.updatesList.length > 0) ? project.updatesList : UPDATES;

  return (
    <main className="bg-[#FFFFFF] min-h-screen" style={{ fontFamily: SAT }}>
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Back nav */}
        <div className="pt-24 pb-4">
          <Link to={`/campaign/${id}`} className="inline-flex items-center gap-2 text-sm text-[#0F4C82] font-medium hover:underline">
            <ArrowLeft size={14} /> Back to campaign
          </Link>
        </div>

        {/* Page title */}
        <h1 className="text-[#082D4D] mb-2" style={{ fontFamily: CD, fontSize: "clamp(1.625rem, 4vw, 2.25rem)", fontWeight: 500 }}>
          Campaign Updates
        </h1>
        <p className="text-[#082D4D]/60 mb-10">{project.title}</p>

        {/* Updates list */}
        <div className="flex flex-col gap-12 pb-20">
          {updatesToRender.map((u: any) => (
            <article key={u.id} className="border-b border-[#082D4D]/08 pb-12 last:border-0">
              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-[#082D4D]/60 mb-3">
                <Calendar size={13} />
                {u.date}
              </div>

              {/* Heading */}
              <h2 className="text-[#082D4D] mb-5" style={{ fontFamily: CD, fontSize: "1.5rem", fontWeight: 500 }}>
                {u.title}
              </h2>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden mb-6 aspect-[16/8]">
                <ImageWithFallback
                  src={u.image}
                  alt={u.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body */}
              <div>
                {u.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[#082D4D]/80 leading-relaxed mb-4 last:mb-0 text-[1.0625rem]">
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
