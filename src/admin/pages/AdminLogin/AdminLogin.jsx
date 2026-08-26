import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { adminLogin } from "../../services/adminApi";

import "./AdminLogin.css";


function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleSubmit(event) {

    event.preventDefault();

    setError("");

    if (!username || !password) {

      setError(
        "Please enter your username and password."
      );

      return;
    }


    try {

      setLoading(true);

      console.log(
        "Attempting admin login..."
      );


      await adminLogin(
        username,
        password
      );


      console.log(
        "Admin login successful."
      );


      navigate(
        "/admin/dashboard"
      );

    } catch (error) {

      console.error(
        "ADMIN LOGIN ERROR:",
        error
      );

      setError(
        error.message ||
        "Unable to sign in."
      );

    } finally {

      setLoading(false);

    }

  }


  return (

    <main className="admin-login">

      {/* =====================================================
          ANIMATED BACKGROUND
      ===================================================== */}

      <div className="admin-login__background">

        <div className="admin-login__orb admin-login__orb--one" />

        <div className="admin-login__orb admin-login__orb--two" />

        <div className="admin-login__orb admin-login__orb--three" />

        <div className="admin-login__grid" />

      </div>


      {/* =====================================================
          FLOATING LEAVES
      ===================================================== */}

      <div className="admin-login__leaves">

        <Leaf
          className="leaf leaf--one"
          size={26}
        />

        <Leaf
          className="leaf leaf--two"
          size={18}
        />

        <Leaf
          className="leaf leaf--three"
          size={32}
        />

        <Leaf
          className="leaf leaf--four"
          size={20}
        />

        <Leaf
          className="leaf leaf--five"
          size={24}
        />

      </div>


      {/* =====================================================
          LOGIN CONTENT
      ===================================================== */}

      <section className="admin-login__content">


        {/* BRAND */}

        <div className="admin-login__brand">

          <div className="admin-login__logo">

            <span>LG</span>

            <div className="admin-login__logo-ring" />

          </div>


          <div className="admin-login__brand-text">

            <strong>
              LEAFYGREENDZ
            </strong>

            <span>
              ADMINISTRATION
            </span>

          </div>

        </div>


        {/* LOGIN CARD */}

        <div className="admin-login__card">


          <div className="admin-login__card-glow" />


          {/* CARD HEADER */}

          <div className="admin-login__header">

            <div className="admin-login__badge">

              <span />

              SECURE ACCESS

            </div>


            <h1>
              Welcome back
            </h1>


            <p>
              Sign in to manage your
              LEAFYGREENDZ store.
            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div className="admin-login__error">

              <span className="admin-login__error-dot" />

              {error}

            </div>

          )}


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="admin-login__form"
          >


            {/* USERNAME */}

            <div className="admin-login__field">

              <label htmlFor="username">
                Username
              </label>

              <div className="admin-login__input">

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(
                      event.target.value
                    )
                  }
                  placeholder="Enter your username"
                  autoComplete="username"
                  disabled={loading}
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="admin-login__field">

              <label htmlFor="password">
                Password
              </label>

              <div className="admin-login__input">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                />


                <button
                  type="button"
                  className="admin-login__password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (

                    <EyeOff size={18} />

                  ) : (

                    <Eye size={18} />

                  )}

                </button>

              </div>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className={`admin-login__submit ${
                loading
                  ? "admin-login__submit--loading"
                  : ""
              }`}
              disabled={loading}
            >

              {loading ? (

                <>

                  <span className="admin-login__spinner" />

                  Signing in...

                </>

              ) : (

                <>

                  Sign in

                  <ArrowRight
                    size={18}
                    strokeWidth={2}
                  />

                </>

              )}

            </button>

          </form>


          {/* FOOTER */}

          <div className="admin-login__footer">

            <span />

            <p>
              Authorized administrators only
            </p>

            <span />

          </div>

        </div>


        {/* COPYRIGHT */}

        <p className="admin-login__copyright">

          © {new Date().getFullYear()}
          {" "}
          LEAFYGREENDZ.
          {" "}
          All rights reserved.

        </p>

        <p className="admin-login__credit">

          Designed & Developed by
          {" "}
          <strong>Balora</strong>

        </p>


      </section>

    </main>

  );

}


export default AdminLogin;