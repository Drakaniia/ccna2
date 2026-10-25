import type { Question } from "../../lib/types";

/** Modules 4 - 7 (Ethernet Concepts), questions 41-79 (52, 62, 63, 65, 67, 69, 70, 72 and 77 are missing from the dump). */
export const questions41to79: Question[] = [
  {
    number: 41,
    type: "multi",
    choose: 2,
    text: "Which two statements describe features or functions of the logical link control sublayer in Ethernet standards? (Choose two.)",
    options: [
      "Logical link control is implemented in software.",
      "Logical link control is specified in the IEEE 802.3 standard.",
      "The LLC sublayer adds a header and a trailer to the data.",
      "The data link layer uses LLC to communicate with the upper layers of the protocol suite.",
      "The LLC sublayer is responsible for the placement and retrieval of frames on and off the media."
    ],
    correct: [0, 3],
    explanation: "Explanation: Topic 7.1.2\nLogical link control is implemented in software and enables the data link layer to communicate with the upper layers of the protocol suite. Logical link control is specified in the IEEE 802.2 standard. IEEE 802.3 is a suite of standards that define the different Ethernet types. The MAC (Media Access Control) sublayer is responsible for the placement and retrieval of frames on and off the media. The MAC sublayer is also responsible for adding a header and a trailer to the network layer protocol data unit (PDU)."
  },
  {
    number: 42,
    type: "single",
    text: "What is the auto-MDIX feature?",
    options: [
      "It enables a device to automatically configure an interface to use a straight-through or a crossover cable.",
      "It enables a device to automatically configure the duplex settings of a segment.",
      "It enables a device to automatically configure the speed of its interface.",
      "It enables a switch to dynamically select the forwarding method."
    ],
    correct: [0],
    explanation: "Explanation: Topic 7.4.5\nThe auto-MDIX feature allows the device to configure its network port according to the cable type that is used (straight-through or crossover) and the type of device that is connected to that port. When a port of a switch is configured with auto-MDIX, this switch can be connected to another switch by the use of either a straight-through cable or a crossover cable."
  },
  {
    number: 43,
    type: "single",
    text: "What is one advantage of using the cut-through switching method instead of the store-and-forward switching method?",
    options: [
      "has a positive impact on bandwidth by dropping most of the invalid frames",
      "makes a fast forwarding decision based on the source MAC address of the frame",
      "has a lower latency appropriate for high-performance computing applications",
      "provides the flexibility to support any mix of Ethernet speeds"
    ],
    correct: [2],
    explanation: "Explanation: Topic 7.4.2\nCut-through switching provides lower latency switching for high-performance computing (HPC) applications. Cut-through switching allows more invalid frames to cross the network than store-and-forward switching. The cut-through switching method can make a forwarding decision as soon as it looks up the destination MAC address of the frame."
  },
  {
    number: 44,
    type: "single",
    text: "Which is a multicast MAC address?",
    options: ["FF-FF-FF-FF-FF-FF", "5C-26-0A-4B-19-3E", "01-00-5E-00-00-03", "00-26-0F-4B-00-3E"],
    correct: [2],
    explanation: "Explanation: Topic 7.2.6\nMulticast MAC addresses begin with the special value of 01-00-5E."
  },
  {
    number: 45,
    type: "single",
    text: "Refer to the exhibit. What is wrong with the displayed termination?",
    exhibit: {
      src: "/images/itn-modules-4-7/q45-exhibit.png",
      alt: "Exhibit for question 45: RJ-45 termination of a UTP cable",
      width: 300,
      height: 221
    },
    options: [
      "The woven copper braid should not have been removed.",
      "The wrong type of connector is being used.",
      "The untwisted length of each wire is too long.",
      "The wires are too thick for the connector that is used."
    ],
    correct: [2],
    explanation: "Explanation: Topic 4.4.2\nWhen a cable to an RJ-45 connector is terminated, it is important to ensure that the untwisted wires are not too long and that the flexible plastic sheath surrounding the wires is crimped down and not the bare wires. None of the colored wires should be visible from the bottom of the jack."
  },
  {
    number: 46,
    type: "single",
    text: "Refer to the exhibit. The PC is connected to the console port of the switch. All the other connections are made through FastEthernet links. Which types of UTP cables can be used to connect the devices?",
    exhibit: {
      src: "/images/itn-modules-4-7/q46-exhibit.png",
      alt: "Exhibit for question 46: a PC, switch, and router connected through FastEthernet links",
      width: 637,
      height: 134
    },
    options: [
      "1 - rollover, 2 - crossover, 3 - straight-through",
      "1 - rollover, 2 - straight-through, 3 - crossover",
      "1 - crossover, 2 - rollover, 3 - straight-through",
      "1 - crossover, 2 - straight-through, 3 - rollover"
    ],
    correct: [1],
    explanation: "Explanation: Topic 4.4.3\nA straight-through cable is commonly used to interconnect a host to a switch and a switch to a router. A crossover cable is used to interconnect similar devices together like switch to a switch, a host to a host, or a router to a router. If a switch has the MDIX capability, a crossover could be used to connect the switch to the router; however, that option is not available. A rollover cable is used to connect to a router or switch console port."
  },
  {
    number: 47,
    type: "single",
    text: "Open the PT Activity. Perform the tasks in the activity instructions and then answer the question.\nWhich port does Switch0 use to send frames to the host with the IPv4 address 10.1.1.5?",
    exhibit: {
      src: "/images/itn-modules-4-7/q47-exhibit.jpg",
      alt: "Exhibit for question 47: Packet Tracer topology with a switch and several hosts",
      width: 344,
      height: 267
    },
    options: ["Fa0/1", "Fa0/5", "Fa0/9", "Fa0/11"],
    correct: [3],
    explanation: "Explanation: Topic 7.3.2\nIssuing the command ipconfig /all from the PC0 command prompt displays the IPv4 address and MAC address. When the IPv4 address 10.1.1.5 is pinged from PC0, the switch stores the source MAC address (from PC0) along with the port to which PC0 is connected. When the destination reply is received, the switch takes the destination MAC address and compares to MAC addresses stored in the MAC address table. Issuing the show mac-address-table on the PC0 Terminal application displays two dynamic MAC address entries. The MAC address and port entry that does not belong to PC0 must be the MAC address and port of the destination with the IPv4 address 10.1.1.5."
  },
  {
    number: 48,
    type: "single",
    text: "What does the term “attenuation” mean in data communication?",
    options: [
      "loss of signal strength as distance increases",
      "time for a signal to reach its destination",
      "leakage of signals from one cable pair to another",
      "strengthening of a signal by a networking device"
    ],
    correct: [0],
    explanation: "Explanation: Topic 4.3.1\nData is transmitted on copper cables as electrical pulses. A detector in the network interface of a destination device must receive a signal that can be successfully decoded to match the signal sent. However, the farther the signal travels, the more it deteriorates. This is referred to as signal attenuation."
  },
  {
    number: 49,
    type: "multi",
    choose: 3,
    text: "What makes fiber preferable to copper cabling for interconnecting buildings? (Choose three.)",
    options: [
      "greater distances per cable run",
      "lower installation cost",
      "limited susceptibility to EMI/RFI",
      "durable connections",
      "greater bandwidth potential",
      "easily terminated"
    ],
    correct: [0, 2, 4],
    explanation: "Explanation: Topic 4.5.1\nOptical fiber cable transmits data over longer distances and at higher bandwidths than any other networking media. Unlike copper wires, fiber-optic cable can transmit signals with less attenuation and is completely immune to EMI and RFI."
  },
  {
    number: 50,
    type: "single",
    text: "What OSI physical layer term describes the process by which one wave modifies another wave?",
    options: ["modulation", "IEEE", "EIA/TIA", "air"],
    correct: [0],
    explanation: "Explanation: Topic 4.2.4\nModulation is the physical layer process where a data signal modifies one or more characteristics (amplitude, frequency, or phase) of another higher-frequency wave (the carrier wave). This technique allows digital binary data to be successfully transmitted over analog mediums, such as wireless airwaves."
  },
  {
    number: 51,
    type: "single",
    text: "What OSI physical layer term describes the capacity at which a medium can carry data?",
    options: ["bandwidth", "IEEE", "EIA/TIA", "air"],
    correct: [0],
    explanation: "Explanation: Topic 4.2.5\nBandwidth is the physical layer term that describes the maximum theoretical capacity of a medium (such as copper or fiber-optic cabling) to carry data over a given period of time. It is typically measured in bits per second (bps), Mbps, or Gbps. It should not be confused with throughput, which represents the actual, real-world measure of data successfully traversing the media under practical conditions (often lower due to latency and network overhead)."
  },
  {
    number: 53,
    type: "single",
    text: "What OSI physical layer term describes the measure of the transfer of bits across a medium over a given period of time?",
    options: ["throughput", "bandwidth", "latency", "goodput"],
    correct: [0],
    explanation: "Explanation: Topic 4.2.6\nThroughput is the physical layer term that describes the actual measure of bits transferred across a network medium over a given period of time.\nIt is highly common to confuse this with Bandwidth, but there is a fundamental distinction: bandwidth represents the maximum theoretical capacity a medium can handle under perfect conditions, whereas throughput is the real-world, practical measure of data that successfully traverses the link. Throughput is almost always lower than bandwidth due to factors such as network traffic congestion, processing latency, and the overhead introduced by network protocols."
  },
  {
    number: 54,
    type: "single",
    text: "What OSI physical layer term describes the amount of time, including delays, for data to travel from one point to another?",
    options: ["latency", "bandwidth", "throughput", "goodput"],
    correct: [0],
    explanation: "Explanation: Topic 4.2.6\nLatency is the physical layer term that describes the total amount of time, including various delays, required for data to travel from one specific point to another across a network. This time measurement encompasses the actual propagation delay (the time bits take to physically traverse the copper, fiber, or wireless media) as well as intermediary processing delays, queuing delays within routing or switching devices, and serialization delays. High latency directly impacts network performance, particularly for real-time traffic such as VoIP or online streaming."
  },
  {
    number: 55,
    type: "single",
    text: "What OSI physical layer term describes the amount of time, including delays, for data to travel from one point to another?",
    options: ["latency", "fiber-optic cable", "air", "copper cable"],
    correct: [0],
    explanation: "Explanation: Topic 4.2.6\nLatency is the physical layer term that describes the total amount of time, including various delays, required for data to travel from one specific point to another across a network. This time measurement encompasses the actual propagation delay (the time bits take to physically traverse the copper, fiber, or wireless media) as well as intermediary processing delays, queuing delays within routing or switching devices, and serialization delays. High latency directly impacts network performance, particularly for real-time traffic such as VoIP or online streaming."
  },
  {
    number: 56,
    type: "single",
    text: "What OSI physical layer term describes the measure of usable data transferred over a given period of time?",
    options: ["goodput", "fiber-optic cable", "air", "copper cable"],
    correct: [0],
    explanation: "Explanation: Topic 4.2.6\nGoodput is the physical layer term that measures the actual amount of usable application data transferred over the network during a specific period of time. Unlike throughput, which accounts for all bits traveling across the media (including protocol overhead, headers, control packets, and retransmitted data due to errors), goodput filters out this technical overhead. It represents only the useful payload delivered to the end-user application. Consequently, goodput is always lower than throughput, which in turn is lower than bandwidth."
  },
  {
    number: 57,
    type: "single",
    text: "What OSI physical layer term describes the physical medium which uses electrical pulses?",
    options: ["copper cable", "fiber-optic cable", "air", "goodput"],
    correct: [0],
    explanation: "Explanation: Topic 4.3.1\nCopper cable is the Layer 1 (Physical) medium that relies on electrical pulses to transmit binary data across a network. In local area networks, the most widely used types are Unshielded Twisted-Pair (UTP) and Shielded Twisted-Pair (STP). The transmitting network interface card (NIC) modifies voltage levels to represent bits, which are then decoded by the receiving device. Its primary limitations compared to fiber-optic cables are that electrical signals attenuate (lose strength) over shorter distances and are highly susceptible to electromagnetic interference (EMI) and crosstalk."
  },
  {
    number: 58,
    type: "single",
    text: "What OSI physical layer term describes the physical medium that uses the propagation of light?",
    options: ["fiber-optic cable", "goodput", "latency", "throughput"],
    correct: [0],
    explanation: "Explanation: Topic 4.2.4\nThe fiber-optic cable is the Layer 1 (Physical) medium that relies on the propagation of light (using modulated light pulses) to transmit binary data. Constructed from thin, flexible strands of high-quality glass or plastic, this medium is capable of carrying network data over immense distances at ultra-high bandwidth capacities. Additionally, because it uses light instead of electrical currents, it is completely immune to electromagnetic interference (EMI) and radio frequency interference (RFI)."
  },
  {
    number: 59,
    type: "single",
    text: "What OSI physical layer term describes the physical medium for microwave transmissions?",
    options: ["air", "goodput", "latency", "throughput"],
    correct: [0],
    explanation: "Explanation: Topic 4.2.4\nAir is the physical medium used by the OSI physical layer (Layer 1) to carry radio frequency and microwave signals in wireless communications. Unlike guided media such as copper cabling (which relies on electrical pulses) or fiber-optic cabling (which relies on light pulses), wireless technologies transmit electromagnetic signals directly through unguided space. In this context, the air serves as the actual transmission channel through which modulated waves travel between antennas."
  },
  {
    number: 60,
    type: "multi",
    choose: 2,
    text: "Which two functions are performed at the MAC sublayer of the OSI data link layer? (Choose two.)",
    options: [
      "Adds Layer 2 control information to network protocol data.",
      "Places information in the frame that identifies which network layer protocol is being used for the frame.",
      "Controls the NIC responsible for sending and receiving data on the physical medium.",
      "Implements a trailer to detect transmission errors.",
      "Enables IPv4 and IPv6 to utilize the same network interface and media."
    ],
    correct: [2, 3],
    explanation: "Explanation: Topic 6.1.2\nThe MAC sublayer (Media Access Control) constitutes the lower portion of the OSI Data Link Layer (Layer 2) and interfaces directly with the hardware and physical layer signaling.\nIts key assignments include:\nSynchronization: It embeds preamble and delimiter flags into the frame, which provides synchronization between source and destination nodes so they can detect precisely where a transmission begins and ends.\nError Detection: It computes the Cyclic Redundancy Check (CRC) value and implements a trailer (FCS field) at the end of the frame, allowing the receiving NIC to check for data corruption.\nMedia Access: It dictates the physical rules for placing data frames onto the transmission medium depending on the topology (e.g., CSMA/CD).\nThe alternative choices (identifying network protocols or enabling IPv4 and IPv6 to share the same physical interface) are software functions belonging entirely to the upper LLC sublayer."
  },
  {
    number: 61,
    type: "multi",
    choose: 2,
    text: "Which two functions are performed at the LLC sublayer of the OSI data link layer? (Choose two.)",
    options: [
      "Enables IPv4 and IPv6 to utilize the same network interface and media.",
      "Places information in the frame that identifies which network layer protocol is being used for the frame.",
      "Integrates various physical technologies.",
      "Implements a process to delimit fields within a Layer 2 frame.",
      "Controls the NIC responsible for sending and receiving data on the physical medium."
    ],
    correct: [0, 1],
    explanation: "Explanation: Topic 6.1.2\nThe OSI data link layer is divided into two distinct sublayers: LLC (Logical Link Control) and MAC (Media Access Control). The LLC sublayer is defined by the IEEE 802.2 standard and is implemented entirely in software.\nThe primary functions performed at the LLC sublayer include:\nInterfacing with upper layers: It acts as an intermediary between network software (Layer 3 protocols) and the underlying hardware. By inserting control information into the frame that identifies which network layer protocol is being used, it enables multiple protocols, such as IPv4 and IPv6, to utilize the same network interface and media.\nInitial control encapsulation: It is responsible for adding Layer 2 control information to the network protocol data units (PDUs) before handing them down to the MAC sublayer.\nThe other choices describe functions belonging to the MAC sublayer or the Physical layer (such as integrating physical technologies, node synchronization, or implementing the FCS trailer with a CRC value for transmission error detection)."
  },
  {
    number: 64,
    type: "multi",
    choose: 2,
    text: "Which two functions are performed at the LLC sublayer of the OSI data link layer? (Choose two.)",
    options: [
      "Adds Layer 2 control information to network protocol data.",
      "Places information in the frame that identifies which network layer protocol is being used for the frame.",
      "Performs data encapsulation.",
      "Controls the NIC responsible for sending and receiving data on the physical medium.",
      "Integrates various physical technologies."
    ],
    correct: [0, 1],
    explanation: "Explanation: Topic 6.1.2\nThe OSI data link layer is divided into two distinct sublayers: LLC (Logical Link Control) and MAC (Media Access Control). The LLC sublayer is defined by the IEEE 802.2 standard and is implemented entirely in software.\nThe primary functions performed at the LLC sublayer include:\nInterfacing with upper layers: It acts as an intermediary between network software (Layer 3 protocols) and the underlying hardware. By inserting control information into the frame that identifies which network layer protocol is being used, it enables multiple protocols, such as IPv4 and IPv6, to utilize the same network interface and media.\nInitial control encapsulation: It is responsible for adding Layer 2 control information to the network protocol data units (PDUs) before handing them down to the MAC sublayer.\nThe other choices describe functions belonging to the MAC sublayer or the Physical layer (such as integrating physical technologies, node synchronization, or implementing the FCS trailer with a CRC value for transmission error detection)."
  },
  {
    number: 66,
    type: "multi",
    choose: 2,
    text: "Which two functions are performed at the LLC sublayer of the OSI data link layer? (Choose two.)",
    options: [
      "Adds Layer 2 control information to network protocol data.",
      "Enables IPv4 and IPv6 to utilize the same network interface and media.",
      "Provides data link layer addressing.",
      "Implements a trailer to detect transmission errors.",
      "Provides synchronization between source and target nodes."
    ],
    correct: [0, 1],
    explanation: "Explanation: Topic 6.1.2\nThe OSI data link layer is divided into two distinct sublayers: LLC (Logical Link Control) and MAC (Media Access Control). The LLC sublayer is defined by the IEEE 802.2 standard and is implemented entirely in software.\nThe primary functions performed at the LLC sublayer include:\nInterfacing with upper layers: It acts as an intermediary between network software (Layer 3 protocols) and the underlying hardware. By inserting control information into the frame that identifies which network layer protocol is being used, it enables multiple protocols, such as IPv4 and IPv6, to utilize the same network interface and media.\nInitial control encapsulation: It is responsible for adding Layer 2 control information to the network protocol data units (PDUs) before handing them down to the MAC sublayer.\nThe other choices describe functions belonging to the MAC sublayer or the Physical layer (such as integrating physical technologies, node synchronization, or implementing the FCS trailer with a CRC value for transmission error detection)."
  },
  {
    number: 68,
    type: "multi",
    choose: 2,
    text: "Which two functions are performed at the LLC sublayer of the OSI data link layer? (Choose two.)",
    options: [
      "Enables IPv4 and IPv6 to utilize the same network interface and media.",
      "Adds Layer 2 control information to network protocol data.",
      "Integrates various physical technologies.",
      "Implements a trailer to detect transmission errors.",
      "Provides synchronization between source and target nodes."
    ],
    correct: [0, 1],
    explanation: "Explanation: Topic 6.1.2\nThe OSI data link layer is divided into two distinct sublayers: LLC (Logical Link Control) and MAC (Media Access Control). The LLC sublayer is defined by the IEEE 802.2 standard and is implemented entirely in software.\nThe primary functions performed at the LLC sublayer include:\nInterfacing with upper layers: It acts as an intermediary between network software (Layer 3 protocols) and the underlying hardware. By inserting control information into the frame that identifies which network layer protocol is being used, it enables multiple protocols, such as IPv4 and IPv6, to utilize the same network interface and media.\nInitial control encapsulation: It is responsible for adding Layer 2 control information to the network protocol data units (PDUs) before handing them down to the MAC sublayer.\nThe other choices describe functions belonging to the MAC sublayer or the Physical layer (such as integrating physical technologies, node synchronization, or implementing the FCS trailer with a CRC value for transmission error detection)."
  },
  {
    number: 71,
    type: "single",
    text: "What action will occur if a switch receives a frame with the destination MAC address FF:FF:FF:FF:FF:FF?",
    options: [
      "The switch forwards it out all ports except the ingress port.",
      "The switch refreshes the timer on that entry.",
      "The switch does not forward the frame.",
      "The switch sends the frame to a connected router because the destination MAC address is not local."
    ],
    correct: [0],
    explanation: "Explanation: Topic 7.2.5\nThe MAC address FF:FF:FF:FF:FF:FF is a Layer 2 broadcast address. When an Ethernet switch receives a broadcast frame, it does not look up a specific destination port in its CAM/MAC address table. Instead, the switch is designed to flood the frame out of all active ports within the same broadcast domain (VLAN), excluding the original port where the frame was received (the ingress port). This behavior ensures that the broadcast message successfully reaches every end device connected to the local network."
  },
  {
    number: 73,
    type: "single",
    text: "What action will occur if a switch receives a frame with the destination MAC address 01:00:5E:00:00:D9?",
    options: [
      "The switch forwards it out all ports except the ingress port.",
      "The switch does not forward the frame.",
      "The switch sends the frame to a connected router because the destination MAC address is not local.",
      "The switch shares the MAC address table entry with any connected switches."
    ],
    correct: [0],
    explanation: "Explanation: Topic 7.2.6\nThe destination MAC address 01:00:5E:00:00:D9 is a multicast address. A switch floods a multicast frame out every port except the ingress port, because multicast addresses are not learned as unicast entries in the MAC address table."
  },
  {
    number: 74,
    type: "single",
    text: "What action will occur if a host receives a frame with a destination MAC address of FF:FF:FF:FF:FF:FF?",
    options: [
      "The host will process the frame.",
      "The host forwards the frame to the router.",
      "The host sends the frame to the switch to update the MAC address table.",
      "The host forwards the frame to all other hosts."
    ],
    correct: [0],
    explanation: "Explanation: Topic 7.2.5\nThe MAC address FF:FF:FF:FF:FF:FF represents a Layer 2 broadcast address.\nWhen a host's network interface card (NIC) receives a frame containing this specific destination address, it instantly recognizes that the message is intended for every single device within the local network segment. As a result, instead of dropping it, the NIC accepts the data and hands it up the protocol stack so that the host will process the frame. End hosts do not forward broadcast frames to other devices or routers; that flooding action is strictly a switch behavior."
  },
  {
    number: 75,
    type: "single",
    text: "What action will occur if a switch receives a frame and does have the source MAC address in the MAC table?",
    options: [
      "The switch refreshes the timer on that entry.",
      "The switch adds it to its MAC address table associated with the port number.",
      "The switch forwards the frame to the associated port.",
      "The switch sends the frame to a connected router because the destination MAC address is not local."
    ],
    correct: [0],
    explanation: "Explanation: Topic 7.3.2\nWhen an Ethernet switch receives a frame, it performs two main lookups: it examines the source MAC address (to learn and maintain its address mapping table) and the destination MAC address (to decide which output port to forward the frame to).\nTo build and maintain its MAC address table, the switch inspects the source address. If this specific source MAC address is already present in the table for the incoming port, the switch recognizes that the device is still active and connected to that interface. Instead of creating a duplicate entry, the switch simply refreshes the aging timer for that specific entry. This action resets the countdown clock, preventing the valid entry from expiring and being prematurely deleted from the switch's CAM memory."
  },
  {
    number: 76,
    type: "single",
    text: "What action will occur if a host receives a frame with a destination MAC address of FF:FF:FF:FF:FF:FF?",
    options: [
      "The host will process the frame.",
      "The host returns the frame to the switch.",
      "The host replies to the switch with its own IP address.",
      "The host forwards the frame to all other hosts."
    ],
    correct: [0],
    explanation: "Explanation: Topic 7.2.5\nThe MAC address FF:FF:FF:FF:FF:FF represents a Layer 2 broadcast address.\nWhen a host's network interface card (NIC) receives a frame containing this specific destination address, it instantly recognizes that the message is intended for every single device within the local network segment. As a result, instead of dropping it, the NIC accepts the data and hands it up the protocol stack so that the host will process the frame. End hosts do not forward broadcast frames to other devices or routers; that flooding action is strictly a switch behavior."
  },
  {
    number: 78,
    type: "single",
    text: "What action will occur if a host receives a frame with a destination MAC address it does not recognize?",
    options: [
      "The host will discard the frame.",
      "The host replies to the switch with its own IP address.",
      "The host forwards the frame to all other hosts.",
      "The host returns the frame to the switch."
    ],
    correct: [0],
    explanation: "Explanation: Topic 7.2.3\nWhen a host's network interface card (NIC) receives an Ethernet frame, the very first action it takes is to examine the destination MAC address located within the Layer 2 header.\nThe host will only accept and pass the frame up the protocol stack for processing if the destination MAC address matches:\nIts own unique physical MAC address.\nA broadcast MAC address (FF-FF-FF-FF-FF-FF).\nA multicast MAC address that the host is actively subscribed to.\nIf the destination MAC address does not match any of these criteria (meaning it is a unicast address that it does not recognize as its own), the NIC determines that the data was not intended for this device and immediately drops the frame. End hosts do not forward unassigned frames or flood the network; that behavior is strictly handled by network switches."
  },
  {
    number: 79,
    type: "single",
    text: "Which type of UTP cable is used to connect a PC to a switch port?",
    options: ["console", "rollover", "crossover", "straight-through"],
    correct: [3],
    explanation: "Explanation: Topic 4.4.3\nA rollover cable is a Cisco proprietary cable used to connect to a router or switch console port. A straight-through (also called patch) cable is usually used to interconnect a host to a switch and a switch to a router. A crossover cable is used to interconnect similar devices together, for example, between two switches, two routers, and two hosts."
  },
];
