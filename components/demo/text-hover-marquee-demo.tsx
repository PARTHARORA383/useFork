import { TextHoverMarquee } from '@/components/text-hover-marquee';

export function TextHoverMarqueeDemo() {
  return (
    <div>
      <TextHoverMarquee heading="INDIA" texts={['Maharashtra', 'Gujarat', 'Karnataka']} />

      <TextHoverMarquee heading="CANADA" texts={['Ontario', 'Alberta', 'Manitoba']} />

      <TextHoverMarquee heading="BRAZIL" texts={['São Paulo', 'Bahia', 'Paraná']} />

      <TextHoverMarquee heading="FRANCE" texts={['Île-de-France', 'Normandy', 'Brittany']} />

      <TextHoverMarquee heading="JAPAN" texts={['Hokkaido', 'Osaka', 'Fukuoka']} />
    </div>
  );
}
