import FightCarousel from './components/FightCarousel';

const navItems = [
  ['THE GAME', '#game'],
  ['BUILD YOUR CHARACTER', '#builds'],
  ['THE GALAXY', '#galaxy'],
  ['FACTIONS', '#factions'],
  ['COMMUNITY', '#community'],
];

const buildTakeaways = [
  ['01', 'CLASSLESS BUILDS', 'Combine systems around the role and playstyle you want.'],
  ['02', 'CONFIGURABLE DRONE', 'Shape your Drone through its Weapon, Chassis and Thrusters.'],
  ['03', 'TALENT SPECIALISATION', 'Specialise in primary stats, Power Cores, weapon and Armour types, or amplify your Drone.'],
];

const galaxySteps = [
  'SCOUT',
  'ENGAGE',
  'DEPLOY',
  'INFLUENCE',
  'BUILD',
  'EXPAND',
];

const combatImages = [
  ['/images/Aegies protocol assault 1.webp', 'Experimental Warfare'],
  ['/images/Solar reactor assault 1.webp', 'Solar Overload'],
  ['/images/Faction 7 machine works assault.webp', 'Machine Dominance'],
  ['/images/Solar zealot reactor assault.webp', 'Reactor Assault'],
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function PillList({ items }: { items: string[] }) {
  return (
    <ul className="pill-list" aria-label="Highlights">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Starforged Ascendant home">
          <img src="/images/SA Logo - light.png" alt="Starforged Ascendant" width="190" height="54" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <div className="header-actions">
          <a className="header-cta" href="https://discord.gg/zeEG7hZhj" target="_blank" rel="noopener noreferrer">JOIN DISCORD</a>
          <details className="mobile-nav">
            <summary aria-label="Open navigation"><i /><i /><i /></summary>
            <nav aria-label="Mobile navigation">
              {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
            </nav>
          </details>
        </div>
      </header>

      <section className="hero" id="top">
        <img className="hero-art" src="/images/Explore the galaxy 1.webp" alt="A Starforged Ascendant explorer overlooking an alien world" fetchPriority="high" sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy page-shell">
          <Label>A NEW GALAXY AWAITS</Label>
          <h1>Complete the Mission.<br /><span>Shape the Galaxy.</span></h1>
          <p className="hero-summary">
            Cross planetary gateways into new worlds, build a classless Character and configurable Drone,
            complete procedural Missions, and turn your choices and outcomes into influence across a changing galaxy.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#game">EXPLORE THE GAME <b aria-hidden="true">&#8595;</b></a>
            <a className="button button-ghost" href="https://discord.gg/zeEG7hZhj" target="_blank" rel="noopener noreferrer">JOIN DISCORD <b aria-hidden="true">&#8599;</b></a>
          </div>
          <p className="hero-tags">
            <span>SCI-FI ACTION RPG</span><i /><span>CHARACTER BUILDING</span><i /><span>DRONES</span><i /><span>PROCEDURAL MISSIONS</span><i /><span>LIVING GALAXY</span>
          </p>
        </div>
        <a className="scroll-cue" href="#game" aria-label="Scroll to explore the game">
          <span>SCROLL TO EXPLORE</span><b aria-hidden="true">&#8595;</b>
        </a>
      </section>

      <section className="promise-section" id="game">
        <div className="section-intro page-shell">
          <div>
            <p className="section-number">EXPLORE&nbsp;&nbsp; FIGHT&nbsp;&nbsp; CHOOSE</p>
            <h2>Enter the<br />unknown.</h2>
          </div>
          <p>See the world. Enter it. Survive it. Meet its people. Then choose what happens next.</p>
        </div>

        <div className="narrative-band explore-band">
        <article className="cinematic-panel explore-panel page-shell">
          <div className="cinematic-image explore-image">
            <img src="/images/Discover new worlds.webp" alt="Explorers arriving in a strange new world" loading="lazy" sizes="(max-width: 1080px) 100vw, 60vw" />
            <span className="image-index">01</span>
          </div>
          <div className="cinematic-copy">
            <Label>BEYOND THE GATEWAY</Label>
            <h3>Explore New Worlds</h3>
            <p>Cross planetary gateways into unfamiliar environments, settlements and contested territories.</p>
            <p>Scout what lies ahead, uncover resources and opportunities, encounter new factions and discover what each world can offer - or demand from you.</p>
            <PillList items={['Scout', 'Discover', 'Explore', 'Encounter']} />
          </div>
        </article>

        <div className="journey-break page-shell">
          <figure className="journey-wide">
            <img src="/images/Explore the galaxy.webp" alt="A gateway leading into the galaxy" loading="lazy" sizes="(max-width: 700px) 100vw, 80vw" />
            <figcaption>THE JOURNEY CONTINUES</figcaption>
          </figure>
          <figure className="journey-small">
            <img src="/images/Squad exploring.webp" alt="A squad exploring together" loading="lazy" sizes="20vw" />
          </figure>
        </div>
        </div>

        <div className="narrative-band fight-band">
        <article className="cinematic-panel fight-panel reverse page-shell">
          <div className="cinematic-copy">
            <Label>EVERY MISSION HAS A COST</Label>
            <h3>Fight for Your Survival</h3>
            <p>Enter dangerous Missions with your Character and Drone and take on forces with their own technologies, tactics and combat identities.</p>
            <p>Complete Objectives, adapt to the battlefield, recover valuable Artefacts and resources, and extract with what you have earned.</p>
            <PillList items={['Character + Drone', 'Skills', 'Objectives', 'Loot', 'Extraction']} />
          </div>
          <FightCarousel />
        </article>
        </div>

        <div className="narrative-band choose-band">
        <article className="cinematic-panel allegiance-panel choose-panel page-shell">
          <div className="cinematic-image">
            <img src="/images/Choose your alliegances.webp" alt="A traveller choosing alliances among factions" loading="lazy" sizes="(max-width: 1080px) 100vw, 60vw" />
            <span className="image-index">03</span>
          </div>
          <div className="cinematic-copy">
            <Label>LOYALTY IS A CHOICE</Label>
            <h3>Choose Your Side</h3>
            <p>Meet factions with their own interests, ambitions and conflicts.</p>
            <p>Build relationships, trade, cooperate, remain cautious or fight for what matters to you. The Missions you accept and the outcomes you create influence your standing and help change the balance of power around you.</p>
            <PillList items={['Meet', 'Trade', 'Cooperate', 'Oppose', 'Influence']} />
          </div>
        </article>

        <div className="contact-sequence page-shell" aria-label="Arrival, contact and decision">
          <figure>
            <img src="/images/Meet the locals.webp" alt="Meeting a local faction" loading="lazy" sizes="(max-width: 700px) 100vw, 40vw" />
            <figcaption><span>01</span> ARRIVAL</figcaption>
          </figure>
          <div className="sequence-arrow" aria-hidden="true">&#8594;</div>
          <figure>
            <img src="/images/Uncover new opportunities.webp" alt="Discovering an opportunity with a faction" loading="lazy" sizes="(max-width: 700px) 100vw, 40vw" />
            <figcaption><span>02</span> CONTACT</figcaption>
          </figure>
          <div className="sequence-arrow" aria-hidden="true">&#8594;</div>
          <div className="decision-card">
            <span>03</span>
            <strong>DECISION</strong>
            <p>What happens next is yours to shape.</p>
          </div>
        </div>
        </div>

        <aside className="journey-cta">
          <div className="journey-cta-inner page-shell">
            <div>
              <h2>Follow the Journey</h2>
              <p>Get development updates, future playtest opportunities and major Starforged Ascendant news.</p>
            </div>
            <a className="button button-dark" href="https://discord.gg/zeEG7hZhj" target="_blank" rel="noopener noreferrer">JOIN DISCORD <b aria-hidden="true">&#8599;</b></a>
          </div>
        </aside>
      </section>

      <section className="mission-section">
        <div className="mission-head page-shell">
          <div>
            <p className="section-number">02 / MISSION FLOW</p>
            <h2>Prepare.<br />Deploy. Adapt.</h2>
          </div>
          <p className="lead">A Mission begins before you step through the gateway.</p>
        </div>
        <div className="mission-grid page-shell">
          <article>
            <div className="mission-image"><img src="/images/Plan the mission.webp" alt="Choosing a Mission" loading="lazy" sizes="(max-width: 1080px) 100vw, 33vw" /><span>01</span></div>
            <h3>Choose</h3>
            <p>Select the Mission, understand the Objective and decide which opportunity you want to pursue.</p>
          </article>
          <article>
            <div className="mission-image"><img src="/images/Prepare for battle.webp" alt="Preparing a build for battle" loading="lazy" sizes="(max-width: 1080px) 100vw, 33vw" /><span>02</span></div>
            <h3>Prepare</h3>
            <p>Configure your Character, Artefacts and Drone for what lies ahead.</p>
          </article>
          <article>
            <div className="mission-image"><img src="/images/Deploy.webp" alt="Deploying through a gateway" loading="lazy" sizes="(max-width: 1080px) 100vw, 33vw" /><span>03</span></div>
            <h3>Deploy</h3>
            <p>Cross the gateway and enter the Mission with your Character and Drone.</p>
          </article>
        </div>
      </section>

      <section className="build-section" id="builds">
        <div className="build-head page-shell">
          <p className="section-number light">03 / BUILD YOUR CHARACTER</p>
          <div className="build-title-row">
            <h2>Build Without<br /><span>Boundaries.</span></h2>
            <p>Your Character is shaped by the systems you combine. Equip Artefacts that provide your Skills, shape those Skills with Power Cores and Augments, specialise through Talent Trees, and configure your Drone to complement the role you want to fulfil.</p>
          </div>
        </div>
        <div className="build-visual page-shell">
          <img src="/images/SA Build customisation.webp" alt="Starforged Ascendant character build customisation system" loading="lazy" sizes="(max-width: 700px) 100vw, 80vw" />
          <span className="technical-note">CHARACTER SYSTEM / MODULAR LOADOUT</span>
        </div>
        <div className="systems-grid page-shell">
          {buildTakeaways.map(([number, title, copy]) => (
            <article key={title}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
        <div className="roles page-shell">
          <div>
            <p className="section-number light">PLAY YOUR WAY</p>
            <h3>Build for the Role You Want to Play</h3>
            <p>Mix the same build systems in different ways to specialise for solo play, multiplayer roles or somewhere between the two.</p>
          </div>
          <ul>
            {['Damage', 'Tank', 'Healer', 'Support', 'Control'].map((role, index) => <li key={role}><span>0{index + 1}</span>{role}</li>)}
          </ul>
        </div>
      </section>

      <section className="factions-section" id="factions">
        <img className="factions-art" src="/images/Faction focus.webp" alt="The competing factions of Starforged Ascendant" loading="lazy" sizes="100vw" />
        <div className="factions-shade" />
        <div className="factions-content page-shell">
          <div className="faction-copy">
            <p className="section-number light">04 / FACTIONS</p>
            <h2>A Galaxy of<br /><span>Competing Powers</span></h2>
            <p>Every faction brings its own priorities, technologies, territory and approach to conflict. Some offer opportunity. Some demand compromise. Some may decide your growing influence has become a problem.</p>
            <a className="button button-primary" href="#faction-list">DISCOVER THE FACTIONS <b aria-hidden="true">&#8595;</b></a>
          </div>
          <div className="featured-factions" id="faction-list">
            <article><span>01</span><h3>Solar Zealots</h3><p>Faith, Solar Power and reactor-driven force.</p></article>
            <article><span>02</span><h3>Aegis Protocol</h3><p>Advanced experimental technologies and calculated escalation.</p></article>
            <article><span>03</span><h3>Industrial Council</h3><p>Four industrial powers linked through production, resources, trade and shared strategic interests.</p></article>
          </div>
        </div>
      </section>

      <section className="galaxy-section" id="galaxy">
        <div className="galaxy-head page-shell">
          <div>
            <p className="section-number">05 / A LIVING GALAXY</p>
            <h2>What You Do in a Mission<br />Doesn&apos;t Stay There.</h2>
          </div>
          <p>Your victories, failures and alliances feed back into the wider galaxy. Mission outcomes can strengthen your influence, change faction pressure, create new opportunities and help establish the footholds that let you push further.</p>
        </div>
        <div className="galaxy-visual page-shell">
          <img src="/images/SA Gameplay loop.webp" alt="The connected Starforged Ascendant gameplay loop" loading="lazy" sizes="(max-width: 700px) 100vw, 80vw" />
        </div>
        <ol className="galaxy-steps page-shell">
          {galaxySteps.map((title, index) => (
            <li key={title}><span>0{index + 1}</span><h3>{title}</h3></li>
          ))}
        </ol>
      </section>

      <section className="combat-section">
        <div className="combat-head page-shell">
          <div>
            <p className="section-number light">06 / COMBAT IDENTITIES</p>
            <h2>Every Faction<br />Changes the Fight.</h2>
          </div>
          <p>Every faction brings its own forces, technology and combat pressure. Learning what you&apos;re facing is part of surviving the Mission.</p>
        </div>
        <div className="combat-gallery">
          {combatImages.map(([src, caption], index) => (
            <figure key={src}>
              <img src={src} alt={caption} loading="lazy" sizes="(max-width: 700px) 82vw, 25vw" />
              <figcaption><span>0{index + 1}</span>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="community-section" id="community">
        <div className="community-inner page-shell">
          <div className="poster-wrap">
            <img src="/images/Join the Fight.webp" alt="Join the Fight recruitment poster" loading="lazy" sizes="(max-width: 1080px) 100vw, 40vw" />
            <span className="poster-stamp">RECRUITMENT<br />ACTIVE</span>
          </div>
          <div className="community-copy">
            <p className="section-number">07 / COMMUNITY</p>
            <h2>Join the Fight</h2>
            <p className="community-lead">Follow development, share feedback and get opportunities to take part as Starforged Ascendant grows.</p>
            <div className="community-actions">
              <a className="button button-dark" href="https://discord.gg/zeEG7hZhj" target="_blank" rel="noopener noreferrer">JOIN DISCORD <b aria-hidden="true">&#8599;</b></a>
            </div>
            <nav className="community-links" aria-label="Starforged Ascendant community links">
              <a href="https://www.reddit.com/r/StarforgedAscendant/" target="_blank" rel="noopener noreferrer">REDDIT</a>
              <a href="https://www.facebook.com/profile.php?id=61593854739318&amp;sk=about" target="_blank" rel="noopener noreferrer">FACEBOOK</a>
            </nav>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main page-shell">
          <a className="footer-brand" href="#top"><img src="/images/SA Logo - light.png" alt="Starforged Ascendant" width="210" height="60" /></a>
          <nav aria-label="Footer">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label.replace('BUILD YOUR CHARACTER', 'BUILDS')}</a>)}
          </nav>
          <div className="footer-social">
            <a href="https://www.reddit.com/r/StarforgedAscendant/" target="_blank" rel="noopener noreferrer">REDDIT</a>
            <a href="https://discord.gg/zeEG7hZhj" target="_blank" rel="noopener noreferrer">DISCORD</a>
            <a href="https://www.facebook.com/profile.php?id=61593854739318&amp;sk=about" target="_blank" rel="noopener noreferrer">FACEBOOK</a>
          </div>
        </div>
        <p className="concept-note page-shell">Concept imagery represents the intended visual direction of Starforged Ascendant.</p>
        <div className="footer-legal page-shell">
          <span>A GAME BY MAJX GAMES</span>
          <a href="#top">BACK TO TOP &#8593;</a>
        </div>
      </footer>
    </main>
  );
}
