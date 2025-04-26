export function IntroSection() {
  return (
    <section className="">
      <div className="relative hidden h-full w-full md:block">
        <img
          className="block h-full w-full object-cover object-center"
          src="https://akkeknitwear.com/website/wp-content/uploads/2023/11/AkkeWorld-1-800x400.webp"
        />
      </div>
      <div className="relative block h-full w-full md:hidden">
        <img src="https://akkeknitwear.com/website/wp-content/uploads/2023/11/AkkeWorld-1-2-800x545.webp" />
      </div>
    </section>
  );
}
