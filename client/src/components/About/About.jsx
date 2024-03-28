import styled from "styled-components"
import MaxWidthWrapper from "../MaxWidthWrapper";
import logo from '../../assets/images/LOGO-TASSELTE.png'
import { COLORS, QUERIES } from "../../lib/constants";
import Icon from '../Icon'
import { useTranslation } from "react-i18next";

const About = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    return (
        <Wrapper style={{
            "--text-alignment": lang === "ar" && "end",
        }}>
            <Title>{t('title')}</Title>
            <Content>
                <ImageWrapper>
                    <Image src={logo} alt="best honey ever with tasselte" />
                </ImageWrapper>
                <Description>
                    {t('desc')}
                </Description>
            </Content>
            <Contact>
                <h2>{t('contact')}</h2>
                <ContactWrapper>
                    <article>
                        <ContactInfo>
                            <Icon icon="phone" size={32} />
                            <h3>Phone Number</h3>
                            <p>+212-642-23-6868</p>
                        </ContactInfo>
                    </article>
                    <article>
                        <ContactInfo>
                            <Icon icon="email" size={32} />
                            <h3>Email</h3>
                            <p>contact@support.com</p>
                        </ContactInfo>
                    </article>
                    <article>
                        <ContactInfo>
                            <Icon icon="address" size={32} />
                            <h3>Address</h3>
                            <p>123 Fifth Avenue, NY 10160v</p>
                        </ContactInfo>
                    </article>
                </ContactWrapper>
            </Contact>
        </Wrapper>
    )
}

const Wrapper = styled(MaxWidthWrapper)`
    @media ${QUERIES.laptopAndUp}{
        padding: 64px 32px;
    }
`;
const Title = styled.h1`
    font-size: ${30 / 16}rem;
    text-align: center;
`;
const Content = styled.article`
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
    font-size: ${20 / 16}rem;
    margin-top: -50px;
    text-align: var(--text-alignment);
    @media ${QUERIES.laptopAndUp}{
        flex-direction: row;
    }
`;
const ImageWrapper = styled.div``;
const Image = styled.img`
    display: block;
    width: 100%;
    object-fit: cover;
`;
const Description = styled.p`
    margin-top: -40px;
`;
const Contact = styled.section`
    margin-block: 50px;
    padding-top: 20px;
    text-align: center;
    & h2 {
        margin-bottom: 40px;
        font-size: ${30 / 16}rem;
    }
`;

const ContactWrapper = styled.section`
    padding: 20px 10px;
    display: flex;
    justify-content: center;
    gap: 24px;
    align-items: center; 
    flex-wrap: wrap;
    & article {
        @media screen and (max-width: 768px) {
                margin-bottom: 1rem;
            }
            box-shadow: 15px 15px 10px rgba(0, 0, 0, .05);
            border-radius: 10px;
            background-color: ${COLORS.white};
            padding: 16px 32px 32px;
    }
`;

const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    align-items: center;
    font-size: ${22 / 16}rem;

    h3 {
        font-size: 2rem;
    }
`;

export default About;