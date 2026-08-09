import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const mockLogs: Record<string, { title: string, desc: string }> = {
  "2026-06-17": {
    title: "Introductory Class & Orientation",
    desc: "Introduction to the PM VIKAS scheme, general orientation, and an overview of the program curriculum across all five modules."
  },
  "2026-06-18": {
    "title": "Week 1: Electronics - Introduction & History",
    "desc": "Began the program with the history of electronics, covering the evolution from vacuum tubes to transistors and integrated circuits (ICs)."
  },
  "2026-06-19": {
    "title": "Week 1: Electronics - Active & Passive Components",
    "desc": "Detailed study of active and passive components. Explored resistors, capacitors, inductors, diodes, and transistors, including their properties and real-world applications."
  },
  "2026-06-22": {
    "title": "Week 1: Electronics - Component Analysis & Color Coding",
    "desc": "Practical session on resistor color coding (Multiplier, Tolerance like Gold ±5%, Silver). Discussed semiconductor physics, Silicon atomic structure, and PN Junction Diodes (Forward and Reverse Bias)."
  },
  "2026-06-23": {
    "title": "Week 1: Electronics - Logic Gates & Network Circuits",
    "desc": "Introduction to digital electronics. Covered basic logic gates (AND, OR, NOT) and Universal Gates (NAND, NOR). Analyzed network logic circuit complexity and cost."
  },
  "2026-06-24": {
    "title": "Week 1: Electronics - Boolean Algebra & Theorems",
    "desc": "Deep dive into Boolean Algebra axioms (Commutative, Associative, Distributive) and De Morgan's Theorems. Simplified logic expressions using algebraic methods."
  },
  "2026-06-25": {
    "title": "Week 1: Electronics - SOP & Logic Representation",
    "desc": "Studied Sum of Products (SOP) form, Minterms, and Maxterms. Practiced synthesizing processes based on truth tables to draw logic diagrams."
  },
  "2026-06-26": {
    "title": "Week 1: Electronics - Karnaugh Maps (K-Maps)",
    "desc": "Advanced logic simplification using Karnaugh Maps (2-variable and 4-variable). Covered Don't Care conditions in logic gates to achieve minimal cost realizations."
  },
  "2026-06-29": {
    "title": "Week 2: Embedded Systems - Sequential Logic",
    "desc": "Transitioned to embedded systems by designing Sequential Logic Circuits. Explored Latches, Edge-Triggered Flip-Flops (SR, JK, D), and Registers."
  },
  "2026-06-30": {
    "title": "Week 2: Embedded Systems - Combinational Circuits",
    "desc": "Designed and analyzed Combinational Circuits including Half Adders, Full Adders, Half Subtractors, and Full Subtractors."
  },
  "2026-07-01": {
    "title": "Week 2: Embedded Systems - Multiplexers & Encoders",
    "desc": "Continued with Combinational Logic: Multiplexers, Demultiplexers, Encoders, and Decoders. Discussed Synchronous vs. Asynchronous Sequential Circuits."
  },
  "2026-07-02": {
    "title": "Week 2: Embedded Systems - Microprocessor Architecture",
    "desc": "Introduction to Microprocessors. Covered the architecture of the 8085 microprocessor, memory interfacing, and basic 8085 instructions."
  },
  "2026-07-03": {
    "title": "Week 2: Embedded Systems - Microcontrollers (8051 vs ARM)",
    "desc": "Compared microcontroller architectures: 8051 (16-bit) vs ARM (32-bit). Discussed data transfer ports, address matching, and peripheral devices."
  },
  "2026-07-06": {
    "title": "Week 2: Embedded Systems - Instruction Sets & Programming",
    "desc": "Explored machine control, branch, logic, and arithmetic instructions for microprocessors. Discussed Opcode and Operand structures."
  },
  "2026-07-07": {
    "title": "Week 2: Embedded Systems - Arduino Platform",
    "desc": "Introduction to Arduino. Discussed Arduino architecture, IDE setup, and wrote basic programs to interface with external LEDs and switches."
  },
  "2026-07-08": {
    "title": "Week 3: Computer Networking - Fundamentals",
    "desc": "Started Computer Networking module. Covered basic network topologies, transmission media, and the OSI Reference Model."
  },
  "2026-07-09": {
    "title": "Week 3: Computer Networking - Network Types",
    "desc": "Detailed discussion on Personal Area Networks (PAN), Local Area Networks (LAN), and Wide Area Networks (WAN). Explored networking hardware (Routers, Switches)."
  },
  "2026-07-10": {
    "title": "Week 3: Computer Networking - TCP/IP Protocol Suite",
    "desc": "Deep dive into the TCP/IP protocol suite. Discussed IP addressing (IPv4 vs IPv6), subnetting, and routing principles."
  },
  "2026-07-13": {
    "title": "Week 3: Computer Networking - Transport Layer",
    "desc": "Analyzed Transport Layer protocols: TCP and UDP. Discussed connection-oriented vs connectionless communication, ports, and sockets."
  },
  "2026-07-14": {
    "title": "Week 3: Computer Networking - Application Layer",
    "desc": "Explored Application Layer protocols including HTTP, HTTPS, FTP, and DNS. Discussed client-server architectures and peer-to-peer networks."
  },
  "2026-07-15": {
    "title": "Week 3: Computer Networking - Network Security",
    "desc": "Introduction to network security. Covered basic cryptography, firewalls, VPNs, and common network vulnerabilities and attacks."
  },
  "2026-07-16": {
    "title": "Industry Institution Interactive Meet (BOAT)",
    "desc": "Participated in an Industry Institution Interactive Meet to discuss real-world engineering challenges, industry expectations, and collaborative opportunities."
  },
  "2026-07-17": {
    "title": "Week 4: Cloud Computing - Introduction",
    "desc": "Began Cloud Computing module. Discussed the evolution of cloud technology, virtualization concepts, and hypervisors."
  },
  "2026-07-20": {
    "title": "Week 4: Cloud Computing - Service Models",
    "desc": "Detailed analysis of Cloud Service Models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS)."
  },
  "2026-07-21": {
    "title": "Week 4: Cloud Computing - Deployment Models",
    "desc": "Explored Cloud Deployment Models: Public, Private, Hybrid, and Community clouds. Discussed use cases and security implications for each."
  },
  "2026-07-22": {
    "title": "Week 4: Cloud Computing - Major Cloud Providers",
    "desc": "Overview of major cloud service providers (AWS, Microsoft Azure, Google Cloud). Discussed core compute, storage, and networking services."
  },
  "2026-07-23": {
    "title": "Week 4: Cloud Computing - Cloud Storage & Databases",
    "desc": "Deep dive into cloud storage solutions (Object, Block, File storage) and managed databases (Relational and NoSQL) in the cloud."
  },
  "2026-07-24": {
    "title": "Week 4: Cloud Computing - Cloud Security & Architecture",
    "desc": "Discussed cloud security best practices, Identity and Access Management (IAM), and designing highly available, fault-tolerant architectures."
  },
  "2026-07-27": {
    "title": "Week 5: IoT - Basic Building Blocks",
    "desc": "Started Internet of Things (IoT) module. Explored the basic building blocks of IoT: Sensors, Networks, Processors, and Actuators."
  },
  "2026-07-28": {
    "title": "Week 5: IoT - Subsets of IoT Domain",
    "desc": "Discussed various subsets of the IoT Domain: Industrial IoT (IIoT), Consumer IoT (CIoT), Social IoT (SIoT), and Semantic IoT. Introduced Industry 4.0 concepts."
  },
  "2026-07-29": {
    "title": "Week 5: IoT - Classes and Types of Sensors",
    "desc": "Detailed study of sensor classification (Analog/Digital, Scalar/Vector). Explored various sensor types: Light, Touch, Humidity, Temperature, Force, and Ultrasonic."
  },
  "2026-07-30": {
    "title": "Week 5: IoT - Sensor Applications & Case Studies",
    "desc": "Analyzed real-world sensor applications. Discussed solving problems like automated waste classification and detecting cracks to prevent railway accidents."
  },
  "2026-07-31": {
    "title": "Week 5: IoT - IoT Network Protocols",
    "desc": "Explored communication protocols specific to IoT, including MQTT, CoAP, Zigbee, and Bluetooth Low Energy (BLE)."
  },
  "2026-08-03": {
    "title": "Week 5: IoT - Cloud Integration & Edge Computing",
    "desc": "Discussed integrating IoT devices with cloud platforms for data analytics. Introduced Edge Computing to process data closer to the source."
  },
  "2026-08-04": {
    "title": "Week 5: IoT - Arduino IoT Projects",
    "desc": "Hands-on session using Arduino to build a basic IoT node. Interfaced temperature and humidity sensors and transmitted data via serial communication."
  },
  "2026-08-05": {
    "title": "Week 5: IoT - Advanced IoT Interfacing",
    "desc": "Continued project work. Added actuators (relays, motors) to the IoT system to take physical actions based on sensor data thresholds."
  },
  "2026-08-06": {
    "title": "Week 5: IoT - System Testing & Troubleshooting",
    "desc": "Final testing and troubleshooting of the assembled IoT systems. Discussed common points of failure in hardware and network connections."
  },
  "2026-08-07": {
    "title": "Project Presentation",
    "desc": "Final day of the program. Presented the completed internship projects, demonstrating the integration of embedded systems, networking, cloud, and IoT concepts."
  }
};

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Convert to Mon=0, Sun=6
};

