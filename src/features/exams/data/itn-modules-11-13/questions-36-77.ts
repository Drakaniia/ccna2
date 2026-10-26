import type { Question } from "../../lib/types";

/** Modules 11 - 13 (IP Addressing), questions 36-77 (54-59 are missing from the dump and the Packet Tracer question 49 is omitted). */
export const questions36to77: Question[] = [
  {
    number: 36,
    type: "single",
    text: "Which service provides dynamic global IPv6 addressing to end devices without using a server that keeps a record of available IPv6 addresses?",
    options: [
      "stateful DHCPv6",
      "SLAAC",
      "static IPv6 addressing",
      "stateless DHCPv6",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 12.5.2\nUsing stateless address autoconfiguration (SLAAC), a PC can solicit a router and receive the prefix length of the network. From this information the PC can then create its own IPv6 global unicast address.",
  },
  {
    number: 37,
    type: "single",
    text: "Which protocol supports Stateless Address Autoconfiguration (SLAAC) for dynamic assignment of IPv6 addresses to a host?",
    options: ["ARPv6", "DHCPv6", "ICMPv6", "UDP"],
    correct: [2],
    explanation:
      "Explanation: Topic 12.5.1\nSLAAC uses ICMPv6 messages when dynamically assigning an IPv6 address to a host. DHCPv6 is an alternate method of assigning an IPv6 addresses to a host. ARPv6 does not exist. Neighbor Discovery Protocol (NDP) provides the functionality of ARP for IPv6 networks. UDP is the transport layer protocol used by DHCPv6.",
  },
  {
    number: 38,
    type: "pair",
    text: "Three methods allow IPv6 and IPv4 to co-exist. Match each method with its description. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-modules-11-13/q38-exhibit.png",
      alt: "Exhibit for question 38: IPv6 and IPv4 coexistence methods matched to their descriptions",
      width: 1536,
      height: 650,
    },
    left: [
      "The IPv4 packets and IPv6 packets coexist in the same network.",
      "The IPv6 packet is transported inside an IPv4 packet.",
      "IPv6 packets are converted into IPv4 packets, and vice versa.",
    ],
    right: ["DHCP", "translation", "tunneling", "dual-stack"],
    correctPairs: {
      0: 3,
      1: 2,
      2: 1,
    },
    explanation:
      "Explanation: Topic 12.1.2\nThe term for the method that allows for the coexistence of the two types of packets on a single network is dual-stack. Tunneling allows for the IPv6 packet to be transported inside IPv4 packets. An IP packet can also be converted from version 6 to version 4 and vice versa. DHCP is a protocol that is used for allocating network parameters to hosts on an IP network",
  },
  {
    number: 39,
    type: "single",
    text: "A technician uses the ping 127.0.0.1 command. What is the technician testing?",
    options: [
      "the TCP/IP stack on a network host",
      "connectivity between two adjacent Cisco devices",
      "connectivity between a PC and the default gateway",
      "connectivity between two PCs on the same network",
      "physical connectivity of a particular PC and the network",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 13.2.2\nThe 127.0.0.0/8 range is reserved for loopback addresses. Pinging 127.0.0.1 sends the packet to the local TCP/IP stack without putting it on the network media, so a successful reply confirms that the host's IP stack is working.",
  },
  {
    number: 40,
    type: "single",
    text: "Refer to the exhibit. An administrator is trying to troubleshoot connectivity between PC1 and PC2 and uses the tracert command from PC1 to do it. Based on the displayed output, where should the administrator begin troubleshooting?",
    exhibit: {
      src: "/images/itn-modules-11-13/q40-exhibit.png",
      alt: "Exhibit for question 40: tracert output from PC1 to PC2",
      width: 611,
      height: 357,
    },
    options: ["PC2", "R1", "SW2", "R2", "SW1"],
    correct: [1],
    explanation:
      "Explanation: Topic 13.2.5\nTracert is used to trace the path a packet takes. The only successful response was from the first device along the path on the same LAN as the sending host. The first device is the default gateway on router R1. The administrator should therefore start troubleshooting at R1.",
  },
  {
    number: 41,
    type: "single",
    text: "Which protocol is used by the traceroute command to send and receive echo-requests and echo-replies?",
    options: ["SNMP", "ICMP", "Telnet", "TCP"],
    correct: [1],
    explanation:
      "Explanation: Topic 13.2.1\nTraceroute uses the ICMP (Internet Control Message Protocol) to send and receive echo-request and echo-reply messages.",
  },
  {
    number: 42,
    type: "single",
    text: "Which ICMPv6 message is sent when the IPv6 hop limit field of a packet is decremented to zero and the packet cannot be forwarded?",
    options: [
      "network unreachable",
      "time exceeded",
      "protocol unreachable",
      "port unreachable",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 13.2.5\nICMPv6 uses the hop limit field in the IPv6 packet header to determine if the packet has expired. If the hop limit field has reached zero, a router will send a time exceeded message back towards the source indicating that the router cannot forward the packet.",
  },
  {
    number: 43,
    type: "single",
    text: "A user executes a traceroute over IPv6. At what point would a router in the path to the destination device drop the packet?",
    options: [
      "when the value of the Hop Limit field reaches 255",
      "when the value of the Hop Limit field reaches zero",
      "when the router receives an ICMP time exceeded message",
      "when the target host responds with an ICMP echo reply message",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 13.2.5\nWhen a traceroute is performed, the value in the Hop Limit field of an IPv6 packet determines how many router hops the packet can travel. Once the Hop Limit field reaches a value of zero, it can no longer be forwarded and the receiving router will drop the packet.",
  },
  {
    number: 44,
    type: "single",
    text: "What is the purpose of ICMP messages?",
    options: [
      "to inform routers about network topology changes",
      "to ensure the delivery of an IP packet",
      "to provide feedback of IP packet transmissions",
      "to monitor the process of a domain name to IP address resolution",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 13.1.1\nThe purpose of ICMP messages is to provide feedback about issues that are related to the processing of IP packets.",
  },
  {
    number: 45,
    type: "single",
    text: "What source IP address does a router use by default when the traceroute command is issued?",
    options: [
      "the highest configured IP address on the router",
      "a loopback IP address",
      "the IP address of the outbound interface",
      "the lowest configured IP address on the router",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 13.2.5\nWhen sending an echo request message, a router will use the IP address of the exit interface as the source IP address. This default behavior can be changed by using an extended ping and specifying a specific source IP address.",
  },
  {
    number: 46,
    type: "pair",
    text: "Match each description with an appropriate IP address. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-modules-11-13/q46-exhibit.jpg",
      alt: "Exhibit for question 46: descriptions matched to IPv4 addresses",
      width: 1061,
      height: 445,
    },
    left: [
      "a link-local address",
      "a TEST-NET address",
      "an experimental address",
      "a private address",
      "a loopback address",
    ],
    right: [
      "169.254.1.5",
      "192.0.2.123",
      "240.2.6.255",
      "172.19.20.5",
      "127.0.0.1",
    ],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
    },
    explanation:
      "Explanation: Topic 11.3.1\nLink-Local addresses are assigned automatically by the OS environment and are located in the block 169.254.0.0/16. The private addresses ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. TEST-NET addresses belong to the range 192.0.2.0/24. The addresses in the block 240.0.0.0 to 255.255.255.254 are reserved as experimental addresses. Loopback addresses belong to the block 127.0.0.0/8.",
  },
  {
    number: 47,
    type: "single",
    text: "A user issues a ping 192.135.250.103 command and receives a response that includes a code of 1. What does this code represent?",
    options: [
      "host unreachable",
      "protocol unreachable",
      "port unreachable",
      "network unreachable",
    ],
    correct: [0],
    explanation:
      'Explanation: Topic 13.1.3\nWithin ICMPv4 "Destination Unreachable" messages (Type 3), the Code field identifies the precise diagnostic reason for the delivery failure. The standard codes are classified as follows:\nCode 0: Network unreachable (the router lacks a valid path to the destination network).\nCode 1: Host unreachable. This indicates that the packet successfully reached the local gateway or edge router responsible for the destination network segment, but the specific target host failed to respond (e.g., the device is powered off, disconnected, or its MAC address cannot be resolved via ARP).\nCode 2: Protocol unreachable.\nCode 3: Port unreachable.',
  },
  {
    number: 48,
    type: "single",
    text: "Which subnet would include the address 192.168.1.96 as a usable host address?",
    options: [
      "192.168.1.64/26",
      "192.168.1.32/27",
      "192.168.1.32/28",
      "192.168.1.64/29",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 11.5.1\nFor the subnet of 192.168.1.64/26, there are 6 bits for host addresses, yielding 64 possible addresses. However, the first and last subnets are the network and broadcast addresses for this subnet. Therefore, the range of host addresses for this subnet is 192.168.1.65 to 192.168.1.126. The other subnets do not contain the address 192.168.1.96 as a valid host address.",
  },
  {
    number: 50,
    type: "single",
    text: "A host is transmitting a broadcast. Which host or hosts will receive it?",
    options: [
      "all hosts in the same subnet",
      "a specially defined group of hosts",
      "the closest neighbor on the same network",
      "all hosts on the Internet",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 11.2.2\nA broadcast is delivered to every host that has an IP address within the same network.",
  },
  {
    number: 51,
    type: "single",
    text: "A host is transmitting a unicast. Which host or hosts will receive it?",
    options: [
      "one specific host",
      "a specially defined group of hosts",
      "all hosts on the Internet",
      "the closest neighbor on the same network",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 11.2.1\nA unicast transmission is a one-to-one communication method where data is sent from a single source host to one specific destination IP address. Unlike a broadcast (which targets all hosts within the subnet) or a multicast (which targets a specifically defined group), a unicast packet is uniquely destined for one individual device on the network.",
  },
  {
    number: 52,
    type: "single",
    text: "A user issues a ping 2001:db8:FACE:39::10 command and receives a response that includes a code of 3. What does this code represent?",
    options: [
      "address unreachable",
      "network unreachable",
      "host unreachable",
      "protocol unreachable",
    ],
    correct: [0],
    explanation:
      'Explanation: Topic 13.1.3\nWithin ICMPv6, Type 1 error messages indicate that the "Destination is Unreachable". The specific Code field inside this message diagnoses the exact cause of the failure:\nCode 0: No route to destination (the router lacks a path to that network).\nCode 1: Communication with destination administratively prohibited (e.g., blocked by a firewall rule or ACL).\nCode 2: Beyond scope of the source address.\nCode 3: Address unreachable. This implies that the packet successfully reached the local gateway or edge router serving the destination segment, but that router failed to map or resolve the Layer 2 physical address (Neighbor Discovery/NDP failure) required to deliver the packet to the final host.',
  },
  {
    number: 53,
    type: "single",
    text: "A host is transmitting a multicast. Which host or hosts will receive it?",
    options: [
      "a specially defined group of hosts",
      "the closest neighbor on the same network",
      "one specific host",
      "directly connected network devices",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 11.2.3\nA multicast transmission is designed to send data packets from a single source to a specific group of destination hosts that have explicitly joined or subscribed to a multicast group address (such as devices listening to routing protocols or video streams). Unlike a broadcast (which delivers data to every single host on the subnet) or a unicast (which targets one specific device), multicast optimizes network bandwidth by duplicating and delivering traffic only to the interested group members.",
  },
  {
    number: 60,
    type: "single",
    text: "Which is the compressed format of the IPv6 address 2001:0db8:0000:0000:0000:a0b0:0008:0001?",
    options: [
      "2001:db8::a0b0:8:1",
      "2001:db8::ab8:1:0:1000",
      "2001:db80:0:1::80:1",
      "2001:db80:::1::80:1",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.2\nIn 2001:0db8:0000:0000:0000:a0b0:0008:0001, leading zeros are dropped from each hextet and the longest run of all-zero hextets (0000:0000:0000) is replaced by a double colon. The result is 2001:db8::a0b0:8:1.",
  },
  {
    number: 61,
    type: "single",
    text: "Which is the compressed format of the IPv6 address fe80:09ea:0000:2200:0000:0000:0fe0:0290?",
    options: [
      "fe80:9ea:0:2200::fe0:290",
      "fe80:9:20::b000:290",
      "fe80:9ea0::2020:0:bf:e0:9290",
      "fe80:9ea0::2020::bf:e0:9290",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.2\nOmit leading zeros: Remove any starting zeros from each 16-bit segment (hextet). Following this, 09ea becomes 9ea, 0000 becomes 0, 0fe0 simplifies to fe0, and 0290 reduces to 290. (Note: Trailing zeros, such as those in 2200, cannot be dropped).\nCompress with double colons (::): This rule allows you to replace the longest contiguous string of all-zero hextets with a single ::. This specific address features a single 0000 in the third hextet and a consecutive pair of 0000:0000 in the fifth and sixth hextets. You must choose the longest sequence to compress, which substitutes the consecutive pair with ::.\nCombining these rules yields the correct optimized format: fe80:9ea:0:2200::fe0:290.",
  },
  {
    number: 62,
    type: "single",
    text: "Which is the compressed format of the IPv6 address 2002:0042:0010:c400:0000:0000:0000:0909?",
    options: [
      "2002:42:10:c400::909",
      "200:420:110:c4b::910:0:90",
      "2002:4200::25:1090:0:99",
      "2002:42::25:1090:0:99",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.2\nOmit leading zeros: Drop any starting zeros within each 16-bit segment (hextet). Following this step, 0042 simplifies to 42, 0010 becomes 10, and 0909 reduces to 909. Trailing zeros (such as the ones in c400) must be kept exactly as they are.\nCompress with the double colon (::): The contiguous string of three consecutive all-zero segments (0000:0000:0000) is fully replaced by a single :: notation.\nCombining both optimization rules yields the correct compressed format: 2002:42:10:c400::909.",
  },
  {
    number: 63,
    type: "single",
    text: "Which is the compressed format of the IPv6 address 2001:0db8:0000:0000:0ab8:0001:0000:1000?",
    options: [
      "2001:db8::ab8:1:0:1000",
      "2001:db8::a0b0:8:1",
      "2001:db8:1::ab8:0:1",
      "2001:db8:0:1::8:1",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.2\nOmit leading zeros: Drop any starting zeros within each 16-bit segment (hextet). Following this step, 0db8 simplifies to db8, 0ab8 becomes ab8, 0001 reduces to 1, and 0000 segments simplify to a single 0. (Note: Trailing zeros, such as the ones in 1000, cannot be omitted).\nCompress with the double colon (::): Replace the longest continuous string of all-zero hextets with a single :: notation. This address contains two all-zero sequences: a two-block sequence (0000:0000) in the 3rd and 4th segments, and a single block (0000) in the 7th segment. Compressing the longest sequence turns the two consecutive blocks into ::, while the 7th segment remains represented by a single 0.\nCombining both optimization rules yields the correct compressed format: 2001:db8::ab8:1:0:1000.",
  },
  {
    number: 64,
    type: "single",
    text: "Which is the compressed format of the IPv6 address 2002:0420:00c4:1008:0025:0190:0000:0990?",
    options: [
      "2002:420:c4:1008:25:190::990",
      "2002:42:10:c400::909",
      "2002:4200::25:1090:0:99",
      "2002:42::25:1090:0:99",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.2\nTo compress an IPv6 address, two standard rules must be followed:\nOmit leading zeros in any 16-bit section (hextet). Following this rule: 0420 becomes 420, 00c4 becomes c4, 0025 becomes 25, 0190 becomes 190, and 0990 becomes 990. Trailing zeros must not be dropped.\nUse a double colon (::) to replace any single, contiguous string of one or more segments consisting entirely of zeros. In this address, the seventh hextet is 0000, which is compressed into ::.\nCombining these rules, the original address successfully compresses to 2002:420:c4:1008:25:190::990.",
  },
  {
    number: 65,
    type: "single",
    text: "Which is the compressed format of the IPv6 address 2001:0db8:0000:0000:0000:a0b0:0008:0001?",
    options: [
      "2001:db8::a0b0:8:1",
      "2001:db8:1::ab8:0:1",
      "2001:db8::ab8:1:0:1000",
      "2001:db8:0:1::8:1",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.2\nIn 2001:0db8:0000:0000:0000:a0b0:0008:0001, leading zeros are dropped from each hextet and the longest run of all-zero hextets (0000:0000:0000) is replaced by a double colon. The result is 2001:db8::a0b0:8:1.",
  },
  {
    number: 66,
    type: "single",
    text: "Which is the compressed format of the IPv6 address fe80:0000:0000:0000:0220:0b3f:f0e0:0029?",
    options: [
      "fe80::220:b3f:f0e0:29",
      "fe80:9ea:0:2200::fe0:290",
      "fe80:9ea0::2020:0:bf:e0:9290",
      "fe80:9ea0::2020::bf:e0:9290",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.2\nOmit leading zeros: In every hextet, any leading zeros are dropped. Thus, 0220 becomes 220, 0b3f becomes b3f, and 0029 reduces to 29.\nCompress contiguous zeros using the double colon (::): The three consecutive all-zero segments (0000:0000:0000) are replaced with a single :: notation.\nCombining these optimization steps results in the correct compressed address: fe80::220:b3f:f0e0:29.",
  },
  {
    number: 67,
    type: "single",
    text: "Which is the compressed format of the IPv6 address 2001:0db8:0000:0000:0000:a0b0:0008:0001?",
    options: [
      "2001:db8::a0b0:8:1",
      "2001:db8::ab8:1:0:1000",
      "2001:db80:0:1::80:1",
      "2001:db8:0:1::8:1",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.2\nIn 2001:0db8:0000:0000:0000:a0b0:0008:0001, leading zeros are dropped from each hextet and the longest run of all-zero hextets (0000:0000:0000) is replaced by a double colon. The result is 2001:db8::a0b0:8:1.",
  },
  {
    number: 68,
    type: "single",
    text: "Which is the compressed format of the IPv6 address 2002:0042:0010:c400:0000:0000:0000:0909?",
    options: [
      "2002:42:10:c400::909",
      "2002:4200::25:1090:0:99",
      "2002:420:c4:1008:25:190::990",
      "2002:42::25:1090:0:99",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.2\nOmit leading zeros: Drop any starting zeros within each 16-bit segment (hextet). Following this step, 0042 simplifies to 42, 0010 becomes 10, and 0909 reduces to 909. Trailing zeros (such as the ones in c400) must be kept exactly as they are.\nCompress with the double colon (::): The contiguous string of three consecutive all-zero segments (0000:0000:0000) is fully replaced by a single :: notation.\nCombining both optimization rules yields the correct compressed format: 2002:42:10:c400::909.",
  },
  {
    number: 69,
    type: "single",
    text: "Which is the compressed format of the IPv6 address fe80:09ea:0000:2200:0000:0000:0fe0:0290?",
    options: [
      "fe80:9ea:0:2200::fe0:290",
      "fe80:9ea0::2020:0:bf:e0:9290",
      "fe80::220:b3f:f0e0:29",
      "fe80::0220:0b3f:f0e0:0029",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.2\nOmit leading zeros: Remove any starting zeros from each 16-bit segment (hextet). Following this, 09ea becomes 9ea, 0000 becomes 0, 0fe0 simplifies to fe0, and 0290 reduces to 290. (Note: Trailing zeros, such as those in 2200, cannot be dropped).\nCompress with double colons (::): This rule allows you to replace the longest contiguous string of all-zero hextets with a single ::. This specific address features a single 0000 in the third hextet and a consecutive pair of 0000:0000 in the fifth and sixth hextets. You must choose the longest sequence to compress, which substitutes the consecutive pair with ::.\nCombining these rules yields the correct optimized format: fe80:9ea:0:2200::fe0:290.",
  },
  {
    number: 70,
    type: "single",
    text: "A user issues a ping 2001:db8:FACE:39::10 command and receives a response that includes a code of 2. What does this code represent?",
    options: [
      "beyond scope of the source address",
      "communication with the destination administratively prohibited",
      "address unreachable",
      "no route to destination",
    ],
    correct: [0],
    explanation:
      'Explanation: Topic 13.1.3\nIn ICMPv6 "Destination Unreachable" messages (Type 1), the Code field specifies the precise diagnostic reason why the packet could not be delivered. The standard ICMPv6 codes are defined as follows:\nCode 0: No route to destination.\nCode 1: Communication with destination administratively prohibited.\nCode 2: Beyond scope of the source address. This tells the sender that the scope of its source IP address is too constrained (for example, a Link-Local Address) to successfully communicate with the destination IP address (such as a Global Unicast Address).\nCode 3: Address unreachable.',
  },
  {
    number: 71,
    type: "single",
    text: "A user issues a ping 192.135.250.103 command and receives a response that includes a code of 1. What does this code represent?",
    options: [
      "host unreachable",
      "beyond scope of the source address",
      "address unreachable",
      "communication with the destination administratively prohibited",
    ],
    correct: [0],
    explanation:
      'Explanation: Topic 13.1.3\nWithin ICMPv4 "Destination Unreachable" messages (Type 3), the Code field identifies the precise diagnostic reason for the delivery failure. The standard codes are classified as follows:\nCode 0: Network unreachable (the router lacks a valid path to the destination network).\nCode 1: Host unreachable. This indicates that the packet successfully reached the local gateway or edge router responsible for the destination network segment, but the specific target host failed to respond (e.g., the device is powered off, disconnected, or its MAC address cannot be resolved via ARP).\nCode 2: Protocol unreachable.\nCode 3: Port unreachable.',
  },
  {
    number: 72,
    type: "single",
    text: "A user issues a ping fe80:65ab:dcc1::100 command and receives a response that includes a code of 3. What does this code represent?",
    options: [
      "address unreachable",
      "communication with the destination administratively prohibited",
      "beyond scope of the source address",
      "no route to destination",
    ],
    correct: [0],
    explanation:
      'Explanation: Topic 13.1.3\nWithin ICMPv6 "Destination Unreachable" messages (Type 1), the Code field values identify the precise reason for the delivery failure. The standard definitions are classified as follows:\nCode 0: No route to destination.\nCode 1: Communication with destination administratively prohibited.\nCode 2: Beyond scope of the source address.\nCode 3: Address unreachable (the targeted destination IP cannot be resolved or is physically unavailable on the local link).',
  },
  {
    number: 73,
    type: "single",
    text: "A user issues a ping 10.10.14.67 command and receives a response that includes a code of 0. What does this code represent?",
    options: [
      "network unreachable",
      "protocol unreachable",
      "port unreachable",
      "host unreachable",
    ],
    correct: [0],
    explanation:
      'Explanation: Topic 13.1.3\nWithin ICMP "Destination Unreachable" messages (Type 3), Code 0 specifically stands for Network unreachable. This indicates that the router does not possess a valid route in its routing table to reach the destination network.',
  },
  {
    number: 74,
    type: "single",
    text: "A user issues a ping fe80:65ab:dcc1::100 command and receives a response that includes a code of 4. What does this code represent?",
    options: [
      "port unreachable",
      "host unreachable",
      "protocol unreachable",
      "network unreachable",
    ],
    correct: [0],
    explanation:
      'Explanation: Topic 13.1.3\nWhen a device replies with an ICMPv6 "Destination Unreachable" message (Type 1), it includes a specific Code value to explain precisely why the packet could not be delivered. Within the ICMPv6 standard, these codes are classified as follows:\nCode 0: No route to destination (Network unreachable).\nCode 1: Communication with destination administratively prohibited.\nCode 3: Address unreachable (Host unreachable).\nCode 4: Port unreachable.\nConsequently, a code of 4 fundamentally indicates that the packet successfully reached the destination host, but the transport layer protocol (such as UDP) on that host was unable to find an active application or service listening on the targeted port.',
  },
  {
    number: 75,
    type: "single",
    text: "A user issues a ping 198.133.219.8 command and receives a response that includes a code of 0. What does this code represent?",
    options: [
      "network unreachable",
      "protocol unreachable",
      "port unreachable",
      "host unreachable",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 13.1.3\nAn ICMPv4 Destination Unreachable message (Type 3) with code 0 means network unreachable: the router has no route in its routing table for the destination network.",
  },
  {
    number: 76,
    type: "single",
    text: "A user issues a ping 2001:db8:3040:114::88 command and receives a response that includes a code of 4. What does this code represent?",
    options: [
      "port unreachable",
      "host unreachable",
      "protocol unreachable",
      "network unreachable",
    ],
    correct: [0],
    explanation:
      'Explanation: Topic 13.1.3\nMuch like in IPv4 networking, the ICMPv6 protocol relies on distinct code numbers inside its "Destination Unreachable" error messages (Type 1) to provide diagnostic details about delivery failures.\nCode 4 specifically stands for Port unreachable. This means that the IP packet was successfully routed across the network and physically reached the target host. However, once the network layer passed the payload up to the transport layer (TCP or UDP), the receiving operating system could not find any active application or service listening on the specified destination port.',
  },
  {
    number: 77,
    type: "single",
    text: "A user issues a ping 2001:db8:FACE:39::10 command and receives a response that includes a code of 2. What does this code represent?",
    options: [
      "beyond scope of the source address",
      "host unreachable",
      "protocol unreachable",
      "network unreachable",
    ],
    correct: [0],
    explanation:
      'Explanation: Topic 13.1.3\nIn ICMPv6 "Destination Unreachable" messages (Type 1), the Code field specifies the precise diagnostic reason why the packet could not be delivered. The standard ICMPv6 codes are defined as follows:\nCode 0: No route to destination.\nCode 1: Communication with destination administratively prohibited.\nCode 2: Beyond scope of the source address. This tells the sender that the scope of its source IP address is too constrained (for example, a Link-Local Address) to successfully communicate with the destination IP address (such as a Global Unicast Address).\nCode 3: Address unreachable.',
  },
];
