import Link from "next/link";
import NoiseWrapper from "./noise-wrapper";


export function CustomNavbar(){

  return(
    <NoiseWrapper>
    <div className="w-screen fixed top-0 h-11 flex items-center justify-center  left-0 border-b bg-muted z-20">

      <h1 className="pl-4 text-lg font-medium">
       <Link href={'/'}>    
        useFork
       </Link>
      </h1>

    </div>
    </NoiseWrapper>
  )
}