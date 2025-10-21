import NoiseWrapper from "./noise-wrapper";
import { LargeSearchToggle, SearchToggle } from "./search-toggle";
import { ThemeToggle } from "./theme-toggle";


export function CustomNavbar(){

  return(
    <NoiseWrapper>

    <div className="w-screen fixed top-0 h-10 flex items-center justify-between  left-0 border-b bg-muted z-50">

      <h1 className="pl-4 text-lg font-medium">
        useFork
      </h1>

      <div className="flex items-center gap-4 pr-8">
      <div>
        <NoiseWrapper className="rounded-xl">
        <LargeSearchToggle/>
        </NoiseWrapper>
      </div>
      <div>
        <NoiseWrapper className="rounded-xl">
        <ThemeToggle/>
        </NoiseWrapper>
      </div>
      </div>
    </div>
    </NoiseWrapper>
  )
}