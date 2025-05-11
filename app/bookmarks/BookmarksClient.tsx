'use client';

import { useEffect, useState } from 'react';
import useBookmarksStore from '../../lib/useBookmarksStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Link as LinkIcon, ExternalLink, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookmarksClient() {
    const { bookmarks, loadBookmarks, isLoading } = useBookmarksStore();
    const [expandedWidgets, setExpandedWidgets] = useState<Record<string, boolean>>({});

    useEffect(() => {
        loadBookmarks();
    }, [loadBookmarks]);

    const toggleWidget = (widgetId: string, widgetTitle: string) => {
        setExpandedWidgets(prev => {
            const newState = {
                ...prev,
                [widgetId]: !prev[widgetId]
            };
            if (!newState[widgetId]) {
                document.getElementById(widgetTitle)?.scrollIntoView({ behavior: 'smooth' });
            }
            return newState;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Welcome to your Bookmarks!</h1>
                <p className="text-muted-foreground">We've collected interesting tools and links to help you with your projects.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* AI Tools Category */}
                <Card className="overflow-hidden">
                    <CardHeader className="bg-primary/10 pb-3">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Bookmark className="h-5 w-5 text-primary" />
                            <span>AI Tools and Resources</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="space-y-3">
                            {isLoading ? (
                                <div className="flex justify-center py-8">
                                    <div className="loading loading-spinner"></div>
                                </div>
                            ) : (
                                <>
                                    <ResourceLink 
                                        title="ChatGPT"
                                        icon="https://chat.openai.com/favicon.ico"
                                        description="Advanced AI assistant for conversation and task completion"
                                        url="https://chat.openai.com"
                                    />
                                    <ResourceLink 
                                        title="Midjourney"
                                        icon="https://www.midjourney.com/favicon.ico"
                                        description="AI image generation from text prompts"
                                        url="https://www.midjourney.com"
                                    />
                                    <ResourceLink 
                                        title="Perplexity AI"
                                        icon="https://www.perplexity.ai/favicon.ico"
                                        description="AI search engine with accurate information and sources"
                                        url="https://www.perplexity.ai"
                                    />
                                    <Button variant="ghost" size="sm" className="w-full justify-start text-primary" onClick={() => {}}>
                                        <span>View all</span>
                                        <ChevronRight className="h-4 w-4 ml-auto" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Learning Resources */}
                <Card className="overflow-hidden">
                    <CardHeader className="bg-secondary/10 pb-3">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Bookmark className="h-5 w-5 text-secondary" />
                            <span>Learning Resources</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="space-y-3">
                            <ResourceLink 
                                title="freeCodeCamp"
                                icon="https://www.freecodecamp.org/favicon.ico"
                                description="Learn to code with free courses and tutorials"
                                url="https://www.freecodecamp.org"
                            />
                            <ResourceLink 
                                title="MDN Web Docs"
                                icon="https://developer.mozilla.org/favicon.ico"
                                description="Resources for web developers by Mozilla"
                                url="https://developer.mozilla.org"
                            />
                            <ResourceLink 
                                title="Codecademy"
                                icon="https://www.codecademy.com/favicon.ico"
                                description="Interactive platform to learn coding skills"
                                url="https://www.codecademy.com"
                            />
                            <Button variant="ghost" size="sm" className="w-full justify-start text-secondary" onClick={() => {}}>
                                <span>View all</span>
                                <ChevronRight className="h-4 w-4 ml-auto" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Developer Tools */}
                <Card className="overflow-hidden">
                    <CardHeader className="bg-accent/10 pb-3">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Bookmark className="h-5 w-5 text-accent" />
                            <span>Developer Tools</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="space-y-3">
                            <ResourceLink 
                                title="GitHub"
                                icon="https://github.com/favicon.ico"
                                description="Code hosting platform for collaboration and version control"
                                url="https://github.com"
                            />
                            <ResourceLink 
                                title="VS Code"
                                icon="https://code.visualstudio.com/favicon.ico"
                                description="Powerful code editor with extensions"
                                url="https://code.visualstudio.com"
                            />
                            <ResourceLink 
                                title="Stack Overflow"
                                icon="https://stackoverflow.com/favicon.ico"
                                description="Community to learn and share programming knowledge"
                                url="https://stackoverflow.com"
                            />
                            <Button variant="ghost" size="sm" className="w-full justify-start text-accent" onClick={() => {}}>
                                <span>View all</span>
                                <ChevronRight className="h-4 w-4 ml-auto" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Design Tools */}
                <Card className="overflow-hidden">
                    <CardHeader className="bg-destructive/10 pb-3">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Bookmark className="h-5 w-5 text-destructive" />
                            <span>Design Tools</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="space-y-3">
                            <ResourceLink 
                                title="Figma"
                                icon="https://www.figma.com/favicon.ico"
                                description="Collaborative interface design tool"
                                url="https://www.figma.com"
                            />
                            <ResourceLink 
                                title="Canva"
                                icon="https://www.canva.com/favicon.ico"
                                description="Easy-to-use graphic design platform"
                                url="https://www.canva.com"
                            />
                            <ResourceLink 
                                title="Dribbble"
                                icon="https://dribbble.com/favicon.ico"
                                description="Design inspiration and community"
                                url="https://dribbble.com"
                            />
                            <Button variant="ghost" size="sm" className="w-full justify-start text-destructive" onClick={() => {}}>
                                <span>View all</span>
                                <ChevronRight className="h-4 w-4 ml-auto" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Marketing Tools */}
                <Card className="overflow-hidden">
                    <CardHeader className="bg-primary/10 pb-3">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Bookmark className="h-5 w-5 text-primary" />
                            <span>Marketing Tools</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="space-y-3">
                            <ResourceLink 
                                title="Mailchimp"
                                icon="https://mailchimp.com/favicon.ico"
                                description="Email marketing and automation platform"
                                url="https://mailchimp.com"
                            />
                            <ResourceLink 
                                title="Google Analytics"
                                icon="https://analytics.google.com/favicon.ico"
                                description="Web analytics service by Google"
                                url="https://analytics.google.com"
                            />
                            <ResourceLink 
                                title="Buffer"
                                icon="https://buffer.com/favicon.ico"
                                description="Social media management platform"
                                url="https://buffer.com"
                            />
                            <Button variant="ghost" size="sm" className="w-full justify-start text-primary" onClick={() => {}}>
                                <span>View all</span>
                                <ChevronRight className="h-4 w-4 ml-auto" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Productivity Tools */}
                <Card className="overflow-hidden">
                    <CardHeader className="bg-secondary/10 pb-3">
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Bookmark className="h-5 w-5 text-secondary" />
                            <span>Productivity Tools</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="space-y-3">
                            <ResourceLink 
                                title="Notion"
                                icon="https://www.notion.so/favicon.ico"
                                description="All-in-one workspace for notes, tasks, wikis"
                                url="https://www.notion.so"
                            />
                            <ResourceLink 
                                title="Trello"
                                icon="https://trello.com/favicon.ico"
                                description="Visual tool for organizing your work"
                                url="https://trello.com"
                            />
                            <ResourceLink 
                                title="Todoist"
                                icon="https://todoist.com/favicon.ico"
                                description="Task manager and to-do list app"
                                url="https://todoist.com"
                            />
                            <Button variant="ghost" size="sm" className="w-full justify-start text-secondary" onClick={() => {}}>
                                <span>View all</span>
                                <ChevronRight className="h-4 w-4 ml-auto" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Display actual bookmarks data if available */}
            {!isLoading && bookmarks && bookmarks.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Your Saved Bookmarks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookmarks.slice(1, 10).map((bookmark, bookmarkIndex) => (
                            bookmark.widgets && bookmark.widgets.map((widget, widgetIndex) => {
                                const widgetId = `${bookmarkIndex}-${widgetIndex}`;
                                const isExpanded = expandedWidgets[widgetId];
                                const displayedLinks = isExpanded ? widget.items.links : widget.items.links.slice(0, 3);
                                
                                return (
                                    <Card key={widgetIndex} className="overflow-hidden">
                                        <CardHeader className="bg-primary/10 pb-3">
                                            <CardTitle className="flex items-center gap-2 text-xl" id={widget.title}>
                                                <Bookmark className="h-5 w-5 text-primary" />
                                                <span>{widget.title}</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="space-y-3">
                                                {displayedLinks.map((link, linkIndex) => (
                                                    <ResourceLink 
                                                        key={linkIndex}
                                                        title={link.title}
                                                        icon={link.icon || `https://f.start.me/${new URL(link.url).hostname}`}
                                                        description={link.description || ''}
                                                        url={link.url}
                                                    />
                                                ))}
                                                
                                                {widget.items.links.length > 3 && (
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="w-full justify-start text-primary"
                                                        onClick={() => toggleWidget(widgetId, widget.title)}
                                                    >
                                                        <span>{isExpanded ? 'Show Less' : 'View All'}</span>
                                                        <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// Resource Link Component
function ResourceLink({ title, icon, description, url }: { title: string, icon: string, description: string, url: string }) {
    return (
        <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/5 transition-colors group"
        >
            <div className="w-10 h-10 flex-shrink-0 rounded-md overflow-hidden bg-background border flex items-center justify-center">
                <img 
                    src={icon}
                    alt=""
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/40x40?text=' + title.charAt(0).toUpperCase();
                    }}
                />
            </div>
            
            <div className="flex-grow min-w-0 overflow-hidden">
                <div className="flex items-center">
                    <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-60 transition-opacity" />
                </div>
                {description && (
                    <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {description}
                    </p>
                )}
            </div>
        </a>
    );
} 