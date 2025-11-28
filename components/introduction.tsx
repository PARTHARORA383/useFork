
import { Marquee } from './ui/marquee';

export function Introduction() {
  return (
    <div className="flex flex-col items-center  lg:items-start gap-10 lg:gap-12">
      <Description />
      <Libraries_Stacks />
      <About />
      <InspirationFrom />
    </div>
  )
}

function Description() {
  return (
    <div className="w-full lg:max-w-3xl flex flex-col items-start px-4 lg:px-0">
      <h1 className="text-xl lg:text-3xl text-muted-foreground font-medium mb-0 lg:mb-2">
        Introduction
      </h1>
      <p className="lg:text-xl leading-relaxed tracking-wide">
        useFork is a Next.js UI component library featuring reimagined web components,
        from minimal designs to interactive elements, built with Motion and TailwindCSS.
      </p>
    </div>
  )
}


function Libraries_Stacks() {
  return (
    <div>
      <section className="">
        <div className="text-center text-gray-400 uppercase text-sm tracking-widest ">
          Libraries & Stacks
        </div>

        <div className="flex justify-center items-center gap-12">

          <img className="h-4 lg:h-5" alt="Tailwind css" src="https://dqbr6kzn27lfn.cloudfront.net/logos/tailwind.svg" style={{ filter: "var(--invert)" }} />

          <span className="flex items-center justify-center gap-2 text-lg font-medium">
            {NextJSLogo}
            <span>NextJs</span>
          </span>

          <span className="flex items-center justify-center gap-2 text-lg font-medium">
            {motionLogo}
            <span>Motion</span>
          </span>


          <span className="flex items-center justify-center gap-2 text-lg font-medium">
            {ReactLogo}
            <span>ReactJs</span>
          </span>

          <span className="flex items-center justify-center gap-2 text-lg font-medium">
            {ShadcnLogo}
            <span>Shadcn UI</span>
          </span>

        </div>
      </section>

    </div>
  )
}




export function About() {
  const aboutList = [
    {
      title: "Open Code",
      description:
        "The top layer of our component library is open for modification, letting you adapt it to your needs.",
    },
    {
      title: "Composition",
      description:
        "Components are designed with a common, composable interface for predictability and reusability, though some complex ones involve heavy animations.",
    },
    {
      title: "Distribution",
      description:
        "We use Shadcn's code distribution system with a simple CLI for installation, making it easy to include components in your projects. We also attach the manual installation so you can read the code before installing.",
    },
  ];

  return (
    <section className="w-full lg:max-w-3xl   px-4 lg:px-0">
      <h1 className="text-lg lg:text-2xl text-muted-foreground font-medium mb-2 lg:mb-6">
        Highlights
      </h1>
      <ul className="flex flex-col gap-6 lg:text-lg">
        {aboutList.map((item, idx) => (
          <li key={idx} className="flex flex-col gap-1">
            <span className="font-semibold ">{item.title}</span>
            <span className="text-muted-foreground">{item.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function InspirationFrom() {
  
  const creators = [
    { name: "Emil Kowalski", link: "https://x.com/emilkowalski" },
    { name: "Jakub Krehel", link: "https://x.com/jakubkrehel" },
    { name: "Nitish Khagwal", link: "https://x.com/nitishkmrk" },
    { name: "Guri", link: "https://x.com/Gur__vi" },
    { name: "Rauno freiberg", link: "https://x.com/raunofreiberg" },
    { name: "Manu Arora", link: "https://x.com/@mannupaaji" },
    { name: "Dillion", link: "https://x.com/@dillionverma"}
  ];

  return (
    <div className="lg:max-w-3xl ">

      <div className="text-center text-muted-foreground uppercase text-sm tracking-widest mb-5 ">
        Inspired from Engineers and Websites
      </div>

      <Marquee pauseOnHover className="[--duration:20s] ">
        {creators.map((c, idx) => (
          <a
            key={idx}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className=" text-lg font-medium no-underline hover:underline mx-4"
          >
            {c.name}
          </a>
        ))}
      </Marquee>

    </div>
  )

}



const ReactLogo = <svg
  className="h-6 w-6"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="-11.5 -10.23174 23 20.46348"
  width="100"
  height="100"
  fill="none"
  stroke="currentColor"
  strokeWidth="1"
>
  <circle r="2.05" />
  <g>
    <ellipse rx="11" ry="4.2" />
    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
  </g>
</svg>

const ShadcnLogo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="size-5"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></line></svg>

const NextJSLogo = <svg aria-label="Next.js logomark" className="next-mark-module__boTfIW__root" height="30" role="img" viewBox="0 0 180 180" width="30" color="white"><mask height="180" id="_S_1_mask0_408_134" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}><circle cx="90" cy="90" fill="black" r="90"></circle></mask><g mask="url(#_S_1_mask0_408_134)"><circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#_S_1_paint0_linear_408_134)"></path><rect fill="url(#_S_1_paint1_linear_408_134)" height="72" width="12" x="115" y="54"></rect></g><defs><linearGradient gradientUnits="userSpaceOnUse" id="_S_1_paint0_linear_408_134" x1="109" x2="144.5" y1="116.5" y2="160.5"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="_S_1_paint1_linear_408_134" x1="121" x2="120.799" y1="54" y2="106.875"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient></defs></svg>


const motionLogo = <svg className="h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1103 386"><path fill="#FFF312" d="M416.473 0 198.54 385.66H0L170.17 84.522C196.549 37.842 262.377 0 317.203 0Zm486.875 96.415c0-53.249 44.444-96.415 99.27-96.415 54.826 0 99.27 43.166 99.27 96.415 0 53.248-44.444 96.415-99.27 96.415-54.826 0-99.27-43.167-99.27-96.415ZM453.699 0h198.54L434.306 385.66h-198.54Zm234.492 0h198.542L716.56 301.138c-26.378 46.68-92.207 84.522-147.032 84.522h-99.27Z"></path></svg>