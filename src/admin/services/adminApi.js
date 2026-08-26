const API_BASE_URL =
  `${import.meta.env.VITE_API_URL}/api`;


// ============================================================
// ADMIN TOKEN
// ============================================================

const ADMIN_TOKEN_KEY =
  "leafygreendz-admin-token";


// ============================================================
// GET TOKEN
// ============================================================

function getAdminToken() {

  return localStorage.getItem(
    ADMIN_TOKEN_KEY
  );

}


// ============================================================
// SAVE TOKEN
// ============================================================

function saveAdminToken(token) {

  localStorage.setItem(
    ADMIN_TOKEN_KEY,
    token
  );

}


// ============================================================
// CLEAR TOKEN
// ============================================================

function clearAdminToken() {

  localStorage.removeItem(
    ADMIN_TOKEN_KEY
  );

}


// ============================================================
// ADMIN HEADERS
// ============================================================

function getAdminHeaders() {

  const token =
    getAdminToken();


  if (!token) {

    throw new Error(
      "You are not authenticated."
    );

  }


  return {

    Accept:
      "application/json",

    Authorization:
      `Token ${token}`,

  };

}


// ============================================================
// PARSE RESPONSE
// ============================================================

async function parseResponse(
  response
) {

  const contentType =
    response.headers.get(
      "content-type"
    );


  if (
    contentType &&
    contentType.includes(
      "application/json"
    )
  ) {

    return await response.json();

  }


  return null;

}


// ============================================================
// GET CSRF TOKEN
// ============================================================

async function getCsrfToken() {

  const response =
    await fetch(
      `${API_BASE_URL}/admin/auth/csrf/`,
      {
        method: "GET",

        credentials:
          "include",

        headers: {
          Accept:
            "application/json",
        },

      }
    );


  const data =
    await parseResponse(
      response
    );


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Unable to obtain CSRF token."
    );

  }


  if (!data?.csrfToken) {

    throw new Error(
      "Django did not return a CSRF token."
    );

  }


  return data.csrfToken;

}


// ============================================================
// ADMIN LOGIN
// ============================================================

export async function adminLogin(
  username,
  password
) {

  console.log(
    "ADMIN LOGIN REQUEST"
  );


  // ==========================================================
  // GET CSRF
  // ==========================================================

  const csrfToken =
    await getCsrfToken();


  console.log(
    "CSRF TOKEN RECEIVED"
  );


  // ==========================================================
  // LOGIN
  // ==========================================================

  const response =
    await fetch(
      `${API_BASE_URL}/admin/auth/login/`,
      {
        method: "POST",

        credentials:
          "include",

        headers: {

          "Content-Type":
            "application/json",

          Accept:
            "application/json",

          "X-CSRFToken":
            csrfToken,

        },

        body:
          JSON.stringify({
            username,
            password,
          }),

      }
    );


  const data =
    await parseResponse(
      response
    );


  console.log(
    "ADMIN LOGIN RESPONSE:",
    response.status,
    data
  );


  // ==========================================================
  // HANDLE LOGIN ERROR
  // ==========================================================

  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Login failed."
    );

  }


  // ==========================================================
  // CHECK TOKEN
  // ==========================================================

  if (!data?.token) {

    throw new Error(
      "Login succeeded but Django did not return an authentication token."
    );

  }


  // ==========================================================
  // SAVE TOKEN
  // ==========================================================

  saveAdminToken(
    data.token
  );


  console.log(
    "ADMIN TOKEN SAVED"
  );


  return data;

}


// ============================================================
// ADMIN DASHBOARD
// ============================================================

export async function getAdminDashboard() {

  console.log(
    "GETTING ADMIN DASHBOARD..."
  );


  const response =
    await fetch(
      `${API_BASE_URL}/admin/dashboard/`,
      {
        method: "GET",

        headers:
          getAdminHeaders(),

      }
    );


  const data =
    await parseResponse(
      response
    );


  console.log(
    "ADMIN DASHBOARD RESPONSE:",
    response.status,
    data
  );


  // ==========================================================
  // AUTH ERROR
  // ==========================================================

  if (
    response.status === 401 ||
    response.status === 403
  ) {

    clearAdminToken();

  }


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Failed to fetch admin dashboard."
    );

  }


  return data;

}


// ============================================================
// ADMIN LOGOUT
// ============================================================

