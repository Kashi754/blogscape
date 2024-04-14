import { SocialIcon, register } from 'react-social-icons';
import './footer.css';
import { path } from '../../utils/footerPath';

export function Footer() {
  register('kashi754', {
    color: 'white',
    path: path,
  });

  return (
    <footer>
      <h2
        className='footer-logo'
        data-text='BlogScape'
      >
        BlogScape
      </h2>
      <div className='divider'></div>
      <ul className='footer-links'>
        <li>
          <SocialIcon url='https://x.com/arigorn_15' />
        </li>
        <li>
          <SocialIcon url='https://facebook.com/tj.petersen.7' />
        </li>
        <li>
          <SocialIcon
            url='https://kashi754.com'
            fgColor='#1a2e3d'
          />
        </li>
        <li>
          <SocialIcon url='https://github.com/Kashi754' />
        </li>
      </ul>
      <p className='copyright'>© 2024 BlogScape. All rights reserved.</p>
    </footer>
  );
}