export default function PMVikasLog() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // Start at June 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    if (year === 2026 && month > 5) {
      setCurrentDate(new Date(year, month - 1, 1));
    }
  };

  const handleNextMonth = () => {
    if (year === 2026 && month < 7) {
      setCurrentDate(new Date(year, month + 1, 1));
    }
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const renderCalendarDays = () => {
    const days = [];

    // Empty slots for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayOfWeek = (firstDay + day - 1) % 7; // 0 = Mon, 6 = Sun

      const isSunday = dayOfWeek === 6;

      // Calculate if date is before Jun 17 or after Aug 7
      let isOutOfRange = false;
      if (month === 5 && day < 17) isOutOfRange = true; // June before 17
      if (month === 7 && day > 7) isOutOfRange = true; // Aug after 7

      const isDisabled = isSunday || isOutOfRange;
      const isSelected = selectedDate === dateStr;
      const hasLog = !!mockLogs[dateStr] && !isDisabled;

      days.push(
        <div
          key={day}
          onClick={() => !isDisabled && setSelectedDate(dateStr)}
          className={`calendar-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${hasLog ? 'has-log' : ''}`}
          style={{
            aspectRatio: '1 / 1',
            background: isSelected ? 'rgba(59, 130, 246, 0.2)' : (isDisabled ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.04)'),
            border: isSelected ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.05)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '0.5rem',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            position: 'relative',
            opacity: isDisabled ? 0.3 : 1
          }}
          onMouseOver={(e) => {
            if (!isDisabled && !isSelected) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }
          }}
          onMouseOut={(e) => {
            if (!isDisabled && !isSelected) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }
          }}
        >
          <span style={{
            fontWeight: '600',
            color: isDisabled ? 'var(--text-muted)' : (isSelected ? 'var(--accent)' : 'white'),
            textDecoration: isDisabled ? 'line-through' : 'none'
          }}>
            {day}
          </span>
          {hasLog && (
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', boxShadow: '0 0 5px var(--accent)' }}></div>
          )}
        </div>
      );
    }
    return days;
  };

  const selectedLog = selectedDate ? mockLogs[selectedDate] : null;

  let displayDate = "";
  if (selectedDate) {
    const [y, m, d] = selectedDate.split('-');
    displayDate = new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  return (
    <div id="pm-log" style={{ paddingTop: '100px', paddingBottom: '0', position: 'relative' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Daily activity log</h2>
      <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
        Click on an active date to view the daily activity log.
      </p>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Left Side: Calendar */}
        <div className="glass-panel" style={{ flex: '1 1 450px', padding: '1.5rem 2rem', position: 'relative' }}>

          {/* Calendar Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <button
              onClick={handlePrevMonth}
              disabled={month <= 5}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.4rem', color: month <= 5 ? 'rgba(255,255,255,0.2)' : 'white', cursor: month <= 5 ? 'not-allowed' : 'pointer' }}
            >
              <ChevronLeft size={20} />
            </button>

            <h3 style={{ fontSize: '1.3rem', margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CalendarIcon size={20} color="var(--accent)" />
              {monthNames[month]} {year}
            </h3>

            <button
              onClick={handleNextMonth}
              disabled={month >= 7}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.4rem', color: month >= 7 ? 'rgba(255,255,255,0.2)' : 'white', cursor: month >= 7 ? 'not-allowed' : 'pointer' }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Days of Week Header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.4rem', marginBottom: '0.8rem', textAlign: 'center', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.8rem' }}>
            <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.4rem' }}>
            {renderCalendarDays()}
          </div>

        </div>

        {/* Right Side: Log Details */}
        <div className="glass-panel" style={{ flex: '1 1 450px', padding: '2.5rem', minHeight: '430px', position: 'relative', borderTop: '4px solid var(--accent)' }}>
          {selectedDate ? (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <CalendarIcon color="var(--accent)" size={32} />
                <h3 style={{ margin: 0, fontSize: '1.6rem', color: 'white' }}>{displayDate}</h3>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                {selectedLog ? (
                  <>
                    <h4 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1.5rem', fontWeight: '600' }}>{selectedLog.title}</h4>
                    <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                      <p style={{ fontSize: '1.15rem', lineHeight: '1.9', color: 'var(--text-muted)', letterSpacing: '0.3px' }}>
                        {selectedLog.desc}
                      </p>
                    </div>

                    {/* Progress Tracker to fill space beautifully */}
                    <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
                        Program Timeline Progress
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${((Object.keys(mockLogs).sort().indexOf(selectedDate) + 1) / Object.keys(mockLogs).length) * 100}%`,
                          height: '100%',
                          background: 'var(--accent)',
                          borderRadius: '3px',
                          transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
                        }}></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <span>Day {Object.keys(mockLogs).sort().indexOf(selectedDate) + 1} of {Object.keys(mockLogs).length}</span>
                        <span style={{ color: 'var(--accent)', fontWeight: '600' }}>
                          {Math.round(((Object.keys(mockLogs).sort().indexOf(selectedDate) + 1) / Object.keys(mockLogs).length) * 100)}% Complete
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ padding: '2rem 0', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>No notable activities recorded on this date.</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Check for dates with a blue dot indicator.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', textAlign: 'center', opacity: 0.6, animation: 'fadeIn 0.3s ease-out' }}>
              <CalendarIcon size={64} color="var(--text-muted)" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>No Date Selected</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Click on a date in the calendar to view the daily activity log.</p>
            </div>
          )}
        </div>

      </div>

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
