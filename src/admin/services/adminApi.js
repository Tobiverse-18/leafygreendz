const API_BASE_URL =
    `${import.meta.env.VITE_API_URL}/api`;


// ============================================================
// GET CSRF TOKEN
// ============================================================

async function getCsrfToken() {

  const response = await fetch(
    `${API_BASE_URL}/admin/auth/csrf/`,
    {
      method: "GET",
      credentials: "include",
    }
  );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
      "Unable to obtain CSRF token."
    );

  }


  if (!data.csrfToken) {

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
    await response.json();


  console.log(
    "ADMIN LOGIN RESPONSE:",
    response.status,
    data
  );


  if (!response.ok) {

    throw new Error(
      data.detail ||
      "Login failed."
    );

  }


  return data;
}


// ============================================================
// ADMIN DASHBOARD
// ============================================================

export async function getAdminDashboard() {

  const response =
    await fetch(
      `${API_BASE_URL}/admin/dashboard/`,
      {
        method: "GET",
        credentials: "include",
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
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

          "X-CSRFToken":
            csrfToken,
        },
      }
    );


  const data =
    await response.json();


  console.log(
    "ADMIN LOGOUT RESPONSE:",
    response.status,
    data
  );


  if (!response.ok) {

    throw new Error(
      data.detail ||
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
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
      "Failed to fetch books."
    );

  }


  return Array.isArray(data)
    ? data
    : data.results || [];
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
          "X-CSRFToken":
            csrfToken,
        },
      }
    );


  if (!response.ok) {

    let data = {};

    try {

      data =
        await response.json();

    } catch {

      // Empty response

    }


    throw new Error(
      data.detail ||
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
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
      "Failed to fetch orders."
    );

  }


  return Array.isArray(data)
    ? data
    : data.results || [];
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
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
      "Failed to fetch messages."
    );

  }


  return Array.isArray(data)
    ? data
    : data.results || [];
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
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
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

          "X-CSRFToken":
            csrfToken,
        },

        body:
          JSON.stringify(updates),
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.detail ||
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
          "X-CSRFToken":
            csrfToken,
        },
      }
    );


  if (!response.ok) {

    let data = {};

    try {

      data =
        await response.json();

    } catch {

      // Empty response

    }


    throw new Error(
      data.detail ||
      "Failed to delete message."
    );

  }


  return true;
}