import type { Question } from "../../lib/types";

/** Modules 14 - 16 (Routing Concepts and Configuration), questions 1-31 (the dump has no question 11). */
export const questions1to31: Question[] = [
  {
    number: 1,
    type: "single",
    text: "Which feature on a Cisco router permits the forwarding of traffic for which there is no specific route?",
    options: ["next-hop", "gateway of last resort", "route source", "outgoing interface"],
    correct: [1],
    explanation:
      "Explanation: Topic 14.4.9\nA default static route is used as a gateway of last resort to forward unknown destination traffic to a next hop/exit interface. The next-hop or exit interface is the destination to send traffic to on a network after the traffic is matched in a router. The route source is the location a route was learned from.",
  },
  {
    number: 2,
    type: "multi",
    text: "Which three advantages are provided by static routing? (Choose three.)",
    choose: 3,
    options: [
      "Static routing does not advertise over the network, thus providing better security.",
      "Configuration of static routes is error-free.",
      "Static routes scale well as the network grows.",
      "Static routing typically uses less network bandwidth and fewer CPU operations than dynamic routing does.",
      "The path a static route uses to send data is known.",
      "No intervention is required to maintain changing route information.",
    ],
    correct: [0, 3, 4],
    explanation:
      "Explanation: Topic 14.5.1\nStatic routes are prone to errors from incorrect configuration by the administrator. They do not scale well, because the routes must be manually reconfigured to accommodate a growing network. Intervention is required each time a route change is necessary. They do provide better security, use less bandwidth, and provide a known path to the destination.",
  },
  {
    number: 3,
    type: "multi",
    text: "What are two functions of dynamic routing protocols? (Choose two.)",
    choose: 2,
    options: [
      "to maintain routing tables",
      "to assure low router overhead",
      "to avoid exposing network information",
      "to discover the network",
      "to choose the path that is specified by the administrator",
    ],
    correct: [0, 3],
    explanation:
      "Explanation: Topic 14.5.3\nDynamic routing protocols exist to discover the network, maintain routing tables, and calculate the best path. Having low levels of routing overhead, using the path specified by the administrator, and avoiding the exposure of network information are functions of static routing.",
  },
  {
    number: 4,
    type: "single",
    text: "What is an advantage of using dynamic routing protocols instead of static routing?",
    options: [
      "easier to implement",
      "more secure in controlling routing updates",
      "fewer router resource overhead requirements",
      "ability to actively search for new routes if the current path becomes unavailable",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 14.5.3\nDynamic routing has the ability to search and find a new best path if the current path is no longer available. The other options are actually the advantages of static routing.",
  },
  {
    number: 5,
    type: "single",
    text: "What happens to a static route entry in a routing table when the outgoing interface associated with that route goes into the down state?",
    options: [
      "The static route is removed from the routing table.",
      "The router polls neighbors for a replacement route.",
      "The router automatically redirects the static route to use another interface.",
      "The static route remains in the table because it was defined as static.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 14.1.6\nWhen the interface associated with a static route goes down, the router will remove the route because it is no longer valid.",
  },
  {
    number: 6,
    type: "single",
    text: "What is a characteristic of a static route that matches all packets?",
    options: [
      "It uses a single network address to send multiple static routes to one destination address.",
      "It identifies the gateway IP address to which the router sends all IP packets for which it does not have a learned or static route.",
      "It backs up a route already discovered by a dynamic routing protocol.",
      "It is configured with a higher administrative distance than the original dynamic routing protocol has.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.3.1\nA default static route is a route that matches all packets. It identifies the gateway IP address to which the router sends all IP packets for which it does not have a learned or static route. A default static route is simply a static route with 0.0.0.0/0 as the destination IPv4 address. Configuring a default static route creates a gateway of last resort.",
  },
  {
    number: 7,
    type: "single",
    text: "When would it be more beneficial to use a dynamic routing protocol instead of static routing?",
    options: [
      "in an organization where routers suffer from performance issues",
      "on a stub network that has a single exit point",
      "in an organization with a smaller network that is not expected to grow in size",
      "on a network where there is a lot of topology changes",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 14.5.1\nDynamic routing protocols consume more router resources, are suitable for larger networks, and are more useful on networks that are growing and changing.",
  },
  {
    number: 8,
    type: "single",
    text: "Which route would be used to forward a packet with a source IP address of 192.168.10.1 and a destination IP address of 10.1.1.1?",
    options: [
      "C 192.168.10.0/30 is directly connected, GigabitEthernet0/1",
      "O 10.1.1.0/24 [110/65] via 192.168.200.2, 00:01:20, Serial0/1/0",
      "S* 0.0.0.0/0 [1/0] via 172.16.1.1",
      "S 10.1.0.0/16 is directly connected, GigabitEthernet0/0",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 14.1.3\nEven though OSPF has a higher administrative distance value (less trustworthy), the best match is the route in the routing table that has the most number of far left matching bits.",
  },
  {
    number: 9,
    type: "single",
    text: "Refer to the exhibit. What is the administrative distance value of the route for router R1 to reach the destination IPv6 address of 2001:DB8:CAFE:4::A?",
    exhibit: {
      src: "/images/modules-14-16/q9-exhibit.png",
      alt: "Exhibit for question 9: R1 IPv6 routing table excerpt",
      width: 569,
      height: 200,
    },
    options: ["120", "110", "1", "4"],
    correct: [0],
    explanation:
      "Explanation: Topic 14.4.3\nThe RIP route with the source code R is used to forward data to the destination IPv6 address of 2001:DB8:CAFE:4::A. This route has an AD value of 120.",
  },
  {
    number: 10,
    type: "single",
    text: "Which value in a routing table represents trustworthiness and is used by the router to determine which route to install into the routing table when there are multiple routes toward the same destination?",
    options: ["administrative distance", "metric", "outgoing interface", "routing protocol"],
    correct: [0],
    explanation:
      "Explanation: Topic 14.4.12\nThe administrative distance represents the trustworthiness of a particular route. The lower an administrative distance, the more trustworthy the learned route is. When a router learns multiple routes toward the same destination, the router uses the administrative distance value to determine which route to place into the routing table. A metric is used by a routing protocol to compare routes received from the routing protocol. An exit interface is the interface used to send a packet in the direction of the destination network. A routing protocol is used to exchange routing updates between two or more adjacent routers.",
  },
  {
    number: 12,
    type: "single",
    text: "Refer to the graphic. Which command would be used on router A to configure a static route to direct traffic from LAN A that is destined for LAN C?",
    exhibit: {
      src: "/images/modules-14-16/q12-exhibit.png",
      alt: "Exhibit for question 12: router A with LAN A, LAN B, and LAN C",
      width: 516,
      height: 291,
    },
    options: [
      "A(config)# ip route 192.168.3.0 255.255.255.0 192.168.3.1",
      "A(config)# ip route 192.168.3.2 255.255.255.0 192.168.4.0",
      "A(config)# ip route 192.168.4.0 255.255.255.0 192.168.5.2",
      "A(config)# ip route 192.168.5.0 255.255.255.0 192.168.3.2",
      "A(config)# ip route 192.168.4.0 255.255.255.0 192.168.3.2",
    ],
    correct: [4],
    explanation:
      "Explanation: Topic 15.2.1\nThe destination network on LAN C is 192.168.4.0 and the next-hop address from the perspective of router A is 192.168.3.2.",
  },
  {
    number: 13,
    type: "multi",
    text: "On which two routers would a default static route be configured? (Choose two.)",
    choose: 2,
    options: [
      "any router where a backup route to dynamic routing is needed for reliability",
      "the router that serves as the gateway of last resort",
      "any router running an IOS prior to 12.0",
      "stub router connection to the rest of the corporate or campus network",
      "edge router connection to the ISP",
    ],
    correct: [3, 4],
    explanation:
      "Explanation: Topic 15.3.1\nA stub router or an edge router connected to an ISP has only one other router as a connection. A default static route works in those situations because all traffic will be sent to one destination. The destination router is the gateway of last resort. The default route is not configured on the gateway, but on the router sending traffic to the gateway. The router IOS does not matter.",
  },
  {
    number: 14,
    type: "single",
    text: "Refer to the exhibit. This network has two connections to the ISP, one via router C and one via router B. The serial link between router A and router C supports EIGRP and is the primary link to the Internet. If the primary link fails, the administrator needs a floating static route that avoids recursive route lookups and any potential next-hop issues caused by the multiaccess nature of the Ethernet segment with router B. What should the administrator configure?",
    exhibit: {
      src: "/images/modules-14-16/q14-exhibit.png",
      alt: "Exhibit for question 14: router A with two ISP connections via routers B and C",
      width: 493,
      height: 198,
    },
    options: [
      "Create a static route pointing to 10.1.1.1 with an AD of 95.",
      "Create a fully specified static route pointing to Fa0/0 with an AD of 1.",
      "Create a fully specified static route pointing to Fa0/0 with an AD of 95.",
      "Create a static route pointing to 10.1.1.1 with an AD of 1.",
      "Create a static route pointing to Fa0/0 with an AD of 1.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.2.5\nA floating static route is a static route with an administrative distance higher than that of another route already in the routing table. If the route in the table disappears, the floating static route will be put into the routing table in its place. Internal EIGRP has an AD of 90, so a floating static route in this scenario would need to have an AD higher than 90. Also, when creating a static route to a multiaccess interface like a FastEthernet segment a fully specified route should be used, with both a next-hop IP address and an exit interface. This prevents the router from doing a recursive lookup, but still ensures the correct next-hop device on the multiaccess segment forwards the packet.",
  },
  {
    number: 15,
    type: "single",
    text: "What is a characteristic of a floating static route?",
    options: [
      "When it is configured, it creates a gateway of last resort.",
      "It is used to provide load balancing between static routes.",
      "It is simply a static route with 0.0.0.0/0 as the destination IPv4 address.",
      "It is configured with a higher administrative distance than the original dynamic routing protocol has.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.4.1\nFloating static routes are static routes used to provide a backup path to a primary static or dynamic route, in the event of a link failure. They must be configured with a higher administrative distance than the original dynamic routing protocol has. A default static route is simply a static route with 0.0.0.0/0 as the destination IPv4 address. Configuring a default static route creates a gateway of last resort.",
  },
  {
    number: 16,
    type: "single",
    text: "What network prefix and prefix-length combination is used to create a default static route that will match any IPv6 destination?",
    options: ["FFFF::/128", "::1/64", "::/128", "::/0"],
    correct: [3],
    explanation:
      "Explanation: Topic 15.3.1\nA default static route configured for IPv6, is a network prefix of all zeros and a prefix mask of 0 which is expressed as ::/0.",
  },
  {
    number: 17,
    type: "single",
    text: "Consider the following command:\nWhat does the 5 at the end of the command signify?",
    code: "ip route 192.168.10.0 255.255.255.0 10.10.10.2 5",
    options: [
      "exit interface",
      "maximum number of hops to the 192.168.10.0/24 network",
      "metric",
      "administrative distance",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.1.3\nThe 5 at the end of the command signifies administrative distance. This value is added to floating static routes or routes that only appear in the routing table when the preferred route has gone down. The 5 at the end of the command signifies administrative distance configured for the static route. This value indicates that the floating static route will appear in the routing table when the preferred route (with an administrative distance less than 5) is down.",
  },
  {
    number: 18,
    type: "single",
    text: "Refer to the exhibit. The routing table for R2 is as follows:\nWhat will router R2 do with a packet destined for 192.168.10.129?",
    code: "Gateway of last resort is not set\n10.0.0.0/30 is subnetted, 2 subnets\nC 10.0.0.0 is directly connected, Serial0/0/0\nC 10.0.0.4 is directly connected, Serial0/0/1\n192.168.10.0/26 is subnetted, 3 subnets\nS 192.168.10.0 is directly connected, Serial0/0/0\nC 192.168.10.64 is directly connected, FastEthernet0/0\nS 192.168.10.128 [1/0] via 10.0.0.6",
    exhibit: {
      src: "/images/modules-14-16/q18-exhibit.png",
      alt: "Exhibit for question 18: R2 routing table topology",
      width: 553,
      height: 362,
    },
    options: [
      "send the packet out interface FastEthernet0/0",
      "send the packet out interface Serial0/0/1",
      "drop the packet",
      "send the packet out interface Serial0/0/0",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.2.1\nWhen a static route is configured with the next hop address (as in the case of the 192.168.10.128 network), the output of the show ip route command lists the route as \"via\" a particular IP address. The router has to look up that IP address to determine which interface to send the packet out. Because the IP address of 10.0.0.6 is part of network 10.0.0.4, the router sends the packet out interface Serial0/0/1.",
  },
  {
    number: 19,
    type: "single",
    text: "An administrator issues the ipv6 route 2001:db8:acad:1::/32 gigabitethernet0/0 2001:db8:acad:6::1 100 command on a router. What administrative distance is assigned to this route?",
    options: ["0", "1", "32", "100"],
    correct: [3],
    explanation:
      "Explanation: Topic 15.1.4\nThe command ipv6 route 2001:db8:acad:1::/32 gigabitethernet0/0 2001:db8:acad:6::1 100 will configure a floating static route on a router. The 100 at the end of the command specifies the administrative distance of 100 to be applied to the route.",
  },
  {
    number: 20,
    type: "single",
    text: "Refer to the exhibit. Which default static route command would allow R1 to potentially reach all unknown networks on the Internet?",
    exhibit: {
      src: "/images/modules-14-16/q20-exhibit.jpg",
      alt: "Exhibit for question 20: R1 with two links toward R2 and the Internet",
      width: 757,
      height: 443,
    },
    options: [
      "R1(config)# ipv6 route 2001:db8:32::/64 G0/0",
      "R1(config)# ipv6 route ::/0 G0/0 fe80::2",
      "R1(config)# ipv6 route 2001:db8:32::/64 G0/1 fe80::2",
      "R1(config)# ipv6 route ::/0 G0/1 fe80::2",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.2.6\nTo route packets to unknown IPv6 networks a router will need an IPv6 default route. The static route ipv6 route ::/0 G0/1 fe80::2 will match all networks and send packets out the specified exit interface G0/1 toward R2.",
  },
  {
    number: 21,
    type: "single",
    text: "Refer to the exhibit. The network engineer for the company that is shown wants to use the primary ISP connection for all external connectivity. The backup ISP connection is used only if the primary ISP connection fails. Which set of commands would accomplish this goal?",
    exhibit: {
      src: "/images/modules-14-16/q21-exhibit.jpg",
      alt: "Exhibit for question 21: company with primary and backup ISP connections",
      width: 411,
      height: 303,
    },
    options: [
      "ip route 0.0.0.0 0.0.0.0 s0/0/0\nip route 0.0.0.0 0.0.0.0 s0/1/0",
      "ip route 0.0.0.0 0.0.0.0 s0/0/0\nip route 0.0.0.0 0.0.0.0 s0/1/0 10",
      "ip route 198.133.219.24 255.255.255.252\nip route 64.100.210.80 255.255.255.252 10",
      "ip route 198.133.219.24 255.255.255.252\nip route 64.100.210.80 255.255.255.252",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.4.1\nA static route that has no administrative distance added as part of the command has a default administrative distance of 1. The backup link should have a number higher than 1. The correct answer has an administrative distance of 10. The other quad zero route would load balance packets across both links and both links would appear in the routing table. The remaining answers are simply static routes (either a default route or a floating static default route).",
  },
  {
    number: 22,
    type: "single",
    text: "Refer to the exhibit. Which set of commands will configure static routes that will allow the Park and the Alta routers to a) forward packets to each LAN and b) direct all other traffic to the Internet?",
    exhibit: {
      src: "/images/modules-14-16/q22-exhibit.png",
      alt: "Exhibit for question 22: Park and Alta routers with LANs and Internet connection",
      width: 513,
      height: 386,
    },
    options: [
      "Park(config)# ip route 0.0.0.0 0.0.0.0 192.168.14.1\nAlta(config)# ip route 10.0.234.0 255.255.255.0 192.168.14.2\nAlta(config)# ip route 0.0.0.0 0.0.0.0 s0/0/0",
      "Park(config)# ip route 0.0.0.0 0.0.0.0 192.168.14.1\nAlta(config)# ip route 10.0.234.0 255.255.255.0 192.168.14.2\nAlta(config)# ip route 198.18.222.0 255.255.255.255 s0/0/0",
      "Park(config)# ip route 172.16.67.0 255.255.255.0 192.168.14.1\nPark(config)# ip route 0.0.0.0 0.0.0.0 192.168.14.1\nAlta(config)# ip route 10.0.234.0 255.255.255.0 192.168.14.2",
      "Park(config)# ip route 172.16.67.0 255.255.255.0 192.168.14.1\nAlta(config)# ip route 10.0.234.0 255.255.255.0 192.168.14.2\nAlta(config)# ip route 0.0.0.0 0.0.0.0 s0/0/1",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 15.3.1\nThe LAN connected to the router Park is a stub network, therefore, a default route should be used to forward network traffic destined to non-local networks. The router Alta connects to both the internet and the Park router, it would require two static routes configured, one toward the internet and the other toward the LAN connected to the router Park.",
  },
  {
    number: 23,
    type: "single",
    text: "Refer to the exhibit. The small company shown uses static routing. Users on the R2 LAN have reported a problem with connectivity. What is the issue?",
    exhibit: {
      src: "/images/modules-14-16/q23-exhibit.png",
      alt: "Exhibit for question 23: small company with static routing between R1 and R2",
      width: 683,
      height: 426,
    },
    options: [
      "R1 needs a static route to the R2 LAN.",
      "R2 needs a static route to the R1 LANs.",
      "R1 needs a default route to R2.",
      "R2 needs a static route to the Internet.",
      "R1 and R2 must use a dynamic routing protocol.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 14.4.2\nR1 has a default route to the Internet. R2 has a default route to R1. R1 is missing a static route for the 10.0.60.0 network. Any traffic that reached R1 and is destined for 10.0.60.0/24 will be routed to the ISP.",
  },
  {
    number: 24,
    type: "single",
    text: "Refer to the exhibit. An administrator is attempting to install an IPv6 static route on router R1 to reach the network attached to router R2. After the static route command is entered, connectivity to the network is still failing. What error has been made in the static route configuration?",
    exhibit: {
      src: "/images/modules-14-16/q24-exhibit.jpg",
      alt: "Exhibit for question 24: IPv6 static route configuration on R1",
      width: 978,
      height: 421,
    },
    options: [
      "The next hop address is incorrect.",
      "The interface is incorrect.",
      "The destination network is incorrect.",
      "The network prefix is incorrect.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.1.4\nIn this example the interface in the static route is incorrect. The interface should be the exit interface on R1, which is s0/0/0.",
  },
  {
    number: 25,
    type: "single",
    text: "Refer to the exhibit. How was the host route 2001:DB8:CAFE:4::1/128 installed in the routing table?",
    exhibit: {
      src: "/images/modules-14-16/q25-exhibit.png",
      alt: "Exhibit for question 25: R1 IPv6 routing table with a host route",
      width: 433,
      height: 405,
    },
    options: [
      "The route was dynamically created by router R1.",
      "The route was dynamically learned from another router.",
      "The route was manually entered by an administrator.",
      "The route was automatically installed when an IP address was configured on an active interface.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.5.3\nA host route is an IPv6 route with a 128-bit mask. A host route can be installed in a routing table automatically when an IP address is configured on a router interface or manually if a static route is created.",
  },
  {
    number: 26,
    type: "multi",
    text: "Refer to the exhibit. HostA is attempting to contact ServerB. Which two statements correctly describe the addressing that HostA will generate in the process? (Choose two.)",
    choose: 2,
    exhibit: {
      src: "/images/modules-14-16/q26-exhibit.png",
      alt: "Exhibit for question 26: HostA contacting ServerB across routers",
      width: 392,
      height: 320,
    },
    options: [
      "A packet with the destination IP address of RouterA.",
      "A frame with the destination MAC address of SwitchA.",
      "A packet with the destination IP address of ServerB.",
      "A frame with the destination MAC address of RouterA.",
      "A frame with the destination MAC address of ServerB.",
      "A packet with the destination IP address of RouterB.",
    ],
    correct: [2, 3],
    explanation:
      "Explanation: Topic 14.2.2\nIn order to send data to ServerB, HostA will generate a packet that contains the IP address of the destination device on the remote network and a frame that contains the MAC address of the default gateway device on the local network.",
  },
  {
    number: 27,
    type: "single",
    text: "Refer to the exhibit. A ping from R1 to 10.1.1.2 is successful, but a ping from R1 to any address in the 192.168.2.0 network fails. What is the cause of this problem?",
    exhibit: {
      src: "/images/modules-14-16/q27-exhibit.jpg",
      alt: "Exhibit for question 27: R1 static route to the 192.168.2.0 network",
      width: 612,
      height: 380,
    },
    options: [
      "There is no gateway of last resort at R1.",
      "The static route for 192.168.2.0 is incorrectly configured.",
      "A default route is not configured on R1.",
      "The serial interface between the two routers is down.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.2.1\nThe ping to 10.1.1.2 succeeds because that address is on a directly connected serial link, so the link between the routers is up. The failure to reach the 192.168.2.0 network means the static route for that network is not correctly configured (for example, the wrong next-hop address or exit interface), so R1 cannot forward packets destined for it.",
  },
  {
    number: 28,
    type: "single",
    text: "Refer to the exhibit. An administrator is attempting to install a default static route on router R1 to reach the Site B network on router R2. After entering the static route command, the route is still not showing up in the routing table of router R1. What is preventing the route from installing in the routing table?",
    exhibit: {
      src: "/images/modules-14-16/q28-exhibit.jpg",
      alt: "Exhibit for question 28: default static route configuration on R1",
      width: 961,
      height: 574,
    },
    options: [
      "The netmask is incorrect.",
      "The exit interface is missing.",
      "The next hop address is incorrect.",
      "The destination network is incorrect.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.2.1\nThe next hop address is incorrect. From R1 the next hop address should be that of the serial interface of R2, 209.165.202.130.",
  },
  {
    number: 29,
    type: "single",
    text: "Refer to the exhibit. The Branch Router has an OSPF neighbor relationship with the HQ router over the 198.51.0.4/30 network. The 198.51.0.8/30 network link should serve as a backup when the OSPF link goes down. The floating static route command ip route 0.0.0.0 0.0.0.0 S0/1/1 100 was issued on Branch and now traffic is using the backup link even when the OSPF link is up and functioning. Which change should be made to the static route command so that traffic will only use the OSPF link when it is up?",
    exhibit: {
      src: "/images/modules-14-16/q29-exhibit.png",
      alt: "Exhibit for question 29: Branch and HQ routers with OSPF and backup links",
      width: 575,
      height: 283,
    },
    options: [
      "Add the next hop neighbor address of 198.51.0.8.",
      "Change the administrative distance to 1.",
      "Change the destination network to 198.51.0.5.",
      "Change the administrative distance to 120.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.4.1\nThe problem with the current floating static route is that the administrative distance is set too low. The administrative distance will need to be higher than that of OSPF, which is 110, so that the router will only use the OSPF link when it is up.",
  },
  {
    number: 30,
    type: "single",
    text: "What characteristic completes the following statement?\nWhen an IPv6 static route is configured, the next-hop address can be ......",
    options: [
      "a destination host route with a /128 prefix.",
      "the \"show ipv6 route static\" command.",
      "an IPv6 link-local address on the adjacent router.",
      "the interface type and interface number.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.5.6\nThe next-hop address in an IPv6 static route can be the IPv6 link-local address of the adjacent router. When a link-local address is used as the next hop, the exit interface must also be specified, because link-local addresses are only unique on the local link.",
  },
  {
    number: 31,
    type: "single",
    text: "Refer to the exhibit. Which interface will be the exit interface to forward a data packet that has the destination IP address 172.19.115.206?",
    code: "Gateway of last resort is not set.\n172.19.115.0/26 is variously subnetted, 7 subnets, 3 masks\nO 172.19.115.0/26 [110/10] via 172.19.39.1, 00:00:24, Serial0/0/0\nO 172.19.115.64/26 [110/20] via 172.19.39.6, 00:00:56, Serial 0/0/1\nO 172.19.115.128/26 [110/10] via 172.19.39.1, 00:00:24, Serial 0/0/0\nC 172.19.115.192/27 is directly connected, GigabitEthernet0/0\nL 172.19.115.193/27 is directly connected, GigabitEthernet0/0\nC 172.19.115.224/27 is directly connected, GigabitEthernet0/1\nL 172.19.115.225/27 is directly connected, GigabitEthernet0/1\n172.19.39.0/24 is variably subnetted, 4 subnets, 2 masks\nC 172.19.39.0/30 is directly connected, Serial0/0/0\nL 172.19.39.2/32 is directly connected, Serial0/0/0\nC 172.19.39.4/30 is directly connected, Serial0/0/1\nL 172.19.39.5/32 is directly connected, Serial0/0/1\nS 172.19.40.0/26 [1/0] via 172.19.39.1, 00:00:24, Serial0/0/0\nR1#",
    options: [
      "GigabitEthernet0/1",
      "None, the packet will be dropped.",
      "GigabitEthernet0/0",
      "Serial0/0/1",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 14.1.3\nThe destination address 172.19.115.206 falls within the 172.19.115.192/27 range (172.19.115.192 to 172.19.115.223), which is directly connected through GigabitEthernet0/0, so that is the longest-prefix match and the exit interface.",
  },
];