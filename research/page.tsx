
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Upload, Download, ExternalLink, Filter } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

const initialPapers = [
  {
    id: 1,
    title: "Advancements in LLM Fine-Tuning for Specialized Domains",
    author: "Dr. Hassan Ibrahim",
    date: "Dec 2023",
    category: "Natural Language Processing",
    abstract: "This paper explores novel techniques for fine-tuning large language models in professional legal and medical contexts.",
    imageId: "research-1"
  },
  {
    id: 2,
    title: "AI in Sustainable Development: A Case Study in East Africa",
    author: "Fatima Yusuf",
    date: "Oct 2023",
    category: "AI & Sustainability",
    abstract: "An analytical look at how predictive modeling is enhancing agricultural yields and resource management in Somalia.",
    imageId: "research-2"
  },
  {
    id: 3,
    title: "Robotic Process Automation in Somali Banking Sector",
    author: "Ahmed Warsame",
    date: "Jan 2024",
    category: "Robotics & Automation",
    abstract: "Examining the transition of manual financial processes to automated systems in the Mogadishu business ecosystem.",
    imageId: "research-3"
  }
];

export default function ResearchLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleUpload = () => {
    toast({ title: "Submission Portal", description: "The research submission portal is currently in review. Please contact support to submit manually." });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="space-y-2">
          <Badge className="bg-secondary text-primary font-bold">ACADEMIC HUB</Badge>
          <h1 className="text-4xl font-headline font-bold text-primary">Research Library</h1>
          <p className="text-muted-foreground text-lg">Access a curated repository of academic papers and technological insights.</p>
        </div>
        <Button className="bg-primary text-white font-bold" onClick={handleUpload}>
          <Upload className="w-4 h-4 mr-2" /> Submit Paper
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-8">
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-primary text-lg">Categories</h3>
            <div className="space-y-2">
              {["All Disciplines", "Machine Learning", "Data Science", "Cybersecurity", "Blockchain"].map(cat => (
                <button key={cat} className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left w-full">
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-primary text-lg">Recent Years</h3>
            <div className="space-y-2">
              {["2024", "2023", "2022", "Archive"].map(year => (
                <button key={year} className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left w-full">
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow space-y-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search by title, author, or keyword..." 
              className="pl-12 h-14 text-lg border-primary/20 shadow-sm focus-visible:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {initialPapers.map((paper) => {
              const imageData = PlaceHolderImages.find(img => img.id === paper.imageId);
              return (
                <Card key={paper.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex">
                    <div className="relative w-32 md:w-40 shrink-0 bg-muted overflow-hidden">
                      <Image 
                        src={imageData?.imageUrl || ""} 
                        alt={paper.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform" 
                        data-ai-hint={imageData?.imageHint}
                      />
                    </div>
                    <div className="p-6 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className="bg-secondary/10 text-primary text-[10px]">
                          {paper.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{paper.date}</span>
                      </div>
                      <CardTitle className="text-lg font-headline leading-snug group-hover:text-primary transition-colors cursor-pointer">
                        {paper.title}
                      </CardTitle>
                      <p className="text-xs text-primary font-medium">By {paper.author}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{paper.abstract}</p>
                      <div className="flex gap-2 mt-auto pt-4">
                        <Button variant="outline" size="sm" className="h-8 text-[10px] border-primary text-primary">
                          <Download className="w-3 h-3 mr-1" /> PDF
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-[10px] text-primary">
                          <ExternalLink className="w-3 h-3 mr-1" /> View Online
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
