import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const navigate = useNavigate();
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initial Intro Animation (Vertical)
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#intro",
        start: "top top",
        end: "+=1000",
        scrub: 1,
        pin: true,
      }
    });

    introTl.to("#intro-text-1", { opacity: 0, y: -50, duration: 1 })
           .fromTo("#intro-text-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
           .to("#intro-text-2", { opacity: 0, scale: 1.5, duration: 1 }, "+=0.5");

    // 2. Horizontal Scroll Animation
    if (horizontalSectionRef.current && textWrapperRef.current) {
      const getScrollAmount = () => {
        let horizontalWidth = textWrapperRef.current?.scrollWidth || 0;
        return -(horizontalWidth - window.innerWidth);
      };

      const tween = gsap.to(textWrapperRef.current, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: horizontalSectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-emerald-950 text-white font-sans overflow-x-hidden">
      
      {/* Section 1: Intro */}
      <div id="intro" className="h-screen flex items-center justify-center relative flex-col">
        <h1 id="intro-text-1" className="text-5xl md:text-7xl font-bold absolute text-center px-4">
          Welcome to GroceryPro
        </h1>
        <h1 id="intro-text-2" className="text-5xl md:text-7xl font-bold absolute text-center px-4 opacity-0 text-emerald-400">
          The Ultimate DBMS
        </h1>
        <div className="absolute bottom-10 animate-bounce">
          <p className="text-sm text-emerald-300 mb-2 font-semibold text-center">Scroll Down</p>
          <svg className="w-6 h-6 text-emerald-400 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* Section 2: Horizontal Scroll */}
      <div ref={horizontalSectionRef} className="h-screen flex items-center bg-emerald-900 overflow-hidden border-y border-emerald-800">
        <div ref={textWrapperRef} className="flex whitespace-nowrap px-[10vw] items-center space-x-32 h-full">
          <h2 className="text-6xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-500">
            MANAGE INVENTORY
          </h2>
          <h2 className="text-6xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-500">
            TRACK SALES
          </h2>
          <h2 className="text-6xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-emerald-500">
            HANDLE SUPPLIERS
          </h2>
          <h2 className="text-6xl md:text-9xl font-extrabold text-white">
            SEAMLESSLY.
          </h2>
        </div>
      </div>

      {/* Section 3: Call to Action */}
      <div className="h-screen flex flex-col items-center justify-center bg-emerald-950 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 z-10">Ready to dive into the Database?</h2>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full text-2xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.5)] z-10 flex items-center space-x-3"
        >
          <span>Enter Dashboard</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default HomePage;
