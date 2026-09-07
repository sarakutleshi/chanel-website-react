export default function EditorialCard({
  src,
  type,
  title,
  description,
  href,
  linkText,
  reverse = false,
}) {
  return (
    <section className="mx-auto  grid max-w-5xl grid-cols-1 items-center gap-20 px-10 py-10 lg:grid-cols-2">
      <img
        src={src}
        alt={title}
        className={`h-[500px] w-full object-cover ${
          reverse ? "order-first lg:order-2" : ""
        }`}
      />

      <div
        className={`mx-auto max-w-md text-center ${
          reverse ? "lg:order-1" : ""
        }`}
      >
        <p className="mb-2 tracking-[0.2em] uppercase">
          {type}
        </p>

        <h2 className="text-4xl font-light uppercase">
          {title}
        </h2>

        <p className="mt-4 leading-8 text-gray-600">
          {description}
        </p>

        <a
          href={href}
          className="mt-2 inline-block border-b border-black pb-1 uppercase tracking-[0.2em]"
        >
          {linkText}
        </a>
      </div>
    </section>
  );
}