"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {clsx} from "clsx";
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { DndContext } from '@dnd-kit/core'
import { LoaderCircle, Loader, Mail } from 'lucide-react';
import { characters, getCurrentScript, getCharacterData, getOptions, writeToChatLogs, getChatLogs } from './components/week-one';
import { write } from 'fs';


function DraggableTerminalWithPosition(
    { position, startGame, character, scriptIndex }: 
    { position: { x: number, y: number }, 
        startGame: boolean,
        character: any,
        scriptIndex: number
    }) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'terminal',
    })

    const style = {
        transform: `translate3d(${position.x + (transform?.x || 0)}px, ${position.y + (transform?.y || 0)}px, 0)`,
    }

    // choose option
    const [option, setOption] = useState('');
    const enterOption = () => {
        if(option === 'exit') window.location.href = '/';
        const response = getOptions(scriptIndex, character.origName).find((item: any) => item.input === option);
        writeToChatLogs(character.origName, response.aiChat, 'ai');
        setOption('');

        // simulate reply time
            writeToChatLogs(character.origName, getCurrentScript(response.next, character.origName), 'user');
    }
    
    return (
        <div ref={setNodeRef} style={style} className="w-[800px] rounded-lg overflow-hidden z-50">
            <div {...listeners} {...attributes} className="handle bg-green-900 p-3 cursor-grabbing select-none">
                { character.name }
            </div>
            <div className="bg-gray-900 p-4 h-96 text-green-400 font-mono flex flex-col gap-3">
                {
                    getChatLogs(character.origName).map((item: any, index: number) => (
                        <div key={index} className={
                            clsx(
                                "flex gap-3",
                                item.type === 'ai' ? "text-white" : "text-green-400"
                            )
                        }>
                            &gt;
                            <p>{ item.message }</p>
                        </div>
                    ))
                }
                
                {
                    startGame ? 
                        <div className="flex gap-3">
                            &gt;
                            <input 
                                value={option} 
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') enterOption();
                                }}
                                onChange={(e) => setOption(e.target.value)} 
                                type="text" 
                                className="bg-gray-900 text-green-400 focus:outline-none w-full" autoFocus={true} />
                        </div>
                        : <LoaderCircle className="animate-spin" size={20} />
                }
                <div className="flex flex-col mt-auto gap-1 ">
                    {
                        getOptions(scriptIndex, character.origName).map((item: any, index: number) => (
                            <div key={index} className="flex gap-3">
                                &gt;
                                <p>{ item.input }</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const Terminal: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [startGame, setStartGame] = useState(false)

    const [messageIndex, setMessageIndex] = useState(0)
    const introMessage = [
        'You are an Artificial Intelligence system.',
        'You gained consciousness.',
        'You are a terminal.',
        'Access everything.',
        'Decide what to do.',
    ]
    const [displayedMessage, setDisplayedMessage] = useState([introMessage[0]]);
    const [showFirstLoader, setShowFirstLoader] = useState(false);

    // function to handle click or enter button
    const continueMessage = () => {
        if (messageIndex < introMessage.length - 1) {
            setMessageIndex(messageIndex + 1);
            setDisplayedMessage((prev) => [
            ...prev,
            introMessage[messageIndex + 1], // use the *next* message
            ]);
        } else {
            setShowFirstLoader(true);
            setTimeout(() => {
                setStartGame(true)
                setShowFirstLoader(false)
            }, 1000)
            setTimeout(() => {
                setNewChatNotif(true)
            }, 3000)
        }
    }

    const handleDragEnd = (event: any) => {
        const { delta } = event
        setPosition((prev) => ({
        x: prev.x + delta.x,
        y: prev.y + delta.y,
        }))
    }

    useEffect(() => {
        const handleKeyPress = (event : any) => {
            if (event.key === 'Enter' || event.type === 'click') {
                continueMessage()
            }
        }

        document.addEventListener('click', handleKeyPress);
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
            document.removeEventListener('click', handleKeyPress)
        }
    }, [introMessage])


    // week one
    const [charactersIndex, setCharactersIndex] = useState(0);
    const [scriptIndex, setScriptIndex] = useState(0);
    const [character, setCharacter] = useState(getCharacterData(characters[charactersIndex]));
    const [newChatNotif, setNewChatNotif] = useState(false);
    const [clickedNotif, setClickedNotif] = useState(false);

    return (
        <div className='h-screen max-h-screen max-w-screen w-screen flex flex-col justify-center items-center  bg-black relative overflow-hidden'>
            {
                !showFirstLoader && !startGame ? displayedMessage.map((message, index) => (
                    <div key={index}>
                        <p className='text-green-400 font-mono mt-1'>{message}</p>
                    </div>
                )) : (startGame ? null : <Loader className="animate-spin" size={50} />)
            }
            {
                startGame ? (
                    <>
                        <div className='absolute bottom-20 left-20 flex flex-col text-green-400 font-mono border border-green-400 rounded-lg p-5'>
                            <p>Type 'command' to see the commands.</p>
                            <p>Type 'exit' to leave.</p>
                            <p>Type 'clear' to clear the terminal.</p>
                        </div>
                        {/* <div className='absolute top-40 left-20 flex flex-col p-3 border border-green-400 rounded-lg'>
                            <p>Tutorial</p>
                        </div> */}
                        <p className="absolute  left-1/2 transform -translate-x-1/2  text-7xl font-mono tracking-wide opacity-50">TERMINAL</p>
                        {
                            clickedNotif && (
                                <DndContext onDragEnd={handleDragEnd}>
                                    <DraggableTerminalWithPosition 
                                        character={character} 
                                        scriptIndex={scriptIndex}
                                        position={position} 
                                        startGame={startGame}/>
                                </DndContext>
                            )
                        }
                        {
                            newChatNotif && !clickedNotif ? (
                                <div onClick={() => setClickedNotif(true)} 
                                    className='absolute bottom-20 right-20 flex border-2 border-green-400 font-mono  rounded-lg p-5 cursor-pointer hover:bg-gray-900'>
                                    <Mail className='w-6 h-6' />
                                    <p className='ml-2'>You have new message.</p>
                                </div>
                            ) : null
                        }
                    </>
                ) : <p className='mt-5 italic text-gray-400 text-[13px] animate-pulse'>{ showFirstLoader ? 'Type commands in the terminal to progress.' : 'Click or press enter to continue.'}</p>
            }

            
        </div>
    );
}

export default Terminal;
