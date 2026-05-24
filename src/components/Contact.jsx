import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Mail, Github, Linkedin, MapPin, Calendar, Download } from 'lucide-react'
import TypingAnimation from './TypingAnimation'

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen w-full flex flex-col px-4 py-0 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 flex-grow flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          <TypingAnimation 
            text="Contact"
            className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"
            delay={500}
          />
        </h2>

        {/* Glassmorphism container for content */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/10 mb-8 hover:bg-white/8 hover:backdrop-blur-2xl hover:border-amber-500/20 hover:shadow-amber-500/10 hover:scale-[1.02] transition-all duration-500 group">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-12"
          >
            <p className="text-xl text-slate-300 mb-6">
              I am always open to discussing technical challenges, academic collaborations, or new opportunities in cybersecurity and computer engineering. Check out my CV below and feel free to send a message.  
            </p>
            
            <div className="flex items-center justify-center gap-4 text-slate-400 text-sm mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Romania · Bucharest</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span>Available for new opportunities</span>
              </div>
            </div>

            {/* Resume Download Button */}
            <div className="mb-8">
              <Button 
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
                aria-label="Download Eric's resume as PDF"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = './assets/resume.pdf'
                  link.download = 'Eric_Resume.pdf'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                <Download className="mr-2 h-4 w-4 animate-bounce" aria-hidden="true" />
                Download Resume
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="group bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300"
              aria-label="Send email to Oprea Eric"
              onClick={() => window.open('mailto:opreaeric10@gmail.com')}
            >
              <Mail className="mr-2 h-5 w-5 group-hover:text-orange-400 transition-colors" aria-hidden="true" />
              <span className="group-hover:text-orange-400 transition-colors">Email</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300"
              aria-label="Visit Oprea Eric's LinkedIn profile"
              onClick={() => window.open('https://www.linkedin.com/in/eric-oprea/', '_blank', 'noopener,noreferrer')}
            >
              <Linkedin className="mr-2 h-5 w-5 group-hover:text-amber-400 transition-colors" aria-hidden="true" />
              <span className="group-hover:text-amber-400 transition-colors">LinkedIn</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300"
              aria-label="Visit Oprea Eric's GitHub profile"
              onClick={() => window.open('https://github.com/erihhh6', '_blank', 'noopener,noreferrer')}
            >
              <Github className="mr-2 h-5 w-5 group-hover:text-orange-400 transition-colors" aria-hidden="true" />
              <span className="group-hover:text-orange-400 transition-colors">GitHub</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.1 }}
        viewport={{ once: true }}
        className="w-full text-center py-2 border-t border-slate-800 mt-auto"
      >
        <p className="text-sm text-slate-500">
          "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra
        </p>
      </motion.div>
    </section>
  )
}
