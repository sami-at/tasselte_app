import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ProductGrid from '../ProductGrid';
import Button from '../Button';
import { COLORS, QUERIES, WEIGHTS } from '../../lib/constants';
import MaxWidthWrapper from '../MaxWidthWrapper';
import imgsrc from '../../assets/images/product.png';
import whatsapp from '../../assets/images/whatsapp.svg';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const ProductIndex = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const sectionRef = useRef(null);
    const scrollToProducts = () => {
        window.scrollTo({
            top: sectionRef.current.offsetTop,
            behavior: "smooth"
        });
    }
    return (
        <>
            <Hero style={{ "--text-alignment": lang == 'ar' && "end", "--items-alignment": lang == "ar" && "flex-end" }}>
                <Wrapper>
                    <Title>
                        finger
                        <span>licking</span>
                        <span>honey</span>
                    </Title>
                    <CallToAction onClick={scrollToProducts}>{t('btn')}</CallToAction>
                </Wrapper>
                <ImageWrapper>
                    <Image src={imgsrc} alt="the world best natural product Honey" />
                </ImageWrapper>

                <ImgWrapper to={`https://wa.me/${import.meta.env.VITE_PHONE_NUMBER}`}>
                    <Image src={whatsapp} alt="whatssap to chat and order" />
                </ImgWrapper>
            </Hero>
            <MaxWidthWrapper ref={sectionRef}>
                <ProductGrid />
            </MaxWidthWrapper>
        </>
    )
}

const ImgWrapper = styled(Link)`
    display: block;
    position: fixed;
    right: 20px;
    bottom: 0;
    width: 70px;
    height:70px;
    transform: translateY(-100%)
`;

const Hero = styled.section`
    position: relative;
    background: linear-gradient(90deg, #ffa739, #ffae41, #ffb549, #ffbc51, #ffc359, #ffca62, #ffd16b, #ffd774);
    min-height: 90dvh;
    min-height: 90vh;
    padding: 32px;
    display:grid;
    gap: 20px;
    @media ${QUERIES.tabletAndUp}{
        grid-template-columns: 1fr 1fr;
    }

    `;

const Wrapper = styled.article`
    padding: 60px 42px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    `;
const Title = styled.h1`
    position: relative;
    font-size: ${30 / 16}rem;
    font-weight: ${WEIGHTS.bold};
    text-transform: capitalize;
    letter-spacing: 3px;
    margin-bottom: 40px;
    & span {
        display: block;
        transform: translateX(12%);
        margin-block: 16px;
    }
    & span:last-of-type {
        transform: translateX(32%);
    }
    `;


const ImageWrapper = styled.article`
    max-width: 420px;
    align-self: center;
`;
const Image = styled.img`
    width: 100%;
    display: block;
`;
const CallToAction = styled(Button)`
    font-size: ${18 / 16}rem;
    font-weight: ${WEIGHTS.medium};
    text-transform: capitalize;
    width: fit-content;
    background-color: black;
    color: ${COLORS.white};
    border: 0;
    cursor: pointer;
`;

export default ProductIndex