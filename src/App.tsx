import { useState, useEffect, useRef } from 'react';
import resumeData from '../resume.json';
import { FaGithub, FaLinkedin, FaStackOverflow, FaExternalLinkAlt, FaMedium } from 'react-icons/fa';
import { FiMoon, FiSun } from 'react-icons/fi';

function App() {
  const { basics, sections } = resumeData;
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      Object.entries(sectionRefs.current).forEach(([key, ref]) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const headerOffset = 100; // account for fixed header and some padding
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const sectionsList = [
    { id: 'summary', title: 'Summary' },
    { id: 'experience', title: 'Experience' },
    { id: 'opensource', title: 'Open Source' },
    { id: 'projects', title: 'Projects' },
    { id: 'education', title: 'Education' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex">
          <div className="flex-1 max-w-3xl flex justify-between items-center">
            <div></div>
            <div className="flex items-center gap-4">
              {sections.profiles.items.map((profile) => {
                const Icon = profile.icon === 'github'
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
                    className="text-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Icon />
                  </a>
                );
              })}
              <button
                onClick={toggleDarkMode}
                className="text-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-20 pb-12 flex relative">
        <main className="flex-1 max-w-3xl">
          <section
            ref={el => { sectionRefs.current['summary'] = el; }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">{basics.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-1">{basics.headline}</p>
            <div className="flex flex-col gap-1 mb-3">
              <p className="text-md text-gray-600 dark:text-gray-400">Camberwell, Victoria, Australia</p>
            </div>
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: sections.summary.content }}
            />
          </section>

          <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-8"></div>

          <section
            ref={el => { sectionRefs.current['experience'] = el; }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-3">Work Experience</h2>
            <div className="space-y-2">
              {sections.experience.items.filter(exp => exp.visible).map(exp => (
                <div
                  key={exp.id}
                  className="group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-lg font-medium">{exp.position}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {exp.company}
                        <span className="text-gray-400 dark:text-gray-500 mx-2">•</span>
                        <span className="text-gray-500 dark:text-gray-400">{exp.location}</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{exp.date}</p>
                  </div>
                  <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: exp.summary }} />
                </div>
              ))}
            </div>
          </section>

          <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-8"></div>

          <section
            ref={el => { sectionRefs.current['opensource'] = el; }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-3">Open Source</h2>
            <div className="space-y-6">
              {sections.opensource.items.filter(project => project.visible).map(project => (
                <div
                  key={project.id}
                  className="group p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="text-lg font-medium mb-1">
                    <a
                      href={project.url.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group-hover:text-blue-600 dark:group-hover:text-blue-400 inline-flex items-center gap-2"
                    >
                      {project.name}
                      <FaExternalLinkAlt className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{project.description}</p>
                  <div className="prose dark:prose-invert mb-2" dangerouslySetInnerHTML={{ __html: project.summary }} />
                  <div className="flex flex-wrap gap-2">
                    {project.keywords?.map((keyword, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-8"></div>

          <section
            ref={el => { sectionRefs.current['projects'] = el; }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-3">Projects</h2>
            <div className="space-y-6">
              {sections.projects.items.filter(project => project.visible).map(project => (
                <div
                  key={project.id}
                  className="group p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="text-lg font-medium mb-1">
                    {project.url.href ? (
                      <a
                        href={project.url.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group-hover:text-blue-600 dark:group-hover:text-blue-400 inline-flex items-center gap-2"
                      >
                        {project.name}
                        <FaExternalLinkAlt className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{project.date}</p>
                  <div className="prose dark:prose-invert mb-2" dangerouslySetInnerHTML={{ __html: project.summary }} />
                  <div className="flex flex-wrap gap-2">
                    {project.keywords?.map((keyword, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-8"></div>

          <section
            ref={el => { sectionRefs.current['education'] = el; }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-3">Education</h2>
            <div className="space-y-2">
              {sections.education.items.filter(edu => edu.visible).map(edu => (
                <div
                  key={edu.id}
                >
                  <h3 className="text-lg font-medium">{edu.institution}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{edu.studyType} in {edu.area}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{edu.date}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <nav className="hidden lg:block sticky top-24 ml-8 h-fit">
          <div className="space-y-1">
            {sectionsList.map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  block w-full px-3 py-1.5 text-sm rounded
                  ${activeSection === section.id
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                {section.title}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} {basics.name}
        </div>
      </footer>
    </div>
  );
}

export default App;
