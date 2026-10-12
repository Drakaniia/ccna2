import type { Question } from "../../lib/types";

/** Modules 5 - 6 (Redundant Networks), questions 1-28. */
export const questions1to28: Question[] = [
  {
    number: 1,
    type: "single",
    text: "What additional information is contained in the 12-bit extended system ID of a BPDU?",
    options: [
      "MAC address",
      "VLAN ID",
      "IP address",
      "port ID",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 5.2.1\nThe bridge ID is made up of the bridge priority, the extended system ID, and the MAC address. With PVST, the 12-bit extended system ID field carries the VLAN ID, which is what allows a switch to run a separate spanning-tree instance for each VLAN.",
  },
  {
    number: 2,
    type: "single",
    text:
      "During the implementation of Spanning Tree Protocol, all switches are rebooted by the network administrator. What is the first step of the spanning-tree election process?",
    options: [
      "Each switch with a lower root ID than its neighbor will not send BPDUs.",
      "All the switches send out BPDUs advertising themselves as the root bridge.",
      "Each switch determines the best path to forward traffic.",
      "Each switch determines what port to block to prevent a loop from occurring.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 5.2.2\nWhen STP starts, every switch considers itself the root bridge and sends BPDUs advertising itself as root. The switches compare the bridge IDs (priority plus MAC address) carried in those BPDUs, and the switch with the lowest BID wins the election and becomes the root bridge.",
  },
  {
    number: 3,
    type: "single",
    text:
      "Which STP port role is adopted by a switch port if there is no other port with a lower cost to the root bridge?",
    options: [
      "designated port",
      "root port",
      "alternate",
      "disabled port",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 5.2.5\nThe root port is the port with the lowest cost to reach the root bridge.",
  },
  {
    number: 4,
    type: "multi",
    text:
      "Which two concepts relate to a switch port that is intended to have only end devices attached and intended never to be used to connect to another switch? (Choose two.)",
    options: [
      "bridge ID",
      "edge port",
      "extended system ID",
      "PortFast",
      "PVST+",
    ],
    correct: [1, 3],
    choose: 2,
    explanation:
      "Explanation: Topic 5.3.4\nAn edge port (also called a PortFast port) is a port that has only end devices attached. Because no switch can be reached through it, it moves directly to the forwarding state and skips the listening and learning states. It should never be used to connect to another switch.",
  },
  {
    number: 5,
    type: "multi",
    text: "Which three components are combined to form a bridge ID?",
    options: [
      "extended system ID",
      "cost",
      "IP address",
      "bridge priority",
      "MAC address",
      "port ID",
    ],
    correct: [0, 3, 4],
    choose: 3,
    explanation:
      "Explanation: Topic 5.2.1\nThe three components that are combined to form a bridge ID are bridge priority, extended system ID, and MAC address.",
  },
  {
    number: 6,
    type: "pair",
    text: "Match the STP protocol with the correct description. (Not all options are used.)",
    exhibit: [
      {
        src: "/images/modules-5-6/q6-exhibit.jpg",
        alt: "Exhibit for question 6: STP protocol matching board",
        width: 548,
        height: 488,
      },
      {
        src: "/images/modules-5-6/q6-exhibit-2.jpg",
        alt: "Exhibit for question 6: STP protocol matching answer key",
        width: 1456,
        height: 364,
      },
    ],
    left: [
      "Rapid PVST+",
      "STP",
      "MSTP",
    ],
    right: [
      "a Cisco enhancement of RSTP to provide a spanning-tree instance for each VLAN",
      "the legacy standard for STP that runs all VLANs in a single spanning-tree instance",
      "a protocol that allows multiple VLANs to run in a single spanning-tree instance",
      "an evolution of STP that provides faster convergence",
    ],
    correctPairs: { 0: 0, 1: 1, 2: 2 },
    explanation:
      "Explanation: Topic 5.3.1\nThe correct pairings are:\n- Rapid PVST+ → a Cisco enhancement of RSTP to provide a spanning-tree instance for each VLAN\n- STP → the legacy standard for STP that runs all VLANs in a single spanning-tree instance\n- MSTP → a protocol that allows multiple VLANs to run in a single spanning-tree instance\nThe description \"an evolution of STP that provides faster convergence\" refers to RSTP and is not used.",
  },
  {
    number: 7,
    type: "multi",
    text:
      "In which two port states does a switch learn MAC addresses and process BPDUs in a PVST network? (Choose two.)",
    options: [
      "disabled",
      "forwarding",
      "listening",
      "blocking",
      "learning",
    ],
    correct: [1, 4],
    choose: 2,
    explanation:
      "Explanation: Topic 5.2.9\nSwitches learn MAC addresses at the learning and forwarding port states. They receive and process BPDUs at the blocking, listening, learning, and forwarding port states.",
  },
  {
    number: 8,
    type: "single",
    text:
      "If no bridge priority is configured in PVST, which criteria is considered when electing the root bridge?",
    options: [
      "lowest MAC address",
      "lowest IP address",
      "highest IP address",
      "highest MAC address",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 5.2.3\nOnly one switch can be the root bridge for a VLAN. The root bridge is the switch with the lowest BID. The BID is determined by priority and the MAC address. If no priority is configured then all switches use the default priority and the election of the root bridge will be based on the lowest MAC address.",
  },
  {
    number: 9,
    type: "pair",
    text: "Match the spanning-tree feature with the protocol type. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-5-6/q9-exhibit.webp",
      alt: "Exhibit for question 9: spanning-tree feature to protocol type matching board",
      width: 1023,
      height: 445,
    },
    left: [
      "Cisco implementation of IEEE 802.1D",
      "Fast converging enhancement of IEEE 802.1D",
      "IEEE standard that reduces the number of STP instances",
      "Proprietary per VLAN implementation of IEEE 802.1w",
    ],
    right: [
      "PVST+",
      "RSTP",
      "MSTP",
      "MST",
      "Rapid PVST+",
    ],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 4 },
    explanation:
      "Explanation: Topic 5.3.1\nThe correct pairings are:\n- PVST+ → Cisco implementation of IEEE 802.1D\n- RSTP → fast converging enhancement of IEEE 802.1D\n- MSTP → IEEE standard that reduces the number of STP instances\n- Rapid PVST+ → proprietary per VLAN implementation of IEEE 802.1w\nThe option MST is not used.",
  },
  {
    number: 10,
    type: "multi",
    text:
      "When the show spanning-tree vlan 33 command is issued on a switch, three ports are shown in the forwarding state. In which two port roles could these interfaces function while in the forwarding state? (Choose two.)",
    options: [
      "alternate",
      "designated",
      "disabled",
      "blocked",
      "root",
    ],
    correct: [1, 4],
    choose: 2,
    explanation:
      "Explanation: Topic 5.2.9\nThe role of each of the three ports will be either designated port or root port. Ports in the disabled state are administratively disabled. Ports in the blocking state are alternate ports.",
  },
  {
    number: 11,
    type: "single",
    text: "What is the function of STP in a scalable network?",
    options: [
      "It decreases the size of the failure domain to contain the impact of failures.",
      "It protects the edge of the enterprise network from malicious activity.",
      "It combines multiple switch trunk links to act as one logical link for increased bandwidth.",
      "It disables redundant paths to eliminate Layer 2 loops.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 5.1.2\nSTP is an important component in a scalable network because it allows redundant physical connections between Layer 2 devices to be implemented without creating Layer 2 loops. STP prevents Layer 2 loops from forming by disabling interfaces on Layer 2 devices when they would create a loop.",
  },
  {
    number: 12,
    type: "single",
    text: "What is a characteristic of spanning tree?",
    options: [
      "It is enabled by default on Cisco switches.",
      "It is used to discover information about an adjacent Cisco device.",
      "It has a TTL mechanism that works at Layer 2.",
      "It prevents propagation of Layer 2 broadcast frames.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 5.3.1\nSpanning tree does work at Layer 2 on Ethernet-based networks and is enabled by default, but it does not have a TTL mechanism. Spanning tree exists because Layer 2 frames do not have a TTL mechanism. Layer 2 frames are still broadcast when spanning tree is enabled, but the frames can only be transmitted through a single path through the Layer 2 network that was created by spanning tree. Cisco Discovery Protocol (CDP) is used to discover information about an adjacent Cisco device.",
  },
  {
    number: 13,
    type: "single",
    text:
      "Which spanning tree standard supports only one root bridge so that traffic from all VLANs flows over the same path?",
    options: [
      "PVST+",
      "802.1D",
      "MST",
      "Rapid PVST",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 5.3.1\nMST is the Cisco implementation of MSTP, an IEEE standard protocol that provides up to 16 instances of RSTP. PVST+ provides a separate 802.1D spanning-tree instance for each VLAN that is configured in the network. 802.1D is the original STP standard defined by the IEEE and allows for only one root bridge for all VLANs. 802.1w, or RSTP, provides faster convergence but still uses only one STP instance for all VLANs.",
  },
  {
    number: 14,
    type: "single",
    text: "What is the purpose of the Spanning Tree Protocol (STP)?",
    options: [
      "creates smaller collision domains",
      "prevents routing loops on a router",
      "prevents Layer 2 loops",
      "allows Cisco devices to exchange routing table updates",
      "creates smaller broadcast domains",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 5.1.2\nThe Spanning-Tree Protocol (STP) creates one path through a switch network in order to prevent Layer 2 loops.",
  },
  {
    number: 15,
    type: "single",
    text:
      "What is the value used to determine which port on a non-root bridge will become a root port in a STP network?",
    options: [
      "the path cost",
      "the highest MAC address of all the ports in the switch",
      "the lowest MAC address of all the ports in the switch",
      "the VTP revision number",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 5.2.5\nSTP establishes one root port on each non-root bridge. The root port is the lowest-cost path from the non-root bridge to the root bridge, indicating the direction of the best path to the root bridge. This is primarily based on the path cost to the root bridge.",
  },
  {
    number: 16,
    type: "single",
    text:
      "Refer to the exhibit. Which switch will be the root bridge after the election process is complete?",
    exhibit: {
      src: "/images/modules-5-6/q16-exhibit.png",
      alt: "Exhibit for question 16: switch topology used to elect the STP root bridge",
      width: 496,
      height: 382,
    },
    options: [
      "S1",
      "S2",
      "S3",
      "S4",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 5.2.2\nThe root bridge is determined by the lowest bridge ID, which consists of the priority value and the MAC address. Because the priority values of all of the switches are identical, the MAC address is used to determine the root bridge. Because S2 has the lowest MAC address, S2 becomes the root bridge.",
  },
  {
    number: 17,
    type: "multi",
    text:
      "What are two drawbacks to turning spanning tree off and having multiple paths through the Layer 2 switch network? (Choose two.)",
    options: [
      "The MAC address table becomes unstable.",
      "The switch acts like a hub.",
      "Port security becomes unstable.",
      "Broadcast frames are transmitted indefinitely.",
      "Port security shuts down all of the ports that have attached devices.",
    ],
    correct: [0, 3],
    choose: 2,
    explanation:
      "Explanation: Topic 5.1.4\nSpanning tree should never be disabled. Without it, the MAC address table becomes unstable, broadcast storms can render network clients and the switches unusable, and multiple copies of unicast frames can be delivered to the end devices.",
  },
  {
    number: 18,
    type: "single",
    text:
      "A small company network has six interconnected Layer 2 switches. Currently all switches are using the default bridge priority value. Which value can be used to configure the bridge priority of one of the switches to ensure that it becomes the root bridge in this design?",
    options: [
      "1",
      "28672",
      "32768",
      "34816",
      "61440",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 5.2.1\nThe default bridge priority value for all Cisco switches is 32768. The range is 0 to 61440 in increments of 4096. Thus, the values 1 and 34816 are invalid. Configuring one switch with the lower value of 28672 (and leaving the bridge priority value of all other switches unchanged) will make the switch become the root bridge.",
  },
  {
    number: 19,
    type: "single",
    text:
      "Refer to the exhibit. The administrator tried to create an EtherChannel between S1 and the other two switches via the commands that are shown, but was unsuccessful. What is the problem?",
    exhibit: {
      src: "/images/modules-5-6/q19-exhibit.png",
      alt:
        "Exhibit for question 19: EtherChannel commands issued between S1 and two other switches",
      width: 417,
      height: 236,
    },
    options: [
      "Traffic cannot be sent to two different switches through the same EtherChannel link.",
      "Traffic cannot be sent to two different switches, but only to two different devices like an EtherChannel-enabled server and a switch.",
      "Traffic can only be sent to two different switches if EtherChannel is implemented on Gigabit Ethernet interfaces.",
      "Traffic can only be sent to two different switches if EtherChannel is implemented on Layer 3 switches.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 6.1.4\nAn EtherChannel link can only be created between two switches or between an EtherChannel-enabled server and a switch. Traffic cannot be sent to two different switches through the same EtherChannel link.",
  },
  {
    number: 20,
    type: "single",
    text: "Which statement is true regarding the use of PAgP to create EtherChannels?",
    options: [
      "It requires full duplex.",
      "It increases the number of ports that are participating in spanning tree.",
      "It requires more physical links than LACP does.",
      "It mandates that an even number of ports (2, 4, 6, etc.) be used for aggregation.",
      "It is Cisco proprietary.",
    ],
    correct: [4],
    explanation:
      "Explanation: Topic 6.1.6\nPAgP is used to automatically aggregate multiple ports into an EtherChannel bundle, but it only works between Cisco devices. LACP can be used for the same purpose between Cisco and non-Cisco devices. PAgP must have the same duplex mode at both ends and can use two ports or more. The number of ports depends on the switch platform or module. An EtherChannel aggregated link is seen as one port by the spanning-tree algorithm.",
  },
  {
    number: 21,
    type: "multi",
    text:
      "What are two requirements to be able to configure an EtherChannel between two switches? (Choose two.)",
    options: [
      "All the interfaces need to work at the same speed.",
      "All interfaces need to be assigned to different VLANs.",
      "Different allowed ranges of VLANs must exist on each end.",
      "All the interfaces need to be working in the same duplex mode.",
      "The interfaces that are involved need to be contiguous on the switch.",
    ],
    correct: [0, 3],
    choose: 2,
    explanation:
      "Explanation: Topic 6.2.1\nAll interfaces in the EtherChannel bundle must be assigned to the same VLAN or be configured as a trunk. If the allowed range of VLANs is not the same, the interfaces do not form an EtherChannel even when set to auto or desirable mode.",
  },
  {
    number: 22,
    type: "single",
    text:
      "Refer to the exhibit. On the basis of the output that is shown, what can be determined about the EtherChannel bundle?",
    exhibit: {
      src: "/images/modules-5-6/q22-exhibit.png",
      alt: "Exhibit for question 22: show etherchannel summary output",
      width: 497,
      height: 324,
    },
    options: [
      "The EtherChannel bundle is down.",
      "Two Gigabit Ethernet ports are used to form the EtherChannel.",
      "A Cisco proprietary protocol was used to negotiate the EtherChannel link.",
      "The EtherChannel bundle is operating at both Layer 2 and Layer 3.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 6.1.6\nTwo protocols can be used to send negotiation frames that are used to try to establish an EtherChannel link: PAgP and LACP. PAgP is Cisco proprietary, and LACP adheres to the industry standard.",
  },
  {
    number: 23,
    type: "multi",
    text:
      "Which two parameters must match on the ports of two switches to create a PAgP EtherChannel between the switches? (Choose two.)",
    options: [
      "port ID",
      "PAgP mode",
      "MAC address",
      "speed",
      "VLAN information",
    ],
    correct: [3, 4],
    choose: 2,
    explanation:
      "Explanation: Topic 6.1.6\nFor an EtherChannel to be created, the ports that are concerned on the two switches must match in terms of the speed, duplex, and VLAN information. The PAgP mode must be compatible but not necessarily equal. The port ID and the MAC addresses do not have to match.",
  },
  {
    number: 24,
    type: "single",
    text:
      "Refer to the exhibit. A network administrator is configuring an EtherChannel link between two switches, SW1 and SW2. Which statement describes the effect after the commands are issued on SW1 and SW2?",
    exhibit: {
      src: "/images/modules-5-6/q24-exhibit.png",
      alt: "Exhibit for question 24: EtherChannel configuration on SW1 and SW2",
      width: 654,
      height: 306,
    },
    options: [
      "The EtherChannel is established after SW2 initiates the link request.",
      "The EtherChannel is established after SW1 initiates the link request.",
      "The EtherChannel is established without negotiation.",
      "The EtherChannel fails to establish.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 6.1.7\nThe interfaces GigabitEthernet 0/1 and GigabitEthernet 0/2 are configured \"on\" for the EtherChannel link. This mode forces the interface to channel without PAgP or LACP. The EtherChannel will be established only if the other side is also set to \"on\". However, the mode on SW2 side is set to PAgP desirable. Thus the EtherChannel link will not be established.",
  },
  {
    number: 25,
    type: "single",
    text:
      "Refer to the exhibit. A network administrator is configuring an EtherChannel link between two switches, SW1 and SW2. However, the EtherChannel link fails to establish. What change in configuration would correct the problem?",
    exhibit: {
      src: "/images/modules-5-6/q25-exhibit.png",
      alt: "Exhibit for question 25: EtherChannel configuration on SW1 and SW2",
      width: 461,
      height: 343,
    },
    options: [
      "Configure SW2 EtherChannel mode to desirable.",
      "Configure SW2 EtherChannel mode to on.",
      "Configure SW1 EtherChannel mode to on.",
      "Configure SW2 EtherChannel mode to auto.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 6.1.7\nThe EtherChannel mode must be compatible on each side for the link to work. The three modes from PAgP protocol are on, desirable, and auto. The three modes from LACP protocol are on, active, and passive. The compatible modes include on-on, auto-desirable, desirable-desirable, active-passive, and active-active. Any other combinations will not form an EtherChannel link.",
  },
  {
    number: 26,
    type: "single",
    text:
      "A network administrator configured an EtherChannel link with three interfaces between two switches. What is the result if one of the three interfaces is down?",
    options: [
      "The remaining two interfaces continue to load balance traffic.",
      "The remaining two interfaces become separate links between the two switches.",
      "One interface becomes an active link for data traffic and the other becomes a backup link.",
      "The EtherChannel fails.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 6.1.3\nEtherChannel creates an aggregation that is seen as one logical link. It provides redundancy because the overall link is one logical connection. The loss of one physical link within the channel does not create a change in the topology; the EtherChannel remains functional.",
  },
  {
    number: 27,
    type: "single",
    text:
      "A network administrator is configuring an EtherChannel link between switches SW1 and SW2 by using the command SW1(config-if-range)# channel-group 1 mode auto. Which command must be used on SW2 to enable this EtherChannel?",
    options: [
      "SW2(config-if-range)# channel-group 1 mode passive",
      "SW2(config-if-range)# channel-group 1 mode desirable",
      "SW2(config-if-range)# channel-group 1 mode on",
      "SW2(config-if-range)# channel-group 1 mode active",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 6.1.6\nThe possible combinations to establish an EtherChannel between SW1 and SW2 using LACP or PAgP are as follows:\nPAgP\non on\nauto desirable\ndesirable desirable\nLACP\non on\nactive active\npassive active\nThe EtherChannel mode chosen on each side of the EtherChannel must be compatible in order to enable it.",
  },
  {
    number: 28,
    type: "single",
    text:
      "Which technology is an open protocol standard that allows switches to automatically bundle physical ports into a single logical link?",
    options: [
      "PAgP",
      "LACP",
      "Multilink PPP",
      "DTP",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 6.1.8\nLACP, or Link Aggregation Control Protocol, is defined by IEEE 802.3ad and is an open standard protocol. LACP allows switches to automatically bundle switch ports into a single logical link to increase bandwidth. PAgP, or Port Aggregation Protocol, performs a similar function, but it is a Cisco proprietary protocol. DTP is Dynamic Trunking Protocol and is used to automatically and dynamically build trunks between switches. Multilink PPP is used to load-balance PPP traffic across multiple serial interfaces.",
  },
];
