'use client';
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Terminal, Folder, Coffee, ArrowUpRight, Sparkles, Facebook } from 'lucide-react';


export default function Home() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-mono">
            <div className="fixed inset-0 pointer-events-none opacity-70" 
                style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'}}></div>
            <div 
                className="fixed w-8 h-8 border border-orange-600 rounded-full pointer-events-none z-50 transition-transform duration-200"
                style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                transform: 'translate(-50%, -50%)'
                }}
            ></div>

            {/* topbar */}

            <div className="fixed top-0 w-full z-40 bg-black px-8 py-3">
                <div className="flex justify-between items-center text-white">
                    <div className="flex gap-3">
                        <p className="text-orange-400">{">"}_</p>
                        <p>~/portfolio</p>
                        <span className="text-neutral-600">|</span>
                        <span className="text-neutral-500">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
                    </div>
                    <div className="flex gap-5">
                        <a>work</a>
                        <a>projects</a>
                        <a>thots</a>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col px-8">
                <div className="py-32 flex flex-col">
                    <p className="text-neutral-500">[ fresh_grad = TRUE ]</p>
                    <p className="mt-2 mb-4 text-6xl leading-tight font-light">
                        cy jay herrera,<br/>
                        <span className="text-neutral-600 italic">full stack developer</span>
                    </p>
                    <p className="leading-relaxed max-w-xl text-neutral-600">
                        i get paid for staring at a screen for 8 hours everyday. currently building a system with laravel, 
                        trying to normalize tables and queries, and putting rounded borders everywhere.
                    </p>
                    <div className="flex gap-3 mt-7">
                        <a 
                            href="https://github.com/Perseus24" 
                            className="flex gap-2 justify-center items-center bg-neutral-900 text-neutral-100 px-4 py-2 hover:bg-orange-400 transition-colors">
                            <Github size={16} />
                            github
                        </a>
                        <a 
                            href="https://github.com/Perseus24" 
                            className="flex gap-2 justify-center items-center border border-neutral-900 text-neutral-900 px-4 py-2 
                                hover:border-orange-400 hover:text-orange-600 transition-colors">
                            <Linkedin size={16} />
                            linkedin
                        </a>
                        <a 
                            href="https://github.com/Perseus24" 
                            className="flex gap-2 justify-center items-center border border-neutral-900 text-neutral-900 px-4 py-2 
                                hover:border-orange-400 hover:text-orange-600 transition-colors">
                            <Facebook size={16} />
                            facebook
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}