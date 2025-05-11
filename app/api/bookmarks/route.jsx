import { NextResponse } from "next/server";
import * as fs from 'fs';
import * as path from 'path';

// Using the JSON file from the app/bookmarks directory
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source') || 'awesome-hackathon';
    
    try {
        // Source-specific handling
        switch (source) {
            case 'awesome-hackathon':
                return getAwesomeHackathonBookmarks();
            case 'personal':
                return getPersonalBookmarks();
            default:
                return NextResponse.json({ error: 'Unknown bookmark source' }, { status: 400 });
        }
    } catch (error) {
        console.error(`Error loading bookmarks from source ${source}:`, error);
        return NextResponse.json({ error: 'Failed to load bookmarks' }, { status: 500 });
    }
}

async function getAwesomeHackathonBookmarks() {
    try {
        // Try multiple potential file locations
        const possiblePaths = [
            path.join(process.cwd(), 'awesome-hackathon', 'awesome-hackathon.json'),
            path.join(process.cwd(), 'app', 'bookmarks', 'awesome-hackathon.json')
        ];
        
        let filePath = null;
        
        // Find the first existing file
        for (const path of possiblePaths) {
            if (fs.existsSync(path)) {
                filePath = path;
                console.log(`Found JSON file at: ${filePath}`);
                break;
            }
        }
        
        // If no file is found
        if (!filePath) {
            console.error(`No JSON file found in any of these locations: ${possiblePaths.join(', ')}`);
            return NextResponse.json({ error: 'Awesome Hackathon JSON file not found' }, { status: 404 });
        }
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let data;
        
        try {
            data = JSON.parse(fileContent);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return NextResponse.json({ error: 'Invalid JSON format' }, { status: 500 });
        }
        
        // Transform the data to match the expected format for the BookmarksClient component
        const transformedData = transformAwesomeData(data);
        
        return NextResponse.json(transformedData);
    } catch (error) {
        console.error('Error reading awesome-hackathon.json:', error);
        return NextResponse.json({ error: 'Failed to load bookmarks' }, { status: 500 });
    }
}

async function getPersonalBookmarks() {
    // This would typically fetch from a database or storage
    // For now, we'll return a sample structure
    try {
        const personalBookmarks = [
            {
                id: Date.now(),
                title: 'Personal Bookmarks',
                url: '#',
                widgets: [
                    {
                        title: 'Favorites',
                        items: {
                            links: [
                                {
                                    title: 'GitHub',
                                    url: 'https://github.com',
                                    description: 'Where developers collaborate',
                                    icon: 'https://www.google.com/s2/favicons?domain=github.com&sz=64'
                                },
                                {
                                    title: 'VS Code',
                                    url: 'https://code.visualstudio.com',
                                    description: 'Free, built on open source, runs everywhere',
                                    icon: 'https://www.google.com/s2/favicons?domain=code.visualstudio.com&sz=64'
                                }
                            ]
                        }
                    }
                ]
            }
        ];
        
        return NextResponse.json(personalBookmarks);
    } catch (error) {
        console.error('Error fetching personal bookmarks:', error);
        return NextResponse.json({ error: 'Failed to load personal bookmarks' }, { status: 500 });
    }
}

// Function to transform the awesome-hackathon data into the format expected by BookmarksClient
function transformAwesomeData(data) {
    // Create an array to hold our transformed bookmarks
    const transformedBookmarks = [];
    
    if (!data || !data.sections || !Array.isArray(data.sections)) {
        console.error('Invalid data structure: missing sections array');
        return [];
    }
    
    // Create a bookmark ID
    const bookmarkId = Date.now();
    
    // For each section in the awesome-hackathon data
    data.sections.forEach((section, sectionIndex) => {
        // Skip sections with no subsections
        if (!section.subsections || !Array.isArray(section.subsections) || section.subsections.length === 0) {
            return;
        }
        
        // Create a new bookmark for each section
        const bookmark = {
            id: bookmarkId + sectionIndex,
            title: section.name || 'Section',
            url: "#",
            widgets: []
        };
        
        // For each subsection, create a widget
        section.subsections.forEach(subsection => {
            if (!subsection.items || !Array.isArray(subsection.items) || subsection.items.length === 0) {
                return;
            }
            
            const links = subsection.items.map(item => {
                let icon = '';
                try {
                    icon = `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=64`;
                } catch (e) {
                    icon = 'https://placehold.co/40x40?text=?';
                }
                
                return {
                    title: item.name || 'Resource',
                    url: item.url || '#',
                    description: item.description || '',
                    icon
                };
            }).filter(link => link.url && link.url !== '#'); // Only include links with valid URLs
            
            if (links.length === 0) {
                return;
            }
            
            const widget = {
                title: subsection.name || 'Resources',
                items: {
                    links
                }
            };
            
            bookmark.widgets.push(widget);
        });
        
        // Only add the bookmark if it has widgets
        if (bookmark.widgets.length > 0) {
            transformedBookmarks.push(bookmark);
        }
    });
    
    return transformedBookmarks;
}
