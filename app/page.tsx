'use client';
import { useEffect, useState } from "react";
import { Github, Linkedin, Coffee,  Facebook, Calendar, MapPin } from 'lucide-react';
import { icons } from "./lib/icons";


export default function Home() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [time, setTime] = useState(new Date());
    const [activeStack, setActiveStack] = useState('backend');

    const techStack = {
        backend: [
            { name: 'php' },
            { name: 'java' },
            { name: 'laravel' },
            { name: 'nodejs' },
            { name: 'mysql' },
            { name: 'phpmyadmin' },
        ],
        frontend: [
            { name: 'typescript' },
            { name: 'javascript' },
            { name: 'react' },
            { name: 'tailwind' },
            { name: 'nextjs' },
            { name: 'flutter' }
        ],
        languages: [
            { name: 'python' },
            { name: 'dart' },
            { name: 'r' },
            { name: 'c' }
        ],
        tools: [
            { name: 'tableau' },
            { name: 'kaggle' },
            { name: 'figma' },
            { name: 'git' },
            { name: 'vscode' }
        ]
    }

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
            <div className="fixed inset-0 pointer-events-none opacity-50" 
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
            <div className="flex flex-col px-8 items">
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
                            href="https://www.linkedin.com/in/cy-jay-herrera-74b297268/" 
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

                {/* tech stack */}
                <p className="mb-6 text-neutral-700 tracking-wider">tech stack</p>
                <div className="flex gap-2 border-b border-neutral-400 mb-5">
                    {
                        Object.keys(techStack).map((key) => (
                            <div 
                                key={key}
                                onClick={() => setActiveStack(key)}
                                className={`px-4 py-2 text-sm transition-colors relative cursor-pointer ${
                                    activeStack === key 
                                        ? 'text-orange-600' 
                                        : 'text-neutral-500 hover:text-neutral-900'
                                    }`}
                                >
                                <p>{key}</p>
                                {activeStack === key && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"></div>
                                )}
                            </div>
                        ))
                    }
                </div>
                <div className="grid grid-cols-4 gap-4 mb-24">
                    {
                        techStack[activeStack as keyof typeof techStack].map((tech, index) => (
                            <div key={index} className="flex flex-col justify-between gap-2 p-6 border border-neutral-400 transition-all hover:shadow-lg hover:border-orange-600">
                                {icons[tech.name as keyof typeof icons]}
                                <p className="font-medium text-neutral-600">{tech.name}</p>
                            </div>
                        ))
                    }
                </div>
                {/* Experience */}
                <p className="mb-6 text-neutral-700 tracking-wider">notable experiences</p>
                <div className="pl-8 flex flex-col gap-3 relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200 group-hover:bg-orange-600 transition-colors"></div>
                    <p className="tracking-wide text-2xl font-medium group-hover:text-orange-600 transition-colors">full stack developer</p>
                    <div className="flex items-center gap-3">
                        <p className="font-medium text-neutral-600">Bicol University Research Development and Management Division</p>
                        <p className="text-neutral-400">•</p>
                        <p className="text-sm text-neutral-500">Job Order</p>
                    </div>
                    <div className="flex items-center gap-5 text-neutral-500 text-sm mb-2">
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <p>July 2025 - Present</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <p>Onsite</p>
                        </div>
                    </div>
                    <ul className="gap-2 max-w-6xl">
                        <li className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-orange-600">→</span>
                            <span>Designed a relational database schema for RDESys to reduce redundancy and ensure data integrity.
                            </span>
                        </li>
                        <li className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-orange-600">→</span>
                            <span>Developed both frontend and backend for PROMIS+, streamlining the proposal submission process with a user-friendly interface.
                            </span>
                        </li>
                        <li className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-orange-600">→</span>
                            <span>Built features for reports generation and data analytics, empowering users and admins to derive meaningful insights.
                            </span>
                        </li>
                        <li className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-orange-600">→</span>
                            <span>Led the development of clean, maintainable code, adhering to best practices for security, scalability, and data privacy.
                            </span>
                        </li>
                        <li className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-orange-600">→</span>
                            <span>Collaborated with the Bicol University – ICTO for system integration and deployment, ensuring alignment with infrastructure and server needs.
                            </span>
                        </li>
                    </ul>
                    <div className="text-xs text-neutral-500">
                        Laravel · Inertia · VueJs · PHP · MySQL
                    </div>
                </div>
                <div className="mt-10 pl-8 flex flex-col gap-3 relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-200 group-hover:bg-orange-600 transition-colors"></div>
                    <p className="tracking-wide text-2xl font-medium group-hover:text-orange-600 transition-colors">software engineer intern</p>
                    <div className="flex items-center gap-3">
                        <p className="font-medium text-neutral-600">Roompal</p>
                        <p className="text-neutral-400">•</p>
                        <p className="text-sm text-neutral-500">Internship</p>
                    </div>
                    <div className="flex items-center gap-5 text-neutral-500 text-sm mb-2">
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <p>January 2024 - April 2024</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <p>Remote</p>
                        </div>
                    </div>
                    <ul className="gap-2 max-w-6xl">
                        <li className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-orange-600">→</span>
                            <span>Learned the fundamentals of Flutter and its applications.
                            </span>
                        </li>
                        <li className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-orange-600">→</span>
                            <span>Developed multiple basic mobile applications using Flutter such as a To-Do app.
                            </span>
                        </li>
                        <li className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-orange-600">→</span>
                            <span>Designed and developed two features (search and filter bar) for the company's web and mobile app using Flutter and Android Studio.
                            </span>
                        </li>
                        <li className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-orange-600">→</span>
                            <span>Rendered 200+ hours remotely and presented the final output onsite.
                            </span>
                        </li>
                        <li className="text-neutral-600 text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-orange-600">→</span>
                            <span>Completed the company's Flutter bootcamp.
                            </span>
                        </li>
                    </ul>
                    <div className="text-xs text-neutral-500">
                        Flutter · Dart
                    </div>
                </div>
                {/* Certifications */}
                <p className="mb-6 text-neutral-700 tracking-wider mt-24">certifications</p>
                <div className="flex gap-4 pl-8">
                    <div className="flex flex-1 flex-col gap-3">
                        <div className="flex items-center gap-2 text-xs">
                            <p className=" text-neutral-600 tracking-wide">NRG-TESDA PHILIPPINES ·</p>
                            <div className="px-3 py-2 bg-orange-500 text-white tracking-wide">NATIONAL CERTIFICATION</div>
                        </div>
                        <p className="font-medium text-2xl tracking-wider">Programming (Java) NC III</p>
                        <div className="flex flex-col gap-1 text-sm">
                            <p className=" text-neutral-600 tracking-wide font-medium">February 2024 - March 2024</p>
                            <p className=" text-neutral-600 tracking-wide">Competency-based</p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-3">
                        <div className="flex items-center gap-2 text-xs">
                            <p className=" text-neutral-600 tracking-wide">GOOGLE VIA COURSERA ·</p>
                            <div className="px-3 py-2 bg-blue-500 text-white tracking-wide">PROFESSIONAL CERTIFICATE</div>
                        </div>
                        <p className="font-medium text-2xl tracking-wider">Google Data Analytics Professional</p>
                        <div className="flex flex-col gap-1 text-sm">
                            <p className=" text-neutral-600 tracking-wide font-medium">September 2022 - June 2023</p>
                            <p className=" text-neutral-600 tracking-wide">8-Course series</p>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <footer className="border-t border-neutral-200 py-12 mt-10">
                    <div className="flex justify-between items-center text-sm text-neutral-500">
                        <p>© 2025 · built with nextjs, caffeine, and mild existential dread</p>
                        <div className="flex items-center gap-2">
                            <Coffee size={16} />
                            <span>probably debugging rn</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}