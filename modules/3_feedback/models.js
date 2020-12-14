let linearModel = {
    "1": {
        id: "1",
        name: "A",
        //type: "source",
        shape:{
            x: 0,
            y: 1,
            diameter:1,
        },
        show: false,
        history: [],
        initial: 1.0,
        value: 1.0,
        constant: 0.3,
        last_val: 0,
        min_cap:-2,
        max_cap:2,
        flows_out: [
            {
                id: "directLink",
                type: "dependent",
                name: "Dependent",
                value: 0.5,
                delay:5,
                flow_to: "2",
            },
        ]
    },
    "2": {
        id: "2",
        name: "B",
        type: "node",
        shape:{
            x:2,
            y:1,
            diameter:0.3,
        },
        history: [],
        initial: 0.5,
        constant: 0.3,
        value: 0.5,
        last_val: 0,
        min_cap:-2,
        max_cap:2,
        flows_out: [
            {
                id: "directLink",
                type: "dependent",
                name: "Dependent",
                value: 0.5,
                delay:20,
                flow_to: "1",
            }
        ]
    },
};
let inverseModel = {
  
    "1": {
        id: "1",
        name: "C",
        //type: "source",
        shape:{
            x: 0,
            y: 1,
            diameter:1,
        },
        show: false,
        history: [],
        initial: 1,
        constant: 1,
        value: 1,
        last_val: 0,
        min_cap:-1.5,
        max_cap:1.5,
        flows_out: [
            {
                id: "directLink",
                type: "dependent",
                name: "Inverse",
                value: -0.25,
                flow_to: "2",
            },
        ]
    },
    "2": {
        id: "2",
        name: "D",
        //type: "source",
        shape:{
            x: 2,
            y: 1,
            diameter:1,
        },
        show: false,
        history: [],
        initial: 1,
        constant: 1,
        value: 1,
        last_val: 0,
        min_cap:-1.5,
        max_cap:1.5,
        flows_out: [
            
        ]
    },

};
let nonlinearModel = {
  
    "1": {
        id: "1",
        name: "C",
        //type: "source",
        shape:{
            x: 0,
            y: 1,
            diameter:1,
        },
        show: false,
        history: [],
        initial: 1,
        constant: 1,
        value: 1,
        last_val: 0,
        min_cap:-1.5,
        max_cap:1.5,
        flows_out: [
            {
                id: "directLink",
                type: "exp",
                name: "Inverse",
                value: 2,
                flow_to: "2",
            },
        ]
    },
    "2": {
        id: "2",
        name: "D",
        //type: "source",
        shape:{
            x: 2,
            y: 1,
            diameter:1,
        },
        show: false,
        history: [],
        initial: 1,
        constant: 1,
        value: 1,
        last_val: 0,
        min_cap:-1.5,
        max_cap:1.5,
        flows_out: [
            
        ]
    },
  
 
};


let indirectModel = {
  
    "1": {
        id: "1",
        name: "C",
        grid:4,
        //type: "source",
        shape:{
            x: 0,
            y: 1,
            diameter:0.7,
        },
        show: false,
        history: [],
        initial: 0.7,
       
        value: 0.7,
        last_val: 0,
        min_cap:-1.5,
        max_cap:1.5,
        flows_out: [
            {
                id: "directLink",
                type: "dependent",
                name: "Inverse",
                value: 0.5,
                flow_to: "2",
            },
        ]
    },
    "2": {
        id: "2",
        name: "D",
        //type: "source",
        shape:{
            x: 1,
            y: 1,
            diameter:0.7,
        },
        show: false,
        history: [],
        initial: 1,
        constant: 0.5,
        value: 0.5,
        last_val: 0,
        min_cap:-1.5,
        max_cap:1.5,
        flows_out: [
            {
                id: "directLink",
                type: "exp",
                name: "Inverse",
                value: 1.5,
                flow_to: "3",
            },
        ]
    },
    "3": {
        id: "3",
        name: "e",
        //type: "source",
        shape:{
            x: 2,
            y: 1,
            diameter:0.7,
        },
        show: false,
        history: [],
        initial: 0.5,
        constant: 0.5,
        value: 0.5,
        last_val: 0,
        min_cap:-1.5,
        max_cap:1.5,
        flows_out: [
            
        ]
    },
};
// "3": {
    //     id: "3",
    //     name: "Word Of Mouth",
    //     type: "sink",
    //     shape:{
    //         x: 3,
    //         y: 0,
    //         diameter:1,
    //     },
    //     show: false,
    //     history: [],
    //     initial: 1,
    //     value: 1,
    //     last_val: 0,
    //     min_cap:-2,
    //     max_cap:2,
    //     flows_out: [
    //         {
    //             id: "interestRate",
    //             type: "variable",
    //             name: "Interest Rate",
    //             value: 0.025,
    //             flow_to: "2",
    //         },
    //     ]
    // },
 // {
            //     id: "interestRate",
            //     type: "variable",
            //     name: "Interest Rate",
            //     value: -0.05,
            //     flow_to: "1",
            // },