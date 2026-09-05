import type { Question } from "../../lib/types";

/** Modules 8 - 10 (Communicating Between Networks), questions 41-76. */
export const questions41to76: Question[] = [
  {
    number: 41,
    type: "pair",
    text: "Match the configuration mode with the command that is available in that mode. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-8-10/q41-exhibit.jpg",
      alt: "Exhibit for question 41: configuration modes and available commands",
      width: 1082,
      height: 356,
      revealOnly: true,
    },
    left: ["R1>", "R1#", "R1(config-line)#", "R1(config)#"],
    right: [
      "enable",
      "copy running-config startup-config",
      "login",
      "interface fastethernet 0/0",
    ],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3 },
    explanation:
      "Explanation: Topic 10.2.1\nThe enable command is entered at the R1> prompt. The login command is entered at the R1(config-line)# prompt. The copy running-config startup-config command is entered at the R1# prompt. The interface fastethernet 0/0 command is entered at the R1(config)# prompt.",
  },
  {
    number: 42,
    type: "multi",
    text: "Which three commands are used to set up secure access to a router through a connection to the console interface? (Choose three.)",
    choose: 3,
    options: [
      "interface fastethernet 0/0",
      "line vty 0 4",
      "line console 0",
      "enable secret cisco",
      "login",
      "password cisco",
    ],
    correct: [2, 4, 5],
    explanation:
      "Explanation: Topic 10.1.1\nThe three commands needed to password protect the console port are as follows:\n- line console 0\n- password cisco\n- login\nThe interface fastethernet 0/0 command is commonly used to access the configuration mode used to apply specific parameters such as the IP address to the Fa0/0 port. The line vty 0 4 command is used to access the configuration mode for Telnet. The 0 and 4 parameters specify ports 0 through 4, or a maximum of five simultaneous Telnet connections. The enable secret command is used to apply a password used on the router to access the privileged mode.",
  },
  {
    number: 43,
    type: "single",
    text: "Refer to the exhibit. Consider the IP address configuration shown from PC1. What is a description of the default gateway address?",
    exhibit: {
      src: "/images/modules-8-10/q43-exhibit.png",
      alt: "Exhibit for question 43: IP address configuration on PC1",
      width: 520,
      height: 346,
    },
    options: [
      "It is the IP address of the Router1 interface that connects the company to the Internet.",
      "It is the IP address of the Router1 interface that connects the PC1 LAN to Router1.",
      "It is the IP address of Switch1 that connects PC1 to other devices on the same LAN.",
      "It is the IP address of the ISP network device located in the cloud.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 10.3.1\nThe default gateway is used to route packets destined for remote networks. The default gateway IP address is the address of the first Layer 3 device (the router interface) that connects to the same network.",
  },
  {
    number: 44,
    type: "multi",
    text: "Which two functions are primary functions of a router? (Choose two.)",
    choose: 2,
    options: [
      "packet forwarding",
      "microsegmentation",
      "domain name resolution",
      "path selection",
      "flow control",
    ],
    correct: [0, 3],
    explanation:
      "Explanation: Topic 8.1.1\nA router accepts a packet and accesses its routing table to determine the appropriate exit interface based on the destination address. The router then forwards the packet out of that interface.",
  },
  {
    number: 45,
    type: "single",
    text: "What is the effect of using the Router# copy running-config startup-config command on a router?",
    options: [
      "The contents of ROM will change.",
      "The contents of RAM will change.",
      "The contents of NVRAM will change.",
      "The contents of flash will change.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 10.1.1\nThe command copy running-config startup-config copies the running-configuration file from RAM into NVRAM and saves it as the startup-configuration file. Since NVRAM is non-volatile memory, it will be able to retain the configuration details when the router is powered off.",
  },
  {
    number: 46,
    type: "single",
    text: "What will happen if the default gateway address is incorrectly configured on a host?",
    options: [
      "The host cannot communicate with other hosts in the local network.",
      "The switch will not forward packets initiated by the host.",
      "The host will have to use ARP to determine the correct address of the default gateway.",
      "The host cannot communicate with hosts in other networks.",
      "A ping from the host to 127.0.0.1 would not be successful.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 10.3.1\nWhen a host needs to send a message to another host located on the same network, it can forward the message directly. However, when a host needs to send a message to a remote network, it must use the router, also known as the default gateway. This is because the data link frame address of the remote destination host cannot be used directly. Instead, the IP packet has to be sent to the router (default gateway) and the router will forward the packet toward its destination. Therefore, if the default gateway is incorrectly configured, the host can communicate with other hosts on the same network, but not with hosts on remote networks.",
  },
  {
    number: 47,
    type: "multi",
    text: "What are two potential network problems that can result from ARP operation? (Choose two.)",
    choose: 2,
    options: [
      "Manually configuring static ARP associations could facilitate ARP poisoning or MAC address spoofing.",
      "On large networks with low bandwidth, multiple ARP broadcasts could cause data communication delays.",
      "Network attackers could manipulate MAC address and IP address mappings in ARP messages with the intent of intercepting network traffic.",
      "Large numbers of ARP request broadcasts could cause the host MAC address table to overflow and prevent the host from communicating on the network.",
      "Multiple ARP replies result in the switch MAC address table containing entries that match the MAC addresses of hosts that are connected to the relevant switch port.",
    ],
    correct: [1, 2],
    explanation:
      "Explanation: Topic 9.2.8\nLarge numbers of ARP broadcast messages could cause momentary data communications delays. Network attackers could manipulate MAC address and IP address mappings in ARP messages with the intent to intercept network traffic. ARP requests and replies cause entries to be made into the ARP table, not the MAC address table. ARP table overflows are very unlikely. Manually configuring static ARP associations is a way to prevent, not facilitate, ARP poisoning and MAC address spoofing. Multiple ARP replies resulting in the switch MAC address table containing entries that match the MAC addresses of connected nodes and are associated with the relevant switch port are required for normal switch frame forwarding operations. It is not an ARP caused network problem.",
  },
  {
    number: 48,
    type: "single",
    text: "Open the PT activity. Perform the tasks in the activity instructions and then answer the question.",
    exhibit: {
      src: "/images/modules-8-10/q48-exhibit.jpg",
      alt: "CCNA 1 v7 Modules 8 - 10 Communicating Between Networks Exam (Packet Tracer activity)",
      width: 672,
      height: 406,
    },
    options: [
      "R1: G0/0 and S0/0/0\nR2: G0/0 and S0/0/0",
      "R1: G0/1 and S0/0/1\nR2: G0/0 and S0/0/1",
      "R1: G0/0 and S0/0/0\nR2: G0/1 and S0/0/0",
      "R1: G0/0 and S0/0/1\nR2: G0/1 and S0/0/1",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 10.2.4\nThe command to use for this activity is show ip interface brief in each router. The active and operational interfaces are represented by the value up in the Status and Protocol columns. The interfaces in R1 with these characteristics are G0/0 and S0/0/0. In R2 they are G0/1 and S0/0/0.",
  },
  {
    number: 49,
    type: "single",
    text: "Which term describes a field in the IPv4 packet header used to identify the next level protocol?",
    options: [
      "protocol",
      "destination IPv4 address",
      "source IPv4 address",
      "TTL",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nThe protocol field in the IPv4 packet header is an 8-bit field used to identify the specific upper-layer protocol (Transport layer or next level) carried inside the packet's payload. Once the destination host receives the Layer 3 packet and completes its processing, it inspects this field to determine which particular protocol handler or service should receive the de-encapsulated data. Common predefined decimal values used in this field include 6 for TCP, 17 for UDP, and 1 for ICMP, which enables seamless multiplexing between the Network and Transport layers.",
  },
  {
    number: 50,
    type: "single",
    text: "Which term describes a field in the IPv4 packet header that contains an 8-bit binary value used to determine the priority of each packet?",
    options: [
      "differentiated services",
      "destination IPv4 address",
      "source IPv4 address",
      "protocol",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nThe Differentiated Services (DS) field is an 8-bit field in the IPv4 header used to determine the priority, or class of service, of each packet. Routers and switches read this value to apply quality-of-service (QoS) treatment such as giving voice or video traffic higher priority. The DS field replaced the older Type of Service (ToS) field.",
  },
  {
    number: 51,
    type: "single",
    text: "Which term describes a field in the IPv4 packet header that contains a 32-bit binary value associated with an interface on the sending device?",
    options: [
      "source IPv4 address",
      "destination IPv4 address",
      "protocol",
      "TTL",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nThe source IPv4 address is a 32-bit field within the IPv4 packet header that identifies the logical address of the interface on the sending device. When a host transmits data across a network, it inserts its own IP address into this field. This allows the destination device to identify the origin of the packet, ensuring it knows exactly where to send any subsequent return traffic, acknowledgments, or error messages.",
  },
  {
    number: 52,
    type: "single",
    text: "Which term describes a field in the IPv4 packet header used to detect corruption in the IPv4 header?",
    options: ["header checksum", "source IPv4 address", "protocol", "TTL"],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nThe header checksum field is a 16-bit field in the IPv4 header used to verify the integrity of the header data. During transmission, the sending device calculates a checksum value based on the fields within the IP header. When the packet arrives at its destination, the receiving device performs the same calculation. If the calculated value does not match the received value, the packet is considered corrupted and is discarded immediately by the receiving node.",
  },
  {
    number: 53,
    type: "single",
    code: `RTR1(config)# interface gi0/1
RTR1(config-if)# description Connects to the Marketing LAN
RTR1(config-if)# ip address 10.27.15.17 255.255.255.0
RTR1(config-if)# no shutdown
RTR1(config-if)# interface gi0/0
RTR1(config-if)# description Connects to the Payroll LAN
RTR1(config-if)# ip address 10.27.14.148 255.255.255.0
RTR1(config-if)# no shutdown
RTR1(config-if)# interface s0/0/0
RTR1(config-if)# description Connects to the ISP
RTR1(config-if)# ip address 10.14.15.254 255.255.255.0
RTR1(config-if)# no shutdown
RTR1(config-if)# interface s0/0/1
RTR1(config-if)# description Connects to the Head Office WAN
RTR1(config-if)# ip address 203.0.113.39 255.255.255.0
RTR1(config-if)# no shutdown
RTR1(config-if)# end`,
    text: "Refer to the exhibit. A network administrator is connecting a new host to the Payroll LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    options: [
      "10.27.14.148",
      "10.27.14.1",
      "10.14.15.254",
      "203.0.113.39",
      "10.27.15.17",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 10.3.1\nA host's default gateway must always correspond to the IP address of the local router interface that is directly attached to its specific network segment. By examining the configuration output in the exhibit, it is evident that interface gi0/0 is configured with the description Connects to the Payroll LAN. The unique IP address assigned to this interface is 10.27.14.148. Consequently, any new host deployed on the Payroll LAN must use this exact IP address as its default gateway to successfully communicate with destinations on remote networks.",
  },
  {
    number: 54,
    type: "single",
    text: "Which term describes a field in the IPv4 packet header that contains a unicast, multicast, or broadcast address?",
    options: [
      "destination IPv4 address",
      "protocol",
      "TTL",
      "header checksum",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nThe destination IPv4 address is a 32-bit field in the IP header that specifies the logical address of the end device to which the packet is being sent. This field can hold a unicast address (for a specific single host), a multicast address (for a specific group of hosts), or a broadcast address (for all hosts on the local network segment). Routers inspect this address to perform route lookups in their routing tables, ensuring the packet is forwarded out of the appropriate interface toward the intended destination.",
  },
  {
    number: 55,
    type: "single",
    text: "Which term describes a field in the IPv4 packet header used to limit the lifetime of a packet?",
    options: ["TTL", "source IPv4 address", "protocol", "header checksum"],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nThe TTL (Time-to-Live) field is an 8-bit value in the IPv4 header used to prevent a packet from circulating endlessly in a network (for instance, due to a routing loop). The originating host sets an initial value; every time a router processes the packet, it decrements this value by one. If the TTL reaches zero before reaching its destination, the router discards the packet and sends an ICMP Time Exceeded message back to the source.",
  },
  {
    number: 56,
    type: "single",
    text: "Which term describes a field in the IPv4 packet header that contains a 4-bit binary value set to 0100?",
    options: ["version", "source IPv4 address", "protocol", "TTL"],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nThe version field in the IPv4 packet header is a 4-bit field that identifies which internet protocol version is being used to format the Layer 3 data. The binary value 0100 directly translates to the decimal number 4, which explicitly instructs routers and receiving network devices to process the incoming packet according to IPv4 structural standards and specifications. Conversely, a binary value of 0110 (decimal 6) in this exact field would signify an IPv6 packet architecture.",
  },
  {
    number: 57,
    type: "single",
    text: "Which term describes a field in the IPv4 packet header used to identify the next level protocol?",
    options: ["protocol", "version", "differentiated services", "header checksum"],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nThe protocol field in the IPv4 packet header is an 8-bit field used to identify the specific upper-layer protocol (Transport layer or next level) carried inside the packet's payload. Once the destination host receives the Layer 3 packet and completes its processing, it inspects this field to determine which particular protocol handler or service should receive the de-encapsulated data. Common predefined decimal values used in this field include 6 for TCP, 17 for UDP, and 1 for ICMP, which enables seamless multiplexing between the Network and Transport layers.",
  },
  {
    number: 58,
    type: "single",
    text: "Which term describes a field in the IPv4 packet header that contains a 4-bit binary value set to 0100?",
    options: ["version", "differentiated services", "header checksum", "TTL"],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nThe version field in the IPv4 packet header is a 4-bit field that identifies which internet protocol version is being used to format the Layer 3 data. The binary value 0100 directly translates to the decimal number 4, which explicitly instructs routers and receiving network devices to process the incoming packet according to IPv4 structural standards and specifications. Conversely, a binary value of 0110 (decimal 6) in this exact field would signify an IPv6 packet architecture.",
  },
  {
    number: 59,
    type: "single",
    text: "What property of ARP causes cached IP-to-MAC mappings to remain in memory longer?",
    options: [
      "Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      "A static IP-to-MAC address entry can be entered manually into an ARP table.",
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "The port-to-MAC address table on a switch has the same entries as the ARP table on the switch.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.4\nEntries in an ARP table are time-stamped and are purged when their aging timeout expires. Every time a mapping is used, its timestamp is refreshed, so mappings for hosts that are communicated with frequently remain in the cache longer, while stale entries for inactive hosts are removed to free memory and keep the table accurate.",
  },
  {
    number: 60,
    type: "single",
    text: "What property of ARP allows MAC addresses of frequently used servers to be fixed in the ARP table?",
    options: [
      "A static IP-to-MAC address entry can be entered manually into an ARP table.",
      "Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "The port-to-MAC address table on a switch has the same entries as the ARP table on the switch.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.4\nA static IP-to-MAC address entry can be entered manually into the ARP table. Unlike dynamic entries, a static entry is not subject to the aging timeout, so the mapping for a frequently used server remains fixed in the table until it is manually removed or the device is rebooted.",
  },
  {
    number: 61,
    type: "single",
    text: "What property of ARP allows MAC addresses of frequently used servers to be fixed in the ARP table?",
    options: [
      "A static IP-to-MAC address entry can be entered manually into an ARP table.",
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "The source MAC address appears in the header of the Ethernet frame.",
      "The port-to-MAC address table on a switch has the same entries as the ARP table on the switch.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.4\nBy default, ARP table entries are dynamic and include an aging timer, which purges them automatically to ensure that the mapping information remains current. However, for critical devices like frequently used servers, a network administrator can configure a static entry. Because these are manually defined, they are not subject to aging timers and remain fixed in the device's memory until they are explicitly deleted or the device is rebooted, which ensures immediate and reliable address resolution without the overhead of ARP requests.",
  },
  {
    number: 62,
    type: "single",
    text: "What property of ARP allows hosts on a LAN to send traffic to remote networks?",
    options: [
      "Local hosts learn the MAC address of the default gateway.",
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "The source MAC address appears in the header of the Ethernet frame.",
      "The port-to-MAC address table on a switch has the same entries as the ARP table on the switch.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.4\nWhen a local host wants to send data to a device on a remote network, the Layer 3 IP packet contains the ultimate destination IP address. However, to deliver the frame over the local network medium at Layer 2, the host must encapsulate and address the frame to its default gateway (the local router). Since the host initially only knows the default gateway's IPv4 address, it relies on ARP to dynamically discover its corresponding hardware MAC address. Once this MAC address is learned, the local host can successfully forward the traffic to the router for further internetwork routing.",
  },
  {
    number: 63,
    type: "single",
    code: `Floor(config)# interface gi0/1
Floor(config-if)# description Connects to the Registrar LAN
Floor(config-if)# ip address 192.168.235.234 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface gi0/0
Floor(config-if)# description Connects to the Manager LAN
Floor(config-if)# ip address 192.168.234.114 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/0
Floor(config-if)# description Connects to the ISP
Floor(config-if)# ip address 10.234.235.254 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/1
Floor(config-if)# description Connects to the Head Office WAN
Floor(config-if)# ip address 203.0.113.3 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# end`,
    text: "Refer to the exhibit. A network administrator is connecting a new host to the Registrar LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    options: [
      "192.168.235.234",
      "192.168.235.1",
      "10.234.235.254",
      "203.0.113.3",
      "192.168.234.114",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 10.3.1\nA host's default gateway must correspond to the IP address of the local router interface that is directly attached to its specific network segment. Based on the configuration snippet provided, the gi0/1 interface is configured with the description Connects to the Registrar LAN and has been assigned the IP address 192.168.235.234. Consequently, any host connected to the Registrar LAN must use this specific IP address as its default gateway to successfully route traffic to remote networks.",
  },
  {
    number: 64,
    type: "single",
    text: "What property of ARP forces all Ethernet NICs to process an ARP request?",
    options: [
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "The source MAC address appears in the header of the Ethernet frame.",
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "ARP replies are broadcast on the network when a host receives an ARP request.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.3\nThe ARP protocol relies on Layer 2 broadcast frames to discover the MAC address of a target device when only its IP address is known. To ensure that an ARP request reaches every device within a local network segment, the frame must use the broadcast address FF:FF:FF:FF:FF:FF as the destination MAC address. By standard hardware design, every Ethernet network interface card (NIC) is mandated to accept and pass the data portion of any frame addressed to this specific broadcast address up to the ARP process for examination.",
  },
  {
    number: 65,
    type: "single",
    text: "What property of ARP causes a reply only to the source sending an ARP request?",
    options: [
      "The source MAC address appears in the header of the Ethernet frame.",
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "ARP replies are broadcast on the network when a host receives an ARP request.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.3\nWhen a host sends an ARP request, it is broadcast to all devices on the local network. To ensure the destination host knows where to send the reply, the Ethernet frame header containing the ARP request includes the source MAC address of the requesting host. Upon receiving and processing the request, the target host uses this specific source MAC address to send an ARP reply directly (unicast) to the original requester, rather than broadcasting the reply to the entire network.",
  },
  {
    number: 66,
    type: "single",
    text: "What property of ARP causes the request to be flooded out all ports of a switch except for the port receiving the ARP request?",
    options: [
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      "ARP replies are broadcast on the network when a host receives an ARP request.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.3\nWhen a host needs to discover the MAC address of another device, it sends an ARP request. Since it does not know the physical address of the destination, it sends it as a Layer 2 broadcast frame. The destination MAC address used for this purpose is FF-FF-FF-FF-FF-FF. By design, switches flood any frame addressed to this broadcast address out of all active ports, except the port where the frame was received, ensuring that every device on the local network segment receives the ARP request.",
  },
  {
    number: 67,
    type: "single",
    text: "What property of ARP causes the NICs receiving an ARP request to pass the data portion of the Ethernet frame to the ARP process?",
    options: [
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      "ARP replies are broadcast on the network when a host receives an ARP request.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.3\nThe Ethernet II frame header contains a 2-byte field known as the Type field (or EtherType). This field is responsible for specifying which upper-layer protocol or local subsystem should receive the payload enclosed within the frame. Every network protocol has a distinct hexadecimal identifier; for the Address Resolution Protocol (ARP), this specific code is 0x0806. When a receiving network interface card (NIC) decapsulates an incoming frame and reads 0x0806 in the Type field, it instantly recognizes that the contents belong to an ARP message. As a result, the NIC bypasses the standard network stacks like IPv4 (0x0800) or IPv6 (0x86DD) and hands the data portion directly to the operating system's internal ARP process.",
  },
  {
    number: 68,
    type: "single",
    text: "What property of ARP causes the NICs receiving an ARP request to pass the data portion of the Ethernet frame to the ARP process?",
    options: [
      "The type field 0x806 appears in the header of the Ethernet frame.",
      "The destination MAC address FF-FF-FF-FF-FF-FF appears in the header of the Ethernet frame.",
      "Entries in an ARP table are time-stamped and are purged after the timeout expires.",
      "The port-to-MAC address table on a switch has the same entries as the ARP table on the switch.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.3\nThe Ethernet II frame header contains a 2-byte field known as the Type field (or EtherType). This field is responsible for specifying which upper-layer protocol or local subsystem should receive the payload enclosed within the frame. Every network protocol has a distinct hexadecimal identifier; for the Address Resolution Protocol (ARP), this specific code is 0x0806. When a receiving network interface card (NIC) decapsulates an incoming frame and reads 0x0806 in the Type field, it instantly recognizes that the contents belong to an ARP message. As a result, the NIC bypasses the standard network stacks like IPv4 (0x0800) or IPv6 (0x86DD) and hands the data portion directly to the operating system's internal ARP process.",
  },
  {
    number: 69,
    type: "single",
    code: `Main(config)# interface gi0/1
Main(config-if)# description Connects to the Service LAN
Main(config-if)# ip address 172.29.157.156 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface gi0/0
Main(config-if)# description Connects to the Engineering LAN
Main(config-if)# ip address 172.29.156.36 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface s0/0/0
Main(config-if)# description Connects to the ISP
Main(config-if)# ip address 10.156.157.254 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface s0/0/1
Main(config-if)# description Connects to the Head Office WAN
Main(config-if)# ip address 198.51.100.177 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# end`,
    text: "Refer to the exhibit. A network administrator is connecting a new host to the Service LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    options: [
      "172.29.157.156",
      "172.29.157.1",
      "10.156.157.254",
      "198.51.100.177",
      "172.29.156.36",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 10.3.1\nA host's default gateway must be the IP address of the router interface on the same LAN as the host. Interface gi0/1 of the Main router connects to the Service LAN and is assigned 172.29.157.156, so any new host on the Service LAN must use that address as its default gateway to reach remote networks.",
  },
  {
    number: 70,
    type: "single",
    code: `BldgA(config)# interface gi0/1
BldgA(config-if)# description Connects to the Medical LAN
BldgA(config-if)# ip address 192.168.191.189 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface gi0/0
BldgA(config-if)# description Connects to the Client LAN
BldgA(config-if)# ip address 192.168.190.70 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface s0/0/0
BldgA(config-if)# description Connects to the ISP
BldgA(config-if)# ip address 10.190.191.254 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface s0/0/1
BldgA(config-if)# description Connects to the Head Office WAN
BldgA(config-if)# ip address 198.51.100.213 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# end`,
    text: "Refer to the exhibit. A network administrator is connecting a new host to the Medical LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    options: [
      "192.168.191.189",
      "192.168.191.1",
      "10.190.191.254",
      "198.51.100.213",
      "192.168.190.70",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 10.3.1\nBy examining the configuration of the BldgA router, we can see that interface gi0/1 is configured with the description Connects to the Medical LAN. The IP address assigned to this interface is 192.168.191.189. Consequently, any device connected to the Medical LAN must be configured with this IP address as its default gateway, allowing the router to properly route its traffic toward remote networks.",
  },
  {
    number: 71,
    type: "single",
    code: `Floor(config)# interface gi0/1
Floor(config-if)# description Connects to the Registrar LAN
Floor(config-if)# ip address 192.168.225.223 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface gi0/0
Floor(config-if)# description Connects to the Manager LAN
Floor(config-if)# ip address 192.168.224.103 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/0
Floor(config-if)# description Connects to the ISP
Floor(config-if)# ip address 10.224.225.254 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/1
Floor(config-if)# description Connects to the Head Office WAN
Floor(config-if)# ip address 203.0.113.246 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# end`,
    text: "Refer to the exhibit. A network administrator is connecting a new host to the Registrar LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    options: [
      "192.168.225.223",
      "192.168.225.1",
      "10.224.225.254",
      "203.0.113.246",
      "192.168.224.103",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 10.3.1\nA host's default gateway must always be the IP address of the local router interface that is directly attached to its specific network segment. By examining the configuration output provided, it is evident that interface gi0/1 is configured with the description Connects to the Registrar LAN. The IP address assigned to this specific interface is 192.168.225.223. Consequently, any new host deployed on the Registrar LAN must be configured with this exact IP address as its default gateway to successfully route traffic to remote networks.",
  },
  {
    number: 72,
    type: "single",
    code: `Floor(config)# interface gi0/1
Floor(config-if)# description Connects to the Registrar LAN
Floor(config-if)# ip address 10.118.63.65 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface gi0/0
Floor(config-if)# description Connects to the Manager LAN
Floor(config-if)# ip address 10.118.62.196 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/0
Floor(config-if)# description Connects to the ISP
Floor(config-if)# ip address 10.62.63.254 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# interface s0/0/1
Floor(config-if)# description Connects to the Head Office WAN
Floor(config-if)# ip address 209.165.200.87 255.255.255.0
Floor(config-if)# no shutdown
Floor(config-if)# end`,
    text: "Refer to the exhibit. A network administrator is connecting a new host to the Manager LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    options: [
      "10.118.62.196",
      "10.118.62.1",
      "10.62.63.254",
      "209.165.200.87",
      "10.118.63.65",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 10.3.1\nA host's default gateway must be the IP address of the local router interface that is directly attached to its specific network segment. Based on the provided configuration for the Manager LAN (interface gi0/0), the administrator has assigned the IP address 10.118.62.196. Consequently, any new device connected to this network segment must be configured with this exact IP address as its default gateway to successfully route traffic to remote networks.",
  },
  {
    number: 73,
    type: "single",
    code: `HQ(config)# interface gi0/1
HQ(config-if)# description Connects to the Branch LAN
HQ(config-if)# ip address 172.19.99.99 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface gi0/0
HQ(config-if)# description Connects to the Store LAN
HQ(config-if)# ip address 172.19.98.230 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface s0/0/0
HQ(config-if)# description Connects to the ISP
HQ(config-if)# ip address 10.98.99.254 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface s0/0/1
HQ(config-if)# description Connects to the Head Office WAN
HQ(config-if)# ip address 209.165.200.120 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# end`,
    text: "Refer to the exhibit. A network administrator is connecting a new host to the Store LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    options: [
      "172.19.98.230",
      "172.19.98.1",
      "10.98.99.254",
      "209.165.200.120",
      "172.19.99.99",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 10.3.1\nA host's default gateway must be the IP address of the local router interface that is attached to its specific network segment. By examining the configuration output provided in the exhibit, we can see that the administrator configured interface gi0/0 with a description explicitly stating it connects to the Store LAN (description Connects to the Store LAN). The IP address assigned to this particular interface is 172.19.98.230. Therefore, any new host connecting to the Store LAN must use this exact IP address as its default gateway in order to successfully route traffic to remote or external networks.",
  },
  {
    number: 74,
    type: "single",
    code: `HQ(config)# interface gi0/1
HQ(config-if)# description Connects to the Branch LAN
HQ(config-if)# ip address 172.20.133.132 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface gi0/0
HQ(config-if)# description Connects to the Store LAN
HQ(config-if)# ip address 172.20.132.13 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface s0/0/0
HQ(config-if)# description Connects to the ISP
HQ(config-if)# ip address 10.132.133.254 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# interface s0/0/1
HQ(config-if)# description Connects to the Head Office WAN
HQ(config-if)# ip address 198.51.100.156 255.255.255.0
HQ(config-if)# no shutdown
HQ(config-if)# end`,
    text: "Refer to the exhibit. A network administrator is connecting a new host to the Store LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    options: [
      "172.20.132.13",
      "172.20.132.1",
      "10.132.133.254",
      "198.51.100.156",
      "172.20.133.132",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 10.3.1\nA host's default gateway must be the IP address of the router interface that is directly attached to the host's LAN. Interface gi0/0 of the HQ router connects to the Store LAN and is configured with 172.20.132.13, so new hosts on the Store LAN must use that address as their default gateway to reach remote networks.",
  },
  {
    number: 75,
    type: "single",
    code: `Main(config)# interface gi0/1
Main(config-if)# description Connects to the Service LAN
Main(config-if)# ip address 192.168.167.166 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface gi0/0
Main(config-if)# description Connects to the Engineering LAN
Main(config-if)# ip address 192.168.166.46 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface s0/0/0
Main(config-if)# description Connects to the ISP
Main(config-if)# ip address 10.166.167.254 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# interface s0/0/1
Main(config-if)# description Connects to the Head Office WAN
Main(config-if)# ip address 198.51.100.189 255.255.255.0
Main(config-if)# no shutdown
Main(config-if)# end`,
    text: "Refer to the exhibit. A network administrator is connecting a new host to the Service LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    options: [
      "192.168.167.166",
      "192.168.167.1",
      "10.166.167.254",
      "198.51.100.189",
      "192.168.166.46",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 10.3.1\nA default gateway is the local router interface IP address responsible for handling traffic from a specific subnet to forward it toward remote networks. By examining the configuration of the Main router in the exhibit, we can see that interface gi0/1 is assigned the description Connects to the Service LAN. The IP address configured on this specific interface is 192.168.167.166. Consequently, any new host connecting to this Service LAN must be configured with this IP address as its default gateway to successfully communicate beyond its local segment.",
  },
  {
    number: 76,
    type: "single",
    code: `BldgA(config)# interface gi0/1
BldgA(config-if)# description Connects to the Medical LAN
BldgA(config-if)# ip address 192.168.201.200 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface gi0/0
BldgA(config-if)# description Connects to the Client LAN
BldgA(config-if)# ip address 192.168.200.80 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface s0/0/0
BldgA(config-if)# description Connects to the ISP
BldgA(config-if)# ip address 10.200.201.254 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# interface s0/0/1
BldgA(config-if)# description Connects to the Head Office WAN
BldgA(config-if)# ip address 203.0.113.222 255.255.255.0
BldgA(config-if)# no shutdown
BldgA(config-if)# end`,
    text: "Refer to the exhibit. A network administrator is connecting a new host to the Medical LAN. The host needs to communicate with remote networks. What IP address would be configured as the default gateway on the new host?",
    options: [
      "192.168.201.200",
      "192.168.201.1",
      "10.200.201.254",
      "203.0.113.222",
      "192.168.200.80",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 10.3.1\nA host's default gateway must always be the specific IP address assigned to the local router interface that is directly connected to the host's network segment. In this configuration scenario, the interface on the local router (labeled as BldgA) that services the Medical LAN is configured with the IP address 192.168.201.200. Consequently, any new device deployed within the Medical LAN domain must be explicitly configured with this exact IP address as its default gateway to successfully route traffic outside of the local area network.",
  },
];
