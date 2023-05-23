export default function Root() {
  return (
    <>
      <div id="sidebar" className="flex flex-col mb-5">
        <div className="flex justify-center mb-5">
          <div className="flex-shrink-0">
            <a href={`/`} className="hover:no-underline">
              <img
                className="h-24"
                src="https://plantvsundead.com/_nuxt/img/logo.efc0781.svg"
                alt="Logo"
              />
            </a>
          </div>
        </div>
        <nav>
          <ul className="flex flex-row justify-between m-5">
            <li className="border rounded-md p-2 border-orange-400 hover:bg-orange-400">
              <a href={`/calculator`} className="hover:no-underline">
                Calculator
              </a>
            </li>
            <li className="border rounded-md p-2 border-violet-400 hover:bg-violet-400">
              <a href={`/plants`} className="hover:no-underline">
                Plants
              </a>
            </li>
            <li className="border rounded-md p-2 border-orange-400 hover:bg-orange-400">
              <a href={`/decorations`} className="hover:no-underline">
                Decorations
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
