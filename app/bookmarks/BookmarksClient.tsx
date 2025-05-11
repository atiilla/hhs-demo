'use client';

import { useEffect, useState } from 'react';
import useBookmarksStore, { BOOKMARK_SOURCES } from '../../lib/useBookmarksStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Link as LinkIcon, ExternalLink, ChevronRight, Code, Database, Server, Globe, RefreshCw, Folder, FolderPlus, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Custom CSS classes for theme compatibility
const THEME_STYLES = {
  cardHeader: "bg-slate-100 dark:bg-slate-800 pb-3",
  successAlert: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/50",
  errorAlert: "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border border-rose-100 dark:border-rose-800/50",
  resourceHover: "hover:bg-slate-100 dark:hover:bg-slate-800/70",
  moreButton: "text-blue-600 dark:text-blue-400"
};

export default function BookmarksClient() {
    const { bookmarks, loadBookmarks, isLoading, currentSource, setCurrentSource } = useBookmarksStore();
    const [expandedWidgets, setExpandedWidgets] = useState<Record<string, boolean>>({});
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshStatus, setRefreshStatus] = useState<{success?: boolean; message?: string}>({});
    const [searchQuery, setSearchQuery] = useState('');

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
            // Call the refresh endpoint with the current source
            const response = await fetch(`/api/bookmarks/refresh?source=${currentSource}`);
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

    // Filter bookmarks based on search query
    const filteredBookmarks = bookmarks.map(bookmark => {
        if (!searchQuery) return bookmark;
        
        const filteredWidgets = bookmark.widgets?.filter(widget => {
            return widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                widget.items.links.some(link => 
                    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (link.description && link.description.toLowerCase().includes(searchQuery.toLowerCase()))
                );
        });
        
        return {
            ...bookmark,
            widgets: filteredWidgets
        };
    }).filter(bookmark => bookmark.widgets && bookmark.widgets.length > 0);

    // Sources for the dropdown
    const sources = [
        { id: BOOKMARK_SOURCES.AWESOME_HACKATHON, name: 'Awesome Hackathon' },
        { id: BOOKMARK_SOURCES.PERSONAL, name: 'Personal' },
    ];

    // Handle source change
    const handleSourceChange = (sourceId: string) => {
        setCurrentSource(sourceId);
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Left sidebar */}
            <div className="w-60 border-r bg-background p-4 hidden md:block">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Bookmarks</h2>
                        <Button variant="ghost" size="icon" title="Add new folder">
                            <FolderPlus className="h-5 w-5" />
                        </Button>
                    </div>
                    
                    <div className="space-y-1">
                        {sources.map(source => (
                            <Button
                                key={source.id}
                                variant={currentSource === source.id ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => handleSourceChange(source.id)}
                            >
                                <Folder className="h-4 w-4 mr-2" />
                                {source.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Main content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 p-4 md:p-8"
            >
                {/* Mobile source selector */}
                <div className="md:hidden mb-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                <div className="flex items-center">
                                    <Folder className="h-4 w-4 mr-2" />
                                    {sources.find(s => s.id === currentSource)?.name || 'Select source'}
                                </div>
                                <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {sources.map(source => (
                                <DropdownMenuItem key={source.id} onClick={() => handleSourceChange(source.id)}>
                                    <Folder className="h-4 w-4 mr-2" />
                                    {source.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">{sources.find(s => s.id === currentSource)?.name || 'Bookmarks'}</h1>
                        <p className="text-muted-foreground">
                            {currentSource === BOOKMARK_SOURCES.AWESOME_HACKATHON 
                                ? 'A curated list of tools and resources to help you build, design, and win hackathons! 🏆'
                                : 'Your personal collection of bookmarks and resources'}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search bookmarks..."
                                className="pl-8 w-full md:w-[200px]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        
                        <Button 
                            onClick={refreshData} 
                            disabled={isRefreshing || isLoading} 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-2 whitespace-nowrap"
                        >
                            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            {isRefreshing ? 'Refreshing...' : 'Refresh'}
                        </Button>
                    </div>
                </div>
                
                {refreshStatus.message && (
                    <div className={`mb-6 p-4 rounded-lg ${refreshStatus.success ? THEME_STYLES.successAlert : THEME_STYLES.errorAlert}`}>
                        {refreshStatus.message}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {/* Display the bookmarks data */}
                        {filteredBookmarks && filteredBookmarks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredBookmarks.map((bookmark, bookmarkIndex) => {
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
                                        
                                        return (
                                            <Card key={`${bookmarkIndex}-${widgetIndex}`} className="overflow-hidden border hover:shadow-md transition-shadow">
                                                <CardHeader className={THEME_STYLES.cardHeader}>
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
                                                                className={`w-full justify-between ${THEME_STYLES.moreButton}`}
                                                                onClick={() => toggleWidget(widgetId, widget.title)}
                                                            >
                                                                <span>{isExpanded ? 'Show Less' : `Show ${links.length - 3} More`}</span>
                                                                <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    });
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                {searchQuery ? (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">No matching bookmarks</h3>
                                        <p className="text-muted-foreground">Try a different search term or clear your search</p>
                                        <Button 
                                            onClick={() => setSearchQuery('')} 
                                            variant="outline" 
                                            className="mt-4"
                                        >
                                            Clear search
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">No bookmarks found</h3>
                                        <p className="text-muted-foreground">No bookmarks available for the selected source.</p>
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
                            </div>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
}

// Resource Link Component
function ResourceLink({ title, icon, description, url }: { title: string, icon: string, description: string, url: string }) {
    return (
        <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-3 rounded-md ${THEME_STYLES.resourceHover} transition-colors group`}
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