import type { Question } from "../../lib/types";

/** Modules 7 - 9 (Available and Reliable Networks), questions 36-69. */
export const questions36to69: Question[] = [
  {
    number: 36,
    type: "single",
    text: "Open the PT Activity. Perform the tasks in the activity instructions and then answer the question.\nWhat is the keyword that is displayed on www.netacad.com?",
    exhibit: {
      src: "/images/modules-7-9/q36-exhibit.jpg",
      alt: "Exhibit for question 36: Packet Tracer activity screenshot",
      width: 415,
      height: 280,
    },
    options: ["DHCP", "switch", "Router", "networking", "Cisco", "IPv6"],
    correct: [2],
    explanation:
      "Explanation: Topic 8.3.3\nThe Packet Tracer activity guides the user through tasks related to DHCP and first-hop redundancy configuration. After performing the activity tasks, the keyword that is displayed on www.netacad.com is Router.",
  },
  {
    number: 37,
    type: "pair",
    text: "Match each DHCP message type with its description. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-7-9/q37-exhibit.jpg",
      alt: "Exhibit for question 37: DHCP message type matching board",
      width: 753,
      height: 554,
    },
    left: [
      "a client initiating a message to find a DHCP server",
      "a DHCP server responding to the initial request by a client",
      "the client accepting the IP address provided by the DHCP server",
      "the DHCP server confirming that the address lease has been accepted",
    ],
    right: ["DHCPACK", "DHCPREQUEST", "DHCPNACK", "DHCPDISCOVER", "DHCPOFFER"],
    correctPairs: { 0: 3, 1: 4, 2: 1, 3: 0 },
    explanation:
      "Explanation: Topic 7.1.3\nPlace the options in the following order:\n- a client initiating a message to find a DHCP server → DHCPDISCOVER\n- a DHCP server responding to the initial request by a client → DHCPOFFER\n- the client accepting the IP address provided by the DHCP server → DHCPREQUEST\n- the DHCP server confirming that the address lease has been accepted → DHCPACK\nDHCPNACK is not used.",
  },
  {
    number: 38,
    type: "pair",
    text: "Match the purpose with its DHCP message type. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-7-9/q38-exhibit.webp",
      alt: "Exhibit for question 38: DHCP message purpose matching board",
      width: 1139,
      height: 556,
    },
    left: [
      "a message that is used to locate any available DHCP server on a network",
      "a message that is used to identify the explicit server and lease offer to accept",
      "a message that is used to acknowledge that the lease is successful",
      "a message that is used to suggest a lease to a client",
    ],
    right: ["DHCPDISCOVER", "DHCPOFFER", "DHCPREQUEST", "DHCPNAK", "DHCPACK"],
    correctPairs: { 0: 0, 1: 2, 2: 4, 3: 1 },
    explanation:
      "Explanation: Topic 7.1.3\nThe correct pairings are:\n- a message that is used to locate any available DHCP server on a network → DHCPDISCOVER\n- a message that is used to suggest a lease to a client → DHCPOFFER\n- a message that is used to identify the explicit server and lease offer to accept → DHCPREQUEST\n- a message that is used to acknowledge that the lease is successful → DHCPACK\nDHCPNAK is not used.",
  },
  {
    number: 39,
    type: "pair",
    text: "Match the DHCP message types to the order of the stateful DHCPv6 process when a client first connects to an IPv6 network. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-7-9/q39-exhibit.jpg",
      alt: "Exhibit for question 39: stateful DHCPv6 process steps",
      width: 1455,
      height: 377,
    },
    left: ["Step 1", "Step 2", "Step 3", "Step 4"],
    right: ["DHCPv6 SOLICIT", "DHCPv6 ADVERTISE", "DHCPv6 REQUEST", "DHCPv6 REPLY"],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3 },
    explanation:
      "Explanation: Topic 8.3.1\nThe stateful DHCPv6 process when a client first connects to an IPv6 network:\nStep 1: DHCPv6 SOLICIT\nStep 2: DHCPv6 ADVERTISE\nStep 3: DHCPv6 REQUEST\nStep 4: DHCPv6 REPLY",
  },
  {
    number: 40,
    type: "pair",
    text: "Match the step number to the sequence of stages that occur during the HSRP failover process. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-7-9/q40-exhibit.jpg",
      alt: "Exhibit for question 40: HSRP failover process stages",
      width: 1457,
      height: 479,
    },
    left: ["Step 1", "Step 2", "Step 3", "Step 4"],
    right: [
      "The forwarding router fails.",
      "The standby router stops seeing hello messages from the forwarding router.",
      "The standby router assumes the role of the forwarding router.",
      "The new forwarding router assumes both the IP and MAC addresses of the virtual router.",
    ],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3 },
    explanation:
      "Explanation: Topic 9.1.3\nThe HSRP failover process occurs in the following order:\nStep 1: The forwarding router fails.\nStep 2: The standby router stops seeing hello messages from the forwarding router.\nStep 3: The standby router assumes the role of the forwarding router.\nStep 4: The new forwarding router assumes both the IP and MAC addresses of the virtual router.\nHot Standby Router Protocol (HSRP) is a Cisco-proprietary protocol that is designed to allow for transparent failover of a first-hop IPv4 device.",
  },
  {
    number: 41,
    type: "pair",
    text: "Match the FHRP protocols to the appropriate description. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-7-9/q41-exhibit.webp",
      alt: "Exhibit for question 41: FHRP protocol matching board",
      width: 1091,
      height: 409,
    },
    left: [
      "a Cisco proprietary FHRP that provides redundancy through use of an active device and standby device",
      "an open standard FHRP that provides redundancy through use of a virtual router master and one or more backups",
      "a Cisco proprietary FHRP that provides load sharing in addition to redundancy",
    ],
    right: ["HSRP", "VRRP", "GLBP"],
    correctPairs: { 0: 0, 1: 1, 2: 2 },
    explanation:
      "Explanation: Topic 9.1.4\nThe correct pairings are:\n- a Cisco proprietary FHRP that provides redundancy through use of an active device and standby device → HSRP\n- an open standard FHRP that provides redundancy through use of a virtual router master and one or more backups → VRRP\n- a Cisco proprietary FHRP that provides load sharing in addition to redundancy → GLBP",
  },
  {
    number: 42,
    type: "pair",
    text: "Match the DHCP message types to the order of the DHCPv4 process. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-7-9/q42-exhibit.jpg",
      alt: "Exhibit for question 42: DHCPv4 process steps",
      width: 1449,
      height: 372,
    },
    left: ["Step 1", "Step 2", "Step 3", "Step 4"],
    right: ["DHCPDISCOVER", "DHCPOFFER", "DHCPREQUEST", "DHCPACK"],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3 },
    explanation:
      "Explanation: Topic 7.1.3\nThe broadcast DHCPDISCOVER message finds DHCPv4 servers on the network. When the DHCPv4 server receives a DHCPDISCOVER message, it reserves an available IPv4 address to lease to the client and sends the unicast DHCPOFFER message to the requesting client. When the client receives the DHCPOFFER from the server, it sends back a DHCPREQUEST. On receiving the DHCPREQUEST message the server replies with a unicast DHCPACK message. DHCPREPLY and DHCPINFORMATION-REQUEST are DHCPv6 messages.",
  },
  {
    number: 43,
    type: "single",
    text: "The address pool of a DHCP server is configured with 192.168.234.0/27. The network administrator reserves 22 IP addresses for IP phones. How many IP addresses are left in the pool to be assigned to other hosts?",
    options: ["10", "0", "8", "21", "18"],
    correct: [2],
    explanation:
      "Explanation: Topic 7.2.2\nCalculate the maximum number of hosts available for the slash value and subtract the required static IP addresses required for the devices.\n/24 = 254 hosts\n/25 = 126 hosts\n/26 = 62 hosts\n/27 = 30 hosts\n/28 = 14 hosts\n30 hosts minus 22 reserved addresses = 8 addresses left in the pool.",
  },
  {
    number: 44,
    type: "single",
    text: "A company uses DHCP servers to dynamically assign IPv4 addresses to employee workstations. The address lease duration is set as 5 days. An employee returns to the office after an absence of one week. When the employee boots the workstation, it sends a message to obtain an IP address. Which Layer 2 and Layer 3 destination addresses will the message contain?",
    options: [
      "both MAC and IPv4 addresses of the DHCP server",
      "FF-FF-FF-FF-FF-FF and IPv4 address of the DHCP server",
      "FF-FF-FF-FF-FF-FF and 255.255.255.255",
      "MAC address of the DHCP server and 255.255.255.255",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 7.1.3\nWhen the lease of a dynamically assigned IPv4 address has expired, a workstation will send a DHCPDISCOVER message to start the process of obtaining a valid IP address. Because the workstation does not know the addresses of DHCP servers, it sends the message via broadcast, with destination addresses of FF-FF-FF-FF-FF-FF and 255.255.255.255.",
  },
  {
    number: 45,
    type: "single",
    text: "Which command will allow a network administrator to check the IP address that is assigned to a particular MAC address?",
    options: [
      "Router# show running-config I section_dhcp",
      "Router# show ip dhcp server statistics",
      "Router# show ip dhcp binding",
      "Router# show ip dhcp pool",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 7.2.4\nThe show ip dhcp binding command will show the leases, including IP addresses, MAC addresses, lease expiration, type of lease, client ID, and user name.",
  },
  {
    number: 46,
    type: "single",
    text: "What is the reason that an ISP commonly assigns a DHCP address to a wireless router in a SOHO environment?",
    options: [
      "better network performance",
      "better connectivity",
      "easy IP address management",
      "easy configuration on ISP firewall",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 7.3.3\nIn a SOHO environment, a wireless router connects to the ISP via a DSL or cable modem. The IP address between the wireless router and ISP site is typically assigned by the ISP through DHCP. This method facilitates the IP addressing management in that IP addresses for clients are dynamically assigned so that if a client is dropped, the assigned IP address can be easily reassigned to another client.",
  },
  {
    number: 47,
    type: "single",
    text: "What information can be verified through the show ip dhcp binding command?",
    options: [
      "the IPv4 addresses that are assigned to hosts by the DHCP server",
      "that DHCPv4 discover messages are still being received by the DHCP server",
      "the IPv4 addresses that have been excluded from the DHCPv4 pool",
      "the number of IP addresses remaining in the DHCP pool",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 7.2.4\nThe show ip dhcp binding command shows a list of IPv4 addresses and the MAC addresses of the hosts to which they are assigned. Using this information an administrator can determine which host interfaces have been assigned to specific hosts.",
  },
  {
    number: 48,
    type: "single",
    text: "What is the result of a network technician issuing the command ip dhcp excluded-address 10.0.15.1 10.0.15.15 on a Cisco router?",
    options: [
      "The Cisco router will exclude only the 10.0.15.1 and 10.0.15.15 IP addresses from being leased to DHCP clients.",
      "The Cisco router will exclude 15 IP addresses from being leased to DHCP clients.",
      "The Cisco router will automatically create a DHCP pool using a /28 mask.",
      "The Cisco router will allow only the specified IP addresses to be leased to clients.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 7.2.2\nThe ip dhcp excluded-address command is followed by the first and the last addresses to be excluded from being leased to DHCP clients.",
  },
  {
    number: 49,
    type: "pair",
    text: "Match the descriptions to the corresponding DHCPv6 server type. (Not all options are used.)",
    allowMultiMatch: true,
    exhibit: {
      src: "/images/modules-7-9/q49-exhibit.jpg",
      alt: "Exhibit for question 49: DHCPv6 server type matching board",
      width: 642,
      height: 605,
    },
    left: [
      "enabled in RA messages with the ipv6 nd other-config-flag command",
      "the M flag is set to 1 in RA messages",
      "uses the address command to create a pool of addresses for clients",
      "clients send only DHCPv6 INFORMATION REQUEST messages to the server",
      "enabled on the client with the ipv6 address dhcp command",
      "enabled on the client with the ipv6 address autoconfig command",
    ],
    right: ["Stateless DHCPv6", "Stateful DHCPv6"],
    correctPairs: { 0: 0, 1: 1, 2: 1, 3: 0, 4: 1, 5: 0 },
    explanation:
      "Explanation: Topic 8.1.3\nStateless DHCPv6:\n- enabled in RA messages with the ipv6 nd other-config-flag command\n- clients send only DHCPv6 INFORMATION REQUEST messages to the server\n- enabled on the client with the ipv6 address autoconfig command\nStateful DHCPv6:\n- the M flag is set to 1 in RA messages\n- uses the address command to create a pool of addresses for clients\n- enabled on the client with the ipv6 address dhcp command",
  },
  {
    number: 50,
    type: "single",
    text: "Refer to the exhibit. Based on the output that is shown, what kind of IPv6 addressing is being configured?",
    exhibit: {
      src: "/images/modules-7-9/q50-exhibit.png",
      alt: "Exhibit for question 50: IPv6 addressing configuration output",
      width: 363,
      height: 266,
    },
    options: ["stateless DHCPv6", "SLAAC", "static link-local", "stateful DHCPv6"],
    correct: [0],
    explanation:
      "Explanation: Topic 8.4.2\nStateful DHCPv6 pools are configured with address prefixes for hosts via the address command, whereas stateless DHCPv6 pools typically only contain information such as DNS server addresses and the domain name. RA messages that are sent from routers that are configured as stateful DHCPv6 servers have the M flag set to 1 with the command ipv6 nd managed-config-flag, whereas stateless DHCPv6 servers are indicated by setting the O flag to 1 with the ipv6 nd other-config-flag command.",
  },
  {
    number: 51,
    type: "single",
    text: "Which FHRP implementation is a Cisco-proprietary protocol that suppports IPv6 load balancing?",
    options: ["GLBP", "GLBP for IPv6", "VRRPv3", "VRRPv2"],
    correct: [1],
    explanation:
      "Explanation: Topic 9.1.4\nGLBP for IPv6 is the Cisco-proprietary FHRP implementation that supports IPv6 load balancing across the routers in a group.",
  },
  {
    number: 52,
    type: "single",
    text: "Which set of commands will configure a router as a DHCP server that will assign IPv4 addresses to the 192.168.100.0/23 LAN while reserving the first 10 and the last addresses for static assignment?",
    options: [
      "ip dhcp excluded-address 192.168.100.1 192.168.100.9\nip dhcp excluded-address 192.168.101.254\nip dhcp pool LAN-POOL-100\nip network 192.168.100.0 255.255.254.0\nip default-gateway 192.168.100.1",
      "dhcp pool LAN-POOL-100\nip dhcp excluded-address 192.168.100.1 192.168.100.9\nip dhcp excluded-address 192.168.100.254\nnetwork 192.168.100.0 255.255.254.0\ndefault-router 192.168.101.1",
      "ip dhcp excluded-address 192.168.100.1 192.168.100.10\nip dhcp excluded-address 192.168.100.254\nip dhcp pool LAN-POOL-100\nnetwork 192.168.100.0 255.255.255.0\nip default-gateway 192.168.100.1",
      "ip dhcp excluded-address 192.168.100.1 192.168.100.10\nip dhcp excluded-address 192.168.101.254\nip dhcp pool LAN-POOL-100\nnetwork 192.168.100.0 255.255.254.0\ndefault-router 192.168.100.1",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 7.2.2\nThe /23 prefix is equivalent to a network mask of 255.255.254.0. The network usable IPv4 address range is 192.168.100.1 to 192.168.101.254 inclusive. The first 10 addresses (192.168.100.1 through 192.168.100.10) and the last address (192.168.101.254) are excluded for static assignment. The commands dhcp pool, ip default-gateway, and ip network are not valid DHCP configuration commands.",
  },
  {
    number: 53,
    type: "single",
    text: "What is a result when the DHCP servers are not operational in a network?",
    options: [
      "Workstations are assigned with the IP address 127.0.0.1.",
      "Workstations are assigned with IP addresses in the 10.0.0.0/8 network.",
      "Workstations are assigned with IP addresses in the 169.254.0.0/16 network.",
      "Workstations are assigned with the IP address 0.0.0.0.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 8.1.2\nWhen workstations are configured with obtaining IP address automatically but DHCP servers are not available to respond to the requests, a workstation can assign itself IP addresses from the 169.254.0.0/16 network.",
  },
  {
    number: 54,
    type: "single",
    text: "A company uses the method SLAAC to configure IPv6 addresses for the workstations of the employees. A network administrator configured the IPv6 address on the LAN interface of the router. The interface status is UP. However, the workstations on the LAN segment did not obtain the correct prefix and prefix length. What else should be configured on the router that is attached to the LAN segment for the workstations to obtain the information?",
    options: [
      "R1(config)# ipv6 dhcp pool",
      "R1(config-if)# ipv6 enable",
      "R1(config)# ipv6 unicast-routing",
      "R1(config-if)# ipv6 nd other-config-flag",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 8.2.3\nA PC that is configured to use the SLAAC method obtains the IPv6 prefix and prefix length from a router. When the PC boots, it sends an RS message to inform the routers that it needs the information. A router sends an RA message that includes the required information. For a router to be able to send RA messages, it must be enabled as an IPv6 router by the ipv6 unicast-routing command in global configuration mode. The other options are not used to enable IPv6 routing on a router.",
  },
  {
    number: 55,
    type: "single",
    text: "Which FHRP implementation is a nonproprietary protocol which relies on ICMP to provide IPv4 redundancy?",
    options: ["VRRPv3", "GLBP for IPv6", "IRDP", "GLBP"],
    correct: [2],
    explanation:
      "Explanation: Topic 9.1.4\nIRDP (ICMP Router Discovery Protocol) is a nonproprietary FHRP that relies on ICMP Router Advertisement and Router Solicitation messages to allow IPv4 hosts to discover routers and provide first-hop redundancy.",
  },
  {
    number: 56,
    type: "single",
    text: "Refer to the exhibit. PC-A is unable to receive an IPv6 address from the stateful DHCPv6 server. What is the problem?",
    exhibit: {
      src: "/images/modules-7-9/q56-exhibit.png",
      alt: "Exhibit for question 56: PC-A and stateful DHCPv6 server",
      width: 696,
      height: 283,
    },
    options: [
      "The ipv6 dhcp relay command should be applied to interface Gig0/0.",
      "The ipv6 nd managed-config-flag should be applied to interface Gig0/1.",
      "The ipv6 dhcp relay command should use the link-local address of the DHCP server.",
      "The ipv6 nd managed-config-flag command should be ipv6 nd other-config-flag .",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.4.7\nThe ipv6 dhcp relay command must be applied to the interface where the clients are located. The ipv6 dhcp relay command can use either the link-local or global unicast address of the DHCPv6 server, or even a multicast address. The ipv6 nd managed-config-flag indicates to the clients that they should use stateful DHCPv6 and is also applied to the interface where the clients are located.",
  },
  {
    number: 57,
    type: "single",
    text: "Refer to the exhibit. A network administrator is configuring a router as a DHCPv6 server. The administrator issues a show ipv6 dhcp pool command to verify the configuration. Which statement explains the reason that the number of active clients is 0?",
    exhibit: {
      src: "/images/modules-7-9/q57-exhibit.jpg",
      alt: "Exhibit for question 57: show ipv6 dhcp pool output",
      width: 532,
      height: 342,
    },
    options: [
      "The default gateway address is not provided in the pool.",
      "No clients have communicated with the DHCPv6 server yet.",
      "The IPv6 DHCP pool configuration has no IPv6 address range specified.",
      "The state is not maintained by the DHCPv6 server under stateless DHCPv6 operation.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 8.3.2\nUnder the stateless DHCPv6 configuration, indicated by the command ipv6 nd other-config-flag, the DHCPv6 server does not maintain the state information, because client IPv6 addresses are not managed by the DHCP server. Because the clients will configure their IPv6 addresses by combining the prefix/prefix-length and a self-generated interface ID, the ipv6 dhcp pool configuration does not need to specify the valid IPv6 address range. And because clients will use the link-local address of the router interface as the default gateway address, the default gateway address is not necessary.",
  },
  {
    number: 58,
    type: "single",
    text: "Which FHRP implementation is Cisco-proprietary and permits only one router in a group to forward IPv6 packets?",
    options: ["VRRPv3", "HSRP", "HSRP for IPv6", "VRRPv2"],
    correct: [2],
    explanation:
      "Explanation: Topic 9.1.4\nHSRP for IPv6 is the Cisco-proprietary FHRP implementation for IPv6. Like HSRP for IPv4, it elects one active router per group, so only one router in the group forwards IPv6 packets.",
  },
  {
    number: 59,
    type: "single",
    text: "Which FHRP implementation is a nonproprietary IPv4-only election protocol which has one master router per group?",
    options: ["HSRP for IPv6", "GLBP", "VRRPv2", "VRRPv3"],
    correct: [2],
    explanation:
      "Explanation: Topic 9.1.4\nVRRPv2 is a nonproprietary (open standard), IPv4-only election protocol. It elects one virtual router master per group, with the other routers acting as backups.",
  },
  {
    number: 60,
    type: "single",
    text: "The address pool of a DHCP server is configured with 172.18.93.0/25. The network administrator reserves 10 IP addresses for web servers. How many IP addresses are left in the pool to be assigned to other hosts?",
    options: ["106", "117", "114", "120", "116"],
    correct: [4],
    explanation:
      "Explanation: Topic 7.2.2\nCalculate the maximum number of hosts available for the slash value and subtract the required static IP addresses required for the devices.\n/24 = 254 hosts\n/25 = 126 hosts\n/26 = 62 hosts\n/27 = 30 hosts\n/28 = 14 hosts\n126 hosts minus 10 reserved addresses = 116 addresses left in the pool.",
  },
  {
    number: 61,
    type: "single",
    text: "The address pool of a DHCP server is configured with 10.3.2.0/24. The network administrator reserves 3 IP addresses for printers. How many IP addresses are left in the pool to be assigned to other hosts?",
    options: ["252", "241", "255", "249", "251"],
    correct: [4],
    explanation:
      "Explanation: Topic 7.2.2\nCalculate the maximum number of hosts available for the slash value and subtract the required static IP addresses required for the devices.\n/24 = 254 hosts\n254 hosts minus 3 reserved addresses = 251 addresses left in the pool.",
  },
  {
    number: 62,
    type: "single",
    text: "The address pool of a DHCP server is configured with 172.23.143.0/26. The network administrator reserves 14 IP addresses for file servers. How many IP addresses are left in the pool to be assigned to other hosts?",
    options: ["58", "48", "50", "61", "40"],
    correct: [1],
    explanation:
      "Explanation: Topic 7.2.2\nCalculate the maximum number of hosts available for the slash value and subtract the required static IP addresses required for the devices.\n/26 = 62 hosts\n62 hosts minus 14 reserved addresses = 48 addresses left in the pool.",
  },
  {
    number: 63,
    type: "single",
    text: "The address pool of a DHCP server is configured with 10.7.30.0/24. The network administrator reserves 5 IP addresses for printers. How many IP addresses are left in the pool to be assigned to other hosts?",
    options: ["253", "239", "249", "250", "247"],
    correct: [2],
    explanation:
      "Explanation: Topic 7.2.2\nCalculate the maximum number of hosts available for the slash value and subtract the required static IP addresses required for the devices.\n/24 = 254 hosts\n254 hosts minus 5 reserved addresses = 249 addresses left in the pool.",
  },
  {
    number: 64,
    type: "single",
    text: "Which FHRP implementation is a nonproprietary IPv4-only election protocol with limited scalability?",
    options: ["VRRPv2", "GLBP", "GLBP for IPv6", "IRDP"],
    correct: [0],
    explanation:
      "Explanation: Topic 9.1.4\nVRRPv2 is a nonproprietary, IPv4-only election protocol. It has limited scalability because only one router (the master) forwards traffic for the virtual IP, and it supports a single primary/backup model per group.",
  },
  {
    number: 65,
    type: "single",
    text: "The address pool of a DHCP server is configured with 192.168.184.0/26. The network administrator reserves 18 IP addresses for access points. How many IP addresses are left in the pool to be assigned to other hosts?",
    options: ["57", "44", "54", "36", "46"],
    correct: [1],
    explanation:
      "Explanation: Topic 7.2.2\nCalculate the maximum number of hosts available for the slash value and subtract the required static IP addresses required for the devices.\n/26 = 62 hosts\n62 hosts minus 18 reserved addresses = 44 addresses left in the pool.",
  },
  {
    number: 66,
    type: "single",
    text: "The address pool of a DHCP server is configured with 10.19.44.0/24. The network administrator reserves 3 IP addresses for servers. How many IP addresses are left in the pool to be assigned to other hosts?",
    options: ["255", "252", "241", "251", "249"],
    correct: [3],
    explanation:
      "Explanation: Topic 7.2.2\nCalculate the maximum number of hosts available for the slash value and subtract the required static IP addresses required for the devices.\n/24 = 254 hosts\n254 hosts minus 3 reserved addresses = 251 addresses left in the pool.",
  },
  {
    number: 67,
    type: "single",
    text: "The address pool of a DHCP server is configured with 10.19.44.0/24. The network administrator reserves 6 IP addresses for servers. How many IP addresses are left in the pool to be assigned to other hosts?",
    options: ["246", "252", "249", "248", "238"],
    correct: [3],
    explanation:
      "Explanation: Topic 7.2.2\nCalculate the maximum number of hosts available for the slash value and subtract the required static IP addresses required for the devices.\n/24 = 254 hosts\n254 hosts minus 6 reserved addresses = 248 addresses left in the pool.",
  },
  {
    number: 68,
    type: "single",
    text: "The address pool of a DHCP server is configured with 172.21.121.0/25. The network administrator reserves 12 IP addresses for web servers. How many IP addresses are left in the pool to be assigned to other hosts?",
    options: ["115", "114", "118", "104", "112"],
    correct: [1],
    explanation:
      "Explanation: Topic 7.2.2\nCalculate the maximum number of hosts available for the slash value and subtract the required static IP addresses required for the devices.\n/24 = 254 hosts\n/25 = 126 hosts\n/26 = 62 hosts\n/27 = 30 hosts\n/28 = 14 hosts\n126 hosts minus 12 reserved addresses = 114 addresses left in the pool.",
  },
  {
    number: 69,
    type: "single",
    text: "Which kind of message is sent by a DHCP client when its IP address lease is about to expire?",
    options: [
      "a DHCPREQUEST broadcast message",
      "a DHCPDISCOVER unicast message",
      "a DHCPDISCOVER broadcast message",
      "a DHCPREQUEST unicast message",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 7.1.4\nWhen the IP address lease of the DHCP client is about to expire, the client attempts to renew the lease by sending a DHCPREQUEST unicast message directly to the DHCP server that issued the lease.",
  },
];