export async function adminLogout() {

  console.log(
    "STARTING ADMIN LOGOUT..."
  );


  const token =
    getAdminToken();


  if (!token) {

    return true;

  }


  try {

    const response =
      await fetch(
        `${API_BASE_URL}/admin/auth/logout/`,
        {
          method: "POST",

          headers: {

            Accept:
              "application/json",

            Authorization:
              `Token ${token}`,

          },

        }
      );


    const data =
      await parseResponse(
        response
      );


    console.log(
      "ADMIN LOGOUT RESPONSE:",
      response.status,
      data
    );


  } catch (error) {

    console.error(
      "ADMIN LOGOUT ERROR:",
      error
    );

  } finally {

    clearAdminToken();

  }


  return true;

}


// ============================================================
// GET ADMIN BOOKS
// ============================================================

export async function getAdminBooks() {

  const response =
    await fetch(
      `${API_BASE_URL}/books/`,
      {
        method: "GET",

        headers:
          getAdminHeaders(),

      }
    );


  const data =
    await parseResponse(
      response
    );


  if (
    response.status === 401 ||
    response.status === 403
  ) {

    clearAdminToken();

  }


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Failed to fetch books."
    );

  }


  return Array.isArray(data)
    ? data
    : data?.results || [];

}


// ============================================================
// DELETE BOOK
// ============================================================

export async function deleteAdminBook(
  bookId
) {

  const csrfToken =
    await getCsrfToken();


  const response =
    await fetch(
      `${API_BASE_URL}/books/${bookId}/`,
      {
        method: "DELETE",

        credentials:
          "include",

        headers: {

          ...getAdminHeaders(),

          "X-CSRFToken":
            csrfToken,

        },

      }
    );


  const data =
    await parseResponse(
      response
    );


  if (
    response.status === 401 ||
    response.status === 403
  ) {

    clearAdminToken();

  }


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Failed to delete book."
    );

  }


  return true;

}


// ============================================================
// GET ADMIN ORDERS
// ============================================================

export async function getAdminOrders() {

  const response =
    await fetch(
      `${API_BASE_URL}/orders/admin/`,
      {
        method: "GET",

        headers:
          getAdminHeaders(),

      }
    );


  const data =
    await parseResponse(
      response
    );


  if (
    response.status === 401 ||
    response.status === 403
  ) {

    clearAdminToken();

  }


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Failed to fetch orders."
    );

  }


  return Array.isArray(data)
    ? data
    : data?.results || [];

}


// ============================================================
// GET ADMIN CONTACT MESSAGES
// ============================================================

export async function getAdminMessages() {

  const response =
    await fetch(
      `${API_BASE_URL}/contact/admin/`,
      {
        method: "GET",

        headers:
          getAdminHeaders(),

      }
    );


  const data =
    await parseResponse(
      response
    );


  if (
    response.status === 401 ||
    response.status === 403
  ) {

    clearAdminToken();

  }


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Failed to fetch messages."
    );

  }


  return Array.isArray(data)
    ? data
    : data?.results || [];

}


// ============================================================
// GET SINGLE ADMIN MESSAGE
// ============================================================

export async function getAdminMessage(
  messageId
) {

  const response =
    await fetch(
      `${API_BASE_URL}/contact/admin/${messageId}/`,
      {
        method: "GET",

        headers:
          getAdminHeaders(),

      }
    );


  const data =
    await parseResponse(
      response
    );


  if (
    response.status === 401 ||
    response.status === 403
  ) {

    clearAdminToken();

  }


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Failed to fetch message."
    );

  }


  return data;

}


// ============================================================
// UPDATE ADMIN MESSAGE
// ============================================================

export async function updateAdminMessage(
  messageId,
  updates
) {

  const csrfToken =
    await getCsrfToken();


  const response =
    await fetch(
      `${API_BASE_URL}/contact/admin/${messageId}/`,
      {
        method: "PATCH",

        credentials:
          "include",

        headers: {

          ...getAdminHeaders(),

          "Content-Type":
            "application/json",

          "X-CSRFToken":
            csrfToken,

        },

        body:
          JSON.stringify(
            updates
          ),

      }
    );


  const data =
    await parseResponse(
      response
    );


  if (
    response.status === 401 ||
    response.status === 403
  ) {

    clearAdminToken();

  }


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Failed to update message."
    );

  }


  return data;

}


// ============================================================
// DELETE ADMIN MESSAGE
// ============================================================

export async function deleteAdminMessage(
  messageId
) {

  const csrfToken =
    await getCsrfToken();


  const response =
    await fetch(
      `${API_BASE_URL}/contact/admin/${messageId}/`,
      {
        method: "DELETE",

        credentials:
          "include",

        headers: {

          ...getAdminHeaders(),

          "X-CSRFToken":
            csrfToken,

        },

      }
    );


  const data =
    await parseResponse(
      response
    );


  if (
    response.status === 401 ||
    response.status === 403
  ) {

    clearAdminToken();

  }


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Failed to delete message."
    );

  }


  return true;

}