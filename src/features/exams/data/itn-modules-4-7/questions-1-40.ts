import type { Question } from "../../lib/types";

/** Modules 4 - 7 (Ethernet Concepts), questions 1-40. */
export const questions1to40: Question[] = [
  {
    number: 1,
    type: "single",
    text: "What is the purpose of the OSI physical layer?",
    options: [
      "controlling access to media",
      "transmitting bits across the local media",
      "performing error detection on received frames",
      "exchanging frames between nodes over physical network media",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 4.1.1\nThe physical layer encodes the frame's bits as signals and transmits them across the local media. Media access control and frame error detection belong to the data link layer.",
  },
  {
    number: 2,
    type: "single",
    text: "Why are two strands of fiber used for a single fiber optic connection?",
    options: [
      "The two strands allow the data to travel for longer distances without degrading.",
      "They prevent crosstalk from causing interference on the connection.",
      "They increase the speed at which the data can travel.",
      "They allow for full-duplex connectivity.",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 4.5.4\nA fiber-optic connection uses one strand to carry the transmitted signal and the other to carry the received signal, which is what allows full-duplex communication.",
  },
  {
    number: 3,
    type: "single",
    text: "Which characteristic describes crosstalk?",
    options: [
      "the distortion of the network signal from fluorescent lighting",
      "the distortion of the transmitted messages from signals carried in adjacent wires",
      "the weakening of the network signal over long cable lengths",
      "the loss of wireless signal over excessive distance from the access point",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 4.3.1\nCrosstalk is the distortion of the transmitted messages caused by signals carried in adjacent wires.",
  },
  {
    number: 4,
    type: "single",
    text: "Which procedure is used to reduce the effect of crosstalk in copper cables?",
    options: [
      "requiring proper grounding connections",
      "twisting opposing circuit wire pairs together",
      "wrapping the bundle of wires with metallic shielding",
      "designing a cable infrastructure to avoid crosstalk interference",
      "avoiding sharp bends during installation",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 4.3.1\nTwisting opposing circuit wire pairs together cancels much of the electromagnetic interference between them, which reduces crosstalk.",
  },
  {
    number: 5,
    type: "pair",
    text: "Match the situation with the appropriate use of network media.",
    left: [
      "horizontal cabling structure",
      "backbone cabling in an enterprise",
      "guest access in a coffee shop",
      "desktop PCs in offices in an enterprise",
      "long-haul networks",
      "waiting rooms in a hospital",
    ],
    right: ["Copper Cables", "Fiber optic", "Wireless"],
    correctPairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 0,
      4: 1,
      5: 2,
    },
    allowMultiMatch: true,
    explanation:
      "Explanation: Topic 4.3.3\nCopper Cables: horizontal cabling structure, desktop PCs in offices in an enterprise\nFiber optic: backbone cabling in an enterprise, long-haul networks\nWireless: guest access in a coffee shop, waiting rooms in a hospital",
    exhibit: {
      src: "/images/itn-modules-4-7/q5-exhibit.jpg",
      alt: "Exhibit for question 5: situations matched to copper, fiber-optic, and wireless media",
      width: 887,
      height: 870,
    },
  },
  {
    number: 6,
    type: "multi",
    choose: 3,
    text: "A network administrator is measuring the transfer of bits across the company backbone for a mission critical financial application. The administrator notices that the network throughput appears lower than the bandwidth expected. Which three factors could influence the differences in throughput? (Choose three.)",
    options: [
      "the amount of traffic that is currently crossing the network",
      "the sophistication of the encapsulation method applied to the data",
      "the type of traffic that is crossing the network",
      "the latency that is created by the number of network devices that the data is crossing",
      "the bandwidth of the WAN connection to the Internet",
      "the reliability of the gigabit Ethernet infrastructure of the backbone",
    ],
    correct: [0, 2, 3],
    explanation:
      "Explanation: Topic 4.2.6\nThroughput usually does not match the specified bandwidth of physical links due to multiple factors. These factors include, the amount of traffic, type of traffic, and latency created by the network devices the data has to cross.",
  },
  {
    number: 7,
    type: "multi",
    choose: 2,
    text: "What are two characteristics of fiber-optic cable? (Choose two.)",
    options: [
      "It is not affected by EMI or RFI.",
      "Each pair of cables is wrapped in metallic foil.",
      "It combines the technique of cancellation, shielding, and twisting to protect data.",
      "It typically contains 4 pairs of fiber-optic wires.",
      "It is more expensive than UTP cabling is.",
    ],
    correct: [0, 4],
    explanation:
      "Explanation: Topic 4.5.1\nFiber-optic cabling supports higher bandwidth than UTP for longer distances. Fiber is immune to EMI and RFI, but costs more, requires more skill to install, and requires more safety precautions.",
  },
  {
    number: 8,
    type: "single",
    text: "What is a primary role of the Physical layer in transmitting data on the network?",
    options: [
      "create the signals that represent the bits in each frame on to the media",
      "provide physical addressing to the devices",
      "determine the path packets take through the network",
      "control data access to the media",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 4.1.2\nThe OSI physical layer provides the means to transport the bits that make up a frame across the network media. This layer accepts a complete frame from the data link layer and encodes it as a series of signals that are transmitted to the local media.",
  },
  {
    number: 9,
    type: "single",
    text: "With the use of unshielded twisted-pair copper wire in a network, what causes crosstalk within the cable pairs?",
    options: [
      "the magnetic field around the adjacent pairs of wire",
      "the use of braided wire to shield the adjacent wire pairs",
      "the reflection of the electrical wave back from the far end of the cable",
      "the collision caused by two nodes trying to use the media simultaneously",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 4.3.1\nCrosstalk is a type of noise, or interference that occurs when signal transmission on one wire interferes with another wire. When current flows through a wire a magnetic field is produced. The produced magnetic field will interface the signal carried in the adjacent wire.",
  },
  {
    number: 10,
    type: "single",
    text: "Refer to the graphic. What type of cabling is shown?",
    exhibit: {
      src: "/images/itn-modules-4-7/q10-exhibit.jpg",
      alt: "Exhibit for question 10: a type of network cabling",
      width: 300,
      height: 234,
    },
    options: ["STP", "UTP", "coax", "fiber"],
    correct: [3],
    explanation:
      "Explanation: Topic 4.5.1\nNetwork cabling include different types of cables:\nUTP cable consists of four pairs of color-coded wires that have been twisted together and then encased in a flexible plastic sheath.\nSTP cable uses four pairs of wires, each wrapped in a foil shield, which are then wrapped in an overall metallic braid or foil.\nCoaxial cable uses a copper conductor and a layer of flexible plastic insulation surrounds the copper conductor.\nFiber cable is a flexible, extremely thin, transparent strand of glass surrounded by plastic insulation.",
  },
  {
    number: 11,
    type: "multi",
    choose: 2,
    text: "In addition to the cable length, what two factors could interfere with the communication carried over UTP cables? (Choose two.)",
    options: [
      "crosstalk",
      "bandwidth",
      "size of the network",
      "signal modulation technique",
      "electromagnetic interference",
    ],
    correct: [0, 4],
    explanation:
      "Explanation: Topic 4.3.1\nCopper media is widely used in network communications. However, copper media is limited by distance and signal interference. Data is transmitted on copper cables as electrical pulses. The electrical pulses are susceptible to interference from two sources:\nElectromagnetic interference (EMI) or radio frequency interference (RFI) - EMI and RFI signals can distort and corrupt the data signals being carried by copper media.\nCrosstalk - Crosstalk is a disturbance caused by the electric or magnetic fields of a signal on one wire interfering with the signal in an adjacent wire.",
  },
  {
    number: 12,
    type: "single",
    text: "Refer to the graphic. What type of cabling is shown?",
    exhibit: {
      src: "/images/itn-modules-4-7/q12-exhibit.jpg",
      alt: "Exhibit for question 12: a type of network cabling",
      width: 301,
      height: 232,
    },
    options: ["STP", "UTP", "coax", "fiber"],
    correct: [1],
    explanation:
      "Explanation: Topic 4.3.3\nNetwork cabling include different types of cables:\nUTP cable consists of four pairs of color-coded wires that have been twisted together and then encased in a flexible plastic sheath.\nSTP cable uses four pairs of wires, each wrapped in a foil shield, which are then wrapped in an overall metallic braid or foil.\nCoaxial cable uses a copper conductor and a layer of flexible plastic insulation surrounds the copper conductor.\nFiber cable is a flexible, extremely thin, transparent strand of glass surrounded by plastic insulation",
  },
  {
    number: 13,
    type: "multi",
    choose: 2,
    text: "Which two devices commonly affect wireless networks? (Choose two.)",
    options: [
      "Blu-ray players",
      "home theaters",
      "cordless phones",
      "microwaves",
      "incandescent light bulbs",
      "external hard drives",
    ],
    correct: [2, 3],
    explanation:
      "Explanation: Topic 4.6.1\nRadio Frequency Interference (RFI) is the interference that is caused by radio transmitters and other devices that are transmitting in the same frequency.",
  },
  {
    number: 14,
    type: "multi",
    choose: 2,
    text: "Which two statements describe the services provided by the data link layer? (Choose two.)",
    options: [
      "It defines the end-to-end delivery addressing scheme.",
      "It maintains the path between the source and destination devices during the data transmission.",
      "It manages the access of frames to the network media.",
      "It provides reliable delivery through link establishment and flow control.",
      "It ensures that application data will be transmitted according to the prioritization.",
      "It packages various Layer 3 PDUs into a frame format that is compatible with the network interface.",
    ],
    correct: [2, 5],
    explanation:
      "Explanation: Topic 6.1.1\nThe data link layer is divided into two sub layers, namely Logical Link Control (LLC) and Media Access Control (MAC). LLC forms a frame from the network layer PDU into a format that conforms to the requirements of the network interface and media. A network layer PDU might be for IPv4 or IPv6. The MAC sub layer defines the media access processes performed by the hardware. It manages the frame access to the network media according to the physical signaling requirements (copper cable, fiber optic, wireless, etc.)",
  },
  {
    number: 15,
    type: "single",
    text: "What is the function of the CRC value that is found in the FCS field of a frame?",
    options: [
      "to verify the integrity of the received frame",
      "to verify the physical address in the frame",
      "to verify the logical address in the frame",
      "to compute the checksum header for the data field in the frame",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 6.3.2\nThe CRC value in the FCS field of the received frame is compared to the computed CRC value of that frame, in order to verify the integrity of the frame. If the two values do not match, then the frame is discarded.",
  },
  {
    number: 16,
    type: "single",
    text: "What is contained in the trailer of a data-link frame?",
    options: ["logical address", "physical address", "data", "error detection"],
    correct: [3],
    explanation:
      'Explanation: Topic 6.3.2\nThe trailer in a data-link frame contains error detection information that is pertinent to the frame included in the FCS field. The header contains control information, such as the addressing, while the area that is indicated by the word "data" includes the data, transport layer PDU, and the IP header.',
  },
  {
    number: 17,
    type: "single",
    text: "Which statement describes a characteristic of the frame header fields of the data link layer?",
    options: [
      "They all include the flow control and logical connection fields.",
      "Ethernet frame header fields contain Layer 3 source and destination addresses.",
      "They vary depending on protocols.",
      "They include information on user applications.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 6.3.2\nAll data link layer protocols encapsulate the Layer 3 PDU within the data field of the frame. However, the structure of the frame and the fields that are contained in the header vary according to the protocol. Different data link layer protocols may use different fields, like priority/quality of service, logical connection control, physical link control, flow control, and congestion control.",
  },
  {
    number: 18,
    type: "single",
    text: "A network team is comparing physical WAN topologies for connecting remote sites to a headquarters building. Which topology provides high availability and connects some, but not all, remote sites?",
    options: ["mesh", "partial mesh", "hub and spoke", "point-to-point"],
    correct: [1],
    explanation:
      "Explanation: Topic 6.2.2\nPartial mesh topologies provide high availability by interconnecting multiple remote sites, but do not require a connection between all remote sites. A mesh topology requires point-to-point links with every system being connected to every other system. A point-to-point topology is where each device is connected to one other device. A hub and spoke uses a central device in a star topology that connects to other point-to-point devices.",
  },
  {
    number: 19,
    type: "multi",
    choose: 2,
    text: "Which two fields or features does Ethernet examine to determine if a received frame is passed to the data link layer or discarded by the NIC? (Choose two.)",
    options: [
      "auto-MDIX",
      "CEF",
      "Frame Check Sequence",
      "minimum frame size",
      "source MAC address",
    ],
    correct: [2, 3],
    explanation:
      "Explanation: Topic 7.1.4\nAn Ethernet frame is not processed and is discarded if it is smaller than the minimum (64 bytes) or if the calculated frame check sequence (FCS) value does not match the received FCS value. Auto-MDIX (automatic medium-dependent interface crossover) is Layer 1 technology that detects cable straight-through or crossover types. The source MAC address is not used to determine how the frame is received. CEF (Cisco Express Forwarding) is a technology used to expedite Layer 3 switching.",
  },
  {
    number: 20,
    type: "single",
    text: "Which media communication type does not require media arbitration in the data link layer?",
    options: [
      "deterministic",
      "half-duplex",
      "full-duplex",
      "controlled access",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 6.2.5\nHalf-duplex communication occurs when both devices can both transmit and receive on the medium but cannot do so simultaneously. Full-duplex communication occurs when both devices can transmit and receive on the medium at the same time and therefore does not require media arbitration. Half-duplex communication is typically contention-based, whereas controlled (deterministic) access is applied in technologies where devices take turns to access the medium.",
  },
  {
    number: 21,
    type: "single",
    text: "Which statement describes an extended star topology?",
    options: [
      "End devices connect to a central intermediate device, which in turn connects to other central intermediate devices.",
      "End devices are connected together by a bus and each bus connects to a central intermediate device.",
      "Each end system is connected to its respective neighbor via an intermediate device.",
      "All end and intermediate devices are connected in a chain to each other.",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 6.2.4\nIn an extended star topology, central intermediate devices interconnect other star topologies.",
  },
  {
    number: 22,
    type: "single",
    text: "What is a characteristic of the LLC sublayer?",
    options: [
      "It provides the logical addressing required that identifies the device.",
      "It provides delimitation of data according to the physical signaling requirements of the medium.",
      "It places information in the frame allowing multiple Layer 3 protocols to use the same network interface and media.",
      "It defines software processes that provide services to the physical layer.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 6.1.2\nThe Logical Link Control (LLC) defines the software processes that provide services to the network layer protocols. The information is placed by LLC in the frame and identifies which network layer protocol is being used for the frame. This information allows multiple Layer 3 protocols, such as IPv4 and IPv6, to utilize the same network interface and media.",
  },
  {
    number: 23,
    type: "multi",
    choose: 3,
    text: "What are three ways that media access control is used in networking? (Choose three.)",
    options: [
      "Ethernet utilizes CSMA/CD.",
      "Media access control provides placement of data frames onto the media.",
      "Contention-based access is also known as deterministic.",
      "802.11 utilizes CSMA/CD.",
      "Data link layer protocols define the rules for access to different media.",
      "Networks with controlled access have reduced performance due to data collisions.",
    ],
    correct: [0, 1, 4],
    explanation:
      "Explanation: Topic 6.2.7\nWired Ethernet networks use CSMA/CD for media access control. IEEE 802.11 wireless networks use CSMA/CA, a similar method. Media access control defines the way data frames get placed on the media. The controlled access method is deterministic, not a contention-based access to networks. Because each device has its own time to use the medium, controlled access networks such as legacy Token Ring do not have collisions.",
  },
  {
    number: 24,
    type: "single",
    text: "During the encapsulation process, what occurs at the data link layer for a PC connected to an Ethernet network?",
    options: [
      "An IP address is added.",
      "The logical address is added.",
      "The physical address is added.",
      "The process port number is added.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 6.3.3\nThe Ethernet frame includes the source and destination physical address. The trailer includes a CRC value in the Frame Check Sequence field to allow the receiving device to determine if the frame has been changed (has errors) during the transmission.",
  },
  {
    number: 25,
    type: "multi",
    choose: 3,
    text: "What three items are contained in an Ethernet header and trailer? (Choose three.)",
    options: [
      "source IP address",
      "source MAC address",
      "destination IP address",
      "destination MAC address",
      "error-checking information",
    ],
    correct: [1, 3, 4],
    explanation:
      "Explanation: Topic 6.3.2\nLayer 2 headers contain the following:\nFrame start and stop indicator flags at the beginning and end of a frame\nAddressing - for Ethernet networks this part of the header contains source and destination MAC addresses\nType field to indicate what Layer 3 protocol is being used\nError detection to determine if the frame arrived without error",
  },
  {
    number: 26,
    type: "single",
    text: "What type of communication rule would best describe CSMA/CD?",
    options: [
      "access method",
      "flow control",
      "message encapsulation",
      "message encoding",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 6.2.6\nCarrier sense multiple access collision detection (CSMA/CD) is the access method used with Ethernet. The access method rule of communication dictates how a network device is able to place a signal on the carrier. CSMA/CD dictates those rules on an Ethernet network and CSMA/CA dictates those rules on an 802.11 wireless LAN.",
  },
  {
    number: 27,
    type: "multi",
    choose: 3,
    text: "Which three basic parts are common to all frame types supported by the data link layer? (Choose three.)",
    options: [
      "header",
      "type field",
      "MTU size",
      "data",
      "trailer",
      "CRC value",
    ],
    correct: [0, 3, 4],
    explanation:
      "Explanation: Topic 6.3.1\nThe data link protocol is responsible for NIC-to-NIC communications within the same network. Although there are many different data link layer protocols that describe data link layer frames, each frame type has three basic parts:\nHeader\nData\nTrailer",
  },
  {
    number: 28,
    type: "single",
    text: "Which statement is true about the CSMA/CD access method that is used in Ethernet?",
    options: [
      "When a device hears a carrier signal and transmits, a collision cannot occur.",
      "A jamming signal causes only devices that caused the collision to execute a backoff algorithm.",
      "All network devices must listen before transmitting.",
      "Devices involved in a collision get priority to transmit after the backoff period.",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 6.2.7\nLegacy bus-topology Ethernet LAN uses CSMA/CD as network media access control protocol. It works by detecting a collision in the medium and backing off (after transmitting a jam signal) as necessary. When one host wants to transmit a frame, it listens on the medium to check if the medium is busy. After it senses that no one else is transmitting, the host starts transmitting the frame, it also monitors the current level to detect a collision. If it detects a collision, it transmits a special jam signal so that all other hosts can know there was a collision. The other host will receive this jam signal and stop transmitting. After this, both hosts enter an exponential backoff phase and retry transmission.",
  },
  {
    number: 29,
    type: "single",
    text: "What is the auto-MDIX feature on a switch?",
    options: [
      "the automatic configuration of an interface for 10/100/1000 Mb/s operation",
      "the automatic configuration of an interface for a straight-through or a crossover Ethernet cable connection",
      "the automatic configuration of full-duplex operation over a single Ethernet copper or optical cable",
      "the ability to turn a switch interface on or off accordingly if an active connection is detected",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 7.4.5\nThe auto-MDIX enables a switch to use a crossover or a straight-through Ethernet cable to connect to a device regardless of the device on the other end of the connection.",
  },
  {
    number: 30,
    type: "single",
    text: "Refer to the exhibit. What is the destination MAC address of the Ethernet frame as it leaves the web server if the final destination is PC1?",
    exhibit: {
      src: "/images/itn-modules-4-7/q30-exhibit.png",
      alt: "Exhibit for question 30: a PC sending a frame to a web server through a switch and router",
      width: 610,
      height: 355,
    },
    options: [
      "00-60-2F-3A-07-AA",
      "00-60-2F-3A-07-BB",
      "00-60-2F-3A-07-CC",
      "00-60-2F-3A-07-DD",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 7.3.5\nThe destination MAC address is used for local delivery of Ethernet frames. The MAC (Layer 2) address changes at each network segment along the path. As the frame leaves the web server, it will be delivered by using the MAC address of the default gateway.",
  },
  {
    number: 31,
    type: "single",
    text: "A Layer 2 switch is used to switch incoming frames from a 1000BASE-T port to a port connected to a 100Base-T network. Which method of memory buffering would work best for this task?",
    options: [
      "port-based buffering",
      "level 1 cache buffering",
      "shared memory buffering",
      "fixed configuration buffering",
    ],
    correct: [2],
    explanation:
      "Explanation: Topic 7.4.3\nWith shared memory buffering, the number of frames stored in the buffer is restricted only by the of the entire memory buffer and not limited to a single port buffer. This permits larger frames to be transmitted with fewer dropped frames. This is important to asymmetric switching, which applies to this scenario, where frames are being exchanged between ports of different rates. With port-based memory buffering, frames are stored in queues that are linked to specific incoming and outgoing ports making it possible for a single frame to delay the transmission of all the frames in memory because of a busy destination port. Level 1 cache is memory used in a CPU. Fixed configuration refers to the port arrangement in switch hardware.",
  },
  {
    number: 32,
    type: "multi",
    choose: 2,
    text: "What are two examples of the cut-through switching method? (Choose two.)",
    options: [
      "store-and-forward switching",
      "fast-forward switching",
      "CRC switching",
      "fragment-free switching",
      "QOS switching",
    ],
    correct: [1, 3],
    explanation:
      "Explanation: Topic 7.4.2\nStore-and forward switching accepts the entire frame and performs error checking using CRC before forwarding the frame. Store-and-forward is often required for QOS analysis. Fast-forward and fragment-free are both variations of the cut-through switching method where only part of the frame is received before the switch begins to forward it.",
  },
  {
    number: 33,
    type: "single",
    text: "Which frame forwarding method receives the entire frame and performs a CRC check to detect errors before forwarding the frame?",
    options: [
      "cut-through switching",
      "store-and-forward switching",
      "fragment-free switching",
      "fast-forward switching",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 7.4.1\nFast-forward and fragment-free switching are variations of cut-through switching, which begins to forward the frame before the entire frame is received.",
  },
  {
    number: 34,
    type: "single",
    text: "What is the purpose of the FCS field in a frame?",
    options: [
      "to obtain the MAC address of the sending node",
      "to verify the logical address of the sending node",
      "to compute the CRC header for the data field",
      "to determine if errors occurred in the transmission and reception",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 7.1.4\nThe FCS field in a frame is used to detect any errors in the transmission and receipt of a frame. This is done by comparing the CRC value within the frame against a computed CRC value of the frame. If the two values do not match, then the frame is discarded.",
  },
  {
    number: 35,
    type: "single",
    text: "Which switching method has the lowest level of latency?",
    options: [
      "cut-through",
      "store-and-forward",
      "fragment-free",
      "fast-forward",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 7.4.2\nFast-forward switching begins to forward a frame after reading the destination MAC address, resulting in the lowest latency. Fragment-free reads the first 64 bytes before forwarding. Store-and-forward has the highest latency because it reads the entire frame before beginning to forward it. Both fragment-free and fast-forward are types of cut-through switching.",
  },
  {
    number: 36,
    type: "multi",
    choose: 3,
    text: "A network administrator is connecting two modern switches using a straight-through cable. The switches are new and have never been configured. Which three statements are correct about the final result of the connection? (Choose three.)",
    options: [
      "The link between the switches will work at the fastest speed that is supported by both switches.",
      "The link between switches will work as full-duplex.",
      "If both switches support different speeds, they will each work at their own fastest speed.",
      "The auto-MDIX feature will configure the interfaces eliminating the need for a crossover cable.",
      "The connection will not be possible unless the administrator changes the cable to a crossover cable.",
      "The duplex capability has to be manually configured because it cannot be negotiated.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Explanation: Topic 7.4.4\nModern switches can negotiate to work in full-duplex mode if both switches are capable. They will negotiate to work using the fastest possible speed and the auto-MDIX feature is enabled by default, so a cable change is not needed.",
  },
  {
    number: 37,
    type: "single",
    text: "Which advantage does the store-and-forward switching method have compared with the cut-through switching method?",
    options: [
      "collision detecting",
      "frame error checking",
      "faster frame forwarding",
      "frame forwarding using IPv4 Layer 3 and 4 information",
    ],
    correct: [1],
    explanation:
      "Explanation: Topic 7.4.1\nA switch using the store-and-forward switching method performs an error check on an incoming frame by comparing the FCS value against its own FCS calculations after the entire frame is received. In comparison, a switch using the cut-through switching method makes quick forwarding decisions and starts the forwarding process without waiting for the entire frame to be received. Thus a switch using cut-through switching may send invalid frames to the network. The performance of store-and-forward switching is slower compared to cut-through switching performance. Collision detection is monitored by the sending device. Store-and-forward switching does not use IPv4 Layer 3 and 4 information for its forwarding decisions.",
  },
  {
    number: 38,
    type: "single",
    text: "When the store-and-forward method of switching is in use, what part of the Ethernet frame is used to perform an error check?",
    options: [
      "CRC in the trailer",
      "source MAC address in the header",
      "destination MAC address in the header",
      "protocol type in the header",
    ],
    correct: [0],
    explanation:
      "Explanation: Topic 7.4.1\nThe cyclic redundancy check (CRC) part of the trailer is used to determine if the frame has been modified during transit. If the integrity of the frame is verified, the frame is forwarded. If the integrity of the frame cannot be verified, then the frame is dropped.",
  },
  {
    number: 39,
    type: "single",
    text: "Which switching method uses the CRC value in a frame?",
    options: [
      "cut-through",
      "fast-forward",
      "fragment-free",
      "store-and-forward",
    ],
    correct: [3],
    explanation:
      "Explanation: Topic 7.4.1\nWhen the store-and-forward switching method is used, the switch receives the complete frame before forwarding it on to the destination. The cyclic redundancy check (CRC) part of the trailer is used to determine if the frame has been modified during transit. In contrast, a cut-through switch forwards the frame once the destination Layer 2 address is read. Two types of cut-through switching methods are fast-forward and fragment-free.",
  },
  {
    number: 40,
    type: "multi",
    choose: 2,
    text: "What are two actions performed by a Cisco switch? (Choose two.)",
    options: [
      "building a routing table that is based on the first IP address in the frame header",
      "using the source MAC addresses of frames to build and maintain a MAC address table",
      "forwarding frames with unknown destination IP addresses to the default gateway",
      "utilizing the MAC address table to forward frames via the destination MAC address",
      "examining the destination MAC address to add new entries to the MAC address table",
    ],
    correct: [1, 3],
    explanation:
      "Explanation: Topic 7.3.2\nImportant actions that a switch performs are as follows:\nWhen a frame comes in, the switch examines the Layer 2 source address to build and maintain the Layer 2 MAC address table.\nIt examines the Layer 2 destination address to determine how to forward the frame. When the destination address is in the MAC address table, then the frame is sent out a particular port. When the address is unknown, the frame is sent to all ports that have devices connected to that network.",
  },
];
