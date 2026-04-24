import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { BentoGrid, BentoItem, FlashCard } from "@/components/InteractiveElements";
import { DynamicQuoting } from "@/components/DynamicQuoting";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="bg-mesh"></div>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="glass" style={{ padding: '4rem', borderRadius: '40px', textAlign: 'center', maxWidth: '1000px' }}>
          <h1 style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '1.5rem', fontWeight: '900' }}>
            Next-Gen <span style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 20px var(--primary))' }}>Sanitization</span>
          </h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.8, marginBottom: '2.5rem' }}>
            2026 Enterprise-grade hygiene powered by autonomous systems and self-learning optimization.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="glass" style={{ padding: '1.2rem 2.5rem', borderRadius: '15px', fontWeight: 'bold', background: 'var(--primary)', color: 'white' }}>
              Launch Quote
            </button>
            <button className="glass" style={{ padding: '1.2rem 2.5rem', borderRadius: '15px', fontWeight: 'bold' }}>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Quoting Section */}
      <DynamicQuoting />

      {/* Feature Bento Grid */}
      <section style={{ padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Enterprise <span style={{ color: 'var(--secondary)' }}>Core</span> Capabilities</h2>
        <BentoGrid>
          <BentoItem style={{ padding: '2rem' }}>
            <div style={{ fontSize: '3rem' }}>🤖</div>
            <h3>Autonomous Logistics</h3>
            <p>Our fleet of sanitization bots operates 24/7 with zero human intervention required.</p>
          </BentoItem>
          <BentoItem style={{ padding: '2rem' }}>
            <div style={{ fontSize: '3rem' }}>🌍</div>
            <h3>AEO Optimized</h3>
            <p>Optimized for the next generation of Answer Engines and Generative Search.</p>
          </BentoItem>
          <BentoItem span={2} style={{ padding: '2rem' }}>
            <div style={{ fontSize: '3rem' }}>📊</div>
            <h3>Real-time Analytics</h3>
            <p>Monitor your facility's health markers via our enterprise dashboard with millisecond precision.</p>
          </BentoItem>
        </BentoGrid>
      </section>

      {/* Client Case Studies Section */}
      <section style={{ padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Proven <span style={{ color: 'var(--primary)' }}>Results</span></h2>
        <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem', scrollSnapType: 'x mandatory' }}>
          {[
            { quote: "NAVYA MYTHOS reduced our pathogen load by 99.9% while cutting operational costs in half.", author: "Director of Facilities, TechCorp Alpha", metric: "50% Cost Reduction" },
            { quote: "The autonomous fleet integrates seamlessly with our security protocols. Invisible yet highly effective.", author: "Operations Lead, Global Logistics Hub", metric: "Zero Downtime" },
            { quote: "Their AEO optimization means we have verifiable hygiene data for our audits instantly.", author: "Compliance Officer, BioMed Solutions", metric: "100% Audit Pass" }
          ].map((testimonial, i) => (
            <div key={i} className="glass" style={{ minWidth: '350px', padding: '2.5rem', borderRadius: '24px', scrollSnapAlign: 'start', flex: '0 0 auto' }}>
              <div style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }}>“</div>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem', fontStyle: 'italic' }}>{testimonial.quote}</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                <p style={{ fontWeight: 'bold' }}>{testimonial.author}</p>
                <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{testimonial.metric}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Flash Cards */}
      <section style={{ padding: '4rem 2rem', background: 'rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Trust & <span style={{ color: 'var(--accent)' }}>Assurance</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <FlashCard 
            front={
              <div>
                <h3>Is it safe for pets?</h3>
                <p style={{ opacity: 0.7 }}>Hover to reveal</p>
              </div>
            }
            back={
              <div>
                <h3>100% Bio-Safe</h3>
                <p>We use molecular-grade solutions that are certified non-toxic for all biological entities.</p>
              </div>
            }
          />
          <FlashCard 
            front={
              <div>
                <h3>Emergency Response?</h3>
                <p style={{ opacity: 0.7 }}>Hover to reveal</p>
              </div>
            }
            back={
              <div>
                <h3>Under 2 Hours</h3>
                <p>Our rapid deployment teams are strategically positioned for instantaneous response.</p>
              </div>
            }
          />
          <FlashCard 
            front={
              <div>
                <h3>2026 Compliance?</h3>
                <p style={{ opacity: 0.7 }}>Hover to reveal</p>
              </div>
            }
            back={
              <div>
                <h3>ISO-2026-X</h3>
                <p>Exceeding all future safety and environmental standards established for the next decade.</p>
              </div>
            }
          />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '6rem 2rem', textAlign: 'center', opacity: 0.6 }}>
        <p>© 2026 NAVYA MYTHOS Enterprise Sanitization. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
