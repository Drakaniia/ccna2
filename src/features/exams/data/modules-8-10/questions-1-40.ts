import type { Question } from "../../lib/types";

/** Modules 8 - 10 (Communicating Between Networks), questions 1-40. */
export const questions1to40: Question[] = [
  {
    number: 1,
    type: "single",
    text: "Which information is used by routers to forward a data packet toward its destination?",
    options: [
      "source IP address",
      "destination IP address",
      "source data-link address",
      "destination data-link address",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 8.5.1\nRouters make forwarding decisions at Layer 3 based on the destination IPv4 address. The router looks up that destination network in its routing table and forwards the packet out the best interface toward the destination host. The source IP address is not used for the forwarding decision, and the source/destination data-link (MAC) addresses are used only to move the frame to the next device on the current link — they are replaced at every hop.",
  },
  {
    number: 2,
    type: "single",
    text: "A computer has to send a packet to a destination host in the same LAN. How will the packet be sent?",
    options: [
      "The packet will be sent to the default gateway first, and then, depending on the response from the gateway, it may be sent to the destination host.",
      "The packet will be sent directly to the destination host.",
      "The packet will first be sent to the default gateway, and then from the default gateway it will be sent directly to the destination host.",
      "The packet will be sent only to the default gateway.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 8.4.1\nWhen the destination host is on the same LAN as the sender, the sending host already has a route to that local network in its own routing table, so it forwards the packet directly to the destination host without any help from the default gateway. A default gateway is only needed when the destination is on a remote network.",
  },
  {
    number: 3,
    type: "single",
    text: "A router receives a packet from the Gigabit 0/0 interface and determines that the packet needs to be forwarded out the Gigabit 0/1 interface. What will the router do next?",
    options: [
      "route the packet out the Gigabit 0/1 interface",
      "create a new Layer 2 Ethernet frame to be sent to the destination",
      "look into the ARP cache to determine the destination IP address",
      "look into the routing table to determine if the destination network is in the routing table",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 8.5.1\nAfter the routing decision has been made — the router knows the packet must leave through Gig0/1 — the router strips off the original Layer 2 frame that arrived on Gig0/0 and builds a new Ethernet frame for the outgoing interface, addressed to the next-hop device on the Gig0/1 network. The IP packet itself is unchanged; only the Layer 2 encapsulation is rebuilt at each hop.",
  },
  {
    number: 4,
    type: "single",
    text: "Which IPv4 address can a host use to ping the loopback interface?",
    options: ["126.0.0.1", "127.0.0.0", "126.0.0.0", "127.0.0.1"],
    correct: [3],
    explanation:
      "Explanation: Topic 8.4.1\nThe IPv4 loopback range is 127.0.0.0/8. A host uses the address 127.0.0.1 to ping its own NIC and TCP/IP stack (loopback test). The 126.0.0.0/8 addresses are a normal network block, and 127.0.0.0 is the loopback network address itself, which is not a usable address to ping.",
  },
  {
    number: 5,
    type: "single",
    text: "A computer can access devices on the same network but cannot access devices on other networks. What is the probable cause of this problem?",
    options: [
      "The cable is not connected properly to the NIC.",
      "The computer has an invalid IP address.",
      "The computer has an incorrect subnet mask.",
      "The computer has an invalid default gateway address.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 8.4.2\nWhen a host wants to reach a host on another network, it must send the packet to its default gateway (the router on the same LAN). If the default gateway address is missing or incorrect, the host can still communicate with devices on its own network directly, but every packet destined for a remote network is dropped because the host does not know where to send it.",
  },
  {
    number: 6,
    type: "single",
    text: "Which statement describes a feature of the IP protocol?",
    options: [
      "IP encapsulation is modified based on network media.",
      "IP relies on Layer 2 protocols for transmission error control.",
      "MAC addresses are used during the IP packet encapsulation.",
      "IP relies on upper layer services to handle situations of missing or out-of-order packets.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 8.1.5\nIP protocol is a connection-less protocol, considered unreliable in terms of end-to-end delivery. It does not provide error control in the cases where receiving packets are out-of-order or in cases of missing packets. It relies on upper layer services, such as TCP, to resolve these issues.",
  },
  {
    number: 7,
    type: "single",
    text: "Why is NAT not needed in IPv6?",
    options: [
      "Because IPv6 has integrated security, there is no need to hide the IPv6 addresses of internal networks.",
      "Any host or user can get a public IPv6 network address because the number of available IPv6 addresses is extremely large.",
      "The problems that are induced by NAT applications are solved because the IPv6 header improves packet handling by intermediate routers.",
      "The end-to-end connectivity problems that are caused by NAT are solved because the number of routes increases with the number of nodes that are connected to the Internet.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 8.3.2\nThe large number of public IPv6 addresses eliminates the need for NAT. Sites from the largest enterprises to single households can get public IPv6 network addresses. This avoids some of the NAT-induced application problems that are experienced by applications that require end-to-end connectivity.",
  },
  {
    number: 8,
    type: "single",
    text: "Which parameter does the router use to choose the path to the destination when there are multiple routes available?",
    options: [
      "the lower metric value that is associated with the destination network",
      "the lower gateway IP address to get to the destination network",
      "the higher metric value that is associated with the destination network",
      "the higher gateway IP address to get to the destination network",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.5.1\nWhen several routes exist to the same destination network, the router compares the routing protocols' metrics. The route with the lowest metric is considered the best path and is the one installed in the routing table and used to forward packets.",
  },
  {
    number: 9,
    type: "multi",
    text: "What are two services provided by the OSI network layer? (Choose two.)",
    choose: 2,
    options: [
      "performing error detection",
      "routing packets toward the destination",
      "encapsulating PDUs from the transport layer",
      "placement of frames on the media",
      "collision detection",
    ],
    correct: [1, 2],
    explanation:
      "Explanation: Topic 8.1.1\nThe OSI network layer provides several services to allow communication between devices:\n- addressing\n- encapsulation\n- routing\n- de-encapsulation\nError detection, placing frames on the media, and collision detection are all functions of the data link layer.",
  },
  {
    number: 10,
    type: "single",
    text: "Within a production network, what is the purpose of configuring a switch with a default gateway address?",
    options: [
      "Hosts that are connected to the switch can use the switch default gateway address to forward packets to a remote destination.",
      "A switch must have a default gateway to be accessible by Telnet and SSH.",
      "The default gateway address is used to forward packets originating from the switch to remote networks.",
      "It provides a next-hop address for all traffic that flows through the switch.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 8.4.2\nA default gateway address allows a switch to forward packets that originate on the switch to remote networks. A default gateway address on a switch does not provide Layer 3 routing for PCs that are connected on that switch. A switch can still be accessible from Telnet as long as the source of the Telnet connection is on the local network.",
  },
  {
    number: 11,
    type: "single",
    text: "What is a basic characteristic of the IP protocol?",
    options: [
      "connectionless",
      "media dependent",
      "user data segmentation",
      "reliable end-to-end delivery",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.1.3\nInternet Protocol (IP) is a network layer protocol that does not require initial exchange of control information to establish an end-to-end connection before packets are forwarded. Thus, IP is connectionless and does not provide reliable end-to-end delivery by itself. IP is media independent. User data segmentation is a service provided at the transport layer.",
  },
  {
    number: 12,
    type: "single",
    text: "Which field in the IPv4 header is used to prevent a packet from traversing a network endlessly?",
    options: [
      "Time-to-Live",
      "Sequence Number",
      "Acknowledgment Number",
      "Differentiated Services",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nThe value of the Time-to-Live (TTL) field in the IPv4 header is used to limit the lifetime of a packet. The sending host sets the initial TTL value, which is decreased by one each time the packet is processed by a router. If the TTL field decrements to zero, the router discards the packet and sends an Internet Control Message Protocol (ICMP) Time Exceeded message to the source IP address. The Differentiated Services (DS) field is used to determine the priority of each packet. Sequence Number and Acknowledgment Number are two fields in the TCP header.",
  },
  {
    number: 13,
    type: "single",
    text: "What is one advantage that the IPv6 simplified header offers over IPv4?",
    options: [
      "smaller-sized header",
      "little requirement for processing checksums",
      "smaller-sized source and destination IP addresses",
      "efficient packet handling",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 8.3.3\nThe IPv6 simplified header offers several advantages over IPv4:\n- Better routing efficiency and efficient packet handling for performance and forwarding-rate scalability\n- No requirement for processing checksums\n- Simplified and more efficient extension header mechanisms (as opposed to the IPv4 Options field)\n- A Flow Label field for per-flow processing with no need to open the transport inner packet to identify the various traffic flows",
  },
  {
    number: 14,
    type: "single",
    text: "What IPv4 header field identifies the upper layer protocol carried in the packet?",
    options: ["Protocol", "Identification", "Version", "Differentiated Services"],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.2\nIt is the Protocol field in the IP header that identifies the upper-layer protocol the packet is carrying. The Version field identifies the IP version. The Differentiated Services field is used for setting packet priority. The Identification field is used to reorder fragmented packets.",
  },
  {
    number: 15,
    type: "pair",
    text: "Refer to the exhibit. Match the packets with their destination IP address to the exiting interfaces on the router. (Not all targets are used.)",
    exhibit: [
      {
        src: "/images/modules-8-10/q15-exhibit-1.png",
        alt: "Exhibit for question 15: network diagram",
        width: 591,
        height: 269,
      },
      {
        src: "/images/modules-8-10/q15-exhibit-2.jpg",
        alt: "Exhibit for question 15: packets and exiting interfaces",
        width: 1159,
        height: 456,
      },
    ],
    left: [
      "packets with destination of 172.17.6.15",
      "packets with destination of 172.17.14.8",
      "packets with destination of 172.17.12.10",
      "packets with destination of 172.17.10.5",
      "packets with destination of 172.17.8.20",
    ],
    right: [
      "FastEthernet0/0",
      "FastEthernet0/1",
      "FastEthernet1/0",
      "FastEthernet1/1",
      "Serial0/0/0",
    ],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 },
    explanation:
      "Explanation: Topic 8.5.1\nPackets with a destination of 172.17.6.15 are forwarded through Fa0/0. Packets with a destination of 172.17.10.5 are forwarded through Fa1/1. Packets with a destination of 172.17.12.10 are forwarded through Fa1/0. Packets with a destination of 172.17.14.8 are forwarded through Fa0/1. Because network 172.17.8.0 has no entry in the routing table, it will take the gateway of last resort, which means that packets with a destination of 172.17.8.20 are forwarded through Serial0/0/0. Because a gateway of last resort exists, no packets will be dropped.",
  },
  {
    number: 16,
    type: "single",
    text: "What information does the loopback test provide?",
    options: [
      "The TCP/IP stack on the device is working correctly.",
      "The device has end-to-end connectivity.",
      "DHCP is working correctly.",
      "The Ethernet cable is working correctly.",
      "The device has the correct IP address on the network.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.4.1\nBecause the loopback test sends packets back to the host device, it does not provide information about network connectivity to other hosts. The loopback test verifies that the host NIC, drivers, and TCP/IP stack are functioning.",
  },
  {
    number: 17,
    type: "single",
    text: "What routing table entry has a next hop address associated with a destination network?",
    options: [
      "directly-connected routes",
      "local routes",
      "remote routes",
      "C and L source routes",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 8.5.4\nRouting table entries for remote routes will have a next hop IP address. The next hop IP address is the address of the router interface of the next device to be used to reach the destination network. Directly-connected and local routes have no next hop, because they do not require going through another router to be reached.",
  },
  {
    number: 18,
    type: "single",
    text: "How do hosts ensure that their packets are directed to the correct network destination?",
    options: [
      "They have to keep their own local routing table that contains a route to the loopback interface, a local network route, and a remote default route.",
      "They always direct their packets to the default gateway, which will be responsible for the packet delivery.",
      "They search in their own local routing table for a route to the network destination address and pass this information to the default gateway.",
      "They send a query packet to the default gateway asking for the best route.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.4.4\nHosts must maintain their own local routing table to ensure that network layer packets are directed to the correct destination network. This local table typically contains a route to the loopback interface, a route to the network that the host is connected to, and a local default route, which represents the route that packets must take to reach all remote network addresses.",
  },
  {
    number: 19,
    type: "single",
    text: "When transporting data from real-time applications, such as streaming audio and video, which field in the IPv6 header can be used to inform the routers and switches to maintain the same path for the packets in the same conversation?",
    options: ["Next Header", "Flow Label", "Traffic Class", "Differentiated Services"],
    correct: [1],
    explanation:
      "Explanation: Topic 8.3.4\nThe Flow Label in IPv6 header is a 20-bit field that provides a special service for real-time applications. This field can be used to inform routers and switches to maintain the same path for the packet flow so that packets will not be reordered.",
  },
  {
    number: 20,
    type: "single",
    text: "What statement describes the function of the Address Resolution Protocol?",
    options: [
      "ARP is used to discover the IP address of any host on a different network.",
      "ARP is used to discover the IP address of any host on the local network.",
      "ARP is used to discover the MAC address of any host on a different network.",
      "ARP is used to discover the MAC address of any host on the local network.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 9.2.1\nWhen a PC wants to send data on the network, it always knows the IP address of the destination. However, it also needs to discover the MAC address of the destination. ARP is the protocol that is used to discover the MAC address of a host that belongs to the same network.",
  },
  {
    number: 21,
    type: "multi",
    text: "Under which two circumstances will a switch flood a frame out of every port except the port that the frame was received on? (Choose two.)",
    choose: 2,
    options: [
      "The frame has the broadcast address as the destination address.",
      "The destination address is unknown to the switch.",
      "The source address in the frame header is the broadcast address.",
      "The source address in the frame is a multicast address.",
      "The destination address in the frame is a known unicast address.",
    ],
    correct: [0, 1],
    explanation:
      "Explanation: Topic 9.2.3\nA switch will flood a frame out of every port, except the one that the frame was received from, under two circumstances. Either the frame has the broadcast address as the destination address, or the destination address is unknown to the switch.",
  },
  {
    number: 22,
    type: "single",
    text: "Which statement describes the treatment of ARP requests on the local link?",
    options: [
      "They must be forwarded by all routers on the local network.",
      "They are received and processed by every device on the local network.",
      "They are dropped by all switches on the local network.",
      "They are received and processed only by the target device.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 9.2.8\nOne of the negative issues with ARP requests is that they are sent as a broadcast. This means all devices on the local link must receive and process the request.",
  },
  {
    number: 23,
    type: "single",
    text: "Which destination address is used in an ARP request frame?",
    options: [
      "0.0.0.0",
      "255.255.255.255",
      "FFFF.FFFF.FFFF",
      "AAAA.AAAA.AAAA",
      "the physical address of the destination host",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 9.2.3\nThe purpose of an ARP request is to find the MAC address of the destination host on an Ethernet LAN. The ARP process sends a Layer 2 broadcast to all devices on the Ethernet LAN. The frame contains the IP address of the destination and the broadcast MAC address, FFFF.FFFF.FFFF. The host with the IP address that matches the IP address in the ARP request will reply with a unicast frame that includes the MAC address of the host. Thus the original sending host will obtain the destination IP and MAC address pair to continue the encapsulation process for data transmission.",
  },
  {
    number: 24,
    type: "single",
    text: "A network technician issues the arp -d * command on a PC after the router that is connected to the LAN is reconfigured. What is the result after this command is issued?",
    options: [
      "The ARP cache is cleared.",
      "The current content of the ARP cache is displayed.",
      "The detailed information of the ARP cache is displayed.",
      "The ARP cache is synchronized with the router interface.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.6\nIssuing the arp -d * command on a PC will clear the ARP cache content. This is helpful when a network technician wants to ensure the cache is populated with updated information.",
  },
  {
    number: 25,
    type: "single",
    text: "Refer to the exhibit. The exhibit shows a small switched network and the contents of the MAC address table of the switch. PC1 has sent a frame addressed to PC3. What will the switch do with the frame?",
    exhibit: {
      src: "/images/modules-8-10/q25-exhibit.png",
      alt: "Exhibit for question 25: small switched network and MAC address table",
      width: 542,
      height: 332,
    },
    options: [
      "The switch will discard the frame.",
      "The switch will forward the frame only to port 2.",
      "The switch will forward the frame to all ports except port 4.",
      "The switch will forward the frame to all ports.",
      "The switch will forward the frame only to ports 1 and 3.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 9.2.8\nThe MAC address of PC3 is not present in the MAC table of the switch. Because the switch does not know where to send the frame that is addressed to PC3, it will forward the frame to all the switch ports, except for port 4, which is the incoming port.",
  },
  {
    number: 26,
    type: "multi",
    text: "Which two types of IPv6 messages are used in place of ARP for address resolution?",
    choose: 2,
    options: [
      "anycast",
      "broadcast",
      "echo reply",
      "echo request",
      "neighbor solicitation",
      "neighbor advertisement",
    ],
    correct: [4, 5],
    explanation:
      "Explanation: Topic 9.3.2\nIPv6 does not use ARP. Instead, ICMPv6 neighbor discovery is used by sending neighbor solicitation and neighbor advertisement messages.",
  },
  {
    number: 27,
    type: "single",
    text: "What is the aim of an ARP spoofing attack?",
    options: [
      "to flood the network with ARP reply broadcasts",
      "to fill switch MAC address tables with bogus addresses",
      "to associate IP addresses to the wrong MAC address",
      "to overwhelm network hosts with ARP requests",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 9.2.8\nIn an ARP spoofing attack, a malicious host intercepts ARP requests and replies to them so that network hosts will map an IP address to the MAC address of the malicious host.",
  },
  {
    number: 28,
    type: "single",
    text: "Refer to the exhibit. PC1 attempts to connect to File_server1 and sends an ARP request to obtain a destination MAC address. Which MAC address will PC1 receive in the ARP reply?",
    exhibit: {
      src: "/images/modules-8-10/q28-exhibit.jpg",
      alt: "Exhibit for question 28: PC1 sending an ARP request",
      width: 378,
      height: 288,
    },
    options: [
      "the MAC address of S1",
      "the MAC address of the G0/0 interface on R1",
      "the MAC address of the G0/0 interface on R2",
      "the MAC address of S2",
      "the MAC address of File_server1",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 9.2.5\nPC1 must have a MAC address to use as a destination Layer 2 address. PC1 will send an ARP request as a broadcast and R1 will send back an ARP reply with its G0/0 interface MAC address. PC1 can then forward the packet to the MAC address of the default gateway, R1.",
  },
  {
    number: 29,
    type: "single",
    text: "Where are IPv4 address to Layer 2 Ethernet address mappings maintained on a host computer?",
    options: ["neighbor table", "ARP cache", "routing table", "MAC address table"],
    correct: [1],
    explanation:
      "Explanation: Topic 9.2.2\nThe ARP cache is used to store IPv4 addresses and the Ethernet physical addresses or MAC addresses to which the IPv4 addresses are mapped. Incorrect mappings of IP addresses to MAC addresses can result in loss of end-to-end connectivity.",
  },
  {
    number: 30,
    type: "single",
    text: "What important information is examined in the Ethernet frame header by a Layer 2 device in order to forward the data onward?",
    options: [
      "source MAC address",
      "source IP address",
      "destination MAC address",
      "Ethernet type",
      "destination IP address",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 9.1.1\nThe Layer 2 device, such as a switch, uses the destination MAC address to determine which path (interface or port) should be used to send the data onward to the destination device.",
  },
  {
    number: 31,
    type: "pair",
    text: "Match the commands to the correct actions. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-8-10/q31-exhibit.jpg",
      alt: "Exhibit for question 31: router commands and actions",
      width: 1327,
      height: 269,
      revealOnly: true,
    },
    left: [
      "displays a message after accessing the router",
      "provides security on the console",
      "configures a name on the router",
    ],
    right: [
      "Router(config)# banner motd #",
      "Router(config-line)# password class",
      "Router(config)# hostname CL1",
    ],
    correctPairs: { 0: 0, 1: 1, 2: 2 },
    explanation:
      "Explanation: Topic 10.1.1\nThe correct pairings are:\n- displays a message after accessing the router → Router(config)# banner motd #\n- provides security on the console → Router(config-line)# password class (the password must be configured inside the console line mode)\n- configures a name on the router → Router(config)# hostname CL1",
  },
  {
    number: 32,
    type: "single",
    text: "A new network administrator has been asked to enter a banner message on a Cisco device. What is the fastest way a network administrator could test whether the banner is properly configured?",
    options: [
      "Reboot the device.",
      "Enter CTRL-Z at the privileged mode prompt.",
      "Exit global configuration mode.",
      "Power cycle the device.",
      "Exit privileged EXEC mode and press Enter.",
    ],
    correct: [4],
    explanation:
      "Explanation: Topic 10.1.1\nWhile at the privileged mode prompt such as Router#, type exit, press Enter, and the banner message appears. Power cycling a network device that has had the banner motd command issued will also display the banner message, but this is not a quick way to test the configuration.",
  },
  {
    number: 33,
    type: "pair",
    text: "A network administrator requires access to manage routers and switches locally and remotely. Match the description to the access method. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-8-10/q33-exhibit.jpg",
      alt: "Exhibit for question 33: router access methods",
      width: 1229,
      height: 356,
      revealOnly: true,
    },
    left: [
      "remote access method that uses encryption",
      "preferred out-of-band access method",
      "remote access via a dialup connection",
      "unsecure remote access",
    ],
    right: ["SSH", "console", "AUX", "Telnet"],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3 },
    explanation:
      "Explanation: Topic 10.1.1\nBoth the console and AUX ports can be used to directly connect to a Cisco network device for management purposes. However, it is more common to use the console port. The AUX port is more often used for remote access via a dial-up connection. SSH and Telnet are both remote access methods that depend on an active network connection. SSH uses a stronger password authentication than Telnet uses and also uses encryption on transmitted data.",
  },
  {
    number: 34,
    type: "pair",
    text: "Match the phases to the functions during the boot up process of a Cisco router. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-8-10/q34-exhibit.jpg",
      alt: "Exhibit for question 34: router boot up process",
      width: 1325,
      height: 306,
      revealOnly: true,
    },
    left: ["phase 1", "phase 2", "phase 3"],
    right: [
      "perform the POST and load the bootstrap program",
      "locate and load the Cisco IOS software",
      "locate and load the startup configuration file",
    ],
    correctPairs: { 0: 0, 1: 1, 2: 2 },
    explanation:
      "Explanation: Topic 10.1.1\nThere are three major phases to the bootup process of a Cisco router:\n1. Perform the POST and load the bootstrap program.\n2. Locate and load the Cisco IOS software.\n3. Locate and load the startup configuration file.\nIf a startup configuration file cannot be located, the router will enter setup mode by displaying the setup mode prompt.",
  },
  {
    number: 35,
    type: "pair",
    text: "Match the command with the device mode at which the command is entered. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-8-10/q35-exhibit.jpg",
      alt: "Exhibit for question 35: commands and device modes",
      width: 1352,
      height: 437,
      revealOnly: true,
    },
    left: [
      "service password-encryption",
      "enable",
      "copy running-config startup-config",
      "login",
      "ip address 192.168.4.4 255.255.255.0",
    ],
    right: ["R1(config)#", "R1>", "R1#", "R1(config-line)#", "R1(config-if)#"],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 },
    explanation:
      "Explanation: Topic 10.1.1\nThe enable command is entered in R1> mode. The login command is entered in R1(config-line)# mode. The copy running-config startup-config command is entered in R1# mode. The ip address 192.168.4.4 255.255.255.0 command is entered in R1(config-if)# mode. The service password-encryption command is entered in global configuration mode.",
  },
  {
    number: 36,
    type: "multi",
    text: "What are two functions of NVRAM? (Choose two.)",
    choose: 2,
    options: [
      "to store the routing table",
      "to retain contents when power is removed",
      "to store the startup configuration file",
      "to contain the running configuration file",
      "to store the ARP table",
    ],
    correct: [1, 2],
    explanation:
      "Explanation: Topic 10.1.1\nNVRAM is permanent memory storage, so the startup configuration file is preserved even if the router loses power.",
  },
  {
    number: 37,
    type: "single",
    text: "A router boots and enters setup mode. What is the reason for this?",
    options: [
      "The IOS image is corrupt.",
      "Cisco IOS is missing from flash memory.",
      "The configuration file is missing from NVRAM.",
      "The POST process has detected hardware failure.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 10.1.1\nIf a router cannot locate the startup-config file in NVRAM, it will enter setup mode to allow the configuration to be entered from the console device.",
  },
  {
    number: 38,
    type: "single",
    text: "The global configuration command ip default-gateway 172.16.100.1 is applied to a switch. What is the effect of this command?",
    options: [
      "The switch will have a management interface with the address 172.16.100.1.",
      "The switch can be remotely managed from a host on another network.",
      "The switch can communicate with other hosts on the 172.16.100.0 network.",
      "The switch is limited to sending and receiving frames to and from the gateway 172.16.100.1.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 10.3.2\nA default gateway address is typically configured on all devices to allow them to communicate beyond just their local network. In a switch this is achieved using the command ip default-gateway <ip address>.",
  },
  {
    number: 39,
    type: "single",
    text: "What happens when the transport input ssh command is entered on the switch vty lines?",
    options: [
      "The SSH client on the switch is enabled.",
      "Communication between the switch and remote users is encrypted.",
      "The switch requires a username/password combination for remote access.",
      "The switch requires remote connections via a proprietary client software.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 10.1.1\nThe transport input ssh command, when entered on the switch vty (virtual terminal lines), will encrypt all inbound controlled telnet connections.",
  },
  {
    number: 40,
    type: "single",
    text: "Refer to the exhibit. A user PC has successfully transmitted packets to www.cisco.com. Which IP address does the user PC target in order to forward its data off the local network?",
    exhibit: {
      src: "/images/modules-8-10/q40-exhibit.png",
      alt: "Exhibit for question 40: user PC forwarding data off the local network",
      width: 433,
      height: 224,
    },
    options: [
      "172.24.255.17",
      "172.24.1.22",
      "172.20.0.254",
      "172.24.255.4",
      "172.20.1.18",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 10.3.1\nTo send data off its local network, the PC must target its default gateway — the IP address of the local router interface that connects to the PC's own LAN. That interface is 172.20.0.254 in the exhibit. The other addresses belong to networks further away (for example, remote LANs or the ISP side) and are not on the PC's local network, so the PC cannot use them as a gateway.",
  },
];
