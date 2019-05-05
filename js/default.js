var buildPositions={
    welcomePanel : buildWelcomePanel,
    ITGoalsDefinition: buildITGoalsDefinition,
    companyGoals : buildCompanyGoalsPanel,
    ITGoals: buildITCompanyGoalsPanel,
    AutoDiagnostic: buildAutoDiagnosticPanel,
    ProcessExecution : buildProcessExecutionPanel,
    ProcessAssessment : buildProcessAssessmentPanel
};

var hidePositions={
    welcomePanel : hideWelcomePanel,
    ITGoalsDefinition: hideITGoalsDefinition,
    companyGoals : hideCompanyGoalsPanel,
    ITGoals: hideITCompanyGoalsPanel,
    AutoDiagnostic: hideAutoDiagnosticPanel,
    ProcessExecution : hideProcessExecutionPanel,
    ProcessAssessment : hideProcessAssessmentPanel
};

function updatePosition(lastPosition, nextPosition)
{
    if(lastPosition!=null)
        hidePositions[lastPosition]();

    if(nextPosition!=null)
        buildPositions[nextPosition]();
}

$( document ).ready(function(){
    //default position is welcome panel
    //updatePosition(null, "welcomePanel");
    updatePosition(null, "ProcessExecution");

    setTimeout(function(){ $('.input-field label').addClass('active'); }, 1);
    $(".tabs").tabs();
    $('.modal').modal();
/*
    populateCobitProcessList(function(cobitProcesses){

        cobitProcesses.forEach(function(cobitProcess){

            if(!cobitProcess.execution)
                cobitProcess.execution = executionTemplate;

        });

        firebase.database().ref('/cobitProcesses').set(cobitProcesses);
    });
    */
/*
    populateCobitProcessList(function(cobitProcesses){

        cobitProcesses.forEach(function(cobitProcess){

            if(!cobitProcess.activityGroups)
                cobitProcess.activityGroups = activityGroupsTemplate;

        });

        firebase.database().ref('/cobitProcesses').set(cobitProcesses);
    });
    */
});


/*
var activityGroupsTemplate = [
    {
        "dependencies":       [
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01"
        ],
        "activities":       [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    },
    {
        "dependencies":       [
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01"
        ],
        "activities":       [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    },
    {
        "dependencies":       [
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01"
        ],
        "activities":       [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    },
    {
        "dependencies":       [
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01"
        ],
        "activities":       [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    },
    {
        "dependencies":       [
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01"
        ],
        "activities":       [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    },
    {
        "dependencies":       [
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01"
        ],
        "activities":       [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    },
    {
        "dependencies":       [
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01"
        ],
        "activities":       [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    },
    {
        "dependencies":       [
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01"
        ],
        "activities":       [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    },
    {
        "dependencies":       [
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01"
        ],
        "activities":       [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    },
    {
        "dependencies":       [
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01",
            "EDM01"
        ],
        "activities":       [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ]
    }
];



var executionTemplate = {

    "level0": [
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        },
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        }
    ],
    "level1": [
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        },
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        }
    ],
    "level2": [
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        },
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        }
    ],
    "level3": [
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        },
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        }
    ],
    "level4": [
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        },
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        }
    ],
    "level5": [
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        },
        {
            "title": "",
            "criteria":       [
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                },
                {
                    "title": "",
                    "completed": false
                }
            ]
        }
    ]};
    */