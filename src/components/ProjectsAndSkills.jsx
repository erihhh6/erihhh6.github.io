import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Github } from 'lucide-react'
import TypingAnimation from './TypingAnimation'

const projects = [
  {
    title: "CryptoAuction",
    description: "Sealed-bid auction protocol with hash commitments, Fiat-Shamir proofs, and a 3-phase reveal. Demonstrates hiding, binding, and soundness properties.",
    technologies: ["Python", "Flask", "JavaScript", "Cryptography"],
    github: "https://github.com/erihhh6/crypto-auction",
    gradient: "from-orange-500 to-red-600"
  },
  {
    title: "Crypto Visualizer",
    description: "Interactive visualization of AES modes including the ECB penguin attack, and DH vs ECDH key exchange with elliptic curve animation.",
    technologies: ["Python", "CustomTkinter", "Pillow", "matplotlib"],
    github: "https://github.com/erihhh6/crypto-visualizer",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "ZK GPU Accelerator",
    description: "CUDA-accelerated ZK proof primitives (NTT and MSM) on the BN254 field. Achieves 12–45x speedup over CPU baseline on an RTX 5050.",
    technologies: ["Python", "CUDA", "CuPy", "Numba", "NumPy"],
    github: "https://github.com/erihhh6/zk-gpu-accelerator",
    gradient: "from-green-500 to-teal-600"
  }
]

const skills = [
  "C/C++","Python","HTML/CSS","JavaScript","Git","Linux","SQL","Circom","MP-SPDZ"
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
              delay={500}
            />
          </h2>

          {/* Projects Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-3 text-center text-slate-200">
              Recent Projects
            </h3>
            {/* Task 4.2 — Subtitle */}
            <p className="text-slate-500 text-sm mb-6 text-center">
              Independent projects built alongside coursework in advanced cryptography and secure computation
            </p>
            {/* 3 projects on a single row */}
            <div className="grid md:grid-cols-3 gap-4">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.title} 
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 shadow-2xl shadow-black/10 hover:shadow-orange-500/20 flex flex-col">
                    <CardHeader className="pb-2">
                      <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${project.gradient} mb-3`}></div>
                      <CardTitle className="text-base group-hover:text-orange-400 transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400 text-xs leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3 pt-0 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs font-medium bg-white/10 backdrop-blur-sm text-slate-200 rounded-md border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-3">
                        <Button
                          variant="outline"
                          className="w-full group/btn text-xs bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10"
                          aria-label={`View source code for ${project.title} on GitHub`}
                          onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
                        >
                          <Github className="mr-2 h-3.5 w-3.5" />
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

          </div>
        </div>
      </div>
    </section>
  )
}
