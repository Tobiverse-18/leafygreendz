const API_BASE_URL =
  `${import.meta.env.VITE_API_URL}/api`;


// ============================================================
// HELPER — PARSE RESPONSE
// ============================================================

async function parseResponse(response) {

  const contentType =
    response.headers.get("content-type");

  if (
    contentType &&
    contentType.includes("application/json")
  ) {

    return await response.json();

  }

  return null;
}


// ============================================================
// GET CSRF TOKEN
// ============================================================

async function getCsrfToken() {

  const response = await fetch(
    `${API_BASE_URL}/admin/auth/csrf/`,
    {
      method: "GET",

      credentials: "include",

      headers: {
        Accept: "application/json",
      },
    }
  );


  const data =
    await parseResponse(response);


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


  const csrfToken =
    await getCsrfToken();


  console.log(
    "CSRF TOKEN RECEIVED"
  );


  const response =
    await fetch(
      `${API_BASE_URL}/admin/auth/login/`,
      {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",

          "X-CSRFToken":
            csrfToken,
        },

        body: JSON.stringify({
          username,
          password,
        }),
      }
    );


  const data =
    await parseResponse(response);


  console.log(
    "ADMIN LOGIN RESPONSE:",
    response.status,
    data
  );


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Login failed."
    );

  }


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

        credentials: "include",

        headers: {
          Accept:
            "application/json",
        },
      }
    );


  const data =
    await parseResponse(response);


  console.log(
    "ADMIN DASHBOARD RESPONSE:",
    response.status,
    data
  );


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


  const csrfToken =
    await getCsrfToken();


  const response =
    await fetch(
      `${API_BASE_URL}/admin/auth/logout/`,
      {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",

          "X-CSRFToken":
            csrfToken,
        },
      }
    );


  const data =
    await parseResponse(response);


  console.log(
    "ADMIN LOGOUT RESPONSE:",
    response.status,
    data
  );


  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Logout failed."
    );

  }


  return data;
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

        credentials: "include",

        headers: {
          Accept:
            "application/json",
        },
      }
    );


  const data =
    await parseResponse(response);


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

        credentials: "include",

        headers: {
          Accept:
            "application/json",

          "X-CSRFToken":
            csrfToken,
        },
      }
    );


  if (!response.ok) {

    const data =
      await parseResponse(response);


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

        credentials: "include",

        headers: {
          Accept:
            "application/json",
        },
      }
    );


  const data =
    await parseResponse(response);


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

        credentials: "include",

        headers: {
          Accept:
            "application/json",
        },
      }
    );


  const data =
    await parseResponse(response);


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

        credentials: "include",

        headers: {
          Accept:
            "application/json",
        },
      }
    );


  const data =
    await parseResponse(response);


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

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",

          "X-CSRFToken":
            csrfToken,
        },

        body:
          JSON.stringify(updates),
      }
    );


  const data =
    await parseResponse(response);


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

        credentials: "include",

        headers: {
          Accept:
            "application/json",

          "X-CSRFToken":
            csrfToken,
        },
      }
    );


  if (!response.ok) {

    const data =
      await parseResponse(response);


    throw new Error(
      data?.detail ||
      "Failed to delete message."
    );

  }


  return true;
}