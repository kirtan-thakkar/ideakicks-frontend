const fs = require('fs');
const data = [
  {"File":"src/pages/BackerLanding.tsx","LineNumber":38,"LineContent":"        <div className=\"max-w-4xl mx-auto\">"},
  {"File":"src/pages/BackerLanding.tsx","LineNumber":84,"LineContent":"        <div className=\"max-w-6xl mx-auto\">"},
  {"File":"src/pages/BackerLanding.tsx","LineNumber":147,"LineContent":"        <div className=\"max-w-6xl mx-auto\">"},
  {"File":"src/pages/BackerLanding.tsx","LineNumber":190,"LineContent":"        <div className=\"max-w-6xl mx-auto\">"},
  {"File":"src/pages/BackerLanding.tsx","LineNumber":253,"LineContent":"        <div className=\"max-w-6xl mx-auto\">"},
  {"File":"src/pages/BackerLanding.tsx","LineNumber":289,"LineContent":"        <div className=\"max-w-2xl mx-auto\">"},
  {"File":"src/pages/CreatorLanding.tsx","LineNumber":57,"LineContent":"        <div className=\"max-w-4xl mx-auto\">"},
  {"File":"src/pages/CreatorLanding.tsx","LineNumber":102,"LineContent":"        <div className=\"max-w-6xl mx-auto\">"},
  {"File":"src/pages/CreatorLanding.tsx","LineNumber":160,"LineContent":"        <div className=\"max-w-6xl mx-auto\">"},
  {"File":"src/pages/CreatorLanding.tsx","LineNumber":226,"LineContent":"        <div className=\"max-w-6xl mx-auto\">"},
  {"File":"src/pages/CreatorLanding.tsx","LineNumber":276,"LineContent":"        <div className=\"max-w-3xl mx-auto\">"},
  {"File":"src/pages/CreatorLanding.tsx","LineNumber":308,"LineContent":"        <div className=\"max-w-2xl mx-auto\">"},
  {"File":"src/pages/InvestorLanding.tsx","LineNumber":253,"LineContent":"        <div className=\"max-w-3xl mx-auto\">"},
  {"File":"src/pages/InvestorLanding.tsx","LineNumber":361,"LineContent":"        <div className=\"max-w-2xl mx-auto\">"},
  {"File":"src/pages/CampaignUpdates.tsx","LineNumber":40,"LineContent":"      <div className=\"max-w-4xl mx-auto px-6 lg:px-10\">"},
  {"File":"src/pages/Onboarding.tsx","LineNumber":346,"LineContent":"                <p className=\"text-[#082D4D]/60 mb-2 max-w-sm mx-auto leading-relaxed\">"},
  {"File":"src/pages/VendorLanding.tsx","LineNumber":214,"LineContent":"        <div className=\"max-w-3xl mx-auto\">"},
  {"File":"src/pages/BackCampaign.tsx","LineNumber":53,"LineContent":"      <div className=\"max-w-3xl mx-auto px-6 lg:px-10\">"},
  {"File":"src/pages/Contact.tsx","LineNumber":45,"LineContent":"        <div className=\"pt-36 pb-12 px-6 lg:px-10 max-w-2xl mx-auto text-center\">"},
  {"File":"src/pages/Contact.tsx","LineNumber":73,"LineContent":"        <div className=\"py-12 px-6 lg:px-10 max-w-5xl mx-auto grid md:grid-cols-[1fr_340px] gap-12\">"},
  {"File":"src/pages/HowItWorks.tsx","LineNumber":84,"LineContent":"        <div className=\"pt-36 pb-20 px-6 lg:px-10 max-w-4xl mx-auto text-center\">"},
  {"File":"src/pages/HowItWorks.tsx","LineNumber":110,"LineContent":"            className=\"max-w-xl mx-auto\""},
  {"File":"src/pages/HowItWorks.tsx","LineNumber":550,"LineContent":"        <div className=\"py-16 px-6 lg:px-10 max-w-3xl mx-auto\">"},
  {"File":"src/pages/Pricing.tsx","LineNumber":45,"LineContent":"        <div className=\"pt-36 pb-20 px-6 lg:px-10 max-w-4xl mx-auto\">"},
  {"File":"src/pages/Pricing.tsx","LineNumber":86,"LineContent":"        <div className=\"py-20 px-6 lg:px-10 max-w-5xl mx-auto\">"},
  {"File":"src/pages/Pricing.tsx","LineNumber":181,"LineContent":"        <div className=\"py-16 px-6 lg:px-10 max-w-3xl mx-auto\">"},
  {"File":"src/pages/Pricing.tsx","LineNumber":241,"LineContent":"        <div className=\"py-16 px-6 lg:px-10 max-w-3xl mx-auto\">"}
];

const files = [...new Set(data.map(d => d.File))];
for (let f of files) {
   if (!fs.existsSync(f)) continue;
   let content = fs.readFileSync(f, 'utf8');
   let lines = content.split('\n');
   let fileData = data.filter(d => d.File === f);
   let dataIdx = 0;
   
   for (let i = 0; i < lines.length; i++) {
      let isCorrupted = lines[i].includes('<div  mx-auto>') || 
                        lines[i].includes(' mx-auto>') ||
                        lines[i].includes('className=" max-w-[1440px]') ||
                        lines[i].match(/className="[^"]* max-w-\[1440px\][^"]*"/);
                        
      if (isCorrupted && dataIdx < fileData.length) {
          lines[i] = fileData[dataIdx].LineContent;
          dataIdx++;
      }
   }
   fs.writeFileSync(f, lines.join('\n'));
}
console.log('Restoration complete');
