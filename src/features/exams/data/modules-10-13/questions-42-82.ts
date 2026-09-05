import type { Question } from "../../lib/types";

/**
 * Modules 10 - 13 (L2 Security and WLANs), questions 42-82.
 * Note: the source dump has no question 63, so numbering jumps 62 → 64.
 */
export const questions42to82: Question[] = [
  {
    number: 42,
    type: "single",
    text: "Refer to the exhibit. PC1 and PC2 should be able to obtain IP address assignments from the DHCP server. How many ports among switches should be assigned as trusted ports as part of the DHCP snooping configuration?",
    exhibit: {
      src: "/images/modules-10-13/q42-exhibit.png",
      alt: "Exhibit for question 42: DHCP snooping network topology",
      width: 534,
      height: 395,
    },
    options: ["1", "3", "5", "7"],
    correct: [3],
    explanation:
      "Explanation: Topic 11.3.2\nThe DHCP snooping configuration includes building the DHCP Snooping Binding Database and assigning necessary trusted ports on switches. A trusted port points to the legitimate DHCP servers. In this network design, because the DHCP server is attached to AS3, seven switch ports should be assigned as trusted ports, one on AS3 toward the DHCP server, one on DS1 toward AS3, one on DS2 toward AS3, and two connections on both AS1 and AS2 (toward DS1 and DS2), for a total of seven.",
  },
  {
    number: 43,
    type: "single",
    text: "An IT security specialist enables port security on a switch port of a Cisco switch. What is the default violation mode in use until the switch port is configured to use a different violation mode?",
    options: ["shutdown", "disabled", "restrict", "protect"],
    correct: [0],
    explanation:
      "Explanation: Topic 11.1.6\nIf no violation mode is specified when port security is enabled on a switch port, then the security violation mode defaults to shutdown.",
  },
  {
    number: 44,
    type: "multi",
    text: "A laptop cannot connect to a wireless access point. Which two troubleshooting steps should be taken first? (Choose two.)",
    choose: 2,
    options: [
      "Ensure that the correct network media is selected.",
      "Ensure that the laptop antenna is attached.",
      "Ensure that the wireless NIC is enabled.",
      "Ensure that the wireless SSID is chosen.",
      "Ensure that the NIC is configured for the proper frequency.",
    ],
    correct: [2, 3],
    explanation:
      "Explanation: Topic 13.4.2\nA wireless laptop normally does not have an antenna attached unless a repair has recently been implemented. If the wireless NIC is enabled, the correct media, radio, will be used. When the NIC detects an access point, the correct frequency is automatically used.",
  },
  {
    number: 45,
    type: "single",
    text: "What is an advantage of SSID cloaking?",
    options: [
      "Clients will have to manually identify the SSID to connect to the network.",
      "It is the best way to secure a wireless network.",
      "SSIDs are very difficult to discover because APs do not broadcast them.",
      "It provides free Internet access in public locations where knowing the SSID is of no concern.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 12.7.2\nSSID cloaking is a weak security feature that is performed by APs and some wireless routers by allowing the SSID beacon frame to be disabled. Although clients have to manually identify the SSID to be connected to the network, the SSID can be easily discovered. The best way to secure a wireless network is to use authentication and encryption systems. SSID cloaking does not provide free Internet access in public locations, but an open system authentication could be used in that situation.",
  },
  {
    number: 46,
    type: "single",
    text: "What is a wireless security mode that requires a RADIUS server to authenticate wireless users?",
    options: ["personal", "shared key", "enterprise", "WEP"],
    correct: [2],
    explanation:
      "Explanation: Topic 12.7.5\nWPA and WPA2 come in two types: personal and enterprise. Personal is used in home and small office networks. Shared key allows three different authentication techniques: (1) WEP, (2) WPA, and (3) 802.11i/WPA2. WEP is an encryption method.",
  },
  {
    number: 47,
    type: "single",
    text: "A company has recently implemented an 802.11n wireless network. Some users are complaining that the wireless network is too slow. Which solution is the best method to enhance the performance of the wireless network?",
    options: [
      "Disable DHCP on the access point and assign static addresses to the wireless clients.",
      "Upgrade the firmware on the wireless access point.",
      "Split the traffic between the 2.4 GHz and 5 GHz frequency bands.",
      "Replace the wireless NICs on the computers that are experiencing slow connections.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 13.4.3\nBecause some users are complaining about the network being too slow, the correct option would be to split the traffic so that there are two networks using different frequencies at the same time. Replacing the wireless NICs will not necessarily correct the network being slow and it could be expensive for the company. DHCP versus static addressing should have no impact of the network being slow and it would be a huge task to have all users assigned static addressing for their wireless connection. Upgrading the firmware on the wireless access point is always a good idea. However, if some of the users are experiencing a slow network connection, it is likely that this would not substantially improve network performance.",
  },
  {
    number: 48,
    type: "single",
    text: "Which protocol can be used to monitor the network?",
    options: ["DHCP", "SNMP", "RADIUS", "AAA"],
    correct: [1],
    explanation:
      "Explanation: Topic 13.3.2\nSimple Network Management Protocol (SNMP) is used to monitor the network.",
  },
  {
    number: 49,
    type: "single",
    text: "A network administrator deploys a wireless router in a small law firm. Employee laptops join the WLAN and receive IP addresses in the 10.0.10.0/24 network. Which service is used on the wireless router to allow the employee laptops to access the internet?",
    options: ["DHCP", "RADIUS", "DNS", "NAT"],
    correct: [3],
    explanation:
      "Explanation: Topic 13.1.7\nAny address with the 10 in the first octet is a private IPv4 address and cannot be routed on the internet. The wireless router will use a service called Network Address Translation (NAT) to convert private IPv4 addresses to internet-routable IPv4 addresses for wireless devices to gain access to the internet.",
  },
  {
    number: 50,
    type: "single",
    text: "Which service can be used on a wireless router to prioritize network traffic among different types of applications so that voice and video data are prioritized over email and web data?",
    options: ["QoS", "DNS", "DHCP", "NAT"],
    correct: [0],
    explanation:
      "Explanation: Topic 13.1.8\nMany wireless routers have an option for configuring quality of service (QoS). By configuring QoS, certain time-sensitive traffic types, such as voice and video, are prioritized over traffic that is not as time-sensitive, such as email and web browsing.",
  },
  {
    number: 51,
    type: "single",
    text: "Which access control component, implementation, or protocol is based on device roles of supplicant, authenticator, and authentication server?",
    options: ["accounting", "authentication", "authorization", "802.1X"],
    correct: [3],
    explanation:
      "Explanation: Topic 10.2.6\nThe 802.1X port-based authentication framework defines three device roles: the supplicant (the client requesting access), the authenticator (the switch or access point that controls access), and the authentication server (which validates the client).",
  },
  {
    number: 52,
    type: "single",
    text: "Which type of wireless network is suitable for national and global communications?",
    options: [
      "wireless metropolitan-area network",
      "wireless local-area network",
      "wireless personal-area network",
      "wireless wide-area network",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 12.1.2\nA wireless wide-area network (WWAN) uses transmitters to provide coverage over an extensive geographic area, making it suitable for national and global communications.",
  },
  {
    number: 53,
    type: "single",
    text: "Which feature on a switch makes it vulnerable to VLAN hopping attacks?",
    options: [
      "the mixed duplex mode enabled for all ports by default",
      "the limited size of content-addressable memory space",
      "mixed port bandwidth support enabled for all ports by default",
      "the automatic trunking port feature enabled for all ports by default",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 10.5.2\nA VLAN hopping attack enables traffic from one VLAN to be seen by another VLAN without routing. In a basic VLAN hopping attack, the attacker takes advantage of the automatic trunking port feature enabled by default on most switch ports.",
  },
  {
    number: 54,
    type: "single",
    text: "Which component of AAA is used to determine which resources a user can access and which operations the user is allowed to perform?",
    options: ["accounting", "authentication", "auditing", "authorization"],
    correct: [3],
    explanation:
      "Explanation: Topic 10.2.4\nOne of the components in AAA is authorization. After a user is authenticated through AAA, authorization services determine which resources the user can access and which operations the user is allowed to perform.",
  },
  {
    number: 55,
    type: "single",
    text: "Refer to the exhibit. The Fa0/2 interface on switch S1 has been configured with the switchport port-security mac-address 0023.189d.6456 command and a workstation has been connected. What could be the reason that the Fa0/2 interface is shutdown?",
    exhibit: {
      src: "/images/modules-10-13/q55-exhibit.png",
      alt: "Exhibit for question 55: port security violation counter output",
      width: 592,
      height: 266,
    },
    options: [
      "The Fa0/24 interface of S1 is configured with the same MAC address as the Fa0/2 interface.",
      "The connection between S1 and PC1 is via a crossover cable.",
      "S1 has been configured with a switchport port-security aging command.",
      "The MAC address of PC1 that connects to the Fa0/2 interface is not the configured MAC address.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 11.1.6\nThe security violation counter for Fa0/2 has been incremented (evidenced by the 1 in the SecurityViolation column). The most secure addresses allowed on port Fa0/2 is 1 and that address was manually entered. Therefore, PC1 must have a different MAC address than the one configured for port Fa0/2. Connections between end devices and the switch, as well as connections between a router and a switch, are made with a straight-through cable.",
  },
  {
    number: 56,
    type: "single",
    text: "A network administrator enters the following commands on the switch SW1.\nWhat is the effect after these commands are entered?",
    code: "SW1(config)# interface range fa0/5 - 10\nSW1(config-if)# ip dhcp snooping limit rate 6",
    options: [
      "If any of the FastEthernet ports 5 through 10 receive more than 6 DHCP messages per second, the port will be shut down.",
      "FastEthernet ports 5 through 10 can receive up to 6 DHCP messages per second of any type.",
      "If any of the FastEthernet ports 5 through 10 receive more than 6 DHCP messages per second, the port will continue to operate and an error message will be sent to the network administrator.",
      "FastEthernet ports 5 through 10 can receive up to 6 DHCP discovery messages per second.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 11.3.3\nWhen DHCP snooping is being configured, the number of DHCP discovery messages that untrusted ports can receive per second should be rate-limited by using the ip dhcp snooping limit rate interface configuration command. When a port receives more messages than the rate allows, the extra messages will be dropped.",
  },
  {
    number: 57,
    type: "single",
    text: "A network administrator is configuring port security on a Cisco switch. The company security policy specifies that when a violation occurs, packets with unknown source addresses should be dropped and no notification should be sent. Which violation mode should be configured on the interfaces?",
    options: ["off", "restrict", "protect", "shutdown"],
    correct: [2],
    explanation:
      "Explanation: Topic 11.1.6\nOn a Cisco switch, an interface can be configured for one of three violation modes, specifying the action to be taken if a violation occurs:Protect - Packets with unknown source addresses are dropped until a sufficient number of secure MAC addresses are removed, or the number of maximum allowable addresses is increased. There is no notification that a security violation has occurred.\nRestrict - Packets with unknown source addresses are dropped until a sufficient number of secure MAC addresses are removed, or the number of maximum allowable addresses is increased. In this mode, there is a notification that a security violation has occurred.\nShutdown - The interface immediately becomes error-disabled and the port LED is turned off.",
  },
  {
    number: 58,
    type: "single",
    text: "A network administrator is working to improve WLAN performance on a dual-band wireless router. What is a simple way to achieve a split-the-traffic result?",
    options: [
      "Add a Wi-Fi range extender to the WLAN and set the AP and the range extender to serve different bands.",
      "Check and keep the firmware of the wireless router updated.",
      "Make sure that different SSIDs are used for the 2.4 GHz and 5 GHz bands.",
      "Require all wireless devices to use the 802.11n standard.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 13.4.3\nBy default, dual-band routers and APs use the same network name on both the 2.4 GHz band and the 5 GHz band. The simplest way to segment traffic is to rename one of the wireless networks.",
  },
  {
    number: 59,
    type: "single",
    text: "Which access control component, implementation, or protocol controls what users can do on the network?",
    options: ["accounting", "802.1X", "authorization", "authentication"],
    correct: [2],
    explanation:
      "Explanation: Topic 10.2.4\nAuthorization is the AAA component that determines which resources a user can access and which operations the user is allowed to perform, that is, it controls what users can do on the network.",
  },
  {
    number: 60,
    type: "single",
    text: "Which type of wireless network is suitable for providing wireless access to a city or district?",
    options: [
      "wireless wide-area network",
      "wireless personal-area network",
      "wireless local-area network",
      "wireless metropolitan-area network",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 12.1.2\nA wireless metropolitan-area network (WMAN) uses transmitters to provide wireless service over a large urban region, such as a city or district.",
  },
  {
    number: 61,
    type: "single",
    text: "On a Cisco 3504 WLC Summary page ( Advanced > Summary ), which tab allows a network administrator to access and configure a WLAN for a specific security option such as WPA2?",
    options: ["MANAGEMENT", "WIRELESS", "WLANs", "SECURITY"],
    correct: [2],
    explanation:
      "Explanation: Topic 13.2.6\nThe WLANs tab in the Cisco 3504 WLC advanced Summary page allows a user to access the configuration of WLANs including security, QoS, and policy-mapping.",
  },
  {
    number: 62,
    type: "single",
    text: "What type of wireless antenna is best suited for providing coverage in large open spaces, such as hallways or large conference rooms?",
    options: ["Yagi", "omnidirectional", "dish", "directional"],
    correct: [1],
    explanation:
      "Explanation: Topic 12.2.6\nOmnidirectional antennas send the radio signals in a 360 degree pattern around the antenna. This provides coverage to devices situated anywhere around the access point. Dishes, directional, and Yagi antennas focus the radio signals in a single direction, making them less suitable for covering large, open areas.",
  },
  {
    number: 64,
    type: "single",
    text: "What security benefit is gained from enabling BPDU guard on PortFast enabled interfaces?",
    options: [
      "preventing buffer overflow attacks",
      "preventing rogue switches from being added to the network",
      "protecting against Layer 2 loops",
      "enforcing the placement of root bridges",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 11.5.1\nBPDU guard immediately error-disables a port that receives a BPDU. This prevents rogue switches from being added to the network. BPDU guard should only be applied to all end-user ports.",
  },
  {
    number: 65,
    type: "single",
    text: "Which access control component, implementation, or protocol logs EXEC and configuration commands configured by a user?",
    options: ["authentication", "authorization", "802.1X", "accounting"],
    correct: [3],
    explanation:
      "Explanation: Topic 10.2.5\nAccounting records what the authenticated user does on the device, including logging EXEC and configuration commands, and collects and reports usage data.",
  },
  {
    number: 66,
    type: "single",
    text: "Which type of wireless network uses transmitters to provide coverage over an extensive geographic area?",
    options: [
      "wireless metropolitan-area network",
      "wireless local-area network",
      "wireless personal-area network",
      "wireless wide-area network",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 12.1.2\nA wireless wide-area network (WWAN) uses transmitters to provide coverage over an extensive geographic area and is suitable for national and global communications.",
  },
  {
    number: 67,
    type: "single",
    text: "Which access control component, implementation, or protocol controls who is permitted to access a network?",
    options: ["authorization", "802.1X", "accounting", "authentication"],
    correct: [3],
    explanation:
      "Explanation: Topic 10.2.2\nAuthentication is the AAA component that verifies the identity of users based on credentials such as usernames and passwords, thereby controlling who is permitted to access the network.",
  },
  {
    number: 68,
    type: "multi",
    text: "What two IEEE 802.11 wireless standards operate only in the 5 GHz range? (Choose two.)",
    choose: 2,
    options: ["802.11g", "802.11ad", "802.11ac", "802.11a", "802.11n", "802.11b"],
    correct: [2, 3],
    explanation:
      "Explanation: Topic 12.1.4\nThe 802.11a and 802.11ac standards operate only in the 5 GHZ range. The 802.11b and 802.11g standards operate only in the 2.4 GHz range. The 802.11n standard operates in both the 2.4 and 5 GHz ranges. The 802.11ad standard operates in the 2.4, 5, and 60 GHz ranges.",
  },
  {
    number: 69,
    type: "single",
    text: "Which type of wireless network uses low powered transmitters for a short-range network, usually 20 to 30 ft. (6 to 9 meters)?",
    options: [
      "wireless metropolitan-area network",
      "wireless personal-area network",
      "wireless local-area network",
      "wireless wide-area network",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 12.1.2\nA wireless personal-area network (WPAN) uses low-powered transmitters for a short-range network, usually 20 to 30 feet (6 to 9 meters), and commonly uses Bluetooth or ZigBee devices.",
  },
  {
    number: 70,
    type: "single",
    text: "Which wireless network topology would be used by network engineers to provide a wireless network for an entire college building?",
    options: ["ad hoc", "hotspot", "infrastructure", "mixed mode"],
    correct: [2],
    explanation:
      "Explanation: Topic 12.3.2\nAd hoc mode (also known as independent basic service set or IBSS) is used in a peer-to-peer wireless network such as when Bluetooth is used. A variation of the ad hoc topology exists when a smart phone or tablet with cellular data access is enabled to create a personal wireless hotspot. Mixed mode allows older wireless NICs to attach to an access point that can use a newer wireless standard.",
  },
  {
    number: 71,
    type: "single",
    text: "Which type of wireless network uses transmitters to provide wireless service over a large urban region?",
    options: [
      "wireless wide-area network",
      "wireless personal-area network",
      "wireless metropolitan-area network",
      "wireless local-area network.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 12.1.2\nA wireless metropolitan-area network (WMAN) uses transmitters to provide wireless service over a large urban region, such as a city or district.",
  },
  {
    number: 72,
    type: "single",
    text: "Which type of wireless network is suitable for use in a home or office?",
    options: [
      "wireless wide-area network",
      "wireless personal-area network",
      "wireless local-area network",
      "wireless metropolitan-area network",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 12.1.1\nA wireless local-area network (WLAN) is suitable for use in a home, office, or campus environment and is based on the IEEE 802.11 standard using a 2.4-GHz or 5-GHz radio frequency.",
  },
  {
    number: 73,
    type: "single",
    text: "Which access control component, implementation, or protocol indicates success or failure of a client-requested service with a PASS or FAIL message?",
    options: ["accounting", "authentication", "802.1X", "authorization"],
    correct: [3],
    explanation:
      "Explanation: Topic 10.2.4\nIn AAA, authorization determines whether a client-requested service is permitted, indicating the result with a PASS or FAIL message.",
  },
  {
    number: 74,
    type: "single",
    text: "Which type of wireless network often makes use of devices mounted on buildings?",
    options: [
      "wireless local-area network",
      "wireless metropolitan-area network",
      "wireless personal-area network",
      "wireless wide-area network",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 12.1.2\nA wireless metropolitan-area network (WMAN) often makes use of transmitters mounted on buildings, such as antennas on rooftops, to provide wireless service over a large urban region.",
  },
  {
    number: 75,
    type: "single",
    text: "A network administrator is configuring DAI on a switch with the command ip arp inspection validate src-mac. What is the purpose of this configuration command?",
    options: [
      "It checks the source MAC address in the Ethernet header against the user-configured ARP ACLs.",
      "It checks the source MAC address in the Ethernet header against the MAC address table.",
      "It checks the source MAC address in the Ethernet header against the sender MAC address in the ARP body.",
      "It checks the source MAC address in the Ethernet header against the target MAC address in the ARP body.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.4.3\nDAI can be configured to check for both destination or source MAC and IP addresses:\nDestination MAC - Checks the destination MAC address in the Ethernet header against the target MAC address in the ARP body.\nSource MAC - Checks the source MAC address in the Ethernet header against the sender MAC address in the ARP body.\nIP address - Checks the ARP body for invalid and unexpected IP addresses including addresses 0.0.0.0, 255.255.255.255, and all IP multicast addresses.",
  },
  {
    number: 76,
    type: "single",
    text: "Which access control component, implementation, or protocol collects and reports usage data?",
    options: ["accounting", "authentication", "authorization", "802.1X"],
    correct: [0],
    explanation:
      "Explanation: Topic 10.2.5\nAccounting is the AAA component that collects and reports usage data. It measures the resources a user consumes during access, such as system time and the amount of data sent and/or received during a session.",
  },
  {
    number: 77,
    type: "single",
    text: "Which type of wireless network uses transmitters to cover a medium-sized network, usually up to 300 feet (91.4 meters)?",
    options: [
      "wireless personal-area network",
      "wireless metropolitan-area network",
      "wireless wide-area network",
      "wireless local-area network",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 12.1.2\nWireless local-area network (WLAN) - Uses transmitters to cover a medium-sized network, usually up to 300 feet. WLANs are suitable for use in a home, office, and even a campus environment. WLANs are based on the 802.11 standard and a 2.4-GHz or 5-GHz radio frequency.",
  },
  {
    number: 78,
    type: "single",
    text: "Which access control component, implementation, or protocol audits what users actions are performed on the network?",
    options: ["Accounting", "Authorization", "Authentication", "802.1X"],
    correct: [0],
    explanation:
      "Explanation: Topic 10.2.5\nThe final plank in the AAA framework is accounting, which measures the resources a user consumes during access. This can include the amount of system time or the amount of data a user has sent and/or received during a session. Accounting is carried out by logging of session statistics and usage information and is used for authorization control, billing, trend analysis, resource utilization, and capacity planning activities.",
  },
  {
    number: 79,
    type: "single",
    text: "Which type of wireless network commonly uses Bluetooth or ZigBee devices?",
    options: [
      "wireless wide-area network",
      "wireless personal-area network",
      "wireless local-area network",
      "wireless metropolitan-area network",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 12.1.2\nA wireless personal-area network (WPAN) is a short-range network that commonly uses Bluetooth or ZigBee devices, typically covering 20 to 30 feet (6 to 9 meters) with low-powered transmitters.",
  },
  {
    number: 80,
    type: "single",
    text: "Which access control component, implementation, or protocol is implemented either locally or as a server-based solution?",
    options: ["authorization", "802.1X", "accounting", "authentication"],
    correct: [3],
    explanation:
      "Explanation: Topic 10.2.3\nAAA authentication can be implemented locally on the network device, using a local database of usernames and passwords (ideal for small networks), or as a server-based solution using protocols such as RADIUS or TACACS+.",
  },
  {
    number: 81,
    type: "multi",
    text: "A technician is troubleshooting a slow WLAN and decides to use the split-the-traffic approach. Which two parameters would have to be configured to do this? (Choose two.)",
    choose: 2,
    options: [
      "Configure the 5 GHz band for streaming multimedia and time sensitive traffic.",
      "Configure the security mode to WPA Personal TKIP/AES for one network and WPA2 Personal AES for the other network",
      "Configure the 2.4 GHz band for basic internet traffic that is not time sensitive.",
      "Configure the security mode to WPA Personal TKIP/AES for both networks.",
      "Configure a common SSID for both split networks.",
    ],
    correct: [0, 2],
    explanation:
      "Explanation: Topic 13.4.3\nThe \"split-the-traffic\" approach optimizes wireless performance by using the 2.4 GHz and 5 GHz bands as two separate networks to manage data flow more effectively. In this configuration, the 5 GHz band is dedicated to high-bandwidth, time-sensitive traffic like streaming multimedia because it is less crowded and has more interference-free channels, while the 2.4 GHz band is used for basic, non-time-sensitive tasks such as web browsing and email.",
  },
  {
    number: 82,
    type: "single",
    text: "Which access control component, implementation, or protocol restricts LAN access through publicly accessible switch ports?",
    options: ["802.1X", "authorization", "accounting", "authentication"],
    correct: [0],
    explanation:
      "Explanation: Topic 10.2.6\n802.1X is a port-based authentication standard that restricts LAN access through publicly accessible switch ports: the client (supplicant) must be authenticated by the authentication server, with the switch (authenticator) controlling access until authentication succeeds.",
  },
];