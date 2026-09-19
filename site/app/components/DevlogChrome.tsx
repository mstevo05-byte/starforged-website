import Link from 'next/link';

const navigation = [
  ['THE GAME', '/#game'],
  ['BUILD YOUR CHARACTER', '/#builds'],
  ['THE GALAXY', '/#galaxy'],
  ['FACTIONS', '/#factions'],
  ['DEVLOG', '/devlog/'],
  ['COMMUNITY', '/#community'],
];

export function DevlogHeader() {
  return (
    <header className='site-header devlog-site-header'>
      <Link className='brand' href='/' aria-label='Starforged Ascendant home'>
        <img src='/images/SA Logo - light.png' alt='Starforged Ascendant' width='190' height='54' />
      </Link>

      <nav className='desktop-nav' aria-label='Primary navigation'>
        {navigation.map(([label, href]) => (
          <a key={href} href={href} aria-current={label === 'DEVLOG' ? 'page' : undefined}>{label}</a>
        ))}
      </nav>

      <div className='header-actions'>
        <a className='header-cta' href='https://discord.gg/zeEG7hZhj' target='_blank' rel='noopener noreferrer'>JOIN DISCORD</a>
        <details className='mobile-nav'>
          <summary aria-label='Open navigation'><i /><i /><i /></summary>
          <nav aria-label='Mobile navigation'>
            {navigation.map(([label, href]) => (
              <a key={href} href={href} aria-current={label === 'DEVLOG' ? 'page' : undefined}>{label}</a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export function DevlogFooter() {
  return (
    <footer className='site-footer'>
      <div className='footer-main page-shell'>
        <Link className='footer-brand' href='/'>
          <img src='/images/SA Logo - light.png' alt='Starforged Ascendant' width='210' height='60' />
        </Link>
        <nav aria-label='Footer'>
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>{label.replace('BUILD YOUR CHARACTER', 'BUILDS')}</a>
          ))}
        </nav>
        <div className='footer-social'>
          <a href='https://www.reddit.com/r/StarforgedAscendant/' target='_blank' rel='noopener noreferrer'>REDDIT</a>
          <a href='https://discord.gg/zeEG7hZhj' target='_blank' rel='noopener noreferrer'>DISCORD</a>
          <a href='https://www.facebook.com/profile.php?id=61593854739318&amp;sk=about' target='_blank' rel='noopener noreferrer'>FACEBOOK</a>
        </div>
      </div>
      <p className='concept-note page-shell'>Concept imagery represents the intended visual direction of Starforged Ascendant.</p>
      <div className='footer-legal page-shell'>
        <span>A GAME BY MAJX GAMES</span>
        <a href='#top'>BACK TO TOP &#8593;</a>
      </div>
    </footer>
  );
}
