import styled from 'styled-components';
import Logo from '../Logo';
import { useTranslation } from 'react-i18next';
import MaxWidthWrapper from '../MaxWidthWrapper';
import FacebookIcon from '../../assets/images/Facebook_icon.png';
import InstagramIcon from '../../assets/images/Instagram_icon.png';

const Footer = () => {
    const { t, i18n } = useTranslation();
    return (
        <Wrapper>
            <Content>
                <Logo />
                <Desc>
                    {t('heroDesc')}
                </Desc>
                <Icons>
                    <Icon src={FacebookIcon} alt="Facebook" />
                    <Icon src={InstagramIcon} alt="Instagram" />
                </Icons>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    background: linear-gradient(90deg, #ffa739, #ffae41, #ffb549, #ffbc51, #ffc359, #ffca62, #ffd16b, #ffd774);
    padding: 16px;
`;
const Content = styled(MaxWidthWrapper)`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const Desc = styled.p``;
const Icons = styled.div`
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
`;



const Icon = styled.img`
    width: 30px; /* Adjust the width as needed */
    height: 30px; /* Adjust the height as needed */
`;

export default Footer;
