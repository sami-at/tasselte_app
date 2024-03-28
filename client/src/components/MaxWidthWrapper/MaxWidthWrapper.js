import styled from "styled-components";
import { QUERIES } from "../../lib/constants";


const MaxWidthWrapper = styled.div`
    position: relative;
    width: min(100%, calc(1200px + 32px * 2));
    margin-right: auto;
    margin-left: auto;
    padding: 16px;

    @media ${QUERIES.laptopAndUp} {
        padding: 32px;
    }
`;




export default MaxWidthWrapper;