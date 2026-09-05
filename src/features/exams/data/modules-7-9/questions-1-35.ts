import type { Question } from "../../lib/types";

/** Modules 7 - 9 (Available and Reliable Networks), questions 1-35. */
export const questions1to35: Question[] = [
  {
    number: 1,
    type: "multi",
    text: "A DHCP-enabled client PC has just booted. During which two steps will the client PC use broadcast messages when communicating with a DHCP server? (Choose two.)",
    choose: 2,
    options: ["DHCPDISCOVER", "DHCPACK", "DHCPOFFER", "DHCPREQUEST", "DHCPNAK"],
    correct: [0, 3],
    explanation:
      "Explanation: Topic 7.1.3\nAll DHCP messages between a DHCP-enabled client and a DHCP server are using broadcast messages until after the DHCPACK message. The DHCPDISCOVER and DHCPREQUEST messages are the only messages that are sent by a DHCP-enabled client. All DHCP messages between a DHCP-enabled client and a DHCP server use broadcast messages when the client is obtaining a lease for the first time.",
  },
  {
    number: 2,
    type: "single",
    text: "An administrator issues the commands:\nWhat is the administrator trying to achieve?",
    code: "Router(config)# interface g0/1\nRouter(config-if)# ip address dhcp",
    options: [
      "configuring the router to act as a DHCPv4 server",
      "configuring the router to obtain IP parameters from a DHCPv4 server",
      "configuring the router to act as a relay agent",
      "configuring the router to resolve IP address conflicts",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 7.3.1\nThe ip address dhcp interface configuration command configures an Ethernet interface as a DHCPv4 client. When the interface comes up, the router broadcasts DHCPDISCOVER messages and obtains its IP parameters (IPv4 address, subnet mask, and default gateway) from a DHCPv4 server.",
  },
  {
    number: 3,
    type: "single",
    text: "When a client is requesting an initial address lease from a DHCP server, why is the DHCPREQUEST message sent as a broadcast?",
    options: [
      "The client does not yet know the IP address of the DHCP server that sent the offer.",
      "The DHCP server may be on a different subnet, so the request must be sent as a broadcast.",
      "The client does not have a MAC address assigned yet, so it cannot send a unicast message at Layer 2.",
      "The client may have received offers from multiple servers, and the broadcast serves to implicitly decline those other offers.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 7.1.3\nDuring the initial DHCP exchange between a client and server, the client broadcasts a DHCPDISCOVER message looking for DHCP servers. Multiple servers may be configured to respond to this request with DHCPOFFER messages. The client will choose the lease from one of the servers by sending a DHCPREQUEST message. It sends this message as a broadcast so that the other DHCP servers that sent offers will know that their offers were declined and the corresponding address can go back into the pool.",
  },
  {
    number: 4,
    type: "single",
    text: "Which DHCP IPv4 message contains the following information?",
    code: "Destination address: 255.255.255.255\nClient IPv4 address: 0.0.0.0\nDefault gateway address: 0.0.0.0\nSubnet mask: 0.0.0.0",
    options: ["DHCPACK", "DHCPDISCOVER", "DHCPOFFER", "DHCPREQUEST"],
    correct: [1],
    explanation:
      "Explanation: Topic 7.1.3\nThe DHCPDISCOVER message is sent by a client that does not yet have an IPv4 address. The source IPv4 address is 0.0.0.0 and the destination is the broadcast address 255.255.255.255, because the client does not yet know the address of any DHCP server. The default gateway and subnet mask fields are also all zeros in this initial discovery message.",
  },
  {
    number: 5,
    type: "pair",
    text: "Place the options in the following order:",
    left: [
      "a client initiating a message to find a DHCP server",
      "a DHCP server responding to the initial request by a client",
      "the client accepting the IP address provided by the DHCP server",
      "the DHCP server confirming that the lease has been accepted",
    ],
    right: ["DHCPDISCOVER", "DHCPOFFER", "DHCPREQUEST", "DHCPACK"],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3 },
    explanation:
      "Explanation: Topic 7.1.3\nThe DHCP message exchange when a client first obtains a lease:\n1. DHCPDISCOVER — the client initiates the process to find available DHCP servers.\n2. DHCPOFFER — a DHCP server responds and suggests a lease to the client.\n3. DHCPREQUEST — the client accepts the IP address offered by the selected server.\n4. DHCPACK — the server confirms that the lease has been accepted and finalized.",
  },
  {
    number: 6,
    type: "multi",
    text: "Which protocol automates assignment of IP addresses on a network, and which port number does it use? (Choose two.)",
    choose: 2,
    options: ["DHCP", "DNS", "SMB", "53", "67", "80"],
    correct: [0, 4],
    explanation:
      "Explanation: Topic 7.1.1\nDHCP (Dynamic Host Configuration Protocol) automates the assignment of IPv4 addresses, subnet masks, gateways, and other IP parameters. DHCP messages are carried over UDP: the server listens on UDP port 67 and clients use UDP port 68.",
  },
  {
    number: 7,
    type: "single",
    text: "Refer to the exhibit. PC1 is configured to obtain a dynamic IP address from the DHCP server. PC1 has been shut down for two weeks. When PC1 boots and tries to request an available IP address, which destination IP address will PC1 place in the IP header?",
    exhibit: {
      src: "/images/modules-7-9/q7-exhibit.png",
      alt: "Exhibit for question 7: PC1 requesting an IP address from a DHCP server",
      width: 496,
      height: 319,
    },
    options: ["192.168.1.1", "192.168.1.255", "255.255.255.255", "192.168.1.8"],
    correct: [2],
    explanation:
      "Explanation: Topic 7.1.3\nWhen a host boots and has been configured for dynamic IP addressing, the device tries to obtain a valid IP address. It sends a DHCPDISCOVER message. This is a broadcast message because the DHCP server address is unknown (by design). The destination IP address in the IP header is 255.255.255.255 and the destination MAC address is FF:FF:FF:FF:FF:FF.",
  },
  {
    number: 8,
    type: "single",
    text: "Which message does an IPv4 host use to reply when it receives a DHCPOFFER message from a DHCP server?",
    options: ["DHCPOFFER", "DHCPDISCOVER", "DHCPREQUEST", "DHCPACK"],
    correct: [2],
    explanation:
      "Explanation: Topic 7.1.3\nWhen the client receives the DHCPOFFER from the server, it sends back a DHCPREQUEST broadcast message. On receiving the DHCPREQUEST message, the server replies with a unicast DHCPACK message.",
  },
  {
    number: 9,
    type: "single",
    text: "Which command, when issued in the interface configuration mode of a router, enables the interface to acquire an IPv4 address automatically from an ISP, when that link to the ISP is enabled?",
    options: ["service dhcp", "ip address dhcp", "ip helper-address", "ip dhcp pool"],
    correct: [1],
    explanation:
      "Explanation: Topic 7.3.1\nThe ip address dhcp interface configuration command configures an Ethernet interface as a DHCP client. The service dhcp global configuration command enables the DHCPv4 server process on the router. The ip helper-address command is issued to enable DHCP relay on the router. The ip dhcp pool command creates the name of a pool of addresses that the server can assign to hosts.",
  },
  {
    number: 10,
    type: "single",
    text: "Which kind of message is sent by a DHCP client when its IP address lease has expired?",
    options: [
      "a DHCPDISCOVER unicast message",
      "a DHCPREQUEST broadcast message",
      "a DHCPREQUEST unicast message",
      "a DHCPDISCOVER broadcast message",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 7.1.4\nWhen the IP address lease time of the DHCP client expires, it sends a DHCPREQUEST unicast message directly to the DHCPv4 server that originally offered the IPv4 address.",
  },
  {
    number: 11,
    type: "single",
    text: "A host PC is attempting to lease an address through DHCP. What message is sent by the server to let the client know it is able to use the provided IP information?",
    options: ["DHCPDISCOVER", "DHCPOFFER", "DHCPREQUEST", "DHCPACK", "DHCPNACK"],
    correct: [3],
    explanation:
      "Explanation: Topic 7.1.3\nWhen a host uses DHCP to automatically configure an IP address, it typically sends two messages: the DHCPDISCOVER message and the DHCPREQUEST message. These two messages are usually sent as broadcasts to ensure that all DHCP servers receive them. The servers respond to these messages using DHCPOFFER, DHCPACK, and DHCPNACK messages, depending on the circumstance.",
  },
  {
    number: 12,
    type: "single",
    text: "What is one indication that a Windows computer did not receive an IPv4 address from a DHCP server?",
    options: [
      "The computer cannot ping 127.0.0.1.",
      "The computer receives an IP address that starts with 169.254.",
      "Windows displays a DHCP timeout message.",
      "The computer cannot ping other devices on the same network with IP addresses in the 169.254.0.0/16 range.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 8.1.2\nWhen a Windows PC cannot communicate with an IPv4 DHCP server, the computer automatically assigns an IP address in the 169.254.0.0/16 range (Automatic Private IP Addressing). Any other device on the same network that receives an address in the same range is reachable.",
  },
  {
    number: 13,
    type: "single",
    text: "Which DHCPv4 message will a client send to accept an IPv4 address that is offered by a DHCP server?",
    options: [
      "broadcast DHCPACK",
      "broadcast DHCPREQUEST",
      "unicast DHCPACK",
      "unicast DHCPREQUEST",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 7.1.3\nWhen a DHCP client receives DHCPOFFER messages, it will send a broadcast DHCPREQUEST message for two purposes. First, it indicates to the offering DHCP server that it would like to accept the offer and bind the IP address. Second, it notifies any other responding DHCP servers that their offers are declined.",
  },
  {
    number: 14,
    type: "single",
    text: "A small coffee shop is offering free Wi-Fi to customers. The network includes a wireless router and a DSL modem that is connected to the local phone company. What method is typically used to configure the connection to the phone company?",
    options: [
      "Set the WAN connection in the wireless router as a DHCP client.",
      "Set the connection between the wireless router and the DSL modem as a private IP network.",
      "Set the DSL modem as a DHCP client to get a public IP address from the wireless router.",
      "Set the DSL modem as a DHCP client to the phone company and a DHCP server for the internal connection.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 7.3.3\nIn a SOHO environment, a wireless router connects to an ISP via a DSL or cable modem. The IP address between the wireless router and ISP site is typically assigned by the ISP through DHCP. The DSL modem does not manage IP address allocation.",
  },
  {
    number: 15,
    type: "multi",
    text: "A company uses DHCP to manage IP address deployment for employee workstations. The IT department deploys multiple DHCP servers in the data center and uses DHCP relay agents to facilitate the DHCP requests from workstations. Which two UDP ports are used to forward DHCP traffic? (Choose two.)",
    choose: 2,
    options: ["23", "53", "67", "68", "80"],
    correct: [2, 3],
    explanation:
      "Explanation: Topic 7.2.9\nThe DHCP protocol operates with 2 UDP ports. UDP port 67 is the destination port for DHCP servers, and DHCP clients use UDP port 68.",
  },
  {
    number: 16,
    type: "single",
    text: "A client device on an Ethernet segment needs an IP address in order to communicate on the network. A DHCP server with IP address 192.168.1.1 has been configured and enabled on the network. How will a client device obtain a usable IP address for this network?",
    options: [
      "Send a DHCPACK packet to the default gateway address.",
      "Use a statically configured IP address from the pool of IP addresses that is offered by the DHCP server.",
      "Send a DHCPDISCOVER message to physical address FF-FF-FF-FF-FF-FF.",
      "Send a DHCPREQUEST packet to IP address 255.255.255.255.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 7.1.3\nLike IP addressing, there is also a special MAC address for broadcast purposes: FF-FF-FF-FF-FF-FF. When a DHCP client needs to send a DHCPDISCOVER message in order to seek DHCP servers, the client will use this MAC address as the destination MAC address in the Ethernet frame. It does this because it has no knowledge of the IP and MAC addresses of DHCP servers.",
  },
  {
    number: 17,
    type: "single",
    text: "What is an advantage of configuring a Cisco router as a relay agent?",
    options: [
      "It can provide relay services for multiple UDP services.",
      "It reduces the response time from a DHCP server.",
      "It can forward both broadcast and multicast messages on behalf of clients.",
      "It will allow DHCPDISCOVER messages to pass without alteration.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 7.2.9\nBy default, the ip helper-address command forwards the following eight UDP services:\nPort 37: Time\nPort 49: TACACS\nPort 53: DNS\nPort 67: DHCP/BOOTP client\nPort 68: DHCP/BOOTP server\nPort 69: TFTP\nPort 137: NetBIOS name service\nPort 138: NetBIOS datagram service",
  },
  {
    number: 18,
    type: "single",
    text: "Which statement is true about DHCP operation?",
    options: [
      "When a device that is configured to use DHCP boots, the client broadcasts a DHCPDISCOVER message to identify any available DHCP servers on the network.",
      "A client must wait for lease expiration before it sends another DHCPREQUEST message.",
      "If the client receives several DHCPOFFER messages from different servers, it sends a unicast DHCPREQUEST message to the server from which it chooses to obtain the IP information.",
      "The DHCPDISCOVER message contains the IP address and subnet mask to be assigned, the IP address of the DNS server, and the IP address of the default gateway.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 7.1.3\nThe client broadcasts a DHCPDISCOVER message to identify any available DHCP servers on the network. A DHCP server replies with a DHCPOFFER message. This message offers to the client a lease that contains such information as the IP address and subnet mask to be assigned, the IP address of the DNS server, and the IP address of the default gateway. After the client receives the lease, the received information must be renewed through another DHCPREQUEST message prior to the lease expiration.",
  },
  {
    number: 19,
    type: "pair",
    text: "Order the DHCP message types as they would occur between a DHCP client and a DHCP server.",
    exhibit: {
      src: "/images/modules-7-9/q19-exhibit.jpg",
      alt: "Exhibit for question 19: DHCP message flow diagram",
      width: 927,
      height: 203,
    },
    left: ["Step 1", "Step 2", "Step 3", "Step 4"],
    right: ["DHCPDISCOVER", "DHCPOFFER", "DHCPREQUEST", "DHCPACK"],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3 },
    explanation:
      "Explanation: Topic 7.1.3\nThe DHCPDISCOVER message is used to identify any DHCP servers on a network.\nThe DHCPOFFER message is used by a server to offer a lease to a client.\nThe DHCPREQUEST message is used to identify both the specific DHCP server and the lease that the client is accepting.\nThe DHCPACK message is used by a server to finalize a successful lease with a client.\nThe DHCPNAK message is used when an offered lease is no longer valid.",
  },
  {
    number: 20,
    type: "single",
    text: "A network administrator configures a router to send RA messages with M flag as 0 and O flag as 1. Which statement describes the effect of this configuration when a PC tries to configure its IPv6 address?",
    options: [
      "It should contact a DHCPv6 server for the prefix, the prefix-length information, and an interface ID that is both random and unique.",
      "It should use the information that is contained in the RA message and contact a DHCPv6 server for additional information.",
      "It should use the information that is contained in the RA message exclusively.",
      "It should contact a DHCPv6 server for all the information that it needs.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 8.3.2\nICMPv6 RA messages contain two flags to indicate whether a workstation should use SLAAC, a DHCPv6 server, or a combination to configure its IPv6 address. These two flags are the M flag and the O flag. When both flags are 0 (by default), a client must only use the information in the RA message. When M flag is 0 and O flag is 1, a client should use the information in the RA message and look for the other configuration parameters (such as DNS server addresses) on DHCPv6 servers.",
  },
  {
    number: 21,
    type: "single",
    text: "Refer to the exhibit. What should be done to allow PC-A to receive an IPv6 address from the DHCPv6 server?",
    exhibit: {
      src: "/images/modules-7-9/q21-exhibit.png",
      alt: "Exhibit for question 21: PC-A and DHCPv6 server on different subnets",
      width: 700,
      height: 283,
    },
    options: [
      "Add the ipv6 dhcp relay command to interface Fa0/0.",
      "Change the ipv6 nd managed-config-flag command to ipv6 nd other-config-flag.",
      "Configure the ipv6 nd managed-config-flag command on interface Fa0/1.",
      "Add the IPv6 address 2001:DB8:1234:5678::10/64 to the interface configuration of the DHCPv6 server.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.4.7\nClient DHCPv6 messages are sent to a multicast address with link-local scope, which means that the messages will not be forwarded by routers. Because the client and server are on different subnets on different interfaces, the message will not reach the server. The router can be configured to relay the DHCPv6 messages from the client to the server by configuring the ipv6 dhcp relay command on the interface that is connected to the client.",
  },
  {
    number: 22,
    type: "single",
    text: "Refer to the exhibit. A network administrator is implementing the stateless DHCPv6 operation for the company. Clients are configuring IPv6 addresses as expected. However, the clients are not getting the DNS server address and the domain name information configured in the DHCP pool. What could be the cause of the problem?",
    exhibit: {
      src: "/images/modules-7-9/q22-exhibit.png",
      alt: "Exhibit for question 22: stateless DHCPv6 configuration output",
      width: 530,
      height: 327,
    },
    options: [
      "The DNS server address is not on the same network as the clients are on.",
      "The router is configured for SLAAC operation.",
      "The GigabitEthernet interface is not activated.",
      "The clients cannot communicate with the DHCPv6 server, evidenced by the number of active clients being 0.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 8.3.3\nThe router is configured for SLAAC operation because there is no configuration command to change the RA M and O flag value. By default, both M and O flags are set to 0. In order to permit stateless DHCPv6 operation, the interface command ipv6 nd other-config-flag should be issued. The GigabitEthernet interface is in working condition because clients can get RA messages and configure their IPv6 addresses as expected. Also, the fact that R1 is the DHCPv6 server and clients are getting RA messages indicates that clients can communicate with the DHCP server. The number of active clients is 0 because the DHCPv6 server does not maintain the state of clients IPv6 addresses (it is not configured for stateful DHCPv6 operation). The DNS server address issue is not relevant to the problem.",
  },
  {
    number: 23,
    type: "single",
    text: "Question as presented:\nA stateless DHCPv6 client would send a DHCPv6 INFORMATION-REQUEST message as step 3 in the process.",
    options: ["True", "False"],
    correct: [0],
    explanation:
      "Explanation: Topic 8.3.1\nIn the stateful DHCPv6 process, step 3 is the REQUEST message used by the client to accept the address offered by the server. A stateless DHCPv6 client does not obtain IPv6 addresses from the server — it only requests configuration parameters such as DNS server addresses and the domain name — so at that same step it sends a DHCPv6 INFORMATION-REQUEST message instead. The statement is true.",
  },
  {
    number: 24,
    type: "single",
    text: "A company uses the SLAAC method to configure IPv6 addresses for the employee workstations. Which address will a client use as its default gateway?",
    options: [
      "the global unicast address of the router interface that is attached to the network",
      "the unique local address of the router interface that is attached to the network",
      "the all-routers multicast address",
      "the link-local address of the router interface that is attached to the network",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 8.2.3\nWhen a PC is configured to use the SLAAC method for configuring IPv6 addresses, it will use the prefix and prefix-length information that is contained in the RA message, combined with a 64-bit interface ID (obtained by using the EUI-64 process or by using a random number that is generated by the client operating system), to form an IPv6 address. It uses the link-local address of the router interface that is attached to the LAN segment as its IPv6 default gateway address.",
  },
  {
    number: 25,
    type: "single",
    text: "Refer to the exhibit. A network administrator is configuring a router for DHCPv6 operation. Which conclusion can be drawn based on the commands?",
    exhibit: {
      src: "/images/modules-7-9/q25-exhibit.png",
      alt: "Exhibit for question 25: DHCPv6 configuration commands",
      width: 528,
      height: 229,
    },
    options: [
      "The router is configured for stateful DHCPv6 operation, but the DHCP pool configuration is incomplete.",
      "The DHCPv6 server name is ACAD_CLASS.",
      "Clients would configure the interface IDs above 0010.",
      "The router is configured for stateless DHCPv6 operation.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 8.3.3\nThe DHCPv6 configuration is for the stateless DHCPv6 operation that is indicated by changing the O flag to 1 and leaving the M flag as default, which is 0. Therefore, it is not configured for stateful DHCPv6 operation. Although the DNS server has the interface ID 0010, clients in stateless DHCPv6 operation will configure their interface IDs either by EUI-64 or a random number. The ACAD_CLASS is the name of the DHCP pool, not the DHCP server name.",
  },
  {
    number: 26,
    type: "single",
    text: "A network administrator is analyzing the features that are supported by different first-hop router redundancy protocols. Which statement describes a feature that is associated with HSRP?",
    options: [
      "HSRP uses active and standby routers.",
      "HSRP is nonproprietary.",
      "It allows load balancing between a group of redundant routers.",
      "It uses ICMP messages in order to assign the default gateway to hosts.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.2.1\nThe HSRP first-hop router redundancy protocol is Cisco proprietary and supports standby and active devices. VRRPv2 and VRRPv3 are nonproprietary. GLBP is Cisco proprietary and supports load balancing between a group of redundant routers.",
  },
  {
    number: 27,
    type: "single",
    text: "Refer to the exhibit. What protocol can be configured on gateway routers R1 and R2 that will allow traffic from the internal LAN to be load balanced across the two gateways to the Internet?",
    exhibit: {
      src: "/images/modules-7-9/q27-exhibit.png",
      alt: "Exhibit for question 27: two gateway routers R1 and R2 to the Internet",
      width: 595,
      height: 225,
    },
    options: ["GLBP", "PVST+", "PVST", "STP"],
    correct: [0],
    explanation:
      "Explanation: Topic 9.1.4\nGLBP, or Group Load Balancing Protocol, allows multiple routers to act as a single default gateway for hosts. GLBP load balances the traffic across the individual routers on a per host basis.",
  },
  {
    number: 28,
    type: "single",
    text: "Refer to the exhibit. A network engineer is troubleshooting host connectivity on a LAN that uses a first hop redundancy protocol. Which IPv4 gateway address should be configured on the host?",
    exhibit: {
      src: "/images/modules-7-9/q28-exhibit.png",
      alt: "Exhibit for question 28: LAN using a first hop redundancy protocol",
      width: 500,
      height: 355,
    },
    options: ["192.168.2.0", "192.168.2.1", "192.168.2.2", "192.168.2.100"],
    correct: [3],
    explanation:
      "Explanation: Topic 9.1.2\nThe host default gateway address should be the FHRP (in this case GLBP) virtual IP address.",
  },
  {
    number: 29,
    type: "single",
    text: "Refer to the exhibit. Which destination MAC address is used when frames are sent from the workstation to the default gateway?",
    exhibit: {
      src: "/images/modules-7-9/q29-exhibit.png",
      alt: "Exhibit for question 29: workstation sending frames to the default gateway",
      width: 577,
      height: 400,
    },
    options: [
      "MAC address of the virtual router",
      "MAC address of the standby router",
      "MAC addresses of both the forwarding and standby routers",
      "MAC address of the forwarding router",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.1.2\nThe IP address of the virtual router acts as the default gateway for all the workstations. Therefore, the MAC address that is returned by the Address Resolution Protocol to the workstation will be the MAC address of the virtual router.",
  },
  {
    number: 30,
    type: "single",
    text: "Question as presented:\nHot Standby Router Protocol (HSRP) is a Cisco-proprietary protocol that is designed to allow for transparent failover of a first-hop IPv4 device.",
    options: ["True", "False"],
    correct: [0],
    explanation:
      "Explanation: Topic 9.1.4\nHot Standby Router Protocol (HSRP) is a Cisco-proprietary first-hop router redundancy protocol. It provides transparent failover of the first-hop IPv4 default gateway by allowing two or more routers to share a virtual IP and virtual MAC address, with one router acting as the active router and another as the standby router. The statement is true.",
  },
  {
    number: 31,
    type: "single",
    text: "Which FHRP implementation is a Cisco-proprietary protocol that suppports IPv4 load sharing?",
    options: ["IRDP", "GLBP", "VRRPv3", "GLBP for IPv6"],
    correct: [1],
    explanation:
      "Explanation: Topic 9.1.4\nGLBP (Gateway Load Balancing Protocol) is a Cisco-proprietary FHRP that provides IPv4 load sharing: it allows multiple routers to act as a single default gateway and distributes traffic across the group on a per-host basis.",
  },
  {
    number: 32,
    type: "single",
    text: "The address pool of a DHCP server is configured with 10.92.71.0/25. The network administrator reserves 8 IP addresses for servers. How many IP addresses are left in the pool to be assigned to other hosts?",
    options: ["122", "118", "119", "108", "116"],
    correct: [1],
    explanation:
      "Explanation: Topic 7.2.2\nCalculate the maximum number of hosts available for the slash value and subtract the required static IP addresses required for the devices.\n/24 = 254 hosts\n/25 = 126 hosts\n/26 = 62 hosts\n/27 = 30 hosts\n/28 = 14 hosts\n126 hosts minus 8 reserved addresses = 118 addresses left in the pool.",
  },
  {
    number: 33,
    type: "single",
    text: "Question as presented:\nThe broadcast DHCPDISCOVER message finds DHCPv4 servers on the network. When the DHCPv4 server receives a DHCPDISCOVER message, it reserves an available IPv4 address to lease to the client and sends the unicast DHCPOFFER message to the requesting client. When the client receives the DHCPOFFER from the server, it sends back a DHCPREQUEST. On receiving the DHCPREQUEST message the server replies with a unicast DHCPACK message. DHCPREPLY and DHCPINFORMATION-REQUEST are DHCPv6 messages.",
    options: ["True", "False"],
    correct: [0],
    explanation:
      "Explanation: Topic 7.1.3\nThe statement correctly describes the DHCPv4 message exchange: the client broadcasts DHCPDISCOVER, the server responds with a unicast DHCPOFFER, the client replies with DHCPREQUEST, and the server finalizes the lease with a unicast DHCPACK. DHCPREPLY and DHCPINFORMATION-REQUEST are DHCPv6 messages, not DHCPv4 messages. The statement is true.",
  },
  {
    number: 34,
    type: "single",
    text: "After a host has generated an IPv6 address by using the DHCPv6 or SLAAC process, how does the host verify that the address is unique and therefore usable?",
    options: [
      "The host sends an ICMPv6 echo request message to the DHCPv6 or SLAAC-learned address and if no reply is returned, the address is considered unique.",
      "The host sends an ICMPv6 neighbor solicitation message to the DHCP or SLAAC-learned address and if no neighbor advertisement is returned, the address is considered unique.",
      "The host checks the local neighbor cache for the learned address and if the address is not cached, it is considered unique.",
      "The host sends an ARP broadcast to the local link and if no hosts send a reply, the address is considered unique.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 8.2.6\nBefore a host can actually configure and use an IPv6 address learned through SLAAC or DHCP, the host must verify that no other host is already using that address. To verify that the address is indeed unique, the host sends an ICMPv6 neighbor solicitation to the address. If no neighbor advertisement is returned, the host considers the address to be unique and configures it on the interface.",
  },
  {
    number: 35,
    type: "single",
    text: "Which statement describes HSRP?",
    options: [
      "It is used within a group of routers for selecting an active device and a standby device to provide gateway services to a LAN.",
      "It uses ICMP to allow IPv4 hosts to locate routers that provide IPv4 connectivity to remote IP networks.",
      "If the virtual router master fails, one router is elected as the virtual router master with the other routers acting as backups.",
      "It is an open standard protocol.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.1.4\nIt is VRRP that elects one router as the virtual router master, with the other routers acting as backups in case the virtual router master fails. HSRP is a Cisco-proprietary protocol. IRDP uses ICMP messages to allow IPv4 hosts to locate routers that provide IPv4 connectivity to other (nonlocal) IP networks. HSRP selects active and standby routers to provide gateway services to hosts on a LAN.",
  },
];