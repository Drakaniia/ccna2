import type { Question } from "../../lib/types";

/** Modules 16 - 17 (Building and Securing a Small Network), questions 35-67. */
export const questions35to67: Question[] = [
  {
    number: 35,
    type: "single",
    text: "By following a structured troubleshooting approach, a network administrator identified a network issue after a conversation with the user. What is the next step that the administrator should take?",
    options: [
      "Verify full system functionality.",
      "Test the theory to determine cause.",
      "Establish a theory of probable causes.",
      "Establish a plan of action to resolve the issue.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 17.6.1\nA structured network troubleshooting approach should include these steps in sequence:\nIdentify the problem.\nEstablish a theory of probable causes.\nTest the theory to determine cause.\nEstablish a plan of action to resolve the issue.\nVerify full system functionality and implement preventive measures.\nDocument findings, actions, and outcomes.",
  },
  {
    number: 36,
    type: "single",
    text: "Users are complaining that they are unable to browse certain websites on the Internet. An administrator can successfully ping a web server via its IP address, but cannot browse to the domain name of the website. Which troubleshooting tool would be most useful in determining where the problem is?",
    options: ["netstat", "tracert", "nslookup", "ipconfig"],
    correct: [2],
    explanation:
      "Explanation: Topic 17.7.5\nThe nslookup command can be used to look up information about a particular DNS name in the DNS server. The information includes the IP address of the DNS server being used as well as the IP address associated with the specified DNS name. This command can help verify the DNS that is used and if the domain name to IP address resolution works.",
  },
  {
    number: 37,
    type: "multi",
    choose: 2,
    text: "An employee complains that a Windows PC cannot connect to the Internet. A network technician issues the ipconfig command on the PC and is shown an IP address of 169.254.10.3. Which two conclusions can be drawn? (Choose two.)",
    options: [
      "The PC cannot contact a DHCP server.",
      "The DNS server address is misconfigured.",
      "The default gateway address is not configured.",
      "The PC is configured to obtain an IP address automatically.",
      "The enterprise network is misconfigured for dynamic routing.",
    ],
    correct: [0, 3],
    explanation:
      "Explanation: Topic 17.7.3\nWhen a Windows PC is configured to obtain an IP address automatically, the PC will try to obtain an IP address from a DHCP server. When the PC cannot contact a DHCP server, Windows will automatically assign an address belonging to the 169.254.0.0/16 range.",
  },
  {
    number: 38,
    type: "single",
    text: "Refer to the exhibit. Host H3 is having trouble communicating with host H1. The network administrator suspects a problem exists with the H3 workstation and wants to prove that there is no problem with the R2 configuration. What tool could the network administrator use on router R2 to prove that communication exists to host H1 from the interface on R2, which is the interface that H3 uses when communicating with remote networks?",
    exhibit: {
      src: "/images/itn-modules-16-17/q38-exhibit.jpg",
      alt: "Exhibit for question 38: R1 connected to two switches and R2, with hosts H1 and H3",
      width: 421,
      height: 256,
    },
    options: ["traceroute", "show cdp neighbors", "Telnet", "an extended ping"],
    correct: [3],
    explanation:
      "Explanation: Topic 17.4.2\nAn extended ping allows an administrator to select specific ping features. For example in this situation, the network administrator could do an extended ping and specify a source address of the gigabit Ethernet port on the router. The destination address would be the IP address of host H1. If the ping succeeds connectivity exists from the Ethernet router interface on R2 to device H1.",
  },
  {
    number: 39,
    type: "single",
    text: "Refer to the exhibit. Baseline documentation for a small company had ping round trip time statistics of 36/97/132 between hosts H1 and H3. Today the network administrator checked connectivity by pinging between hosts H1 and H3 that resulted in a round trip time of 1458/2390/6066. What does this indicate to the network administrator?",
    exhibit: {
      src: "/images/itn-modules-16-17/q39-exhibit.jpg",
      alt: "Exhibit for question 39: R1, R2, H1 and H3 topology used for the ping baseline comparison",
      width: 421,
      height: 256,
    },
    options: [
      "Connectivity between H1 and H3 is fine.",
      "H3 is not connected properly to the network.",
      "Something is causing interference between H1 and R1.",
      "Performance between the networks is within expected parameters.",
      "Something is causing a time delay between the networks.",
    ],
    correct: [4],
    explanation:
      "Explanation: Topic 17.4.5\nPing round trip time statistics are shown in milliseconds. The larger the number the more delay. A baseline is critical in times of slow performance. By looking at the documentation for the performance when the network is performing fine and comparing it to information when there is a problem, a network administrator can resolve problems faster.",
  },
  {
    number: 40,
    type: "single",
    text: "Which network service automatically assigns IP addresses to devices on the network?",
    options: ["DHCP", "Telnet", "DNS", "traceroute"],
    correct: [0],
    explanation:
      "Explanation: Topic 17.2.2\nDynamic Host Configuration Protocol (DHCP) can be used to allow end devices to automatically configure IP information, such as their IP address, subnet mask, DNS server, and default gateway. The DNS service is used to provide domain name resolution, mapping hostnames to IP addresses. Telnet is a method for remotely accessing a CLI session of a switch or router. Traceroute is a command used to determine the path a packet takes as it traverses the network.",
  },
  {
    number: 41,
    type: "single",
    text: "Which command can an administrator execute to determine what interface a router will use to reach remote networks?",
    options: ["show arp", "show interfaces", "show ip route", "show protocols"],
    correct: [2],
    explanation:
      "Explanation: Topic 17.5.5\nThe show ip route command is used to display the IP routing table of the router. The IP routing table will show a list of known local and remote networks and the interfaces that the router will use to reach those networks.",
  },
  {
    number: 42,
    type: "multi",
    choose: 2,
    text: "On which two interfaces or ports can security be improved by configuring executive timeouts? (Choose two.)",
    options: [
      "Fast Ethernet interfaces",
      "console ports",
      "serial interfaces",
      "vty ports",
      "loopback interfaces",
    ],
    correct: [1, 3],
    explanation:
      "Explanation: Topic 16.4.3\nExecutive timeouts allow the Cisco device to automatically disconnect users after they have been idle for the specified time. Console, vty, and aux ports can be configured with executive timeouts.",
  },
  {
    number: 43,
    type: "multi",
    choose: 3,
    text: "When configuring SSH on a router to implement secure network management, a network engineer has issued the login local and transport input ssh line vty commands. What three additional configuration actions have to be performed to complete the SSH configuration? (Choose three.)",
    options: [
      "Set the user privilege levels.",
      "Generate the asymmetric RSA keys.",
      "Configure the correct IP domain name.",
      "Configure role-based CLI access.",
      "Create a valid local username and password database.",
      "Manually enable SSH after the RSA keys are generated.",
    ],
    correct: [1, 2, 4],
    explanation:
      "Explanation: Topic 16.4.4\nSSH is automatically enabled after the RSA keys are generated. Setting user privilege levels and configuring role-based CLI access are good security practices but are not a requirement of implementing SSH.",
  },
  {
    number: 44,
    type: "single",
    text: "What is considered the most effective way to mitigate a worm attack?",
    options: [
      "Change system passwords every 30 days.",
      "Ensure that all systems have the most current virus definitions.",
      "Ensure that AAA is configured in the network.",
      "Download security updates from the operating system vendor and patch all vulnerable systems.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 16.3.3\nBecause worms take advantage of vulnerabilities in the system itself, the most effective way to mitigate worm attacks is to download security updates from the operating system vendor and patch all vulnerable systems.",
  },
  {
    number: 45,
    type: "single",
    text: "Which statement describes the ping and tracert commands?",
    options: [
      "Tracert shows each hop, while ping shows a destination reply only.",
      "Tracert uses IP addresses; ping does not.",
      "Both ping and tracert can show results in a graphical display.",
      "Ping shows whether the transmission is successful; tracert does not.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.4.1\nThe ping utility tests end-to-end connectivity between the two hosts. However, if the message does not reach the destination, there is no way to determine where the problem is located. On the other hand, the traceroute utility (tracert in Windows) traces the route a message takes from its source to the destination. Traceroute displays each hop along the way and the time it takes for the message to get to that network and back.",
  },
  {
    number: 46,
    type: "single",
    text: "A technician is to document the current configurations of all network devices in a college, including those in off-site buildings. Which protocol would be best to use to securely access the network devices?",
    options: ["FTP", "HTTP", "SSH", "Telnet"],
    correct: [2],
    explanation:
      "Explanation: Topic 16.4.4\nTelnet sends passwords and other information in clear text, while SSH encrypts its data. FTP and HTTP do not provide remote device access for configuration purposes.",
  },
  {
    number: 47,
    type: "single",
    text: "Open the PT Activity. Perform the tasks in the activity instructions and then answer the question.\nWhich command has to be configured on the router to complete the SSH configuration?",
    exhibit: {
      src: "/images/itn-modules-16-17/q47-exhibit.jpg",
      alt: "Exhibit for question 47: Packet Tracer activity with PC0, Switch0 and Router0 plus the SSH task instructions",
      width: 544,
      height: 291,
    },
    options: [
      "service password-encryption",
      "transport input ssh",
      "enable secret class",
      "ip domain-name cisco.com",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 16.4.4\nThe missing command to complete the SSH configuration is transport input ssh in line vty 0 4 mode. The commands service password-encryption and enable secret class do configure secure features on the router, but are not required to configure SSH. The command ip domain-name cisco.com is not required because the command ip domain-name span.com has been used.",
  },
  {
    number: 48,
    type: "single",
    text: "An administrator decides to use “WhatAreyouwaiting4” as the password on a newly installed router. Which statement applies to the password choice?",
    options: [
      "It is strong because it uses a passphrase.",
      "It is weak because it is often the default password on new devices.",
      "It is weak since it uses easily found personal information.",
      "It is weak since it is a word that is easily found in the dictionary.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.4.2\nThe choice is a passphrase: a long, sentence-like string of words that is easy for the administrator to remember, and whose length makes brute-force guessing impractical. It is not a device default, a dictionary word, or personal information, so the other three objections do not apply.",
  },
  {
    number: 49,
    type: "single",
    text: "An administrator decides to use “pR3s!d7n&0” as the password on a newly installed router. Which statement applies to the password choice?",
    options: [
      "It is strong because it uses a minimum of 10 numbers, letters and special characters.",
      "It is weak because it is often the default password on new devices.",
      "It is weak since it uses easily found personal information.",
      "It is weak since it is a word that is easily found in the dictionary.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.4.2\nThe password mixes upper and lower case letters, numbers and special characters and is at least 10 characters long, which meets the length and complexity guidance for strong passwords. It is not a device default, personal information, or a dictionary word.",
  },
  {
    number: 50,
    type: "single",
    text: "An administrator decides to use “5$7*4#033!” as the password on a newly installed router. Which statement applies to the password choice?",
    options: [
      "It is strong because it contains 10 numbers and special characters.",
      "It is weak because it is often the default password on new devices.",
      "It is weak since it uses easily found personal information.",
      "It is strong because it uses a minimum of 10 numbers, letters and special characters.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.4.2\nThe password is 10 characters long and made up entirely of numbers and special characters, so it is strong for its length. A mix of upper and lower case letters, numbers and special characters is still the better composition.",
  },
  {
    number: 51,
    type: "single",
    text: "An administrator decides to use “pR3s!d7n&0” as the password on a newly installed router. Which statement applies to the password choice?",
    options: [
      "It is strong because it uses a minimum of 10 numbers, letters and special characters.",
      "It is weak since it is a word that is easily found in the dictionary.",
      "It is strong because it uses a passphrase.",
      "It is strong because it contains 10 numbers and special characters.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.4.2\nThe password mixes upper and lower case letters, numbers and special characters and is at least 10 characters long, which meets the length and complexity guidance for strong passwords. It is not a dictionary word, not a passphrase, and not merely numbers and special characters.",
  },
  {
    number: 52,
    type: "single",
    text: "An administrator decides to use “12345678!” as the password on a newly installed router. Which statement applies to the password choice?",
    options: [
      "It is weak because it uses a series of numbers or letters.",
      "It is strong because it uses a passphrase.",
      "It is weak since it is a word that is easily found in the dictionary.",
      "It is strong because it uses a minimum of 10 numbers, letters and special characters.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.4.1\n12345678! is a predictable sequence of numbers with a single special character appended - exactly the pattern password rules tell you to avoid. Length alone does not make it strong; it is neither a passphrase nor a mixed-composition password.",
  },
  {
    number: 53,
    type: "single",
    text: "An administrator decides to use “admin” as the password on a newly installed router. Which statement applies to the password choice?",
    options: [
      "It is weak because it is often the default password on new devices.",
      "It is strong because it uses a passphrase.",
      "It is strong because it uses a minimum of 10 numbers, letters and special characters.",
      "It is strong because it contains 10 numbers and special characters.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.4.1\nadmin is a widely used default administrator account name and password on new devices, so it is one of the first strings any attacker tries. Default credentials must always be changed before a device is placed on the network.",
  },
  {
    number: 54,
    type: "single",
    text: "An administrator decides to use “Feb121978” as the password on a newly installed router. Which statement applies to the password choice?",
    options: [
      "It is weak because it uses easily found personal information.",
      "It is strong because it uses a passphrase.",
      "It is weak since it is a word that is easily found in the dictionary.",
      "It is strong because it uses a minimum of 10 numbers, letters and special characters.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.4.2\nFeb121978 is built from a date, almost certainly a birthday, which is easily discovered or guessed by anyone who knows the administrator. Personal information should never be part of a password.",
  },
  {
    number: 55,
    type: "single",
    text: "An administrator decides to use “password” as the password on a newly installed router. Which statement applies to the password choice?",
    options: [
      "It is weak because it is a commonly used password.",
      "It is weak since it is a word that is easily found in the dictionary.",
      "It is strong because it uses a passphrase.",
      "It is strong because it uses a minimum of 10 numbers, letters and special characters.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.4.1\npassword is one of the most commonly used passwords in the world and appears at the top of published breach lists, so it is weak. It is a commonly used password rather than just an unusual dictionary word.",
  },
  {
    number: 56,
    type: "single",
    text: "An administrator decides to use “RobErT” as the password on a newly installed router. Which statement applies to the password choice?",
    options: [
      "It is weak since it uses easily found personal information.",
      "It is strong because it uses a passphrase.",
      "It is strong because it uses a minimum of 10 numbers, letters and special characters.",
      "It is strong because it contains 10 numbers and special characters.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.4.2\nRobErT is the name of a person, which is easily discoverable personal information. Mixing the case does not make it strong, and it is far too short to resist guessing.",
  },
  {
    number: 57,
    type: "single",
    text: "An administrator decides to use “Elizabeth” as the password on a newly installed router. Which statement applies to the password choice?",
    options: [
      "It is weak because it uses easily found personal information.",
      "It is strong because it uses a passphrase.",
      "It is weak since it is a word that is easily found in the dictionary.",
      "It is strong because it uses a minimum of 10 numbers, letters and special characters.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 16.4.2\nRules for strong passwords:\n* minimum of 8 characters, preferably 10.\n* use complex combinations of numbers, special characters, and upper and lower case letters.\n* avoid repetition, common dictionary words, letter or number sequences.\n* avoid names of children, relatives, pets, birthdays, or any easily identifiable personal information.\n* can be created by misspelling words or replacing vowels with numbers or special characters.",
  },
  {
    number: 58,
    type: "single",
    text: "A network technician is troubleshooting an issue and needs to verify the IP addresses of all interfaces on a router. What is the best command to use to accomplish the task?",
    options: [
      "show ip interface brief",
      "nslookup",
      "ipconfig getifaddr en0",
      "show ip route",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.5.7\nThe show ip interface brief command lists every interface with its IP address and its up or down status in one compact table, which is the fastest way to verify the IP addresses of all interfaces on a router. show ip route displays the routing table, nslookup queries DNS, and ipconfig getifaddr en0 reads the address of the wireless interface on a Mac.",
  },
  {
    number: 59,
    type: "single",
    text: "Students who are connected to the same switch are having slower than normal response times. The administrator suspects a duplex setting issue. What is the best command to use to accomplish the task?",
    options: [
      "show interfaces",
      "ipconfig getifaddr en0",
      "copy running-config startup-config",
      "show ip nat translations",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.7.1\nThe show interfaces command reports the duplex and speed settings of each interface together with error counters such as late collisions and FCS errors, which are the signature of a duplex mismatch. show ip nat translations and copy running-config startup-config have nothing to do with duplex settings.",
  },
  {
    number: 60,
    type: "single",
    text: "A user wants to know the IP address of the PC. What is the best command to use to accomplish the task?",
    options: [
      "ipconfig",
      "copy running-config startup-config",
      "show interfaces",
      "show ip nat translations",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.5.1\nThe ipconfig command displays the IP address, subnet mask and default gateway of each adapter on a Windows PC. show interfaces and show ip nat translations are router commands, and copy running-config startup-config saves a configuration rather than reporting an address.",
  },
  {
    number: 61,
    type: "single",
    text: "A student wants to save a router configuration to NVRAM. What is the best command to use to accomplish the task?",
    options: [
      "copy running-config startup-config",
      "show interfaces",
      "show ip nat translations",
      "show ip route",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.5.1\nstartup-config is the configuration file stored in NVRAM that the router loads at boot, so copying the running configuration to startup-config saves the current configuration in NVRAM.",
  },
  {
    number: 62,
    type: "single",
    text: "A support technician needs to know the IP address of the wireless interface on a MAC. What is the best command to use to accomplish the task?",
    options: [
      "ipconfig getifaddr en0",
      "copy running-config startup-config",
      "show interfaces",
      "show ip nat translations",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.5.3\nOn macOS, ipconfig getifaddr en0 prints the IPv4 address assigned to the en0 wireless interface.",
  },
  {
    number: 63,
    type: "single",
    text: "A network technician is troubleshooting an issue and needs to verify all of the IPv6 interface addresses on a router. What is the best command to use to accomplish the task?",
    options: [
      "show ipv6 interface",
      "show interfaces",
      "show ip nat translations",
      "show ip route",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.5.5\nThe show ipv6 interface command lists every IPv6-enabled interface with its addresses and their state, so it is the best way to verify all of the IPv6 interface addresses on a router. show interfaces does not report IPv6 addresses.",
  },
  {
    number: 64,
    type: "single",
    text: "A teacher is having difficulties connecting his PC to the classroom network. He needs to verify that a default gateway is configured correctly. What is the best command to use to accomplish the task?",
    options: [
      "ipconfig",
      "copy running-config startup-config",
      "show interfaces",
      "show ip nat translations",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.5.1\nThe output of ipconfig on the PC includes the default gateway address along with the IP address and subnet mask, so it verifies that the gateway is configured correctly.",
  },
  {
    number: 65,
    type: "single",
    text: "Only employees connected to IPv6 interfaces are having difficulty connecting to remote networks. The analyst wants to verify that IPv6 routing has been enabled. What is the best command to use to accomplish the task?",
    options: [
      "show running-config",
      "show interfaces",
      "copy running-config startup-config",
      "show ip nat translations",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.7.2\nIPv6 routing is enabled with the ipv6 unicast-routing global configuration command, and the running configuration is the place to confirm that the command is present.",
  },
  {
    number: 66,
    type: "single",
    text: "An administrator is troubleshooting connectivity issues and needs to determine the IP address of a website. What is the best command to use to accomplish the task?",
    options: [
      "nslookup",
      "show ipv6 route",
      "show ipv6 interface",
      "copy startup-config running-config",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 17.7.5\nThe nslookup command queries the DNS server and returns the IP address that a host name resolves to, which is exactly the information needed to reach a website by address.",
  },
  {
    number: 67,
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
      "Explanation: Topic 17.8\nUDP has no way to reorder the datagrams into their transmission order, so UDP simply reassembles the data in the order it was received and forwards it to the application.",
  },
];
