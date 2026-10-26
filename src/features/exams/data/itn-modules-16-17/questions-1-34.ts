import type { Question } from "../../lib/types";

/** Modules 16 - 17 (Building and Securing a Small Network), questions 1-34. */
export const questions1to34: Question[] = [
  {
    number: 1,
    type: "single",
    text: "Which component is designed to protect against unauthorized communications to and from a computer?",
    options: [
      "security center",
      "port scanner",
      "antimalware",
      "antivirus",
      "firewall",
    ],
    correct: [4],
    explanation:
      "Explanation: Topic 16.3.5\nA firewall is designed to protect against unauthorized communications to and from a computer. It sits between the trusted internal network and an untrusted network and permits or denies traffic according to its rule set. Antivirus and antimalware software detect and remove malicious software on a host but do not filter network communications, a port scanner is a reconnaissance tool, and a security center is a host alert console.",
  },
  {
    number: 2,
    type: "single",
    text: "Which command will block login attempts on RouterA for a period of 30 seconds if there are 2 failed login attempts within 10 seconds?",
    options: [
      "RouterA(config)# login block-for 10 attempts 2 within 30",
      "RouterA(config)# login block-for 30 attempts 2 within 10",
      "RouterA(config)# login block-for 2 attempts 30 within 10",
      "RouterA(config)# login block-for 30 attempts 10 within 2",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 16.4.3\nThe login block-for command takes three values: how long logins stay blocked, how many failed attempts are allowed, and the period in which those attempts must occur. Blocking for 30 seconds after 2 failed attempts within 10 seconds is therefore login block-for 30 attempts 2 within 10.",
  },
  {
    number: 3,
    type: "single",
    text: "What is the purpose of the network security accounting function?",
    options: [
      "to require users to prove who they are",
      "to determine which resources a user can access",
      "to keep track of the actions of a user",
      "to provide challenge and response questions",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 16.3.4\nAccounting logs and tracks what an authenticated user did, including the actions performed and the resources accessed. Requiring users to prove who they are is authentication, and determining which resources they may access is authorization.",
  },
  {
    number: 4,
    type: "single",
    text: "What type of attack may involve the use of tools such as nslookup and fping?",
    options: [
      "access attack",
      "reconnaissance attack",
      "denial of service attack",
      "worm attack",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 16.2.2\nReconnaissance attacks use tools such as nslookup, whois, ping sweeps (fping) and port scans to learn about the network - hosts, addresses, open ports and services - so the threat actor can identify vulnerabilities before launching an exploit. Access attacks, DoS attacks and worm attacks all come after that information-gathering stage.",
  },
  {
    number: 5,
    type: "pair",
    text: "Match each weakness with an example. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-modules-16-17/q5-exhibit.jpg",
      alt: "Exhibit for question 5: three weakness types matched to three example scenarios",
      width: 1131,
      height: 432,
    },
    left: [
      "The network administrator did not fully consider the implications of unauthorized users accessing the network.",
      "When implementing an access list on a router, a network engineer did not filter a type of malicious traffic.",
      "A network engineer is examining the operating system of a network device for vulnerabilities.",
    ],
    right: [
      "security policy weakness",
      "configuration weakness",
      "technological weakness",
    ],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
    },
    explanation:
      "Explanation: Topic 16.1.2\nAn employee who is trying to guess the password of another user exemplifies not a weakness but an attack.",
  },
  {
    number: 6,
    type: "pair",
    text: "Match the type of information security threat to the scenario. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-modules-16-17/q6-exhibit.jpg",
      alt: "Exhibit for question 6: four types of information security threat matched to four scenarios",
      width: 782,
      height: 623,
    },
    left: [
      "installing virus code to destroy surveillance recordings for certain days",
      "pretending to be someone else by using stolen personal information to apply for a credit card",
      "preventing users from accessing a website by sending a large number of link requests in a short period",
      "obtaining trade secret documents illegally",
    ],
    right: [
      "information theft",
      "identity theft",
      "data loss",
      "disruption of service",
    ],
    correctPairs: {
      0: 2,
      1: 1,
      2: 3,
      3: 0,
    },
    explanation:
      "Explanation: Topic 16.1.2\nAfter an intruder gains access to a network, common network threats are as follows:\nInformation theft\nIdentity theft\nData loss or manipulation\nDisruption of service\nCracking the password for a known username is a type of access attack.",
  },
  {
    number: 7,
    type: "single",
    text: "Which example of malicious code would be classified as a Trojan horse?",
    options: [
      "malware that was written to look like a video game",
      "malware that requires manual user intervention to spread between systems",
      "malware that attaches itself to a legitimate program and spreads to other programs when launched",
      "malware that can automatically spread from one system to another by exploiting a vulnerability in the target",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.2.1\nA Trojan horse is malicious code that has been written specifically to look like a legitimate program. This is in contrast to a virus, which simply attaches itself to an actual legitimate program. Viruses require manual intervention from a user to spread from one system to another, while a worm is able to spread automatically between systems by exploiting vulnerabilities on those devices.",
  },
  {
    number: 8,
    type: "single",
    text: "What is the difference between a virus and a worm?",
    options: [
      "Viruses self-replicate but worms do not.",
      "Worms self-replicate but viruses do not.",
      "Worms require a host file but viruses do not.",
      "Viruses hide in legitimate programs but worms do not.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 16.2.1\nWorms are able to self-replicate and exploit vulnerabilities on computer networks without user participation.",
  },
  {
    number: 9,
    type: "single",
    text: "Which attack involves a compromise of data that occurs between two end points?",
    options: [
      "denial-of-service",
      "man-in-the-middle attack",
      "extraction of security parameters",
      "username enumeration",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 16.2.3\nThreat actors frequently attempt to access devices over the internet through communication protocols. Some of the most popular remote exploits are as follows:\nMan-In-the-middle attack (MITM) – The threat actor gets between devices in the system and intercepts all of the data being transmitted. This information could simply be collected or modified for a specific purpose and delivered to its original destination.\nEavesdropping attack – When devices are being installed, the threat actor can intercept data such as security keys that are used by constrained devices to establish communications once they are up and running.\nSQL injection (SQLi) – Threat actors uses a flaw in the Structured Query Language (SQL) application that allows them to have access to modify the data or gain administrative privileges.\nRouting attack – A threat actor could either place a rogue routing device on the network or modify routing packets to manipulate routers to send all packets to the chosen destination of the threat actor. The threat actor could then drop specific packets, known as selective forwarding, or drop all packets, known as a sinkhole attack.",
  },
  {
    number: 10,
    type: "single",
    text: "Which type of attack involves an adversary attempting to gather information about a network to identify vulnerabilities?",
    options: ["reconnaissance", "DoS", "dictionary", "man-in-the-middle"],
    correct: [0],
    explanation:
      "Explanation: Topic 16.2.2\nReconnaissance is a type of attack where the intruder is looking for wireless network vulnerabilities.",
  },
  {
    number: 11,
    type: "pair",
    text: "Match the description to the type of firewall filtering. (Not all options are used.)",
    exhibit: [
      {
        src: "/images/itn-modules-16-17/q11-exhibit.jpg",
        alt: "Exhibit for question 11: four firewall filtering types matched to their descriptions",
        width: 661,
        height: 722,
      },
      {
        src: "/images/itn-modules-16-17/q11-exhibit-2.jpg",
        alt: "Exhibit for question 11: completed matching of firewall filtering types to descriptions",
        width: 1325,
        height: 449,
      },
    ],
    left: [
      "prevents or allows access based on the port numbers used in the request",
      "prevents or allows access based on whether the traffic is in response to requests from internal hosts",
      "prevents or allows access based on web addresses or keywords",
      "prevents or allows access based on the IP or MAC addresses of the source and destination",
    ],
    right: [
      "stateful packet inspection",
      "URL filtering",
      "application filtering",
      "packet filtering",
    ],
    correctPairs: {
      0: 2,
      1: 0,
      2: 1,
      3: 3,
    },
    explanation:
      "Explanation: Topic 16.3.6\nStateful packet inspection: Prevents or allows access based on whether the traffic is in response to requests from internal hosts.\nURL filtering: Prevents or allows access based on web addresses or keywords.\nApplication filtering: Prevents or allows access based on the port numbers used in the request.\nPacket filtering: Prevents or allows access based on the IP or MAC addresses of the source and destination.",
  },
  {
    number: 12,
    type: "single",
    text: "What is the purpose of the network security authentication function?",
    options: [
      "to require users to prove who they are",
      "to determine which resources a user can access",
      "to keep track of the actions of a user",
      "to provide challenge and response questions",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.3.4\nAuthentication, authorization, and accounting are network services collectively known as AAA. Authentication requires users to prove who they are. Authorization determines which resources the user can access. Accounting keeps track of the actions of the user.",
  },
  {
    number: 13,
    type: "single",
    text: "Which firewall feature is used to ensure that packets coming into a network are legitimate responses to requests initiated from internal hosts?",
    options: [
      "stateful packet inspection",
      "URL filtering",
      "application filtering",
      "packet filtering",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.3.6\nStateful packet inspection on a firewall checks that incoming packets are actually legitimate responses to requests originating from hosts inside the network. Packet filtering can be used to permit or deny access to resources based on IP or MAC address. Application filtering can permit or deny access based on port number. URL filtering is used to permit or deny access based on URL or on keywords.",
  },
  {
    number: 14,
    type: "single",
    text: "When applied to a router, which command would help mitigate brute-force password attacks against the router?",
    options: [
      "exec-timeout 30",
      "service password-encryption",
      "banner motd $Max failed logins = 5$",
      "login block-for 60 attempts 5 within 60",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 16.4.3\nThe login block-for command sets a limit on the maximum number of failed login attempts allowed within a defined period of time. If this limit is exceeded, no further logins are allowed for the specified period of time. This helps to mitigate brute-force password cracking since it will significantly increase the amount of time required to crack a password. The exec-timeout command specifies how long the session can be idle before the user is disconnected. The service password-encryption command encrypts the passwords in the running configuration. The banner motd command displays a message to users who are logging in to the device.",
  },
  {
    number: 15,
    type: "multi",
    choose: 5,
    text: "Identify the steps needed to configure a switch for SSH. The answer order does not matter. (Not all options are used.)",
    exhibit: {
      src: "/images/itn-modules-16-17/q15-exhibit.jpg",
      alt: "Exhibit for question 15: seven SSH configuration commands and the five ordered answer slots",
      width: 908,
      height: 601,
    },
    options: [
      "Create a local user.",
      "Generate RSA keys.",
      "Use the login command.",
      "Configure a domain name.",
      "Use the login local command.",
      "Use the password cisco command.",
      "Use the transport input ssh command.",
    ],
    correct: [0, 1, 3, 4, 6],
    explanation:
      "Explanation: Topic 16.4.4\nThe login and password cisco commands are used with Telnet switch configuration, not SSH configuration.",
  },
  {
    number: 16,
    type: "single",
    text: "What feature of SSH makes it more secure than Telnet for a device management connection?",
    options: [
      "confidentiality with IPsec",
      "stronger password requirement",
      "random one-time port connection",
      "login information and data encryption",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 16.4.4\nSecure Shell (SSH) is a protocol that provides a secure management connection to a remote device. SSH provides security by providing encryption for both authentication (username and password) and the transmitted data. Telnet is a protocol that uses unsecure plaintext transmission. SSH is assigned to TCP port 22 by default. Although this port can be changed in the SSH server configuration, the port is not dynamically changed. SSH does not use IPsec.",
  },
  {
    number: 17,
    type: "single",
    text: "What is the advantage of using SSH over Telnet?",
    options: [
      "SSH is easier to use.",
      "SSH operates faster than Telnet.",
      "SSH provides secure communications to access hosts.",
      "SSH supports authentication for a connection request.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 16.4.4\nSSH provides a secure method for remote access to hosts by encrypting network traffic between the SSH client and remote hosts. Although both Telnet and SSH request authentication before a connection is established, Telnet does not support encryption of login credentials.",
  },
  {
    number: 18,
    type: "single",
    text: "What is the role of an IPS?",
    options: [
      "detecting and blocking of attacks in real time",
      "connecting global threat information to Cisco network security devices",
      "authenticating and validating traffic",
      "filtering of nefarious websites",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.3.4\nAn intrusion prevention system (IPS) provides real-time detection and blocking of attacks.",
  },
  {
    number: 19,
    type: "single",
    text: "A user is redesigning a network for a small company and wants to ensure security at a reasonable price. The user deploys a new application-aware firewall with intrusion detection capabilities on the ISP connection. The user installs a second firewall to separate the company network from the public network. Additionally, the user installs an IPS on the internal network of the company. What approach is the user implementing?",
    options: ["attack based", "risk based", "structured", "layered"],
    correct: [3],
    explanation:
      "Explanation: Topic 16.3.1\nUsing different defenses at various points of the network creates a layered approach.",
  },
  {
    number: 20,
    type: "single",
    text: "What is an accurate description of redundancy?",
    options: [
      "configuring a router with a complete MAC address database to ensure that all frames can be forwarded to the correct destination",
      "configuring a switch with proper security to ensure that all traffic forwarded through an interface is filtered",
      "designing a network to use multiple virtual devices to ensure that all traffic uses the best path through the internetwork",
      "designing a network to use multiple paths between switches to ensure there is no single point of failure",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 17.1.4\nRedundancy attempts to remove any single point of failure in a network by using multiple physically cabled paths between switches in the network.",
  },
  {
    number: 21,
    type: "multi",
    choose: 2,
    text: "A network administrator is upgrading a small business network to give high priority to real-time applications traffic. What two types of network services is the network administrator trying to accommodate? (Choose two.)",
    options: ["voice", "video", "instant messaging", "FTP", "SNMP"],
    correct: [0, 1],
    explanation:
      "Explanation: Topic 17.1.5\nStreaming media, such as video, and voice traffic, are both examples of real-time traffic. Real-time traffic needs higher priority through the network than other types of traffic because it is very sensitive to network delay and latency.",
  },
  {
    number: 22,
    type: "single",
    text: "What is the purpose of a small company using a protocol analyzer utility to capture network traffic on the network segments where the company is considering a network upgrade?",
    options: [
      "to identify the source and destination of local network traffic",
      "to capture the Internet connection bandwidth requirement",
      "to document and analyze network traffic requirements on each network segment",
      "to establish a baseline for security analysis after the network is upgraded",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 17.3.2\nAn important prerequisite for considering network growth is to understand the type and amount of traffic that is crossing the network as well as the current traffic flow. By using a protocol analyzer in each network segment, the network administrator can document and analyze the network traffic pattern for each segment, which becomes the base in determining the needs and means of the network growth.",
  },
  {
    number: 23,
    type: "single",
    text: "Refer to the exhibit. An administrator is testing connectivity to a remote device with the IP address 10.1.1.1. What does the output of this command indicate?",
    exhibit: {
      src: "/images/itn-modules-16-17/q23-exhibit.png",
      alt: "Exhibit for question 23: ping 10.1.1.1 output from a switch showing five U indicators",
      width: 565,
      height: 112,
    },
    options: [
      "Connectivity to the remote device was successful.",
      "A router along the path did not have a route to the destination.",
      "A ping packet is being blocked by a security device along the path.",
      "The connection timed out while waiting for a reply from the remote device.",
    ],
    correct: [1],
    explanation:
      'Explanation: Topic 17.4.1\nIn the output of the ping command, an exclamation mark (!) indicates a response was successfully received, a period (.) indicates that the connection timed out while waiting for a reply, and the letter "U" indicates that a router along the path did not have a route to the destination and sent an ICMP destination unreachable message back to the source.',
  },
  {
    number: 24,
    type: "single",
    text: "Which method is used to send a ping message specifying the source address for the ping?",
    options: [
      "Issue the ping command from within interface configuration mode.",
      "Issue the ping command without specifying a destination IP address.",
      "Issue the ping command without extended commands.",
      "Issue the ping command after shutting down un-needed interfaces.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 17.4.2\nBy issuing the ping command without a destination IP address in privileged EXEC mode, the Cisco IOS enters extended ping mode. This allows the user to implement extended commands which include source IP address.",
  },
  {
    number: 25,
    type: "single",
    text: "A network engineer is analyzing reports from a recently performed network baseline. Which situation would depict a possible latency issue?",
    options: [
      "a change in the bandwidth according to the show interfaces output",
      "a next-hop timeout from a traceroute",
      "an increase in host-to-host ping response times",
      "a change in the amount of RAM according to the show version output",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 17.4.1\nWhile analyzing historical reports an administrator can compare host-to-host timers from the ping command and depict possible latency issues.",
  },
  {
    number: 26,
    type: "single",
    text: "Which statement is true about Cisco IOS ping indicators?",
    options: [
      "‘!’ indicates that the ping was unsuccessful and that the device may have issues finding a DNS server.",
      "‘U’ may indicate that a router along the path did not contain a route to the destination address and that the ping was unsuccessful.",
      "‘.’ indicates that the ping was successful but the response time was longer than normal.",
      "A combination of ‘.’ and ‘!’ indicates that a router along the path did not have a route to the destination address and responded with an ICMP unreachable message.",
    ],
    correct: [1],
    explanation:
      'Explanation: Topic 17.4.1\nThe most common indicators of a ping issued from the Cisco IOS are "!", ".", and "U". The "!" indicates that the ping completed successfully, verifying connectivity at Layer 3. The "." may indicate that a connectivity problem, routing problem, or device security issue exists along the path and that an ICMP destination unreachable message was not provided. The "U" indicates that a router along the path may not have had a route to the destination address, and that it responded with an ICMP unreachable message.',
  },
  {
    number: 27,
    type: "single",
    text: "A user reports a lack of network connectivity. The technician takes control of the user machine and attempts to ping other computers on the network and these pings fail. The technician pings the default gateway and that also fails. What can be determined for sure by the results of these tests?",
    options: [
      "The NIC in the PC is bad.",
      "The TCP/IP protocol is not enabled.",
      "The router that is attached to the same network as the workstation is down.",
      "Nothing can be determined for sure at this point.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 17.4.1\nIn networks today, a failed ping could mean that the other devices on the network are blocking pings. Further investigation such as checking network connectivity from other devices on the same network is warranted.",
  },
  {
    number: 28,
    type: "single",
    text: "A network technician issues the C:> tracert -6 www.cisco.com command on a Windows PC. What is the purpose of the -6 command option?",
    options: [
      "It forces the trace to use IPv6.",
      "It limits the trace to only 6 hops.",
      "It sets a 6 milliseconds timeout for each replay.",
      "It sends 6 probes within each TTL time period.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.4.3\nThe -6 option in the command C:> tracert -6 www.cisco.com is used to force the trace to use IPv6.",
  },
  {
    number: 29,
    type: "single",
    text: "Why would a network administrator use the tracert utility?",
    options: [
      "to determine the active TCP connections on a PC",
      "to check information about a DNS name in the DNS server",
      "to identify where a packet was lost or delayed on a network",
      "to display the IP address, default gateway, and DNS server address for a PC",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 17.4.3\nThe tracert utility is used to identify the path a packet takes from source to destination. Tracert is commonly used when packets are dropped or not reaching a specific destination.",
  },
  {
    number: 30,
    type: "single",
    text: "A ping fails when performed from router R1 to directly connected router R2. The network administrator then proceeds to issue the show cdp neighbors command. Why would the network administrator issue this command if the ping failed between the two routers?",
    options: [
      "The network administrator suspects a virus because the ping command did not work.",
      "The network administrator wants to verify Layer 2 connectivity.",
      "The network administrator wants to verify the IP address configured on router R2.",
      "The network administrator wants to determine if connectivity can be established from a non-directly connected network.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 17.5.6\nThe show cdp neighbors command can be used to prove that Layer 1 and Layer 2 connectivity exists between two Cisco devices. For example, if two devices have duplicate IP addresses, a ping between the devices will fail, but the output of show cdp neighbors will be successful. The show cdp neighbors detail could be used to verify the IP address of the directly connected device in case the same IP address is assigned to the two routers.",
  },
  {
    number: 31,
    type: "single",
    text: "A network engineer is troubleshooting connectivity issues among interconnected Cisco routers and switches. Which command should the engineer use to find the IP address information, host name, and IOS version of neighboring network devices?",
    options: [
      "show version",
      "show ip route",
      "show interfaces",
      "show cdp neighbors detail",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 17.5.6\nThe show cdp neighbors detail command reveals much information about neighboring Cisco devices, including the IP address, the capabilities, host name, and IOS version. The show interfaces and show version commands display information about the local device.",
  },
  {
    number: 32,
    type: "single",
    text: "What information about a Cisco router can be verified using the show version command?",
    options: [
      "the routing protocol version that is enabled",
      "the value of the configuration register",
      "the operational status of serial interfaces",
      "the administrative distance used to reach networks",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 17.5.5\nThe value of the configuration register can be verified with the show version command.",
  },
  {
    number: 33,
    type: "single",
    text: "Which command should be used on a Cisco router or switch to allow log messages to be displayed on remotely connected sessions using Telnet or SSH?",
    options: [
      "debug all",
      "logging synchronous",
      "show running-config",
      "terminal monitor",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 17.6.4\nThe terminal monitor command is very important to use when log messages appear. Log messages appear by default when a user is directly consoled into a Cisco device, but require the terminal monitor command to be entered when a user is accessing a network device remotely.",
  },
  {
    number: 34,
    type: "single",
    text: "Which command can an administrator issue on a Cisco router to send debug messages to the vty lines?",
    options: [
      "terminal monitor",
      "logging console",
      "logging buffered",
      "logging synchronous",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.6.4\nDebug messages, like other IOS log messages, are sent to the console line by default. Sending these messages to the terminal lines requires the terminal monitor command.",
  },
];
