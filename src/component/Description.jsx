import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Description = ({ description }) => {
    return (
        <>
            <Accordion type="single" collapsible>
                {
                    description?.map((currdescr , index) => {
                        return (
                            <AccordionItem key={index} value={`item-${index + 1}`}>
                                <AccordionTrigger><div className="font-bold text-md">{currdescr.label}</div></AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        {
                                            currdescr?.explain.map((currExp , id)=>{
                                                return (
                                                    <div key={id}>{currExp}</div>
                                                )
                                            })
                                        }
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </>
    )
}
export default Description;