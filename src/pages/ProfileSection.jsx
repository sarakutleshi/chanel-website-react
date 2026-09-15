import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function getStoredUser() {
  try {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) return JSON.parse(loggedInUser);

    const registeredUser = localStorage.getItem("registeredUser");
    if (registeredUser) return JSON.parse(registeredUser);
  } catch {
    return null;
  }

  return null;
}

export default function Profile() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const user = getStoredUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Guest";

  const fields = [
    { label: "First Name", value: user?.firstName },
    { label: "Last Name", value: user?.lastName },
    { label: "Username", value: user?.username },
    { label: "Email", value: user?.email },
  ].filter((field) => field.value);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white text-neutral-900">
        <div className="border-b border-neutral-200 px-4 py-10 text-center sm:px-6 md:px-10 md:py-14">
          <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-neutral-400">
            My Account
          </p>
          <h1 className="font-serif text-3xl font-light tracking-wide md:text-4xl">
            My Profile
          </h1>
        </div>

        <main className="mx-auto max-w-[720px] px-4 py-10 sm:px-6 md:py-16">
          <div className="border border-neutral-200 p-6 sm:p-8">
            <div className="flex flex-col items-center gap-4 border-b border-neutral-200 pb-8 text-center sm:flex-row sm:text-left">
              {user?.image ? (
                <img
                  src={user.image}
                  alt=""
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 font-serif text-2xl text-neutral-500">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400">
                  Welcome back
                </p>
                <h2 className="mt-1 font-serif text-2xl font-light">{displayName}</h2>
                {user?.email && (
                  <p className="mt-1 text-sm text-neutral-500">{user.email}</p>
                )}
              </div>
            </div>

            {fields.length > 0 ? (
              <dl className="mt-8 space-y-5">
                {fields.map((field) => (
                  <div
                    key={field.label}
                    className="border-b border-neutral-100 pb-5 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-[9px] uppercase tracking-[0.22em] text-neutral-400">
                      {field.label}
                    </dt>
                    <dd className="mt-2 text-sm text-neutral-800">{field.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-8 text-sm leading-7 text-neutral-500">
                Your profile details will appear here after you sign in or
                register.
              </p>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="flex-1 border border-black bg-black px-6 py-3.5 text-center text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-neutral-800"
              >
                Continue Shopping
              </Link>

              <Link
                to="/cart"
                className="flex-1 border border-neutral-300 px-6 py-3.5 text-center text-[10px] uppercase tracking-[0.2em] transition-colors hover:border-neutral-900"
              >
                View Bag
              </Link>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 w-full py-3 text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900"
            >
              Log Out
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
