export function IntroSection({ isSP }) {
  return (
    <section className="relative h-auto w-full md:h-screen">
      <div className="relative h-full w-full">
        <img
          className="block h-full w-full object-cover object-center"
          src={
            isSP
              ? "https://akkeknitwear.com/website/wp-content/uploads/2023/11/AkkeWorld-1-2.jpg"
              : "https://akkeknitwear.com/website/wp-content/uploads/2023/11/AkkeWorld-1.jpg"
          }
        />
      </div>
    </section>
  );
}
