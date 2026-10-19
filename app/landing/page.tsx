import "./style.css";

function page() {
  return (
    <>
      <section className="hero" style={{ borderTop: "none" }}>
        {/* <!-- <div className="logo"><span className="logo-dot"></span>sendme</div> --> */}

        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">● live over websockets</span>
            <h1 className="headline">
              Messages that
              <br />
              arrive <span className="accent">instantly</span>,<br />
              not eventually.
            </h1>
            <p className="sub">
              sendme is a real-time chat app built on a socket-first
              architecture — no refresh, no polling, no lag between typing and
              being heard.
            </p>
            <div className="hero-ctas">
              <a href="/login" className="btn-primary">
                Start chatting →
              </a>
              <a href="/register" className="btn-ghost">
                Create Your Account
              </a>
            </div>
            <div className="stack-strip">
              <span>NestJS</span>
              <span>Socket.io</span>
              <span>Next.js</span>
              <span>MongoDB</span>
            </div>
          </div>

          <div className="phone">
            <div className="phone-head">
              <div className="phone-avatar">AK</div>
              <div>
                <div className="phone-name">Ayesha K.</div>
                <div className="phone-status">online</div>
              </div>
            </div>
            <div className="phone-body">
              <div className="bubble them b1">
                hey, did the deploy go through?
              </div>
              <div className="bubble me b2">yep — live 2 mins ago 🚀</div>
              <div className="typing-row">
                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="bubble them b3">
                nice, socket reconnect is smooth now
              </div>
              <div className="bubble me b4">
                that's the whole point of sendme 😄
              </div>
              <div className="seen">Seen · just now</div>
            </div>
            <div className="phone-input">
              <div className="field">Type a message…</div>
              <div className="send">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 11L21 3L13 21L11 13L3 11Z" fill="#06201C" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="wrap">
          <div className="logo" style={{ fontSize: "15px" }}>
            <span className="logo-dot"></span>sendme
          </div>
          {/* <!-- <div className="foot-note">built with NestJS · Next.js · Socket.io · MongoDB</div> --> */}
        </div>
      </footer>
    </>
  );
}

export default page;
