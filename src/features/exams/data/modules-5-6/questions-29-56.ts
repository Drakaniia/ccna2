import type { Question } from "../../lib/types";

/** Modules 5 - 6 (Redundant Networks), questions 29-56. */
export const questions29to56: Question[] = [
  {
    number: 29,
    type: "single",
    text: "What is a requirement to configure a trunking EtherChannel between two switches?",
    options: [
      "The allowed range of VLANs must be the same on both switches.",
      "The participating interfaces must be assigned the same VLAN number on both switches.",
      "The participating interfaces must be physically contiguous on a switch.",
      "The participating interfaces must be on the same module on a switch.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 6.2.1\nTo enable a trunking EtherChannel successfully, the range of VLANs allowed on all the interfaces must match; otherwise, the EtherChannel cannot be formed. The interfaces involved in an EtherChannel do not have to be physically contiguous, or on the same module. Because the EtherChannel is a trunking one, participating interfaces are configured as trunk mode, not access mode.",
  },
  {
    number: 30,
    type: "multi",
    text: "What are two advantages of using LACP? (Choose two.)",
    options: [
      "It allows directly connected switches to negotiate an EtherChannel link.",
      "It eliminates the need for configuring trunk interfaces when deploying VLANs on multiple switches.",
      "It decreases the amount of configuration that is needed on a switch.",
      "It provides a simulated environment for testing link aggregation.",
      "It allows the use of multivendor devices.",
      "LACP allows Fast Ethernet and Gigabit Ethernet interfaces to be mixed within a single EtherChannel.",
    ],
    correct: [0, 4],
    choose: 2,
    explanation:
      "Explanation: Topic 6.1.8\nThe Link Aggregation Control Protocol (LACP) allows directly connected multivendor switches to negotiate an EtherChannel link. LACP helps create the EtherChannel link by detecting the configuration of each side and making sure that they are compatible so that the EtherChannel link can be enabled when needed.",
  },
  {
    number: 31,
    type: "single",
    text: "A switch is configured to run STP. What term describes a non-root port that is permitted to forward traffic on the network?",
    options: ["root port", "designated port", "alternate port", "disabled"],
    correct: [1],
    explanation:
      "Explanation: Topic 5.2.6\nA designated port is a non-root port that is permitted to forward traffic on a segment. The root port is also forwarding, but it is the port with the lowest cost to the root bridge; an alternate port is a discarding port that provides a redundant path.",
  },
  {
    number: 32,
    type: "multi",
    text: "What are two advantages of EtherChannel? (Choose two.)",
    options: [
      "Spanning Tree Protocol views the physical links in an EtherChannel as one logical connection.",
      "Load balancing occurs between links configured as different EtherChannels.",
      "Configuring the EtherChannel interface provides consistency in the configuration of the physical links.",
      "Spanning Tree Protocol ensures redundancy by transitioning failed interfaces in an EtherChannel to a forwarding state.",
      "EtherChannel uses upgraded physical links to provide increased bandwidth.",
    ],
    correct: [0, 2],
    choose: 2,
    explanation:
      "Explanation: Topic 6.1.3\nEtherChannel configuration of one logical interface ensures configuration consistency across the physical links in the EtherChannel. The EtherChannel provides increased bandwidth using existing switch ports without requiring any upgrades to the physical interfaces. Load balancing methods are implemented between links that are part of the same Etherchannel. Because EtherChannel views the bundled physical links as one logical connection, spanning tree recalculation is not required if one of the bundled physical links fail. If a physical interface fails, STP cannot transition the failed interface into a forwarding state.",
  },
  {
    number: 33,
    type: "single",
    text: "Refer to the exhibit. What are the possible port roles for ports A, B, C, and D in this RSTP-enabled network?",
    exhibit: {
      src: "/images/modules-5-6/q33-exhibit.png",
      alt: "Exhibit for question 33: RSTP-enabled switch topology with ports A, B, C, and D",
      width: 403,
      height: 380,
    },
    options: [
      "alternate, designated, root, root",
      "designated, alternate, root, root",
      "alternate, root, designated, root",
      "designated, root, alternate, root",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 5.2.1\nBecause S1 is the root bridge, B is a designated port, and C and D root ports. RSTP supports a new port type, alternate port in discarding state, that can be port A in this scenario.",
  },
  {
    number: 34,
    type: "single",
    text: "Refer to the exhibit. Which switching technology would allow each access layer switch link to be aggregated to provide more bandwidth between each Layer 2 switch and the Layer 3 switch?",
    exhibit: {
      src: "/images/modules-5-6/q34-exhibit.png",
      alt: "Exhibit for question 34: access layer switches connected to a Layer 3 switch",
      width: 228,
      height: 171,
    },
    options: ["trunking", "HSRP", "PortFast", "EtherChannel"],
    correct: [3],
    explanation:
      "Explanation: Topic 6.1.1\nPortFast is used to reduce the amount of time that a port spends going through the spanning-tree algorithm, so that devices can start sending data sooner. Trunking can be implemented in conjunction with EtherChannel, but trunking alone does not aggregate switch links. HSRP is used to load-balance traffic across two different connections to Layer 3 devices for default gateway redundancy. HSRP does not aggregate links at either Layer 2 or Layer 3 as EtherChannel does.",
  },
  {
    number: 35,
    type: "single",
    text: "Refer to the exhibit. An administrator wants to form an EtherChannel between the two switches by using the Port Aggregation Protocol. If switch S1 is configured to be in auto mode, which mode should be configured on S2 to form the EtherChannel?",
    exhibit: {
      src: "/images/modules-5-6/q35-exhibit.png",
      alt: "Exhibit for question 35: two switches connected for a PAgP EtherChannel",
      width: 400,
      height: 85,
    },
    options: ["auto", "on", "off", "desirable"],
    correct: [3],
    explanation:
      "Explanation: Topic 6.1.6\nAn EtherChannel will be formed via PAgP when both switches are in on mode or when one of them is in auto or desirable mode and the other is in desirable mode.",
  },
  {
    number: 36,
    type: "single",
    text: "Open the PT Activity. Perform the tasks in the activity instructions and then answer the question.\nWhich set of configuration commands issued on SW1 will successfully complete the EtherChannel link between SW1 and SW2?",
    exhibit: {
      src: "/images/modules-5-6/q36-exhibit.png",
      alt: "Exhibit for question 36: show running-config output on SW1",
      width: 557,
      height: 420,
    },
    options: [
      "interface GigabitEthernet0/1\nno shutdown",
      "interface Port-channel 1\nno shutdown",
      "interface GigabitEthernet0/2\nchannel-group 2 mode desirable",
      "interface GigabitEthernet0/1\nchannel-group 1 mode desirable",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 6.2.2\nIssuing the show running-configuration command on SW1 shows that interface GigabitEthernet0/1 is missing the channel-group 1 mode desirable command which will compete the EtherChannel configuration for interface GigabitEthernet0/1 and interface GigabitEthernet0/2.",
  },
  {
    number: 37,
    type: "single",
    text: "A set of switches is being connected in a LAN topology. Which STP bridge priority value will make it least likely for the switch to be selected as the root?",
    options: ["65535", "4096", "32768", "61440"],
    correct: [3],
    explanation:
      "Explanation: Topic 5.2.1\nThe STP bridge priority is a two byte number, but it can only be customized in increments of 4096. The smaller number is preferred, but the largest usable priority value is 61440.",
  },
  {
    number: 38,
    type: "multi",
    text: "In which two PVST+ port states are MAC addresses learned? (Choose two.)",
    options: ["learning", "forwarding", "disabled", "listening", "blocking"],
    correct: [0, 1],
    choose: 2,
    explanation:
      "Explanation: Topic 5.2.10\nThe two PVST+ port states during which MAC addresses are learned and populate the MAC address table are the learning and the forwarding states.",
  },
  {
    number: 39,
    type: "single",
    text: "Which port role is assigned to the switch port that has the lowest cost to reach the root bridge?",
    options: [
      "designated port",
      "disabled port",
      "root port",
      "non-designated port",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 5.2.5\nThe root port on a switch is the port with the lowest cost to reach the root bridge.",
  },
  {
    number: 40,
    type: "single",
    text: "A switch is configured to run STP. What term describes the switch port closest, in terms of overall cost, to the root bridge?",
    options: ["root port", "designated port", "alternate port", "disabled"],
    correct: [0],
    explanation:
      "Explanation: Topic 5.2.5\nThe root port is the switch port with the lowest overall cost to reach the root bridge, so it is the port closest to the root in terms of path cost.",
  },
  {
    number: 42,
    type: "single",
    text: "A switch is configured to run STP. What term describes a field used to specify a VLAN ID?",
    options: ["extended system ID", "port ID", "bridge priority", "bridge ID"],
    correct: [0],
    explanation:
      "Explanation: Topic 5.2.1\nThe extended system ID is the 12-bit field of the bridge ID that carries the VLAN ID in PVST, which lets a switch maintain a separate spanning-tree instance for that VLAN.",
  },
  {
    number: 43,
    type: "single",
    text: "A switch is configured to run STP. What term describes the reference point for all path calculations?",
    options: ["root bridge", "root port", "designated port", "alternate port"],
    correct: [0],
    explanation:
      "Explanation: Topic 5.2.2\nThe root bridge is the reference point for all path calculations. Every other switch measures the cost of its paths against the root bridge, which is the switch with the lowest bridge ID.",
  },
  {
    number: 44,
    type: "single",
    text: "A switch is configured to run STP. What term describes a field that has a default value of 32,768 and is the initial deciding factor when electing a root bridge?",
    options: [
      "bridge priority",
      "MAC Address",
      "extended system ID",
      "bridge ID",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 5.2.1\nThe bridge priority is the first field of the bridge ID and has a default value of 32768. It is compared before the MAC address, so configuring a lower priority makes a switch more likely to win the root bridge election.",
  },
  {
    number: 45,
    type: "single",
    text: "Which statement describes an EtherChannel implementation?",
    options: [
      "EtherChannel operates only at Layer 2.",
      "PAgP cannot be used in conjunction with EtherChannel.",
      "A trunked port can be part of an EtherChannel bundle.",
      "EtherChannel can support up to a maximum of ten separate links.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 6.2.1\nUp to 16 links can be grouped in an EtherChannel by using the the PAgP or LACP protocol. EtherChannel can be configured as a Layer 2 bundle or a Layer 3 bundle. Configuring a Layer 3 bundle is beyond the scope of this course. If a trunked port is a part of the EtherChannel bundle, all ports in the bundle need to be trunk ports and the native VLAN must be the same on all of these ports. A best practice is to apply the configuration to the port channel interface. The configuration is then automatically applied to the individual ports.",
  },
  {
    number: 46,
    type: "single",
    text: "Refer to the exhibit. A network administrator issued the show etherchannel summary command on the switch S1. What conclusion can be drawn?",
    exhibit: {
      src: "/images/modules-5-6/q46-exhibit.png",
      alt: "Exhibit for question 46: show etherchannel summary output on S1",
      width: 531,
      height: 295,
    },
    options: [
      "The EtherChannel is suspended.",
      "The EtherChannel is not functional.",
      "The port aggregation protocol PAgP is misconfigured.",
      "FastEthernet ports Fa0/1, Fa0/2, and Fa0/3 do not join the EtherChannel.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 6.3.3\nThe EtherChannel status shows as (SD), which means it is a Layer 2 EtherChannel with a status of D or down. Because the EtherChannel is down, the status of the interfaces in the channel group is stand-alone. PAgP is configured on S1, but there is no indication whether it is configured correctly on S1. The problem might also be the adjacent switch EtherChannel configuration.",
  },
  {
    number: 47,
    type: "single",
    text: "Which statement describes a characteristic of EtherChannel?",
    options: [
      "It can combine up to a maximum of 4 physical links.",
      "It can bundle mixed types of 100 Mb/s and 1Gb/s Ethernet links.",
      "It consists of multiple parallel links between a switch and a router.",
      "It is made by combining multiple physical links that are seen as one link between two switches.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 6.1.1\nAn EtherChannel is formed by combining multiple (same type) Ethernet physical links so they are seen and configured as one logical link. It provides an aggregated link between two switches. Currently each EtherChannel can consist of up to eight compatibly configured Ethernet ports.",
  },
  {
    number: 48,
    type: "multi",
    text: "Which two channel group modes would place an interface in a negotiating state using PAgP? (Choose two.)",
    options: ["on", "desirable", "active", "auto", "passive"],
    correct: [1, 3],
    choose: 2,
    explanation:
      "Explanation: Topic 6.1.6\nThere are three modes available when configuring an interface for PAgP: on, desirable, and auto. Only desirable and auto place the interface in a negotiating state. The active and passive states are used to configure LACP and not PAgP.",
  },
  {
    number: 49,
    type: "single",
    text: "Which mode configuration setting would allow formation of an EtherChannel link between switches SW1 and SW2 without sending negotiation traffic?",
    options: [
      "SW1: on\nSW2: on",
      "SW1: desirable\nSW2: desirable",
      "SW1: auto\nSW2: auto\ntrunking enabled on both switches",
      "SW1: auto\nSW2: auto\nPortFast enabled on both switches",
      "SW1: passive\nSW2: active",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 6.1.6\nThe auto channel-group keyword enables PAgP only if a PAgP device is detected on the opposite side of the link. If the auto keyword is used, the only way to form an EtherChannel link is if the opposite connected device is configured with the desirable keyword. PortFast and trunking technologies are irrelevant to forming an EtherChannel link. Even though an EtherChannel can be formed if both sides are configured in desirable mode, PAgP is active and PAgP messages are being sent constantly across the link, decreasing the amount of bandwidth available for user traffic.",
  },
  {
    number: 50,
    type: "single",
    text: "Refer to the exhibit. An EtherChannel was configured between switches S1 and S2, but the interfaces do not form an EtherChannel. What is the problem?",
    exhibit: {
      src: "/images/modules-5-6/q50-exhibit.png",
      alt: "Exhibit for question 50: EtherChannel configuration on S1 and S2",
      width: 436,
      height: 254,
    },
    options: [
      "The interface port-channel number has to be different on each switch.",
      "The switch ports were not configured with speed and duplex mode.",
      "The switch ports have to be configured as access ports with each port having a VLAN assigned.",
      "The EtherChannel was not configured with the same allowed range of VLANs on each interface.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 6.2.1\nFor an EtherChannel to form, the member interfaces on both switches must agree on their configuration: the same speed and duplex mode, the same VLAN or trunk mode, and the same allowed VLAN range. In the exhibit the allowed VLAN ranges do not match, so the interfaces do not join the EtherChannel.",
  },
  {
    number: 51,
    type: "single",
    text: "When EtherChannel is configured, which mode will force an interface into a port channel without exchanging aggregation protocol packets?",
    options: ["active", "auto", "on", "desirable"],
    correct: [2],
    explanation:
      'Explanation: Topic 6.1.6\nFor both LACP and PAgP, the "on" mode will force an interface into an EtherChannel without exchanging protocol packets.',
  },
  {
    number: 52,
    type: "multi",
    text: "What are two load-balancing methods in the EtherChannel technology? (Choose two.)",
    options: [
      "combination of source port and IP to destination port and IP",
      "source IP to destination IP",
      "source port to destination port",
      "combination of source MAC and IP to destination MAC and IP",
      "source MAC to destination MAC",
    ],
    correct: [1, 4],
    choose: 2,
    explanation:
      "Explanation: Topic 6.1.3\nDepending on the hardware platform, one or more load-balancing methods can be implemented. These methods include source MAC to destination MAC load balancing or source IP to destination IP load balancing, across the physical links.",
  },
  {
    number: 53,
    type: "single",
    text: "Which protocol provides up to 16 instances of RSTP, combines many VLANs with the same physical and logical topology into a common RSTP instance, and provides support for PortFast, BPDU guard, BPDU filter, root guard, and loop guard?",
    options: ["STP", "Rapid PVST+", "PVST+", "MST"],
    correct: [3],
    explanation:
      "Explanation: Topic 5.3.1\nMST is the Cisco implementation of MSTP, an IEEE standard protocol that provides up to 16 instances of RSTP and combines many VLANs with the same physical and logical topology into a common RSTP instance. Each instance supports PortFast, BPDU guard, BPDU filter, root guard, and loop guard. STP and RSTP assume only one spanning-tree instance for the entire bridged network, regardless of the number of VLANs. PVST+ provides a separate 802.1D spanning-tree instance for each VLAN that is configured in the network.",
  },
  {
    number: 54,
    type: "single",
    text: "What is the outcome of a Layer 2 broadcast storm?",
    options: [
      "Routers will take over the forwarding of frames as switches become congested.",
      "New traffic is discarded by the switch because it is unable to be processed.",
      "CSMA/CD will cause each host to continue transmitting frames.",
      "ARP broadcast requests are returned to the transmitting host.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 5.1.6\nWhen the network is saturated with broadcast traffic that is looping between switches, new traffic is discarded by each switch because it is unable to be processed.",
  },
  {
    number: 55,
    type: "multi",
    text: "Which two network design features require Spanning Tree Protocol (STP) to ensure correct network operation? (Choose two.)",
    options: [
      "static default routes",
      "implementing VLANs to contain broadcasts",
      "redundant links between Layer 2 switches",
      "link-state dynamic routing that provides redundant routes",
      "removing single points of failure with multiple Layer 2 switches",
    ],
    correct: [2, 4],
    choose: 2,
    explanation:
      "Explanation: Topic 5.1.1\nSpanning Tree Protocol (STP) is required to ensure correct network operation when designing a network with multiple interconnected Layer 2 switches or using redundant links to eliminate single points of failure between Layer 2 switches. Routing is a Layer 3 function and does not relate to STP. VLANs do reduce the number of broadcast domains but relate to Layer 3 subnets, not STP.",
  },
  {
    number: 56,
    type: "single",
    text: "A network administrator has configured an EtherChannel between two switches that are connected via four trunk links. If the physical interface for one of the trunk links changes to a down state, what happens to the EtherChannel?",
    options: [
      "Spanning Tree Protocol will transition the failed physical interface into forwarding mode.",
      "Spanning Tree Protocol will recalculate the remaining trunk links.",
      "The EtherChannel will transition to a down state.",
      "The EtherChannel will remain functional.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 6.1.3\nEtherChannel offers redundancy by bundling multiple trunk links into one logical connection. Failure of one physical link within the EtherChannel will not create a change in the topology and therefore a recalculation by Spanning Tree is unnecessary. Just one physical link must remain operational for the EtherChannel to continue to function.",
  },
];
