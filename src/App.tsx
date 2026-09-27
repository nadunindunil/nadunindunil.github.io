import resumeData from '../resume.json';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaStackOverflow,
} from 'react-icons/fa';

function App() {
  const { basics, sections } = resumeData;
  const yearsOfExperience = new Date().getFullYear() - 2018;
  const summary = sections.summary.content.replace(
    '{{yearsOfExperience}}',
    String(yearsOfExperience),
  );
  const experience = sections.experience.items.filter((item) => item.visible);
  const projects = sections.projects.items.filter((item) => item.visible);
  const openSource = sections.opensource.items.filter((item) => item.visible);
  const education = sections.education.items.filter((item) => item.visible);

  return (
    <div className="site-shell">
      <div className="ambient" aria-hidden="true">
        <span className="glow glow-one" />
        <span className="glow glow-two" />
        <span className="glow glow-three" />
      </div>

      <nav className="site-nav" aria-label="Primary navigation">
        <div className="wrap nav-inner">
          <a className="brand" href="#top" aria-label="Back to top">
            Nadun<span>.</span>
          </a>
          <div className="nav-links">
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <header className="hero wrap" id="top">
        <p className="eyebrow">Software engineer · Melbourne</p>
        <h1>
          {basics.name}
          <span>{basics.headline}</span>
        </h1>
        <div
          className="hero-summary rich-text"
          dangerouslySetInnerHTML={{ __html: summary }}
        />

        <div className="stats" aria-label="Career highlights">
          <div className="stat">
            <strong>{yearsOfExperience}+</strong>
            <span>Years building software</span>
          </div>
          <div className="stat">
            <strong>304K+</strong>
            <span>Weekly npm downloads</span>
          </div>
          <div className="stat">
            <strong>{openSource.length}</strong>
            <span>Open-source projects</span>
          </div>
        </div>

        <div className="availability">
          <span aria-hidden="true" />
          Based in {basics.location}
        </div>

        <div className="hero-actions">
          <a className="button primary" href={`mailto:${basics.email}`}>
            Get in touch
          </a>
          <a className="button ghost" href="#work">
            View my work
          </a>
        </div>

        <div className="social-links" aria-label="Social profiles">
          {sections.profiles.items
            .filter((profile) => profile.visible !== false)
            .map((profile) => {
              const Icon =
                profile.icon === 'github'
                  ? FaGithub
                  : profile.icon === 'linkedin'
                    ? FaLinkedin
                    : profile.icon === 'medium'
                      ? FaMedium
                      : FaStackOverflow;

              return (
                <a
                  key={profile.id}
                  href={profile.url.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.network}
                  title={profile.network}
                >
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
        </div>
      </header>

      <main>
        <section className="section wrap" id="experience">
          <div className="section-label">
            <span className="section-dot" />
            <span className="section-number">01</span>
            Experience
          </div>
          <h2>Where I&apos;ve worked</h2>

          <div className="timeline">
            {experience.map((item) => (
              <article className="job" key={item.id}>
                <p className="job-date">{item.date}</p>
                <h3>{item.position}</h3>
                <p className="company">
                  {item.url.href ? (
                    <a
                      href={item.url.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.company}
                    </a>
                  ) : (
                    item.company
                  )}
                  <span> · {item.location}</span>
                </p>
                <div
                  className="rich-text job-summary"
                  dangerouslySetInnerHTML={{ __html: item.summary }}
                />
              </article>
            ))}
          </div>
        </section>

        <section className="section wrap" id="work">
          <div className="section-label">
            <span className="section-dot" />
            <span className="section-number">02</span>
            Selected work
          </div>
          <h2>Projects built to solve real problems</h2>

          <div className="work-group">
            <h3 className="group-title">Enterprise projects</h3>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.id}>
                  <div className="card-heading">
                    <h3>{project.name}</h3>
                    {project.url.href && (
                      <a
                        href={project.url.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.name}`}
                      >
                        <FaExternalLinkAlt aria-hidden="true" />
                      </a>
                    )}
                  </div>
                  <p className="card-meta">
                    {project.description} · {project.date}
                  </p>
                  <div
                    className="rich-text card-summary"
                    dangerouslySetInnerHTML={{ __html: project.summary }}
                  />
                  <div className="tags">
                    {project.keywords.map((keyword) => (
                      <span key={keyword}>{keyword}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="work-group">
            <h3 className="group-title">Open source</h3>
            <div className="project-grid">
              {openSource.map((project) => (
                <article className="project-card" key={project.id}>
                  <div className="card-heading">
                    <h3>
                      <a
                        href={project.url.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.name}
                      </a>
                    </h3>
                    <a
                      href={project.url.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.name}`}
                    >
                      <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                  </div>
                  <p className="card-meta">{project.description}</p>
                  <div
                    className="rich-text card-summary"
                    dangerouslySetInnerHTML={{ __html: project.summary }}
                  />
                  <div className="tags">
                    {project.keywords.map((keyword) => (
                      <span key={keyword}>{keyword}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section wrap" id="education">
          <div className="section-label">
            <span className="section-dot" />
            <span className="section-number">03</span>
            Education
          </div>
          <h2>Academic background</h2>

          <div className="education-list">
            {education.map((item) => (
              <article key={item.id}>
                <p>{item.date}</p>
                <h3>{item.studyType}</h3>
                <span>{item.area}</span>
                <strong>{item.institution}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="contact wrap" id="contact">
          <div className="section-label centered">
            <span className="section-dot" />
            <span className="section-number">04</span>
            Contact
          </div>
          <h2>Let&apos;s build something useful.</h2>
          <p>
            Have a role, project, or open-source idea worth discussing? Send me
            a message.
          </p>
          <a className="button primary" href={`mailto:${basics.email}`}>
            {basics.email}
          </a>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <span>
            © {new Date().getFullYear()} {basics.name}
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
