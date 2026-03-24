
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GraduationCap, Wallet, ShieldCheck, ArrowLeft, CreditCard, Smartphone, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const courses = {
  "gen-ai-mastery": { title: "Generative AI Mastery", price: 49.99 },
  "fullstack-web": { title: "Full-Stack Web Development", price: 39.99 },
  "data-science-beginners": { title: "Data Science for Beginners", price: 29.99 },
  "ai-fundamentals": { title: "AI & Machine Learning Foundations", price: 49.99 },
  "fullstack-nextjs": { title: "Mastering Next.js & TypeScript", price: 59.99 },
  "digital-marketing": { title: "Advanced Digital Strategy", price: 35.00 },
};

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const course = courses[id as keyof typeof courses] || courses["gen-ai-mastery"];
  
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("evc");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    // Basic validation for Somali number (usually starting with 61 or 77)
    if (!phone.match(/^(61|77)\d{7}$/)) {
      toast({ 
        title: "Invalid Number", 
        description: "Please enter a valid EVC Plus number (e.g., 61xxxxxxx).", 
        variant: "destructive" 
      });
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({ 
        title: "Purchase Successful", 
        description: "Transaction verified. You have been enrolled and your invoice is generated." 
      });
      router.push("/profile?success=true");
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link href="/courses" className="flex items-center gap-2 text-primary hover:underline mb-8 font-bold">
        <ArrowLeft className="w-4 h-4" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        {/* Course Summary */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-headline font-bold text-primary">Checkout</h1>
          <Card className="border-none shadow-md overflow-hidden bg-white">
            <CardHeader className="bg-primary text-white">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-primary leading-tight">{course.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Digital Access Lifetime
                    </p>
                  </div>
                </div>
                <span className="font-bold text-primary">${course.price}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${course.price}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Merchant Fee</span>
                  <span className="text-green-600 font-bold">$0.00</span>
                </div>
              </div>
              <div className="pt-4 border-t flex justify-between items-center text-2xl font-bold text-primary font-headline">
                <span>Total</span>
                <span>${course.price} USD</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-primary/5 p-6 rounded-2xl flex items-start gap-4 border border-primary/10">
            <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
            <div>
              <p className="text-sm font-bold text-primary mb-1">Secure Transaction</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your payment is processed securely through Hormuud's EVC Plus gateway. We never store your PIN.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="lg:col-span-3">
          <Card className="border-none shadow-xl bg-white overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-green-600 w-3 h-3 rounded-full" />
                <div className="bg-orange-500 w-3 h-3 rounded-full" />
                <CardTitle className="font-headline text-primary ml-2">EVC Plus Payment</CardTitle>
              </div>
              <CardDescription>Instant enrollment via Somali mobile money.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <Label className="text-primary font-bold text-base">Select Service</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="evc" id="evc" className="peer sr-only" />
                    <Label
                      htmlFor="evc"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:bg-green-50 [&:has([data-state=checked])]:border-green-600 cursor-pointer transition-all"
                    >
                      <Smartphone className="mb-2 h-8 w-8 text-green-600" />
                      <span className="text-sm font-bold text-primary">EVC Plus</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="edahab" id="edahab" className="peer sr-only" />
                    <Label
                      htmlFor="edahab"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50 [&:has([data-state=checked])]:border-orange-500 cursor-pointer transition-all"
                    >
                      <CreditCard className="mb-2 h-8 w-8 text-orange-500" />
                      <span className="text-sm font-bold text-primary">e-Dahab</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-primary font-bold">Enter EVC Plus Number (61xxxxxxx)</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold border-r pr-3 mr-3">+252</span>
                    <Input
                      id="phone"
                      placeholder="612345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-20 h-14 text-lg border-primary/20 rounded-xl focus-visible:ring-green-600"
                    />
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-2xl space-y-3 border border-muted">
                  <p className="text-sm font-bold text-primary flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-green-600" />
                    How to pay:
                  </p>
                  <ol className="text-xs text-muted-foreground space-y-2 list-decimal pl-4">
                    <li>Enter your Hormuud mobile number above.</li>
                    <li>Look for the <span className="text-green-600 font-bold underline">USSD prompt</span> that will appear on your phone screen.</li>
                    <li>Enter your <span className="text-primary font-bold">EVC Plus PIN</span> to authorize the payment of <span className="text-primary font-bold">${course.price}</span>.</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8 bg-muted/10 flex flex-col gap-4 border-t">
              <Button 
                className={`w-full h-14 text-white font-bold text-xl shadow-xl transition-all ${paymentMethod === 'evc' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-500 hover:bg-orange-600'}`}
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Awaiting PIN Confirmation...
                  </div>
                ) : `Pay with ${paymentMethod === 'evc' ? 'EVC Plus' : 'e-Dahab'}`}
              </Button>
              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                <ShieldCheck className="w-3 h-3" />
                Enrollment will be automatically unlocked upon successful PIN entry.
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
