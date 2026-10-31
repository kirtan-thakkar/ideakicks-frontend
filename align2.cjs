const fs = require('fs');

const files = [
  'src/pages/HowItWorks.tsx',
  'src/pages/Pricing.tsx',
  'src/pages/Contact.tsx',
  'src/pages/BackCampaign.tsx',
  'src/pages/CampaignUpdates.tsx'
];

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  let sectionRegex = /<section[^>]*>[\s\S]*?<\/section>/g;
  content = content.replace(sectionRegex, (sectionMatch) => {
     let divMatch = sectionMatch.match(/<div className=\"max-w-([2-6]xl) mx-auto\">/);
     if (divMatch) {
         if (sectionMatch.includes('text-center') && sectionMatch.includes('CTA')) {
             return sectionMatch; 
         }
         let newSection = sectionMatch.replace(divMatch[0], `<div className=\"max-w-[1440px] 2xl:max-w-[1600px] mx-auto\">\n          <div className=\"max-w-${divMatch[1]}\">`);
         newSection = newSection.replace(/        <\/div>\n      <\/section>$/, '          </div>\n        </div>\n      </section>');
         return newSection;
     }
     
     // Sometimes the wrapper includes the padding directly like:
     // <div className=\"py-12 px-6 lg:px-10 max-w-5xl mx-auto...
     let paddingMatch = sectionMatch.match(/<div className=\"([^"]*)max-w-([2-6]xl) mx-auto([^"]*)\">/);
     if (paddingMatch && paddingMatch[1].includes('px-')) {
          if (paddingMatch[0].includes('text-center')) {
              return sectionMatch;
          }
          let newSection = sectionMatch.replace(paddingMatch[0], `<div className=\"${paddingMatch[1]}max-w-[1440px] 2xl:max-w-[1600px] mx-auto\">\n          <div className=\"max-w-${paddingMatch[2]}${paddingMatch[3]}\">`);
          // Close the div at the end
          newSection = newSection.replace(/        <\/div>\n      <\/section>$/, '          </div>\n        </div>\n      </section>');
          // Or if it's the main return of the component ending with </div>
          return newSection;
     }
     
     return sectionMatch;
  });
  
  // Some don't use sections but top-level divs inside the main return container
  let topLevelMatch = content.match(/<div className=\"([^"]*)max-w-([2-6]xl) mx-auto([^"]*)\">/g);
  if (topLevelMatch) {
      for (let match of topLevelMatch) {
          if (match.includes('text-center')) continue;
          if (match.includes('px-6')) {
              let repl = match.replace(/max-w-[2-6]xl mx-auto/, 'max-w-[1440px] 2xl:max-w-[1600px] mx-auto');
              let innerSize = match.match(/max-w-([2-6]xl)/)[1];
              // this is getting too hairy for regex on the remaining 5 files. Let's just write to them directly.
          }
      }
  }

  fs.writeFileSync(file, content);
  console.log('Aligned', file);
}
