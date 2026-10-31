export const CAMPAIGNS: Record<string, any> = {
  "1": {
    id: "1",
    title: "EcoLife: Revolutionary Solar-Powered Water Purifier",
    creator: "Sarah Martinez",
    creatorHandle: "@sarahmartinez",
    creatorLocation: "San Francisco, CA",
    creatorAvatar: "https://images.unsplash.com/photo-1768471126011-2e2002832826?w=200&q=80",
    creatorAbout: "Sarah is a product designer and sustainability advocate with 10 years of experience in consumer hardware. Before EcoLife, she led design at a water treatment startup in Southeast Asia.",
    creatorStats: { created: 2, backed: 15, successRate: "100%" },
    category: "Technology",
    image: "https://images.unsplash.com/photo-1684326203813-3986af3ecc04?w=1200&q=80",
    funded: 127,
    backers: 2847,
    daysLeft: 18,
    raised: "₹63,500",
    goal: "₹50,000",
    description: [
      { type: "text", content: "EcoLife is a revolutionary solar-powered water purifier designed for both home use and outdoor adventures. Using cutting-edge photovoltaic cells and multi-stage filtration, EcoLife can purify up to 2 liters of water per hour using only sunlight." },
      { type: "text", content: "After 3 years of research and development, we've created a product that's not just functional — it's beautiful. The sleek, minimal design fits into any home while having the rugged durability needed for off-grid living." },
      { type: "text", content: "Our multi-stage filtration removes 99.99% of bacteria, viruses, heavy metals, and microplastics. The solar panel charges a built-in battery that provides 8 hours of purification in complete darkness. No filters to replace for the first 2 years of standard use." },
    ],
    risks: "Our main risk is manufacturing scale. We've successfully produced 500 units in our pilot run, but scaling to 5,000+ introduces new challenges.",
    updates: 12,
    comments: 41,
    rewards: [
      {
        id: "r1", amount: "₹25", title: "Supporter", description: "Thank you for believing in EcoLife.", backers: 423, eta: "Q1 2027",
        includes: ["Digital thank you card", "Backer name on website"]
      },
      {
        id: "r2", amount: "₹149", title: "EcoLife Unit — Early Bird", description: "One complete EcoLife water purifier.", backers: 1847, eta: "Q1 2027",
        includes: ["One EcoLife unit", "Free worldwide shipping"], featured: true
      }
    ],
    faqs: [
      { q: "What filtration stages does EcoLife use?", a: "EcoLife uses a 4-stage system..." }
    ],
    updatesList: [
      { id: "u1", date: "May 10, 2026", title: "Manufacturing partner confirmed", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", body: "We're thrilled..." }
    ],
    commentsList: [
      { id: "c1", name: "David Chen", avatar: "https://images.unsplash.com/photo-1571059315340-08a148d5c412?w=100&q=80", backer: true, time: "2 days ago", text: "Backed the Family Pack!", likes: 12 }
    ]
  },
  "evo-air": {
    id: "evo-air",
    title: "Evo-AIR: The Ultimate High-Performance Makeup Airbrush System",
    creator: "Evoluir Beauty",
    creatorHandle: "@evoluir_beauty",
    creatorLocation: "Ahmedabad, India",
    creatorAvatar: "/campaigns/evo-air/logo.png",
    creatorAbout: "Evoluir is on a mission to democratize professional beauty. By blending cutting-edge hardware design with luxurious cosmetics, we are redefining how everyday users and professional artists experience makeup application. Our founder, a former aerospace engineer turned beauty innovator, spent three years developing the micro-compressor technology that powers Evo-AIR. We believe beauty tools should be hygienic, intuitive, and universally accessible.",
    creatorStats: { created: 1, backed: 0, successRate: "First Campaign" },
    category: "Beauty & Tech",
    image: "/campaigns/evo-air/box.png",
    video: "/campaigns/evo-air/reveal-video.mp4",
    funded: 410,
    backers: 4205,
    daysLeft: 12,
    raised: "₹307,500",
    goal: "₹75,000",
    description: [
      { type: "image", src: "/campaigns/evo-air/img1.png" },
      { type: "subtitle", content: "A Necessary Beauty Revolution" },
      { type: "text", content: "For decades, makeup application has remained tied to outdated tools that compromise both hygiene and precision. Traditional brushes collect bacteria, sponges absorb and waste expensive products, and fingertips transfer oils and impurities directly onto the skin. Even with the best products, achieving a smooth, professional-quality finish often demands years of practice and the user’s precious time every day." },
      { type: "text", content: "It is about time to change that. Evo-AIR is here to change that." },
      { type: "text", content: "Engineered over three years with relentless research and development, Evo-AIR brings the precision of professional airbrush technology into a sleek, portable device designed for everyday use. By transforming liquid makeup into an ultra-fine and even finish, delivering seamless, streak-free coverage while minimizing product waste and completely eliminating direct skin contact." },
      { type: "image", src: "/campaigns/evo-air/img2.png" },
      { type: "subtitle", content: "The Ultimate Upgrade" },
      { type: "list", items: [
        "Even Application: Advanced atomization of liquid into an even mist, creating a seamles, streak free, second- skin finish",
        "100% Contactless Application : Eliminate brushes, sponges, and direct skin contact with a cleaner hygienic makeup routine.",
        "Coverage Control: Effortlessly switch from a natural everyday glow to full-glam coverage with complete control over every application.",
        "No More Salon Visits: Achieve salon-quality, red-carpet-worthy makeup with the comfort of your own home.",
        "Minimal Product Waste: Advanced atomization ensures that more makeup reaches your skin than the tools used to apply it, maximizing the use of every liquid applicant drop.",
        "Healthier for Your Skin: The contactless applicationrastically reduces the infusion of acne-causing bacteria, oils and contamination on skin.",
        "Designed for Everyone: Whether a beginner or a professional, Evo-AIR makes flawless application simple, intuitive, and easy to repeat."
      ]},
      { type: "image", src: "/campaigns/evo-air/img3.png" },
      { type: "subtitle", content: "Evo Fills" },
      { type: "text", content: "At the heart of the Evo-AIR experience are Evo-Fills, our proprietary magnetic capsules designed to make switching products as effortless as applying them. Foundation to blush to concealer to highlighter. Just a snap-and- spray. No twisting, no pouring, no unnecessary steps." },
      { type: "text", content: "Every Evo-Fill is engineered with a transparent viewing window, allowing you to instantly identify its contents and monitor remaining product at a glance." },
      { type: "text", content: "Choose the Evo-Fill that fits your routine:\n\nPre-Filled Evo-Fills: Filled with our premium, skin-loving formulations and available in an expansive 40-shade range, delivering professional-quality results straight out of the box.\nRefillable Evo-Fills: Designed for complete flexibility, allowing you to use your preferred liquid foundation, serum, primer, or toner without compromising the Evo-AIR experience." },
      { type: "image", src: "/campaigns/evo-air/evofills-extra.png" },
      { type: "subtitle", content: "Precision Control and Portability" },
      { type: "text", content: "The idea was not to just make the airbush but the smartest airbrush. Evo-AIR features dedicated pressure control sliders. Simply slide up and get a higher pressure prefered for body art, neck coverage and thicker formulas and slide down to get a lower pressure prefered for targeted blushes, under eye concealer and sensitive skin areas." },
      { type: "text", content: "Evo-AIR is exceptionally lightweight, weighing less than a modern day smartphone and designed for perfect hand balance, making the makeup experience completely seamless. It charges with a USB type-C, making it accessible for every event. A single 45 min charge yields over 3 weeks of daily use" },

      { type: "subtitle", content: "Versatility Unleashed" },
      { type: "text", content: "Evo AIR capabilities extend far beyond a single foundation product. The device is compatible with a wide range of sprayable liquid formulations, making it suitable for both makeup and personal care applications." },
      { type: "text", content: "Liquid blush, liquid highlighter, skincare serums, hair root touch-ups, and body paint can all be applied using the same atomization technology, delivering an even, consistent finish across different formulations. By replacing multiple application methods with a single device." },
      { type: "subtitle", content: "The Science of Atomization" },
      { type: "text", content: "Traditional application methods push makeup INTO your pores, creating a heavy, cakey look that clogs your skin and leads to breakouts. Evo-AIR works differently." },
      { type: "text", content: "Using our patented Micro-Aero compression engine, Evo-AIR forces liquid makeup through a precision-milled 0.3mm nozzle. As the liquid meets the high-velocity air stream, it shatters into thousands of microscopic droplets—a process known as atomization. When these droplets land on your skin, they form an ultra-thin, breathable matrix that sits ON TOP of your pores, rather than sinking into them." },
      { type: "text", content: "This results to a soft-focus, real-life filter effect that looks exactly like your skin, but flawlessly even. It’s waterproof, sweat-resistant, and lasts up to 18 hours without creasing." },
      { type: "subtitle", content: "Minimal Waste, Maximum Application" },
      { type: "text", content: "Traditional makeup tools often absorb a significant amount of product before it ever reaches your skin, leading to unnecessary waste and inconsistent application. Evo-AIR ensures that the makeup application is at the right place." },
      { type: "text", content: "Its precision atomization technology disperses liquid makeup into an ultra-fine mist, allowing a small amount of product to cover a larger surface evenly. As a result, less makeup is required to achieve the same level of coverage, helping every bottle go further while reducing product waste over time." },
      { type: "subtitle", content: "The Journey And Specifications" },
      { type: "text", content: "It took us over 2 years, 14 different functional prototypes, and countless hours of engineering to perfect the airflow dynamics and magnetic seal tolerances. We invented a custom micro-compressor that had enough power to atomize thicker foundations but quiet enough not to wake up your partner in the morning." },
      { type: "list", items: [
        "Dimensions: 145mm x 42mm x 42mm",
        "Weight: 210g",
        "Battery: 1200mAh Lithium-Ion (USB-C Fast Charging)",
        "Pressure Output: 15-25 PSI (Adjustable)",
        "Nozzle Size: 0.3mm Precision Milled Stainless Steel",
        "Noise Level: < 45dB (Quieter than an electric toothbrush)"
      ]},
      { type: "text", content: "We are finally ready for mass production. The tooling is paid for, the supply chain is secured, and we just need your support to meet our factory’s Minimum Order Quantity (MOQ). Back us today and be a part of movemnt to revolutionize the beauty industry." }
    ],
    risks: "Manufacturing hardware is inherently complex. Our primary challenge lies in scaling the production of the magnetic seal tolerances for the refillable Evo-Fills to ensure zero leakage under high pressure. However, we have partnered with a premier precision manufacturing facility in Taiwan that specializes in medical-grade fluid dynamics, and we have already passed initial stress tests. Should any supply chain delays arise with the lithium-ion battery components, we have two secondary suppliers on standby. We commit to maintaining full, radical transparency with our backers every step of the way.",
    updates: 4,
    comments: 182,
    rewards: [
      {
        id: "evo-r1", amount: "₹15", title: "Evoluir Supporter", description: "Join the beauty revolution. Get exclusive behind-the-scenes updates, a digital thank you package, and our deepest gratitude for bringing this vision to life.", backers: 312, eta: "Nov 2026",
        includes: ["Backer-exclusive updates", "Digital thank you package", "Name on Supporter Wall"]
      },
      {
        id: "evo-r2", amount: "₹129", title: "Evo-AIR Starter Kit (Early Bird)", description: "Get the revolutionary Evo-AIR device plus 2 Refillable Evo-Fills at an exclusive Early Bird discount. (Save 40% off MSRP)", backers: 2150, eta: "Dec 2026",
        includes: ["1x Evo-AIR Device", "2x Refillable Evo-Fills", "USB-C Charging Cable", "Travel Pouch"], featured: true
      },
      {
        id: "evo-r3", amount: "₹199", title: "The Complete Beauty Arsenal", description: "Everything you need for a full face. The device, refillable pods, and a curated set of our premium pre-filled foundations and blushes.", backers: 1405, eta: "Dec 2026",
        includes: ["1x Evo-AIR Device", "4x Refillable Evo-Fills", "3x Pre-filled Foundations (Your Shade)", "2x Pre-filled Blushes", "Premium Hard Case"]
      },
      {
        id: "evo-r4", amount: "₹499", title: "Professional Artist Bundle", description: "Designed specifically for working MUAs. Two devices, a massive assortment of fills, and a one-on-one virtual masterclass with our lead makeup artist.", backers: 338, eta: "Jan 2027",
        includes: ["2x Evo-AIR Devices", "10x Refillable Evo-Fills", "Full Pre-filled Shade Range (12x)", "Virtual Masterclass", "Pro Carrying Case"]
      }
    ],
    faqs: [
      { q: "Can I use my own foundation?", a: "Yes! The Refillable Evo-Fills are designed specifically so you can use any water-based or silicone-based liquid makeup. Just pour it in, snap it on, and spray. It works with 95% of liquid foundations on the market." },
      { q: "How do I clean the Evo-Fills?", a: "Cleaning is effortless. For the refillable pods, simply add a few drops of our cleaning solution (or warm water and mild soap), attach it to the device, and spray through until it runs clear. It takes less than 30 seconds." },
      { q: "Is the Evo-AIR travel friendly?", a: "Absolutely. It's perfectly sized for your carry-on luggage and the internal battery is TSA-approved. The magnetic caps on the Evo-Fills ensure they won't leak in transit due to cabin pressure changes." },
      { q: "How long does the battery last?", a: "A full charge via the included USB-C cable takes about 90 minutes and provides up to 45 minutes of continuous spraying. For an average daily routine (which takes about 2 minutes with Evo-AIR), that's over 3 weeks of use on a single charge." },
      { q: "Is it loud?", a: "No. Traditional airbrush compressors are loud and bulky. We engineered a proprietary micro-compressor that operates at a very low decibel level, making it quieter than an electric toothbrush." },
      { q: "Does it come with a warranty?", a: "Yes, every Evo-AIR device comes with a comprehensive 1-year manufacturer warranty covering any defects in materials or workmanship." }
    ],
    updatesList: [
      { 
        id: "u4", 
        date: "May 25, 2026", 
        title: "Behind the Design: The Evo-Fills Magnetic Coupling System", 
        image: "/campaigns/evo-air/interchangeable_fills.png",
        body: "Happy Monday, Backers!\n\nToday, we want to give you an exclusive deep-dive into the engineering behind our proprietary Evo-Fills. When we started designing the Evo-AIR, one of our primary goals was to completely eliminate the mess and frustration associated with traditional airbrush makeup systems. Usually, changing colors means taking apart the gun, cleaning the needle, and pouring new paint into an open cup.\n\nWe solved this with our magnetic Evo-Fills.\n\nAs you can see in the render above, the Evo-Fills feature a custom-machined rare-earth magnetic ring at the base. This mates perfectly with the receiver on the main compressor body. The alignment is completely automatic—you literally just drop the pod into place and it snaps perfectly, creating an instant 100% airtight seal capable of withstanding 30 PSI of internal pressure.\n\nBecause the seal is airtight, the makeup inside the pod never dries out, and you never have to clean the device between color swaps. Just swap your foundation pod for your blush pod, and you're ready to go. It's the Nespresso of makeup!" 
      },
      { 
        id: "u3", 
        date: "May 22, 2026", 
        title: "Funding Goal Crushed in 4 Hours! 🎉", 
        image: "/campaigns/evo-air/device.png",
        body: "We are absolutely speechless. When we launched Evo-AIR this morning, we hoped we would reach our ₹75,000 goal by the end of the week. You helped us crush it in just under 4 hours!\n\nThank you to every single one of our early backers. Your belief in our mission to revolutionize beauty application means the world to us. Because we hit our goal so quickly, we are already accelerating our tooling deposits with the factory.\n\nStay tuned, because we are going to announce some incredible Stretch Goals tomorrow!" 
      },
      { 
        id: "u2", 
        date: "May 24, 2026", 
        title: "Stretch Goal #1 Unlocked: Premium Hard Case", 
        image: "/campaigns/evo-air/power_battery.png",
        body: "You did it! We just crossed ₹150,000 in funding, which means our first Stretch Goal is officially UNLOCKED.\n\nEvery backer at the 'Complete Beauty Arsenal' tier and above will now receive a free upgrade to our Premium Hard Case (a ₹35 retail value). This case features custom high-density foam cutouts that perfectly cradle your Evo-AIR device and up to 6 Evo-Fills, ensuring safe and stylish travel.\n\nLet's keep the momentum going! If we reach ₹300,000, we will unlock exclusive new colorways for the device." 
      },
      { 
        id: "u1", 
        date: "May 25, 2026", 
        title: "Tooling completed for the magnetic mounts", 
        image: "/campaigns/evo-air/box.png",
        body: "Behind-the-scenes update! The steel molds for the magnetic Evo-Fill attachments are finished and the first T1 samples have arrived at our office.\n\nWe spent the entire weekend testing them, and we are thrilled to report that the snap feels secure, satisfying, and forms a perfect airtight seal. We tested them with water, thick silicone foundation, and heavy serums, and experienced zero leakage at max pressure.\n\nCheck out the video above to hear that satisfying 'click'!" 
      }
    ],
    commentsList: [
      { id: "c1", name: "Jessica R.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", backer: true, time: "3 hours ago", text: "I've been waiting for something exactly like this! As a bridal MUA, hygiene and speed are everything. I currently lug around a heavy compressor. Backed the Pro Bundle!", likes: 45 },
      { id: "c2", name: "Elena Gomez", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", backer: true, time: "1 day ago", text: "Does it work well with very liquid skincare serums like Hyaluronic Acid?", likes: 12 },
      { id: "creator-reply-1", name: "Evoluir Beauty", avatar: "/campaigns/evo-air/logo.png", backer: false, time: "20 hours ago", text: "Hi Elena! Yes, it works beautifully with liquid serums. In fact, atomizing the serum helps it absorb much faster and more evenly into the skin compared to rubbing it in with your hands.", likes: 34 },
      { id: "c3", name: "Michelle D.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", backer: true, time: "2 days ago", text: "I hate washing brushes. Literally my least favorite chore. If this works as well as the video shows, it's going to change my life. Will there be international shipping?", likes: 8 }
    ]
  },
  "scrubbitt": {
    id: "scrubbitt",
    title: "Scrubbitt: Done Before It Used To Start",
    creator: "Scrubbitt Home",
    creatorHandle: "@scrubbitt_home",
    creatorLocation: "Ahmedabad, India",
    creatorAvatar: "/campaigns/scrubbitt/logo.png",
    creatorAbout: "We are a team of home product designers dedicated to making kitchen chores effortless. With Scrubbitt, we are introducing a fast, powerful, and aesthetically pleasing electric brush that redefines how you clean.",
    creatorStats: { created: 1, backed: 2, successRate: "First Campaign" },
    category: "Home & Kitchen",
    image: "/campaigns/scrubbitt/banner.jpg",
    funded: 185,
    backers: 450,
    daysLeft: 24,
    raised: "₹1,800,000",
    goal: "₹500,000",
    description: [
      { type: "subtitle", content: "Done Before It Used To Start" },
      { type: "text", content: "Cleaning the kitchen is a chore nobody looks forward to. The endless scrubbing, the greasy pots, and the stubborn sink stains take up time and energy you'd rather spend elsewhere. We knew there had to be a better way." },
      { type: "text", content: "Enter Scrubbitt. We've engineered an electric kitchen brush that does the hard work for you. With a high-torque motor and ergonomic design, Scrubbitt effortlessly cuts through grease, grime, and baked-on food in seconds." },
      { type: "image", src: "/campaigns/scrubbitt/action.jpg" },
      { type: "subtitle", content: "Powerful, Effortless Cleaning" },
      { type: "text", content: "Whether it's your delicate glassware, greasy pans, or the kitchen sink itself, Scrubbitt's interchangeable brush heads adapt to any surface. The water-resistant body means you can use it right in the sink without worry, keeping your hands clean and saving you from rigorous scrubbing." },
      { type: "image", src: "/campaigns/scrubbitt/colors.jpg" },
      { type: "subtitle", content: "Designed for the Modern Kitchen" },
      { type: "text", content: "Kitchen tools shouldn't be eyesores. Scrubbitt features a sleek, minimalist design that looks beautiful on your countertop. Available in two stunning finishes—Sage Green and Slate White—it perfectly complements any modern kitchen aesthetic." },
      { type: "image", src: "/campaigns/scrubbitt/counter.jpg" },
      { type: "subtitle", content: "Always Ready When You Are" },
      { type: "text", content: "With a long-lasting rechargeable battery, Scrubbitt is always ready to tackle the mess. Its compact, cordless design means it can sit elegantly next to your sink, always within reach for those quick post-dinner cleanups." },
      { type: "image", src: "/campaigns/scrubbitt/packaging.png" },
      { type: "subtitle", content: "What's in the Box" },
      { type: "text", content: "Every Scrubbitt comes in premium, eco-friendly packaging, making it a perfect gift for yourself or a loved one. The standard kit includes the Scrubbitt device, two multi-surface brush heads, and a USB-C charging cable." }
    ],
    risks: "As with any hardware product, there are risks related to manufacturing and supply chain delays. We have partnered with reliable manufacturers and have our first production-ready prototypes. We are confident in our timeline but will maintain transparent communication with all backers if any unforeseen delays occur.",
    updates: 2,
    comments: 84,
    rewards: [
      {
        id: "scrub-r1", amount: "₹100", title: "Show your support", description: "Thanks for supporting our campaign! You'll receive updates and our eternal gratitude.", backers: 45, eta: "Oct 2026",
        includes: ["Campaign updates"]
      },
      {
        id: "scrub-r2", amount: "₹3,499", title: "Scrubbitt Early Bird", description: "Get the Scrubbitt Electric Brush at a special early bird price! Save ₹500 off the retail price of ₹3,999.", backers: 320, eta: "Nov 2026",
        includes: ["1x Scrubbitt Device", "2x Brush Heads", "USB-C Cable"], featured: true
      },
      {
        id: "scrub-r3", amount: "₹4,299", title: "Scrubbitt Pro Bundle", description: "The ultimate cleaning kit. Includes the Scrubbitt device, 4 brush heads (including a heavy-duty scourer), and a premium charging stand.", backers: 85, eta: "Nov 2026",
        includes: ["1x Scrubbitt Device", "4x Brush Heads", "Charging Stand", "USB-C Cable"]
      }
    ],
    faqs: [
      { q: "Is Scrubbitt waterproof?", a: "Yes, Scrubbitt is IPX7 waterproof. You can safely submerge the brush head and use the device confidently in the sink, but we don't recommend fully submerging the handle for extended periods." },
      { q: "How long does the battery last?", a: "A single charge lasts for about 90 minutes of continuous scrubbing, which typically translates to 3-4 weeks of normal daily use." },
      { q: "Can I buy replacement brush heads?", a: "Absolutely! Replacement heads will be available on our website post-campaign." }
    ],
    updatesList: [
      { 
        id: "u1", 
        date: "July 15, 2026", 
        title: "We are live!", 
        image: "/campaigns/scrubbitt/banner.jpg",
        body: "Thank you all for the incredible support on day one! We are thrilled to bring Scrubbitt to your kitchens." 
      }
    ],
    commentsList: [
      { id: "c1", name: "Ananya S.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80", backer: true, time: "1 day ago", text: "This looks amazing! I hate scrubbing pots.", likes: 12 },
      { id: "c2", name: "Rahul M.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80", backer: true, time: "3 hours ago", text: "Love the design. Finally a cleaning tool I won't have to hide in the cabinet.", likes: 5 }
    ]
  }
};
