import { motion } from 'framer-motion'
import TypingAnimation from './TypingAnimation'

export default function About() {
  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center px-4 pt-24 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Invisible layout structure */}
        <div className="relative">
          {/* Left invisible bar */}
          <div className="absolute left-0 top-0 bottom-0 w-px"></div>
          
          {/* Right invisible bar */}
          <div className="absolute right-0 top-0 bottom-0 w-px"></div>
          
          {/* Content container with proper margins */}
          <div className="mx-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 mt-16">
              <TypingAnimation 
                text="Oprea Eric"
                className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"
                delay={500}
              />
            </h2>

            {/* Glassmorphism container for content */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/10 hover:bg-white/8 hover:backdrop-blur-2xl hover:border-orange-500/20 hover:shadow-orange-500/10 hover:scale-[1.02] transition-all duration-500 group">
              <div className="space-y-8">
                {/* Text content with consistent line length */}
                <div className="max-w-4xl mx-auto space-y-6">
                  <motion.p 
                    className="text-lg leading-relaxed text-slate-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    Most interface with the world through abstractions. I prefer the underlying mechanics. I am a computer engineering student focused on zero-knowledge cryptography, secure computation and particle physics, operating with absolute systemic clarity.
                  </motion.p>
                  
                  <motion.p 
                    className="text-lg leading-relaxed text-slate-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                  >
                    I enjoy building things that apply what I study: from GPU-accelerated ZK primitives to
                    interactive cryptographic protocols. Beyond academics, I am committed to continuous learning
                    and believe that clear thinking, whether in math or in code, is the most transferable
                    skill there is.
                  </motion.p>
                </div>

                {/* Skills badges */}
                <motion.div 
                  className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.1 }}
                >
                  {['Informatics', 'Mathematics', 'Physics'].map((trait, index) => (
                    <motion.span
                      key={trait}
                      className="px-4 py-2 bg-orange-600/10 text-orange-400 rounded-full text-sm font-medium border border-orange-600/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 2.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {trait}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Task 4.1 — University badge */}
                <motion.div
                  className="flex justify-center mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.7 }}
                >
                  <span className="px-4 py-2 bg-slate-700/40 text-slate-300 rounded-full text-sm border border-slate-600/30 flex items-center gap-2">
                    <span>RO</span>
                    <span>Computers and Information Technology @ University of Bucharest</span>
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
