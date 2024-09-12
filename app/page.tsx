import dynamic from 'next/dynamic';

const Home = dynamic(() => import('./home/page'));

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      < Home />
    </main>
  );
}
 