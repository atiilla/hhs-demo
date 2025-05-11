"use client"

import { useState } from "react"
import { useTranslation } from "@/components/language-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const blogPosts = [
  {
    id: 1,
    title: "Building an Open Source Drone from Scratch",
    excerpt: "A step-by-step guide to building your own autonomous drone using open source hardware and software.",
    image: "/placeholder.svg?height=200&width=400",
    category: "hardware",
    author: "Ahmet Yılmaz",
    date: "2023-05-15",
    readTime: "12 min read",
  },
  {
    id: 2,
    title: "Machine Learning for Beginners: A Practical Introduction",
    excerpt: "Learn the basics of machine learning with practical examples and code snippets you can use right away.",
    image: "/placeholder.svg?height=200&width=400",
    category: "software",
    author: "Zeynep Kaya",
    date: "2023-06-22",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Ethical Hacking: Protecting Your Digital Assets",
    excerpt: "Discover the techniques ethical hackers use to identify vulnerabilities and how to protect your systems.",
    image: "/placeholder.svg?height=200&width=400",
    category: "security",
    author: "Mehmet Demir",
    date: "2023-07-10",
    readTime: "15 min read",
  },
  {
    id: 4,
    title: "The Future of Renewable Energy Technology",
    excerpt: "Exploring cutting-edge innovations in renewable energy and how they're shaping our sustainable future.",
    image: "/placeholder.svg?height=200&width=400",
    category: "technology",
    author: "Ayşe Yıldız",
    date: "2023-08-05",
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "Community-Driven Innovation: The Power of Open Source",
    excerpt: "How open source communities are driving innovation and changing the technology landscape.",
    image: "/placeholder.svg?height=200&width=400",
    category: "community",
    author: "Can Özkan",
    date: "2023-09-18",
    readTime: "7 min read",
  },
]

export default function BlogPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{t("blog.title")}</h1>
          <p className="text-muted-foreground">{t("blog.subtitle")}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("blog.search")}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="sm:w-auto w-full">
            <Filter className="mr-2 h-4 w-4" />
            {t("blog.filter")}
          </Button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredPosts.map((post) => (
            <motion.div key={post.id} variants={item}>
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function BlogPostCard({ post }) {
  const { t } = useTranslation()

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-video relative">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {post.category}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <time dateTime={post.date}>{post.date}</time>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" asChild>
          <Link href={`/blog/${post.id}`}>
            {t("blog.readMore")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
