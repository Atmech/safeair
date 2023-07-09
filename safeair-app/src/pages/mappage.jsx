import Image from 'next/image'
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false,
});

export default function mappage() {
  return (
    <main>
      <MapWithNoSSR />
    </main>
  )
}
