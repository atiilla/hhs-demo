const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define the path to the target README.md file
const sourceUrl = 'https://raw.githubusercontent.com/HappyHackingSpace/awesome-hackathon/refs/heads/main/README.md';
const outputFile = path.join(__dirname, 'awesome-hackathon.json');

// Function to fetch and save the README content
async function fetchAndSaveReadme() {
  try {
    console.log(`Fetching README from ${sourceUrl}...`);
    const response = await fetch(sourceUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch README: ${response.status} ${response.statusText}`);
    }
    
    const content = await response.text();
    console.log('README fetched successfully.');
    
    // Use the convert_to_json.ts to convert the README to JSON
    const data = parseReadmeToJson(content);
    
    // Write the JSON to a file
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf8');
    console.log(`JSON file saved to ${outputFile}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function parseReadmeToJson(content) {
  // Remove images
  const contentWithoutImages = content.replace(/!\[.*?\]\(.*?\)\n*/g, '');
  
  // Split the content by sections (## headings)
  const mainSections = contentWithoutImages.split(/\n## /);
  
  // Process the title and description
  const titleSection = mainSections[0].trim();
  const titleMatch = titleSection.match(/# (.*?)\n/);
  const title = titleMatch ? titleMatch[1] : "Awesome Collection";
  
  const description = titleSection.replace(`# ${title}`, '').trim();
  
  // Initialize the result structure
  const result = {
    title,
    description,
    sections: []
  };
  
  // Process each main section
  for (let i = 1; i < mainSections.length; i++) {
    const section = mainSections[i];
    
    // Skip the Table of Contents section
    if (section.startsWith("Table of Contents")) {
      continue;
    }
    
    const lines = section.trim().split("\n");
    const sectionTitle = lines[0].trim();
    const sectionData = {
      name: sectionTitle,
      subsections: []
    };
    
    // Process subsections (### headings)
    let currentSubsection = null;
    
    for (let j = 1; j < lines.length; j++) {
      const line = lines[j];
      
      // If this is a subsection heading
      if (line.startsWith("### ")) {
        if (currentSubsection) {
          sectionData.subsections.push(currentSubsection);
        }
        
        currentSubsection = {
          name: line.replace("### ", "").trim(),
          items: []
        };
      }
      // If this is a list item
      else if (line.trim().startsWith("- **[")) {
        if (currentSubsection) {
          // Extract name and description from the markdown link format
          const itemMatch = line.trim().match(/- \*\*\[(.*?)\]\((.*?)\)\*\* - (.*)/);
          if (itemMatch) {
            const [_, name, url, desc] = itemMatch;
            currentSubsection.items.push({
              name,
              url,
              description: desc
            });
          }
        }
      }
    }
    
    // Add the last subsection
    if (currentSubsection) {
      sectionData.subsections.push(currentSubsection);
    }
    
    // Add the section to the result
    result.sections.push(sectionData);
  }
  
  return result;
}

// Run the conversion
fetchAndSaveReadme(); 