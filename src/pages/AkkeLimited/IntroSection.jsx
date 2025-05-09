export function IntroSection() {
  return (
    <section className="relative h-screen w-full">
      <div className="relative hidden h-full w-full md:block">
        <img
          className="block h-full w-full object-cover object-center"
          src="https://akkeknitwear.com/website/wp-content/uploads/2023/11/AkkeWorld-1.jpg"
        />
      </div>
      <div className="relative block h-full w-full md:hidden">
        <img src="https://akkeknitwear.com/website/wp-content/uploads/2023/11/AkkeWorld-1-2.jpg" />
      </div>
    </section>
  );
}
