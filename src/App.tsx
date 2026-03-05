import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Star, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Menu, X } from 'lucide-react';
import { Hero3D } from './components/Hero3D';
import { BookingModal } from './components/BookingModal';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { cn } from './lib/utils';

const services = [
  {
    title: "Advanced Facials",
    description: "Tailored treatments using medical-grade serums to rejuvenate and hydrate your skin.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
    price: "From $120"
  },
  {
    title: "Laser Therapy",
    description: "State-of-the-art laser technology for hair removal, pigmentation, and skin tightening.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800",
    price: "From $250"
  },
  {
    title: "Injectables",
    description: "Precision-led aesthetic enhancements including fillers and anti-wrinkle treatments.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    price: "From $350"
  }
];

const testimonials = [
  {
    name: "Elena Rodriguez",
    role: "Regular Client",
    content: "The expertise at Seema Clinic is unmatched. My skin has never looked more radiant and healthy.",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Aesthetic Patient",
    content: "Professional, clean, and results-driven. The laser treatments here are life-changing.",
    rating: 5
  }
];

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-cream/80 backdrop-blur-md border-b border-ink/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="text-2xl font-serif tracking-widest uppercase">Seema Clinic</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'About', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium tracking-widest uppercase hover:text-gold transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-8 py-3 bg-ink text-cream rounded-full text-sm font-medium tracking-widest uppercase hover:bg-ink/90 transition-all"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cream border-b border-ink/5 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {['Services', 'About', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-left text-lg font-serif tracking-widest uppercase"
                  >
                    {item}
                  </button>
                ))}
                <button 
                  onClick={() => { setIsBookingOpen(true); setIsMenuOpen(false); }}
                  className="w-full py-4 bg-ink text-cream rounded-full text-sm font-medium tracking-widest uppercase"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center">
        <Hero3D />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 rounded-full border border-gold/30 text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                Aesthetic Excellence
              </span>
              <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-8 text-balance">
                Reveal Your Most <br />
                <span className="italic text-gold">Radiant</span> Self
              </h1>
              <p className="text-lg md:text-xl text-ink/60 mb-10 leading-relaxed max-w-xl">
                Experience world-class dermatological care and bespoke aesthetic treatments designed to enhance your natural beauty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="px-10 py-5 bg-ink text-cream rounded-full text-sm font-bold tracking-widest uppercase hover:bg-ink/90 transition-all flex items-center justify-center gap-2 group"
                >
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="px-10 py-5 border border-ink/10 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-ink/5 transition-all"
                >
                  Explore Services
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="w-full"
              >
                <BeforeAfterSlider 
                  beforeImage="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1200"
                  afterImage="https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=1200"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-10 right-10 hidden lg:flex gap-12">
          {[
            { label: 'Happy Clients', value: '10k+' },
            { label: 'Years Experience', value: '15+' },
            { label: 'Expert Doctors', value: '08' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-right"
            >
              <div className="text-3xl font-serif text-gold">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-serif mb-6">Bespoke Treatments</h2>
              <p className="text-ink/60 text-lg">We combine medical expertise with artistic vision to deliver results that are both transformative and natural-looking.</p>
            </div>
            <button className="text-sm font-bold tracking-widest uppercase border-b-2 border-gold pb-1 hover:text-gold transition-colors">
              View All Services
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-3xl mb-6 relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-[100px] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
                  alt="Seema Clinic Interior"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 aspect-square bg-gold rounded-full p-8 flex flex-col justify-center items-center text-center text-ink shadow-xl">
                <div className="text-4xl font-serif mb-2">15+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest">Years of Trust</div>
              </div>
            </div>
            <div>
              <h2 className="text-5xl md:text-6xl font-serif mb-8">The Seema Clinic Philosophy</h2>
              <div className="space-y-6 text-ink/70 text-lg leading-relaxed">
                <p>Founded by Dr. Seema, our clinic was born out of a passion for dermatological excellence and a commitment to patient-centric care.</p>
                <p>We believe that skincare is more than just surface-level treatments; it's about confidence, health, and well-being. Our team of board-certified specialists uses the latest clinical innovations to craft personalized paths to skin health.</p>
                <div className="pt-8 grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-gold mb-2 font-serif text-xl italic">Integrity</div>
                    <p className="text-sm">Honest consultations and evidence-based treatments.</p>
                  </div>
                  <div>
                    <div className="text-gold mb-2 font-serif text-xl italic">Innovation</div>
                    <p className="text-sm">Access to the world's most advanced aesthetic tech.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Gallery Section */}
      <section id="gallery" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif mb-6">Our Sanctuary</h2>
            <p className="text-ink/60 max-w-xl mx-auto text-lg">Step into a space designed for tranquility, precision, and your ultimate comfort.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -10 }}
              className="aspect-square rounded-[40px] overflow-hidden shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
                alt="Modern Treatment Room" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="aspect-square rounded-[40px] overflow-hidden shadow-lg md:mt-12"
            >
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
                alt="Clinic Reception" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="aspect-square rounded-[40px] overflow-hidden shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800" 
                alt="Consultation Area" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-ink text-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif mb-6">Voices of Radiance</h2>
            <p className="text-cream/60 max-w-xl mx-auto">Hear from our community about their transformative journeys at Seema Clinic.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 border border-cream/10 rounded-[40px] relative"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-2xl font-serif italic mb-8 leading-relaxed">"{t.content}"</p>
                <div>
                  <div className="font-bold tracking-widest uppercase text-sm mb-1">{t.name}</div>
                  <div className="text-xs text-cream/40 uppercase tracking-widest">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif mb-8">Get in Touch</h2>
              <p className="text-ink/60 text-lg mb-12">Have questions about our treatments? Our team is here to guide you on your skincare journey.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-widest text-xs mb-1">Location</div>
                    <div className="text-ink/70">Plot No. 45, MG Road, Sector 18<br />Gurgaon, Haryana 122001</div>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-widest text-xs mb-1">Phone</div>
                    <div className="text-ink/70">+91 98765 43210</div>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-widest text-xs mb-1">Email</div>
                    <div className="text-ink/70">hello@seemaclinic.com</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-cream transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-cream p-10 rounded-[40px]">
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for your message! Our team will get back to you shortly.");
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">First Name</label>
                    <input required type="text" className="w-full bg-white border-none rounded-xl p-4 outline-none focus:ring-2 ring-gold/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Last Name</label>
                    <input required type="text" className="w-full bg-white border-none rounded-xl p-4 outline-none focus:ring-2 ring-gold/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Email Address</label>
                  <input required type="email" className="w-full bg-white border-none rounded-xl p-4 outline-none focus:ring-2 ring-gold/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Message</label>
                  <textarea required rows={4} className="w-full bg-white border-none rounded-xl p-4 outline-none focus:ring-2 ring-gold/20 resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-ink text-cream rounded-full font-bold tracking-widest uppercase hover:bg-ink/90 transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-ink text-cream/40 border-t border-cream/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif tracking-widest uppercase text-cream">Seema Clinic</span>
            </div>
            <div className="flex gap-10 text-xs font-bold tracking-widest uppercase">
              <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-cream transition-colors">Careers</a>
            </div>
            <div className="text-xs">
              © 2026 Seema Clinic. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
