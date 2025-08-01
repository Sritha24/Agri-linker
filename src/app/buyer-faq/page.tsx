
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Eye } from "lucide-react";

export default function BuyerFAQPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
       <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="bg-primary/20 text-primary p-4 rounded-full">
          <Eye className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Buyer FAQs
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Find answers to common questions about buying produce on AgriLink.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I buy produce?</AccordionTrigger>
          <AccordionContent>
            It's simple! Just browse the products on our 'Products' page, add the items you like to your cart, and then proceed to checkout. No account is required to make a purchase.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is the produce fresh?</AccordionTrigger>
          <AccordionContent>
            Absolutely. You are buying directly from farmers who list their produce soon after harvest. We also provide an AI-powered Freshness Predictor to give you an estimate of the produce's shelf life.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How is shipping calculated?</AccordionTrigger>
          <AccordionContent>
            We currently offer a flat-rate shipping fee on all orders to keep things simple. The fee will be added to your subtotal at checkout.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Can I change or cancel my order?</AccordionTrigger>
          <AccordionContent>
            Once an order is placed, it is sent directly to the farmer for fulfillment. Because of this, we cannot modify or cancel orders after they have been confirmed. Please review your cart carefully before checking out.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
