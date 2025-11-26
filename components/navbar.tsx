import Link from 'next/link';
import NoiseWrapper from './noise-wrapper';
import { NavigationMenu } from './navigation-menu';

export function CustomNavbar() {
  return (
    <NoiseWrapper>
      <div className="w-screen fixed top-0 h-10 flex items-center justify-between  left-0 border-b bg-muted z-20">
        <h1 className="pl-12 ">
          <Link href={'/'}>useFork</Link>
        </h1>
        <div className="pr-8">
          <NavigationMenu />
        </div>
      </div>
    </NoiseWrapper>
  );
}
