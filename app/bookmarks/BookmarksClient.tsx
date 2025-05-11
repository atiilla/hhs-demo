'use client';

import { useEffect, useState } from 'react';
import useBookmarksStore from '../../lib/useBookmarksStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Link as LinkIcon, ExternalLink, ChevronRight, Code, Database, Server, Globe, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookmarksClient() {
    const { bookmarks, loadBookmarks, isLoading } = useBookmarksStore();
    const [expandedWidgets, setExpandedWidgets] = useState<Record<string, boolean>>({});
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshStatus, setRefreshStatus] = useState<{success?: boolean; message?: string}>({});

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

    const refreshData = async () => {
        setIsRefreshing(true);
        setRefreshStatus({});
        
        try {
            // Call the refresh endpoint
            const response = await fetch('/api/bookmarks/refresh');
            const result = await response.json();
            
            if (response.ok) {
                setRefreshStatus({ 
                    success: true, 
                    message: `Successfully refreshed data with ${result.sections} sections` 
                });
                // Reload the bookmarks
                loadBookmarks();
            } else {
                setRefreshStatus({ 
                    success: false, 
                    message: result.error || 'Failed to refresh data' 
                });
            }
        } catch (error) {
            console.error('Error refreshing data:', error);
            setRefreshStatus({ 
                success: false, 
                message: 'Error refreshing data'
            });
        } finally {
            setIsRefreshing(false);
        }
    };

    // Get icon based on section/widget title
    const getSectionIcon = (title: string) => {
        const titleLower = title.toLowerCase();
        if (titleLower.includes('hosting') || titleLower.includes('deployment')) return <Server className="h-5 w-5" />;
        if (titleLower.includes('serverless') || titleLower.includes('cloud')) return <Globe className="h-5 w-5" />;
        if (titleLower.includes('database')) return <Database className="h-5 w-5" />;
        if (titleLower.includes('development')) return <Code className="h-5 w-5" />;
        return <Bookmark className="h-5 w-5" />;
    };

    // Get color based on section index for variety
    const getSectionColor = (index: number) => {
        const colors = ['primary', 'secondary', 'accent', 'destructive'];
        return colors[index % colors.length];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Awesome Hackathon Resources</h1>
                    <p className="text-muted-foreground">A curated list of tools and resources to help you build, design, and win hackathons! 🏆</p>
                </div>
                
                <Button 
                    onClick={refreshData} 
                    disabled={isRefreshing || isLoading} 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                </Button>
            </div>
            
            {refreshStatus.message && (
                <div className={`mb-6 p-4 rounded-lg ${refreshStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {refreshStatus.message}
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <>
                    {/* Display the awesome-hackathon data */}
                    {bookmarks && bookmarks.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bookmarks.map((bookmark, bookmarkIndex) => {
                                if (!bookmark || !bookmark.widgets || !Array.isArray(bookmark.widgets) || bookmark.widgets.length === 0) {
                                    return null;
                                }
                                
                                return bookmark.widgets.map((widget, widgetIndex) => {
                                    if (!widget || !widget.items || !widget.items.links || !Array.isArray(widget.items.links)) {
                                        return null;
                                    }
                                    
                                    const widgetId = `${bookmarkIndex}-${widgetIndex}`;
                                    const isExpanded = expandedWidgets[widgetId];
                                    const links = widget.items.links || [];
                                    const displayedLinks = isExpanded 
                                        ? links 
                                        : links.slice(0, Math.min(3, links.length));
                                    const color = getSectionColor(bookmarkIndex + widgetIndex);
                                    
                                    return (
                                        <Card key={`${bookmarkIndex}-${widgetIndex}`} className="overflow-hidden">
                                            <CardHeader className={`bg-${color}/10 pb-3`}>
                                                <CardTitle className="flex items-center gap-2 text-xl" id={widget.title}>
                                                    {getSectionIcon(widget.title)}
                                                    <span>{widget.title || 'Resource'}</span>
                                                </CardTitle>
                                                <CardDescription>{bookmark.title}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="pt-4">
                                                <div className="space-y-3">
                                                    {displayedLinks.map((link, linkIndex) => {
                                                        if (!link || !link.url) return null;
                                                        
                                                        let icon;
                                                        try {
                                                            icon = link.icon || `https://www.google.com/s2/favicons?domain=${new URL(link.url).hostname}&sz=64`;
                                                        } catch (e) {
                                                            icon = 'https://placehold.co/40x40?text=?';
                                                        }
                                                        
                                                        return (
                                                            <ResourceLink 
                                                                key={linkIndex}
                                                                title={link.title || 'Untitled'}
                                                                icon={icon}
                                                                description={link.description || ''}
                                                                url={link.url}
                                                            />
                                                        );
                                                    })}
                                                    
                                                    {links.length > 3 && (
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm" 
                                                            className={`w-full justify-start text-${color}`}
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
                                });
                            })}
                        </div>
                    )}

                    {(!bookmarks || bookmarks.length === 0) && !isLoading && (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                            <p className="text-muted-foreground">Couldn't load the awesome-hackathon resources. Please check if the JSON file exists.</p>
                            <Button 
                                onClick={refreshData} 
                                disabled={isRefreshing} 
                                variant="outline" 
                                className="mt-4"
                            >
                                Try refreshing data
                            </Button>
                        </div>
                    )}
                </>
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