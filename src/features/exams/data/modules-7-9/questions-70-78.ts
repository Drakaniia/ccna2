import type { Question } from "../../lib/types";

/** Modules 7 - 9 (Available and Reliable Networks), questions 70-78. */
export const questions70to78: Question[] = [
  {
    number: 70,
    type: "single",
    text: "Which address does a DHCPv4 server target when sending a DHCPOFFER message to a client that makes an address request?",
    options: [
      "Broadcast MAC address",
      "Gateway IP address",
      "Client IP address",
      "Client hardware address",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 7.1.0\nWhen a DHCPv4 client does not have an IPv4 address, a DHCPv4 server will send a DHCPOFFER message back to the client hardware address of the requesting DHCPv4 client.",
  },
  {
    number: 71,
    type: "single",
    text: "What kind of message is sent by a DHCPv4 client requesting an IP address?",
    options: [
      "DHCPACK unicast message",
      "DHCPDISCOVER broadcast message",
      "DHCPOFFER unicast message",
      "DHCPDISCOVER unicast message",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 7.1.0\nWhen the DHCPv4 client requests an IP address, it sends a DHCPDISCOVER broadcast message seeking a DHCPv4 server on the network.",
  },
  {
    number: 72,
    type: "single",
    text: "As a DHCPv4 client lease is about to expire, what is the message that the client sends the DHCP server?",
    options: ["DHCPREQUEST", "DHCPOFFER", "DHCPDISCOVER", "DHCPACK"],
    correct: [0],
    explanation:
      "Explanation: Topic 7.1.0\nWhen a DHCP client lease is about to expire, the client sends a DHCPREQUEST message to the DHCPv4 server that originally provided the IPv4 address. This allows the client to request that the lease be extended.",
  },
  {
    number: 73,
    type: "single",
    text: "What is the most likely scenario in which the WAN interface of a router would be configured as a DHCP client to be assigned a dynamic IP address from an ISP?",
    options: [
      "There is a web server for public access on the LAN that is attached to the router.",
      "It is a SOHO or home broadband router.",
      "The router is also the gateway for a LAN.",
      "The router is configured as a DHCP server.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 7.3.0\nSOHO and home broadband routers are typically set to acquire an IPv4 address automatically from the ISP. The IP address that is assigned is typically a dynamic address to reduce the cost, but a static IP address is possible with more cost. However, if the router is assigned a dynamic IP address, DNS issues will result in the web server behind the router not being easily accessible to the public. Routers are typically also gateways for LANs, but this has no bearing on whether the router is configured as a DHCP client on its WAN link or not. Likewise, a router can be configured to be a DHCP client in order to obtain an IP address from the ISP, but at the same time, it can be configured as a DHCP server to serve the IP addressing for the devices on its LAN.",
  },
  {
    number: 74,
    type: "single",
    text: "Which is a DHCPv4 address allocation method that assigns IPv4 addresses for a limited lease period?",
    options: [
      "Manual allocation",
      "Dynamic allocation",
      "Automatic allocation",
      "Pre-allocation",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 7.1.0\nDynamic allocation is the most commonly implemented allocation mechanism. It leases the IP parameters for a predefined period of time.",
  },
  {
    number: 75,
    type: "single",
    text: "What is the reason why the DHCPREQUEST message is sent as a broadcast during the DHCPv4 process?",
    options: [
      "To notify other DHCP servers on the subnet that the IP address was leased",
      "For hosts on other subnets to receive the information",
      "To notify other hosts not to request the same IP address",
      "For routers to fill their routing tables with this new information",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 7.1.0\nThe DHCPREQUEST message is broadcast to inform other DHCP servers that an IP address has been leased.",
  },
  {
    number: 76,
    type: "single",
    text: "How is a DHCPDISCOVER transmitted on a network to reach a DHCP server?",
    options: [
      "A DHCPDISCOVER message is sent with the IP address of the DHCP server as the destination address.",
      "A DHCPDISCOVER message is sent with the broadcast IP address as the destination address.",
      "A DHCPDISCOVER message is sent with the IP address of the default gateway as the destination address.",
      "A DHCPDISCOVER message is sent with a multicast IP address that all DHCP servers listen to as the destination address.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 7.1.0\nThe DHCPDISCOVER message is sent by a DHCPv4 client and targets a broadcast IP along with the destination port 67. The DHCPv4 server or servers respond to the DHCPv4 clients by targeting port 68.",
  },
  {
    number: 77,
    type: "single",
    text: "Which destination IPv4 address does a DHCPv4 client use to send the initial DHCP Discover packet when the client is looking for a DHCP server?",
    options: [
      "127.0.0.1",
      "224.0.0.1",
      "255.255.255.255",
      "The IP address of the default gateway",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 7.1.0\nBroadcast communications on a network may be directed or limited. A directed broadcast is sent to all hosts on a specific network. A limited broadcast is sent to 255.255.255.255. When a DHCP client needs to send a DHCP Discover packet in order to seek DHCP servers, the client will use this IP address of 255.255.255.255 as the destination in the IP header because it has no knowledge of the IP addresses of DHCP servers.",
  },
  {
    number: 78,
    type: "multi",
    text: "Under which two circumstances would a router usually be configured as a DHCPv4 client? (Choose two.)",
    choose: 2,
    options: [
      "The router is intended to be used as a SOHO gateway.",
      "The router has a fixed IP address.",
      "The router is meant to provide IP addresses to the hosts.",
      "The administrator needs the router to act as a relay agent.",
      "This is an ISP requirement.",
    ],
    correct: [0, 4],
    explanation:
      "Explanation: Topic 7.3.0\nSOHO routers are frequently required by the ISP to be configured as DHCPv4 clients in order to be connected to the provider.",
  },
];
