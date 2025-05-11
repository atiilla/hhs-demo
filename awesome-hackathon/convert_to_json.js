"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function parseReadmeToJson(readmePath) {
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
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Conversion complete! Output saved to ${outputPath}`);
    }
    catch (error) {
        console.error('Error during conversion:', error);
    }
}
// Run the script
main();
