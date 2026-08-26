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
    <section className="mx-auto  grid max-w-5xl grid-cols-1 items-center gap-20 px-8 py-28 lg:grid-cols-2">
      <img
        src={src}
        alt={title}
        className={`h-[650px] w-full object-cover ${
          reverse ? "order-first lg:order-2" : ""
        }`}
      />

      <div
        className={`mx-auto max-w-md text-center ${
          reverse ? "lg:order-1" : ""
        }`}
      >
        <p className="mb-4 uppercase tracking-[0.25em] text-gray-500">
          {type}
        </p>

        <h2 className="text-5xl font-light uppercase">
          {title}
        </h2>

        <p className="mt-8 leading-8 text-gray-600">
          {description}
        </p>

        <a
          href={href}
          className="mt-8 inline-block border-b border-black pb-1 uppercase tracking-[0.2em]"
        >
          {linkText}
        </a>
      </div>
    </section>
  );
}