// --- src/App.jsx (Your Main Portfolio Component) ---

import React, { useState, useEffect } from 'react';

// Lucide React for icons
import { Home, User, FolderDot, Mail, Github, Linkedin, Twitter, ExternalLink, Code } from 'lucide-react';

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false); // Close menu on navigation
    }
  };

  // Handle scroll to update active section in navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Offset for better detection

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-90 backdrop-blur-sm z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
            The Algorithmic Artisan
          </a>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-100 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
          {/* Desktop Menu */}
          <div className={`md:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent shadow-lg md:shadow-none py-4 md:py-0`}>
            <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 px-4 md:px-0">
              <li>
                <NavLink icon={<Home size={18} />} text="Home" sectionId="home" activeSection={activeSection} onClick={scrollToSection} />
              </li>
              <li>
                <NavLink icon={<User size={18} />} text="About" sectionId="about" activeSection={activeSection} onClick={scrollToSection} />
              </li>
              <li>
                <NavLink icon={<FolderDot size={18} />} text="Projects" sectionId="projects" activeSection={activeSection} onClick={scrollToSection} />
              </li>
              <li>
                <NavLink icon={<Mail size={18} />} text="Contact" sectionId="contact" activeSection={activeSection} onClick={scrollToSection} />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="pt-20"> {/* Padding to account for fixed nav */}
        {/* Home Section */}
        <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            {/* Background pattern or subtle animation can go here */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-transparent to-transparent animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent animate-pulse-slow animation-delay-2000"></div>
          </div>
          <div className="text-center z-10 p-6 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 animate-fade-in-up">
              Hi, I'm <span className="text-indigo-400">Harshit Shukla</span>.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up animation-delay-500">
              A passionate Full-Stack Developer building robust and scalable web applications.
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-1000">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-12">About Me</h2>
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
              <div className="md:w-1/3 mb-8 md:mb-0">
                <img
                  src="harshit.jpg" // Placeholder image
                  alt="Your Photo"
                  className="rounded-full shadow-xl w-64 h-64 mx-auto object-cover border-4 border-indigo-500"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/374151/FFFFFF?text=Your+Photo"; }}
                />
              </div>
              <div className="md:w-2/3 text-lg text-gray-300 leading-relaxed">
                <p className="mb-4">
                  Hello! I'm <span className="text-indigo-400 font-semibold">Harshit Shukla</span>, a dedicated Full-Stack Developer with X years of experience in building dynamic and user-friendly web applications. My journey in tech began with a fascination for how software can solve real-world problems, and it has evolved into a passion for crafting seamless digital experiences from concept to deployment.
                </p>
                <p className="mb-4">
                  I specialize in both frontend and backend development. On the frontend, I excel at creating intuitive and responsive user interfaces using modern frameworks like <span className="text-indigo-400 font-semibold">React.js</span> (or your preferred framework), ensuring a delightful user experience. My backend expertise includes designing robust APIs, managing databases, and implementing secure and scalable server-side logic with technologies such as <span className="text-indigo-400 font-semibold">Node.js with Express</span> (or your preferred backend stack).
                </p>
                <p className="mb-4">
                  I am always eager to learn new technologies and embrace challenges. When I'm not coding, you can find me [mention a hobby, e.g., exploring new hiking trails, reading sci-fi novels, or contributing to open-source projects]. I'm excited to connect and discuss how my skills can contribute to your next project!
                </p>
                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">My Tech Stack:</h3>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Git', 'REST APIs', 'Docker (optional)'].map((tech, index) => (
                    <span key={index} className="bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-12">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Card 1 */}
              <ProjectCard
                title="E-commerce Platform"
                description="A full-stack e-commerce application featuring user authentication, product catalog, shopping cart, and order processing. Built with React, Node.js, Express, and MongoDB."
                technologies={['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Tailwind CSS']}
                liveLink="#" // Replace with actual link
                githubLink="#" // Replace with actual link
                imageSrc="https://placehold.co/600x400/1F2937/FFFFFF?text=E-commerce+App"
              />
              {/* Project Card 2 */}
              <ProjectCard
                title="Real-time Chat Application"
                description="A real-time chat application with user authentication, private messaging, and group chats. Utilizes WebSockets for instant communication."
                technologies={['React', 'Node.js', 'Socket.IO', 'PostgreSQL', 'Styled Components']}
                liveLink="#"
                githubLink="#"
                imageSrc="https://placehold.co/600x400/1F2937/FFFFFF?text=Chat+App"
              />
              {/* Project Card 3 */}
              <ProjectCard
                title="Task Management Dashboard"
                description="An interactive dashboard for managing tasks, tracking progress, and collaborating with team members. Features drag-and-drop functionality."
                technologies={['Vue.js', 'Firebase', 'Firestore', 'Vuex', 'CSS Grid']}
                liveLink="#"
                githubLink="#"
                imageSrc="https://placehold.co/600x400/1F2937/FFFFFF?text=Task+Dashboard"
              />
              {/* Project Card 4 (Add more as needed) */}
              <ProjectCard
                title="Recipe Finder App"
                description="A web application that allows users to search for recipes, save favorites, and create meal plans. Integrates with a third-party recipe API."
                technologies={['React', 'Redux', 'External API', 'Sass', 'Responsive Design']}
                liveLink="#"
                githubLink="#"
                imageSrc="https://placehold.co/600x400/1F2937/FFFFFF?text=Recipe+App"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Get in Touch</h2>
            <div className="max-w-2xl mx-auto bg-gray-700 p-8 rounded-lg shadow-xl border border-indigo-600">
              <p className="text-lg text-gray-300 text-center mb-8">
                Have a question or want to work together? Fill out the form below or connect with me on social media.
              </p>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-200 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="shadow appearance-none border border-gray-600 rounded-md w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900 transition-colors duration-200"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border border-gray-600 rounded-md w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900 transition-colors duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-200 text-sm font-bold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    className="shadow appearance-none border border-gray-600 rounded-md w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900 transition-colors duration-200 resize-y"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-center space-x-6 mt-12">
              <a
                href="https://github.com/yourusername" // Replace with your GitHub
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-indigo-400 transition-colors transform hover:scale-110"
                aria-label="GitHub Profile"
              >
                <Github size={32} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername" // Replace with your LinkedIn
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-indigo-400 transition-colors transform hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={32} />
              </a>
              <a
                href="https://twitter.com/yourusername" // Replace with your Twitter
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-indigo-400 transition-colors transform hover:scale-110"
                aria-label="Twitter Profile"
              >
                <Twitter size={32} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400 text-sm border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} Harshit Shukla. All rights reserved.</p>
        <p>Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

// NavLink Component for reusability and active state styling
const NavLink = ({ icon, text, sectionId, activeSection, onClick }) => {
  const isActive = activeSection === sectionId;
  return (
    <a
      href={`#${sectionId}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(sectionId);
      }}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors duration-300
        ${isActive ? 'bg-indigo-700 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
};

// ProjectCard Component for displaying individual projects
const ProjectCard = ({ title, description, technologies, liveLink, githubLink, imageSrc }) => {
  return (
    <div className="bg-gray-700 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out border border-indigo-600">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/1F2937/FFFFFF?text=Project+Image"; }}
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 mb-4 text-base">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="bg-gray-600 text-gray-200 px-3 py-1 rounded-full text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-start space-x-4">
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 shadow-md"
            aria-label={`View live demo of ${title}`}
          >
            <ExternalLink size={16} className="mr-2" /> Live Demo
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 shadow-md"
            aria-label={`View GitHub repository for ${title}`}
          >
            <Code size={16} className="mr-2" /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
