/* ==========================================================================
   MUHAMMED HASAN MISBA - PORTFOLIO INTERACTIVE APP (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 01. CURSOR SPOTLIGHT EFFECT
  // ------------------------------------------------------------------------
  const spotlight = document.getElementById('spotlight');
  
  if (spotlight && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }

  // ------------------------------------------------------------------------
  // 02. DARK / LIGHT THEME TOGGLE
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlElement.className = savedTheme;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.className = newTheme;
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // ------------------------------------------------------------------------
  // 03. SCROLLSPY / ACTIVE NAV LINK HIGHLIGHTER
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    let scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // initial check

  // ------------------------------------------------------------------------
  // 04. INTERACTIVE AI TERMINAL WIDGET
  // ------------------------------------------------------------------------
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const chipBtns = document.querySelectorAll('.chip-btn');

  const commands = {
    help: `Available commands:<br>
    &bull; <span class="text-emerald">about</span> - Brief background & summary<br>
    &bull; <span class="text-emerald">agents</span> - Agentic AI & RAG achievements<br>
    &bull; <span class="text-emerald">skills</span> - Core technical stack<br>
    &bull; <span class="text-emerald">projects</span> - Key production projects<br>
    &bull; <span class="text-emerald">contact</span> - Email & phone info<br>
    &bull; <span class="text-emerald">clear</span> - Clear terminal screen`,
    
    about: `<span class="text-cyan">Muhammed Hasan Misba</span><br>
    AI/ML Engineer with 2+ years of experience designing and deploying production-grade intelligent systems on Azure AI and Oracle Cloud (OCI). Specialized in Agentic AI, RAG, and Computer Vision.`,

    agents: `<span class="text-purple">Agentic AI & RAG Metrics:</span><br>
    &bull; Delivered 65+ Oracle Fusion AI Agents for Redwood pages (24A-25D).<br>
    &bull; Shipped E-ZPR (AI Pull Request Reviewer) cutting review turnaround by 50%.<br>
    &bull; Architected Agentic Enterprise Data Analyst handling 600K+ CSV rows.<br>
    &bull; Established RAG retrieval accuracy benchmarks across teams.`,

    skills: `<span class="text-cyan">Technical Stack:</span><br>
    Languages: Python, TypeScript, C, SQL<br>
    GenAI/Agents: LangChain, LangGraph, CrewAI, LangSmith, Agentic RAG, VectorDBs<br>
    Computer Vision: PyTorch, TensorFlow, YOLOv5, Detectron2, VLMs<br>
    Cloud/DevOps: Azure AI, Oracle OCI, Docker, Jenkins, Git, DVC, MLFlow`,

    projects: `<span class="text-emerald">Featured Projects:</span><br>
    1. VQA Pipeline for Diabetic Macular Edema (VLMs + Multimodal RAG)<br>
    2. E-ZPR: AI Pull Request Reviewer (Adopted org-wide at 10Pearls)<br>
    3. Agentic Data Analyst (600K+ CSV rows auto-insights)<br>
    4. ADMS Driver Monitoring & Vehicle Tracking (Autonomous Car Vision)`,

    contact: `<span class="text-cyan">Contact Details:</span><br>
    Email: muhammedhm2002@gmail.com<br>
    Phone: +94 77 254 0280<br>
    Location: Malwana, Western Province, Sri Lanka<br>
    GitHub: github.com/muhammedhm<br>
    LinkedIn: linkedin.com/in/hasan-muhammed`
  };

  function executeCommand(cmdStr) {
    const cmd = cmdStr.trim().toLowerCase();
    
    // Create prompt line
    const userLine = document.createElement('p');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `<span class="prompt-symbol">hasan_ai&gt;</span> ${escapeHtml(cmdStr)}`;
    terminalOutput.appendChild(userLine);

    if (cmd === 'clear') {
      terminalOutput.innerHTML = `<p class="terminal-line text-cyan">Terminal cleared. Type 'help' for available commands.</p>`;
    } else if (commands[cmd]) {
      const responseLine = document.createElement('p');
      responseLine.className = 'terminal-line';
      responseLine.innerHTML = commands[cmd];
      terminalOutput.appendChild(responseLine);
    } else if (cmd !== '') {
      const errorLine = document.createElement('p');
      errorLine.className = 'terminal-line text-muted';
      errorLine.innerHTML = `Command not recognized: '${escapeHtml(cmdStr)}'. Type <span class="text-emerald">'help'</span> for list of commands.`;
      terminalOutput.appendChild(errorLine);
    }

    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputVal = terminalInput.value;
      if (inputVal) {
        executeCommand(inputVal);
        terminalInput.value = '';
      }
    });
  }

  // Quick chip buttons
  chipBtns.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  // ------------------------------------------------------------------------
  // 05. CONTACT FORM HANDLER
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (name && email && subject && message) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `Thank you, ${escapeHtml(name)}! Your message has been prepared. Opening mail application...`;
        
        // Open default mail client as fallback
        const mailtoUri = `mailto:muhammedhm2002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        
        setTimeout(() => {
          window.location.href = mailtoUri;
          contactForm.reset();
        }, 1200);

      } else {
        formFeedback.className = 'form-feedback error';
        formFeedback.innerHTML = 'Please fill out all required fields.';
      }
    });
  }

});
