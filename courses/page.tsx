
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, Users, Clock, Filter, SlidersHorizontal, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

const allCourses = [
  { 
    id: "gen-ai-mastery", 
    title: "Generative AI Mastery", 
    instructor: "LUK AI Team", 
    price: 49.99, 
    rating: 4.9, 
    students: 1500, 
    category: "AI", 
    level: "All Levels",
    imageId: "course-gen-ai" 
  },
  { 
    id: "fullstack-web", 
    title: "Full-Stack Web Development", 
    instructor: "Eng. Ahmed", 
    price: 39.99, 
    rating: 4.8, 
    students: 2200, 
    category: "Dev", 
    level: "Intermediate",
    imageId: "course-fullstack" 
  },
  { 
    id: "data-science-beginners", 
    title: "Data Science for Beginners", 
    instructor: "Dr. Sarah", 
    price: 29.99, 
    rating: 4.7, 
    students: 3100, 
    category: "Data", 
    level: "Beginner",
    imageId: "course-data-science" 
  },
  { id: "ai-fundamentals", title: "AI & Machine Learning Foundations", instructor: "Dr. Ahmed Mohamud", price: 49.99, rating: 4.8, students: 1240, category: "AI", level: "Intermediate", imageId: "course-ai" },
  { id: "digital-marketing", title: "Advanced Digital Strategy", instructor: "Marcus Aurelius", price: 35.00, rating: 4.7, students: 2100, category: "Marketing", level: "All Levels", imageId: "course-marketing" },
  { id: "cyber-sec", title: "Cybersecurity for Modern Business", instructor: "Dr. Ladan Omar", price: 79.99, rating: 4.9, students: 450, category: "Security", level: "Advanced", imageId: "course-security" },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = allCourses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col gap-10">
        <div className="space-y-4 text-center md:text-left">
          <Badge className="bg-secondary text-primary font-bold">PREMIUM CONTENT</Badge>
          <h1 className="text-5xl font-headline font-bold text-primary">Course Catalog</h1>
          <p className="text-muted-foreground text-xl max-w-3xl">Enhance your professional trajectory with our curated collection of industry-leading courses.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="What do you want to learn today?" 
              className="pl-12 h-14 text-lg border-primary/20 shadow-sm focus-visible:ring-primary rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-14 px-6 border-primary/20 rounded-xl flex items-center gap-2 w-full md:w-auto">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </Button>
        </div>

        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          {["All Courses", "AI & ML", "Web Dev", "Data Science", "Cybersecurity", "Fintech", "Marketing"].map(cat => (
            <Badge key={cat} variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors">
              {cat}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {filteredCourses.map((course) => {
            const imageData = PlaceHolderImages.find(img => img.id === course.imageId);
            return (
              <Card key={course.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-none shadow-md flex flex-col rounded-2xl bg-white">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={imageData?.imageUrl || ""}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    data-ai-hint={imageData?.imageHint}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary/90 text-white backdrop-blur-sm border-none">
                      {course.category}
                    </Badge>
                    <Badge className="bg-secondary text-primary font-bold border-none">
                      {course.level}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="flex-grow space-y-3">
                  <div className="flex items-center gap-1 text-secondary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold text-primary">{course.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({course.students} students)</span>
                  </div>
                  <CardTitle className="text-xl font-headline leading-tight group-hover:text-primary transition-colors h-14 line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">By <span className="font-semibold text-primary">{course.instructor}</span></p>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary font-headline">${course.price} USD</span>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Clock className="w-4 h-4" />
                      <span>Lifetime Access</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 font-bold h-12 text-lg shadow-lg" asChild>
                    <Link href={`/checkout/${course.id}`}>Buy Now</Link>
                  </Button>
                  <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5 flex items-center gap-2" asChild>
                    <Link href={`/courses/${course.id}`}>
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
