import Link from 'next/link';
import Header from '@/components/Header';



export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header /> 

      <main>
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
              <h1>404</h1>
          </div>
        </section>
      </main>
    </div>
  );
}

