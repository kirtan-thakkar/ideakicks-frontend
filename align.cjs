const fs = require('fs');

const files = [
  'src/pages/BackerLanding.tsx',
  'src/pages/CreatorLanding.tsx',
  'src/pages/VendorLanding.tsx',
  'src/pages/InvestorLanding.tsx'
];

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find all sections
  let sectionRegex = /<section[^>]*>[\s\S]*?<\/section>/g;
  content = content.replace(sectionRegex, (sectionMatch) => {
     // Does it have <div className="max-w-XX mx-auto">?
     let divMatch = sectionMatch.match(/<div className=\"max-w-([2-6]xl) mx-auto\">/);
     if (divMatch) {
         // Is it text-center?
         if (sectionMatch.includes('text-center') && sectionMatch.includes('CTA')) {
             return sectionMatch; // ignore CTA strips
         }
         
         // Replace the opening div
         let newSection = sectionMatch.replace(divMatch[0], `<div className=\"max-w-[1440px] 2xl:max-w-[1600px] mx-auto\">\n          <div className=\"max-w-${divMatch[1]}\">`);
         
         // Replace the closing div
         // The section always ends with:
         //         </div>
         //       </section>
         newSection = newSection.replace(/        <\/div>\n      <\/section>$/, '          </div>\n        </div>\n      </section>');
         
         return newSection;
     }
     return sectionMatch;
  });
  
  fs.writeFileSync(file, content);
  console.log('Aligned', file);
}
