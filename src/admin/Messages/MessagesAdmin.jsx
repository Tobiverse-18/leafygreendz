import { useEffect, useState } from "react";

import {
  Mail,
  Search,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import {
  getAdminMessages,
  updateAdminMessage,
  deleteAdminMessage,
} from "../services/adminApi";

import "./MessagesAdmin.css";


function MessagesAdmin() {

  const [messages, setMessages] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [openMenu, setOpenMenu] = useState(null);

  const [selectedMessage, setSelectedMessage] =
    useState(null);

  const [deleteMessage, setDeleteMessage] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);


  // ============================================================
  // FETCH MESSAGES
  // ============================================================

  const fetchMessages = async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await getAdminMessages();

      setMessages(data);

    } catch (error) {

      console.error(
        "FETCH MESSAGES ERROR:",
        error
      );

      setError(
        error.message ||
        "Unable to load messages."
      );

    } finally {

      setLoading(false);

    }

  };


  // ============================================================
  // LOAD MESSAGES
  // ============================================================

  useEffect(() => {

    fetchMessages();

  }, []);


  // ============================================================
  // SEARCH
  // ============================================================

  const filteredMessages =
    messages.filter((message) => {

      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return true;
      }

      return (
        message.name
          ?.toLowerCase()
          .includes(query)

        ||

        message.email
          ?.toLowerCase()
          .includes(query)

        ||

        message.subject
          ?.toLowerCase()
          .includes(query)

        ||

        message.message
          ?.toLowerCase()
          .includes(query)
      );

    });


  // ============================================================
  // OPEN MESSAGE
  // ============================================================

  const handleOpenMessage = async (message) => {

    setOpenMenu(null);

    setSelectedMessage(message);


    // Mark new message as read

    if (message.status === "new") {

      try {

        const updated =
          await updateAdminMessage(
            message.id,
            {
              status: "read",
            }
          );


        setMessages((current) =>
          current.map((item) =>
            item.id === message.id
              ? updated
              : item
          )
        );


        setSelectedMessage(updated);

      } catch (error) {

        console.error(
          "MARK MESSAGE READ ERROR:",
          error
        );

      }

    }

  };


  // ============================================================
  // CLOSE MESSAGE
  // ============================================================

  const handleCloseMessage = () => {

    setSelectedMessage(null);

  };


  // ============================================================
  // DELETE
  // ============================================================

  const handleDeleteClick = (message) => {

    setOpenMenu(null);

    setDeleteMessage(message);

  };


  const handleConfirmDelete = async () => {

    if (!deleteMessage) {
      return;
    }

    try {

      setDeleting(true);

      setError("");

      setSuccessMessage("");


      await deleteAdminMessage(
        deleteMessage.id
      );


      setMessages((current) =>
        current.filter(
          (message) =>
            message.id !==
            deleteMessage.id
        )
      );


      if (
        selectedMessage?.id ===
        deleteMessage.id
      ) {

        setSelectedMessage(null);

      }


      setDeleteMessage(null);


      setSuccessMessage(
        "Message deleted successfully."
      );


      setTimeout(() => {

        setSuccessMessage("");

      }, 4000);


    } catch (error) {

      console.error(
        "DELETE MESSAGE ERROR:",
        error
      );


      setError(
        error.message ||
        "Failed to delete message."
      );

    } finally {

      setDeleting(false);

    }

  };


  // ============================================================
  // UPDATE STATUS
  // ============================================================

  const handleStatusChange = async (
    message,
    status
  ) => {

    try {

      const updated =
        await updateAdminMessage(
          message.id,
          {
            status,
          }
        );


      setMessages((current) =>
        current.map((item) =>
          item.id === message.id
            ? updated
            : item
        )
      );


      if (
        selectedMessage?.id ===
        message.id
      ) {

        setSelectedMessage(updated);

      }


      setSuccessMessage(
        "Message status updated."
      );


      setTimeout(() => {

        setSuccessMessage("");

      }, 3000);


    } catch (error) {

      console.error(
        "UPDATE MESSAGE STATUS ERROR:",
        error
      );


      setError(
        error.message ||
        "Unable to update message."
      );

    }

  };


  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (date) => {

    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  };


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <div className="messages-admin">


      {/* ======================================================
          HEADER
      ====================================================== */}

      <section className="messages-admin__header">

        <div>

          <p className="messages-admin__eyebrow">
            COMMUNICATION
          </p>

          <h2>
            Messages
          </h2>

          <p className="messages-admin__description">
            View and manage messages sent through
            your website.
          </p>

        </div>

      </section>


      {/* ======================================================
          SUCCESS
      ====================================================== */}

      {successMessage && (

        <div className="messages-admin__alert messages-admin__alert--success">

          <CheckCircle2
            size={18}
            strokeWidth={1.8}
          />

          <span>
            {successMessage}
          </span>

          <button
            type="button"
            onClick={() =>
              setSuccessMessage("")
            }
          >

            <X
              size={16}
              strokeWidth={1.8}
            />

          </button>

        </div>

      )}


      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && !loading && (

        <div className="messages-admin__alert messages-admin__alert--error">

          <AlertTriangle
            size={18}
            strokeWidth={1.8}
          />

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >

            <X
              size={16}
              strokeWidth={1.8}
            />

          </button>

        </div>

      )}


      {/* ======================================================
          TOOLBAR
      ====================================================== */}

      <section className="messages-admin__toolbar">

        <div className="messages-admin__search">

          <Search
            size={17}
            strokeWidth={1.8}
          />

          <input
            type="search"
            placeholder="Search messages..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

          {search && (

            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
            >

              <X
                size={15}
                strokeWidth={1.8}
              />

            </button>

          )}

        </div>


        <div className="messages-admin__count">

          <span>
            TOTAL MESSAGES
          </span>

          <strong>
            {messages.length}
          </strong>

        </div>

      </section>


      {/* ======================================================
          MESSAGE PANEL
      ====================================================== */}

      <section className="messages-admin__panel">


        {/* TABLE HEADER */}

        <div className="messages-admin__table-header">

          <span>
            SENDER
          </span>

          <span>
            SUBJECT
          </span>

          <span>
            STATUS
          </span>

          <span>
            DATE
          </span>

          <span>
            ACTIONS
          </span>

        </div>


        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading && (

          <div className="messages-admin__empty">

            <div className="messages-admin__empty-icon">

              <Mail
                size={30}
                strokeWidth={1.4}
              />

            </div>

            <h3>
              Loading messages...
            </h3>

            <p>
              Please wait while we load your messages.
            </p>

          </div>

        )}


        {/* ====================================================
            EMPTY
        ==================================================== */}

        {!loading &&
          !error &&
          filteredMessages.length === 0 && (

            <div className="messages-admin__empty">

              <div className="messages-admin__empty-icon">

                <Mail
                  size={30}
                  strokeWidth={1.4}
                />

              </div>

              <h3>
                {search
                  ? "No messages found"
                  : "No messages yet"}
              </h3>

              <p>
                {search
                  ? "Try another search."
                  : "Messages sent through your contact form will appear here."}
              </p>

            </div>

          )}


        {/* ====================================================
            MESSAGE ROWS
        ==================================================== */}

        {!loading &&
          !error &&
          filteredMessages.length > 0 && (

            <div className="messages-admin__rows">

              {filteredMessages.map(
                (message) => (

                  <div
                    className={`messages-admin__row ${
                      message.status === "new"
                        ? "messages-admin__row--new"
                        : ""
                    }`}
                    key={message.id}
                  >


                    {/* SENDER */}

                    <button
                      type="button"
                      className="messages-admin__sender"
                      onClick={() =>
                        handleOpenMessage(
                          message
                        )
                      }
                    >

                      <div className="messages-admin__avatar">

                        {message.name
                          ?.charAt(0)
                          ?.toUpperCase()}

                      </div>

                      <div>

                        <strong>
                          {message.name}
                        </strong>

                        <span>
                          {message.email}
                        </span>

                      </div>

                    </button>


                    {/* SUBJECT */}

                    <button
                      type="button"
                      className="messages-admin__subject"
                      onClick={() =>
                        handleOpenMessage(
                          message
                        )
                      }
                    >

                      <strong>
                        {message.subject}
                      </strong>

                      <span>
                        {message.message}
                      </span>

                    </button>


                    {/* STATUS */}

                    <div>

                      <span
                        className={`messages-admin__status messages-admin__status--${message.status}`}
                      >

                        {message.status ===
                          "new" && (
                          <Clock3
                            size={13}
                            strokeWidth={1.8}
                          />
                        )}

                        {message.status ===
                          "read" && (
                          <Mail
                            size={13}
                            strokeWidth={1.8}
                          />
                        )}

                        {message.status ===
                          "replied" && (
                          <CheckCircle2
                            size={13}
                            strokeWidth={1.8}
                          />
                        )}

                        {message.status}

                      </span>

                    </div>


                    {/* DATE */}

                    <div className="messages-admin__date">

                      {formatDate(
                        message.created_at
                      )}

                    </div>


                    {/* ACTIONS */}

                    <div className="messages-admin__actions">

                      <button
                        type="button"
                        className="messages-admin__action-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu ===
                            message.id
                              ? null
                              : message.id
                          )
                        }
                      >

                        <MoreHorizontal
                          size={19}
                          strokeWidth={1.8}
                        />

                      </button>


                      {openMenu ===
                        message.id && (

                        <div className="messages-admin__menu">

                          <button
                            type="button"
                            onClick={() =>
                              handleOpenMessage(
                                message
                              )
                            }
                          >

                            <Mail
                              size={15}
                              strokeWidth={1.8}
                            />

                            View message

                          </button>


                          {message.status !==
                            "read" && (

                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  message,
                                  "read"
                                )
                              }
                            >

                              <Mail
                                size={15}
                                strokeWidth={1.8}
                              />

                              Mark as read

                            </button>

                          )}


                          {message.status !==
                            "replied" && (

                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(
                                  message,
                                  "replied"
                                )
                              }
                            >

                              <CheckCircle2
                                size={15}
                                strokeWidth={1.8}
                              />

                              Mark as replied

                            </button>

                          )}


                          <button
                            type="button"
                            className="messages-admin__menu-danger"
                            onClick={() =>
                              handleDeleteClick(
                                message
                              )
                            }
                          >

                            <Trash2
                              size={15}
                              strokeWidth={1.8}
                            />

                            Delete

                          </button>

                        </div>

                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          )}

      </section>


      {/* ======================================================
          MESSAGE VIEW MODAL
      ====================================================== */}

      {selectedMessage && (

        <div
          className="messages-admin__modal-backdrop"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              handleCloseMessage();

            }

          }}
        >

          <div
            className="messages-admin__message-modal"
            role="dialog"
            aria-modal="true"
          >

            <div className="messages-admin__modal-header">

              <div>

                <p>
                  MESSAGE
                </p>

                <h3>
                  {selectedMessage.subject}
                </h3>

              </div>

              <button
                type="button"
                onClick={
                  handleCloseMessage
                }
              >

                <X
                  size={19}
                  strokeWidth={1.8}
                />

              </button>

            </div>


            <div className="messages-admin__message-meta">

              <div>

                <strong>
                  {selectedMessage.name}
                </strong>

                <a
                  href={`mailto:${selectedMessage.email}`}
                >
                  {selectedMessage.email}
                </a>

              </div>

              <span>
                {formatDate(
                  selectedMessage.created_at
                )}
              </span>

            </div>


            <div className="messages-admin__message-body">

              {selectedMessage.message}

            </div>


            <div className="messages-admin__modal-footer">

              <span>
                Status
              </span>

              <select
                value={
                  selectedMessage.status
                }
                onChange={(event) =>
                  handleStatusChange(
                    selectedMessage,
                    event.target.value
                  )
                }
              >

                <option value="new">
                  New
                </option>

                <option value="read">
                  Read
                </option>

                <option value="replied">
                  Replied
                </option>

              </select>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          DELETE MODAL
      ====================================================== */}

      {deleteMessage && (

        <div
          className="messages-admin__modal-backdrop"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget &&
              !deleting
            ) {

              setDeleteMessage(null);

            }

          }}
        >

          <div className="messages-admin__delete-modal">

            <div className="messages-admin__delete-icon">

              <Trash2
                size={22}
                strokeWidth={1.8}
              />

            </div>

            <h3>
              Delete message?
            </h3>

            <p>
              Are you sure you want to delete the
              message from{" "}
              <strong>
                {deleteMessage.name}
              </strong>
              ? This action cannot be undone.
            </p>


            <div className="messages-admin__delete-actions">

              <button
                type="button"
                onClick={() =>
                  setDeleteMessage(null)
                }
                disabled={deleting}
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={
                  handleConfirmDelete
                }
                disabled={deleting}
              >

                {deleting
                  ? "Deleting..."
                  : "Delete Message"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


export default MessagesAdmin;