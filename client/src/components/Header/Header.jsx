import { useState } from 'react';
import styled from 'styled-components';

import { COLORS, QUERIES, WEIGHTS, headerData } from '../../lib/constants';
import Logo from '../Logo';
import SuperHeader from '../SuperHeader';
import MobileMenu from '../MobileMenu';
import Button from '../Button';
import Icon from '../Icon';
import NavigationLink from '../NavigationLink';
import { useTranslation } from 'react-i18next';
import SelectMenu from '../SelectMenu';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navItems = headerData[lang].nav;

  return (
    <header>
      <SuperHeader />
      <MainHeader style={{
        "--flex-direction": lang === "fr" ? "row" : "row-reverse",
        '--justify': lang === "fr" ? "flex-start" : "flex-end"
      }}>
        <Side>
          <Logo />
        </Side>
        <Nav>
          <ul>
            {
              navItems.map(navItem => (
                <li key={navItem.name}>
                  <NavigationLink to={navItem.href}>{navItem.name} </NavigationLink>
                </li>
              ))
            }

          </ul>
        </Nav>
        <Side>
        </Side>
        <SelectMenu
          label="language"
          value={lang}
          onChange={(ev) => {
            i18n.changeLanguage(ev.target.value);
            console.log(ev.target.value);
          }}
        >
          <option value="ar">{t('lang.ar')}</option>
          <option value="fr">{t('lang.fr')}</option>
        </SelectMenu>
        <MenuButton>
          <Icon icon="menu" strokeWidth={1} size={30} onClick={() => setOpen(true)} />
        </MenuButton>
      </MainHeader>
      <MobileMenu isOpen={open} onDismiss={() => setOpen(false)} />
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  flex-direction: var(--flex-direction, "row-reverse");
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  height: 20%;
  border-bottom: 1px solid ${COLORS.gray[300]};

  @media ${QUERIES.laptopAndUp} {
    justify-content: revert;
  }
`;

const Nav = styled.nav`
  display: none;
  margin: 0px 48px;
  &  ul {
    display: flex;
    gap: 28px;
    list-style: none;
    font-size: ${20 / 16}rem;
    font-weight: ${WEIGHTS.medium};
  }
  @media ${QUERIES.laptopAndUp}{
    display: block;
  }
`;

const Side = styled.div`
  @media ${QUERIES.laptopAndUp}{
    flex: 1;
    margin-left: 1%;
    align-self: flex-start; /* Adjust vertical alignment */
    display: flex;
    justify-content: var(--justify);
  }
    
`;

const MenuButton = styled(Button)`
  background-color: transparent;
  border: 0;
  justify-self: flex-start;

  @media ${QUERIES.laptopAndUp}{
    display: none;
  }
`;

export default Header;