import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import {
  capabilities,
  workflowSteps,
  troubleshootItems,
  terminalSequence,
  stats,
  type TerminalLine,
} from './data'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function App() {
  const [activeSection, setActiveSection] = useState('overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [openTsCard, setOpenTsCard] = useState<number | null>(0)
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([])
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'terminal', label: 'Terminal Demo' },
  ]

  // Track visitor
  useEffect(() => {
    async function trackVisit() {
      try {
        await supabase.from('visitor_log').insert({
          visited_at: new Date().toISOString(),
          page: 'mainframe-app',
        })
        const { count } = await supabase
          .from('visitor_log')
          .select('*', { count: 'exact', head: true })
        if (count !== null) {
          setVisitorCount(count)
        }
      } catch {
        // silently fail - tracking is non-critical
      }
    }
    trackVisit()
  }, [])

  // Terminal animation
  useEffect(() => {
    let idx = 0
    const interval = setInterval(() => {
      if (idx >= terminalSequence.length) {
        setTerminalLines([])
        idx = 0
        return
      }
      setTerminalLines((prev) => [...prev, terminalSequence[idx]])
      idx++
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 600)
    return () => clearInterval(interval)
  }, [])

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -60% 0px' }
    )
    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileNavOpen(false)
  }

  const getTerminalClass = (type: string) => {
    switch (type) {
      case 'prompt': return 'terminal-prompt'
      case 'output': return 'terminal-output'
      case 'error': return 'terminal-error'
      case 'info': return 'terminal-info'
      case 'warning': return 'terminal-warning'
      default: return ''
    }
  }

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo" onClick={() => scrollTo('overview')}>
            <div className="logo-icon">M</div>
            <div className="logo-text">
              <span>z/OS</span>
              <span>Mainframe APS</span>
            </div>
          </div>
          <nav className={`nav ${mobileNavOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? '\u2715' : '\u2630'}
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">
        {/* HERO / OVERVIEW */}
        <section id="overview" className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              MAINFRAME APPLICATION PROCESSING SYSTEM
            </div>
            <h1>Enterprise Workflows on z/OS</h1>
            <p>
              A comprehensive system for developing, executing, and troubleshooting
              mainframe application workflows using COBOL, JCL, DB2, VSAM, and CICS
              within a z/OS environment.
            </p>
            <div className="hero-tech-row">
              <span className="tech-pill">COBOL</span>
              <span className="tech-pill">JCL</span>
              <span className="tech-pill">DB2</span>
              <span className="tech-pill">VSAM</span>
              <span className="tech-pill">CICS</span>
              <span className="tech-pill">z/OS</span>
            </div>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollTo('capabilities')}>
                Explore Capabilities
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('terminal')}>
                View Terminal Demo
              </button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Core Capabilities</div>
              <h2 className="section-title">Application Processing Skills</h2>
              <p className="section-desc">
                Each capability represents hands-on experience across the full
                mainframe application lifecycle, from development through
                execution and troubleshooting.
              </p>
            </div>
            <div className="capability-grid">
              {capabilities.map((cap, i) => (
                <div key={i} className="cap-card">
                  <div className="cap-icon">{cap.icon}</div>
                  <h3 className="cap-title">{cap.title}</h3>
                  <p className="cap-desc">{cap.description}</p>
                  <div className="cap-tags">
                    {cap.tags.map((tag, j) => (
                      <span key={j} className="cap-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section id="workflow" className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Processing Workflow</div>
              <h2 className="section-title">End-to-End Job Lifecycle</h2>
              <p className="section-desc">
                From JCL submission through output analysis, each stage of the
                mainframe processing workflow is carefully executed and verified.
              </p>
            </div>
            <div className="workflow-container">
              <div className="workflow-panel">
                <div className="workflow-panel-header">
                  <div className="workflow-dots">
                    <span className="workflow-dot" />
                    <span className="workflow-dot" />
                    <span className="workflow-dot" />
                  </div>
                  <span className="workflow-panel-title">WORKFLOW STEPS</span>
                </div>
                <div className="workflow-steps">
                  {workflowSteps.map((step, i) => (
                    <div key={i} className="workflow-step">
                      <div className="workflow-step-num">{i + 1}</div>
                      <div className="workflow-step-body">
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="workflow-panel">
                <div className="workflow-panel-header">
                  <div className="workflow-dots">
                    <span className="workflow-dot" />
                    <span className="workflow-dot" />
                    <span className="workflow-dot" />
                  </div>
                  <span className="workflow-panel-title">JCL EXAMPLE</span>
                </div>
                <div className="code-block" style={{ margin: 0, border: 'none' }}>
                  <div className="code-content">
                    <pre style={{ margin: 0, fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit', whiteSpace: 'pre-wrap' }}>{`//* PAYROLL PROCESSING JOB
//PAYROLL JOB ,
//        CLASS=A,MSGCLASS=H,MSGLEVEL=(1,1),
//        NOTIFY=&SYSUID
//COBOLC EXEC COBOLC
//SYSLIN  DD DSN=PROD01.PDS.COBOL(PAYROLL),
//             DISP=SHR
//PAYRUN  EXEC PGM=PAYROLL,COND=(0,NE)
//STEPLIB DD DSN=PAYROLL.LOADLIB,DISP=SHR
//EMPMAST DD DSN=VSAM.KSDS.EMPMAST,
//             DISP=SHR
//PAYFILE DD DSN=PAYROLL.PAYFILE.G+,
//             DISP=(NEW,CATLG),
//             SPACE=(TRK,(100,50),RLSE),
//             DCB=(RECFM=FB,LRECL=200)
//SYSOUT  DD SYSOUT=*
//SYSPRINT DD SYSOUT=*`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TROUBLESHOOTING */}
        <section id="troubleshooting" className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Troubleshooting</div>
              <h2 className="section-title">Structured Error Analysis</h2>
              <p className="section-desc">
                A systematic approach to diagnosing and resolving compile errors,
                JCL failures, and job execution issues across the mainframe stack.
              </p>
            </div>
            <div className="ts-grid">
              {troubleshootItems.map((item, i) => (
                <div key={i} className="ts-card">
                  <div
                    className="ts-card-header"
                    onClick={() => setOpenTsCard(openTsCard === i ? null : i)}
                  >
                    <div className={`ts-icon ${item.type}`}>{item.icon}</div>
                    <span className="ts-card-title">{item.title}</span>
                    <span className={`ts-card-chevron ${openTsCard === i ? 'open' : ''}`}>
                      {'\u25BC'}
                    </span>
                  </div>
                  <div className={`ts-card-body ${openTsCard === i ? 'open' : ''}`}>
                    <div className="ts-card-content">
                      <h5>Symptoms</h5>
                      <ul>
                        {item.symptoms.map((sym, j) => (
                          <li key={j}>{sym}</li>
                        ))}
                      </ul>
                      <h5>Resolution</h5>
                      <p>{item.resolution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TERMINAL DEMO */}
        <section id="terminal" className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">Live Demo</div>
              <h2 className="section-title">Job Execution Terminal</h2>
              <p className="section-desc">
                A simulated view of a mainframe job submission, compilation,
                execution, and completion cycle as it appears in the system console.
              </p>
            </div>
            <div className="workflow-panel">
              <div className="workflow-panel-header">
                <div className="workflow-dots">
                  <span className="workflow-dot" />
                  <span className="workflow-dot" />
                  <span className="workflow-dot" />
                </div>
                <span className="workflow-panel-title">z/OS CONSOLE -- JOB PAYROLL (JOB12345)</span>
              </div>
              <div className="terminal" ref={terminalRef}>
                {terminalLines.map((line, i) => (
                  <div key={i} className={`terminal-line ${getTerminalClass(line.type)}`}>
                    {line.text || '\u00A0'}
                  </div>
                ))}
                <span className="terminal-cursor" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>MAINFRAME APPLICATION PROCESSING SYSTEM // z/OS // COBOL // JCL // DB2 // VSAM // CICS</p>
        {visitorCount !== null && (
          <p className="footer-visitor">Total visits: {visitorCount}</p>
        )}
      </footer>
    </div>
  )
}
