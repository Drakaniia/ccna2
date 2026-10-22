import type { Question } from "../../lib/types";

/** Modules 1 - 3 (Basic Network Connectivity and Communications), questions 41-76 (60 is missing from the dump). */
export const questions41to76: Question[] = [
  {
    number: 41,
    type: "pair",
    text: "For the TCP/IP protocol suite, what is the correct order of events when a Telnet message is being prepared to be sent over the network?",
    left: [
      "The Telnet-formatted data is provided to the next layer.",
      "The TCP header is added.",
      "The IP header is added.",
      "The Ethernet header is added."
    ],
    right: ["First", "Second", "Third", "Fourth"],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 3
    },
    explanation: "Explanation: Topic 3.3.5\nThe encapsulation order is: the Telnet-formatted data is provided to the next layer, the TCP header is added, the IP header is added, and the Ethernet header is added.",
    exhibit: {
      src: "/images/itn-modules-1-3/q41-exhibit.jpg",
      alt: "Exhibit for question 41: encapsulation events placed in order",
      width: 1026,
      height: 450
    }
  },
  {
    number: 42,
    type: "single",
    text: "Which PDU format is used when bits are received from the network medium by the NIC of a host?",
    options: ["file", "frame", "packet", "segment"],
    correct: [1],
    explanation: "Explanation: Topic 3.6.3\nWhen received at the physical layer of a host, the bits are formatted into a frame at the data link layer. A packet is the PDU at the network layer. A segment is the PDU at the transport layer. A file is a data structure that may be used at the application layer."
  },
  {
    number: 43,
    type: "multi",
    choose: 2,
    text: "Refer to the exhibit. ServerB is attempting to contact HostA. Which two statements correctly identify the addressing that ServerB will generate in the process? (Choose two.)",
    exhibit: {
      src: "/images/itn-modules-1-3/q43-exhibit.png",
      alt: "Exhibit for question 43: ServerB sending a packet to HostA through RouterB and RouterA",
      width: 392,
      height: 320
    },
    options: [
      "ServerB will generate a packet with the destination IP address of RouterB.",
      "ServerB will generate a frame with the destination MAC address of SwitchB.",
      "ServerB will generate a packet with the destination IP address of RouterA.",
      "ServerB will generate a frame with the destination MAC address of RouterB.",
      "ServerB will generate a packet with the destination IP address of HostA.",
      "ServerB will generate a frame with the destination MAC address of RouterA."
    ],
    correct: [3, 4],
    explanation: "Explanation: Topic 3.7.2\nIn order to send data to HostA, ServerB will generate a packet that contains the IP address of the destination device on the remote network and a frame that contains the MAC address of the default gateway device on the local network."
  },
  {
    number: 44,
    type: "single",
    text: "Which method allows a computer to react accordingly when it requests data from a server and the server takes too long to respond?",
    options: ["encapsulation", "flow control", "access method", "response timeout"],
    correct: [3],
    explanation: "Explanation: Topic 3.1.9\nIf a computer makes a request and does not hear a response within an acceptable amount of time, the computer assumes that no answer is coming and reacts accordingly."
  },
  {
    number: 45,
    type: "single",
    text: "A web client is receiving a response for a web page from a web server. From the perspective of the client, what is the correct order of the protocol stack that is used to decode the received transmission?",
    options: [
      "Ethernet, IP, TCP, HTTP",
      "HTTP, TCP, IP, Ethernet",
      "Ethernet, TCP, IP, HTTP",
      "HTTP, Ethernet, IP, TCP"
    ],
    correct: [0],
    explanation: "Explanation: Topic 3.6.3\n1. HTTP governs the way that a web server and client interact.\n2. TCP manages individual conversations between web servers and clients.\n3. IP is responsible for delivery across the best path to the destination.\n4. Ethernet takes the packet from IP and formats it for transmission."
  },
  {
    number: 46,
    type: "multi",
    choose: 2,
    text: "Which two OSI model layers have the same functionality as a single layer of the TCP/IP model? (Choose two.)",
    options: ["data link", "network", "physical", "session", "transport"],
    correct: [0, 2],
    explanation: "Explanation: Topic 3.5.4\nThe OSI data link and physical layers together are equivalent to the TCP/IP network access layer. The OSI transport layer is functionally equivalent to the TCP/IP transport layer, and the OSI network layer is equivalent to the TCP/IP internet layer. The OSI application, presentation, and session layers are functionally equivalent to the application layer within the TCP/IP model."
  },
  {
    number: 47,
    type: "single",
    text: "At which layer of the OSI model would a logical address be added during encapsulation?",
    options: ["physical layer", "data link layer", "network layer", "transport layer"],
    correct: [2],
    explanation: "Explanation: Topic 3.7.2\nLogical addresses, also known as IP addresses, are added at the network layer. Physical addresses are edded at the data link layer. Port addresses are added at the transport layer. No addresses are added at the physical layer."
  },
  {
    number: 48,
    type: "single",
    text: "What is a characteristic of multicast messages?",
    options: [
      "They are sent to a select group of hosts.",
      "They are sent to all hosts on a network.",
      "They must be acknowledged.",
      "They are sent to a single destination."
    ],
    correct: [0],
    explanation: "Explanation: Topic 3.1.9\nMulticast is a one-to-many type of communication. Multicast messages are addressed to a specific multicast group."
  },
  {
    number: 49,
    type: "single",
    text: "Which statement is correct about network protocols?",
    options: [
      "Network protocols define the type of hardware that is used and how it is mounted in racks.",
      "They define how messages are exchanged between the source and the destination.",
      "They all function in the network access layer of TCP/IP.",
      "They are only required for exchange of messages between devices on remote networks."
    ],
    correct: [1],
    explanation: "Explanation: Topic 3.1.7\nNetwork protocols are implemented in hardware, or software, or both. They interact with each other within different layers of a protocol stack. Protocols have nothing to do with the installation of the network equipment. Network protocols are required to exchange information between source and destination devices in both local and remote networks."
  },
  {
    number: 50,
    type: "single",
    text: "What is an advantage of network devices using open standard protocols?",
    options: [
      "Network communications is confined to data transfers between devices from the same vendor.",
      "A client host and a server running different operating systems can successfully exchange data.",
      "Internet access can be controlled by a single ISP in each market.",
      "Competition and innovation are limited to specific types of products."
    ],
    correct: [1],
    explanation: "Explanation: Topic 3.4.1\nAn advantage of network devices implementing open standard protocols, such as from the TCP/IP suite, is that clients and servers running different operating systems can communicate with each other. Open standard protocols facilitate innovation and competition between vendors and across markets, and can reduce the occurrence of monopolies in networking markets."
  },
  {
    number: 51,
    type: "single",
    text: "Which device performs the function of determining the path that messages should take through internetworks?",
    options: ["a router", "a firewall", "a web server", "a DSL modem"],
    correct: [0],
    explanation: "Explanation: Topic 1.2.4\nA router is used to determine the path that the messages should take through the network. A firewall is used to filter incoming and outgoing traffic. A DSL modem is used to provide Internet connection for a home or an organization."
  },
  {
    number: 52,
    type: "single",
    text: "Open the PT Activity. Perform the tasks in the activity instructions and then answer the question.\nWhat is the IP address of the switch virtual interface (SVI) on Switch0?",
    exhibit: {
      src: "/images/itn-modules-1-3/q52-exhibit.jpg",
      alt: "Exhibit for question 52: PC0 connected to Switch0",
      width: 304,
      height: 132
    },
    options: ["192.168.5.10", "192.168.10.5", "192.168.10.1", "192.168.5.0"],
    correct: [0],
    explanation: "Explanation: Topic 2.7.4\nAfter the enable command is issued, the show running-configuration command or the show ip interfaces brief command will display the IP address of the switch virtual interface (SVI)."
  },
  {
    number: 53,
    type: "single",
    text: "Why would a Layer 2 switch need an IP address?",
    options: [
      "to enable the switch to send broadcast frames to attached PCs",
      "to enable the switch to function as a default gateway",
      "to enable the switch to be managed remotely",
      "to enable the switch to receive frames from attached PCs"
    ],
    correct: [2],
    explanation: "Explanation: Topic 2.6.2\nA switch, as a Layer 2 device, does not need an IP address to transmit frames to attached devices. However, when a switch is accessed remotely through the network, it must have a Layer 3 address. The IP address must be applied to a virtual interface rather than to a physical interface. Routers, not switches, function as default gateways."
  },
  {
    number: 54,
    type: "single",
    text: "Refer to the exhibit. An administrator is trying to configure the switch but receives the error message that is displayed in the exhibit. What is the problem?",
    exhibit: {
      src: "/images/itn-modules-1-3/q54-exhibit.png",
      alt: "Exhibit for question 54: invalid input error when entering config t from user EXEC mode",
      width: 308,
      height: 55
    },
    options: [
      "The entire command, configure terminal, must be used.",
      "The administrator is already in global configuration mode.",
      "The administrator must first enter privileged EXEC mode before issuing the command.",
      "The administrator must connect via the console port to access global configuration mode."
    ],
    correct: [2],
    explanation: "Explanation: Topic 2.2.1\nIn order to enter global configuration mode, the command configure terminal, or a shortened version such as config t, must be entered from privileged EXEC mode. In this scenario the administrator is in user EXEC mode, as indicated by the > symbol after the hostname. The administrator would need to use the enable command to move into privileged EXEC mode before entering the configure terminal command."
  },
  {
    number: 55,
    type: "single",
    text: "What term describes a network owned by one organization that provides safe and secure access to individuals who work for a different organization?",
    options: ["extranet", "cloud", "BYOD", "quality of service"],
    correct: [0],
    explanation: "Explanation: Topic 1.4.4\nThe term extranet describes a controlled and private network infrastructure owned by a single organization that is purposely built to grant secure, limited access to external individuals who work for completely different organizations or business entities.\nAn extranet is typically deployed to facilitate seamless collaboration with external stakeholders such as trusted suppliers, vendors, business partners, or high-priority clients. It allows them to access specific internal resources and files safely without exposing the core corporate network to broader security risks."
  },
  {
    number: 56,
    type: "single",
    text: "What term describes storing personal files on servers over the internet to provide access anywhere, anytime, and on any device?",
    options: ["cloud", "BYOD", "quality of service", "converged network"],
    correct: [0],
    explanation: "Explanation: Topic 1.7.6\nThe term cloud (or cloud computing) refers to the practice of storing, managing, and processing data on remote servers hosted on the Internet, rather than on a local hard drive. This architecture allows users to seamlessly upload and retrieve their personal files, applications, and services from any geographical location, at any given time, and across any internet-enabled device."
  },
  {
    number: 57,
    type: "single",
    text: "What term describes a network where one computer can be both client and server?",
    options: ["peer-to-peer", "cloud", "BYOD", "quality of service"],
    correct: [0],
    explanation: "Explanation: Topic 1.2.2\nThe term peer-to-peer (P2P) describes a network model where every interconnected computer can function as both a client and a server simultaneously.\nIn this specific architecture, there is no requirement for a centralized or dedicated server. For instance, a computer acts as a server when it shares a local file or a connected printer with other users, and at the same time, it operates as a client when retrieving a shared document stored on another workstation. This setup is highly cost-effective for home environments or small offices, though it has distinct limitations regarding scalability and centralized security management."
  },
  {
    number: 58,
    type: "single",
    text: "What term describes a type of network used by people who work from home or from a small remote office?",
    options: ["SOHO network", "BYOD", "quality of service", "converged network"],
    correct: [0],
    explanation: "Explanation: Topic 1.4.1\nThe term SOHO stands for Small Office, Home Office. It describes a specific category of Local Area Network (LAN) engineered to support individuals working remotely from home or operating within a small-scale business environment with a limited number of end devices.\nThese networks are highly cost-effective and typically rely on a single, integrated multi-function device (a standard home router) that simultaneously provides switching capabilities, wireless access (Wi-Fi), and routing functions to grant Internet access and enable local resource sharing."
  },
  {
    number: 59,
    type: "single",
    text: "What term describes a computing model where server software runs on dedicated computers?",
    options: ["client/server", "internet", "intranet", "extranet"],
    correct: [0],
    explanation: "Explanation: Topic 1.2.2\nThe client/server model is a distributed network architecture where tasks and workloads are partitioned between service providers (called servers) and service requesters (called clients).\nIn this specific computing model, the server software runs on dedicated, high-performance computers that are completely optimized to host, manage, and respond to requests sent by multiple client devices simultaneously (such as web servers, file servers, or email servers).\nThis centralization of network resources and hardware is what mainly distinguishes the client/server architecture from a Peer-to-Peer (P2P) network, where individual devices share responsibilities equally and can act as both clients and servers at the same time without relying on dedicated hardware."
  },
  {
    number: 61,
    type: "single",
    text: "What term describes a technology that allows devices to connect to the LAN using an electrical outlet?",
    options: ["powerline networking", "internet", "intranet", "extranet"],
    correct: [0],
    explanation: "Explanation: Topic 1.7.8\nPowerline networking is a technology that allows data to be transmitted over an object's existing electrical wiring. By using specialized powerline adapters plugged directly into any standard electrical outlet, devices can seamlessly connect to the local area network (LAN). This approach effectively turns standard electrical infrastructure into network data channels without requiring extra Ethernet cabling."
  },
  {
    number: 62,
    type: "single",
    text: "What term describes a policy that allows network devices to manage the flow of data to give priority to voice and video?",
    options: ["quality of service", "internet", "intranet", "extranet"],
    correct: [0],
    explanation: "Explanation: Topic 1.6.4\nQuality of Service (QoS) is a network policy that enables devices to manage data traffic flows by prioritizing bandwidth. It ensures that time-sensitive, real-time communications like voice and video are given higher priority over standard data traffic. This mechanism significantly reduces latency and jitter, maintaining acceptable transmission quality even during network congestion. Other options like Internet, Intranet, or Extranet merely define the scope or boundaries of network access."
  },
  {
    number: 63,
    type: "single",
    text: "What term describes a private collection of LANs and WANs that belongs to an organization?",
    options: ["intranet", "internet", "extranet", "peer-to-peer"],
    correct: [0],
    explanation: "Explanation: Topic 1.4.4\nAn intranet is a private collection of LANs and WANs that belongs to an organization. It is designed to be accessible only by the organization's members, employees, or others with explicit authorization to securely share internal data and resources."
  },
  {
    number: 64,
    type: "single",
    text: "What term describes the ability to use personal devices across a business or campus network?",
    options: ["BYOD", "internet", "intranet", "extranet"],
    correct: [0],
    explanation: "Explanation: Topic 1.7.2\nThe term BYOD (which stands for Bring Your Own Device) describes the growing trend and corporate policy where users, employees, or students are officially permitted to utilize their personal tech devices (such as laptops, smartphones, or tablets) to connect to a corporate or campus network to access internal organizational resources."
  },
  {
    number: 65,
    type: "single",
    text: "At which OSI layer is a source IP address added to a PDU during the encapsulation process?",
    options: ["network layer", "data link layer", "transport layer", "application layer"],
    correct: [0],
    explanation: "Explanation: Topic 3.6.4\nThe network layer adds a source and a destination IP address to the PDU when it encapsulates the segment into a packet."
  },
  {
    number: 66,
    type: "single",
    text: "At which OSI layer is a destination port number added to a PDU during the encapsulation process?",
    options: ["transport layer", "data link layer", "network layer", "application layer"],
    correct: [0],
    explanation: "Explanation: Topic 3.6.3\nThe transport layer (Layer 4 of the OSI model) is responsible for establishing a temporary communication session between two applications and transferring data between them reliably.\nDuring the encapsulation process, as data moves down from the application layer, the transport layer breaks it into smaller pieces called segments (PDU). It is exactly at this stage that a header containing both the source port number and the destination port number is added. The destination port number is critical because it tells the receiving device exactly which specific upper-layer application or service (such as HTTP on port 80, HTTPS on port 443, or DNS on port 53) should receive the data."
  },
  {
    number: 67,
    type: "single",
    text: "At which OSI layer is data added to a PDU during the encapsulation process?",
    options: ["application layer", "data link layer", "network layer", "transport layer"],
    correct: [0],
    explanation: "Explanation: Topic 3.6.3\nThe application layer (Layer 7 of the OSI model) is the starting point where data is generated by user interactions or software applications (such as web browsers or email clients).\nDuring the encapsulation process, this layer takes the raw user information and formats it according to the specific protocol in use (such as HTTP, FTP, or SMTP), creating the initial PDU known simply as data. This data PDU is then passed down to the lower layers of the OSI stack, where it will sequentially receive headers and trailers (becoming segments, packets, and frames) to prepare it for physical transmission."
  },
  {
    number: 68,
    type: "single",
    text: "At which OSI layer is a source IP address added to a PDU during the encapsulation process?",
    options: ["network layer", "data link layer", "application layer", "presentation layer"],
    correct: [0],
    explanation: "Explanation: Topic 3.6.4\nThe network layer (Layer 3 of the OSI model) is responsible for end-to-end packet delivery across multiple interconnected networks.\nDuring the encapsulation process, when data from the transport layer arrives at the network layer, it is packaged into protocol data units called packets (PDUs). At this stage, a Layer 3 network header is attached, which strictly includes both the source IP address (identifying the original sender) and the destination IP address (identifying the final receiver). This logical addressing allows intermediate routers to successfully inspect the information and forward the data along the best path toward its final destination."
  },
  {
    number: 69,
    type: "single",
    text: "Which of the following is the name for all computers connected to a network that participate directly in network communication?",
    options: ["Servers", "Intermediary device", "Host", "media"],
    correct: [2],
    explanation: "Explanation: Topic 1.2.1\nHosts are all computers connected to a network that participate directly in network communication."
  },
  {
    number: 70,
    type: "single",
    text: "At which OSI layer is a destination IP address added to a PDU during the encapsulation process?",
    options: ["network layer", "application layer", "transport layer", "presentation layer"],
    correct: [0],
    explanation: "Explanation: Topic 3.6.3\nThe network layer (Layer 3 of the OSI model) is responsible for logical addressing and routing data across different interconnected networks.\nDuring the encapsulation process, as data segments move down from the transport layer, the network layer packages them into protocol data units called packets (PDU). It is exactly at this stage that a network header containing both the source IP address and the destination IP address is added. The destination IP address is critical because it allows intermediate routers to make proper forwarding decisions, ensuring the packet is routed through the correct path until it reaches its ultimate destination."
  },
  {
    number: 71,
    type: "single",
    text: "At which OSI layer is a source MAC address added to a PDU during the encapsulation process?",
    options: ["data link layer", "application layer", "transport layer", "presentation layer"],
    correct: [0],
    explanation: "Explanation: Topic 3.6.3\nThe data link layer (Layer 2 of the OSI model) is responsible for preparing data for physical transmission across local network media and controlling access to those media.\nDuring the encapsulation process, as IP packets move down from the network layer (Layer 3), the data link layer packages them into protocol data units called frames (PDUs). It is exactly at this stage that a data link header is attached, which includes both the source MAC address (the physical address of the sending device's NIC) and the destination MAC address (the next physical hop on the local network). This allows local network hardware, such as switches, to successfully identify the immediate sender and receiver within the same local network segment."
  },
  {
    number: 72,
    type: "single",
    text: "At which OSI layer is a source port number added to a PDU during the encapsulation process?",
    options: [
      "transport layer",
      "application layer",
      "network layer",
      "presentation layer",
      "data link layer"
    ],
    correct: [0],
    explanation: "Explanation: Topic 3.6.3\nThe transport layer (Layer 4 of the OSI model) is responsible for managing data flow and ensuring that applications on both ends of the network can communicate seamlessly.\nDuring the encapsulation process, data moving down from the application layer is segmented into smaller protocol data units called segments (PDUs). It is precisely at this level that a transport header is attached, which includes both the source port number and the destination port number. The source port number is dynamically assigned by the sending device to uniquely identify the local application session initiating the communication, ensuring that return traffic is directed back to the correct software or service."
  },
  {
    number: 73,
    type: "single",
    text: "At which OSI layer is a destination MAC address added to a PDU during the encapsulation process?",
    options: ["data link layer", "transport layer", "application layer", "network layer"],
    correct: [0],
    explanation: "Explanation: Topic 3.6.3\nThe data link layer adds a source and a destination MAC address to the frame header during encapsulation."
  },
  {
    number: 74,
    type: "single",
    text: "When data is encoded as pulses of light, which media is being used to transmit the data?",
    options: ["Wireless", "Fire optic cable", "Copper cable"],
    correct: [1],
    explanation: "Explanation: Topic 1.2.5\nFiber-optic cable is the media is being used to transmit the data when data is encoded as pulses of light."
  },
  {
    number: 75,
    type: "multi",
    choose: 2,
    text: "Which two devices are intermediary devices? (Choose two)",
    options: ["Host", "Router", "Switch", "Servers"],
    correct: [1, 2],
    explanation: "Explanation: Topic 1.2.4 and 1.3.1\nRouters and switches are intermediary devices."
  },
  {
    number: 76,
    type: "single",
    text: "A college is building a new dormitory on its campus. Workers are digging in the ground to install a new water pipe for the dormitory. A worker accidentally damages a fiber optic cable that connects two of the existing dormitories to the campus data center. Although the cable has been cut, students in the dormitories only experience a very short interruption of network services. What characteristic of the network is shown here?",
    options: ["quality of service (QoS)", "scalability", "security", "fault tolerance", "integrity"],
    correct: [3],
    explanation: "Explanation: Topic 1.6.2\nFault tolerance is the characteristic of a network which allows it to quickly respond to failures of network devices, media, or services. Quality of service refers to the measures taken to ensure that network traffic requiring higher throughput receives the required network resources. Scalability refers to the ability of the network to grow to accommodate new requirements. Security refers to protecting networks and data from theft, alteration, or destruction. Integrity refers to the completeness of something and is generally not used as a characteristic of networks in the same way as the other terms."
  },
];
