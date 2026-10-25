import type { Question } from "../../lib/types";

/** Modules 1 - 3 (Basic Network Connectivity and Communications), questions 1-40. */
export const questions1to40: Question[] = [
  {
    number: 1,
    type: "single",
    text: "During a routine inspection, a technician discovered that software that was installed on a computer was secretly collecting data about websites that were visited by users of the computer. Which type of threat is affecting this computer?",
    options: ["DoS attack", "identity theft", "spyware", "zero-day attack"],
    correct: [2],
    explanation: "Explanation: Topic 1.8.1\nSpyware is software that is installed on a network device and that collects information."
  },
  {
    number: 2,
    type: "single",
    text: "Which term refers to a network that provides secure access to the corporate offices by suppliers, customers and collaborators?",
    options: ["Internet", "intranet", "extranet", "extendednet"],
    correct: [2],
    explanation: "Explanation: Topic 1.4.4\nThe term Internet refers to the worldwide collection of connected networks. Intranet refers to a private connection of LANs and WANS that belong to an organization and is designed to be accessible to the members of the organization, employees, or others with authorization. Extranets provide secure and safe access to suppliers, customers, and collaborators. Extendednet is not a type of network."
  },
  {
    number: 3,
    type: "single",
    text: "A large corporation has modified its network to allow users to access network resources from their personal laptops and smart phones. Which networking trend does this describe?",
    options: ["cloud computing", "online collaboration", "bring your own device", "video conferencing"],
    correct: [2],
    explanation: "Explanation: Topic 1.7.2\nBYOD allows end users to use personal tools to access the corporate network. Allowing this trend can have major impacts on a network, such as security and compatibility with corporate software and devices."
  },
  {
    number: 4,
    type: "single",
    text: "What is an ISP?",
    options: [
      "It is a standards body that develops cabling and wiring standards for networking.",
      "It is a protocol that establishes how computers within a local network communicate.",
      "It is an organization that enables individuals and businesses to connect to the Internet.",
      "It is a networking device that combines the functionality of several different networking devices in one."
    ],
    correct: [2],
    explanation: "Explanation: Topic 1.5.1\nAn ISP, or Internet Service Provider, is an organization that provides access to the Internet for businesses and individuals."
  },
  {
    number: 5,
    type: "pair",
    text: "Match the requirements of a reliable network with the supporting network architecture. (Not all options are used.)",
    left: ["fault tolerance", "scalability", "security"],
    right: [
      "Protect the network from unauthorized access.",
      "Provide redundant links and devices.",
      "Match the type of communication with a specific priority.",
      "Expand the network without degrading the service for existing users.",
      "Ensure that streaming data is provided over high speed links."
    ],
    correctPairs: {
      0: 1,
      1: 3,
      2: 0
    },
    explanation: "Explanation: Topic 1.6.5\n- fault tolerance: Provide redundant links and devices.\n- scalability: Expand the network without degrading the service for existing users.\n- security: Protect the network from unauthorized access.\nThe two quality-of-service descriptions are not requirements of a reliable network architecture.",
    exhibit: {
      src: "/images/itn-modules-1-3/q5-exhibit.jpg",
      alt: "Exhibit for question 5: fault tolerance, scalability, and security matched to network architecture descriptions",
      width: 582,
      height: 519
    }
  },
  {
    number: 6,
    type: "single",
    text: "An employee at a branch office is creating a quote for a customer. In order to do this, the employee needs to access confidential pricing information from internal servers at the Head Office. What type of network would the employee access?",
    options: ["an intranet", "the Internet", "an extranet", "a local area network"],
    correct: [0],
    explanation: "Explanation: Topic 1.4.4\nIntranet is a term used to refer to a private connection of LANs and WANs that belongs to an organization. An intranet is designed to be accessible only by the organization's members, employees, or others with authorization."
  },
  {
    number: 7,
    type: "single",
    text: "Which statement describes the use of powerline networking technology?",
    options: [
      "New “smart” electrical cabling is used to extend an existing home LAN.",
      "A home LAN is installed without the use of physical cabling.",
      "A device connects to an existing home LAN using an adapter and an existing electrical outlet.",
      "Wireless access points use powerline adapters to distribute data through the home LAN."
    ],
    correct: [2],
    explanation: "Explanation: Topic 1.7.8\nPowerline networking adds the ability to connect a device to the network using an adapter wherever there is an electrical outlet. The network uses existing electrical wiring to send data. It is not a replacement for physical cabling, but it can add functionality in places where wireless access points cannot be used or cannot reach devices."
  },
  {
    number: 8,
    type: "single",
    text: "A networking technician is working on the wireless network at a medical clinic. The technician accidentally sets up the wireless network so that patients can see the medical records data of other patients. Which of the four network characteristics has been violated in this situation?",
    options: ["fault tolerance", "scalability", "security", "Quality of Service (QoS)", "reliability"],
    correct: [2],
    explanation: "Explanation: Topic 1.1.8\nNetwork security includes protecting the confidentiality of data that is on the network. In this case, because confidential data has been made available to unauthorized users, the security characteristic of the network has failed."
  },
  {
    number: 9,
    type: "pair",
    text: "Match each characteristic to its corresponding Internet connectivity type. (Not all options are used.)",
    left: [
      "uses coaxial cable as a medium",
      "not suited for heavily wooded areas",
      "typically has very low bandwidth",
      "high bandwidth connection that runs over telephone line"
    ],
    right: ["cable", "satellite", "dialup telephone", "DSL"],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 3
    },
    explanation: "Explanation: Topic 1.5.2\n- uses coaxial cable as a medium → cable\n- not suited for heavily wooded areas → satellite\n- typically has very low bandwidth → dialup telephone\n- high bandwidth connection that runs over telephone line → DSL\nDSL is an always-on, high bandwidth connection that runs over telephone lines. Cable uses the same coaxial cable that carries television signals into the home to provide Internet access. Dialup telephone is much slower than either DSL or cable, but is the least expensive option for home users because it can use any telephone line and a simple modem. Satellite requires a clear line of sight and is affected by trees and other obstructions. None of these typical home options use dedicated leased lines such as T1/E1 and T3/E3.",
    exhibit: {
      src: "/images/itn-modules-1-3/q9-exhibit.jpg",
      alt: "Exhibit for question 9: Internet connectivity characteristics matched to connection types",
      width: 1168,
      height: 422
    }
  },
  {
    number: 10,
    type: "multi",
    choose: 2,
    text: "What two criteria are used to help select a network medium from various network media? (Choose two.)",
    options: [
      "the types of data that need to be prioritized",
      "the cost of the end devices utilized in the network",
      "the distance the selected medium can successfully carry a signal",
      "the number of intermediate devices installed in the network",
      "the environment where the selected medium is to be installed"
    ],
    correct: [2, 4],
    explanation: "Explanation: Topic 2.6.2\nCriteria for choosing a network medium are the distance the selected medium can successfully carry a signal, the environment in which the selected medium is to be installed, the amount of data and the speed at which the data must be transmitted, and the cost of the medium and its installation."
  },
  {
    number: 11,
    type: "single",
    text: "What type of network traffic requires QoS?",
    options: ["email", "on-line purchasing", "video conferencing", "wiki"],
    correct: [2],
    explanation: "Explanation: Topic 1.6.4\nVideo conferencing utilizes real-time audio and video communications. Both of these are time-sensitive and bandwidth-intensive forms of communication that require quality of service to be active on the network. QoS will ensure an uninterrupted user experience."
  },
  {
    number: 12,
    type: "multi",
    choose: 2,
    text: "A user is implementing security on a small office network. Which two actions would provide the minimum security requirements for this network? (Choose two.)",
    options: [
      "implementing a firewall",
      "installing a wireless network",
      "installing antivirus software",
      "implementing an intrusion detection system",
      "adding a dedicated intrusion prevention device"
    ],
    correct: [0, 2],
    explanation: "Explanation: Topic 1.8.2\nTechnically complex security measures such as intrusion prevention and intrusion prevention systems are usually associated with business networks rather than home networks. Installing antivirus software, antimalware software, and implementing a firewall will usually be the minimum requirements for home networks. Installing a home wireless network will not improve network security, and will require further security actions to be taken."
  },
  {
    number: 13,
    type: "multi",
    choose: 3,
    text: "Passwords can be used to restrict access to all or parts of the Cisco IOS. Select the modes and interfaces that can be protected with passwords. (Choose three.)",
    options: [
      "VTY interface",
      "console interface",
      "Ethernet interface",
      "boot IOS mode",
      "privileged EXEC mode",
      "router configuration mode"
    ],
    correct: [0, 1, 4],
    explanation: "Explanation: Topic 2.4.3\nAccess to the VTY and console interfaces can be restricted using passwords. Out-of-band management of the router can be restricted in both user EXEC and privileged EXEC modes."
  },
  {
    number: 14,
    type: "single",
    text: "Which interface allows remote management of a Layer 2 switch?",
    options: [
      "the AUX interface",
      "the console port interface",
      "the switch virtual interface",
      "the first Ethernet port interface"
    ],
    correct: [2],
    explanation: "Explanation: Topic 2.6.2\nIn a Layer 2 switch, there is a switch virtual interface (SVI) that provides a means for remotely managing the device."
  },
  {
    number: 15,
    type: "single",
    text: "What function does pressing the Tab key have when entering a command in IOS?",
    options: [
      "It aborts the current command and returns to configuration mode.",
      "It exits configuration mode and returns to user EXEC mode.",
      "It moves the cursor to the beginning of the next line.",
      "It completes the remainder of a partially typed word in a command."
    ],
    correct: [3],
    explanation: "Explanation: Topic 2.3.5\nPressing the Tab key after a command has been partially typed will cause the IOS to complete the rest of the command."
  },
  {
    number: 16,
    type: "single",
    text: "While trying to solve a network issue, a technician made multiple changes to the current router configuration file. The changes did not solve the problem and were not saved. What action can the technician take to discard the changes and work with the file in NVRAM?",
    options: [
      "Issue the reload command without saving the running configuration.",
      "Delete the vlan.dat file and reboot the device.",
      "Close and reopen the terminal emulation software.",
      "Issue the copy startup-config running-config command."
    ],
    correct: [0],
    explanation: "Explanation: Topic 2.5.2\nThe technician does not want to make any mistakes trying to remove all the changes that were done to the running configuration file. The solution is to reboot the router without saving the running configuration. The copy startup-config running-config command does not overwrite the running configuration file with the configuration file stored in NVRAM, but rather it just has an additive effect."
  },
  {
    number: 17,
    type: "single",
    text: "An administrator uses the Ctrl-Shift-6 key combination on a switch after issuing the ping command. What is the purpose of using these keystrokes?",
    options: [
      "to restart the ping process",
      "to interrupt the ping process",
      "to exit to a different configuration mode",
      "to allow the user to complete the command"
    ],
    correct: [1],
    explanation: "Explanation: Topic 2.3.5\nTo interrupt an IOS process such as ping or traceroute, a user enters the Ctrl-Shift-6 key combination. Tab completes the remainder of parameters or arguments within a command. To exit from configuration mode to privileged mode use the Ctrl-Z keystroke. CTRL-R will redisplay the line just typed, thus making it easier for the user to press Enter and reissue the ping command."
  },
  {
    number: 18,
    type: "single",
    text: "Refer to the exhibit. A network administrator is configuring access control to switch SW1. If the administrator uses a console connection to connect to the switch, which password is needed to access user EXEC mode?",
    exhibit: {
      src: "/images/itn-modules-1-3/q18-exhibit.jpg",
      alt: "Exhibit for question 18: console and VTY password configuration on switch SW1",
      width: 487,
      height: 235
    },
    options: ["letmein", "secretin", "lineconin", "linevtyin"],
    correct: [2],
    explanation: "Explanation: Topic 2.4.3\nTelnet accesses a network device through the virtual interface configured with the line VTY command. The password configured under this is required to access the user EXEC mode. The password configured under the line console 0 command is required to gain entry through the console port, and the enable and enable secret passwords are used to allow entry into the privileged EXEC mode."
  },
  {
    number: 19,
    type: "single",
    text: "A technician configures a switch with these commands:\nWhat is the technician configuring?",
    code: "SwitchA(config)# interface vlan 1\nSwitchA(config-if)# ip address 192.168.1.1 255.255.255.0\nSwitchA(config-if)# no shutdown",
    options: ["Telnet access", "SVI", "password encryption", "physical switchport access"],
    correct: [1],
    explanation: "Explanation: Topic 2.7.4\nFor a switch to have an IP address, a switch virtual interface must be configured. This allows the switch to be managed remotely over the network."
  },
  {
    number: 20,
    type: "single",
    text: "Which command or key combination allows a user to return to the previous level in the command hierarchy?",
    options: ["end", "exit", "Ctrl-Z", "Ctrl-C"],
    correct: [1],
    explanation: "Explanation: Topic 2.2.4\nEnd and CTRL-Z return the user to the privileged EXEC mode. Ctrl-C ends a command in process. The exit command returns the user to the previous level."
  },
  {
    number: 21,
    type: "multi",
    choose: 2,
    text: "What are two characteristics of RAM on a Cisco device? (Choose two.)",
    options: [
      "RAM provides nonvolatile storage.",
      "The configuration that is actively running on the device is stored in RAM.",
      "The contents of RAM are lost during a power cycle.",
      "RAM is a component in Cisco switches but not in Cisco routers.",
      "RAM is able to store multiple versions of IOS and configuration files."
    ],
    correct: [1, 2],
    explanation: "Explanation: Topic 2.5.1\nRAM stores data that is used by the device to support network operations. The running configuration is stored in RAM. This type of memory is considered volatile memory because data is lost during a power cycle. Flash memory stores the IOS and delivers a copy of the IOS into RAM when a device is powered on. Flash memory is nonvolatile since it retains stored contents during a loss of power."
  },
  {
    number: 22,
    type: "multi",
    choose: 2,
    text: "Which two host names follow the guidelines for naming conventions on Cisco IOS devices? (Choose two.)",
    options: ["Branch2!", "RM-3-Switch-2A4", "Floor(15)", "HO Floor 17", "SwBranch799"],
    correct: [1, 4],
    explanation: "Explanation: Topic 2.4.1\nSome guidelines for naming conventions are that names should:\nStart with a letter\nContain no spaces\nEnd with a letter or digit\nUse only letters, digits, and dashes\nBe less than 64 characters in length"
  },
  {
    number: 23,
    type: "single",
    text: "How is SSH different from Telnet?",
    options: [
      "SSH makes connections over the network, whereas Telnet is for out-of-band access.",
      "SSH provides security to remote sessions by encrypting messages and using user authentication. Telnet is considered insecure and sends messages in plaintext.",
      "SSH requires the use of the PuTTY terminal emulation program. Tera Term must be used to connect to devices through the use of Telnet.",
      "SSH must be configured over an active network connection, whereas Telnet is used to connect to a device from a console connection."
    ],
    correct: [1],
    explanation: "Explanation: Topic 2.1.4\nSSH is the preferred protocol for connecting to a device operating system over the network because it is much more secure than Telnet. Both SSH and Telnet are used to connect to devices over the network, and so are both used in-band. PuTTY and Terra Term can be used to make both SSH and Telnet connections."
  },
  {
    number: 24,
    type: "pair",
    text: "An administrator is configuring a switch console port with a password. In what order will the administrator travel through the IOS modes of operation in order to reach the mode in which the configuration commands will be entered? (Not all options are used.)",
    left: ["first mode", "second mode", "third mode", "final mode"],
    right: [
      "user EXEC mode",
      "privileged EXEC mode",
      "global configuration mode",
      "line configuration mode"
    ],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 3
    },
    explanation: "Explanation: Topic 2.2.4\n- first mode → user EXEC mode\n- second mode → privileged EXEC mode\n- third mode → global configuration mode\n- final mode → line configuration mode\nThe configuration mode that the administrator first encounters is user EXEC mode. After the enable command is entered, the next mode is privileged EXEC mode. From there, the configure terminal command is entered to move to global configuration mode. Finally, the administrator enters the line console 0 command to enter the mode in which the configuration will be entered.",
    exhibit: {
      src: "/images/itn-modules-1-3/q24-exhibit.jpg",
      alt: "Exhibit for question 24: IOS modes of operation placed in order",
      width: 1022,
      height: 439
    }
  },
  {
    number: 25,
    type: "multi",
    choose: 3,
    text: "What are three characteristics of an SVI? (Choose three.)",
    options: [
      "It is designed as a security protocol to protect switch ports.",
      "It is not associated with any physical interface on a switch.",
      "It is a special interface that allows connectivity by different types of media.",
      "It is required to allow connectivity by any device at any location.",
      "It provides a means to remotely manage a switch.",
      "It is associated with VLAN1 by default."
    ],
    correct: [1, 4, 5],
    explanation: "Explanation: Topic 2.6.2\nSwitches have one or more switch virtual interfaces (SVIs). SVIs are created in software since there is no physical hardware associated with them. Virtual interfaces provide a means to remotely manage a switch over a network that is using IP. Each switch comes with one SVI appearing in the default configuration \"out-of-the-box.\" The default SVI interface is VLAN1."
  },
  {
    number: 26,
    type: "single",
    text: "What command is used to verify the condition of the switch interfaces, including the status of the interfaces and a configured IP address?",
    options: ["ipconfig", "ping", "traceroute", "show ip interface brief"],
    correct: [3],
    explanation: "Explanation: Topic 2.8.1\nThe show ip interface brief command is used to display a brief synopsis of the condition of the device interfaces. The ipconfig command is used to verify TCP/IP properties on a host. The ping command is used to verify Layer 3 connectivity. The traceroute command is used to trace the network path from source to destination."
  },
  {
    number: 27,
    type: "pair",
    text: "Match the description with the associated IOS mode. (Not all options are used.)",
    left: [
      "changes made affect the operation of the device as a whole",
      "accessed by entering the enable command",
      "identified by a prompt ending with the # character",
      "limited number of basic monitoring commands",
      "accessed by entering the configure terminal command",
      "the first entrance into the CLI of an IOS device"
    ],
    right: ["user EXEC mode", "privileged EXEC mode", "global configuration mode"],
    correctPairs: {
      0: 2,
      1: 1,
      2: 1,
      3: 0,
      4: 2,
      5: 0
    },
    allowMultiMatch: true,
    explanation: "Explanation: Topic 2.2.4\n- user EXEC mode: limited number of basic monitoring commands; the first entrance into the CLI of an IOS device\n- privileged EXEC mode: accessed by entering the enable command; identified by a prompt ending with the # character\n- global configuration mode: changes made affect the operation of the device as a whole; accessed by entering the configure terminal command\nThe vty password command belongs to line configuration mode and is not used here.",
    exhibit: {
      src: "/images/itn-modules-1-3/q27-exhibit.jpg",
      alt: "Exhibit for question 27: IOS mode descriptions matched to IOS modes",
      width: 665,
      height: 691
    }
  },
  {
    number: 28,
    type: "pair",
    text: "Match the definitions to their respective CLI hot keys and shortcuts. (Not all options are used.)",
    left: [
      "provides context-sensitive help",
      "displays the next screen",
      "completes abbreviated commands and parameters",
      "scrolls backwards through previously entered commands",
      "aborts commands such as trace and ping"
    ],
    right: ["?", "Space bar", "Tab", "Up Arrow", "Ctrl-Shift-6"],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4
    },
    explanation: "Explanation: Topic 2.3.5\n- provides context-sensitive help → ?\n- displays the next screen → Space bar\n- completes abbreviated commands and parameters → Tab\n- scrolls backwards through previously entered commands → Up Arrow\n- aborts commands such as trace and ping → Ctrl-Shift-6\nThe shortcuts with their functions are as follows:\n- Tab - Completes the remainder of a partially typed command or keyword\n- Space bar - displays the next screen\n- ? - provides context-sensitive help\n- Up Arrow - Allows user to scroll backward through former commands\n- Ctrl-C - cancels any command currently being entered and returns directly to privileged EXEC mode\n- Ctrl-Shift-6 - Allows the user to interrupt an IOS process such as ping or traceroute",
    exhibit: {
      src: "/images/itn-modules-1-3/q28-exhibit.jpg",
      alt: "Exhibit for question 28: CLI hot keys and their definitions",
      width: 1064,
      height: 564
    }
  },
  {
    number: 29,
    type: "single",
    text: "In the show running-config command, which part of the syntax is represented by running-config ?",
    options: ["the command", "a keyword", "a variable", "a prompt"],
    correct: [1],
    explanation: "Explanation: Topic 2.3.1\nThe first part of the syntax, show, is the command, and the second part of the syntax, running-config, is the keyword. The keyword specifies what should be displayed as the output of the show command."
  },
  {
    number: 30,
    type: "single",
    text: "After making configuration changes on a Cisco switch, a network administrator issues a copy running-config startup-config command. What is the result of issuing this command?",
    options: [
      "The new configuration will be stored in flash memory.",
      "The new configuration will be loaded if the switch is restarted.",
      "The current IOS file will be replaced with the newly configured file.",
      "The configuration changes will be removed and the original configuration will be restored."
    ],
    correct: [1],
    explanation: "Explanation: Topic 2.5.2\nWith the copy running-config startup-config command, the content of the current operating configuration replaces the startup configuration file stored in NVRAM. The configuration file saved in NVRAM will be loaded when the device is restarted."
  },
  {
    number: 31,
    type: "single",
    text: "What command will prevent all unencrypted passwords from displaying in plain text in a configuration file?",
    options: [
      "(config)# enable password secret",
      "(config)# enable secret Secret_Password",
      "(config-line)# password secret",
      "(config)# service password-encryption",
      "(config)# enable secret Encrypted_Password"
    ],
    correct: [3],
    explanation: "Explanation: Topic 2.4.4\nTo prevent all configured passwords from appearing in plain text in configuration files, an administrator can execute the service password-encryption command. This command encrypts all configured passwords in the configuration file."
  },
  {
    number: 32,
    type: "single",
    text: "A network administrator enters the service password-encryption command into the configuration mode of a router. What does this command accomplish?",
    options: [
      "This command encrypts passwords as they are transmitted across serial WAN links.",
      "This command prevents someone from viewing the running configuration passwords.",
      "This command enables a strong encryption algorithm for the enable secret password command.",
      "This command automatically encrypts passwords in configuration files that are currently stored in NVRAM.",
      "This command provides an exclusive encrypted password for external service personnel who are required to do router maintenance."
    ],
    correct: [1],
    explanation: "Explanation: Topic 2.4.4\nThe startup-config and running-config files display most passwords in plaintext. Use the service password-encryption global config command to encrypt all plaintext passwords in these files."
  },
  {
    number: 33,
    type: "single",
    text: "What method can be used by two computers to ensure that packets are not dropped because too much data is being sent too quickly?",
    options: ["encapsulation", "flow control", "access method", "response timeout"],
    correct: [1],
    explanation: "Explanation: Topic 3.1.9\nIn order for two computers to be able to communicate effectively, there must be a mechanism that allows both the source and destination to set the timing of the transmission and receipt of data. Flow control allows for this by ensuring that data is not sent too fast for it to be received properly."
  },
  {
    number: 34,
    type: "single",
    text: "Which statement accurately describes a TCP/IP encapsulation process when a PC is sending data to the network?",
    options: [
      "Data is sent from the internet layer to the network access layer.",
      "Packets are sent from the network access layer to the transport layer.",
      "Segments are sent from the transport layer to the internet layer.",
      "Frames are sent from the network access layer to the internet layer."
    ],
    correct: [2],
    explanation: "Explanation: Topic 3.6.4\nWhen the data is traveling from the PC to the network, the transport layer sends segments to the internet layer. The internet layer sends packets to the network access layer, which creates frames and then converts the frames to bits. The bits are released to the network media."
  },
  {
    number: 35,
    type: "multi",
    choose: 3,
    text: "What three application layer protocols are part of the TCP/IP protocol suite? (Choose three.)",
    options: ["ARP", "DHCP", "DNS", "FTP", "NAT", "PPP"],
    correct: [1, 2, 3],
    explanation: "Explanation: Topic 3.3.4\nDNS, DHCP, and FTP are all application layer protocols in the TCP/IP protocol suite. ARP and PPP are network access layer protocols, and NAT is an internet layer protocol in the TCP/IP protocol suite."
  },
  {
    number: 36,
    type: "pair",
    text: "Match the description to the organization. (Not all options are used.)",
    left: [
      "This organization is responsible for overseeing and managing IP address allocation, domain name management, and protocol identifiers.",
      "This organization is the largest developer of international standards in the world for a wide variety of products and services. It is known for its Open Systems Interconnection (OSI) reference model.",
      "This organization promotes the open development, evolution, and use of the Internet throughout the world."
    ],
    right: ["ISOC", "ISO", "EIA", "IANA"],
    correctPairs: {
      0: 3,
      1: 1,
      2: 0
    },
    explanation: "Explanation: Topic 3.3.2 and 3.4.2\n- IANA: oversees and manages IP address allocation, domain name management, and protocol identifiers.\n- ISO: the largest developer of international standards and the body behind the OSI reference model.\n- ISOC: promotes the open development, evolution, and use of the Internet.\nEIA is a standards and trade organization for electronics; its electrical wiring, connector, and rack standards are not described here, so it is not used.",
    exhibit: {
      src: "/images/itn-modules-1-3/q36-exhibit.jpg",
      alt: "Exhibit for question 36: Internet standards organizations and their descriptions",
      width: 727,
      height: 671
    }
  },
  {
    number: 37,
    type: "single",
    text: "Which name is assigned to the transport layer PDU?",
    options: ["bits", "data", "frame", "packet", "segment"],
    correct: [4],
    explanation: "Explanation: Topic 3.6.3\nApplication data is passed down the protocol stack on its way to be transmitted across the network media. During the process, various protocols add information to it at each level. At each stage of the process, a PDU (protocol data unit) has a different name to reflect its new functions. The PDUs are named according to the protocols of the TCP/IP suite:\nData - The general term for the PDU used at the application layer.\nSegment - transport layer PDU\nPacket - network layer PDU\nFrame – data link layer PDU\nBits - A physical layer PDU used when physically transmitting data over the medium"
  },
  {
    number: 38,
    type: "single",
    text: "When IPv4 addressing is manually configured on a web server, which property of the IPv4 configuration identifies the network and host portion for an IPv4 address?",
    options: ["DNS server address", "subnet mask", "default gateway", "DHCP server address"],
    correct: [1],
    explanation: "Explanation: Topic 3.7.2\nThere are several components that need to be entered when configuring IPv4 for an end device:\nIPv4 address - uniquely identifies an end device on the network\nSubnet mask - determines the network address portion and host portion for an IPv4 address\nDefault gateway - the IP address of the router interface used for communicating with hosts in another network\nDNS server address - the IP address of the Domain Name System (DNS) server\nDHCP server address (if DHCP is used) is not configured manually on end devices. It will be provided by a DHCP server when an end device requests an IP address."
  },
  {
    number: 39,
    type: "single",
    text: "What process involves placing one PDU inside of another PDU?",
    options: ["encapsulation", "encoding", "segmentation", "flow control"],
    correct: [0],
    explanation: "Explanation: Topic 3.6.3\nWhen a message is placed inside of another message, this is known as encapsulation. On networks, encapsulation takes place when one protocol data unit is carried inside of the data field of the next lower protocol data unit."
  },
  {
    number: 40,
    type: "single",
    text: "What layer is responsible for routing messages through an internetwork in the TCP/IP model?",
    options: ["internet", "transport", "network access", "session"],
    correct: [0],
    explanation: "Explanation: Topic 3.5.4\nThe TCP/IP model consists of four layers: application, transport, internet, and network access. Of these four layers, it is the internet layer that is responsible for routing messages. The session layer is not part of the TCP/IP model but is rather part of the OSI model."
  },
];
