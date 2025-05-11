import * as fs from 'fs';
import * as path from 'path';

interface Item {
  name: string;
  url: string;
  description: string;
}

interface Subsection {
  name: string;
  items: Item[];
}

interface Section {
  name: string;
  subsections: Subsection[];
}

interface AwesomeCollection {
  title: string;
  description: string;
  sections: Section[];
}

function parseReadmeToJson(readmePath: string): AwesomeCollection {
  // Read the file content
  const content = fs.readFileSync(readmePath, 'utf-8');
  
  // Remove images
  const contentWithoutImages = content.replace(/!\[.*?\]\(.*?\)\n*/g, '');
  
  // Split the content by sections (## headings)
  const mainSections = contentWithoutImages.split(/\n## /);
  
  // Process the title and description
  const titleSection = mainSections[0].trim();
  const titleMatch = titleSection.match(/# (.*?)\n/);
  const title = titleMatch ? titleMatch[1] : "Awesome-Hackathon";
  
  const description = titleSection.replace(`# ${title}`, '').trim();
  
  // Initialize the result structure
  const result: AwesomeCollection = {
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
    const sectionData: Section = {
      name: sectionTitle,
      subsections: []
    };
    
    // Process subsections (### headings)
    let currentSubsection: Subsection | null = null;
    
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

function main() {
  const readmePath = path.join(__dirname, 'README.md');
  const outputPath = path.join(__dirname, 'awesome-hackathon.json');
  
  // Make sure README.md exists
  if (!fs.existsSync(readmePath)) {
    console.error(`Error: ${readmePath} not found`);
    return;
  }
  
  try {
    // Parse the README to JSON
    const data = parseReadmeToJson(readmePath);
    
    // Write to a JSON file
    fs.writeFileSync(
      outputPath, 
      JSON.stringify(data, null, 2), 
      'utf-8'
    );
    
    console.log(`Conversion complete! Output saved to ${outputPath}`);
  } catch (error) {
    console.error('Error during conversion:', error);
  }
}

// Run the script
main(); 