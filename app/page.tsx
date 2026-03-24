import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, BookOpen } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  const featuredCourses = [
    {
      id: "ai-fundamentals",
      title: "AI & Machine Learning Foundations",
      instructor: "Dr. Ahmed Mohamud",
      price: 49.99,
      rating: 4.8,
      students: 1240,
      image: PlaceHolderImages.find(img => img.id === 'course-ai')?.imageUrl,
      category: "Artificial Intelligence"
    },
    {
      id: "fullstack-nextjs",
      title: "Mastering Next.js & TypeScript",
      instructor: "Sarah Collins",
      price: 59.99,
      rating: 4.9,
      students: 850,
      image: PlaceHolderImages.find(img => img.id === 'course-dev')?.imageUrl,
      category: "Software Engineering"
    },
    {
      id: "digital-marketing",
      title: "Advanced Digital Strategy",
      instructor: "Marcus Aurelius",
      price: 35.00,
      rating: 4.7,
      students: 2100,
      image: PlaceHolderImages.find(img => img.id === 'course-marketing')?.imageUrl,
      category: "Marketing"
    }
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage?.imageUrl || ""}
            alt="Hero Background"
            fill
            className="object-cover brightness-[0.4]"
            priority
            data-ai-hint={heroImage?.imageHint}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white max-w-4xl">
          <Badge className="bg-secondary text-primary mb-6 hover:bg-secondary/90 border-none font-bold">
            NEW: AI-POWERED LEARNING HUB
          </Badge>
          <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 leading-tight">
            Master the Future of Tech with <span className="text-secondary">LUK Learn</span>
          </h1>
          <p className="text-xl font-body text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Join Somalia’s elite learning community. Unlock world-class courses, expert research, and 24/7 guidance from our Gemini-powered AI Tutor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg px-8" asChild>
              <Link href="/courses">Start Learning</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-lg px-8" asChild>
              <Link href="/ai-hub">Meet Your AI Tutor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold text-primary">Featured Courses</h2>
            <p className="text-muted-foreground">Learn from the best industry experts and academic leaders.</p>
          </div>
          <Button variant="link" className="text-primary font-bold group" asChild>
            <Link href="/courses">
              View All Courses <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-none shadow-sm flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={course.image || ""}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  data-ai-hint={PlaceHolderImages.find(img => img.imageUrl === course.image)?.imageHint}
                />
                <Badge className="absolute top-4 right-4 bg-primary/90 text-white backdrop-blur-sm">
                  {course.category}
                </Badge>
              </div>
              <CardHeader className="flex-grow">
                <div className="flex items-center gap-1 text-secondary mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-primary">{course.rating}</span>
                  <span className="text-xs text-muted-foreground">({course.students} students)</span>
                </div>
                <CardTitle className="text-xl font-headline leading-snug group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">By {course.instructor}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary font-headline">${course.price}</span>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <BookOpen className="w-4 h-4" />
                    <span>12 Lessons</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-secondary text-primary hover:bg-secondary/80 font-bold" asChild>
                  <Link href={`/checkout/${course.id}`}>Buy Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl font-headline font-bold text-secondary">150+</h3>
            <p className="text-sm text-primary-foreground/70">Expert Courses</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-headline font-bold text-secondary">25k+</h3>
            <p className="text-sm text-primary-foreground/70">Active Students</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-headline font-bold text-secondary">500+</h3>
            <p className="text-sm text-primary-foreground/70">Research Papers</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-4xl font-headline font-bold text-secondary">4.9/5</h3>
            <p className="text-sm text-primary-foreground/70">User Rating</p>
          </div>
        </div>
      </section>

      {/* AI Hub Teaser */}
      <section className="container mx-auto px-4">
        <div className="bg-card rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch">
          <div className="flex-1 p-10 md:p-16 flex flex-col justify-center gap-6">
            <Badge className="w-fit bg-primary text-white">GENKIT POWERED</Badge>
            <h2 className="text-4xl font-headline font-bold text-primary">Your Intelligent Learning Partner</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the future of education with our AI Tutor. Powered by Gemini, it provides real-time explanations, summarizes complex topics, and generates practice materials tailored to your learning style.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="lg" className="bg-primary text-white" asChild>
                <Link href="/ai-hub">Enter AI Hub</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-secondary text-primary" asChild>
                <Link href="/ai-hub">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative min-h-[300px]">
            <Image
              src="https://picsum.photos/seed/luk-ai/800/800"
              alt="AI Hub"
              fill
              className="object-cover"
              data-ai-hint="artificial intelligence"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
