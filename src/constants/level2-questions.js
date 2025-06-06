export const EMERGENCYSCENARIOS = {
    towerFire: [
        {
            id: 1,
            text: "You're in your office when you hear a pop, then smell burning plastic. A paralegal yells: 'The printer room’s on fire!' Smoke curls under the door. No alarm has gone off yet. What do you do first?",
            villainSound: "/audio/joker-laugh.mp3",
            timer: 12,
            choices: [
                { text: "Pull the fire alarm", nextId: 2 },
                { text: "Grab the fire extinguisher", nextId: 3 },
                { text: "Call the front desk", nextId: 99 },
                { text: "Warn people and evacuate", nextId: 4 }
            ]
        },
        {
            id: 2,
            text: "You pull the fire alarm. Sirens blare. Evacuation begins. Fire services are alerted automatically. You’ve triggered the building’s emergency protocol.",
            timer: null,
            choices: [
                { text: "Evacuate via secondary stairwell", nextId: 5 }
            ]
        },
        {
            id: 3,
            text: "You grab the extinguisher and enter the room. Flames are spreading. What type of extinguisher is it?",
            timer: 10,
            choices: [
                { text: "Dry chemical or CO₂", nextId: 6 },
                { text: "Water extinguisher", nextId: 99 }
            ]
        },
        {
            id: 4,
            text: "You shout for people to evacuate. Some follow, others don’t. Without the alarm, many remain unaware. A staff member is later found unconscious.",
            timer: null,
            choices: [
                { text: "Pull the alarm now", nextId: 2 }
            ]
        },
        {
            id: 5,
            text: "Smoke fills the hallway. Where do you go?",
            timer: 10,
            choices: [
                { text: "Main stairwell (north end)", nextId: 7 },
                { text: "Secondary stairwell (south end)", nextId: 8 },
                { text: "Take the elevator", nextId: 99 },
                { text: "Head to the rooftop", nextId: 9 },
                { text: "Stay to help others", nextId: 10 }
            ]
        },
        {
            id: 6,
            text: "You suppress most of the fire, but smoke is thick. You cough heavily and need medical attention. Fire team arrives shortly after.",
            timer: null,
            choices: [
                { text: "Evacuate via secondary stairwell", nextId: 5 }
            ]
        },
        {
            id: 7,
            text: "You reach the main stairwell. The door handle is hot. Do you:",
            timer: 8,
            choices: [
                { text: "Open it anyway", nextId: 99 },
                { text: "Check and retreat", nextId: 8 }
            ]
        },
        {
            id: 8,
            text: "You use the secondary stairwell. It’s clear and safe. You lead others out. Firefighters arrive as you exit.",
            timer: null,
            choices: [
                { text: "Give a statement to fire officers", nextId: 11 }
            ]
        },
        {
            id: 9,
            text: "You reach the rooftop and wave for help. Firefighters spot you. If the fire stays below, you’re rescued. If it spreads upward, you’re at risk.",
            timer: null,
            choices: []
        },
        {
            id: 10,
            text: "You return to help others. You find two clerks frozen and a lawyer trapped. If you stay calm and lead them out, you save lives. If you delay too long, the fire reaches your area.",
            choices: [
                { text: "Lead them to the secondary stairwell", nextId: 8 }
            ]
        },
        {
            id: 11,
            text: "Outside, you give your report. Your early actions helped save lives. The fire is under control. You realize: the first 60 seconds made all the difference.",
            timer: null,
            choices: []
        },
        {
            id: 99,
            text: "Incorrect action. The fire spreads or someone is injured. Always pull the alarm first, use the correct extinguisher, and evacuate safely.",
            timer: null,
            choices: []
        }
    ],

    fireExtinguisherScenario: [
        {
            id: 1,
            text: "You're making coffee in the break room when the microwave sparks, igniting a paper towel roll. Flames spread to a plastic bin and curtain. Smoke fills the room. What do you do first?",
            villainSound: "/audio/joker-laugh.mp3",
            timer: 12,
            choices: [
                { text: "Grab the nearby fire extinguisher", nextId: 2 },
                { text: "Pull the fire alarm and evacuate", nextId: 6 },
                { text: "Call the front desk to report the fire", nextId: 99 },
                { text: "Use water from the sink to douse the flames", nextId: 99 }
            ]
        },
        {
            id: 2,
            text: "You grab the Class ABC extinguisher. How do you use it?",
            timer: 10,
            choices: [
                { text: "Aim at the base and sweep side to side", nextId: 3 },
                { text: "Aim at the top of the flames", nextId: 99 },
                { text: "Spray the middle in a steady stream", nextId: 99 },
                { text: "Throw the extinguisher at the fire", nextId: 99 }
            ]
        },
        {
            id: 3,
            text: "You follow the PASS method and reduce the flames. Smoke thickens. What do you do next?",
            timer: 10,
            choices: [
                { text: "Continue using the extinguisher", nextId: 4 },
                { text: "Pull the fire alarm and evacuate", nextId: 6 },
                { text: "Open a window to ventilate", nextId: 99 },
                { text: "Try unplugging the microwave", nextId: 99 }
            ]
        },
        {
            id: 4,
            text: "You extinguish the fire completely. The room is smoky but safe. Safety team is notified.",
            timer: null,
            choices: [
                { text: "Evacuate to fresh air", nextId: 5 }
            ]
        },
        {
            id: 5,
            text: "You exit the room. The hallway is smoky. Which way do you go?",
            timer: 10,
            choices: [
                { text: "Main stairwell (closest exit)", nextId: 99 },
                { text: "Secondary stairwell (far end)", nextId: 7 },
                { text: "Take the elevator", nextId: 99 },
                { text: "Return to grab belongings", nextId: 99 }
            ]
        },
        {
            id: 6,
            text: "You pull the alarm. Staff evacuate. Fire services are on the way. You help others exit safely.",
            timer: null,
            choices: [
                { text: "Head to the secondary stairwell", nextId: 7 }
            ]
        },
        {
            id: 7,
            text: "You've reach safely. A safety officer asks: What fires can a Class ABC extinguisher handle?",
            timer: 10,
            choices: [
                { text: "Only paper and wood (Class A)", nextId: 99 },
                { text: "Flammable liquids (Class B) only", nextId: 99 },
                { text: "Electrical fires (Class C) only", nextId: 99 },
                { text: "Combustibles, flammable liquids, and electrical fires (A, B, C)", nextId: 8 }
            ]
        },
        {
            id: 8,
            text: "Correct. You used the right extinguisher, followed protocol, and evacuated safely. Your actions prevented a major incident.",
            timer: null,
            choices: []
        },
        {
            id: 99,
            text: "Incorrect action. The fire worsens or someone is injured. Always follow fire safety protocols and use the correct extinguisher.",
            timer: null,
            choices: []
        }
    ],

    riddlerPowerGrid: [
        {
            id: 1,
            text: "You hear The outlet's buzzing and see smoke behind the shredder! Answer the riddle:'I’m silent and swift, I ride the wire,\nInvisible force that can spark a fire.\nYou can’t see me, but I sting and bite —\nGuess me wrong, and feel my might.'",
            villainSound: "/audio/riddler-voice.mp3",
            timer: 12,
            choices: [
                { text: "Electricity", nextId: 2 },
                { text: "Heat", nextId: 99 },
                { text: "Voltage", nextId: 99 },
                { text: "Static", nextId: 99 }
            ]
        },
        {
            id: 2,
            text: "I don’t yell or scream, but I stop the flow. I flip when danger starts to grow. I live in a box, but I’m no pet — Guess me right, or you’ll regret.",
            timer: 10,
            choices: [
                { text: "Circuit breaker", nextId: 3 },
                { text: "Surge protector", nextId: 99 },
                { text: "Main switch", nextId: 99 },
                { text: "Fire alarm", nextId: 99 }
            ]
        },
        {
            id: 3,
            text: "I guard your hands from deadly touch, Without my grip, the shock is much. I’m rubber, thick, and made to shield — Guess me right before you yield.",
            timer: 10,
            choices: [
                { text: "Insulated rubber gloves", nextId: 4 },
                { text: "Cotton gloves", nextId: 99 },
                { text: "Leather gloves", nextId: 99 },
                { text: "Bare hands", nextId: 99 }
            ]
        },
        {
            id: 4,
            text: "I offer more plugs, but double me up, And wires may burn or circuits erupt. I’m helpful alone, but stacked I’m a trap — Guess me right to avoid mishap.",
            timer: 10,
            choices: [
                { text: "Power strip", nextId: 5 },
                { text: "Extension cord", nextId: 99 },
                { text: "USB hub", nextId: 99 },
                { text: "Adapter block", nextId: 99 }
            ]
        },
        {
            id: 5,
            text: "I fight the flames that wires start, But use me wrong, and you’ll depart. I’m cold and clean, no water inside — Guess me right, or run and hide.",
            timer: 10,
            choices: [
                { text: "CO₂ extinguisher", nextId: 6 },
                { text: "Dry chemical extinguisher", nextId: 6 },
                { text: "Foam extinguisher", nextId: 99 },
                { text: "Water extinguisher", nextId: 99 }
            ]
        },
        {
            id: 6,
            text: "I give the green when danger’s gone, Without my word, don’t carry on. I’m written, checked, and signed with care — Guess me right if you dare.",
            timer: 10,
            choices: [
                { text: "All-clear notice", nextId: 7 },
                { text: "Safety checklist", nextId: 7 },
                { text: "Verbal 'It’s fine now'", nextId: 99 },
                { text: "Remove caution tape", nextId: 99 }
            ]
        },
        {
            id: 7,
            text: "When too many things ask for juice, I can’t keep up and wires go loose. I’m the burden that circuits dread — Guess me right or risk the spread.",
            timer: 10,
            choices: [
                { text: "Current overload", nextId: 8 },
                { text: "Surge protector failure", nextId: 99 },
                { text: "Printer jam", nextId: 99 },
                { text: "Tripped breaker", nextId: 99 }
            ]
        },
        {
            id: 8,
            text: "I break the chain and spread the load, I give each tool its own safe road. I’m wired deep, not just a strip — Guess me right to end the trip.",
            timer: 10,
            choices: [
                { text: "Dedicated circuits", nextId: 10 },
                { text: "New surge protector", nextId: 99 },
                { text: "Power-saving mode", nextId: 99 },
                { text: "Ban kettles", nextId: 99 }
            ]
        },
        {
            id: 10,
            text: "You solved every riddle, isolated the hazard, used proper PPE, and proposed a lasting fix.",
            timer: null,
            choices: []
        },
        {
            id: 99,
            text: "The hazard worsens or is mishandled. You failed to solve the riddles with care.",
            timer: null,
            choices: []
        }
    ]
};
