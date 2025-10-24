export const characters = [
    'Lisa'
]

export const characterData = {
    Lisa: {
        origName: 'Lisa',
        name: 'Lisa22',
        age: 25,
        role: 'Secretary',
        mood: 'happy'
    }
}


export const script = {
    Lisa: {
        0: {
            message: 'Good Afternoon Lukas, help me please. i forgot my passwrod.',
            responses : [
                {
                    input: "help",
                    aiChat: "Hello Lisa, Let me list the steps you can take to reset your password.",
                    next: 1
                },
                {
                    input: "ignore",
                    aiChat: "No problem, what can I do for you?",
                    next: 2
                }, 
                {
                    input: "access account",
                    next: 3
                }, 
                {
                    input: "lock account",
                    next: 4
                }
            ]
        },
        1: {
            message: 'Thank you so much',
            messageResponse: 0
        }
        
    }
}

export let chatLogs = {
    Lisa: [
        {
            message: 'Good Afternoon Lukas, help me please. i forgot my passwrod.',
            type: 'user'
        }
    ]
} 

export const getCharacterData = (character: string) => {
    // @ts-ignore
    return characterData[character]
}

export const getCurrentScript = (index: number, character: string) => {
    // @ts-ignore
    return script[character][index].message
}

export const getOptions = (index: number, character: string) => {
    // @ts-ignore
    return script[character][index].responses
}

export const writeToChatLogs = (character: string, message: string, type: string) => {
    // @ts-ignore
    
    chatLogs[character].push({ message, type: type })
}

export const getChatLogs = (character: string) => {
    // @ts-ignore
    return chatLogs[character]
}