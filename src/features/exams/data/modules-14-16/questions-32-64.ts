import type { Question } from "../../lib/types";

/** Modules 14 - 16 (Routing Concepts and Configuration), questions 32-64. */
export const questions32to64: Question[] = [
  {
    number: 32,
    type: "single",
    text: "Refer to the exhibit. What routing solution will allow both PC A and PC B to access the Internet with the minimum amount of router CPU and network bandwidth utilization?",
    exhibit: {
      src: "/images/modules-14-16/q32-exhibit.gif",
      alt: "Exhibit for question 32: PC A and PC B accessing the Internet through R1 and Edge",
      width: 617,
      height: 394,
    },
    options: [
      "Configure a dynamic routing protocol between R1 and Edge and advertise all routes.",
      "Configure a static route from R1 to Edge and a dynamic route from Edge to R1.",
      "Configure a static default route from R1 to Edge, a default route from Edge to the Internet, and a static route from Edge to R1.",
      "Configure a dynamic route from R1 to Edge and a static route from Edge to R1.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 14.4.5\nTwo routes have to be created: a default route in R1 to reach Edge and a static route in Edge to reach R1 for the return traffic. This is a best solution once PC A and PC B belong to stub networks. Moreover, static routing consumes less bandwidth than dynamic routing.",
  },
  {
    number: 33,
    type: "single",
    text: "Refer to the exhibit. What would happen after the IT administrator enters the new static route?",
    exhibit: {
      src: "/images/modules-14-16/q33-exhibit.png",
      alt: "Exhibit for question 33: R1 routing table with RIP route to 172.16.1.0",
      width: 554,
      height: 354,
    },
    options: [
      "The 172.16.1.0 static route would be entered into the running-config but not shown in the routing table.",
      "The 172.16.1.0 route learned from RIP would be replaced with the 172.16.1.0 static route.",
      "The 0.0.0.0 default route would be replaced with the 172.16.1.0 static route.",
      "The 172.16.1.0 static route is added to the existing routes in the routing table.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 14.4.12\nA route will be installed in a routing table if there is not another routing source with a lower administrative distance. If a route with a lower administrative distance to the same destination network as a current route is entered, the route with the lower administrative distance will replace the route with a higher administrative distance.",
  },
  {
    number: 34,
    type: "multi",
    text: "What two pieces of information are needed in a fully specified static route to eliminate recursive lookups? (Choose two.)",
    choose: 2,
    options: [
      "the interface ID of the next-hop neighbor",
      "the interface ID exit interface",
      "the IP address of the exit interface",
      "the IP address of the next-hop neighbor",
      "the administrative distance for the destination network",
    ],
    correct: [1, 3],
    explanation:
      "Explanation: Topic 15.1.2\nA fully specified static route can be used to avoid recursive routing table lookups by the router. A fully specified static route contains both the IP address of the next-hop router and the ID of the exit interface.",
  },
  {
    number: 35,
    type: "single",
    text: "Refer to the exhibit. Which command will properly configure an IPv6 static route on R2 that will allow traffic from PC2 to reach PC1 without any recursive lookups by router R2?",
    exhibit: {
      src: "/images/modules-14-16/q35-exhibit.gif",
      alt: "Exhibit for question 35: R2 with PC1 and PC2 on separate networks",
      width: 503,
      height: 370,
    },
    options: [
      "R2(config)# ipv6 route ::/0 2001:db8:32::1",
      "R2(config)# ipv6 route 2001:db8:10:12::/64 S0/0/0",
      "R2(config)# ipv6 route 2001:db8:10:12::/64 2001:db8:32::1",
      "R2(config)# ipv6 route 2001:db8:10:12::/64 S0/0/1",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.2.4\nA nonrecursive route must have an exit interface specified from which the destination network can be reached. In this example 2001:db8:10:12::/64 is the destination network and R2 will use exit interface S0/0/0 to reach that network. Therefore, the static route would be ipv6 route 2001:db8:10:12::/64 S0/0/0.",
  },
  {
    number: 36,
    type: "single",
    text: "Refer to the exhibit. Which static route would an IT technician enter to create a backup route to the 172.16.1.0 network that is only used if the primary RIP learned route fails?",
    exhibit: {
      src: "/images/modules-14-16/q36-exhibit.png",
      alt: "Exhibit for question 36: R1 routing table with RIP route to 172.16.1.0",
      width: 554,
      height: 317,
    },
    options: [
      "ip route 172.16.1.0 255.255.255.0 s0/0/0",
      "ip route 172.16.1.0 255.255.255.0 s0/0/0 121",
      "ip route 172.16.1.0 255.255.255.0 s0/0/0 111",
      "ip route 172.16.1.0 255.255.255.0 s0/0/0 91",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.4.1\nA backup static route is called a floating static route. A floating static route has an administrative distance greater than the administrative distance of another static route or dynamic route.",
  },
  {
    number: 37,
    type: "single",
    text: "Open the PT Activity. Perform the tasks in the activity instructions and then answer the question.\nA user reports that PC0 cannot visit the web server www.server.com. Troubleshoot the network configuration to identify the problem.\nWhat is the cause of the problem?",
    exhibit: {
      src: "/images/modules-14-16/q37-exhibit.jpg",
      alt: "Exhibit for question 37: Packet Tracer activity screenshot",
      width: 665,
      height: 385,
    },
    options: [
      "The clock rate on one of the serial links is configured incorrectly.",
      "A serial interface on Branch is configured incorrectly.",
      "The DNS server address on PC0 is configured incorrectly.",
      "Routing between HQ and Branch is configured incorrectly.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 16.2.3\nIn order to allow communication to remote networks, proper routing, either static or dynamic, is necessary. Both routers must be configured with a routing method.",
  },
  {
    number: 38,
    type: "pair",
    text: "Match the routing table entry to the corresponding function. (Not all options are used.)",
    exhibit: {
      src: "/images/modules-14-16/q38-exhibit.jpg",
      alt: "Exhibit for question 38: routing table entry matching board",
      width: 581,
      height: 520,
    },
    left: ["Route source", "Destination network", "Metric", "Administrative distance"],
    right: [
      "Identifies how a route was learned",
      "Identifies the address of a remote network",
      "Identifies the value assigned to reach a remote network",
      "Identifies the trustworthiness of a route source",
      "Identifies the exit interface used to route a packet to a destination",
    ],
    correctPairs: { 0: 0, 1: 1, 2: 2, 3: 3 },
    explanation:
      "Explanation: Topic 14.4.3\nThe correct pairings are:\n- Route source → Identifies how a route was learned\n- Destination network → Identifies the address of a remote network\n- Metric → Identifies the value assigned to reach a remote network\n- Administrative distance → Identifies the trustworthiness of a route source\nThe option \"Identifies the exit interface used to route a packet to a destination\" is not used.",
  },
  {
    number: 39,
    type: "single",
    text: "Refer to the exhibit. PC A sends a request to Server B. What IPv4 address is used in the destination field in the packet as the packet leaves PC A?",
    exhibit: {
      src: "/images/modules-14-16/q39-exhibit.jpg",
      alt: "Exhibit for question 39: PC A sending a request to Server B",
      width: 682,
      height: 392,
    },
    options: ["192.168.11.1", "192.168.10.1", "192.168.12.16", "192.168.10.10"],
    correct: [2],
    explanation:
      "Explanation: Topic 14.2.2\nThe destination IP address in packets does not change along the path between the source and destination.",
  },
  {
    number: 40,
    type: "single",
    text: "Refer to the exhibit. What does R1 use as the MAC address of the destination when constructing the frame that will go from R1 to Server B?",
    exhibit: {
      src: "/images/modules-14-16/q40-exhibit.jpg",
      alt: "Exhibit for question 40: R1 forwarding a frame to Server B",
      width: 616,
      height: 379,
    },
    options: [
      "If the destination MAC address that corresponds to the IPv4 address is not in the ARP cache, R1 sends an ARP request.",
      "R1 uses the destination MAC address of S1.",
      "The packet is encapsulated into a PPP frame, and R1 adds the PPP destination address to the frame.",
      "R1 leaves the field blank and forwards the data to the PC.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 14.2.1\nCommunication inside a local network uses Address Resolution Protocol to obtain a MAC address from a known IPv4 address. A MAC address is needed to construct the frame in which the packet is encapsulated.",
  },
  {
    number: 41,
    type: "single",
    text: "What route would have the lowest administrative distance?",
    options: [
      "a route received through the OSPF routing protocol",
      "a directly connected network",
      "a static route",
      "a route received through the EIGRP routing protocol",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 14.4.12\nThe most believable route or the route with the lowest administrative distance is one that is directly connected to a router.",
  },
  {
    number: 42,
    type: "single",
    text: "What characteristic completes the following statement?\nWhen an IPv6 static route is configured, as a backup route to a static route in the routing table, the \"distance\" command is used with ......",
    options: [
      "the \"show ipv6 route static\" command.",
      "an administrative distance of 2.",
      "a destination host route with a /128 prefix.",
      "the interface type and interface number.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.4.1\nAn IPv6 floating static route is configured with a higher administrative distance than the primary route so that it only appears in the routing table when the primary route is removed. Because the primary route in this case is another static route (default administrative distance of 1), a backup route would use an administrative distance of 2.",
  },
  {
    number: 43,
    type: "single",
    text: "A router has used the OSPF protocol to learn a route to the 172.16.32.0/19 network. Which command will implement a backup floating static route to this network?",
    options: [
      "ip route 172.16.0.0 255.255.224.0 S0/0/0 100",
      "ip route 172.16.0.0 255.255.240.0 S0/0/0 200",
      "ip route 172.16.32.0 255.255.224.0 S0/0/0 200",
      "ip route 172.16.32.0 255.255.0.0 S0/0/0 100",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.4.1\nOSPF has an administrative distance of 110, so the floating static route must have an administrative distance higher than 110. Because the target network is 172.16.32.0/19, that static route must use the network 172.16.32.0 and a netmask of 255.255.224.0.",
  },
  {
    number: 44,
    type: "single",
    text: "Consider the following command:\nHow would an administrator test this configuration?",
    code: "ip route 192.168.10.0 255.255.255.0 10.10.10.2 5",
    options: [
      "Delete the default gateway route on the router.",
      "Manually shut down the router interface used as a primary route.",
      "Ping from the 192.168.10.0 network to the 10.10.10.2 address.",
      "Ping any valid address on the 192.168.10.0/24 network.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.4.3\nA floating static is a backup route that only appears in the routing table when the interface used with the primary route is down. To test a floating static route, the route must be in the routing table. Therefore, shutting down the interface used as a primary route would allow the floating static route to appear in the routing table.",
  },
  {
    number: 45,
    type: "single",
    text: "Refer to the exhibit. Which type of IPv6 static route is configured in the exhibit?",
    exhibit: {
      src: "/images/modules-14-16/q45-exhibit.gif",
      alt: "Exhibit for question 45: IPv6 static route configuration",
      width: 509,
      height: 61,
    },
    options: [
      "floating static route",
      "fully specified static route",
      "recursive static route",
      "directly attached static route",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.1.4\nThe route provided points to another address that must be looked up in the routing table. This makes the route a recursive static route.",
  },
  {
    number: 46,
    type: "single",
    text: "What characteristic completes the following statement?\nWhen an IPv6 static route is configured, it is first necessary to configure ......",
    options: [
      "the next-hop address of two different adjacent routers.",
      "the \"ipv6 unicast-routing\" command.",
      "an IPv6 link-local address on the adjacent router.",
      "an administrative distance of 2.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.1.4\nIPv6 routing must be enabled with the ipv6 unicast-routing global configuration command before IPv6 static routes can be configured and used by the router.",
  },
  {
    number: 47,
    type: "single",
    text: "Refer to the exhibit. Which interface will be the exit interface to forward a data packet that has the destination IP address 172.18.109.152?",
    code: "Gateway of last resort is not set.\n172.18.109.0/26 is variously subnetted, 7 subnets, 3 masks\nO 172.18.109.0/26 [110/10] via 172.18.32.1, 00:00:24, Serial0/0/0\nO 172.18.109.64/26 [110/20] via 172.18.32.6, 00:00:56, Serial 0/0/1\nO 172.18.109.128/26 [110/10] via 172.18.32.1, 00:00:24, Serial 0/0/0\nC 172.18.109.192/27 is directly connected, GigabitEthernet0/0\nL 172.18.109.193/27 is directly connected, GigabitEthernet0/0\nC 172.18.109.224/27 is directly connected, GigabitEthernet0/1\nL 172.18.109.225/27 is directly connected, GigabitEthernet0/1\n172.18.32.0/24 is variably subnetted, 4 subnets, 2 masks\nC 172.18.32.0/30 is directly connected, Serial0/0/0\nL 172.18.32.2/32 is directly connected, Serial0/0/0\nC 172.18.32.4/30 is directly connected, Serial0/0/1\nL 172.18.32.5/32 is directly connected, Serial0/0/1\nS 172.18.33.0/26 [1/0] via 172.18.32.1, 00:00:24, Serial0/0/0\nR1#",
    options: ["GigabitEthernet0/0", "GigabitEthernet0/1", "Serial0/0/0", "None, the packet will be dropped."],
    correct: [2],
    explanation:
      "Explanation: Topic 14.1.3\nThe destination address 172.18.109.152 falls within the 172.18.109.128/26 range (172.18.109.128 to 172.18.109.191), which is an OSPF route via 172.18.32.1. Because 172.18.32.1 is reachable through the directly connected 172.18.32.0/30 network, the packet exits Serial0/0/0.",
  },
  {
    number: 48,
    type: "single",
    text: "Refer to the exhibit. What will the router do with a packet that has a destination IP address of 192.168.12.227?",
    exhibit: {
      src: "/images/modules-14-16/q48-exhibit.jpg",
      alt: "Exhibit for question 48: router routing table for destination 192.168.12.227",
      width: 546,
      height: 209,
    },
    options: [
      "Drop the packet.",
      "Send the packet out the GigabitEthernet0/0 interface.",
      "Send the packet out the Serial0/0/0 interface.",
      "Send the packet out the GigabitEthernet0/1 interface.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 14.4.9\nAfter a router determines the destination network by ANDing the destination IP address with the subnet mask, the router examines the routing table for the resulting destination network number. When a match is found, the packet is sent to the interface associated with the network number. When no routing table entry is found for the particular network, the default gateway or gateway of last resort (if configured or known) is used. If there is no gateway of last resort, the packet is dropped. In this instance, the 192.168.12.224 network is not found in the routing table and the router uses the gateway of last resort. The gateway of last resort is the IP address of 209.165.200.226. The router knows this is an IP address that is associated with the 209.165.200.224 network. The router then proceeds to transmit the packet out the Serial0/0/0 interface, or the interface that is associated with 209.165.200.224.",
  },
  {
    number: 49,
    type: "single",
    text: "Consider the following command:\nWhich route would have to go down in order for this static route to appear in the routing table?",
    code: "ip route 192.168.10.0 255.255.255.0 10.10.10.2 5",
    options: [
      "a default route",
      "a static route to the 192.168.10.0/24 network",
      "an OSPF-learned route to the 192.168.10.0/24 network",
      "an EIGRP-learned route to the 192.168.10.0/24 network",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.4.1\nThe administrative distance of 5 added to the end of the static route creates a floating static route that will be placed in the routing table when the primary route to the same destination network goes down. By default, a static route to the 192.168.10.0/24 network has an administrative distance of 1. Therefore, the floating route with an administrative distance of 5 will not be placed into the routing table unless the previously entered static route to the 192.168.10.0/24 goes down or was never entered. Because the floating route has an administrative distance of 5, the route is preferred to an OSPF-learned route (with the administrative distance of 110) or an EIGRP-learned route (with the administrative distance of 110) to the same destination network.",
  },
  {
    number: 50,
    type: "multi",
    text: "What are two advantages of static routing over dynamic routing? (Choose two.)",
    choose: 2,
    options: [
      "Static routing is more secure because it does not advertise over the network.",
      "Static routing scales well with expanding networks.",
      "Static routing requires very little knowledge of the network for correct implementation.",
      "Static routing uses fewer router resources than dynamic routing.",
      "Static routing is relatively easy to configure for large networks.",
    ],
    correct: [0, 3],
    explanation:
      "Explanation: Topic 14.5.1\nStatic routing requires a thorough understanding of the entire network for proper implementation. It can be prone to errors and does not scale well for large networks. Static routing uses fewer router resources, because no computing is required for updating routes. Static routing can also be more secure because it does not advertise over the network.",
  },
  {
    number: 51,
    type: "single",
    text: "What characteristic completes the following statement?\nWhen an IPv6 static route is configured, it is possible that the same IPv6 link-local address is used for ...",
    options: [
      "a destination host route with a /128 prefix.",
      "the \"ipv6 unicast-routing\" command.",
      "the next-hop address of two different adjacent routers.",
      "an administrative distance of 2.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.2.6\nIPv6 link-local addresses are only unique on the local link, so the same link-local address can be used by two different adjacent routers as their next-hop address. When a link-local address is used as the next hop, the exit interface must also be specified.",
  },
  {
    number: 52,
    type: "single",
    text: "A network administrator configures the interface fa0/0 on the router R1 with the command ip address 172.16.1.254 255.255.255.0. However, when the administrator issues the command show ip route, the routing table does not show the directly connected network. What is the possible cause of the problem?",
    options: [
      "The subnet mask is incorrect for the IPv4 address.",
      "The configuration needs to be saved first.",
      "The interface fa0/0 has not been activated.",
      "No packets with a destination network of 172.16.1.0 have been sent to R1.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 14.4.4\nA directly connected network will be added to the routing table when these three conditions are met: (1) the interface is configured with a valid IP address; (2) it is activated with no shutdown command; and (3) it receives a carrier signal from another device that is connected to the interface. An incorrect subnet mask for an IPv4 address will not prevent its appearance in the routing table, although the error may prevent successful communications.",
  },
  {
    number: 53,
    type: "single",
    text: "Refer to the exhibit. What command would be used to configure a static route on R1 so that traffic from both LANs can reach the 2001:db8:1:4::/64 remote network?",
    exhibit: {
      src: "/images/modules-14-16/q53-exhibit.jpg",
      alt: "Exhibit for question 53: R1 with two LANs and the 2001:db8:1:4::/64 remote network",
      width: 451,
      height: 224,
    },
    options: [
      "ipv6 route 2001:db8:1:4::/64 2001:db8:1:3::1",
      "ipv6 route 2001:db8:1::/65 2001:db8:1:3::1",
      "ipv6 route ::/0 serial0/0/0",
      "ipv6 route 2001:db8:1:4::/64 2001:db8:1:3::2",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.2.2\nTo configure an IPv6 static route, use the ipv6 route command followed by the destination network. Then add either the IP address of the adjacent router or the interface R1 will use to transmit a packet to the 2001:db8:1:4::/64 network.",
  },
  {
    number: 54,
    type: "multi",
    text: "Refer to the exhibit. What two commands will change the next-hop address for the 10.0.0.0/8 network from 172.16.40.2 to 192.168.1.2? (Choose two.)",
    choose: 2,
    exhibit: {
      src: "/images/modules-14-16/q54-exhibit.jpg",
      alt: "Exhibit for question 54: static route next-hop change on router A",
      width: 346,
      height: 224,
    },
    options: [
      "A(config)# ip route 10.0.0.0 255.0.0.0 192.168.1.2",
      "A(config)# ip route 10.0.0.0 255.0.0.0 s0/0/0",
      "A(config)# no ip address 10.0.0.1 255.0.0.0 172.16.40.2",
      "A(config)# no network 10.0.0.0 255.0.0.0 172.16.40.2",
      "A(config)# no ip route 10.0.0.0 255.0.0.0 172.16.40.2",
    ],
    correct: [0, 4],
    explanation:
      "Explanation: Topic 15.1.3\nThe two required commands are A(config)# no ip route 10.0.0.0 255.0.0.0 172.16.40.2 and A(config)# ip route 10.0.0.0 255.0.0.0 192.168.1.2.",
  },
  {
    number: 55,
    type: "single",
    text: "Refer to the exhibit. Which interface will be the exit interface to forward a data packet that has the destination IP address 192.168.139.244?",
    code: "Gateway of last resort is not set.\n192.168.139.0/26 is variously subnetted, 7 subnets, 3 masks\nO 192.168.139.0/26 [110/10] via 192.168.70.1, 00:00:24, Serial0/0/0\nO 192.168.139.64/26 [110/20] via 192.168.70.6, 00:00:56, Serial 0/0/1\nO 192.168.139.128/26 [110/10] via 192.168.70.1, 00:00:24, Serial 0/0/0\nC 192.168.139.192/27 is directly connected, GigabitEthernet0/0\nL 192.168.139.193/27 is directly connected, GigabitEthernet0/0\nC 192.168.139.224/27 is directly connected, GigabitEthernet0/1\nL 192.168.139.225/27 is directly connected, GigabitEthernet0/1\n192.168.70.0/24 is variably subnetted, 4 subnets, 2 masks\nC 192.168.70.0/30 is directly connected, Serial0/0/0\nL 192.168.70.2/32 is directly connected, Serial0/0/0\nC 192.168.70.4/30 is directly connected, Serial0/0/1\nL 192.168.70.5/32 is directly connected, Serial0/0/1\nS 192.168.71.0/26 [1/0] via 192.168.70.1, 00:00:24, Serial0/0/0\nR1#",
    options: ["GigabitEthernet0/1", "None, the packet will be dropped.", "Serial0/0/1", "GigabitEthernet0/0"],
    correct: [0],
    explanation:
      "Explanation: Topic 14.1.3\nThe destination address 192.168.139.244 falls within the 192.168.139.224/27 range (192.168.139.224 to 192.168.139.255), which is directly connected through GigabitEthernet0/1, so that is the longest-prefix match and the exit interface.",
  },
  {
    number: 56,
    type: "single",
    text: "What characteristic completes the following statement?\nWhen an IPv6 static route is configured, a fully-specified configuration should be used with ...",
    options: [
      "::/0.",
      "the \"ipv6 unicast-routing\" command.",
      "the next-hop address of two different adjacent routers.",
      "a directly connected multiaccess network.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.2.6\nA fully specified IPv6 static route (one that includes both the next-hop address and the exit interface) should be used when the next hop is on a directly connected multiaccess network, so the router does not need a recursive lookup to determine the exit interface.",
  },
  {
    number: 57,
    type: "single",
    text: "Refer to the exhibit. Which interface will be the exit interface to forward a data packet that has the destination IP address 192.168.71.52?",
    code: "Gateway of last resort is not set.\n192.168.139.0/26 is variously subnetted, 7 subnets, 3 masks\nO 192.168.139.0/26 [110/10] via 192.168.70.1, 00:00:24, Serial0/0/0\nO 192.168.139.64/26 [110/20] via 192.168.70.6, 00:00:56, Serial 0/0/1\nO 192.168.139.128/26 [110/10] via 192.168.70.1, 00:00:24, Serial 0/0/0\nC 192.168.139.192/27 is directly connected, GigabitEthernet0/0\nL 192.168.139.193/27 is directly connected, GigabitEthernet0/0\nC 192.168.139.224/27 is directly connected, GigabitEthernet0/1\nL 192.168.139.225/27 is directly connected, GigabitEthernet0/1\n192.168.70.0/24 is variably subnetted, 4 subnets, 2 masks\nC 192.168.70.0/30 is directly connected, Serial0/0/0\nL 192.168.70.2/32 is directly connected, Serial0/0/0\nC 192.168.70.4/30 is directly connected, Serial0/0/1\nL 192.168.70.5/32 is directly connected, Serial0/0/1\nS 192.168.71.0/26 [1/0] via 192.168.70.1, 00:00:24, Serial0/0/0\nR1#",
    options: [
      "The packet will take the gateway of last resort.",
      "GigabitEthernet0/1",
      "Serial0/0/0",
      "None, the packet will be dropped.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 14.1.3\nThe only route for the 192.168.71.0/26 network (which includes 192.168.71.52) is the static route S 192.168.71.0/26 via 192.168.70.1. Because 192.168.70.1 is reachable through the directly connected 192.168.70.0/30 network, the packet exits Serial0/0/0.",
  },
  {
    number: 58,
    type: "single",
    text: "What characteristic completes the following statement?\nWhen an IPv6 static route is configured, the installation of the route can be verified with ......",
    options: [
      "a destination host route with a /128 prefix.",
      "the interface type and interface number.",
      "the \"show ipv6 route static\" command.",
      "an administrative distance of 2.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.2.7\nThe show ipv6 route static command displays only the IPv6 static routes in the routing table, so it is used to verify that an IPv6 static route has been installed.",
  },
  {
    number: 59,
    type: "single",
    text: "Refer to the exhibit. Which interface will be the exit interface to forward a data packet that has the destination IP address 10.55.99.78?",
    code: "Gateway of last resort is not set.\n10.55.99.0/26 is variously subnetted, 7 subnets, 3 masks\nO 10.55.99.0/26 [110/10] via 10.55.18.1, 00:00:24, Serial0/0/0\nO 10.55.99.64/26 [110/20] via 10.55.18.6, 00:00:56, Serial 0/0/1\nO 10.55.99.128/26 [110/10] via 10.55.18.1, 00:00:24, Serial 0/0/0\nC 10.55.99.192/27 is directly connected, GigabitEthernet0/0\nL 10.55.99.193/27 is directly connected, GigabitEthernet0/0\nC 10.55.99.224/27 is directly connected, GigabitEthernet0/1\nL 10.55.99.225/27 is directly connected, GigabitEthernet0/1\n10.55.18.0/24 is variably subnetted, 4 subnets, 2 masks\nC 10.55.18.0/30 is directly connected, Serial0/0/0\nL 10.55.18.2/32 is directly connected, Serial0/0/0\nC 10.55.18.4/30 is directly connected, Serial0/0/1\nL 10.55.18.5/32 is directly connected, Serial0/0/1\nS 10.55.19.0/26 [1/0] via 10.55.18.1, 00:00:24, Serial0/0/0\nR1#",
    options: ["None, the packet will be dropped.", "GigabitEthernet0/0", "GigabitEthernet0/1", "Serial0/0/1"],
    correct: [3],
    explanation:
      "Explanation: Topic 14.1.3\nThe destination address 10.55.99.78 falls within the 10.55.99.64/26 range (10.55.99.64 to 10.55.99.127), which is an OSPF route via 10.55.18.6. Because 10.55.18.6 is reachable through the directly connected 10.55.18.4/30 network, the packet exits Serial0/0/1.",
  },
  {
    number: 60,
    type: "single",
    text: "A network administrator configures the interface fa0/0 on the router R1 with the command ip address 172.16.1.254 255.255.255.0. However, when the administrator issues the command show ip route, the routing table does not show the directly connected network. What is the possible cause of the problem?",
    options: [
      "The subnet mask is incorrect for the IPv4 address.",
      "No packets with a destination network of 172.16.1.0 have been sent to R1.",
      "The configuration needs to be saved first.",
      "The interface fa0/0 has not been activated.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 14.4.4\nA directly connected network will be added to the routing table when these three conditions are met: (1) the interface is configured with a valid IP address; (2) it is activated with no shutdown command; and (3) it receives a carrier signal from another device that is connected to the interface. An incorrect subnet mask for an IPv4 address will not prevent its appearance in the routing table, although the error may prevent successful communications.",
  },
  {
    number: 61,
    type: "single",
    text: "Refer to the exhibit. Which interface will be the exit interface to forward a data packet that has the destination IP address 10.3.86.2?",
    code: "Gateway of last resort is not set.\n10.3.86.0/26 is variously subnetted, 7 subnets, 3 masks\nO 10.3.86.0/26 [110/10] via 10.3.2.1, 00:00:24, Serial0/0/0\nO 10.3.86.64/26 [110/20] via 10.3.2.6, 00:00:56, Serial 0/0/1\nO 10.3.86.128/26 [110/10] via 10.3.2.1, 00:00:24, Serial 0/0/0\nC 10.3.86.192/27 is directly connected, GigabitEthernet0/0\nL 10.3.86.193/27 is directly connected, GigabitEthernet0/0\nC 10.3.86.224/27 is directly connected, GigabitEthernet0/1\nL 10.3.86.225/27 is directly connected, GigabitEthernet0/1\n10.3.2.0/24 is variably subnetted, 4 subnets, 2 masks\nC 10.3.2.0/30 is directly connected, Serial0/0/0\nL 10.3.2.2/32 is directly connected, Serial0/0/0\nC 10.3.2.4/30 is directly connected, Serial0/0/1\nL 10.3.2.5/32 is directly connected, Serial0/0/1\nS 10.3.3.0/26 [1/0] via 10.3.2.1, 00:00:24, Serial0/0/0\nR1#",
    options: ["GigabitEthernet0/1", "Serial0/0/1", "GigabitEthernet0/0", "Serial0/0/0"],
    correct: [3],
    explanation:
      "Explanation: Topic 14.1.3\nThe destination address 10.3.86.2 falls within the 10.3.86.0/26 range (10.3.86.0 to 10.3.86.63), which is an OSPF route via 10.3.2.1. Because 10.3.2.1 is reachable through the directly connected 10.3.2.0/30 network, the packet exits Serial0/0/0.",
  },
  {
    number: 62,
    type: "pair",
    text: "Match the characteristic to the corresponding type of routing. (Not all options are used.)\nPlace the options in the following order.",
    allowMultiMatch: true,
    exhibit: {
      src: "/images/modules-14-16/q62-exhibit.jpg",
      alt: "Exhibit for question 62: static and dynamic routing characteristics matching board",
      width: 754,
      height: 534,
    },
    left: [
      "typically used on stub networks",
      "new networks are added automatically to the routing table",
      "less routing overhead",
      "best choice for large networks",
      "not suitable for topologies where more than one router is required",
    ],
    right: ["static routing", "dynamic routing"],
    correctPairs: { 0: 0, 1: 1, 2: 0, 3: 1, 4: 0 },
    explanation:
      "Explanation: Topic 14.5.1\nThe correct pairings are:\n- typically used on stub networks → static routing\n- new networks are added automatically to the routing table → dynamic routing\n- less routing overhead → static routing\n- best choice for large networks → dynamic routing\n- not suitable for topologies where more than one router is required → static routing\nBoth static and dynamic routing could be used when more than one router is involved. Dynamic routing is when a routing protocol is used. Static routing is when every remote route is entered manually by an administrator into every router in the network topology.",
  },
  {
    number: 63,
    type: "single",
    text: "Refer to the exhibit. Which interface will be the exit interface to forward a data packet that has the destination IP address 172.25.128.244?",
    code: "Gateway of last resort is not set.\n172.25.128.0/26 is variously subnetted, 7 subnets, 3 masks\nO 172.25.128.0/26 [110/10] via 172.25.56.1, 00:00:24, Serial0/0/0\nO 172.25.128.64/26 [110/20] via 172.25.56.6, 00:00:56, Serial 0/0/1\nO 172.25.128.128/26 [110/10] via 172.25.56.1, 00:00:24, Serial 0/0/0\nC 172.25.128.192/27 is directly connected, GigabitEthernet0/0\nL 172.25.128.193/27 is directly connected, GigabitEthernet0/0\nC 172.25.128.224/27 is directly connected, GigabitEthernet0/1\nL 172.25.128.225/27 is directly connected, GigabitEthernet0/1\n172.25.56.0/24 is variably subnetted, 4 subnets, 2 masks\nC 172.25.56.0/30 is directly connected, Serial0/0/0\nL 172.25.56.2/32 is directly connected, Serial0/0/0\nC 172.25.56.4/30 is directly connected, Serial0/0/1\nL 172.25.56.5/32 is directly connected, Serial0/0/1\nS 172.25.57.0/26 [1/0] via 172.25.56.1, 00:00:24, Serial0/0/0\nR1#",
    options: ["GigabitEthernet0/0", "GigabitEthernet0/1", "None, the packet will be dropped.", "Serial0/0/1"],
    correct: [1],
    explanation:
      "Explanation: Topic 14.1.3\nThe destination address 172.25.128.244 falls within the 172.25.128.224/27 range (172.25.128.224 to 172.25.128.255), which is directly connected through GigabitEthernet0/1, so that is the longest-prefix match and the exit interface.",
  },
  {
    number: 64,
    type: "single",
    text: "Which static route is configured here?",
    code: "ipv6 route 2001:0DB8::/32 2001:0DB8:3000::1",
    options: [
      "Floating static",
      "Recursive static",
      "Directly attached static",
      "Fully specified static",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.1.2\nThe router has to look up in the routing table twice to find the exit interface. The first lookup is shown in the question; then the router has to look up which interface (e.g., s0/0/0) the 2001:0DB8:3000::1 address is associated with (e.g., 2001:0DB8:3000::1 is directly connected, Serial0/0/0). This second lookup to find the exit interface makes the route a recursive static route.",
  },
];