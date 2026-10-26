import type { Question } from "../../lib/types";

/** Modules 11 - 13 (IP Addressing), questions 1-35. */
export const questions1to35: Question[] = [
  {
    number: 1,
    type: "single",
    text: "What is the prefix length notation for the subnet mask 255.255.255.224?",
    options: ["/25", "/26", "/27", "/28"],
    correct: [2],
    explanation:
      "Explanation: Topic 11.1.3\nThe binary format for 255.255.255.224 is 11111111.11111111.11111111.11100000. The prefix length is the number of consecutive 1s in the subnet mask. Therefore, the prefix length is /27.",
  },
  {
    number: 2,
    type: "single",
    text: "How many valid host addresses are available on an IPv4 subnet that is configured with a /26 mask?",
    options: ["254", "190", "192", "62", "64"],
    correct: [3],
    explanation:
      "Explanation: Topic 11.5.2\nA /26 mask leaves 6 host bits. With 6 bits, 2^6 = 64 addresses are available in the subnet; subtracting the network and broadcast addresses leaves 62 valid host addresses.",
  },
  {
    number: 3,
    type: "single",
    text: "Which subnet mask would be used if 5 host bits are available?",
    options: [
      "255.255.255.0",
      "255.255.255.128",
      "255.255.255.224",
      "255.255.255.240",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.5.2\nAn IPv4 address has 32 bits. If 5 bits are reserved for hosts, then 32 - 5 = 27 bits are used for the network portion, which corresponds to the /27 mask 255.255.255.224.",
  },
  {
    number: 4,
    type: "single",
    text: "A network administrator subnets the 192.168.10.0/24 network into subnets with /26 masks. How many equal-sized subnets are created?",
    options: ["1", "2", "4", "8", "16", "64"],
    correct: [2],
    explanation:
      "Explanation: Topic 11.5.2\nThe original /24 mask has 24 network bits. Changing to /26 borrows 2 bits, and 2^2 = 4 equal-sized subnets are created.",
  },
  {
    number: 5,
    type: "pair",
    text: "Match the subnetwork to a host address that would be included within the subnetwork. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-modules-11-13/q5-exhibit.png",
      alt: "Exhibit for question 5: three subnetworks matched to host addresses",
      width: 1536,
      height: 942,
    },
    left: ["192.168.1.32/27", "192.168.1.64/27", "192.168.1.96/27"],
    right: [
      "192.168.1.63",
      "192.168.1.68",
      "192.168.1.128",
      "192.168.1.48",
      "192.168.1.121",
    ],
    correctPairs: {
      0: 3,
      1: 1,
      2: 4,
    },
    explanation:
      "Explanation: Topic 11.5.2\n192.168.1.32/27 has a valid host range of 192.168.1.33-192.168.1.62, so 192.168.1.48 is a host address in that subnet. 192.168.1.64/27 has a valid host range of 192.168.1.65-192.168.1.94, so 192.168.1.68 is valid. 192.168.1.96/27 has a valid host range of 192.168.1.97-192.168.1.126, so 192.168.1.121 is valid. 192.168.1.63 is the broadcast address of the first subnet and 192.168.1.128 is a network address, so neither is a usable host address.",
  },
  {
    number: 6,
    type: "single",
    text: "An administrator wants to create four subnetworks from the network address 192.168.1.0/24. What is the network address and subnet mask of the second useable subnet?",
    options: [
      "subnetwork 192.168.1.64\nsubnet mask 255.255.255.192",
      "subnetwork 192.168.1.32\nsubnet mask 255.255.255.240",
      "subnetwork 192.168.1.64\nsubnet mask 255.255.255.240",
      "subnetwork 192.168.1.128\nsubnet mask 255.255.255.192",
      "subnetwork 192.168.1.8\nsubnet mask 255.255.255.224",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 11.1.3\nThe number of bits that are borrowed would be two, thus giving a total of 4 useable subnets:\n192.168.1.0\n192.168.1.64\n192.168.1.128\n192.168.1.192\nBecause 2 bits are borrowed, the new subnet mask would be /26 or 255.255.255.192",
  },
  {
    number: 7,
    type: "single",
    text: "How many bits must be borrowed from the host portion of an address to accommodate a router with five connected networks?",
    options: ["two", "three", "four", "five"],
    correct: [1],
    explanation:
      "Explanation: Topic 11.5.2\nEach network that is directly connected to an interface on a router requires its own subnet. The formula 2^n, where n is the number of bits borrowed, is used to calculate the available number of subnets when borrowing a specific number of bits.",
  },
  {
    number: 8,
    type: "single",
    text: "How many host addresses are available on the 192.168.10.128/26 network?",
    options: ["30", "32", "60", "62", "64"],
    correct: [3],
    explanation:
      "Explanation: Topic 11.5.2\nA /26 prefix gives 6 host bits, which provides a total of 64 addresses, because 2^6 = 64. Subtracting the network and broadcast addresses leaves 62 usable host addresses.",
  },
  {
    number: 9,
    type: "single",
    text: "How many host addresses are available on the network 172.16.128.0 with a subnet mask of 255.255.252.0?",
    options: ["510", "512", "1022", "1024", "2046", "2048"],
    correct: [2],
    explanation:
      "Explanation: Topic 11.5.2\nA mask of 255.255.252.0 is equal to a prefix of /22. A /22 prefix provides 22 bits for the network portion and leaves 10 bits for the host portion. The 10 bits in the host portion will provide 1022 usable IP addresses (2^10 - 2 = 1022).",
  },
  {
    number: 10,
    type: "pair",
    text: "Match each IPv4 address to the appropriate address category. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-modules-11-13/q10-exhibit.png",
      alt: "Exhibit for question 10: IPv4 addresses matched to host, network, and broadcast address categories",
      width: 1536,
      height: 1013,
    },
    left: [
      "192.168.100.161/25",
      "192.168.1.191/26",
      "10.10.10.128/25",
      "224.10.0.254/24",
      "172.110.12.64/28",
      "10.0.0.159/27",
    ],
    right: ["host address", "network address", "broadcast address"],
    correctPairs: {
      0: 0,
      1: 2,
      2: 1,
      3: 0,
      4: 1,
      5: 2,
    },
    allowMultiMatch: true,
    explanation:
      "Explanation: Topic 11.1.6\n192.168.100.161/25 is a host address in 192.168.100.128/25, and 224.10.0.254/24 is a host address in 224.10.0.0/24. 10.10.10.128/25 and 172.110.12.64/28 are network addresses. 192.168.1.191/26 is the broadcast address of 192.168.1.128/26, and 10.0.0.159/27 is the broadcast address of 10.0.0.128/27. 203.0.113.100/24 is also a host address, so it is the option that is not used.",
  },
  {
    number: 11,
    type: "multi",
    choose: 3,
    text: "What three blocks of addresses are defined by RFC 1918 for private network use? (Choose three.)",
    options: [
      "10.0.0.0/8",
      "172.16.0.0/12",
      "192.168.0.0/16",
      "100.64.0.0/14",
      "169.254.0.0/16",
      "239.0.0.0/8",
    ],
    correct: [0, 1, 2],
    explanation:
      "Explanation: Topic 11.3.1\nRFC 1918, Address Allocation for Private Internets, defines three blocks of IPv4 address for private networks that should not be routable on the public Internet.\n10.0.0.0/8\n172.16.0.0/12\n192.168.0.0/16",
  },
  {
    number: 12,
    type: "single",
    text: "Refer to the exhibit. An administrator must send a message to everyone on the router A network. What is the broadcast address for network 172.16.16.0/22?",
    exhibit: {
      src: "/images/itn-modules-11-13/q12-exhibit.png",
      alt: "Exhibit for question 12: router A with the 172.16.16.0/22 network",
      width: 408,
      height: 268,
    },
    options: [
      "172.16.16.255",
      "172.16.20.255",
      "172.16.19.255",
      "172.16.23.255",
      "172.16.255.255",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.1.6\nThe 172.16.16.0/22 network has 22 bits in the network portion and 10 bits in the host portion. Converting the network address to binary yields a subnet mask of 255.255.252.0. The range of addresses in this network will end with the last address available before 172.16.20.0. Valid host addresses for this network range from 172.16.16.1-172.16.19.254, making 172.16.19.255 the broadcast address.",
  },
  {
    number: 13,
    type: "single",
    text: "A site administrator has been told that a particular network at the site must accommodate 126 hosts. Which subnet mask would be used that contains the required number of host bits?",
    options: [
      "255.255.255.0",
      "255.255.255.128",
      "255.255.255.224",
      "255.255.255.240",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 11.5.2\nThe subnet mask of 255.255.255.0 has 8 host bits. The mask of 255.255.255.128 results in 7 host bits. The mask of 255.255.255.224 has 5 host bits. Finally, 255.255.255.240 represents 4 host bits.",
  },
  {
    number: 14,
    type: "single",
    text: "Refer to the exhibit. Considering the addresses already used and having to remain within the 10.16.10.0/24 network range, which subnet address could be assigned to the network containing 25 hosts?",
    exhibit: {
      src: "/images/itn-modules-11-13/q14-exhibit.png",
      alt: "Exhibit for question 14: used and available address ranges in 10.16.10.0/24",
      width: 300,
      height: 251,
    },
    options: [
      "10.16.10.160/26",
      "10.16.10.128/28",
      "10.16.10.64/27",
      "10.16.10.224/26",
      "10.16.10.240/27",
      "10.16.10.240/28",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.5.2\nAddresses 10.16.10.0 through 10.16.10.63 are taken for the leftmost network. Addresses 10.16.10.192 through 10.16.10.207 are used by the center network. The address space from 208-255 assumes a /28 mask, which does not allow enough host bits to accommodate 25 host addresses.The address ranges that are available include 10.16.10.64/26 and 10.16.10.128/26. To accommodate 25 hosts, 5 host bits are needed, so a /27 mask is necessary. Four possible /27 subnets could be created from the available addresses between 10.16.10.64 and 10.16.10.191:\n10.16.10.64/27\n10.16.10.96/27\n10.16.10.128/27\n10.16.10.160/27",
  },
  {
    number: 15,
    type: "single",
    text: "What is the usable number of host IP addresses on a network that has a /26 mask?",
    options: ["256", "254", "64", "62", "32", "16"],
    correct: [3],
    explanation:
      "Explanation: Topic 11.1.3\nA /26 mask is the same as 255.255.255.192. The mask leaves 6 host bits. With 6 host bits, 64 IP addresses are possible. One address represents the subnet number and one address represents the broadcast address, which means that 62 addresses can then be used to assign to network devices.",
  },
  {
    number: 16,
    type: "single",
    text: "Which address prefix range is reserved for IPv4 multicast?",
    options: [
      "240.0.0.0 – 254.255.255.255",
      "224.0.0.0 – 239.255.255.255",
      "169.254.0.0 – 169.254.255.255",
      "127.0.0.0 – 127.255.255.255",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 11.2.3\nMulticast IPv4 addresses use the reserved class D address range of 224.0.0.0 to 239.255.255.255.",
  },
  {
    number: 17,
    type: "pair",
    text: "Refer to the exhibit. Match the network with the correct IP address and prefix that will satisfy the usable host addressing requirements for each network.",
    exhibit: [
      {
        src: "/images/itn-modules-11-13/q17-exhibit.png",
        alt: "Exhibit for question 17: Networks A, B, C, and D with 100, 50, 25, and 2 hosts",
        width: 595,
        height: 401,
      },
      {
        src: "/images/itn-modules-11-13/q17-exhibit-2.jpg",
        alt: "Exhibit for question 17: Networks A through D matched to subnet addresses and prefixes",
        width: 1041,
        height: 348,
      },
    ],
    left: ["Network A", "Network B", "Network C", "Network D"],
    right: [
      "192.168.0.128 /25",
      "192.168.0.0 /26",
      "192.168.0.96 /27",
      "192.168.0.80 /30",
    ],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
    },
    explanation:
      "Explanation: Topic 11.8.4\nNetwork A needs to use 192.168.0.128 /25, which yields 128 host addresses.\nNetwork B needs to use 192.168.0.0 /26, which yields 64 host addresses.\nNetwork C needs to use 192.168.0.96 /27, which yields 32 host addresses.\nNetwork D needs to use 192.168.0.80/30, which yields 4 host addresses.",
  },
  {
    number: 18,
    type: "single",
    text: "A high school in New York (school A) is using videoconferencing technology to establish student interactions with another high school (school B) in Russia. The videoconferencing is conducted between two end devices through the Internet. The network administrator of school A configures the end device with the IP address 209.165.201.10. The administrator sends a request for the IP address for the end device in school B and the response is 192.168.25.10. Neither school is using a VPN. The administrator knows immediately that this IP will not work. Why?",
    options: [
      "This is a loopback address.",
      "This is a link-local address.",
      "This is a private IP address.",
      "There is an IP address conflict.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.3.1\nThe IP address 192.168.25.10 is an IPv4 private address. This address will not be routed over the Internet, so school A will not be able to reach school B. Because the address is a private one, it can be used freely on an internal network. As long as no two devices on the internal network are assigned the same private IP, there is no IP conflict issue. Devices that are assigned a private IP will need to use NAT in order to communicate over the Internet.",
  },
  {
    number: 19,
    type: "multi",
    choose: 3,
    text: "Which three addresses are valid public addresses? (Choose three.)",
    options: [
      "198.133.219.17",
      "192.168.1.245",
      "10.15.250.5",
      "128.107.12.117",
      "172.31.1.25",
      "64.104.78.227",
    ],
    correct: [0, 3, 5],
    explanation:
      "Explanation: Topic 11.3.1\nThe ranges of private IPv4 addresses are as follows:\n10.0.0.0 – 10.255.255.255\n172.16.0.0 – 172.31.255.255\n192.168.0.0 – 192.168.255.255",
  },
  {
    number: 20,
    type: "single",
    text: "A message is sent to all hosts on a remote network. Which type of message is it?",
    options: [
      "limited broadcast",
      "multicast",
      "directed broadcast",
      "unicast",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.2.2\nA directed broadcast is a message sent to all hosts on a specific network. It is useful for sending a broadcast to all hosts on a nonlocal network. A multicast message is a message sent to a selected group of hosts that are part of a subscribing multicast group. A limited broadcast is used for a communication that is limited to the hosts on the local network. A unicast message is a message sent from one host to another.",
  },
  {
    number: 21,
    type: "multi",
    choose: 2,
    text: "A company has a network address of 192.168.1.64 with a subnet mask of 255.255.255.192. The company wants to create two subnetworks that would contain 10 hosts and 18 hosts respectively. Which two networks would achieve that? (Choose two.)",
    options: [
      "192.168.1.16/28",
      "192.168.1.64/27",
      "192.168.1.128/27",
      "192.168.1.96/28",
      "192.168.1.192/28",
    ],
    correct: [1, 3],
    explanation:
      "Explanation: Topic 11.8.3\nSubnet 192.168.1.64 /27 has 5 bits that are allocated for host addresses and therefore will be able to support 32 addresses, but only 30 valid host IP addresses. Subnet 192.168.1.96/28 has 4 bits for host addresses and will be able to support 16 addresses, but only 14 valid host IP addresses.",
  },
  {
    number: 22,
    type: "single",
    text: "Which address is a valid IPv6 link-local unicast address?",
    options: [
      "FEC8:1::FFFF",
      "FD80::1:1234",
      "FE80::1:4545:6578:ABC1",
      "FE0A::100:7788:998F",
      "FC90:5678:4251:FFFF",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 12.4.3\nIPv6 LLAs are in the fe80::/10 range. The /10 indicates that the first 10 bits are 1111 1110 10xx xxxx. The first hextet has a range of 1111 1110 1000 0000 (fe80) to 1111 1110 1011 1111 (febf).",
  },
  {
    number: 23,
    type: "single",
    text: "Which of these addresses is the shortest abbreviation for the IP address:\n3FFE:1044:0000:0000:00AB:0000:0000:0057?",
    options: [
      "3FFE:1044::AB::57",
      "3FFE:1044::00AB::0057",
      "3FFE:1044:0:0:AB::57",
      "3FFE:1044:0:0:00AB::0057",
      "3FFE:1044:0000:0000:00AB::57",
      "3FFE:1044:0000:0000:00AB::0057",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 12.2.2\nThe rules for reducing the notation of IPv6 addresses are:\n1. Omit any leading 0s (zeros) in any hextet.\n2. Replace any single, contiguous string of one or more 16-bit hextets consisting of all zeros with a double colon (::) .\n3. The double colon (::) can only be used once within an address.",
  },
  {
    number: 24,
    type: "single",
    text: "A network administrator has received the IPv6 prefix 2001:DB8::/48 for subnetting. Assuming the administrator does not subnet into the interface ID portion of the address space, how many subnets can the administrator create from the /48 prefix?",
    options: ["16", "256", "4096", "65536"],
    correct: [3],
    explanation:
      "Explanation: Topic 12.8.1\nWith a network prefix of 48, there will be 16 bits available for subnetting because the interface ID starts at bit 64. Sixteen bits will yield 65536 subnets.",
  },
  {
    number: 25,
    type: "single",
    text: "Given IPv6 address prefix 2001:db8::/48, what will be the last subnet that is created if the subnet prefix is changed to /52?",
    options: [
      "2001:db8:0:f00::/52",
      "2001:db8:0:8000::/52",
      "2001:db8:0:f::/52",
      "2001:db8:0:f000::/52",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 12.8.1\nPrefix 2001:db8::/48 has 48 network bits. If we subnet to a /52, we are moving the network boundary four bits to the right and creating 16 subnets. The first subnet is 2001:db8::/52 the last subnet is 2001:db8:0:f000::/52.",
  },
  {
    number: 26,
    type: "single",
    text: "Question as presented:\nConsider the following range of addresses:\n2001:0DB8:BC15:00A0:0000::\n2001:0DB8:BC15:00A1:0000::\n2001:0DB8:BC15:00A2:0000::\n…\n2001:0DB8:BC15:00AF:0000::\nThe prefix-length for the range of addresses is /60.",
    options: ["True", "False"],
    correct: [0],
    explanation:
      "Explanation: Topic 12.2.1\nAll the addresses have the part 2001:0DB8:BC15:00A in common. Each hexadecimal digit represents 4 bits, so the 15 common digits form a 60-bit network prefix. The prefix length is therefore /60.",
  },
  {
    number: 27,
    type: "single",
    text: "What type of IPv6 address is FE80::1?",
    options: ["loopback", "link-local", "multicast", "global unicast"],
    correct: [1],
    explanation:
      "Explanation: Topic 12.3.7\nLink-local IPv6 addresses start with FE80::/10, which is any address from FE80:: to FEBF::. Link-local addresses are used extensively in IPv6 and allow directly connected devices to communicate with each other on the link they share.",
  },
  {
    number: 28,
    type: "single",
    text: "Refer to the exhibit. A company is deploying an IPv6 addressing scheme for its network. The company design document indicates that the subnet portion of the IPv6 addresses is used for the new hierarchical network design, with the site subsection to represent multiple geographical sites of the company, the sub-site section to represent multiple campuses at each site, and the subnet section to indicate each network segment separated by routers. With such a scheme, what is the maximum number of subnets achieved per sub-site?",
    exhibit: {
      src: "/images/itn-modules-11-13/q28-exhibit.png",
      alt: "Exhibit for question 28: IPv6 address hierarchy with site, sub-site, and subnet sections",
      width: 300,
      height: 203,
    },
    options: ["0", "4", "16", "256"],
    correct: [2],
    explanation:
      "Explanation: Topic 12.8.1\nBecause only one hexadecimal character is used to represent the subnet, that one character can represent 16 different values 0 through F.",
  },
  {
    number: 29,
    type: "single",
    text: "What is used in the EUI-64 process to create an IPv6 interface ID on an IPv6 enabled interface?",
    options: [
      "the MAC address of the IPv6 enabled interface",
      "a randomly generated 64-bit hexadecimal address",
      "an IPv6 address that is provided by a DHCPv6 server",
      "an IPv4 address that is configured on the interface",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.5.6\nThe EUI-64 process uses the MAC address of an interface to construct an interface ID (IID). Because the MAC address is only 48 bits in length, 16 additional bits (FF:FE) must be added to the MAC address to create the full 64-bit interface ID.",
  },
  {
    number: 30,
    type: "single",
    text: "What is the prefix for the host address 2001:DB8:BC15:A:12AB::1/64?",
    options: [
      "2001:DB8:BC15",
      "2001:DB8:BC15:A",
      "2001:DB8:BC15:A:1",
      "2001:DB8:BC15:A:12",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 12.8.1\nThe network portion, or prefix, of an IPv6 address is identified through the prefix length. A /64 prefix length indicates that the first 64 bits of the IPv6 address is the network portion. Hence the prefix is 2001:DB8:BC15:A.",
  },
  {
    number: 31,
    type: "single",
    text: "An IPv6 enabled device sends a data packet with the destination address of FF02::1. What is the target of this packet?",
    options: [
      "the one IPv6 device on the link that has been uniquely configured with this address",
      "all IPv6 enabled devices on the local link or network",
      "only IPv6 DHCP servers",
      "only IPv6 configured routers",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 12.7.2\nThis address is one of the assigned IPv6 multicast addresses. Packets addressed to FF02::1 are for all IPv6 enabled devices on the link or network. FF02::2 is for all IPv6 routers that exist on the network.",
  },
  {
    number: 32,
    type: "pair",
    text: "Match the IPv6 address with the IPv6 address type. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-modules-11-13/q32-exhibit.jpg",
      alt: "Exhibit for question 32: IPv6 addresses matched to address types",
      width: 1046,
      height: 352,
    },
    left: ["::1", "FF02::1", "FF02::1:FFAE:F85F", "2001:DB8::BAF:3F57:FE94"],
    right: [
      "loopback",
      "all node multicast",
      "solicited node multicast",
      "global unicast",
    ],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
    },
    explanation:
      "Explanation: Topic 12.3.3\nFF02::1:FFAE:F85F is a solicited node multicast address.\n2001:DB8::BAF:3F57:FE94 is a global unicast address.\nFF02::1 is the all node multicast address. Packets sent to this address will be received by all IPv6 hosts on the local link.\n::1 is the IPv6 loopback address.\nThere are no examples of link local or unique local addresses provided.",
  },
  {
    number: 33,
    type: "single",
    text: "Which IPv6 prefix is reserved for communication between devices on the same link?",
    options: ["FC00::/7", "2001::/32", "FE80::/10", "FDFF::/7"],
    correct: [2],
    explanation:
      "Explanation: Topic 12.3.7\nIPv6 link-local unicast addresses are in the FE80::/10 prefix range and are not routable. They are used only for communications between devices on the same link.",
  },
  {
    number: 34,
    type: "single",
    text: "Which type of IPv6 address refers to any unicast address that is assigned to multiple hosts?",
    options: ["unique local", "global unicast", "link-local", "anycast"],
    correct: [3],
    explanation:
      "Explanation: Topic 12.3.1\nThe IPv6 specifications include anycast addresses. An anycast address is any unicast IPv6 address that is assigned to multiple devices.",
  },
  {
    number: 35,
    type: "multi",
    choose: 2,
    text: "What are two types of IPv6 unicast addresses? (Choose two.)",
    options: ["multicast", "loopback", "link-local", "anycast", "broadcast"],
    correct: [1, 2],
    explanation:
      "Explanation: Topic 12.3.3\nMulticast, anycast, and unicast are types of IPv6 addresses. There is no broadcast address in IPv6. Loopback and link-local are specific types of unicast addresses.",
  },
];
