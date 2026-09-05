import type { Question } from "../../lib/types";

/** Modules 10 - 13 (L2 Security and WLANs), questions 1-41. */
export const questions1to41: Question[] = [
  {
    number: 1,
    type: "single",
    text: "Which Layer 2 attack will result in legitimate users not getting valid IP addresses?",
    options: ["ARP spoofing", "DHCP starvation", "IP address spoofing", "MAC address flooding"],
    correct: [1],
    explanation:
      "Explanation: Topic 10.5.5\nThe DHCP starvation attack causes the exhaustion of the IP address pool of a DHCP server before legitimate users can obtain valid IP addresses.",
  },
  {
    number: 2,
    type: "single",
    text: "What mitigation plan is best for thwarting a DoS attack that is creating a MAC address table overflow?",
    options: [
      "Disable DTP.",
      "Disable STP.",
      "Enable port security.",
      "Place unused ports in an unused VLAN.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.1.2\nA MAC address (CAM) table overflow attack, buffer overflow, and MAC address spoofing can all be mitigated by configuring port security. A network administrator would typically not want to disable STP because it prevents Layer 2 loops. DTP is disabled to prevent VLAN hopping. Placing unused ports in an unused VLAN prevents unauthorized wired connectivity.",
  },
  {
    number: 3,
    type: "multi",
    text: "Which three Cisco products focus on endpoint security solutions? (Choose three.)",
    choose: 3,
    options: [
      "IPS Sensor Appliance",
      "Web Security Appliance",
      "Email Security Appliance",
      "SSL/IPsec VPN Appliance",
      "Adaptive Security Appliance",
      "NAC Appliance",
    ],
    correct: [1, 2, 5],
    explanation:
      "Explanation: Topic 10.1.3\nThe primary components of endpoint security solutions are Cisco Email and Web Security appliances, and Cisco NAC appliance. ASA, SSL/IPsec VPN, and IPS sensor appliances all provide security solutions that focus on the enterprise network, not on endpoint devices.",
  },
  {
    number: 4,
    type: "single",
    text: "True or False?\nIn the 802.1X standard, the client attempting to access the network is referred to as the supplicant.",
    options: ["True", "False"],
    correct: [0],
    explanation:
      "Explanation: Topic 10.2.6\nThe 802.1X port-based authentication process defines three roles: the supplicant (the client requesting network access), the authenticator (the switch or access point that controls access), and the authentication server (which validates the client). The statement is true.",
  },
  {
    number: 5,
    type: "single",
    text: "Which authentication method stores usernames and passwords in the router and is ideal for small networks?",
    options: [
      "server-based AAA over TACACS+",
      "local AAA over RADIUS",
      "server-based AAA",
      "local AAA over TACACS+",
      "local AAA",
      "server-based AAA over RADIUS",
    ],
    correct: [4],
    explanation:
      "Explanation: Topic 10.2.3\nIn a small network with a few network devices, AAA authentication can be implemented with the local database and with usernames and passwords stored on the network devices. Authentication using the TACACS+ or RADIUS protocol will require dedicated ACS servers although this authentication solution scales well in a large network.",
  },
  {
    number: 6,
    type: "single",
    text: "What represents a best practice concerning discovery protocols such as CDP and LLDP on network devices?",
    options: [
      "Enable CDP on edge devices, and enable LLDP on interior devices.",
      "Use the open standard LLDP rather than CDP.",
      "Use the default router settings for CDP and LLDP.",
      "Disable both protocols on all interfaces where they are not required.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 10.5.10\nBoth discovery protocols can provide hackers with sensitive network information. They should not be enabled on edge devices, and should be disabled globally or on a per-interface basis if not required. CDP is enabled by default.",
  },
  {
    number: 7,
    type: "single",
    text: "Which protocol should be used to mitigate the vulnerability of using Telnet to remotely manage network devices?",
    options: ["SNMP", "TFTP", "SSH", "SCP"],
    correct: [2],
    explanation:
      "Explanation: Topic 10.3.3\nTelnet uses plain text to communicate in a network. The username and password can be captured if the data transmission is intercepted. SSH encrypts data communications between two network devices. TFTP and SCP are used for file transfer over the network. SNMP is used in network management solutions.",
  },
  {
    number: 8,
    type: "single",
    text: "Which statement describes the behavior of a switch when the MAC address table is full?",
    options: [
      "It treats frames as unknown unicast and floods all incoming frames to all ports on the switch.",
      "It treats frames as unknown unicast and floods all incoming frames to all ports across multiple switches.",
      "It treats frames as unknown unicast and floods all incoming frames to all ports within the local VLAN.",
      "It treats frames as unknown unicast and floods all incoming frames to all ports within the collision domain.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 10.4.2\nWhen the MAC address table is full, the switch treats the frame as an unknown unicast and begins to flood all incoming traffic to all ports only within the local VLAN.",
  },
  {
    number: 9,
    type: "single",
    text: "What device is considered a supplicant during the 802.1X authentication process?",
    options: [
      "the router that is serving as the default gateway",
      "the authentication server that is performing client authentication",
      "the client that is requesting authentication",
      "the switch that is controlling network access",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 10.2.6\nThe devices involved in the 802.1X authentication process are as follows:\nThe supplicant, which is the client that is requesting network access\nThe authenticator, which is the switch that the client is connecting to and that is actually controlling physical network access\nThe authentication server, which performs the actual authentication",
  },
  {
    number: 10,
    type: "single",
    text: "Refer to the exhibit. Port Fa0/2 has already been configured appropriately. The IP phone and PC work properly. Which switch configuration would be most appropriate for port Fa0/2 if the network administrator has the following goals?\nNo one is allowed to disconnect the IP phone or the PC and connect some other wired device.\nIf a different device is connected, port Fa0/2 is shut down.\nThe switch should automatically detect the MAC address of the IP phone and the PC and add those addresses to the running configuration.",
    exhibit: {
      src: "/images/modules-10-13/q10-exhibit.jpg",
      alt: "Exhibit for question 10: IP phone and PC connected to switch port Fa0/2",
      width: 241,
      height: 160,
    },
    options: [
      "SWA(config-if)# switchport port-security\nSWA(config-if)# switchport port-security mac-address sticky",
      "SWA(config-if)# switchport port-security\nSWA(config-if)# switchport port-security maximum 2\nSWA(config-if)# switchport port-security mac-address sticky\nSWA(config-if)# switchport port-security violation restrict",
      "SWA(config-if)# switchport port-security mac-address sticky\nSWA(config-if)# switchport port-security maximum 2",
      "SWA(config-if)# switchport port-security\nSWA(config-if)# switchport port-security maximum 2\nSWA(config-if)# switchport port-security mac-address sticky",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 11.1.4\nThe default mode for a port security violation is to shut down the port so the switchport port-security violation command is not necessary. The switchport port-security command must be entered with no additional options to enable port security for the port. Then, additional port security options can be added.",
  },
  {
    number: 11,
    type: "single",
    text: "Refer to the exhibit. Port security has been configured on the Fa 0/12 interface of switch S1. What action will occur when PC1 is attached to switch S1 with the applied configuration?",
    exhibit: {
      src: "/images/modules-10-13/q11-exhibit.png",
      alt: "Exhibit for question 11: port security configuration for interface Fa0/12 on switch S1",
      width: 458,
      height: 190,
    },
    options: [
      "Frames from PC1 will be forwarded since the switchport port-security violation command is missing.",
      "Frames from PC1 will be forwarded to its destination, and a log entry will be created.",
      "Frames from PC1 will be forwarded to its destination, but a log entry will not be created.",
      "Frames from PC1 will cause the interface to shut down immediately, and a log entry will be made.",
      "Frames from PC1 will be dropped, and there will be no log of the violation.",
      "Frames from PC1 will be dropped, and a log message will be created.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 11.1.6\nManual configuration of the single allowed MAC address has been entered for port fa0/12. PC1 has a different MAC address and when attached will cause the port to shut down (the default action), a log message to be automatically created, and the violation counter to increment. The default action of shutdown is recommended because the restrict option might fail if an attack is underway.",
  },
  {
    number: 12,
    type: "single",
    text: "Which type of VLAN-hopping attack may be prevented by designating an unused VLAN as the native VLAN?",
    options: ["DHCP spoofing", "DHCP starvation", "VLAN double-tagging", "DTP spoofing"],
    correct: [2],
    explanation:
      "Explanation: Topic 10.5.3\nSpoofing DTP messages forces a switch into trunking mode as part of a VLAN-hopping attack, but VLAN double tagging works even if trunk ports are disabled. Changing the native VLAN from the default to an unused VLAN reduces the possibility of this type of attack. DHCP spoofing and DHCP starvation exploit vulnerabilities in the DHCP message exchange.",
  },
  {
    number: 13,
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
    number: 14,
    type: "multi",
    text: "Which two commands can be used to enable BPDU guard on a switch? (Choose two.)",
    choose: 2,
    options: [
      "S1(config)# spanning-tree bpduguard default",
      "S1(config-if)# spanning-tree portfast bpduguard",
      "S1(config)# spanning-tree portfast bpduguard default",
      "S1(config-if)# enable spanning-tree bpduguard",
      "S1(config-if)# spanning-tree bpduguard enable",
    ],
    correct: [2, 4],
    explanation:
      "Explanation: Topic 11.5.3\nBPDU guard can be enabled on all PortFast-enabled ports by using the spanning-tree portfast bpduguard default global configuration command. Alternatively, BPDU guard can be enabled on a PortFast-enabled port through the use of the spanning-tree bpduguard enable interface configuration command.",
  },
  {
    number: 15,
    type: "single",
    text: "As part of the new security policy, all switches on the network are configured to automatically learn MAC addresses for each port. All running configurations are saved at the start and close of every business day. A severe thunderstorm causes an extended power outage several hours after the close of business. When the switches are brought back online, the dynamically learned MAC addresses are retained. Which port security configuration enabled this?",
    options: [
      "auto secure MAC addresses",
      "dynamic secure MAC addresses",
      "static secure MAC addresses",
      "sticky secure MAC addresses",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 11.1.4\nWith sticky secure MAC addressing, the MAC addresses can be either dynamically learned or manually configured and then stored in the address table and added to the running configuration file. In contrast, dynamic secure MAC addressing provides for dynamically learned MAC addressing that is stored only in the address table.",
  },
  {
    number: 16,
    type: "single",
    text: "Which type of management frame may regularly be broadcast by an AP?",
    options: ["authentication", "probe request", "probe response", "beacon"],
    correct: [3],
    explanation:
      "Explanation: Topic 12.3.7\nBeacons are the only management frame that may regularly be broadcast by an AP. Probing, authentication, and association frames are used only during the association (or reassociation) process.",
  },
  {
    number: 17,
    type: "multi",
    text: "What are the two methods that are used by a wireless NIC to discover an AP? (Choose two.)",
    choose: 2,
    options: [
      "delivering a broadcast frame",
      "receiving a broadcast beacon frame",
      "initiating a three-way handshake",
      "sending an ARP request",
      "transmitting a probe request",
    ],
    correct: [1, 4],
    explanation:
      "Explanation: Topic 12.3.7\nTwo methods can be used by a wireless device to discover and register with an access point: passive mode and active mode. In passive mode, the AP sends a broadcast beacon frame that contains the SSID and other wireless settings. In active mode, the wireless device must be manually configured for the SSID, and then the device broadcasts a probe request.",
  },
  {
    number: 18,
    type: "single",
    text: "A technician is configuring the channel on a wireless router to either 1, 6, or 11. What is the purpose of adjusting the channel?",
    options: [
      "to enable different 802.11 standards",
      "to avoid interference from nearby wireless devices",
      "to disable broadcasting of the SSID",
      "to provide stronger security modes",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 12.5.2\nChannels 1, 6, and 11 are selected because they are 5 channels apart. thus minimizing the interference with adjacent channels. A channel frequency can interfere with channels on either side of the main frequency. All wireless devices need to be used on nonadjacent channels.",
  },
  {
    number: 19,
    type: "single",
    text: "While attending a conference, participants are using laptops for network connectivity. When a guest speaker attempts to connect to the network, the laptop fails to display any available wireless networks. The access point must be operating in which mode?",
    options: ["mixed", "passive", "active", "open"],
    correct: [2],
    explanation:
      "Explanation: Topic 12.3.7\nActive is a mode used to configure an access point so that clients must know the SSID to connect to the access point. APs and wireless routers can operate in a mixed mode meaning that that multiple wireless standards are supported. Open is an authentication mode for an access point that has no impact on the listing of available wireless networks for a client. When an access point is configured in passive mode, the SSID is broadcast so that the name of wireless network will appear in the listing of available networks for clients.",
  },
  {
    number: 20,
    type: "single",
    text: "A network administrator is required to upgrade wireless access to end users in a building. To provide data rates up to 1.3 Gb/s and still be backward compatible with older devices, which wireless standard should be implemented?",
    options: ["802.11n", "802.11ac", "802.11g", "802.11b"],
    correct: [1],
    explanation:
      "Explanation: Topic 12.1.4\n802.11ac provides data rates up to 1.3 Gb/s and is still backward compatible with 802.11a/b/g/n devices. 802.11g and 802.11n are older standards that cannot reach speeds over 1Gb/s. 802.11ad is a newer standard that can offer theoretical speeds of up to 7 Gb/s.",
  },
  {
    number: 21,
    type: "single",
    text: "A technician is about to install and configure a wireless network at a small branch office. What is the first security measure the technician should apply immediately upon powering up the wireless router?",
    options: [
      "Enable MAC address filtering on the wireless router.",
      "Configure encryption on the wireless router and the connected wireless devices.",
      "Change the default user-name and password of the wireless router.",
      "Disable the wireless network SSID broadcast.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 13.1.3\nThe first action a technician should do to secure a new wireless network is to change the default user-name and password of the wireless router. The next action would usually be to configure encryption. Then once the initial group of wireless hosts have connected to the network, MAC address filtering would be enabled and SSID broadcast disabled. This will prevent new unauthorized hosts from finding and connecting to the wireless network.",
  },
  {
    number: 22,
    type: "single",
    text: "On a Cisco 3504 WLC dashboard, which option provides access to the full menu of features?",
    options: ["Access Points", "Network Summary", "Advanced", "Rogues"],
    correct: [2],
    explanation:
      "Explanation: Topic 13.2.5\nThe Cisco 3504 WLC dashboard displays when a user logs into the WLC. It provides some basic settings and menus that users can quickly access to implement a variety of common configurations. By clicking the Advanced button, the user will access the advanced Summary page and access all the features of the WLC.",
  },
  {
    number: 23,
    type: "single",
    text: "Which step is required before creating a new WLAN on a Cisco 3500 series WLC?",
    options: [
      "Create a new SSID.",
      "Build or have an SNMP server available.",
      "Build or have a RADIUS server available.",
      "Create a new VLAN interface.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 13.3.7\nEach new WLAN configured on a Cisco 3500 series WLC needs its own VLAN interface. Thus it is required that a new VLAN interface to be created first before a new WLAN can be created.",
  },
  {
    number: 24,
    type: "single",
    text: "A network engineer is troubleshooting a newly deployed wireless network that is using the latest 802.11 standards. When users access high bandwidth services such as streaming video, the wireless network performance is poor. To improve performance the network engineer decides to configure a 5 Ghz frequency band SSID and train users to use that SSID for streaming media services. Why might this solution improve the wireless network performance for that type of service?",
    options: [
      "Requiring the users to switch to the 5 GHz band for streaming media is inconvenient and will result in fewer users accessing these services.",
      "The 5 GHz band has more channels and is less crowded than the 2.4 GHz band, which makes it more suited to streaming multimedia.",
      "The 5 GHz band has a greater range and is therefore likely to be interference-free.",
      "The only users that can switch to the 5 GHz band will be those with the latest wireless NICs, which will reduce usage.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 13.4.3\nWireless range is determined by the access point antenna and output power, not the frequency band that is used. In this scenario it is stated that all users have wireless NICs that comply with the latest standard, and so all can access the 5 GHz band. Although some users may find it inconvenient to switch to the 5 Ghz band to access streaming services, it is the greater number of channels, not just fewer users, that will improve network performance.",
  },
  {
    number: 25,
    type: "single",
    text: "A network administrator is configuring a RADIUS server connection on a Cisco 3500 series WLC. The configuration requires a shared secret password. What is the purpose for the shared secret password?",
    options: [
      "It is used by the RADIUS server to authenticate WLAN users.",
      "It is used to authenticate and encrypt user data on the WLAN.",
      "It is used to encrypt the messages between the WLC and the RADIUS server.",
      "It allows users to authenticate and access the WLAN.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 13.3.4\nThe RADIUS protocol uses security features to protect communications between the RADIUS server and clients. A shared secret is the password used between the WLC and the RADIUS server. It is not for end users.",
  },
  {
    number: 26,
    type: "multi",
    text: "Which three parameters would need to be changed if best practices are being implemented for a home wireless AP? (Choose three.)",
    choose: 3,
    options: [
      "wireless client operating system password",
      "antenna frequency",
      "wireless network password",
      "wireless beacon time",
      "AP password",
      "SSID",
    ],
    correct: [2, 4, 5],
    explanation:
      "Explanation: Topic 13.1.5\nAs soon as an AP is taken out of a box, the default device password, SSID, and security parameters (wireless network password) should be set. The frequency of a wireless antenna can be adjusted, but doing so is not required. The beacon time is not normally configured. The wireless client operating system password is not affected by the configuration of a home wireless network.",
  },
  {
    number: 27,
    type: "single",
    text: "Which access control component, implementation, or protocol is based upon usernames and passwords?",
    options: ["802.1X", "accounting", "authentication", "authorization"],
    correct: [2],
    explanation:
      "Explanation: Topic 10.2.3\nAuthentication is the AAA component that verifies the identity of users. It is based upon credentials such as usernames and passwords, which can be stored locally on the device or on a central server.",
  },
  {
    number: 28,
    type: "single",
    text: "Which type of wireless network is based on the 802.11 standard and a 2.4-GHz or 5-GHz radio frequency?",
    options: [
      "wireless metropolitan-area network",
      "wireless wide-area network",
      "wireless local-area network",
      "wireless personal-area network",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 12.1.4\nA wireless local-area network (WLAN) is based on the IEEE 802.11 standard and operates using a 2.4-GHz or 5-GHz radio frequency. WLANs are suitable for use in a home, office, or campus environment.",
  },
  {
    number: 29,
    type: "multi",
    text: "Which two Cisco solutions help prevent DHCP starvation attacks? (Choose two.)",
    choose: 2,
    options: [
      "DHCP Snooping",
      "IP Source Guard",
      "Dynamic ARP Inspection",
      "Port Security",
      "Web Security Appliance",
    ],
    correct: [0, 3],
    explanation:
      "Explanation: Topic 10.3.3\nCisco provides solutions to help mitigate Layer 2 attacks including these:\nIP Source Guard (IPSG) - prevents MAC and IP address spoofing attacks\nDynamic ARP Inspection (DAI) - prevents ARP spoofing and ARP poisoning attacks\nDHCP Snooping - prevents DHCP starvation and SHCP spoofing attacks\nPort Security - prevents many types of attacks including MAC table overflow attacks and DHCP starvation attacks\nWeb Security Appliance (WSA) is a mitigation technology for web-based threats.",
  },
  {
    number: 30,
    type: "multi",
    text: "What are three techniques for mitigating VLAN attacks? (Choose three.)",
    choose: 3,
    options: [
      "Enable trunking manually.",
      "Disable DTP.",
      "Enable Source Guard.",
      "Set the native VLAN to an unused VLAN.",
      "Use private VLANs.",
      "Enable BPDU guard.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Explanation: Topic 11.2.2\nMitigating a VLAN attack can be done by disabling Dynamic Trunking Protocol (DTP), manually setting ports to trunking mode, and by setting the native VLAN of trunk links to VLANs not in use.",
  },
  {
    number: 31,
    type: "single",
    text: "Refer to the exhibit. What can be determined about port security from the information that is shown?",
    exhibit: {
      src: "/images/modules-10-13/q31-exhibit.png",
      alt: "Exhibit for question 31: show port-security interface output",
      width: 453,
      height: 236,
    },
    options: [
      "The port has the maximum number of MAC addresses that is supported by a Layer 2 switch port which is configured for port security.",
      "The port has been shut down.",
      "The port violation mode is the default for any port that has port security enabled.",
      "The port has two attached devices.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.1.6\nThe Port Security line simply shows a state of Enabled if the switchport port-security command (with no options) has been entered for a particular switch port. If a port security violation had occurred, a different error message appears such as Secure-shutdown. The maximum number of MAC addresses supported is 50. The Maximum MAC Addresses line is used to show how many MAC addresses can be learned (2 in this case). The Sticky MAC Addresses line shows that only one device has been attached and learned automatically by the switch. This configuration could be used when a port is shared by two cubicle-sharing personnel who bring in separate laptops.",
  },
  {
    number: 32,
    type: "single",
    text: "A network administrator of a college is configuring the WLAN user authentication process. Wireless users are required to enter username and password credentials that will be verified by a server. Which server would provide such service?",
    options: ["AAA", "NAT", "RADIUS", "SNMP"],
    correct: [2],
    explanation:
      "Explanation: Topic 13.3.2\nRemote Authentication Dial-In User Service (RADIUS) is a protocol and server software that provides user-based authentication for an organization. When a WLAN is configured to use a RADIUS server, users will enter username and password credentials that are verified by the RADIUS server before allowing to the WLAN.",
  },
  {
    number: 33,
    type: "single",
    text: "A technician is troubleshooting a slow WLAN that consists of 802.11b and 802.11g devices. A new 802.11n/ac dual-band router has been deployed on the network to replace the old 802.11g router. What can the technician do to address the slow wireless speed?",
    options: [
      "Split the wireless traffic between the 802.11n 2.4 GHz band and the 5 GHz band.",
      "Update the firmware on the new router.",
      "Configure devices to use a different channel.",
      "Change the SSID.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 13.4.3\nSplitting the wireless traffic between the 802.11n 2.4 GHz band and the 5 GHz band will allow for the 802.11n to use the two bands as two separate wireless networks to help manage the traffic, thus improving wireless performance.",
  },
  {
    number: 34,
    type: "single",
    text: "The company handbook states that employees cannot have microwave ovens in their offices. Instead, all employees must use the microwave ovens located in the employee cafeteria. What wireless security risk is the company trying to avoid?",
    options: [
      "improperly configured devices",
      "rogue access points",
      "accidental interference",
      "interception of data",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 12.6.3\nDenial of service attacks can be the result of improperly configured devices which can disable the WLAN. Accidental interference from devices such as microwave ovens and cordless phones can impact both the security and performance of a WLAN. Man-in-the-middle attacks can allow an attacker to intercept data. Rogue access points can allow unauthorized users to access the wireless network.",
  },
  {
    number: 35,
    type: "single",
    text: "What is the function provided by CAPWAP protocol in a corporate wireless network?",
    options: [
      "CAPWAP creates a tunnel on Transmission Control Protocol (TCP) ports in order to allow a WLC to configure an autonomous access point.",
      "CAPWAP provides the encapsulation and forwarding of wireless user traffic between an access point and a wireless LAN controller.",
      "CAPWAP provides connectivity between an access point using IPv6 addressing and a wireless client using IPv4 addressing.",
      "CAPWAP provides the encryption of wireless user traffic between an access point and a wireless client.",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 12.4.2\nCAPWAP is an IEEE standard protocol that enables a WLC to manage multiple APs and WLANs. CAPWAP is also responsible for the encapsulation and forwarding of WLAN client traffic between an AP and a WLC.",
  },
  {
    number: 36,
    type: "single",
    text: "Open the PT Activity. Perform the tasks in the activity instructions and then answer the question.\nWhich event will take place if there is a port security violation on switch S1 interface Fa0/1?",
    exhibit: {
      src: "/images/modules-10-13/q36-exhibit.jpg",
      alt: "Exhibit for question 36: Packet Tracer activity topology",
      width: 524,
      height: 377,
    },
    options: [
      "A syslog message is logged.",
      "The interface will go into error-disabled state.",
      "Packets with unknown source addresses will be dropped.",
      "A notification is sent.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 11.1.6\nThe violation mode can be viewed by issuing the show port-security interface <int>command. Interface FastEthernet 0/1 is configured with the violation mode of protect. If there is a violation, interface FastEthernet 0/1 will drop packets with unknown MAC addresses.",
  },
  {
    number: 37,
    type: "pair",
    text: "Match each functional component of AAA with its description. (Not all options are used.)",
    exhibit: [
      {
        src: "/images/modules-10-13/q37-exhibit.jpg",
        alt: "Exhibit for question 37: AAA functional component matching board",
        width: 974,
        height: 559,
      },
      {
        src: "/images/modules-10-13/q37-exhibit-2.jpg",
        alt: "Exhibit for question 37: AAA functional component matching answer key",
        width: 1457,
        height: 367,
      },
    ],
    left: ["authentication", "authorization", "accounting"],
    right: [
      "determines what resources users can access or the operations they are allowed to perform",
      "calculates how much a user must pay for remote access to a device",
      "proves that users are who they say they are",
      "records what users do and what they access",
    ],
    correctPairs: { 0: 2, 1: 0, 2: 3 },
    explanation:
      "Explanation: Topic 10.2.2\nThe correct pairings are:\n- authentication → proves that users are who they say they are\n- authorization → determines what resources users can access or the operations they are allowed to perform\n- accounting → records what users do and what they access\nThe option \"calculates how much a user must pay for remote access to a device\" is not used.",
  },
  {
    number: 38,
    type: "multi",
    text: "What are two protocols that are used by AAA to authenticate users against a central database of usernames and password? (Choose two.)",
    choose: 2,
    options: ["SSH", "HTTPS", "TACACS+", "RADIUS", "CHAP", "NTP"],
    correct: [2, 3],
    explanation:
      "Explanation: Topic 10.2.3\nBy using TACACS+ or RADIUS, AAA can authenticate users from a database of usernames and passwords stored centrally on a server such as a Cisco ACS server.",
  },
  {
    number: 39,
    type: "single",
    text: "What is the result of a DHCP starvation attack?",
    options: [
      "The attacker provides incorrect DNS and default gateway information to clients.",
      "The IP addresses assigned to legitimate clients are hijacked.",
      "Clients receive IP address assignments from a rogue DHCP server.",
      "Legitimate clients are unable to lease IP addresses.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 10.5.5\nDCHP starvation attacks are launched by an attacker with the intent to create a DoS for DHCP clients. To accomplish this goal, the attacker uses a tool that sends many DHCPDISCOVER messages to lease the entire pool of available IP addresses, thus denying them to legitimate hosts.",
  },
  {
    number: 40,
    type: "single",
    text: "Which feature or configuration on a switch makes it vulnerable to VLAN double-tagging attacks?",
    options: [
      "the limited size of content-addressable memory space",
      "the automatic trunking port feature enabled for all ports by default",
      "the native VLAN of the trunking port being the same as a user VLAN",
      "mixed duplex mode enabled for all ports by default",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 10.5.3\nA double-tagging (or double-encapsulated) VLAN hopping attack takes advantage of the way that hardware on most switches operates. Most switches perform only one level of 802.1Q de-encapsulation, which allows an attacker to embed a hidden 802.1Q tag inside the frame. This tag allows the frame to be forwarded to a VLAN that the original 802.1Q tag did not specify. An important characteristic of the double-encapsulated VLAN hopping attack is that it works even if trunk ports are disabled, because a host typically sends a frame on a segment that is not a trunk link. This type of attack is unidirectional and works only when the attacker is connected to a port residing in the same VLAN as the native VLAN of the trunk port.",
  },
  {
    number: 41,
    type: "single",
    text: "Which component of AAA allows an administrator to track individuals who access network resources and any changes that are made to those resources?",
    options: ["authentication", "accounting", "accessibility", "authorization"],
    correct: [1],
    explanation:
      "Explanation: Topic 10.2.5\nOne of the components in AAA is accounting. After a user is authenticated through AAA, AAA servers keep a detailed log of exactly what actions the authenticated user takes on the device.",
  },
];