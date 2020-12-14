let linearModel = {
    "1": {
        id: "1",
        name: "Diet",
        //type: "source",
        shape:{
            x: 0,
            y: 0,
            diameter:0.5,
        },
        show: false,
        history: [],
        initial: -0.5,
        value: -0.5,
        constant: 0.3,
        last_val: 0,
        min_cap:-1,
        max_cap:1,
        flows_out: [
            {
                id: "directLink",
                type: "dependent",
                name: "Dependent",
                initial: 0.5,
                value: 0.5,
                delay:0,
                flow_to: "2",
            },
        ]
    },
    "2": {
        id: "2",
        name: "Health",
        type: "node",
        shape:{
            x:2,
            y:0,
            diameter:0.3,
        },
        history: [],
        initial: -0.3,
        constant: 0.3,
        value: -0.3,
        last_val: 0,
        min_cap:-1,
        max_cap:1,
        flows_out: [
           
        ]
    },
};
let inverseModel = {
  
    "1": {
        id: "1",
        name: "Stress",
        //type: "source",
        shape:{
            x: 0,
            y: 0,
            diameter:1,
        },
        show: false,
        history: [],
        initial: -0.5,
        constant: 0,
        value: -0.5,
        last_val: 0,
        min_cap:-1,
        max_cap:0,
        flows_out: [
            {
                id: "directLink",
                type: "dependent",
                name: "Inverse",
                initial: -0.25,
                value: -0.25,
                feedback:false,
                flow_to: "2",
            },
        ]
    },
    "2": {
        id: "2",
        name: "Health",
        //type: "source",
        shape:{
            x: 2,
            y: 0,
            diameter:1,
        },
        show: false,
        history: [],
        initial: -0.3,
        constant: 1,
        value: -0.3,
        last_val: 0,
        min_cap:-1,
        max_cap:1,
        flows_out: [
            {
                id: "directLink",
                type: "dependent",
                name: "Dependent",
                value: 0.5,
                delay:20,
                feedback:true,
                flow_to: "1",
            }
        ]
    },
  
};
let nonlinearModel = {
  
    "1": {
        id: "1",
        name: "Sleep",
        //type: "source",
        shape:{
            x: 0,
            y: 0,
            diameter:1,
        },
        show: false,
        history: [],
        initial: -0.2,
        constant: 1,
        value: -0.2,
        last_val: 0,
        min_cap:-1,
        max_cap:1,
        flows_out: [
            {
                id: "directLink",
                type: "exp",
                name: "Inverse",
                initial: 0.5,
                value: 0.5,
                feedback:false,
                flow_to: "2",
            },
        ]
    },
    "2": {
        id: "2",
        name: "Health",
        //type: "source",
        shape:{
            x: 2,
            y: 0,
            diameter:1,
        },
        show: false,
        history: [],
        initial: -0.3,
        constant: 1,
        value: -0.3,
        last_val: 0,
        min_cap:-1,
        max_cap:1,
        flows_out: [
            {
                id: "directLink",
                type: "dependent",
                name: "Dependent",
                value: 0.5,
                delay:20,
                feedback:true,
                flow_to: "1",
            }
            
        ]
    },
   

};


let indirectModel = {
  
    "1": {
        id: "1",
        name: "Sun",
        grid:4,
        //type: "source",
        shape:{
            x: 0,
            y: 0,
            diameter:0.7,
        },
        show: false,
        history: [],
        initial: 0.7,
       
        value: 0.7,
        last_val: 0,
        min_cap:-1,
        max_cap:1,
        flows_out: [
            {
                id: "directLink",
                type: "dependent",
                name: "Inverse",
                initial: 0.5,
                value: 0.5,
                feedback:false,
                flow_to: "2",
            },
        ]
    },
    "2": {
        id: "2",
        name: "Vitamin D",
        //type: "source",
        shape:{
            x: 1,
            y: 0,
            diameter:0.7,
        },
        show: false,
        history: [],
        initial: 0.5,
        constant: 0.5,
        value: 0.5,
        last_val: 0,
        min_cap:-1,
        max_cap:1,
        flows_out: [
            {
                id: "directLink",
                type: "dependent",
                name: "Inverse",
                initial: 0.5,
                value: 0.5,
                feedback:true,
                flow_to: "3",
            },
        ]
    },
    "3": {
        id: "3",
        name: "Health",
        //type: "source",
        shape:{
            x: 2,
            y: 0,
            diameter:0.7,
        },
        show: false,
        history: [],
        initial: 0.5,
        constant: 0.5,
        value: 0.5,
        last_val: 0,
        min_cap:-1,
        max_cap:1,
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
    //     initial: 0.5,
    //     value: 0.5,
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