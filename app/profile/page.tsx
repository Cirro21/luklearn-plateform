
"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, BookOpen, Clock, Wallet, Settings, Download, CheckCircle2, FileText } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get("success") === "true";

  const enrolledCourses = [
    { id: 1, title: "AI & Machine Learning Foundations", progress: 65, status: "Active" },
    { id: 2, title: "Mastering Next.js & TypeScript", progress: 20, status: "Recently Started" }
  ];

  const invoices = [
    { id: "INV-2024-001", date: "Feb 15, 2024", amount: "$49.99", status: "Paid" },
    { id: "INV-2024-002", date: "Feb 01, 2024", amount: "$59.99", status: "Paid" }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl mb-10 flex items-center gap-4 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
          <div>
            <h3 className="font-bold text-lg">Transaction Confirmed!</h3>
            <p className="text-sm">You have been successfully enrolled. A digital invoice has been added to your profile.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="h-32 bg-primary relative">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-xl">
                  <Image src="https://picsum.photos/seed/user1/200/200" alt="Avatar" fill className="object-cover" />
                </div>
              </div>
            </div>
            <CardHeader className="pt-14 text-center">
              <CardTitle className="text-2xl font-headline text-primary">Abdullahi Ali</CardTitle>
              <CardDescription>Professional Learner • Mogadishu, SO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><BookOpen className="w-4 h-4" /> Courses Enrolled</span>
                <span className="font-bold">4</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4" /> Hours Learned</span>
                <span className="font-bold">24.5h</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><FileText className="w-4 h-4" /> Papers Read</span>
                <span className="font-bold">12</span>
              </div>
              <Button className="w-full bg-primary mt-4">Edit Profile</Button>
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <div className="flex-grow space-y-8">
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="bg-transparent border-b rounded-none h-auto p-0 mb-8 space-x-8">
              <TabsTrigger value="courses" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-0 font-bold text-lg">
                My Learning
              </TabsTrigger>
              <TabsTrigger value="payments" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-0 font-bold text-lg">
                Billing & Invoices
              </TabsTrigger>
              <TabsTrigger value="settings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-4 px-0 font-bold text-lg">
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-1 flex-grow">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-headline font-bold text-primary">{course.title}</h3>
                            <Badge className="bg-secondary/10 text-primary text-[10px]">{course.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">You have completed {course.progress}% of this course.</p>
                          <Progress value={course.progress} className="h-2 w-full max-w-md bg-muted" />
                        </div>
                        <Button className="bg-primary text-white">Continue Learning</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Recent Transactions</CardTitle>
                  <CardDescription>View and download your digital invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoices.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/5 rounded-full text-primary">
                            <Wallet className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-primary">{inv.id}</p>
                            <p className="text-xs text-muted-foreground">{inv.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className="font-bold text-primary">{inv.amount}</span>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">{inv.status}</Badge>
                          <Button variant="ghost" size="icon" className="text-primary">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-headline">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary">Email Notifications</label>
                      <p className="text-xs text-muted-foreground">Get updates about new courses and research.</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary">Language Preference</label>
                      <p className="text-xs text-muted-foreground">Select your primary learning language.</p>
                    </div>
                    <div className="flex justify-end items-center">
                      <Badge className="bg-primary text-white">English (Default)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
