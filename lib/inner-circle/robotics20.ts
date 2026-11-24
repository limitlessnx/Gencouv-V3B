export type RoboticsCompany={
  ticker:string; company:string; role:string; researchRisk:string;
};
export type RoboticsPillar={title:string; description:string;companies:RoboticsCompany[]};

/** Editorial starting universe supplied by Gencouv. Every entry needs a dated
 * fact-check and analyst sign-off before this is marketed as proprietary research. */
export const robotics20:RoboticsPillar[]=[
  {title:"Humanoid, medical & autonomous fleets",description:"Robotics companies bringing autonomous systems into practical operations.",companies:[
    {ticker:"TSLA",company:"Tesla",role:"Optimus humanoid development and autonomy research",researchRisk:"Execution, valuation and commercial adoption"},
    {ticker:"ISRG",company:"Intuitive Surgical",role:"Robot-assisted surgery platforms and related instruments",researchRisk:"Competition, reimbursement and procedural demand"},
    {ticker:"SYM",company:"Symbotic",role:"Warehouse and distribution-center automation",researchRisk:"Customer concentration and installation execution"},
    {ticker:"SERV",company:"Serve Robotics",role:"Autonomous last-mile delivery robot fleets",researchRisk:"Scale economics and regulatory permissions"},
    {ticker:"AVAV",company:"AeroVironment",role:"Uncrewed defense and autonomous systems",researchRisk:"Defense budgets, contract timing and geopolitics"}
  ]},
  {title:"Compute and edge-AI systems",description:"Processing, embedded AI, and the hardware/software underpinning autonomy.",companies:[
    {ticker:"NVDA",company:"NVIDIA",role:"AI acceleration, Jetson edge computing and Isaac robotics ecosystem",researchRisk:"Supply constraints, customer concentration and valuation"},
    {ticker:"QCOM",company:"Qualcomm",role:"Efficient on-device compute and wireless connectivity",researchRisk:"Product cycles and platform competition"},
    {ticker:"AMBA",company:"Ambarella",role:"Edge vision and computer-vision processors",researchRisk:"Semiconductor demand and customer adoption"},
    {ticker:"TER",company:"Teradyne",role:"Automated testing and collaborative robotics exposure",researchRisk:"Cyclical semiconductor spending and business mix"}
  ]},
  {title:"Machine vision and sensing",description:"Optical detection, LiDAR and sensing for machine perception.",companies:[
    {ticker:"CGNX",company:"Cognex",role:"Industrial machine-vision inspection",researchRisk:"Manufacturing capex and competitive pricing"},
    {ticker:"OUST",company:"Ouster",role:"LiDAR hardware and perception technology",researchRisk:"Cash needs, adoption and margins"},
    {ticker:"AEVA",company:"Aeva Technologies",role:"Frequency-modulated continuous-wave LiDAR",researchRisk:"Commercialization timetable and dilution"},
    {ticker:"KYCCF",company:"Keyence",role:"Automation sensing and industrial inspection technologies",researchRisk:"Regional exposure and industrial spending"}
  ]},
  {title:"Industrial automation and motion control",description:"Factory robotics, motors, precise movement and operational systems.",companies:[
    {ticker:"ROK",company:"Rockwell Automation",role:"Industrial controls and factory automation software",researchRisk:"Industrial-cycle exposure and spending deferrals"},
    {ticker:"ABBNY",company:"ABB",role:"Electrification and industrial automation operations",researchRisk:"Changing business mix and cyclical demand"},
    {ticker:"FANUY",company:"Fanuc",role:"Industrial robots and CNC machinery",researchRisk:"Automation cycles and international trade"},
    {ticker:"YASKY",company:"Yaskawa Electric",role:"Servo motors, motion control and factory robots",researchRisk:"Manufacturing capex and Asian demand"},
    {ticker:"RRX",company:"Regal Rexnord",role:"Motors and engineered motion components",researchRisk:"Industrial demand, integration and debt"},
    {ticker:"NOVT",company:"Novanta",role:"Precision motion, photonics and medical/industrial components",researchRisk:"Specialized demand and customer concentration"},
    {ticker:"ZBRA",company:"Zebra Technologies",role:"Enterprise scanning and automation/robotics exposure",researchRisk:"Warehouse investment cycles and competitive execution"}
  ]}
];
