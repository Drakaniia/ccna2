import type { Question } from "../../lib/types";

/** Modules 7 - 9 (Available and Reliable Networks), questions 79-91. */
export const questions79to91: Question[] = [
  {
    number: 79,
    type: "single",
    text: "How does an IPv6 client ensure that it has a unique address after it configures its IPv6 address using the SLAAC allocation method?",
    options: [
      "It sends an ARP message with the IPv6 address as the destination IPv6 address.",
      "It checks with the IPv6 address database that is hosted by the SLAAC server.",
      "It contacts the DHCPv6 server via a special formed ICMPv6 message.",
      "It sends an ICMPv6 Neighbor Solicitation message with the IPv6 address as the target IPv6 address.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 8.2.0\nSLAAC is a stateless allocation method and does not use a DHCP server to manage the IPv6 addresses. When a host generates an IPv6 address, it must verify that it is unique. The host will send an ICMPv6 Neighbor Solicitation message with its own IPv6 address as the target. As long as no other device responds with a Neighbor Advertisement message, then the address is unique.",
  },
  {
    number: 80,
    type: "single",
    text: "A network administrator is entering the command ipv6 unicast-routing to start configuring DHCPv6 operation on a router. Which statement describes the function of this command?",
    options: [
      "It is required for sending ICMPv6 RA messages.",
      "It is required to configure stateful DHCPv6 server on the router.",
      "It is required to configure stateless DHCPv6 server on the router.",
      "It is required for enabling DNS service in DHCPv6 configurations.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.0\nThe ipv6 unicast-routing command is required to enable IPv6 routing on a router. This command is not necessary for the router to be a stateless or stateful DHCPv6 server, but is required for sending ICMPv6 RA messages.",
  },
  {
    number: 81,
    type: "single",
    text: "After booting, a client receives an ICMPv6 RA message with the M flag set to 0 and the O flag set to 1. What does this indicate?",
    options: [
      "The client should request an IPv6 address directly from a DHCPv6 server.",
      "The client should automatically configure an IPv6 address without contacting a DHCPv6 server.",
      "The client should automatically configure an IPv6 address and then contact a DHCPv6 server for more information.",
      "The client should be statically configured with an IPv6 address because the local router does not support autoconfiguration.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 8.3.0\nThe Managed Address Configuration (M) flag and the Other Configuration (O) flag in ICMPv6 RA messages are used to indicate to an IPv6 client how it should configure its IPv6 addresses. If the M flag is set to 0 it means that the host should automatically configure its own IPv6 interface address rather than asking for one from a DHCPv6 server. If the O flag is set to 1, it means that the client can find additional addressing information, such as a DNS server address, by contacting a DHCPv6 server after it has automatically configured its own address.",
  },
  {
    number: 82,
    type: "multi",
    text: "What are two characteristics of the SLAAC method for IPv6 address configuration? (Choose two.)",
    choose: 2,
    options: [
      "The default gateway of an IPv6 client on a LAN will be the link-local address of the router interface attached to the LAN.",
      "This stateful method of acquiring an IPv6 address requires at least one DHCPv6 server.",
      "Clients send router advertisement messages to routers to request IPv6 addressing.",
      "IPv6 addressing is dynamically assigned to clients through the use of ICMPv6.",
      "Router solicitation messages are sent by the router to offer IPv6 addressing to clients.",
    ],
    correct: [0, 3],
    explanation:
      "Explanation: Topic 8.2.0\nWith SLAAC, the default gateway for IPv6 clients will be the link-local address of the router interface that is attached to the client LAN. The IPv6 addressing is dynamically assigned via the ICMPv6 protocol. SLAAC is a stateless method of acquiring an IPv6 address, a method that requires no servers. When a client is configured to obtain its addressing information automatically via SLAAC, the client sends a router solicitation message to the IPv6 all-routers multicast address FF02::2. The router advertisement messages are sent by routers to provide addressing information to clients.",
  },
  {
    number: 83,
    type: "single",
    text: "What process is used in ICMPv6 for a host to verify that an IPv6 address is unique before configuring it on an interface?",
    options: ["DAD", "SLAAC", "EUI-64", "ARP"],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.0\nBefore an IPv6 host can enable and use an assigned IPv6 address, the host must verify that the address is unique on the network. To verify that no other hosts are using the IPv6 address, the host performs the duplicate address detection (DAD) process by sending a Neighbor Solicitation (NS) message to the IPv6 address.",
  },
  {
    number: 84,
    type: "single",
    text: "A company implements the stateless DHCPv6 method for configuring IPv6 addresses on employee workstations. After a workstation receives messages from multiple DHCPv6 servers to indicate their availability for DHCPv6 service, which message does it send to a server for configuration information?",
    options: ["DHCPv6 SOLICIT", "DHCPv6 REQUEST", "DHCPv6 ADVERTISE", "DHCPv6 INFORMATION-REQUEST"],
    correct: [3],
    explanation:
      "Explanation: Topic 8.3.0\nIn stateless DHCPv6 configuration, a client configures its IPv6 address by using the prefix and prefix length in the RA message, combined with a self-generated interface ID. It then contacts a DHCPv6 server for additional configuration information via an INFORMATION-REQUEST message. The DHCPv6 SOLICIT message is used by a client to locate a DHCPv6 server. The DHCPv6 ADVERTISE message is used by DHCPv6 servers to indicate their availability for DHCPv6 service. The DHCPv6 REQUEST message is used by a client, in the stateful DHCPv6 configuration, to request ALL configuration information from a DHCPv6 server.",
  },
  {
    number: 85,
    type: "single",
    text: "In which alternative to DHCPv6 does a router dynamically provide IPv6 configuration information to hosts?",
    options: ["ARP", "EUI-64", "ICMPv6", "SLAAC"],
    correct: [3],
    explanation:
      "Explanation: Topic 8.2.0\nStateless Address Autoconfiguration (SLAAC) can be used as an alternative to DHCPv6. In this approach, a router provides global routing prefix, prefix length, default gateway, and DNS server information to a host. The host is not provided with a global unicast address by SLAAC. Instead, SLAAC suggests that the host create its own global unicast address based on the supplied global routing prefix. ARP is not used in IPv6. ICMPv6 messages are used by SLAAC to provide addressing and other configuration information. EUI-64 is a process in which a host will create an interface ID from its 48-bit MAC address.",
  },
  {
    number: 86,
    type: "single",
    text: "Which destination IP address is used when an IPv6 host sends a DHCPv6 SOLICIT message to locate a DHCPv6 server?",
    options: ["FF02::2", "FF02::1", "FE80::1", "FF02::1:2"],
    correct: [0],
    explanation:
      "Explanation: Topic 8.3.0\nDHCPv6 hosts will send a DHCP SOLICIT message to the all DHCP routers multicast address of FF02::2.",
  },
  {
    number: 87,
    type: "single",
    text: "What message informs IPv6 enabled interfaces to use stateful DHCPv6 for obtaining an IPv6 address?",
    options: [
      "The ICMPv6 Router Advertisement",
      "The ICMPv6 Router Solicitation",
      "The DHCPv6 Reply message",
      "The DHCPv6 Advertise message",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.0\nBefore an IPv6 enabled interface will use stateful DHCPv6 to obtain an IPv6 address, the interface must receive an ICMPv6 Router Advertisement with the managed configuration flag (M flag) set to 1.",
  },
  {
    number: 88,
    type: "single",
    text: "Which command should be configured on a router interface to set the router as a stateful DHCPv6 client?",
    options: [
      "ipv6 enable",
      "ipv6 address dhcp",
      "ipv6 address autoconfigure",
      "ipv6 dhcp server stateful",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 8.4.0\nWhen the ipv6 address dhcp command is configured on a router interface, it enables the router as a DHCPv6 client on this interface. The ipv6 enable command enables IPv6 on an interface and allows the router to configure its link-local address. The ipv6 address autoconfigure command tells the router to use either SLAAC or stateful DHCPv6 to configure its global unicast address. The ipv6 dhcp server command is used on a router that is running a DHCPv6 server to indicate what address information should be served to clients.",
  },
  {
    number: 89,
    type: "single",
    text: "A client is using SLAAC to obtain an IPv6 address for its interface. After an address has been generated and applied to the interface, what must the client do before it can begin to use this IPv6 address?",
    options: [
      "It must send a DHCPv6 INFORMATION-REQUEST message to request the address of the DNS server.",
      "It must send an ICMPv6 Router Solicitation message to determine what default gateway it should use.",
      "It must send a DHCPv6 REQUEST message to the DHCPv6 server to request permission to use this address.",
      "It must send an ICMPv6 Neighbor Solicitation message to ensure that the address is not already in use on the network.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 8.3.0\nStateful DHCPv6 or stateless DHCPv6 uses a DHCP server, but Stateless Address Autoconfiguration (SLAAC) does not. A SLAAC client can automatically generate an address that is based on information from local routers via Router Advertisement (RA) messages. Once an address has been assigned to an interface via SLAAC, the client must ensure via Duplicate Address Detection (DAD) that the address is not already in use. It does this by sending out an ICMPv6 Neighbor Solicitation message and listening for a response. If a response is received, then it means that another device is already using this address.",
  },
  {
    number: 90,
    type: "multi",
    text: "What two methods can be used to generate an interface ID by an IPv6 host that is using SLAAC? (Choose two.)",
    choose: 2,
    options: ["EUI-64", "Random generation", "Stateful DHCPv6", "DAD", "ARP"],
    correct: [0, 1],
    explanation:
      "Explanation: Topic 8.2.0\nA host that is using SLAAC has two means to configure an interface ID: EUI-64 and random generation by the host operating system.",
  },
  {
    number: 91,
    type: "single",
    text: "Which method would an IPv6-enabled host using SLAAC employ to learn the address of the default gateway?",
    options: [
      "Router advertisements that are received from the link router",
      "Advertise messages that are received from the DHCPv6 server",
      "Neighbor advertisements that are received from link neighbors",
      "Reply messages that are received from the DHCPv6 server",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 8.2.0\nWhen using SLAAC, a host will learn from the router advertisement that is sent by the link router the address to use as a default gateway.",
  },
];
