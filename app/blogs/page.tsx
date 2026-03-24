
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in African Healthcare",
    excerpt: "How generative AI is bridging the gap in diagnostic accessibility across regional clinics in the Horn of Africa.",
    author: "Dr. Amina Elmi",
    date: "Feb 12, 2024",
    readTime: "8 min read",
    category: "Technology",
    imageId: "blog-1"
  },
  {
    id: 2,
    title: "Mastering Next.js: 10 Performance Tips",
    excerpt: "Level up your web development skills with these essential optimization patterns for 2024.",
    author: "Khalid Noor",
    date: "Feb 05, 2024",
    readTime: "12 min read",
    category: "Development",
    imageId: "blog-2"
  },
  {
    id: 3,
    title: "The Ethics of Generative AI in Professional Workspaces",
    excerpt: "Navigating the complexities of intellectual property and accuracy in the age of AI assistants.",
    author: "Sarah J. Miller",
    date: "Jan 28, 2024",
    readTime: "15 min read",
    category: "Ethics",
    imageId: "blog-3"
  }
];

export default function BlogLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center space-y-4 mb-16">
        <Badge className="bg-secondary text-primary font-bold">LUK INSIGHTS</Badge>
        <h1 className="text-5xl font-headline font-bold text-primary">Blog & Article Library</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">Stay ahead with curated insights, tech news, and expert perspectives.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-3/4 space-y-12">
          {/* Featured Post */}
          <Link href="/blogs/featured" className="block group">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={PlaceHolderImages.find(img => img.id === blogPosts[0].imageId)?.imageUrl || ""} 
                alt="Featured" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                data-ai-hint={PlaceHolderImages.find(img => img.id === blogPosts[0].imageId)?.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-10 text-white space-y-4">
                <Badge className="bg-secondary text-primary">FEATURED STORY</Badge>
                <h2 className="text-4xl font-headline font-bold leading-tight group-hover:text-secondary transition-colors">
                  {blogPosts[0].title}
                </h2>
                <div className="flex items-center gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><User className="w-4 h-4" /> {blogPosts[0].author}</div>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {blogPosts[0].date}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {blogPosts[0].readTime}</div>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid of Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.slice(1).map((post) => {
              const imageData = PlaceHolderImages.find(img => img.id === post.imageId);
              return (
                <Card key={post.id} className="border-none shadow-md overflow-hidden group">
                  <div className="relative h-56 overflow-hidden">
                    <Image 
                      src={imageData?.imageUrl || ""} 
                      alt={post.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      data-ai-hint={imageData?.imageHint}
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-white">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-3 mt-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="link" className="text-primary font-bold p-0 group">
                      Read More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/4 space-y-10">
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-primary text-xl">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 border-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-headline font-bold text-primary text-xl">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {["Tech", "Design", "Code", "AI", "Startup", "Somalia", "Future"].map(tag => (
                <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Card className="bg-primary text-white border-none shadow-xl overflow-hidden p-6 relative">
            <Calendar className="absolute -top-4 -right-4 w-24 h-24 text-white/5" />
            <h3 className="text-xl font-headline font-bold mb-4 relative z-10">Join our Newsletter</h3>
            <p className="text-sm text-primary-foreground/70 mb-6 relative z-10">Get weekly digests of the most important tech news delivered to your inbox.</p>
            <Input placeholder="your@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mb-4" />
            <Button className="w-full bg-secondary text-primary font-bold">Subscribe Now</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
