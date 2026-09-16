import { useState } from "react";

export default function LocationForm() {
  const locations = [
    {
      name: "Paris",
      address: "31 Rue Cambon",
      city: "75001 Paris, France",
      map: "https://www.google.com/maps?q=31%20Rue%20Cambon%2C%2075001%20Paris%2C%20France&output=embed",
    },
    {
      name: "London",
      address: "158 New Bond Street",
      city: "London W1S 2NA, UK",
      map: "https://www.google.com/maps?q=158%20New%20Bond%20Street%2C%20London%20W1S%202NA%2C%20UK&output=embed",
    },
    {
      name: "New York",
      address: "15 East 57th Street",
      city: "New York, NY 10022",
      map: "https://www.google.com/maps?q=15%20East%2057th%20Street%2C%20New%20York%2C%20NY%2010022&output=embed",
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <section className="w-full bg-black px-6 py-16 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">
          <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-neutral-500">
            Visit Us
          </p>

          <h2 className="text-[28px] font-light tracking-[-0.02em] md:text-[32px]">
            Our Locations
          </h2>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="h-[280px] w-full md:h-[360px]">
            <iframe
              key={selectedLocation.name}
              title={`${selectedLocation.name} Chanel Location`}
              src={selectedLocation.map}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {locations.map((location) => (
              <div
                key={location.name}
                className="text-center"
              >
                <h3 className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white">
                  {location.name}
                </h3>

                <p className="mb-5 text-[11px] leading-5 text-neutral-400">
                  {location.address}
                  <br />
                  {location.city}
                </p>

                <button
                  onClick={() => setSelectedLocation(location)}
                  className={`border-b pb-1 text-[9px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    selectedLocation.name === location.name
                      ? "border-white text-white"
                      : "border-transparent text-neutral-500 hover:border-white hover:text-white"
                  }`}
                >
                  View Location
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}