
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tractor } from "lucide-react";

export default function FarmerFAQPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="bg-primary/20 text-primary p-4 rounded-full">
          <Tractor className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Farmer FAQs
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Find answers to common questions about selling on AgriLink.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I list my produce?</AccordionTrigger>
          <AccordionContent>
            Simply log in to your Farmer Portal, set your location if it's your first time, and then you'll be taken to the 'Add New Product' page. Fill in the details like product name, quantity, price, and an optional description. Your listing will be live immediately.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I set my prices?</AccordionTrigger>
          <AccordionContent>
            You have full control over your pricing. You can set the price per kg when you add or edit a product. We also offer an AI Price Predictor tool to help you estimate a fair market value based on current trends.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I edit or delete my listings?</AccordionTrigger>
          <AccordionContent>
            Yes. From your Farmer Dashboard, you can click the three-dot menu on any product card to find options to 'Edit' or 'Delete' the listing at any time.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How do I get paid?</AccordionTrigger>
          <AccordionContent>
            Payments are processed securely through our platform. Once a buyer's order is confirmed, the funds are held until the produce is successfully delivered. Payouts are then transferred to your registered bank account on a weekly basis. (This is a demo, no real payments are processed).
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
