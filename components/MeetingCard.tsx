"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {avatarImages} from  '@/constants/sidebar'
import { useToast } from "./ui/use-toast";
import { MdContentCopy } from "react-icons/md";
import {ReactNode} from "react";
interface MeetingCardProps {
    title: string;
    date: string;
    icon: ReactNode;
    isPreviousMeeting?: boolean;
    buttonIcon1?: ReactNode;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

const MeetingCard = ({
                         icon,
                         title,
                         date,
                         isPreviousMeeting,
                         buttonIcon1,
                         handleClick,
                         link,
                         buttonText,
                     }: MeetingCardProps) => {
    const { toast } = useToast();

    return (
        <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-stone-950 px-5 py-8 xl:max-w-[568px]">
            <article className="flex flex-col gap-5">
                {icon}
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                </div>
            </article>
            <article className={cn("flex justify-center relative", {})}>
                <div className="relative flex w-full max-sm:hidden">
                    {avatarImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt="attendees"
                            width={40}
                            height={40}
                            className={cn("rounded-full", { absolute: index > 0 })}
                            style={{ top: 0, left: index * 28 }}
                        />
                    ))}
                    <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
                        +5
                    </div>
                </div>
                {!isPreviousMeeting && (
                    <div className="flex gap-2">
                        <Button onClick={handleClick} className="rounded bg-blue-800 px-6">
                            {buttonIcon1 && (
                                {buttonIcon1}
                            )}
                            &nbsp; {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast({
                                    title: "Link Copied",
                                });
                            }}
                            className="bg-dark-4 px-6 gap-1 bg-zinc-900"
                        >
                           <MdContentCopy/>
                             Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    );
};

export default MeetingCard;