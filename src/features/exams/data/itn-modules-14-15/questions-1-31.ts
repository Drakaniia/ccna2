import type { Question } from "../../lib/types";

/** Modules 14 - 15 (Network Application Communications), questions 1-31. */
export const questions1to31: Question[] = [
  {
    number: 1,
    type: "single",
    text: "Which action is performed by a client when establishing communication with a server via the use of UDP at the transport layer?",
    options: [
      "The client sets the window size for the session.",
      "The client sends an ISN to the server to start the 3-way handshake.",
      "The client randomly selects a source port number.",
      "The client sends a synchronization segment to begin the session.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 14.7.4\nUDP is connectionless: a client with datagrams to send simply places a randomly chosen source port number and the destination port number of the service in the UDP header and sends them. UDP sets no window size, sends no initial sequence number, and performs no three-way handshake or synchronization, so the other options describe TCP behavior.",
  },
  {
    number: 2,
    type: "single",
    text: "Which transport layer feature is used to guarantee session establishment?",
    options: [
      "UDP ACK flag",
      "TCP 3-way handshake",
      "UDP sequence number",
      "TCP port number",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 14.5.2\nTCP establishes a session with the three-way handshake: the client sends a SYN, the server replies with SYN and ACK, and the client answers with an ACK. UDP is connectionless and has no flags, sequence numbers, or session state, so it cannot guarantee that a session is established.",
  },
  {
    number: 3,
    type: "single",
    text: "What is the complete range of TCP and UDP well-known ports?",
    options: ["0 to 255", "0 to 1023", "256 - 1023", "1024 - 49151"],
    correct: [1],
    explanation:
      "Explanation: Topic 14.4.3\nThe TCP and UDP port numbers fall into three ranges: well-known ports (0 to 1023), registered ports (1024 to 49151), and dynamic or private ports (49152 to 65535).",
  },
  {
    number: 4,
    type: "single",
    text: "What is a socket?",
    options: [
      "the combination of the source and destination IP address and source and destination Ethernet address",
      "the combination of a source IP address and port number or a destination IP address and port number",
      "the combination of the source and destination sequence and acknowledgment numbers",
      "the combination of the source and destination sequence numbers and port numbers",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 14.4.2\nA socket is the combination of an IP address and a port number. The source socket and the destination socket together uniquely identify a conversation between two applications across an IP network.",
  },
  {
    number: 5,
    type: "single",
    text: "A PC is downloading a large file from a server. The TCP window is 1000 bytes. The server is sending the file using 100-byte segments. How many segments will the server send before it requires an acknowledgment from the PC?",
    options: ["1 segment", "10 segments", "100 segments", "1000 segments"],
    correct: [1],
    explanation:
      "Explanation: Topic 14.6.5\nWith a window of 1000 bytes, the destination host accepts segments until all 1000 bytes of data have been received. Then the destination host sends an acknowledgment.",
  },
  {
    number: 6,
    type: "single",
    text: "Which factor determines TCP window size?",
    options: [
      "the amount of data to be transmitted",
      "the number of services included in the TCP segment",
      "the amount of data the destination can process at one time",
      "the amount of data the source is capable of sending at one time",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 14.6.5\nWindow is the number of bytes that the sender will send prior to expecting an acknowledgement from the destination device. The initial window is agreed upon during the session startup via the three-way handshake between source and destination. It is determined by how much data the destination device of a TCP session is able to accept and process at one time.",
  },
  {
    number: 7,
    type: "single",
    text: "What does a client do when it has UDP datagrams to send?",
    options: [
      "It just sends the datagrams.",
      "It queries the server to see if it is ready to receive data.",
      "It sends a simplified three-way handshake to the server.",
      "It sends to the server a segment with the SYN flag set to synchronize the conversation.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 14.1.5\nWhen a client has UDP datagrams to send, it just sends the datagrams.",
  },
  {
    number: 8,
    type: "multi",
    choose: 3,
    text: "Which three fields are used in a UDP segment header? (Choose three.)",
    options: [
      "Window Size",
      "Length",
      "Source Port",
      "Acknowledgment Number",
      "Checksum",
      "Sequence Number",
    ],
    correct: [1, 2, 4],
    explanation:
      "Explanation: Topic 14.3.2\nA UDP header consists of only the Source Port, Destination Port, Length, and Checksum fields. Sequence Number, Acknowledgment Number, and Window Size are TCP header fields.",
  },
  {
    number: 9,
    type: "multi",
    choose: 2,
    text: "What are two roles of the transport layer in data communication on a network? (Choose two.)",
    options: [
      "identifying the proper application for each communication stream",
      "tracking the individual communication between applications on the source and destination hosts",
      "providing frame delimiting to identify bits making up a frame",
      "performing a cyclic redundancy check on the frame for errors",
      "providing the interface between applications and the underlying network over which messages are transmitted",
    ],
    correct: [0, 1],
    explanation:
      "Explanation: Topic 14.1.1\nThe transport layer has several responsibilities. The primary responsibilities include the following:\nTracking the individual communication streams between applications on the source and destination hosts\nSegmenting data at the source and reassembling the data at the destination\nIdentifying the proper application for each communication stream through the use of port numbers",
  },
  {
    number: 10,
    type: "single",
    text: "What information is used by TCP to reassemble and reorder received segments?",
    options: [
      "port numbers",
      "sequence numbers",
      "acknowledgment numbers",
      "fragment numbers",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 14.6.1\nAt the transport layer, TCP uses the sequence numbers in the header of each TCP segment to reassemble the segments into the correct order.",
  },
  {
    number: 11,
    type: "single",
    text: "What important information is added to the TCP/IP transport layer header to ensure communication and connectivity with a remote network device?",
    options: [
      "timing and synchronization",
      "destination and source port numbers",
      "destination and source physical addresses",
      "destination and source logical network addresses",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 14.4.1\nThe destination and source port numbers are used to identify exactly which protocol and process is requesting or responding to a request.",
  },
  {
    number: 12,
    type: "multi",
    choose: 2,
    text: "Which two characteristics are associated with UDP sessions? (Choose two.)",
    options: [
      "Destination devices receive traffic with minimal delay.",
      "Transmitted data segments are tracked.",
      "Destination devices reassemble messages and pass them to an application.",
      "Received data is unacknowledged.",
      "Unacknowledged data packets are retransmitted.",
    ],
    correct: [0, 3],
    explanation:
      "Explanation: Topic 14.7.1\nTCP:\nProvides tracking of transmitted data segments\nDestination devices will acknowledge received data.\nSource devices will retransmit unacknowledged data.\nUDP\nDestination devices will not acknowledge received data\nHeaders use very little overhead and cause minimal delay.",
  },
  {
    number: 13,
    type: "pair",
    text: "A client application needs to terminate a TCP communication session with a server. Place the termination process steps in the order that they will occur. (Not all options are used.)",
    exhibit: [
      {
        src: "/images/itn-modules-14-15/q13-exhibit.jpg",
        alt: "Exhibit for question 13: ordering board with four step slots and six TCP termination messages",
        width: 726,
        height: 742,
      },
      {
        src: "/images/itn-modules-14-15/q13-exhibit-2.jpg",
        alt: "Exhibit for question 13: completed ordering of the TCP session termination steps",
        width: 976,
        height: 354,
      },
    ],
    left: ["Step 1", "Step 2", "Step 3", "Step 4"],
    right: [
      "client sends ACK",
      "client sends FIN",
      "client sends SYN",
      "server sends ACK",
      "server sends FIN",
      "server sends SYN",
    ],
    correctPairs: {
      0: 1,
      1: 3,
      2: 4,
      3: 0,
    },
    explanation:
      "Explanation: Topic 14.5.3\nIn order to terminate a TCP session, the client sends to the server a segment with the FIN flag set. The server acknowledges the client by sending a segment with the ACK flag set. The server sends a FIN to the client to terminate the server to client session. The client acknowledges the termination by sending a segment with the ACK flag set. A FIN from the client and the server's ACK come first; the SYN messages belong to session establishment, not termination, so they are not used.",
  },
  {
    number: 14,
    type: "single",
    text: "Which flag in the TCP header is used in response to a received FIN in order to terminate connectivity between two network devices?",
    options: ["FIN", "ACK", "SYN", "RST"],
    correct: [1],
    explanation:
      "Explanation: Topic 14.5.3\nIn a TCP session, when a device has no more data to send, it will send a segment with the FIN flag set. The connected device that receives the segment will respond with an ACK to acknowledge that segment. The device that sent the ACK will then send a FIN message to close the connection it has with the other device. The sending of the FIN should be followed with the receipt of an ACK from the other device.",
  },
  {
    number: 15,
    type: "single",
    text: "Which protocol or service uses UDP for a client-to-server communication and TCP for server-to-server communication?",
    options: ["HTTP", "FTP", "DNS", "SMTP"],
    correct: [2],
    explanation:
      "Explanation: Topic 14.4.3\nSome applications may use both TCP and UDP. DNS uses UDP when clients send requests to a DNS server, and TCP when two DNS servers communicate directly.",
  },
  {
    number: 16,
    type: "single",
    text: "What is a characteristic of UDP?",
    options: [
      "UDP datagrams take the same path and arrive in the correct order at the destination.",
      "Applications that use UDP are always considered unreliable.",
      "UDP reassembles the received datagrams in the order they were received.",
      "UDP only passes data to the network when the destination is ready to receive the data.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 14.7.2\nUDP has no way to reorder the datagrams into their transmission order, so UDP simply reassembles the data in the order it was received and forwards it to the application.",
  },
  {
    number: 17,
    type: "single",
    text: "What kind of port must be requested from IANA in order to be used with a specific application?",
    options: ["registered port", "private port", "dynamic port", "source port"],
    correct: [0],
    explanation:
      "Explanation: Topic 14.4.3\nRegistered ports (numbers 1024 to 49151) are assigned by IANA to a requesting entity to use with specific processes or applications. These processes are primarily individual applications that a user has chosen to install, rather than common applications that would receive a well-known port number. For example, Cisco has registered port 1985 for its Hot Standby Routing Protocol (HSRP) process.",
  },
  {
    number: 18,
    type: "multi",
    choose: 3,
    text: "Which three application layer protocols use TCP? (Choose three.)",
    options: ["SMTP", "FTP", "SNMP", "HTTP", "TFTP", "DHCP"],
    correct: [0, 1, 3],
    explanation:
      "Explanation: Topic 14.2.4\nSome protocols require the reliable data transport that is provided by TCP. In addition, these protocols do not have real time communication requirements and can tolerate some data loss while minimizing protocol overhead. Examples of these protocols are SMTP, FTP, and HTTP.",
  },
  {
    number: 19,
    type: "multi",
    choose: 3,
    text: "Which three statements characterize UDP? (Choose three.)",
    options: [
      "UDP provides basic connectionless transport layer functions.",
      "UDP provides connection-oriented, fast transport of data at Layer 3.",
      "UDP relies on application layer protocols for error detection.",
      "UDP is a low overhead protocol that does not provide sequencing or flow control mechanisms.",
      "UDP relies on IP for error detection and recovery.",
      "UDP provides sophisticated flow control mechanisms.",
    ],
    correct: [0, 2, 3],
    explanation:
      "Explanation: Topic 14.7.1\nUDP is a simple protocol that provides the basic transport layer functions. It has much lower overhead than TCP because it is not connection-oriented and does not offer the sophisticated retransmission, sequencing, and flow control mechanisms that provide reliability.",
  },
  {
    number: 20,
    type: "multi",
    choose: 2,
    text: "Which two fields are included in the TCP header but not in the UDP header? (Choose two.)",
    options: [
      "window",
      "checksum",
      "source port",
      "destination port",
      "sequence number",
    ],
    correct: [0, 4],
    explanation:
      "Explanation: Topic 14.2.3\nThe sequence number and window fields are included in the TCP header but not in the UDP header.",
  },
  {
    number: 21,
    type: "single",
    text: "Which field in the TCP header indicates the status of the three-way handshake process?",
    options: ["window", "reserved", "checksum", "control bits"],
    correct: [3],
    explanation:
      "Explanation: Topic 14.5.4\nThe value in the control bits field of the TCP header indicates the progress and status of the connection.",
  },
  {
    number: 22,
    type: "single",
    text: "Why does HTTP use TCP as the transport layer protocol?",
    options: [
      "to ensure the fastest possible download speed",
      "because HTTP is a best-effort protocol",
      "because transmission errors can be tolerated easily",
      "because HTTP requires reliable delivery",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 14.1.6\nWhen a host requests a web page, transmission reliability and completeness must be guaranteed. Therefore, HTTP uses TCP as its transport layer protocol.",
  },
  {
    number: 23,
    type: "multi",
    choose: 2,
    text: "Which two types of applications are best suited for UDP? (Choose two.)",
    options: [
      "applications that need data flow control",
      "applications that require reliable delivery",
      "applications that handle reliability themselves",
      "applications that need the reordering of segments",
      "applications that can tolerate some data loss, but require little or no delay",
    ],
    correct: [2, 4],
    explanation:
      "Explanation: Topic 14.1.6\nApplications that can tolerate some data loss, require a simple request and reply, and handle reliability themselves are best suited for UDP. UDP has low overhead and no requirement of reliability. TCP provides services for reliability, controlling data flow, and the reordering of segments.",
  },
  {
    number: 24,
    type: "single",
    text: "How are port numbers used in the TCP/IP encapsulation process?",
    options: [
      "Source port numbers and destination port numbers are not necessary when UDP is the transport layer protocol being used for the communication.",
      "Source port and destination port numbers are randomly generated.",
      "If multiple conversations occur that are using the same service, the source port number is used to track the separate conversations.",
      "Destination port numbers are assigned automatically and cannot be changed.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 14.4.1\nBoth UDP and TCP use port numbers to provide a unique identifier for each conversation. Source port numbers are randomly generated and are used to track different conversations. Destination port numbers identify specific services by using either a default port number for the service or a port number that is assigned manually by a system administrator.",
  },
  {
    number: 25,
    type: "multi",
    choose: 2,
    text: "In what two situations would UDP be better than TCP as the preferred transport protocol? (Choose two.)",
    options: [
      "when applications need to guarantee that a packet arrives intact, in sequence, and unduplicated",
      "when a faster delivery mechanism is needed",
      "when delivery overhead is not an issue",
      "when applications do not need to guarantee delivery of the data",
      "when destination port numbers are dynamic",
    ],
    correct: [1, 3],
    explanation:
      "Explanation: Topic 14.1.6\nUDP is a very simple transport layer protocol that does not guarantee delivery. Devices on both ends of the conversation are not required to keep track of the conversation. UDP is used as the transport protocol for applications that need a speedy, best-effort delivery.",
  },
  {
    number: 26,
    type: "multi",
    choose: 3,
    text: "What are three responsibilities of the transport layer? (Choose three.)",
    options: [
      "meeting the reliability requirements of applications, if any",
      "multiplexing multiple communication streams from many users or applications on the same network",
      "identifying the applications and services on the client and server that should handle transmitted data",
      "directing packets towards the destination network",
      "formatting data into a compatible form for receipt by the destination devices",
      "conducting error detection of the contents in frames",
    ],
    correct: [0, 1, 2],
    explanation:
      "Explanation: Topic 14.1.2\nThe transport layer has several responsibilities. Some of the primary responsibilities include the following:\nTracking the individual communication streams between applications on the source and destination hosts\nSegmenting data at the source and reassembling the data at the destination\nIdentifying the proper application for each communication stream through the use of port numbers\nMultiplexing the communications of multiple users or applications over a single network\nManaging the reliability requirements of applications",
  },
  {
    number: 27,
    type: "multi",
    choose: 3,
    text: "Which three statements describe a DHCP Discover message? (Choose three.)",
    options: [
      "The source MAC address is 48 ones (FF-FF-FF-FF-FF-FF).",
      "The destination IP address is 255.255.255.255.",
      "The message comes from a server offering an IP address.",
      "The message comes from a client seeking an IP address.",
      "All hosts receive the message, but only a DHCP server replies.",
      "Only the DHCP server receives the message.",
    ],
    correct: [1, 3, 4],
    explanation:
      "Explanation: Topic 15.4.7\nWhen a host configured to use DHCP powers up on a network it sends a DHCPDISCOVER message. FF-FF-FF-FF-FF-FF is the L2 broadcast address. A DHCP server replies with a unicast DHCPOFFER message back to the host.",
  },
  {
    number: 28,
    type: "multi",
    choose: 2,
    text: "Which two protocols may devices use in the application process that sends email? (Choose two.)",
    options: ["HTTP", "SMTP", "POP", "IMAP", "DNS", "POP3"],
    correct: [1, 4],
    explanation:
      "Explanation: Topic 15.3.2\nPOP, POP3, and IMAP are protocols that are used to retrieve email from servers. SMTP is the default protocol that is used to send email. DNS may be used by the sender email server to find the address of the destination email server.",
  },
  {
    number: 29,
    type: "single",
    text: "What is true about the Server Message Block protocol?",
    options: [
      "Different SMB message types have a different format.",
      "Clients establish a long term connection to servers.",
      "SMB messages cannot authenticate a session.",
      "SMB uses the FTP protocol for communication.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 15.5.2\nThe Server Message Block protocol is a protocol for file, printer, and directory sharing. Clients establish a long term connection to servers and when the connection is active, the resources can be accessed. Every SMB message has the same format. The use of SMB differs from FTP mainly in the length of the sessions. SMB messages can authenticate sessions.",
  },
  {
    number: 30,
    type: "single",
    text: "What is the function of the HTTP GET message?",
    options: [
      "to request an HTML page from a web server",
      "to send error information from a web server to a web client",
      "to upload content to a web server from a web client",
      "to retrieve client email from an email server using TCP port 110",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 15.3.2\nThere are three common HTTP message types:\nGET - used by clients to request data from the web server\nPOST - used by clients to upload data to a web server\nPUT - used by clients to upload data to a web server",
  },
  {
    number: 31,
    type: "single",
    text: "Which OSI layer provides the interface between the applications used to communicate and the underlying network over which messages are transmitted?",
    options: ["application", "presentation", "session", "transport"],
    correct: [0],
    explanation:
      "Explanation: Topic 15.1.1\nThe application layer is the layer that is closest to the end user and provides the interface between the underlying network and the applications used to communicate.",
  },
];
