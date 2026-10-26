import type { Question } from "../../lib/types";

/** Modules 14 - 15 (Network Application Communications), questions 32-61. */
export const questions32to61: Question[] = [
  {
    number: 32,
    type: "single",
    text: "Which networking model is being used when an author uploads one chapter document to a file server of a book publisher?",
    options: [
      "peer-to-peer",
      "master-slave",
      "client/server",
      "point-to-point",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.2.1\nIn the client/server network model, a network device assumes the role of server in order to provide a particular service such as file transfer and storage. In the client/server network model, a dedicated server does not have to be used, but if one is present, the network model being used is the client/server model. In contrast, a peer-to-peer network does not have a dedicated server.",
  },
  {
    number: 33,
    type: "single",
    text: "What do the client/server and peer-to-peer network models have in common?",
    options: [
      "Both models have dedicated servers.",
      "Both models support devices in server and client roles.",
      "Both models require the use of TCP/IP-based protocols.",
      "Both models are used only in the wired network environment.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.2.1\nIn both the client/server and peer-to-peer network models, clients and servers exist. In peer-to-peer networks, no dedicated server exists, but a device can assume the server role to provide information to a device serving in the client role.",
  },
  {
    number: 34,
    type: "single",
    text: "In what networking model would eDonkey, eMule, BitTorrent, Bitcoin, and LionShare be used?",
    options: ["peer-to-peer", "client-based", "master-slave", "point-to-point"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.2.4\nIn a peer-to-peer networking model, data is exchanged between two network devices without the use of a dedicated server. Peer-to-peer applications such as Shareaza, eDonkey, and Bitcoin allow one network device to assume the role of server, while one or more other network devices assume the role of client using the peer-to-peer application.",
  },
  {
    number: 35,
    type: "single",
    text: "What is a common protocol that is used with peer-to-peer applications such as WireShare, Bearshare, and Shareaza?",
    options: ["Ethernet", "Gnutella", "POP", "SMTP"],
    correct: [1],
    explanation:
      "Explanation: Topic 15.2.4\nThe Gnutella protocol is used when one user shares an entire file with another user. A person would load a Gnutella-based application such as gtk-gnutella or WireShare and use that application to locate and access resources shared by others.",
  },
  {
    number: 36,
    type: "single",
    text: "What is a key characteristic of the peer-to-peer networking model?",
    options: [
      "wireless networking",
      "social networking without the Internet",
      "network printing using a print server",
      "resource sharing without a dedicated server",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.2.2\nThe peer-to-peer (P2P) networking model allows data, printer, and resource sharing without a dedicated server.",
  },
  {
    number: 37,
    type: "multi",
    choose: 3,
    text: "The application layer of the TCP/IP model performs the functions of what three layers of the OSI model? (Choose three.)",
    options: [
      "physical",
      "session",
      "network",
      "presentation",
      "data link",
      "transport",
      "application",
    ],
    correct: [1, 3, 6],
    explanation:
      "Explanation: Topic 15.1.1\nThe network access layer of the TCP/IP model performs the same functions as the physical and data link layers of the OSI model. The internetwork layer equates to the network layer of the OSI model. The transport layers are the same in both models. The application layer of the TCP/IP model represents the session, presentation, and application layers of the OSI model.",
  },
  {
    number: 38,
    type: "single",
    text: "What is an example of network communication that uses the client-server model?",
    options: [
      "A user uses eMule to download a file that is shared by a friend after the file location is determined.",
      "A workstation initiates an ARP to find the MAC address of a receiving host.",
      "A user prints a document by using a printer that is attached to a workstation of a coworker.",
      "A workstation initiates a DNS request when the user types www.cisco.com in the address bar of a web browser.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.2.1\nWhen a user types a domain name of a website into the address bar of a web browser, a workstation needs to send a DNS request to the DNS server for the name resolution process. This request is a client/server model application. The eMule application is P2P. Sharing a printer on a workstation is a peer-to-peer network. Using ARP is just a broadcast message sent by a host.",
  },
  {
    number: 39,
    type: "single",
    text: "Which layer in the TCP/IP model is used for formatting, compressing, and encrypting data?",
    options: [
      "internetwork",
      "session",
      "presentation",
      "application",
      "network access",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.1.1\nThe application layer of the TCP/IP model performs the functions of three layers of the OSI model - application, presentation, and session. The application layer of the TCP/IP model is the layer that provides the interface between the applications, is responsible for formatting, compressing, and encrypting data, and is used to create and maintain dialogs between source and destination applications.",
  },
  {
    number: 40,
    type: "single",
    text: "What is an advantage of SMB over FTP?",
    options: [
      "Only with SMB can data transfers occur in both directions.",
      "Only SMB establishes two simultaneous connections with the client, making the data transfer faster.",
      "SMB is more reliable than FTP because SMB uses TCP and FTP uses UDP.",
      "SMB clients can establish a long-term connection to the server.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 15.5.2\nSMB and FTP are client/server protocols that are used for file transfer. SMB allows the connecting device to access resources as if they were on the local client device. SMB and FTP use the TCP protocol for connection establishment and they can transfer data in both directions. FTP requires two connections between the client and the server, one for commands and replies, the other for the actual file transfer.",
  },
  {
    number: 41,
    type: "multi",
    choose: 3,
    text: "A manufacturing company subscribes to certain hosted services from its ISP. The services that are required include hosted world wide web, file transfer, and e-mail. Which protocols represent these three key applications? (Choose three.)",
    options: ["FTP", "HTTP", "DNS", "SNMP", "DHCP", "SMTP"],
    correct: [0, 1, 5],
    explanation:
      "Explanation: Topic 15.3.2\nThe ISP uses the HTTP protocol in conjunction with hosting web pages, the FTP protocol with file transfers, and SMTP with e-mail. DNS is used to translate domain names to IP addresses. SNMP is used for network management traffic. DHCP is commonly used to manage IP addressing.",
  },
  {
    number: 42,
    type: "single",
    text: "Which application layer protocol uses message types such as GET, PUT, and POST?",
    options: ["DNS", "DHCP", "SMTP", "HTTP", "POP3"],
    correct: [3],
    explanation:
      "Explanation: Topic 15.3.2\nThe GET command is a client request for data from a web server. A PUT command uploads resources and content, such as images, to a web server. A POST command uploads data files to a web server.",
  },
  {
    number: 43,
    type: "single",
    text: "What type of information is contained in a DNS MX record?",
    options: [
      "the FQDN of the alias used to identify a service",
      "the IP address for an FQDN entry",
      "the domain name mapped to mail exchange servers",
      "the IP address of an authoritative name server",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.4.2\nMX, or mail exchange messages, are used to map a domain name to several mail exchange servers that all belong to the same domain.",
  },
  {
    number: 44,
    type: "multi",
    choose: 3,
    text: "Which three protocols operate at the application layer of the TCP/IP model? (Choose three.)",
    options: ["ARP", "TCP", "UDP", "FTP", "POP3", "DHCP"],
    correct: [3, 4, 5],
    explanation:
      "Explanation: Topic 15.1.3\nFTP, DHCP, and POP3 are application layer protocols. TCP and UDP are transport layer protocols. ARP is a network layer protocol.",
  },
  {
    number: 45,
    type: "single",
    text: "Which protocol is used by a client to communicate securely with a web server?",
    options: ["SMTP", "SMB", "IMAP", "HTTPS"],
    correct: [3],
    explanation:
      "Explanation: Topic 15.3.2\nHTTPS is a secure form of HTTP used to access web content hosted by a web server.",
  },
  {
    number: 46,
    type: "single",
    text: "Which applications or services allow hosts to act as client and server at the same time?",
    options: [
      "client/server applications",
      "email applications",
      "P2P applications",
      "authentication services",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 15.2.2\nP2P applications allow the clients to behave as servers if needed. When using authentication services, email exchange, and client/server applications, one host acts as server and the other acts as client at all times.",
  },
  {
    number: 47,
    type: "multi",
    choose: 2,
    text: "What are two characteristics of peer-to-peer networks? (Choose two.)",
    options: [
      "scalability",
      "one way data flow",
      "decentralized resources",
      "centralized user accounts",
      "resource sharing without a dedicated server",
    ],
    correct: [2, 4],
    explanation:
      "Explanation: Topic 15.2.2\nPeer-to-peer networks have decentralized resources because every computer can serve as both a server and a client. One computer might assume the role of server for one transaction while acting as a client for another transaction. Peer-to-peer networks can share resources among network devices without the use of a dedicated server.",
  },
  {
    number: 48,
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
    number: 49,
    type: "multi",
    choose: 3,
    text: "Which three layers of the OSI model provide similar network services to those provided by the application layer of the TCP/IP model? (Choose three.)",
    options: [
      "physical layer",
      "session layer",
      "transport layer",
      "application layer",
      "presentation layer",
      "data link layer",
    ],
    correct: [1, 3, 4],
    explanation:
      "Explanation: Topic 15.1.1\nThe three upper layers of the OSI model, the session, presentation, and application layers, provide application services similar to those provided by the TCP/IP model application layer. Lower layers of the OSI model are more concerned with data flow.",
  },
  {
    number: 50,
    type: "single",
    text: "A PC that is communicating with a web server has a TCP window size of 6,000 bytes when sending data and a packet size of 1,500 bytes. Which byte of information will the web server acknowledge after it has received two packets of data from the PC?",
    options: ["3001", "6001", "4500", "6000"],
    correct: [0],
    explanation:
      "Explanation: Topic 14.6.3\nTCP acknowledges the next byte it expects to receive. Two 1500-byte packets cover bytes 1 through 3000, so the web server acknowledges byte 3001.",
  },
  {
    number: 51,
    type: "single",
    text: "A PC that is communicating with a web server has a TCP window size of 6,000 bytes when sending data and a packet size of 1,500 bytes. Which byte of information will the web server acknowledge after it has received three packets of data from the PC?",
    options: ["4501", "6001", "6000", "4500"],
    correct: [0],
    explanation:
      "Explanation: Topic 14.6.3\nTCP acknowledges the next byte it expects to receive. Three 1500-byte packets cover bytes 1 through 4500, so the web server acknowledges byte 4501.",
  },
  {
    number: 52,
    type: "single",
    text: "A PC that is communicating with a web server has a TCP window size of 6,000 bytes when sending data and a packet size of 1,500 bytes. Which byte of information will the web server acknowledge after it has received four packets of data from the PC?",
    options: ["6001", "3001", "1501", "1500"],
    correct: [0],
    explanation:
      "Explanation: Topic 14.6.3\nTCP acknowledges the next byte it expects to receive. Four 1500-byte packets cover bytes 1 through 6000, which is the whole 6000-byte window, so the web server acknowledges byte 6001.",
  },
  {
    number: 53,
    type: "single",
    text: "A client creates a packet to send to a server. The client is requesting TFTP service. What number will be used as the destination port number in the sending packet?",
    options: ["69", "67", "53", "80"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.5.1\nTFTP uses UDP port 69. Port 67 is DHCP/BOOTP server, port 53 is DNS, and port 80 is HTTP.",
  },
  {
    number: 54,
    type: "single",
    text: "A client creates a packet to send to a server. The client is requesting FTP service. What number will be used as the destination port number in the sending packet?",
    options: ["21", "69", "67", "80"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.5.1\nFTP uses TCP port 21 for the control connection. Port 69 is TFTP, port 67 is DHCP, and port 80 is HTTP.",
  },
  {
    number: 55,
    type: "single",
    text: "A client creates a packet to send to a server. The client is requesting SSH service. What number will be used as the destination port number in the sending packet?",
    options: ["22", "69", "67", "80"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.5.1\nSSH uses TCP port 22. Port 69 is TFTP, port 67 is DHCP, and port 80 is HTTP.",
  },
  {
    number: 56,
    type: "single",
    text: "A client creates a packet to send to a server. The client is requesting HTTP service. What number will be used as the destination port number in the sending packet?",
    options: ["80", "67", "53", "69"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.1.3\nHTTP uses TCP port 80. Port 67 is DHCP, port 53 is DNS, and port 69 is TFTP.",
  },
  {
    number: 57,
    type: "single",
    text: "A client creates a packet to send to a server. The client is requesting POP3 service. What number will be used as the destination port number in the sending packet?",
    options: ["110", "67", "53", "69", "443", "161", "80"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.3.4\nPOP3 uses TCP port 110 to let a client retrieve email from a mail server.",
  },
  {
    number: 58,
    type: "single",
    text: "A client creates a packet to send to a server. The client is requesting telnet service. What number will be used as the destination port number in the sending packet?",
    options: ["23", "443", "161", "110"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.1.3\nTelnet uses TCP port 23. Port 443 is HTTPS, port 161 is SNMP, and port 110 is POP3.",
  },
  {
    number: 59,
    type: "single",
    text: "A client creates a packet to send to a server. The client is requesting SNMP service. What number will be used as the destination port number in the sending packet?",
    options: ["161", "443", "110", "80"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.1.3\nSNMP uses UDP port 161. Port 443 is HTTPS, port 110 is POP3, and port 80 is HTTP.",
  },
  {
    number: 60,
    type: "single",
    text: "A client creates a packet to send to a server. The client is requesting SMTP service. What number will be used as the destination port number in the sending packet?",
    options: ["25", "443", "161", "110"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.1.3\nSMTP uses TCP port 25 to send email. Port 443 is HTTPS, port 161 is SNMP, and port 110 is POP3.",
  },
  {
    number: 61,
    type: "single",
    text: "A client creates a packet to send to a server. The client is requesting HTTPS service. What number will be used as the destination port number in the sending packet?",
    options: ["443", "161", "110", "80"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.3.2\nHTTPS, the secure form of HTTP, uses TCP port 443. Port 161 is SNMP, port 110 is POP3, and port 80 is unsecured HTTP.",
  },
];
