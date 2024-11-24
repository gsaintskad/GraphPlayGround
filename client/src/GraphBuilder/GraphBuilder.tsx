import { Button } from "@/components/ui/button"




export const GraphBuilder=()=>{
    return <div className={`flex flex-col h-full w-full`}>
        <div className={`bg-red-300 h-12 flex justify-center items-center gap-8`}>
            <Button>btn</Button>
            <Button>btn</Button>
            <Button>btn</Button>
            <Button>btn</Button>
        </div>

        <div className={`bg-amber-300 h-full`}>
            <div className={`pt-10 flex flex-col h-full bg-red-300 w-12 gap-8`}>
                <Button>btn</Button>
                <Button>btn</Button>
                <Button>btn</Button>
                <Button>btn</Button>
            </div>
        </div>


    </div>
}