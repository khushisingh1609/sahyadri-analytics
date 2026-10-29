"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDept, setOpenDept] = useState('Cardiology');

  const departments = [
    {
      id: '01',
      title: 'Cardiology',
      desc: 'Comprehensive heart care including diagnosis, preventive care, and treatment for cardiovascular conditions.',
      points: [
        'Heart health assessments',
        'Preventive cardiology',
        'Hypertension management',
        'Cardiac diagnostics'
      ]
    },
    {
      id: '02',
      title: 'Neurology',
      desc: 'Specialized care for conditions affecting the brain, spine, and nervous system.',
      points: [
        'Neurological evaluation',
        'Headache and migraine care',
        'Stroke-related care',
        'Nervous system disorders'
      ]
    },
    {
      id: '03',
      title: 'Orthopedics',
      desc: 'Focused care for bones, joints, muscles, and movement-related conditions.',
      points: [
        'Joint and bone evaluation',
        'Sports injuries',
        'Fracture care',
        'Rehabilitation support'
      ]
    },
    {
      id: '04',
      title: 'General Medicine',
      desc: 'Comprehensive medical care for common illnesses, chronic conditions, and overall adult health.',
      points: [
        'General health evaluation',
        'Chronic condition management',
        'Preventive care',
        'Diagnostic assessment'
      ]
    },
    {
      id: '05',
      title: 'Pediatrics',
      desc: 'Compassionate healthcare for infants, children, and adolescents.',
      points: [
        'Child health checkups',
        'Childhood illness care',
        'Growth monitoring',
        'Preventive healthcare'
      ]
    },
    {
      id: '06',
      title: 'Radiology',
      desc: 'Diagnostic imaging services that support accurate and timely medical evaluation.',
      points: [
        'X-ray imaging',
        'Ultrasound',
        'CT imaging',
        'Diagnostic support'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-hospital-bg">
      
      {/* ================= HEADER / NAVIGATION ================= */}
      <header className="sticky top-0 z-50 w-full bg-hospital-bg border-b border-hospital-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-[84px] flex items-center justify-between">
          
          {/* Left: Brand Identity */}
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/logo.png" 
                alt="Sahyadri Hospital Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
              <span className="text-xl font-bold text-hospital-primary tracking-tight">
                SAHYADRI HOSPITAL
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation (Compact Spacing) */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
            {['Home', 'About', 'Departments', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-hospital-charcoal hover:text-hospital-primary relative group font-medium text-[15px] transition-colors py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-hospital-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right: Login CTA & Mobile Toggle */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <Link 
              href="/login" 
              className="hidden md:inline-flex items-center justify-center px-6 py-[12px] bg-hospital-cta text-white text-[15px] font-semibold rounded-md hover:bg-hospital-accent transition-colors"
            >
              LOGIN
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-hospital-charcoal"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-hospital-bg border-b border-hospital-border px-6 py-6 flex flex-col gap-6 shadow-sm">
            {['Home', 'About', 'Departments', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-hospital-charcoal font-medium text-lg" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center px-6 py-4 mt-2 bg-hospital-cta text-white font-semibold rounded-md text-center w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              LOGIN
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* ================= HERO SECTION ================= */}
        <section id="home" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-[45%] flex flex-col items-start">
            <span className="text-hospital-secondary text-xs font-bold tracking-widest uppercase mb-4">
              Compassionate Healthcare
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-hospital-primary leading-[1.1] tracking-tight mb-6">
              Care that feels<br />connected.
            </h1>
            <p className="text-lg text-hospital-charcoal leading-relaxed mb-10 max-w-lg">
              Bringing patients, doctors, and hospital teams together through a more connected healthcare experience.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Link 
                href="#departments" 
                className="w-full sm:w-auto px-8 py-4 bg-hospital-primary text-white font-medium rounded-md hover:bg-hospital-secondary transition-colors text-center"
              >
                Explore Departments
              </Link>
              <Link 
                href="#about" 
                className="w-full sm:w-auto text-hospital-charcoal font-medium hover:text-hospital-cta transition-colors text-center group flex items-center justify-center gap-2"
              >
                Learn more 
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-[55%]">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-hospital-border shadow-sm">
              <Image 
                src="/healing-together.jpg" 
                alt="Medical team working together in an operating room" 
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>
        </section>

        {/* ================= DEPARTMENTS SECTION (ACCORDION) ================= */}
        <section id="departments" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 border-t border-hospital-border">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            
            <div className="lg:w-[35%] lg:sticky lg:top-32">
              <span className="text-hospital-secondary text-xs font-bold tracking-widest uppercase mb-4 block">
                Our Expertise
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-hospital-primary mb-6 leading-tight">
                Specialized Care
              </h2>
              <div className="w-12 h-1 bg-hospital-accent mb-6"></div>
              <p className="text-hospital-charcoal text-lg leading-relaxed">
                Expertise across the departments that matter most. We provide comprehensive treatment tailored to your exact needs.
              </p>
            </div>

            <div className="lg:w-[60%] w-full flex flex-col border-t border-hospital-border">
              {departments.map((dept) => {
                const isOpen = openDept === dept.title;
                
                return (
                  <div key={dept.id} className="border-b border-hospital-border">
                    <button 
                      onClick={() => setOpenDept(isOpen ? '' : dept.title)}
                      className="w-full flex items-center justify-between py-6 md:py-8 group text-left transition-colors"
                    >
                      <div className="flex items-center gap-6 md:gap-10">
                        <span className="text-hospital-secondary font-medium text-sm md:text-base">
                          {dept.id}
                        </span>
                        <span className={`font-semibold text-xl md:text-2xl transition-colors ${isOpen ? 'text-hospital-accent' : 'text-hospital-primary group-hover:text-hospital-accent'}`}>
                          {dept.title}
                        </span>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-hospital-charcoal transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Accordion Content */}
                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="pl-[52px] md:pl-[64px] bg-hospital-light p-6 rounded-sm ml-0 md:ml-4">
                          <p className="text-hospital-primary font-medium text-[15px] leading-relaxed mb-4">
                            {dept.desc}
                          </p>
                          <ul className="space-y-2">
                            {dept.points.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-hospital-charcoal text-[15px]">
                                <span className="text-hospital-accent mt-0.5">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ================= MONITOR / CONNECTED CARE SECTION ================= */}
        <section id="about" className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 border-t border-hospital-border">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            
            <div className="w-full max-w-[260px] md:max-w-[300px] lg:max-w-[340px] shrink-0 aspect-[4/5] rounded-md border border-hospital-border overflow-hidden shadow-sm">
              <Image 
                src="/monitor.jpg" 
                alt="Hospital patient monitor" 
                width={340}
                height={425}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 260px, (max-width: 1024px) 300px, 340px"
              />
            </div>

            <div className="flex-1 flex flex-col items-start justify-center">
              <span className="text-hospital-secondary text-xs font-bold tracking-widest uppercase mb-4">
                Connected Care
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-hospital-primary leading-tight mb-6">
                Behind every decision.
              </h2>
              <div className="w-8 h-1 bg-hospital-accent mb-6"></div>
              <div className="space-y-4 text-hospital-charcoal text-lg leading-relaxed max-w-2xl">
                <p>
                  Modern healthcare requires more than medical expertise; it also depends on clear coordination between the people who care for patients.
                </p>
                <p>
                  Our connected hospital workflows help teams access the information they need and keep care moving smoothly.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact" className="w-full bg-hospital-light py-20 md:py-24 border-t border-hospital-border">
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            <span className="text-hospital-secondary text-xs font-bold tracking-widest uppercase mb-4 block">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-hospital-primary mb-4">
              Have a question?
            </h2>
            <p className="text-hospital-charcoal text-lg mb-12">
              We're here to help.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
              <div className="flex flex-col items-center">
                <span className="text-hospital-secondary font-bold mb-2">Sahyadri Hospital</span>
                <span className="text-hospital-charcoal text-[15px]">123 Health Avenue<br/>Medical District, MH 400001</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-hospital-secondary font-bold mb-2">Phone</span>
                <span className="text-hospital-charcoal text-[15px]">+91 800 123 4567<br/>Mon - Sun, 24/7</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-hospital-secondary font-bold mb-2">Email</span>
                <span className="text-hospital-charcoal text-[15px]">contact@sahyadri.com<br/>support@sahyadri.com</span>
              </div>
            </div>

            <Link href="#contact" className="px-8 py-3 bg-hospital-primary text-white font-medium rounded-md hover:bg-hospital-secondary transition-colors inline-block">
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="w-full bg-hospital-primary pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8 mb-16">
          
          <div className="flex flex-col max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 relative bg-white/10 rounded-sm flex items-center justify-center p-1">
                <Image 
                  src="/logo.png" 
                  alt="Sahyadri Hospital Logo" 
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                SAHYADRI HOSPITAL
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Providing compassionate, connected healthcare for our community with state-of-the-art facilities.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-white font-bold mb-2">Navigation</span>
            <Link href="#home" className="text-gray-300 hover:text-hospital-accent text-[15px] transition-colors">Home</Link>
            <Link href="#about" className="text-gray-300 hover:text-hospital-accent text-[15px] transition-colors">About</Link>
            <Link href="#departments" className="text-gray-300 hover:text-hospital-accent text-[15px] transition-colors">Departments</Link>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-white font-bold mb-2">Portals</span>
            <Link href="/login" className="text-gray-300 hover:text-hospital-accent text-[15px] transition-colors">Staff Login</Link>
            <Link href="#contact" className="text-gray-300 hover:text-hospital-accent text-[15px] transition-colors">Contact</Link>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sahyadri Hospital. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
          </div>
        </div>
      </footer>

    </div>
  );
}