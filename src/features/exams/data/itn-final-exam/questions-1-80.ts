import type { Question } from "../../lib/types";

/** CCNA 1 v7 Course Final Exam (Introduction to Networks), questions 1-80. The source dump skips question 21, so the numbering keeps that gap. */
export const questions1to80: Question[] = [
  {
    number: 1,
    type: "multi",
    choose: 2,
    text: "Which two traffic types use the Real-Time Transport Protocol (RTP)? (Choose two.)",
    options: ["video", "web", "file transfer", "voice", "peer to peer"],
    correct: [0, 3],
    explanation:
      "Explanation: Topic 14.3.4\nThe Real-Time Transport Protocol (RTP) is a specialized communication protocol designed specifically to facilitate the end-to-end delivery of data with real-time characteristics, such as interactive audio and video. Within the framework of network applications, particularly those utilizing the User Datagram Protocol (UDP) for transport, voice and video traffic are the primary types that leverage RTP. These media-rich transmissions, which include services such as Voice over IP (VoIP) and live multimedia streaming, are highly sensitive to latency and jitter; consequently, they prioritize the rapid, continuous flow of information over the absolute reliability provided by connection-oriented protocols. While applications such as file transfers and web browsing rely on the retransmission and sequencing mechanisms of TCP to ensure data integrity, real-time multimedia streaming accepts a degree of packet loss in favor of maintaining a synchronized and uninterrupted user experience. To manage these requirements effectively, RTP is often deployed in conjunction with the Real-Time Transport Control Protocol (RTCP) to minimize latency issues and ensure the priority delivery of real-time packets across the network infrastructure.",
  },
  {
    number: 2,
    type: "single",
    text: "Which wireless technology has low-power and data rate requirements making it popular in home automation applications?",
    options: ["ZigBee", "LoRaWAN", "5G", "Wi-Fi"],
    correct: [0],
    explanation:
      "Explanation: Topic 4.6.2\nZigBee is an IEEE 802.15.4 wireless standard designed for creating personal-area networks. Low energy, power, and data rate requirements make Zigbee a popular protocol for connecting home automation devices.",
  },
  {
    number: 3,
    type: "single",
    text: "Which layer of the TCP/IP model provides a route to forward messages through an internetwork?",
    options: ["application", "network access", "internet", "transport"],
    correct: [2],
    explanation:
      "Explanation: Topic 3.5.3\nThe OSI model network layer corresponds directly to the internet layer of the TCP/IP model and is used to describe protocols that address and route messages through an internetwork.",
  },
  {
    number: 4,
    type: "single",
    text: "Which type of server relies on record types such as A, NS, AAAA, and MX in order to provide services?",
    options: ["DNS", "email", "file", "web"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.4.2\nA DNS server stores records that are used to resolve IP addresses to host names. Some DNS record types include the following:\nA – an end device IPv4 address\nNS – an authoritative name server\nAAAA – an end device IPv6 address\nMX – a mail exchange record",
  },
  {
    number: 5,
    type: "single",
    text: "What are proprietary protocols?",
    options: [
      "protocols developed by private organizations to operate on any vendor hardware",
      "protocols that can be freely used by any organization or vendor",
      "protocols developed by organizations who have control over their definition and operation",
      "a collection of protocols known as the TCP/IP protocol suite",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 3.3.4\nProprietary protocols have their definition and operation controlled by one company or vendor. Some of them can be used by different organizations with permission from the owner. The TCP/IP protocol suite is an open standard, not a proprietary protocol.",
  },
  {
    number: 6,
    type: "single",
    text: "What service is provided by DNS?",
    options: [
      "Resolves domain names, such as cisco.com, into IP addresses.",
      "A basic set of rules for exchanging text, graphic images, sound, video, and other multimedia files on the web.",
      "Allows for data transfers between a client and a file server.",
      "Uses encryption to secure the exchange of text, graphic images, sound, and video on the web.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 15.4.1\nThe Domain Name System (DNS) is a foundational application layer protocol designed to automate the translation of human-readable domain names into the numeric IP addresses required for network communication. Because it is impractical for users to memorize complex strings of numbers, DNS provides a hierarchical mapping service that allows individuals to use recognizable names, such as cisco.com, while the network infrastructure continues to route data based on underlying numeric identifiers. This automated resolution process is essential for maintaining connectivity even if a server's numeric IP address changes, as the updated address can simply be re-linked to the existing domain name without impacting the end user's experience. While other protocols like HTTP manage the exchange of web content and FTP handles file transfers, DNS specifically serves as the directory service that ensures requests are directed to the correct destination host.",
  },
  {
    number: 7,
    type: "single",
    text: "A client packet is received by a server. The packet has a destination port number of 110. What service is the client requesting?",
    options: ["DNS", "DHCP", "SMTP", "POP3"],
    correct: [3],
    explanation:
      "Explanation: Topic 14.4.3\nThe transport layer utilizes destination port numbers to identify the specific service or application being requested on a server. According to the standard port assignments defined by the Internet Assigned Numbers Authority (IANA), port 110 is reserved as a well-known port for the Post Office Protocol version 3 (POP3). When a server receives a packet with this destination port, it recognizes that the client is requesting to establish a connection for retrieving email messages. While other ports are used for different mail services—such as port 25 for SMTP or port 143 for IMAP—port 110 specifically signals the server to direct the traffic to the POP3 application process to facilitate the download of mail to the client's local application.",
  },
  {
    number: 8,
    type: "single",
    text: "What command can be used on a Windows PC to see the IP configuration of that computer?",
    options: ["show ip interface brief", "ping", "show interfaces", "ipconfig"],
    correct: [3],
    explanation:
      "Explanation: Topic 17.5.1\nThe ipconfig command is the primary utility used on a Windows-based computer to display its current IP configuration, including the IPv4 and IPv6 addresses, subnet mask, and default gateway. While networking devices like routers and switches use Cisco IOS commands such as show ip interface brief or show interfaces to verify their own configurations, Windows hosts rely on ipconfig to provide a summary of network settings directly from the command prompt. For a more comprehensive view that includes physical (MAC) addresses and DNS server details, the command can be extended with the /all switch",
  },
  {
    number: 9,
    type: "single",
    text: "A wired laser printer is attached to a home computer. That printer has been shared so that other computers on the home network can also use the printer. What networking model is in use?",
    options: [
      "client-based",
      "master-slave",
      "point-to-point",
      "peer-to-peer (P2P)",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 1.2.2\nPeer-to-peer (P2P) networks have two or more network devices that can share resources such as printers or files without having a dedicated server.",
  },
  {
    number: 10,
    type: "single",
    text: "What characteristic describes a virus?",
    options: [
      "a network device that filters access and traffic coming into a network",
      "the use of stolen credentials to access private data",
      "an attack that slows or crashes a device or network service",
      "malicious software or code running on an end device",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 16.2.1\nA virus is a specific type of malware defined as malicious software or code running on an end device, such as a computer, laptop, or mobile phone. Unlike standalone threats, a virus typically propagates by inserting a copy of itself into another program or executable file and remains dormant until a user runs that host file. Once activated, the virus can spread to other systems through network transfers, file sharing, or email attachments, potentially causing damage ranging from minor annoyances to the total destruction of data and system functionality. This distinguishes viruses from other security concepts, such as firewalls which are hardware or software filters, or denial of service attacks which focus on overwhelming network resources.",
  },
  {
    number: 11,
    type: "single",
    text: "Three bank employees are using the corporate network. The first employee uses a web browser to view a company web page in order to read some announcements. The second employee accesses the corporate database to perform some financial transactions. The third employee participates in an important live audio conference with other corporate managers in branch offices. If QoS is implemented on this network, what will be the priorities from highest to lowest of the different data types?",
    options: [
      "financial transactions, web page, audio conference",
      "audio conference, financial transactions, web page",
      "financial transactions, audio conference, web page",
      "audio conference, web page, financial transactions",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 1.6.4\nQoS mechanisms enable the establishment of queue management strategies that enforce priorities for different categories of application data. Thus, this queuing enables voice data to have priority over transaction data, which has priority over web data.",
  },
  {
    number: 12,
    type: "pair",
    text: "Match the description to the IPv6 addressing component. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-final-exam/q12-exhibit.png",
      alt: "IPv6 addressing component matching board with a subnet mask decoy",
      width: 818,
      height: 511,
    },
    left: [
      "This network portion of the address is assigned by the provider.",
      "This part of the address is used by an organization to identify subnets.",
      "This part of the address is the equivalent to the host portion of an IPv4 address.",
    ],
    right: [
      "global routing prefix",
      "subnet ID",
      "interface ID",
      "subnet mask",
    ],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
    },
    explanation:
      "Explanation: Topic 12.3.6\nThe global routing prefix is the network portion of the address that the provider assigns. The subnet ID is the part an organization uses to identify its subnets. The interface ID is the equivalent of the host portion of an IPv4 address. A subnet mask is an IPv4 concept, so it is not used here.",
  },
  {
    number: 13,
    type: "single",
    text: "Refer to the exhibit. If Host1 were to transfer a file to the server, what layers of the TCP/IP model would be used?",
    exhibit: {
      src: "/images/itn-final-exam/q13-exhibit.png",
      alt: "Network topology with Host1, a switch, a router, and a server",
      width: 525,
      height: 358,
    },
    options: [
      "only application and Internet layers",
      "only Internet and network access layers",
      "only application, Internet, and network access layers",
      "application, transport, Internet, and network access layers",
      "only application, transport, network, data link, and physical layers",
      "application, session, transport, network, data link, and physical layers",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 3.5.3\nThe TCP/IP model contains the application, transport, internet, and network access layers. A file transfer uses the FTP application layer protocol. The data would move from the application layer through all of the layers of the model and across the network to the file server.",
  },
  {
    number: 14,
    type: "pair",
    text: "Match the characteristic to the forwarding method. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-final-exam/q14-exhibit.png",
      alt: "Forwarding method matching board with cut-through and store-and-forward targets",
      width: 820,
      height: 628,
    },
    left: [
      "low latency",
      "may forward runt frames",
      "begins forwarding when the destination address is received",
      "always stores the entire frame",
      "checks the CRC before forwarding",
      "checks the frame length before forwarding",
    ],
    right: ["cut-through", "store-and-forward"],
    allowMultiMatch: true,
    correctPairs: {
      0: 0,
      1: 0,
      2: 0,
      3: 1,
      4: 1,
      5: 1,
    },
    explanation:
      'Explanation: Topic 7.4.1\nA store-and-forward switch always stores the entire frame before forwarding, and checks its CRC and frame length. A cut-through switch can begin forwarding as soon as it has read the destination address, so it has lower latency but may forward a corrupt or runt frame. Neither method forwards broadcasts selectively, so "does not forward broadcasts" is not a characteristic of either forwarding method.',
  },
  {
    number: 15,
    type: "single",
    text: "Refer to the exhibit. The IP address of which device interface should be used as the default gateway setting of host H1?",
    exhibit: {
      src: "/images/itn-final-exam/q15-exhibit.jpg",
      alt: "Network topology showing router R1 and two host subnets",
      width: 579,
      height: 387,
    },
    options: ["R1: S0/0/0", "R2: S0/0/1", "R1: G0/0", "R2: S0/0/0"],
    correct: [2],
    explanation:
      "Explanation: Topic 10.3.1\nThe default gateway for host H1 is the router interface that is attached to the LAN that H1 is a member of. In this case, that is the G0/0 interface of R1. H1 should be configured with the IP address of that interface in its addressing settings. R1 will provide routing services to packets from H1 that need to be forwarded to remote networks.",
  },
  {
    number: 16,
    type: "single",
    text: "What service is provided by Internet Messenger?",
    options: [
      "An application that allows real-time chatting among remote users.",
      "Allows remote access to network devices and servers.",
      "Resolves domain names, such as cisco.com, into IP addresses.",
      "Uses encryption to provide secure remote access to network devices and servers.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.2.1\nInternet Messenger, widely recognized as instant messaging, is a service that facilitates real-time communication between remote users across a network infrastructure. According to the documentation on host roles, it functions as client software that allows individuals to interact synchronously, enabling the immediate exchange of text and ideas within online communities or organizational settings. Unlike asynchronous services such as email, which follow a store-and-forward model, Internet Messenger supports simultaneous messaging where users can both initiate and receive data in a continuous stream to achieve their communication objectives. This application is essential for modern collaboration, often operating through peer-to-peer or hybrid networking models to ensure that users stay connected across geographic and cultural boundaries.",
  },
  {
    number: 17,
    type: "pair",
    text: "Refer to the exhibit. Match the network with the correct IP address and prefix that will satisfy the usable host addressing requirements for each network.",
    exhibit: [
      {
        src: "/images/itn-final-exam/q17-exhibit-1.png",
        alt: "Exhibit with networks A through D and a board of subnet address options",
        width: 595,
        height: 401,
      },
      {
        src: "/images/itn-final-exam/q17-exhibit-2.png",
        alt: "Exhibit with networks A through D and a board of subnet address options",
        width: 1849,
        height: 908,
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
      "Explanation: Topic 11.7.2\nNetwork A needs to use 192.168.0.128 /25, which yields 128 host addresses.\nNetwork B needs to use 192.168.0.0 /26, which yields 64 host addresses.\nNetwork C needs to use 192.168.0.96 /27, which yields 32 host addresses.\nNetwork D needs to use 192.168.0.80 /30, which yields 4 host addresses.",
  },
  {
    number: 18,
    type: "single",
    text: "Refer to the exhibit. Which protocol was responsible for building the table that is shown?",
    exhibit: {
      src: "/images/itn-final-exam/q18-exhibit.jpg",
      alt: "Exhibit for question 18",
      width: 549,
      height: 297,
    },
    options: ["DHCP", "ARP", "DNS", "ICMP"],
    correct: [1],
    explanation:
      "Explanation: Topic 9.2.7\nThe table that is shown corresponds to the output of the arp -a command, a command that is used on a Windows PC to display the ARP table.",
  },
  {
    number: 19,
    type: "multi",
    choose: 2,
    text: "A network administrator notices that some newly installed Ethernet cabling is carrying corrupt and distorted data signals. The new cabling was installed in the ceiling close to fluorescent lights and electrical equipment. Which two factors may interfere with the copper cabling and result in signal distortion and data corruption? (Choose two.)",
    options: [
      "crosstalk",
      "extended length of cabling",
      "RFI",
      "EMI",
      "signal attenuation",
    ],
    correct: [2, 3],
    explanation:
      "Explanation: Topic 4.3.1\nCopper cabling transmits data using electrical pulses, which are highly susceptible to distortion from external electromagnetic signals. According to the sources, electromagnetic interference (EMI) and radio frequency interference (RFI) are two primary factors that can corrupt data signals when cabling is positioned near electronic noise sources such as fluorescent lights, electric motors, or other heavy electrical equipment. While signal attenuation is related to the deterioration of a signal over an extended length of cabling and crosstalk involves interference between adjacent wires within the same cable, EMI and RFI represent external environmental disruptions that can change bit values during transmission. To mitigate these specific effects, network administrators must often use shielded cabling or ensure a physical distance between the data cables and potential sources of interference.",
  },
  {
    number: 20,
    type: "single",
    text: "A host is trying to send a packet to a device on a remote LAN segment, but there are currently no mappings in its ARP cache. How will the device obtain a destination MAC address?",
    options: [
      "It will send the frame and use its own MAC address as the destination.",
      "It will send an ARP request for the MAC address of the destination device.",
      "It will send the frame with a broadcast MAC address.",
      "It will send a request to the DNS server for the destination MAC address.",
      "It will send an ARP request for the MAC address of the default gateway.",
    ],
    correct: [4],
    explanation:
      "Explanation: Topic 9.2.5\nWhen a source host identifies that a destination IP address resides on a remote network segment, it must forward the packet to its default gateway (the local router) to reach that destination. Because Layer 2 Ethernet frames are designed for local delivery within the same segment, the host requires the physical MAC address of the gateway's interface to encapsulate the IP packet. If the ARP cache does not contain a mapping for the gateway's IP address, the host initiates an ARP request specifically for the default gateway's MAC address. The host does not request the MAC address of the final destination device, as that device is not on the local segment and cannot respond to local Layer 2 broadcast requests. Once the gateway's MAC address is resolved and stored in the cache, the host can successfully transmit the frame to the router for further delivery across the internetwork.",
  },
  {
    number: 22,
    type: "single",
    text: "A client packet is received by a server. The packet has a destination port number of 53. What service is the client requesting?",
    options: ["DNS", "NetBIOS (NetBT)", "POP3", "IMAP"],
    correct: [0],
    explanation:
      "Explanation: Topic 14.4.3\nThe transport layer utilizes destination port numbers to identify the specific application or service being requested on a destination server. According to the standard assignments defined by the Internet Assigned Numbers Authority (IANA), port 53 is categorized as a well-known port reserved specifically for the Domain Name System (DNS). When a server receives a packet with this destination port, it recognizes that the client is requesting a name resolution service, typically to translate a human-readable domain name into its corresponding numeric IP address. While other services such as POP3 or IMAP utilize their own designated well-known ports (110 and 143 respectively) to facilitate email retrieval, port 53 remains the global standard for DNS queries and responses using both UDP and TCP transport protocols.",
  },
  {
    number: 23,
    type: "single",
    text: "A network administrator is adding a new LAN to a branch office. The new LAN must support 25 connected devices. What is the smallest network mask that the network administrator can use for the new network?",
    options: [
      "255.255.255.128",
      "255.255.255.192",
      "255.255.255.224",
      "255.255.255.240",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.7.2\nTo support a LAN with 25 connected devices, a network administrator must select a subnet mask that provides a sufficient number of usable host addresses while minimizing the waste of address space. The number of usable hosts is determined by the formula 2n−2, where n represents the number of host bits remaining in the mask. A subnet mask of 255.255.255.224 (which corresponds to a /27 prefix) leaves 5 bits for the host portion, allowing for 30 usable host addresses (25−2=30). This is the most efficient (smallest) block among the choices provided because the next available mask, 255.255.255.240 (/28), only provides 14 usable addresses (24−2=14), which would not accommodate the 25 required devices. By utilizing the /27 mask, the administrator ensures that the requirements of the branch office are met while adhering to the principle of maximizing available subnets by minimizing unused IP addresses.",
  },
  {
    number: 24,
    type: "single",
    text: "What characteristic describes a Trojan horse?",
    options: [
      "malicious software or code running on an end device",
      "an attack that slows or crashes a device or network service",
      "the use of stolen credentials to access private data",
      "a network device that filters access and traffic coming into a network",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.2.1\nA Trojan horse is a specialized form of malware characterized by malicious software or code running on an end device that intentionally disguises itself as a legitimate program to deceive users. Unlike viruses which attach to existing host programs or worms which are standalone and self-propagating, Trojan horses rely on user interaction—such as opening an email attachment or executing a download—to be loaded and activated on a system. Once executed, the software can perform a variety of illegitimate actions, including the destruction of data, the theft of sensitive information, or the creation of unauthorized back doors that provide threat actors with persistent access to the compromised host. Because they present a harmful payload within a seemingly benign package, Trojan horses are considered a primary external security threat that exploits human trust rather than relying solely on technical system vulnerabilities.",
  },
  {
    number: 25,
    type: "single",
    text: "What service is provided by HTTPS?",
    options: [
      "Uses encryption to provide secure remote access to network devices and servers.",
      "Resolves domain names, such as cisco.com, into IP addresses.",
      "Uses encryption to secure the exchange of text, graphic images, sound, and video on the web.",
      "Allows remote access to network devices and servers.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.3.2\nHypertext Transfer Protocol Secure (HTTPS) is the encrypted version of HTTP, designed to provide authentication and secure data transmission across the World Wide Web. While standard HTTP transmits data in plaintext that can be intercepted and read, HTTPS utilizes Secure Socket Layer (SSL) or Transport Layer Security (TLS) to encrypt the data stream as it travels between the client browser and the web server. This encryption specifically protects various types of web content—including text, graphic images, and multimedia files—ensuring that the information remains confidential and has not been altered during transit. Consequently, many organizations implement HTTPS as a security policy to authenticate websites and protect user interactions against data interception and theft.",
  },
  {
    number: 26,
    type: "single",
    text: "A technician with a PC is using multiple applications while connected to the Internet. How is the PC able to keep track of the data flow between multiple application sessions and have each application receive the correct packet flows?",
    options: [
      "The data flow is being tracked based on the destination MAC address of the technician PC.",
      "The data flow is being tracked based on the source port number that is used by each application.",
      "The data flow is being tracked based on the source IP address that is used by the PC of the technician.",
      "The data flow is being tracked based on the destination IP address that is used by the PC of the technician.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 14.4.1\nThe source port number of an application is randomly generated and used to individually keep track of each session connecting out to the Internet. Each application will use a unique source port number to provide simultaneous communication from multiple applications through the Internet.",
  },
  {
    number: 27,
    type: "single",
    text: "A network administrator is adding a new LAN to a branch office. The new LAN must support 61 connected devices. What is the smallest network mask that the network administrator can use for the new network?",
    options: [
      "255.255.255.240",
      "255.255.255.224",
      "255.255.255.192",
      "255.255.255.128",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.7.2\nTo support a LAN with 61 connected devices, the network administrator must select a subnet mask that provides a sufficient number of usable host addresses while minimizing wasted address space. The number of usable hosts is calculated using the formula 2n−2, where n represents the number of host bits remaining in the mask. A subnet mask of 255.255.255.192 (which corresponds to a /26 prefix) leaves 6 bits for the host portion, providing 62 usable host addresses. This is the most efficient (smallest) mask among the choices because the next tighter mask, 255.255.255.224 (/27), only provides 30 usable addresses, which is insufficient for the 61 required devices. While the 255.255.255.128 (/25) mask would also accommodate the devices, it provides 126 usable addresses and would therefore result in a significant number of unused IP addresses compared to the /26 option.",
  },
  {
    number: 28,
    type: "pair",
    text: "Refer to the exhibit. Match the network with the correct IP address and prefix that will satisfy the usable host addressing requirements for each network. (Not all options are used.)",
    exhibit: [
      {
        src: "/images/itn-final-exam/q28-exhibit-1.jpg",
        alt: "Exhibit with networks A through D and a board of subnet address options",
        width: 595,
        height: 401,
      },
      {
        src: "/images/itn-final-exam/q28-exhibit-2.jpg",
        alt: "Exhibit with networks A through D and a board of subnet address options",
        width: 653,
        height: 666,
      },
    ],
    left: ["Network A", "Network B", "Network C", "Network D"],
    right: [
      "192.168.0.0 /25",
      "192.168.0.128 /26",
      "192.168.0.192 /27",
      "192.168.0.224 /30",
    ],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
    },
    explanation:
      "Explanation: Topic 11.7.2\nNetwork A needs to use 192.168.0.0 /25, which yields 128 host addresses.\nNetwork B needs to use 192.168.0.128 /26, which yields 64 host addresses.\nNetwork C needs to use 192.168.0.192 /27, which yields 32 host addresses.\nNetwork D needs to use 192.168.0.224 /30, which yields 4 host addresses.",
  },
  {
    number: 29,
    type: "single",
    text: "What characteristic describes a DoS attack?",
    options: [
      "the use of stolen credentials to access private data",
      "a network device that filters access and traffic coming into a network",
      "software that is installed on a user device and collects information about the user",
      "an attack that slows or crashes a device or network service",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 16.2.4\nA Denial of Service (DoS) attack is a malicious attempt to prevent legitimate users from accessing network services or resources by intentionally consuming system capacity. According to the sources, the primary characteristic of this attack type is that it is designed to slow or crash the applications and processes running on a network device. While other security threats such as identity theft or spyware focus on stealing data or monitoring user activity, DoS attacks prioritize the disruption of service availability, often leading to significant operational downtime and financial loss for an organization.",
  },
  {
    number: 30,
    type: "pair",
    text: "Match the application protocols to the correct transport protocols.",
    exhibit: {
      src: "/images/itn-final-exam/q30-exhibit.jpg",
      alt: "Application protocol matching board with TCP and UDP targets",
      width: 726,
      height: 490,
    },
    left: ["DHCP", "FTP", "HTTP", "SMTP", "TFTP"],
    right: ["TCP", "UDP"],
    allowMultiMatch: true,
    correctPairs: {
      0: 1,
      1: 0,
      2: 0,
      3: 0,
      4: 1,
    },
    explanation:
      "Explanation: Topic 14.4.3\nFTP, HTTP, and SMTP run over TCP because they need reliable, ordered delivery. DHCP and TFTP use UDP because they rely on fast, connectionless exchanges: DHCP broadcasts discovery messages before the client has an address, and TFTP provides its own lightweight reliability mechanism.",
  },
  {
    number: 31,
    type: "single",
    text: "What service is provided by SMTP?",
    options: [
      "Allows clients to send email to a mail server and the servers to send email to other servers.",
      "Allows remote access to network devices and servers.",
      "Uses encryption to provide secure remote access to network devices and servers.",
      "An application that allows real-time chatting among remote users.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 15.3.4\nThe Simple Mail Transfer Protocol (SMTP) is a foundational application layer protocol designed to facilitate the reliable transmission of electronic mail across a network. According to the sources, its primary function is to enable email clients to send messages to a local mail server and to allow those mail servers to further relay messages to other servers across the internet. Unlike retrieval protocols such as POP3 or IMAP, which are used by clients to download or manage mail stored on a server, SMTP specifically handles the outgoing delivery process and requires a properly formatted message header containing recipient and sender addresses. This service operates using a store-and-forward method where messages are spooled and periodically retried if the destination server is temporarily busy or offline, ensuring that communication remains persistent even when immediate end-to-end connectivity is not available.",
  },
  {
    number: 32,
    type: "single",
    text: "Which scenario describes a function provided by the transport layer?",
    options: [
      "A student is using a classroom VoIP phone to call home. The unique identifier burned into the phone is a transport layer address used to contact another network device on the same network.",
      "A student is playing a short web-based movie with sound. The movie and sound are encoded within the transport layer header.",
      "A student has two web browser windows open in order to access two web sites. The transport layer ensures the correct web page is delivered to the correct browser window.",
      "A corporate worker is accessing a web server located on a corporate network. The transport layer formats the screen so the web page appears properly no matter what device is being used to view the web site.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 14.1.2\nThe source and destination port numbers are used to identify the correct application and window within that application.",
  },
  {
    number: 33,
    type: "single",
    text: "Refer to the exhibit. Host B on subnet Teachers transmits a packet to host D on subnet Students. Which Layer 2 and Layer 3 addresses are contained in the PDUs that are transmitted from host B to the router?",
    exhibit: {
      src: "/images/itn-final-exam/q33-exhibit.png",
      alt: "Topology showing host B on the Teachers subnet and host D on the Students subnet",
      width: 647,
      height: 245,
    },
    options: [
      "Layer 2 destination address = 00-00-0c-94-36-ab\nLayer 2 source address = 00-00-0c-94-36-bb\nLayer 3 destination address = 172.16.20.200\nLayer 3 source address = 172.16.10.200",
      "Layer 2 destination address = 00-00-0c-94-36-dd\nLayer 2 source address = 00-00-0c-94-36-bb\nLayer 3 destination address = 172.16.20.200\nLayer 3 source address = 172.16.10.200",
      "Layer 2 destination address = 00-00-0c-94-36-cd\nLayer 2 source address = 00-00-0c-94-36-bb\nLayer 3 destination address = 172.16.20.99\nLayer 3 source address = 172.16.10.200",
      "Layer 2 destination address = 00-00-0c-94-36-ab\nLayer 2 source address = 00-00-0c-94-36-bb\nLayer 3 destination address = 172.16.20.200\nLayer 3 source address = 172.16.100.200",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 9.1.2\nHost B sends the frame to its default gateway, the router interface on the Teachers subnet, so the Layer 2 destination is the router MAC 00-00-0c-94-36-ab and the source is host B MAC 00-00-0c-94-36-bb. The packet keeps host D IP address 172.16.20.200 as the destination and host B IP address 172.16.10.200 as the source.",
  },
  {
    number: 34,
    type: "single",
    text: 'What does the term "attenuation" mean in data communication?',
    options: [
      "strengthening of a signal by a networking device",
      "leakage of signals from one cable pair to another",
      "time for a signal to reach its destination",
      "loss of signal strength as distance increases",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 4.3.1\nData is transmitted on copper cables as electrical pulses. A detector in the network interface of a destination device must receive a signal that can be successfully decoded to match the signal sent. However, the farther the signal travels, the more it deteriorates. This is referred to as signal attenuation.",
  },
  {
    number: 35,
    type: "single",
    text: "Refer to the exhibit. An administrator is trying to configure the switch but receives the error message that is displayed in the exhibit. What is the problem?",
    exhibit: {
      src: "/images/itn-final-exam/q35-exhibit.png",
      alt: "Switch console error message about an unrecognized command",
      width: 308,
      height: 55,
    },
    options: [
      "The entire command, configure terminal, must be used.",
      "The administrator is already in global configuration mode.",
      "The administrator must first enter privileged EXEC mode before issuing the command.",
      "The administrator must connect via the console port to access global configuration mode.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 2.2.4\nIn order to enter global configuration mode, the command configure terminal, or a shortened version such as config t, must be entered from privileged EXEC mode. In this scenario the administrator is in user EXEC mode, as indicated by the > symbol after the hostname. The administrator would need to use the enable command to move into privileged EXEC mode before entering the configure terminal command.",
  },
  {
    number: 36,
    type: "multi",
    choose: 2,
    text: "Which two protocols operate at the top layer of the TCP/IP protocol suite? (Choose two.)",
    options: ["TCP", "IP", "UDP", "POP", "DNS", "Ethernet"],
    correct: [3, 4],
    explanation:
      "Explanation: Topic 3.3.4\nThe top layer of the TCP/IP protocol suite is the application layer, which provides the primary interface for network-aware software to interact with the underlying network infrastructure. Within this model, both DNS (Domain Name System) and POP (Post Office Protocol) function at this highest level to facilitate specific user-facing services, such as translating human-readable domain names into numeric IP addresses and enabling the retrieval of email from mail servers. While other protocols like TCP and UDP operate at the transport layer to manage end-to-end communication, and IP operates at the internet layer to handle routing, DNS and POP are responsible for defining the content and formatting of requests and responses for their respective applications. Therefore, they belong to the application layer, ensuring that data is presented in a format that both the source and destination hosts can process effectively.",
  },
  {
    number: 37,
    type: "single",
    text: "A company has a file server that shares a folder named Public. The network security policy specifies that the Public folder is assigned Read-Only rights to anyone who can log into the server while the Edit rights are assigned only to the network admin group. Which component is addressed in the AAA network service framework?",
    options: ["automation", "accounting", "authentication", "authorization"],
    correct: [3],
    explanation:
      "Explanation: Topic 16.3.4\nAfter a user is successfully authenticated (logged into the server), the authorization is the process of determining what network resources the user can access and what operations (such as read or edit) the user can perform.",
  },
  {
    number: 38,
    type: "multi",
    choose: 3,
    text: "What three requirements are defined by the protocols used in network communcations to allow message transmission across a network? (Choose three.)",
    options: [
      "message size",
      "message encoding",
      "connector specifications",
      "media selection",
      "delivery options",
      "end-device installation",
    ],
    correct: [0, 1, 4],
    explanation:
      "Explanation: Topic 3.1.5\nNetwork communication protocols establish specific rules and standards to ensure that data is successfully transmitted and understood by both the sender and the receiver. According to the sources, these protocols define several critical requirements for message transmission, including message encoding, which converts information into an acceptable format for the medium, and message size, which ensures data is broken into manageable pieces that receiving devices can process. Furthermore, protocols specify delivery options—such as unicast, multicast, or broadcast—to determine whether a message is intended for a single individual or a broader group of recipients. By standardizing these elements along with message timing and formatting, protocols facilitate effective communication between diverse devices across the network infrastructure.",
  },
  {
    number: 39,
    type: "multi",
    choose: 2,
    text: "What are two characteristics of IP? (Choose two.)",
    options: [
      "does not require a dedicated end-to-end connection",
      "operates independently of the network media",
      "retransmits packets if errors occur",
      "re-assembles out of order packets into the correct order at the receiver end",
      "guarantees delivery of packets",
    ],
    correct: [0, 1],
    explanation:
      "Explanation: Topic 8.1.3\nThe Internet Protocol (IP) is a connectionless, best effort protocol. This means that IP requires no end-to-end connection nor does it guarantee delivery of packets. IP is also media independent, which means it operates independently of the network media carrying the packets.",
  },
  {
    number: 40,
    type: "multi",
    choose: 3,
    text: "An employee of a large corporation remotely logs into the company using the appropriate username and password. The employee is attending an important video conference with a customer concerning a large sale. It is important for the video quality to be excellent during the meeting. The employee is unaware that after a successful login, the connection to the company ISP failed. The secondary connection, however, activated within seconds. The disruption was not noticed by the employee or other employees.\nWhat three network characteristics are described in this scenario? (Choose three.)",
    options: [
      "security",
      "quality of service",
      "scalability",
      "powerline networking",
      "integrity",
      "fault tolerance",
    ],
    correct: [0, 1, 5],
    explanation:
      "Explanation: Topic 1.6.1\nUsernames and passwords relate to network security. Good quality video, to support video conferencing, relates to prioritizing the video traffic with quality of service (QoS). The fact that a connection to an ISP failed and was then restored but went unnoticed by employees relates to the fault tolerant design of the network.",
  },
  {
    number: 41,
    type: "multi",
    choose: 2,
    text: "What are two common causes of signal degradation when using UTP cabling? (Choose two.)",
    options: [
      "improper termination",
      "low-quality shielding in cable",
      "installing cables in conduit",
      "low-quality cable or connectors",
      "loss of light over long distances",
    ],
    correct: [0, 3],
    explanation:
      "Explanation: Topic 4.4.2\nWhen terminated improperly, each cable is a potential source of physical layer performance degradation.",
  },
  {
    number: 42,
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
      "Explanation: Topic 11.5.2\nFor the subnet of 192.168.1.64/26, there are 6 bits for host addresses, yielding 64 possible addresses. However, the first and last subnets are the network and broadcast addresses for this subnet. Therefore, the range of host addresses for this subnet is 192.168.1.65 to 192.168.1.126. The other subnets do not contain the address 192.168.1.96 as a valid host address.",
  },
  {
    number: 43,
    type: "multi",
    choose: 2,
    text: "Refer to the exhibit. On the basis of the output, which two statements about network connectivity are correct? (Choose two.)",
    exhibit: {
      src: "/images/itn-final-exam/q43-exhibit.jpg",
      alt: "Ping command output for the network",
      width: 481,
      height: 148,
    },
    options: [
      "This host does not have a default gateway configured.",
      "There are 4 hops between this device and the device at 192.168.100.1.",
      "There is connectivity between this device and the device at 192.168.100.1.",
      "The connectivity between these two hosts allows for videoconferencing calls.",
      "The average transmission time between the two hosts is 2 milliseconds.",
    ],
    correct: [1, 2],
    explanation:
      "Explanation: Topic 17.4.3\nThe output displays a successful Layer 3 connection between a host computer and a host at 19.168.100.1. It can be determined that 4 hops exist between them and the average transmission time is 1 milliseconds. Layer 3 connectivity does not necessarily mean that an application can run between the hosts.",
  },
  {
    number: 44,
    type: "multi",
    choose: 2,
    text: "Which two statements describe how to assess traffic flow patterns and network traffic types using a protocol analyzer? (Choose two.)",
    options: [
      "Capture traffic on the weekends when most employees are off work.",
      "Capture traffic during peak utilization times to get a good representation of the different traffic types.",
      "Only capture traffic in the areas of the network that receive most of the traffic such as the data center.",
      "Perform the capture on different network segments.",
      "Only capture WAN traffic because traffic to the web is responsible for the largest amount of traffic on a network.",
    ],
    correct: [1, 3],
    explanation:
      "Explanation: Topic 17.3.2\nTraffic flow patterns should be gathered during peak utilization times to get a good representation of the different traffic types. The capture should also be performed on different network segments because some traffic will be local to a particular segment.",
  },
  {
    number: 45,
    type: "single",
    text: "What is the consequence of configuring a router with the ipv6 unicast-routing global configuration command?",
    options: [
      "All router interfaces will be automatically activated.",
      "The IPv6 enabled router interfaces begin sending ICMPv6 Router Advertisement messages.",
      "Each router interface will generate an IPv6 link-local address.",
      "It statically creates a global unicast address on this router.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 12.5.1\nThe ipv6 unicast-routing global configuration command is a critical step in IPv6 implementation because Cisco routers do not function as IPv6 routers by default. Once this command is issued, the router joins the all-routers multicast group and its IPv6-enabled interfaces begin transmitting ICMPv6 Router Advertisement (RA) messages periodically or in response to host solicitations. These RA messages are essential for dynamic address allocation, as they provide neighboring hosts with vital information such as the network prefix, prefix length, and the default gateway address. While link-local addresses are generated automatically when IPv6 is enabled on an interface, the global unicast routing command is specifically what triggers the router to begin its active role in directing IPv6 traffic and facilitating stateless address autoconfiguration (SLAAC).",
  },
  {
    number: 46,
    type: "multi",
    choose: 3,
    text: "Which three layers of the OSI model map to the application layer of the TCP/IP model? (Choose three.)",
    options: [
      "application",
      "network",
      "data link",
      "session",
      "presentation",
      "transport",
    ],
    correct: [0, 3, 4],
    explanation:
      "Explanation: Topic 15.1.1\nThe TCP/IP model consists of four layers: application, transport, internet, and network access. The OSI model consists of seven layers: application, presentation, session, transport, network, data link, and physical. The top three layers of the OSI model: application, presentation, and session map to the application layer of the TCP/IP model.",
  },
  {
    number: 47,
    type: "single",
    text: "Refer to the exhibit. If PC1 is sending a packet to PC2 and routing has been configured between the two routers, what will R1 do with the Ethernet frame header attached by PC1?",
    exhibit: {
      src: "/images/itn-final-exam/q47-exhibit.png",
      alt: "Network topology with PC1, two routers, and PC2",
      width: 319,
      height: 268,
    },
    options: [
      "nothing, because the router has a route to the destination network",
      "open the header and use it to determine whether the data is to be sent out S0/0/0",
      "open the header and replace the destination MAC address with a new one",
      "remove the Ethernet header and configure a new Layer 2 header before sending it out S0/0/0",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 6.1.3\nWhen PC1 forms the various headers attached to the data one of those headers is the Layer 2 header. Because PC1 connects to an Ethernet network, an Ethernet header is used. The source MAC address will be the MAC address of PC1 and the destination MAC address will be that of G0/0 on R1. When R1 gets that information, the router removes the Layer 2 header and creates a new one for the type of network the data will be placed onto (the serial link).",
  },
  {
    number: 48,
    type: "single",
    text: "What will happen if the default gateway address is incorrectly configured on a host?",
    options: [
      "The host cannot communicate with other hosts in the local network.",
      "The host cannot communicate with hosts in other networks.",
      "A ping from the host to 127.0.0.1 would not be successful.",
      "The host will have to use ARP to determine the correct address of the default gateway.",
      "The switch will not forward packets initiated by the host.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 10.3.1\nWhen a host needs to send a message to another host located on the same network, it can forward the message directly. However, when a host needs to send a message to a remote network, it must use the router, also known as the default gateway. This is because the data link frame address of the remote destination host cannot be used directly. Instead, the IP packet has to be sent to the router (default gateway) and the router will forward the packet toward its destination. Therefore, if the default gateway is incorrectly configured, the host can communicate with other hosts on the same network, but not with hosts on remote networks.",
  },
  {
    number: 49,
    type: "multi",
    choose: 2,
    text: "What are two features of ARP? (Choose two.)",
    options: [
      "When a host is encapsulating a packet into a frame, it refers to the MAC address table to determine the mapping of IP addresses to MAC addresses.",
      "An ARP request is sent to all devices on the Ethernet LAN and contains the IP address of the destination host and its multicast MAC address.",
      "If a host is ready to send a packet to a local destination device and it has the IP address but not the MAC address of the destination, it generates an ARP broadcast.",
      "If no device responds to the ARP request, then the originating node will broadcast the data packet to all devices on the network segment.",
      "If a device receiving an ARP request has the destination IPv4 address, it responds with an ARP reply.",
    ],
    correct: [2, 4],
    explanation:
      "Explanation: Topic 9.2.2\nWhen a node encapsulates a data packet into a frame, it needs the destination MAC address. First it determines if the destination device is on the local network or on a remote network. Then it checks the ARP table (not the MAC table) to see if a pair of IP address and MAC address exists for either the destination IP address (if the destination host is on the local network) or the default gateway IP address (if the destination host is on a remote network). If the match does not exist, it generates an ARP broadcast to seek the IP address to MAC address resolution. Because the destination MAC address is unknown, the ARP request is broadcast with the MAC address FFFF.FFFF.FFFF. Either the destination device or the default gateway will respond with its MAC address, which enables the sending node to assemble the frame. If no device responds to the ARP request, then the originating node will discard the packet because a frame cannot be created.",
  },
  {
    number: 50,
    type: "single",
    text: "A network administrator is adding a new LAN to a branch office. The new LAN must support 90 connected devices. What is the smallest network mask that the network administrator can use for the new network?",
    options: [
      "255.255.255.128",
      "255.255.255.240",
      "255.255.255.248",
      "255.255.255.224",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 11.7.2\nTo support a LAN with 90 connected devices, the network administrator must select a subnet mask that provides a sufficient number of usable host addresses while minimizing wasted address space. The number of usable hosts is calculated using the formula 2n−2, where n represents the number of host bits remaining in the mask. A subnet mask of 255.255.255.128 (which corresponds to a /25 prefix) leaves 7 bits for the host portion, providing 126 usable host addresses. This is the most efficient (smallest) mask among the provided choices because the next tighter mask, 255.255.255.224 (/27), only provides 30 usable addresses, which is insufficient for the 90 required devices. By utilizing the /25 mask, the administrator ensures that the branch office requirements are met while adhering to the principle of maximizing available subnets by minimizing unused IP addresses.",
  },
  {
    number: 51,
    type: "multi",
    choose: 2,
    text: "What are two ICMPv6 messages that are not present in ICMP for IPv4? (Choose two.)",
    options: [
      "Neighbor Solicitation",
      "Destination Unreachable",
      "Host Confirmation",
      "Time Exceeded",
      "Router Advertisement",
      "Route Redirection",
    ],
    correct: [0, 4],
    explanation:
      "Explanation: Topic 13.1.5\nWhile ICMPv6 maintains several error and informational messages common to ICMPv4—such as Destination Unreachable and Time Exceeded—it introduces enhanced functionality through the Neighbor Discovery Protocol (NDP). According to the sources, specific messages including Neighbor Solicitation and Router Advertisement are unique to ICMPv6 and are utilized to facilitate critical network processes like address resolution, duplicate address detection, and dynamic address allocation. These new messaging types allow IPv6-enabled devices to discover local routers and resolve MAC addresses for known IPv6 addresses more efficiently than the broadcast-based resolution methods used in IPv4 environments.",
  },
  {
    number: 52,
    type: "single",
    text: "A client packet is received by a server. The packet has a destination port number of 80. What service is the client requesting?",
    options: ["DHCP", "SMTP", "DNS", "HTTP"],
    correct: [3],
    explanation:
      "Explanation: Topic 14.4.3\nThe transport layer uses port numbers to identify specific applications and services. According to the well-known port assignments, port 80 is reserved for Hypertext Transfer Protocol (HTTP) web services. When a server receives a packet with port 80 as the destination, it identifies the request as a client seeking to access web content, such as HTML pages. This standardized numbering allows the server to simultaneously handle multiple services, distinguishing web traffic from other requests like DNS (port 53) or SMTP (port 25).",
  },
  {
    number: 53,
    type: "single",
    text: "What is an advantage for small organizations of adopting IMAP instead of POP?",
    options: [
      "POP only allows the client to store messages in a centralized way, while IMAP allows distributed storage.",
      "Messages are kept in the mail servers until they are manually deleted from the email client.",
      "When the user connects to a POP server, copies of the messages are kept in the mail server for a short time, but IMAP keeps them for a long time.",
      "IMAP sends and retrieves email, but POP only retrieves email.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.3.4\nIMAP and POP are protocols that are used to retrieve email messages. The advantage of using IMAP instead of POP is that when the user connects to an IMAP-capable server, copies of the messages are downloaded to the client application. IMAP then stores the email messages on the server until the user manually deletes those messages.",
  },
  {
    number: 54,
    type: "single",
    text: "A technician can ping the IP address of the web server of a remote company but cannot successfully ping the URL address of the same web server. Which software utility can the technician use to diagnose the problem?",
    options: ["tracert", "ipconfig", "netstat", "nslookup"],
    correct: [3],
    explanation:
      "Explanation: Topic 15.4.4\nTraceroute (tracert) is a utility that generates a list of hops that were successfully reached along the path from source to destination.This list can provide important verification and troubleshooting information. The ipconfig utility is used to display the IP configuration settings on a Windows PC. The Netstat utility is used to identify which active TCP connections are open and running on a networked host. Nslookup is a utility that allows the user to manually query the name servers to resolve a given host name. This utility can also be used to troubleshoot name resolution issues and to verify the current status of the name servers.",
  },
  {
    number: 55,
    type: "multi",
    choose: 2,
    text: "Which two functions are performed at the LLC sublayer of the OSI Data Link Layer to facilitate Ethernet communication? (Choose two.)",
    options: [
      "implements CSMA/CD over legacy shared half-duplex media",
      "enables IPv4 and IPv6 to utilize the same physical medium",
      "integrates Layer 2 flows between 10 Gigabit Ethernet over fiber and 1 Gigabit Ethernet over copper",
      "implements a process to delimit fields within an Ethernet 2 frame",
      "places information in the Ethernet frame that identifies which network layer protocol is being encapsulated by the frame",
    ],
    correct: [1, 4],
    explanation:
      "Explanation: Topic 6.1.2\nThe data link layer is actually divided into two sublayers:\n+ Logical Link Control (LLC): This upper sublayer defines the software processes that provide services to the network layer protocols. It places information in the frame that identifies which network layer protocol is being used for the frame. This information allows multiple Layer 3 protocols, such as IPv4 and IPv6, to utilize the same network interface and media.\n+ Media Access Control (MAC): This lower sublayer defines the media access processes performed by the hardware. It provides data link layer addressing and delimiting of data according to the physical signaling requirements of the medium and the type of data link layer protocol in use.",
  },
  {
    number: 56,
    type: "single",
    text: "The global configuration command ip default-gateway 172.16.100.1 is applied to a switch. What is the effect of this command?",
    options: [
      "The switch can communicate with other hosts on the 172.16.100.0 network.",
      "The switch can be remotely managed from a host on another network.",
      "The switch is limited to sending and receiving frames to and from the gateway 172.16.100.1.",
      "The switch will have a management interface with the address 172.16.100.1.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 10.3.2\nA default gateway address is typically configured on all devices to allow them to communicate beyond just their local network.In a switch this is achieved using the command ip default-gateway <ip address>.",
  },
  {
    number: 57,
    type: "single",
    text: "What happens when the transport input ssh command is entered on the switch vty lines?",
    options: [
      "The SSH client on the switch is enabled.",
      "The switch requires a username/password combination for remote access.",
      "Communication between the switch and remote users is encrypted.",
      "The switch requires remote connections via a proprietary client software.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 16.4.4\nThe transport input ssh command when entered on the switch vty (virtual terminal lines) will encrypt all inbound controlled telnet connections.",
  },
  {
    number: 58,
    type: "pair",
    text: "Match the type of threat with the cause. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-final-exam/q58-exhibit.jpg",
      alt: "Threat type matching board with four threat causes",
      width: 1268,
      height: 587,
    },
    left: [
      "electrical threats",
      "hardware threats",
      "environmental threats",
      "maintenance threats",
    ],
    right: [
      "voltage spikes, insufficient supply voltage (brownouts), unconditioned power (noise), and total power loss",
      "physical damage to servers, routers, switches, cabling plant, and workstations",
      "temperature extremes (too hot or too cold) or humidity extremes (too wet or too dry)",
      "poor handling of key electrical components (electrostatic discharge), lack of critical spare parts, poor cabling, and poor labeling",
    ],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
    },
    explanation:
      "Explanation: Topic 16.1.3\nElectrical threats involve power problems such as voltage spikes, brownouts, noise, and total power loss. Hardware threats are physical damage to servers, routers, switches, cabling plant, and workstations. Environmental threats are temperature and humidity extremes. Maintenance threats include ESD damage from poor handling, lack of critical spare parts, and poor cabling or labeling.",
  },
  {
    number: 59,
    type: "single",
    text: "A disgruntled employee is using some free wireless networking tools to determine information about the enterprise wireless networks. This person is planning on using this information to hack the wireless network. What type of attack is this?",
    options: ["DoS", "access", "reconnaissance", "Trojan horse"],
    correct: [2],
    explanation:
      "Explanation: Topic 16.2.2\nA reconnaissance attack is the unauthorized discovery and documentation of various computing networks, network systems, resources, applications, services, or vulnerabilities.",
  },
  {
    number: 60,
    type: "single",
    text: "What service is provided by HTTP?",
    options: [
      "Uses encryption to secure the exchange of text, graphic images, sound, and video on the web.",
      "Allows for data transfers between a client and a file server.",
      "An application that allows real-time chatting among remote users.",
      "A basic set of rules for exchanging text, graphic images, sound, video, and other multimedia files on the web.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.3.1\nThe Hypertext Transfer Protocol (HTTP) is an application layer protocol that defines a specific set of rules for how web browsers (clients) and web servers interact to exchange information across the World Wide Web. It governs the content and formatting of requests and responses, allowing for the successful delivery of various multimedia files, including text, graphic images, sound, and video. Unlike HTTPS, which adds a layer of encryption for security, standard HTTP transmits data in plaintext and relies on the request/response model—such as using GET messages to retrieve HTML pages—to facilitate web communication.",
  },
  {
    number: 61,
    type: "single",
    text: "A client packet is received by a server. The packet has a destination port number of 67. What service is the client requesting?",
    options: ["FTP", "DHCP", "Telnet", "SSH"],
    correct: [1],
    explanation:
      "Explanation: Topic 14.4.3\nThe transport layer uses port numbers to identify specific applications and services. According to the IANA assignments for well-known ports, port 67 is reserved for the Dynamic Host Configuration Protocol (DHCP) server using the UDP protocol. When a server receives a packet with this destination port, it identifies the request as a client seeking to automatically acquire an IP configuration, including an IP address, subnet mask, and default gateway. While port 68 is used by the DHCP client to receive responses, port 67 is the standard destination for requests sent toward the server.",
  },
  {
    number: 62,
    type: "multi",
    choose: 2,
    text: "What are two problems that can be caused by a large number of ARP request and reply messages? (Choose two.)",
    options: [
      "Switches become overloaded because they concentrate all the traffic from the attached subnets.",
      "The ARP request is sent as a broadcast, and will flood the entire subnet.",
      "The network may become overloaded because ARP reply messages have a very large payload due to the 48-bit MAC address and 32-bit IP address that they contain.",
      "A large number of ARP request and reply messages may slow down the switching process, leading the switch to make many changes in its MAC table.",
      "All ARP request messages must be processed by all nodes on the local network.",
    ],
    correct: [1, 4],
    explanation:
      "Explanation: Topic 9.2.8\nARP requests are sent as broadcasts:\n(1) All nodes will receive them, and they will be processed by software, interrupting the CPU.\n(2) The switch forwards (floods) Layer 2 broadcasts to all ports.\nA switch does not change its MAC table based on ARP request or reply messages. The switch populates the MAC table using the source MAC address of all frames. The ARP payload is very small and does not overload the switch.",
  },
  {
    number: 63,
    type: "multi",
    choose: 3,
    text: "A group of Windows PCs in a new subnet has been added to an Ethernet network. When testing the connectivity, a technician finds that these PCs can access local network resources but not the Internet resources. To troubleshoot the problem, the technician wants to initially confirm the IP address and DNS configurations on the PCs, and also verify connectivity to the local router. Which three Windows CLI commands and utilities will provide the necessary information? (Choose three.)",
    options: [
      "netsh interface ipv6 show neighbor",
      "arp -a",
      "tracert",
      "ping",
      "ipconfig",
      "nslookup",
      "telnet",
    ],
    correct: [3, 4, 5],
    explanation:
      "Explanation: Topic 17.5.1\nThe ipconfig and nslookup commands will provide initial IP address and DNS configuration information to the technicians and determine if DHCP is assigning correct information to the PCs. The ping utility would be used to verify, or not, connectivity to the default gateway (router) using the configured default gateway address, or using the known correct default gateway address if these are found to be different. The arp -a or netsh interface ipv6 show neighbor commands could be used if the problem is then suspected to be an IP address to MAC address mapping issue. The telnet and tracert utilities could be used to determine where the problem was located in the network if the default gateway configuration was found to be correct.",
  },
  {
    number: 64,
    type: "single",
    text: "During the process of forwarding traffic, what will the router do immediately after matching the destination IP address to a network on a directly connected routing table entry?",
    options: [
      "analyze the destination IP address",
      "switch the packet to the directly connected interface",
      "look up the next-hop address for the packet",
      "discard the traffic after consulting the route table",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 8.5.1\nA router receives a packet on an interface and looks at the destination IP address. It consults its routing table and matches the destination IP address to a routing table entry. The router then discovers that it has to send the packet to the next-hop address or out to a directly connected interface. When the destination address is on a directly connected interface, the packet is switched over to that interface.",
  },
  {
    number: 65,
    type: "single",
    text: "What characteristic describes antispyware?",
    options: [
      "applications that protect end devices from becoming infected with malicious software",
      "a network device that filters access and traffic coming into a network",
      "software on a router that filters traffic based on IP addresses or applications",
      "a tunneling protocol that provides remote users with secure access into the network of an organization",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.8.2\nAntispyware refers to specialized applications designed to protect end devices—such as PCs, laptops, and smartphones—from being compromised by malicious software. While other security tools like firewalls or VPNs focus on filtering network traffic or creating secure tunnels, antispyware operates at the host level to detect and prevent software that secretly collects information about the user. It is considered a fundamental security component for both home and corporate networks, often implemented alongside antivirus software as part of a layered defense strategy to maintain device integrity.",
  },
  {
    number: 66,
    type: "single",
    text: "A network administrator needs to keep the user ID, password, and session contents private when establishing remote CLI connectivity with a switch to manage it. Which access method should be chosen?",
    options: ["Telnet", "AUX", "SSH", "Console"],
    correct: [2],
    explanation:
      "Explanation: Topic 2.1.4\nSSH (Secure Shell) is the recommended method for establishing a remote CLI connection because it utilizes encryption to ensure that user IDs, passwords, and all session contents remain private and unreadable if intercepted. In contrast, Telnet is considered insecure because it transmits all data, including login credentials, in plaintext. While the Console and AUX ports provide administrative access, they are primarily intended for out-of-band management rather than secure remote connectivity over a standard IP network.",
  },
  {
    number: 67,
    type: "multi",
    choose: 2,
    text: "What are the two most effective ways to defend against malware? (Choose two.)",
    options: [
      "Implement a VPN.",
      "Implement network firewalls.",
      "Implement RAID.",
      "Implement strong passwords.",
      "Update the operating system and other application software.",
      "Install and update antivirus software.",
    ],
    correct: [4, 5],
    explanation:
      "Explanation: Topic 16.3.3\nA cybersecurity specialist must be aware of the technologies and measures that are used as countermeasures to protect the organization from threats and vulnerabilities.",
  },
  {
    number: 68,
    type: "single",
    text: "Which type of security threat would be responsible if a spreadsheet add-on disables the local software firewall?",
    options: ["brute-force attack", "Trojan horse", "DoS", "buffer overflow"],
    correct: [1],
    explanation:
      "Explanation: Topic 16.2.1\nA Trojan horse is software that does something harmful, but is hidden in legitimate software code. A denial of service (DoS) attack results in interruption of network services to users, network devices, or applications. A brute-force attack commonly involves trying to access a network device. A buffer overflow occurs when a program attempts to store more data in a memory location than it can hold.",
  },
  {
    number: 69,
    type: "single",
    text: "Which frame field is created by a source node and used by a destination node to ensure that a transmitted data signal has not been altered by interference, distortion, or signal loss?",
    options: [
      "User Datagram Protocol field",
      "transport layer error check field",
      "flow control field",
      "frame check sequence field",
      "error correction process field",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 6.3.2\nThe frame check sequence (FCS) field is a critical part of the data link layer frame trailer used for error detection. During the encapsulation process, a source node performs a mathematical calculation known as a cyclic redundancy check (CRC) on the frame's contents and places the resulting value into the FCS field. The destination node performs the same calculation upon receiving the frame; if the results do not match the value in the FCS field, it indicates that the data has been altered during transmission. This alteration is often caused by external physical factors such as interference, distortion, or signal loss occurring on the network media. By identifying these discrepancies, the data link layer can reject and discard corrupt frames to ensure that only valid data is passed up to the higher layers of the protocol stack.",
  },
  {
    number: 70,
    type: "single",
    text: "A network administrator is adding a new LAN to a branch office. The new LAN must support 4 connected devices. What is the smallest network mask that the network administrator can use for the new network?",
    options: [
      "255.255.255.248",
      "255.255.255.0",
      "255.255.255.128",
      "255.255.255.192",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 11.7.2\nTo support a LAN with 4 connected devices, the network administrator must select a subnet mask that provides a sufficient number of usable host addresses while minimizing wasted address space. The number of usable hosts is calculated using the formula 2n−2, where n represents the number of host bits remaining in the mask. A subnet mask of 255.255.255.248 (which corresponds to a /29 prefix) leaves 3 bits for the host portion, providing 6 usable host addresses. This is the most efficient (smallest) mask among the choices because it satisfies the requirement for 4 devices while leaving fewer unused addresses compared to 255.255.255.192 (/26), 255.255.255.128 (/25), or 255.255.255.0 (/24), which provide 62, 126, and 254 usable addresses respectively.",
  },
  {
    number: 71,
    type: "single",
    text: "What service is provided by POP3?",
    options: [
      "Retrieves email from the server by downloading the email to the local mail application of the client.",
      "An application that allows real-time chatting among remote users.",
      "Allows remote access to network devices and servers.",
      "Uses encryption to provide secure remote access to network devices and servers.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 15.3.4\nThe Post Office Protocol version 3 (POP3) is an application layer protocol designed to enable email clients to retrieve messages from a mail server. According to the sources, the default operation of POP3 is to download the email to the client's local application and then delete it from the server. This service operates over TCP port 110 and is specifically intended for message retrieval, distinguishing it from SMTP, which is used for sending mail, and IMAP, which typically maintains messages on the server.",
  },
  {
    number: 72,
    type: "multi",
    choose: 2,
    text: "What two security solutions are most likely to be used only in a corporate environment? (Choose two.)",
    options: [
      "antispyware",
      "virtual private networks",
      "intrusion prevention systems",
      "strong passwords",
      "antivirus software",
    ],
    correct: [1, 2],
    explanation:
      "Explanation: Topic 1.8.2\nWhile basic security measures like antivirus, antispyware, and firewall filtering are implemented in both home and corporate environments, corporate networks have advanced requirements due to their complexity. According to the sources, intrusion prevention systems (IPS) are specifically used in these larger environments to identify and stop fast-spreading threats like zero-day attacks. Similarly, virtual private networks (VPN) are corporate-level solutions that provide remote workers with secure, encrypted access into the organization's private network. These components are part of a layered defense-in-depth approach used to protect vital business assets.",
  },
  {
    number: 73,
    type: "single",
    text: "What characteristic describes antivirus software?",
    options: [
      "applications that protect end devices from becoming infected with malicious software",
      "a network device that filters access and traffic coming into a network",
      "a tunneling protocol that provides remote users with secure access into the network of an organization",
      "software on a router that filters traffic based on IP addresses or applications",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 1.8.2\nAntivirus and antispyware are applications used to protect end devices (such as PCs, laptops, and smartphones) from being compromised or infected with malicious software. These tools are considered basic security components for both home and small office networks and are often required by corporate security policies to maintain endpoint integrity. While other security measures like firewalls or VPNs focus on network-level protection, antivirus software operates directly on the host to mitigate threats from viruses, worms, and other malware.",
  },
  {
    number: 74,
    type: "single",
    text: "What mechanism is used by a router to prevent a received IPv4 packet from traveling endlessly on a network?",
    options: [
      "It checks the value of the TTL field and if it is 0, it discards the packet and sends a Destination Unreachable message to the source host.",
      "It checks the value of the TTL field and if it is 100, it discards the packet and sends a Destination Unreachable message to the source host.",
      "It decrements the value of the TTL field by 1 and if the result is 0, it discards the packet and sends a Time Exceeded message to the source host.",
      "It increments the value of the TTL field by 1 and if the result is 100, it discards the packet and sends a Parameter Problem message to the source host.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 8.2.2\nTo prevent an IPv4 packet to travel in the network endlessly, TCP/IP protocols use ICMPv4 protocol to provide feedback about issues. When a router receives a packet and decrements the TTL field in the IPv4 packet by 1 and if the result is zero, it discards the packet and sends a Time Exceeded message to the source host.",
  },
  {
    number: 75,
    type: "single",
    text: "A client packet is received by a server. The packet has a destination port number of 69. What service is the client requesting?",
    options: ["DNS", "DHCP", "SMTP", "TFTP"],
    correct: [3],
    explanation:
      "Explanation: Topic 14.4.3\nThe transport layer uses port numbers to identify and direct data to specific applications or services on a host. According to the standard assignments for well-known ports, port 69 is reserved for the Trivial File Transfer Protocol (TFTP). TFTP is a simple, connectionless protocol that utilizes UDP for best-effort, unacknowledged file delivery, requiring less overhead than FTP. When a server receives a packet with destination port 69, it identifies the request as a client seeking to use this specific file transfer service.",
  },
  {
    number: 76,
    type: "multi",
    choose: 3,
    text: "An administrator defined a local user account with a secret password on router R1 for use with SSH. Which three additional steps are required to configure R1 to accept only encrypted SSH connections? (Choose three.)",
    options: [
      "Configure DNS on the router.",
      "Generate two-way pre-shared keys.",
      "Configure the IP domain name on the router.",
      "Generate the SSH keys.",
      "Enable inbound vty SSH sessions.",
      "Enable inbound vty Telnet sessions.",
    ],
    correct: [2, 3, 4],
    explanation:
      "Explanation: Topic 16.4.4\nTo successfully transition a router from insecure Telnet to encrypted SSH, specific configuration steps must be followed according to the sources. Since the local user account is already created, the next requirement is to configure the IP domain name, which is essential for the key generation process. The administrator must then generate the SSH keys (typically RSA keys) using the crypto key generate rsa command to provide the foundation for session encryption. Finally, the VTY lines must be updated to enable inbound SSH sessions via the transport input ssh command. This last step is crucial because it ensures the router only accepts encrypted connections and rejects insecure plaintext protocols like Telnet.",
  },
  {
    number: 77,
    type: "multi",
    choose: 2,
    text: "Which two functions are performed at the MAC sublayer of the OSI Data Link Layer to facilitate Ethernet communication? (Choose two.)",
    options: [
      "handles communication between upper layer networking software and Ethernet NIC hardware",
      "implements trailer with frame check sequence for error detection",
      "places information in the Ethernet frame that identifies which network layer protocol is being encapsulated by the frame",
      "implements a process to delimit fields within an Ethernet 2 frame",
      "adds Ethernet control information to network protocol data",
    ],
    correct: [1, 3],
    explanation:
      "Explanation: Topic 6.1.2\nThe OSI data link layer is divided into two sublayers: LLC and MAC. The MAC (Media Access Control) sublayer is responsible for data encapsulation and media access control. Its data encapsulation functions include frame delimiting, which uses bits to identify and synchronize fields within a frame, and error detection, which involves adding a trailer with a frame check sequence (FCS) to identify transmission errors. Other functions, such as identifying the network layer protocol or handling communication between upper-layer software and hardware, are performed by the LLC sublayer.",
  },
  {
    number: 78,
    type: "single",
    text: "An IPv6 enabled device sends a data packet with the destination address of FF02::2. What is the target of this packet?",
    options: [
      "all IPv6 enabled devices on the local link",
      "all IPv6 DHCP servers",
      "all IPv6 enabled devices across the network",
      "all IPv6 configured routers on the local link",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 12.7.2\nFF02::2 identifies all IPv6 routers that exist on the link or network. FF02::1 is the target for all IPv6 enabled devices on the link or network.",
  },
  {
    number: 79,
    type: "multi",
    choose: 3,
    text: "What are the three parts of an IPv6 global unicast address? (Choose three.)",
    options: [
      "subnet ID",
      "subnet mask",
      "broadcast address",
      "global routing prefix",
      "interface ID",
    ],
    correct: [0, 3, 4],
    explanation:
      "Explanation: Topic 12.3.5\nThe general format for IPv6 global unicast addresses includes a global routing prefix, a subnet ID, and an interface ID. The global routing prefix is the network portion of the address. A typical global routing prefix is /48 assigned by the Internet provider. The subnet ID portion can be used by an organization to create multiple subnetwork numbers. The interface ID is similar to the host portion of an IPv4 address.",
  },
  {
    number: 80,
    type: "multi",
    choose: 3,
    text: "A network administrator is designing the layout of a new wireless network. Which three areas of concern should be accounted for when building a wireless network? (Choose three.)",
    options: [
      "extensive cabling",
      "mobility options",
      "packet collision",
      "interference",
      "security",
      "coverage area",
    ],
    correct: [3, 4, 5],
    explanation:
      "Explanation: Topic 4.6.1\nThe three areas of concern for wireless networks focus on the size of the coverage area, any nearby interference, and providing network security. Extensive cabling is not a concern for wireless networks, as a wireless network will require minimal cabling for providing wireless access to hosts. Mobility options are not a component of the areas of concern for wireless networks.",
  },
];
