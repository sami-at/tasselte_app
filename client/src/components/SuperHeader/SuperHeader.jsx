import styled from "styled-components"
import { COLORS, QUERIES } from "../../lib/constants";
import Icon from "../Icon";
import { useTranslation } from "react-i18next";


const SuperHeader = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    return (
        <Wrapper style={{ '--flex-direction': lang == 'fr' ? "row-reverse" : "row", }}>
            <Text>
                {t('text')}
            </Text>
            {t('mainText')}
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: none;
    padding: 12px 32px;
    align-items: center;
    background-color: ${COLORS.gray[900]};
    color: ${COLORS.white};
    font-size: ${14 / 16}rem;
    @media ${QUERIES.laptopAndUp}{
        display: flex;
        flex-direction: var(--flex-direction, "row");
        justify-content: space-between;
    }
`;

const Text = styled.p`
    /* margin-inline-start: auto; */
`;
export default SuperHeader