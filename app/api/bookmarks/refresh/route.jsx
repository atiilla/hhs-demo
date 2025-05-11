import { NextResponse } from "next/server";
import * as fs from 'fs';
import * as path from 'path';

// Function to fetch the latest README from GitHub
async function fetchLatestReadme() {
    const sourceUrl = 'https://raw.githubusercontent.com/HappyHackingSpace/awesome-hackathon/refs/heads/main/README.md';
    
    try {
        console.log(`Fetching README from ${sourceUrl}...`);
        const response = await fetch(sourceUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch README: ${response.status} ${response.statusText}`);
        }
        
        return await response.text();
    } catch (error) {
        console.error('Error fetching README:', error);
        throw error;
    }
}

// Function to parse README to JSON (same as in generate-json.js)
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

// API endpoint to refresh the data
export async function GET() {
    try {
        // Fetch the latest README
        const readmeContent = await fetchLatestReadme();
        
        // Convert to JSON
        const jsonData = parseReadmeToJson(readmeContent);
        
        // Define possible paths for saving
        const possiblePaths = [
            path.join(process.cwd(), 'app', 'bookmarks', 'awesome-hackathon.json'),
            path.join(process.cwd(), 'awesome-hackathon', 'awesome-hackathon.json')
        ];
        
        let savedPath = null;
        
        // Try to save to each path
        for (const filePath of possiblePaths) {
            try {
                // Ensure directory exists
                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                
                // Write the file
                fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
                savedPath = filePath;
                console.log(`Successfully saved to ${filePath}`);
                break;
            } catch (err) {
                console.error(`Failed to save to ${filePath}:`, err);
                // Continue to next path
            }
        }
        
        if (!savedPath) {
            throw new Error('Failed to save to any location');
        }
        
        return NextResponse.json({ 
            success: true, 
            message: 'Data refreshed successfully', 
            path: savedPath,
            sections: jsonData.sections.length
        });
    } catch (error) {
        console.error('Error refreshing data:', error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
} 