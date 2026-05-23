import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Github } from 'lucide-react'

// Typing Animation Component
const TypingAnimation = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }
    }, delay + currentIndex * 10)

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
          |
        </span>
      )}
    </span>
  )
}

const projects = [
  {
    title: "AI Study Helper",
    description: "Simple web app that helps organize study sessions and track learning progress using basic AI concepts.",
    technologies: ["Python", "React", "Flask"],
    github: "https://github.com",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "Personal Task Manager",
    description: "A clean and simple task management app with a focus on personal productivity and user experience.",
    technologies: ["React", "JavaScript", "CSS"],
    github: "https://github.com",
    gradient: "from-green-500 to-teal-600"
  },
  {
    title: "Algorithm Visualizer",
    description: "Interactive tool for visualizing basic sorting algorithms, helping students understand how they work.",
    technologies: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com",
    gradient: "from-orange-500 to-red-600"
  }
]

const skills = [
  "JavaScript", "Python", "React", "HTML/CSS", "Git", "Node.js", 
  "SQL", "C++", "Linux", "VS Code"
]

export default function ProjectsAndSkills() {
  return (
    <section id="projects" className="min-h-screen w-full flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <TypingAnimation 
              text="Projects & Skills"
              className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"
              delay={300}
            />
          </h2>

          {/* Projects Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center text-slate-200">
              Recent Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.title} 
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 shadow-2xl shadow-black/10 hover:shadow-orange-500/20 flex flex-col">
                    <CardHeader className="pb-3">
                      <div className={`w-full h-2 rounded-full bg-gradient-to-r ${project.gradient} mb-3`}></div>
                      <CardTitle className="text-lg group-hover:text-orange-400 transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-sm">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3 pt-0 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm text-slate-200 rounded-md border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-4">
                        <Button
                          variant="outline"
                          className="w-full group/btn text-sm bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6 text-slate-200">
              Technologies I Work With
            </h3>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill} 
                  className="group cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <div className="px-3 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-orange-500/50 transition-colors duration-300 shadow-lg shadow-black/10">
                    <span className="text-sm font-medium text-slate-300 group-hover:text-orange-400 transition-colors duration-300">
                      {skill}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              Currently learning and exploring new technologies as I progress through my Computer Science studies.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 