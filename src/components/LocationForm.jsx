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
    <section className="w-full px-6 py-24 md:px-16">
      <div className="mb-16 text-center">
        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-neutral-500">
          Visit Us
        </p>

        <h2 className="text-3xl font-light tracking-[0.08em] md:text-4xl">
          Our Locations
        </h2>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="w-full">
          <iframe
            key={selectedLocation.name}
            title={`${selectedLocation.name} Chanel Location`}
            src={selectedLocation.map}
            className="h-[400px] w-full border-0 md:h-[550px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3">
          {locations.map((location) => (
            <div
              key={location.name}
              className="text-center"
            >
              <h3 className="mb-4 text-sm uppercase tracking-[0.2em]">
                {location.name}
              </h3>

              <p className="mb-6 text-sm leading-6 text-neutral-600">
                {location.address}
                <br />
                {location.city}
              </p>

              <button
                onClick={() => setSelectedLocation(location)}
                className={`border-b pb-1 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  selectedLocation.name === location.name
                    ? "border-black"
                    : "border-transparent hover:border-black"
                }`}
              >
                View Location
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}