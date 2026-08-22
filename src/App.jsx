const projects = [
  {
    title: "Chemistry Equation Balancer",
    type: "Browser tool",
    year: "2025",
    description:
      "Parses neutral chemical equations, constructs an element-conservation matrix, and solves for the smallest whole-number coefficients using exact rational arithmetic.",
    scope:
      "Supports nested parentheses and hydrates; ions, charges, and redox half-reactions are outside the current scope.",
    topics: ["JavaScript", "Formula parsing", "Linear algebra", "Exact arithmetic"],
    image: "/images/projects/chemistry-balancer.png",
    imageAlt:
      "Chemistry Equation Balancer with an equation input, example controls, and a balanced result",
    demo: "/demos/chemistry-equation-balancer/",
    source: "https://github.com/KennyKe0706/Chemistry-Equation-Balancer",
  },
  {
    title: "Go Game",
    type: "Interactive prototype",
    year: "2025",
    description:
      "Models a local two-player 19×19 Go board, using breadth-first traversal to identify groups, liberties, captures, and invalid suicide moves.",
    scope:
      "Ko, passing, end-game flow, and territory scoring are not implemented in this prototype.",
    topics: ["JavaScript", "Graph search", "State modelling", "Rule validation"],
    image: "/images/projects/go-game.png",
    imageAlt:
      "Go Game interface showing a wooden 19 by 19 board with black and white stones",
    demo: "/demos/go-game/",
    source: "https://github.com/KennyKe0706/GO-Game",
  },
];

const profileLinks = [
  { label: "GitHub", href: "https://github.com/KennyKe0706" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zixuan-ke-50094a328/",
  },
  { label: "X / Twitter", href: "https://x.com/kenny1723" },
  { label: "DMOJ", href: "https://dmoj.ca/user/Kenny" },
  { label: "LeetCode", href: "https://leetcode.com/u/kennyke/" },
];

const resumeHref = "/Zixuan_Kenny_Ke_Resume.pdf";

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="page-shell nav-row">
          <a className="wordmark" href="#top" aria-label="Kenny Ke, home">
            K<span>/</span>K
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#profile">Profile</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero page-shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Computer Science · University of Toronto</p>
            <h1>Zixuan (Kenny) Ke</h1>
            <p className="hero-statement">
              Computer science, shaped by mathematics and careful reasoning.
            </p>
            <p className="hero-intro">
              I am a Computer Science student interested in artificial
              intelligence, machine learning, statistics, and the mathematical
              foundations of computation.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Selected work <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link" href="mailto:kezixuan1@gmail.com">
                Email me <ExternalArrow />
              </a>
            </div>
          </div>

          <aside className="profile-panel" aria-label="Academic profile">
            <p className="panel-label">Academic profile</p>
            <dl>
              <div>
                <dt>Institution</dt>
                <dd>University of Toronto, St. George</dd>
              </div>
              <div>
                <dt>Program</dt>
                <dd>Computer Science</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>AI · Machine Learning · Statistics</dd>
              </div>
            </dl>
            <div className="panel-links">
              {profileLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label} <ExternalArrow />
                </a>
              ))}
            </div>
          </aside>
        </section>

        <section className="section page-shell" id="work">
          <div className="section-heading">
            <p className="section-label">Selected work</p>
            <div>
              <h2>Small projects with clear technical questions.</h2>
              <p>
                Recent implementations focused on parsing, graph traversal,
                mathematical modelling, and reliable state management.
              </p>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <a className="project-image" href={project.demo}>
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width="1600"
                    height="1000"
                    loading="lazy"
                  />
                </a>
                <div className="project-body">
                  <p className="project-meta">
                    {project.type} <span>·</span> {project.year}
                  </p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-scope">
                    <strong>Scope:</strong> {project.scope}
                  </p>
                  <ul className="topic-list" aria-label="Project topics">
                    {project.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    <a href={project.demo}>Live demo →</a>
                    <a href={project.source}>
                      Source code <ExternalArrow />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section academic-section" id="profile">
          <div className="page-shell academic-grid">
            <div>
              <p className="section-label">Academic interests</p>
              <h2>Building strong foundations before specialising.</h2>
            </div>
            <div className="academic-copy">
              <p>
                I am strengthening my foundations in algorithms, data
                structures, linear algebra, probability, and statistics as I
                explore artificial intelligence and machine learning.
              </p>
              <dl className="interest-list">
                <div>
                  <dt>Core computer science</dt>
                  <dd>Algorithms · Data structures</dd>
                </div>
                <div>
                  <dt>Mathematical foundations</dt>
                  <dd>Linear algebra · Probability · Statistics</dd>
                </div>
                <div>
                  <dt>Current direction</dt>
                  <dd>Artificial intelligence · Machine learning</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="resume-section page-shell" id="resume">
          <p className="section-label">Curriculum vitae</p>
          <div className="resume-grid">
            <h2>Résumé in preparation.</h2>
            <div className="resume-copy">
              <p>
                I am currently preparing a concise record of my education,
                experience, and projects. The completed PDF will be available
                here.
              </p>
              {resumeHref ? (
                <a
                  className="resume-entry resume-entry-active"
                  href={resumeHref}
                >
                  <span>Résumé · PDF</span>
                  <span>View document →</span>
                </a>
              ) : (
                <div
                  className="resume-entry"
                  aria-label="Résumé PDF, in progress"
                >
                  <span>Résumé · PDF</span>
                  <span>In progress</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="contact-section page-shell" id="contact">
          <p className="section-label">Contact</p>
          <div className="contact-grid">
            <h2>Academic and project conversations are welcome.</h2>
            <div>
              <a className="contact-email" href="mailto:kezixuan1@gmail.com">
                kezixuan1@gmail.com <ExternalArrow />
              </a>
              <div className="contact-links" aria-label="Profiles">
                {profileLinks.map((link) => (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-row">
          <p>© {new Date().getFullYear()} Zixuan (Kenny) Ke</p>
          <p>Computer Science · University of Toronto</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}

export default App;
