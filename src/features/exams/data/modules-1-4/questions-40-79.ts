import type { Question } from "../../lib/types";

/** Modules 1 - 4 (Switching Concepts, VLANs, and InterVLAN Routing), questions 40-79. */
export const questions40to79: Question[] = [
  {
    number: 40,
    type: "single",
    text: "Refer to the exhibit. A network administrator has configured router CiscoVille with the above commands to provide inter-VLAN routing. What command will be required on a switch that is connected to the Gi0/0 interface on router CiscoVille to allow inter-VLAN routing?",
    exhibit: {
      src: "/images/modules-1-4/q40-exhibit.png",
      alt: "Exhibit for question 40: router-on-a-stick configuration on router CiscoVille",
      width: 553,
      height: 227,
    },
    options: [
      "switchport mode access",
      "no switchport",
      "switchport mode trunk",
      "switchport mode dynamic desirable",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 4.2.2\nWhen they are configured for inter-VLAN routing, routers do not support the dynamic trunking protocol that is used by switches. For router-on-a-stick configurations to function, a connected switch must use the command switchport mode trunk.",
  },
  {
    number: 41,
    type: "single",
    text: "A high school uses VLAN15 for the laboratory network and VLAN30 for the faculty network. What is required to enable communication between these two VLANs while using the router-on-a-stick approach?",
    options: [
      "A multilayer switch is needed.",
      "A router with at least two LAN interfaces is needed.",
      "Two groups of switches are needed, each with ports that are configured for one VLAN.",
      "A switch with a port that is configured as a trunk is needed when connecting to the router.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 4.1.3\nWith router-on-a-stick, inter-VLAN routing is performed by a router with a single router interface that is connected to a switch port configured with trunk mode. Multiple subinterfaces, each configured for a VLAN, can be configured under the single physical router interface. Switches can have ports that are assigned to different VLANs, but communication between those VLANs requires routing function from the router. A multilayer switch is not used in a router-on-a-stick approach to inter-VLAN routing.",
  },
  {
    number: 42,
    type: "multi",
    text: "When routing a large number of VLANs, what are two disadvantages of using the router-on-a-stick inter-VLAN routing method rather than the multilayer switch inter-VLAN routing method? (Choose two.)",
    choose: 2,
    options: [
      "Multiple SVIs are needed.",
      "A dedicated router is required.",
      "Router-on-a-stick requires subinterfaces to be configured on the same subnets.",
      "Router-on-a-stick requires multiple physical interfaces on a router.",
      "Multiple subinterfaces may impact the traffic flow speed.",
    ],
    correct: [1, 4],
    explanation:
      "Explanation: Topic 4.1.3\nWith the router-on-a-stick inter-VLAN routing method, a dedicated router is required. It only needs one physical interface on the router to route traffic among multiple VLANs, by using subinterfaces on one physical interface. On the other hand, since traffic of all VLANs will have to go through the same physical interfaces, the throughput will be impacted. Also, a multilayer switch can use multiple SVIs to perform inter-VLAN routing.",
  },
  {
    number: 43,
    type: "multi",
    text: "Refer to the exhibit. A network administrator is verifying the configuration of inter-VLAN routing. Users complain that PCs on different VLANs cannot communicate. Based on the output, what are two configuration errors on switch interface Gi1/1? (Choose two.)",
    choose: 2,
    exhibit: {
      src: "/images/modules-1-4/q43-exhibit.png",
      alt: "Exhibit for question 43: inter-VLAN routing switch interface Gi1/1 output",
      width: 611,
      height: 391,
    },
    options: [
      "Gi1/1 is in the default VLAN.",
      "Voice VLAN is not assigned to Gi1/1.",
      "Gi1/1 is configured as trunk mode.",
      "Negotiation of trunking is turned on on Gi1/1.",
      "The trunking encapsulation protocol is configured wrong.",
    ],
    correct: [0, 2],
    explanation:
      "Explanation: Topic 4.4.4\nWith legacy inter-VLAN routing methods, the switch ports that connect to the router should be configured as access mode and be assigned appropriate VLANs. In this scenario, the Gi1/1 interface should be in access mode with VLAN 10 assigned. The other options are default settings on the switch and have no effect on legacy inter-VLAN routing.",
  },
  {
    number: 44,
    type: "single",
    text: "Refer to the exhibit. A network administrator is verifying the configuration of inter-VLAN routing. Users complain that PC2 cannot communicate with PC1. Based on the output, what is the possible cause of the problem?",
    exhibit: {
      src: "/images/modules-1-4/q44-exhibit.png",
      alt: "Exhibit for question 44: router subinterface configuration output",
      width: 448,
      height: 392,
    },
    options: [
      "Gi0/0 is not configured as a trunk port.",
      "The command interface GigabitEthernet0/0.5 was entered incorrectly.",
      "There is no IP address configured on the interface Gi0/0.",
      "The no shutdown command is not entered on subinterfaces.",
      "The encapsulation dot1Q 5 command contains the wrong VLAN.",
    ],
    correct: [4],
    explanation:
      "Explanation: Topic 4.4.6\nIn router-on-a-stick, the subinterface configuration should match the VLAN number in the encapsulation command, in this case, the command encapsulation dot1Q 10 should be used for VLAN 10. Since subinterfaces are used, there is no need to configure IP on the physical interface Gi0/0. The trunk mode is configured on the switch port that connects to the router. The subinterfaces are turned on when they are added.",
  },
  {
    number: 45,
    type: "single",
    text: "Refer to the exhibit. A network administrator has configured router CiscoVille with the above commands to provide inter-VLAN routing. What type of port will be required on a switch that is connected to Gi0/0 on router CiscoVille to allow inter-VLAN routing?",
    exhibit: {
      src: "/images/modules-1-4/q45-exhibit.jpg",
      alt: "Exhibit for question 45: router-on-a-stick configuration on router CiscoVille",
      width: 830,
      height: 342,
    },
    options: ["routed port", "access port", "trunk port", "SVI"],
    correct: [2],
    explanation:
      "Explanation: Topic 4.2.2\nTo allow a router-on-a-stick configuration to function, a switch must be connected to the router via a trunk port to carry the VLANs to be routed. An SVI would be used on a multilayer switch where the switch is performing inter-VLAN routing.",
  },
  {
    number: 46,
    type: "single",
    text: "Refer to the exhibit. A network administrator is configuring RT1 for inter-VLAN routing. The switch is configured correctly and is functional. Host1, Host2, and Host3 cannot communicate with each other. Based on the router configuration, what is causing the problem?",
    exhibit: {
      src: "/images/modules-1-4/q46-exhibit.png",
      alt: "Exhibit for question 46: RT1 subinterface configuration for three VLANs",
      width: 569,
      height: 425,
    },
    options: [
      "Interface Fa0/0 is missing IP address configuration information.",
      "IP addresses on the subinterfaces are incorrectly matched to the VLANs.",
      "Each subinterface of Fa0/0 needs separate no shutdown commands.",
      "Routers do not support 802.1Q encapsulation on subinterfaces.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 4.4.6\nSince Host 1 (in VLAN 20) has the IP 172.18.1.10/27, the subinterface Fa0/0.1 should be configured with an IP address in the network 172.168.1.0/27. Similarly, Fa0/0.2 should be with an IP address in the network 172.168.1.64/27 and Fa0/0.3 should be with an IP address in the network 172.168.1.96/27.",
  },
  {
    number: 47,
    type: "single",
    text: "Refer to the exhibit. A router-on-a-stick configuration was implemented for VLANs 15, 30, and 45, according to the show running-config command output. PCs on VLAN 45 that are using the 172.16.45.0 /24 network are having trouble connecting to PCs on VLAN 30 in the 172.16.30.0 /24 network. Which error is most likely causing this problem?",
    exhibit: {
      src: "/images/modules-1-4/q47-exhibit.png",
      alt: "Exhibit for question 47: show running-config output for a router-on-a-stick configuration",
      width: 338,
      height: 336,
    },
    options: [
      "The wrong VLAN has been configured on GigabitEthernet 0/0.45.",
      "The command no shutdown is missing on GigabitEthernet 0/0.30.",
      "The GigabitEthernet 0/0 interface is missing an IP address.",
      "There is an incorrect IP address configured on GigabitEthernet 0/0.30.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 4.4.6\nThe subinterface GigabitEthernet 0/0.30 has an IP address that does not correspond to the VLAN addressing scheme. The physical interface GigabitEthernet 0/0 does not need an IP address for the subinterfaces to function. Subinterfaces do not require the no shutdown command.",
  },
  {
    number: 48,
    type: "single",
    text: "What is a characteristic of a routed port on a Layer 3 switch?",
    options: [
      "It supports trunking.",
      "It is not assigned to a VLAN.",
      "It is commonly used as a WAN link.",
      "It cannot have an IP address assigned to it.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 4.3.1\nA routed port on a Layer 3 switch is commonly used for connecting between distribution and core layer switches or between a Layer 3 switch and a router. This port does not get VLAN or trunking commands assigned to it. Instead, the port is programmed with an IP address. This is commonly used when static routing is configured on the switch or when a routing protocol is being run between the Layer 3 switch and the router or another Layer 3 switch.",
  },
  {
    number: 49,
    type: "single",
    text: "Refer to the exhibit. A network administrator needs to configure router-on-a-stick for the networks that are shown. How many subinterfaces will have to be created on the router if each VLAN that is shown is to be routed and each VLAN has its own subinterface?",
    exhibit: {
      src: "/images/modules-1-4/q49-exhibit.png",
      alt: "Exhibit for question 49: topology with a PC, printer, IP phone, and management VLANs",
      width: 311,
      height: 325,
    },
    options: ["1", "2", "3", "4", "5"],
    correct: [3],
    explanation:
      "Explanation: Topic 4.2.4\nBased on the IP addresses and masks given, the PC, printer, IP phone, and switch management VLAN are all on different VLANs. This situation will require four subinterfaces on the router.",
  },
  {
    number: 50,
    type: "single",
    text: "A technician is configuring a new Cisco 2960 switch. What is the effect of issuing the BranchSw(config-if)# mdix auto command?",
    options: [
      "It automatically adjusts the port to allow device connections to use either a straight-through or a crossover cable.",
      "It applies an IPv4 address to the virtual interface.",
      "It applies an IPv6 address to the virtual interface.",
      "It permits an IPv6 address to be configured on a switch physical interface.",
      "It updates the MAC address table for the associated port.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.2.3\nThe mdix auto (Media Dependent Interface Crossover) command enables the automatic cable detection feature on the switch interface. When enabled, the switch automatically detects the required cable type (straight-through or crossover) for the connection and configures the interface copper pins internally to establish the link. This eliminates the need for physical cable swapping. For this feature to function properly, both the speed and duplex of the interface must be set to auto ( speed auto and duplex auto ).",
  },
  {
    number: 51,
    type: "single",
    text: "A technician is configuring a new Cisco 2960 switch. What is the effect of issuing the BranchSw(config-if)# ip address 172.18.33.88 255.255.255.0 command?",
    options: [
      "It applies an IPv4 address to the virtual interface.",
      "It applies an IPv6 address to the virtual interface.",
      "It activates a virtual or physical switch interface.",
      "It permits an IPv6 address to be configured on a switch physical interface.",
      "It updates the MAC address table for the associated port.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.1.6\nOn a Layer 2 switch such as the Cisco 2960, physical ports do not support network layer IP addresses directly. In order to enable remote management (such as SSH or Telnet) and allow the switch to communicate over the network, an IP address must be assigned to a Switch Virtual Interface (SVI), which is a logical interface (typically interface vlan 1 by default). Therefore, when the technician issues this command within the appropriate virtual interface configuration mode, the direct effect is that it applies an IPv4 address to the virtual interface.",
  },
  {
    number: 52,
    type: "single",
    text: "A technician is configuring a new Cisco 2960 switch. What is the effect of issuing the BranchSw# configure terminal command?",
    options: [
      "It enters the global configuration mode.",
      "It enters configuration mode for a switch virtual interface.",
      "It applies an IPv4 address to the virtual interface.",
      "It updates the MAC address table for the associated port.",
      "It permits an IPv6 address to be configured on a switch physical interface.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.1.6\nThe configure terminal command is executed from the privileged EXEC mode (indicated by the # symbol in the prompt BranchSW# ) and is used to transition the device into global configuration mode. Once in this mode, the switch prompt changes to BranchSW(config)#, allowing the administrator to implement configuration changes that affect the entire device. Other options, such as saving the configuration ( copy running-config startup-config ) or disabling an interface ( shutdown ), require entirely different commands.",
  },
  {
    number: 53,
    type: "single",
    text: "A technician is configuring a new Cisco 2960 switch. What is the effect of issuing the BranchSw# configure terminal command?",
    options: [
      "It enters the global configuration mode.",
      "It saves the running configuration to NVRAM.",
      "It disables a virtual or physical switch interface.",
      "It updates the MAC address table for the associated port.",
      "It saves the startup configuration to the running configuration.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.1.6\nThe configure terminal command is executed from the privileged EXEC mode (indicated by the # symbol in the prompt BranchSW# ) and is used to transition the device into global configuration mode. Once in this mode, the switch prompt changes to BranchSW(config)#, allowing the administrator to implement configuration changes that affect the entire device. Other options, such as saving the configuration ( copy running-config startup-config ) or disabling an interface ( shutdown ), require entirely different commands.",
  },
  {
    number: 54,
    type: "single",
    text: "A technician is configuring a new Cisco 2960 switch. What is the effect of issuing the BranchSw(config-if)# shutdown command?",
    options: [
      "It disables a virtual or physical switch interface.",
      "It saves the running configuration to NVRAM.",
      "It activates a virtual or physical switch interface.",
      "It updates the MAC address table for the associated port.",
      "It saves the startup configuration to the running configuration.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.2.6\nThe shutdown command is used in Cisco IOS to administratively disable or turn off a specific interface. This applies to both physical interfaces (such as interface FastEthernet 0/1) and virtual / logical interfaces (such as an SVI like interface VLAN 10). When executed within the interface configuration mode (config-if), the interface immediately transitions to an “Administratively Down” state, completely halting all data traffic through it. To reverse this effect and re-enable the interface, the inverse command no shutdown must be used instead.",
  },
  {
    number: 55,
    type: "single",
    text: "A technician is configuring a new Cisco 2960 switch. What is the effect of issuing the BranchSw(config-if)# shutdown command?",
    options: [
      "It disables a virtual or physical switch interface.",
      "It applies an IPv6 address to the virtual interface.",
      "It applies an IPv4 address to the virtual interface.",
      "It permits an IPv6 address to be configured on a switch physical interface.",
      "It updates the MAC address table for the associated port.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.2.6\nThe shutdown command is used in Cisco IOS to administratively disable or turn off a specific interface. This applies to both physical interfaces (such as interface FastEthernet 0/1) and virtual / logical interfaces (such as an SVI like interface VLAN 10). When executed within the interface configuration mode (config-if), the interface immediately transitions to an “Administratively Down” state, completely halting all data traffic through it. To reverse this effect and re-enable the interface, the inverse command no shutdown must be used instead.",
  },
  {
    number: 56,
    type: "single",
    text: "A technician is configuring a new Cisco 2960 switch. What is the effect of issuing the BranchSw(config-if)# ipv6 address 2001:db8:a2b4:88::1/64 command?",
    options: [
      "It applies an IPv6 address to the virtual interface.",
      "It activates a virtual or physical switch interface.",
      "It applies an IPv4 address to the virtual interface.",
      "It permits an IPv6 address to be configured on a switch physical interface.",
      "It updates the MAC address table for the associated port.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.1.6\nOn a Layer 2 switch like the Cisco Catalyst 2960, the physical ports (such as FastEthernet or GigabitEthernet ) operate strictly at the Data Link Layer (Layer 2). Therefore, you cannot directly assign a Layer 3 IP address (either IPv4 or IPv6) to a physical interface. In order for a Layer 2 switch to have IP connectivity — which is required for remote management via SSH, Telnet, or Web UI, as well as communicating with other network devices — the IP address must be assigned to a Switch Virtual Interface (SVI), such as interface vlan 1. Consequently, when the technician executes this command within the interface configuration mode (config-if), they are configuring a logical/virtual interface, which successfully applies the global unicast IPv6 address to that specific SVI.",
  },
  {
    number: 57,
    type: "single",
    text: "A technician is configuring a new Cisco 2960 switch. What is the effect of issuing the BranchSw(config-if)# exit command?",
    options: [
      "It returns to global configuration mode.",
      "It returns to privileged mode.",
      "It configures the default gateway for the switch.",
      "It enters user mode.",
      "It saves the startup configuration to the running configuration.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.4.1\nThe Cisco IOS Command Line Interface (CLI) uses a strict hierarchical structure. When the prompt displays (config-if)#, it indicates that the technician is currently inside the interface configuration sub-mode. Issuing the exit command moves the user back exactly one level in the command hierarchy. As a result, the switch leaves the interface sub-mode and returns to global configuration mode, changing the CLI prompt back to branchSW(config)#.",
  },
  {
    number: 58,
    type: "single",
    text: "A technician is configuring a new Cisco 2960 switch. What is the effect of issuing the BranchSw> enable command?",
    options: [
      "It enters privileged mode.",
      "It enters the global configuration mode.",
      "It enters configuration mode for a switch virtual interface.",
      "It updates the MAC address table for the associated port.",
      "It permits an IPv6 address to be configured on a switch physical interface.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.1.6\nThe enable command is executed from the user EXEC mode (identified by the > symbol in the branchSW> prompt) and is used to transition the device into privileged EXEC mode. Once this command is entered, the switch prompt changes to branchSW#, granting the administrator access to higher-level monitoring and verification commands, as well as the ability to navigate into global configuration mode.",
  },
  {
    number: 59,
    type: "single",
    text: "A technician is configuring a new Cisco 2960 switch. What is the effect of issuing the BranchSw(config-if)# duplex full command?",
    options: [
      "It allows data to flow in both directions at the same time on the interface.",
      "It allows data to flow in only one direction at a time on the interface",
      "It automatically adjusts the port to allow device connections to use either a straight-through or a crossover cable.",
      "It configures the switch as the default gateway.",
      "It encrypts user-mode passwords when users connect remotely.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.2.1\nThe duplex full command configures the switch interface to operate in full-duplex mode, enabling simultaneous two-way communication. This means that both the switch port and the connected device can transmit and receive data at the exact same time without causing any network collisions. In contrast, if the interface were configured with duplex half, data could only flow in one direction at a time, forcing devices to take turns transmitting and introducing the risk of collisions. Implementing Full-Duplex maximizes bandwidth efficiency and significantly improves network performance on the link.",
  },
  {
    number: 60,
    type: "single",
    text: "What type of VLAN should not carry voice and network management traffic?",
    options: ["data VLAN", "voice VLAN", "management VLAN", "security VLAN"],
    correct: [0],
    explanation:
      "Explanation: Topic 3.1.3\nA data VLAN, also referred to as a user VLAN, is specifically designed to carry user-generated network traffic such as web browsing, emails, or file transfers. For both security and performance reasons, network design best practices dictate that a data VLAN should not carry high-priority voice traffic (VoIP) or critical network management traffic (such as SSH, Telnet, or SNMP). Separating these distinct types of traffic into dedicated VLANs ensures that regular user data congestion does not negatively impact essential network services or infrastructure management.",
  },
  {
    number: 62,
    type: "single",
    text: "What type of VLAN is designed to reserve bandwidth to ensure IP Phone quality?",
    options: ["voice VLAN", "trunk VLAN", "security VLAN", "management VLAN"],
    correct: [0],
    explanation:
      "Explanation: Topic 3.2.6\nA voice VLAN is specifically designed and configured to carry Voice over IP (VoIP) traffic from IP phones. Because voice communications are highly sensitive to network delay and jitter, a voice VLAN allows the implementation of Quality of Service (QoS) and traffic prioritization policies. This mechanism reserves the required network bandwidth to ensure crystal-clear and uninterrupted phone conversations by isolating critical voice streams from regular, lower-priority data traffic.",
  },
  {
    number: 63,
    type: "single",
    text: "What type of VLAN is initially the management VLAN?",
    options: ["default VLAN", "native VLAN", "data VLAN", "management VLAN"],
    correct: [0],
    explanation:
      "Explanation: Topic 3.1.3\nIn the out-of-the-box factory configuration of a Cisco switch, the default VLAN (VLAN 1) serves multiple foundational roles: it is the default data VLAN, the default native VLAN, and also the initial management VLAN. This means that before any custom configuration is applied, the switch's virtual interface ( interface vlan 1 ) is the active logical interface used to assign an IP address for remote management. However, due to security best practices, it is highly recommended to change the management VLAN to a unique, dedicated VLAN separate from VLAN 1.",
  },
  {
    number: 64,
    type: "single",
    text: "What type of VLAN is designed to have a delay of less than 150 ms across the network?",
    options: ["voice VLAN", "desirable VLAN", "trunk VLAN", "security VLAN"],
    correct: [0],
    explanation:
      "Explanation: Topic 3.1.3\nA voice VLAN is explicitly designed to carry Voice over IP (VoIP) traffic. Because real-time voice communications are highly sensitive to network delay and jitter, industry standards (including Cisco guidelines) state that the one-way target delay across the network should not exceed 150 ms. To satisfy this stringent requirement, switches segment voice streams into a dedicated VLAN where Quality of Service (QoS) policies can be enforced to prioritize voice packets over regular data traffic.",
  },
  {
    number: 65,
    type: "single",
    text: "What type of VLAN is used to separate the network into groups of users or devices?",
    options: ["data VLAN", "management VLAN", "voice VLAN", "native VLAN"],
    correct: [0],
    explanation:
      "Explanation: Topic 3.1.3\nA data VLAN, also referred to as a user VLAN, is specifically designed and configured to carry user-generated network traffic (such as web browsing, emails, or file transfers). The primary purpose of a data VLAN is to separate the network into logical groups of users or devices based on their roles or functions. This practice ensures that regular user data traffic is isolated from critical network management traffic and high-priority voice (VoIP) traffic.",
  },
  {
    number: 66,
    type: "single",
    text: "What type of VLAN is configured specifically for network traffic such as SSH, Telnet, HTTPS, HTTP, and SNMP?",
    options: ["management VLAN", "security VLAN", "trunk VLAN", "voice VLAN"],
    correct: [0],
    explanation:
      "Explanation: Topic 3.1.3\nA management VLAN is any VLAN that is configured to provide remote management access to a switch. Network management traffic such as SSH, Telnet, HTTPS, HTTP, and SNMP is specifically assigned to this VLAN to ensure that IT personnel can securely configure, monitor, and troubleshoot network devices. This isolates critical infrastructure management traffic from regular user data traffic. By default, Cisco switches use VLAN 1 as the initial management VLAN, although security best practices dictate changing this to a unique, dedicated VLAN.",
  },
  {
    number: 68,
    type: "single",
    text: "What type of VLAN supports untagged traffic?",
    options: ["native VLAN", "voice VLAN", "security VLAN", "management VLAN"],
    correct: [0],
    explanation:
      "Explanation: Topic 3.2.5\nOn a switched network utilizing the IEEE 802.1Q encapsulation standard for trunk links, all data frames are normally tagged with a specific VLAN ID to identify their network of origin. The only exception to this rule is the native VLAN. Traffic belonging to the native VLAN is transmitted across the trunk link completely untagged. When the switch on the receiving end of the trunk encounters an untagged frame, it automatically associates it with its locally configured native VLAN.",
  },
  {
    number: 69,
    type: "single",
    text: "What type of VLAN supports untagged traffic?",
    options: ["native VLAN", "desirable VLAN", "trunk VLAN", "security VLAN"],
    correct: [0],
    explanation:
      "Explanation: Topic 3.2.5\nOn a switched network utilizing the IEEE 802.1Q encapsulation standard for trunk links, all data frames are normally tagged with a specific VLAN ID to identify their network of origin. The only exception to this rule is the native VLAN. Traffic belonging to the native VLAN is transmitted across the trunk link completely untagged. When the switch on the receiving end of the trunk encounters an untagged frame, it automatically associates it with its locally configured native VLAN.",
  },
  {
    number: 70,
    type: "single",
    text: "Refer to the exhibit. A network administrator has configured R1 as shown. When the administrator checks the status of the serial interface, the interface is shown as being administratively down. What additional command must be entered on the serial interface of R1 to bring the interface up?",
    exhibit: {
      src: "/images/modules-1-4/q70-exhibit.jpg",
      alt: "Exhibit for question 70: R1 serial interface configuration",
      width: 520,
      height: 324,
    },
    options: ["IPv6 enable", "clockrate 128000", "end", "no shutdown"],
    correct: [3],
    explanation:
      "Explanation: Topic 1.4.4\nBy default all router interfaces are shut down. To bring the interfaces up, an administrator must issue the no shutdown command in interface mode.",
  },
  {
    number: 71,
    type: "single",
    text: "Refer to the exhibit. The network administrator wants to configure Switch1 to allow SSH connections and prohibit Telnet connections. How should the network administrator change the displayed configuration to satisfy the requirement?",
    exhibit: {
      src: "/images/modules-1-4/q71-exhibit.jpg",
      alt: "Exhibit for question 71: Switch1 vty line configuration",
      width: 300,
      height: 96,
    },
    options: [
      "Use SSH version 1.",
      "Reconfigure the RSA key.",
      "Configure SSH on a different line.",
      "Modify the transport input command.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 1.3.4\nTo restrict remote management access exclusively to SSH and block unencrypted Telnet traffic on the virtual terminal lines (vty), the command transport input ssh must be applied under the line configuration mode. In the exhibit, the current configuration shows transport input all, which accepts all incoming connection protocols (including both Telnet and SSH). Therefore, the network administrator needs to modify the transport input command to specify only ssh, forcing the switch to drop any Telnet connection attempts while keeping SSH active.",
  },
  {
    number: 72,
    type: "single",
    text: "Which solution would help a college alleviate network congestion due to collisions?",
    options: [
      "a firewall that connects to two Internet providers",
      "a high port density switch",
      "a router with two Ethernet ports",
      "a router with three Ethernet ports",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 2.2.3\nSwitches provide microsegmentation so that one device does not compete for the same Ethernet network bandwidth with another network device, thus practically eliminating collisions. A high port density switch provides very fast connectivity for many devices.",
  },
  {
    number: 73,
    type: "multi",
    text: "Which two statements are correct with respect to SVI inter-VLAN routing? (Choose two.)",
    choose: 2,
    options: [
      "Switching packets is faster with SVI.",
      "There is no need for a connection to a router.",
      "Virtual interfaces support subinterfaces.",
      "SVIs can be bundled into EtherChannels.",
      "SVIs eliminate the need for a default gateway in the hosts.",
    ],
    correct: [0, 1],
    explanation:
      "Explanation: Topic 4.1.4\nThe SVI inter-VLAN routing method is faster than other methods. The switch can route the existing VLANs without the need for a router.",
  },
  {
    number: 74,
    type: "single",
    text: "Refer to the exhibit. A network administrator is configuring inter-VLAN routing on a network. For now, only one VLAN is being used, but more will be added soon. What is the missing parameter that is shown as the highlighted question mark in the graphic?",
    exhibit: {
      src: "/images/modules-1-4/q74-exhibit.png",
      alt: "Exhibit for question 74: encapsulation dot1q command with a missing VLAN parameter",
      width: 397,
      height: 372,
    },
    options: [
      "It identifies the subinterface.",
      "It identifies the VLAN number.",
      "It identifies the native VLAN number.",
      "It identifies the type of encapsulation that is used.",
      "It identifies the number of hosts that are allowed on the interface.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 4.2.4\nThe completed command would be encapsulation dot1q 7. The encapsulation dot1q part of the command enables trunking and identifies the type of trunking to use. The 7 identifies the VLAN number.",
  },
  {
    number: 75,
    type: "single",
    text: "Which type of VLAN is used to designate which traffic is untagged when crossing a trunk port?",
    options: ["data", "default", "native", "management"],
    correct: [2],
    explanation:
      "Explanation: Topic 3.2.5\nA native VLAN is the VLAN that does not receive a VLAN tag in the IEEE 802.1Q frame header. Cisco best practices recommend the use of an unused VLAN (not a data VLAN, the default VLAN of VLAN 1, or the management VLAN) as the native VLAN whenever possible.",
  },
  {
    number: 76,
    type: "single",
    text: "A network administrator issues the show vlan brief command while troubleshooting a user support ticket. What output will be displayed?",
    options: [
      "the VLAN assignment and membership for device MAC addresses",
      "the VLAN assignment and membership for all switch ports",
      "the VLAN assignment and trunking encapsulation",
      "the VLAN assignment and native VLAN",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 3.3.8\nThe show vlan brief command will provide information displaying the VLAN assignment and membership for all switch ports on a switch.",
  },
  {
    number: 77,
    type: "single",
    text: "Open the PT Activity. Perform the tasks in the activity instructions and then answer the question.\nWhich message is displayed when 10.10.10.1 is entered into the PC1 Web Browser address bar?",
    exhibit: {
      src: "/images/modules-1-4/q77-exhibit.jpg",
      alt: "Exhibit for question 77: Packet Tracer activity screenshot",
      width: 692,
      height: 474,
    },
    options: ["Local Server", "Test Server", "File Server", "Cisco Server"],
    correct: [2],
    explanation:
      "Explanation: Topic 4.2.2\nExamining the configuration of switch SW1 shows that interface Gi0/1 is not configured as a trunk. After the interface is configured with the switchport mode trunk command, PC1 can communicate with Server1, and browsing to 10.10.10.1 displays the File Server page.",
  },
  {
    number: 78,
    type: "pair",
    text: "Match each DHCP message type with its description. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-1-4/q78-exhibit.jpg",
      alt: "Exhibit for question 78: DHCP message type matching board",
      width: 754,
      height: 557,
    },
    left: [
      "a client initiating a message to find a DHCP server",
      "a DHCP server responding to the initial request by a client",
      "the client accepting the IP address provided by the DHCP server",
      "the DHCP server confirming that the address lease has been accepted",
    ],
    right: ["DHCPACK", "DHCPREQUEST", "DHCPDISCOVER", "DHCPOFFER", "DHCPNACK"],
    correctPairs: { 0: 2, 1: 3, 2: 1, 3: 0 },
    explanation:
      "Explanation: Topic 7.1.2\nThe DHCP message types match their descriptions as follows:\n- a client initiating a message to find a DHCP server → DHCPDISCOVER\n- a DHCP server responding to the initial request by a client → DHCPOFFER\n- the client accepting the IP address provided by the DHCP server → DHCPREQUEST\n- the DHCP server confirming that the address lease has been accepted → DHCPACK\nDHCPNACK is not used.",
  },
  {
    number: 79,
    type: "single",
    text: "What type of VLAN is configured specifically for network traffic such as SSH, Telnet, HTTPS, HHTP, and SNMP?",
    options: ["voice VLAN", "management VLAN", "native VLAN", "security VLAN"],
    correct: [1],
    explanation:
      "Explanation: Topic 3.1.3\nA management VLAN is configured specifically to carry network management traffic such as SSH, Telnet, HTTPS, HTTP, and SNMP. Isolating management traffic in its own VLAN keeps it separate from user data traffic.",
  },
];
