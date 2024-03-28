import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Search, ShoppingBag, ChevronDown, Menu, X, Phone, Mail, MapPin, Facebook as FacebookFeather, Instagram } from 'react-feather';
import styled from 'styled-components';

const ICONS = {
    search: Search,
    'chevron-down': ChevronDown,
    menu: Menu,
    'dismiss-icon': X,
    'phone': Phone,
    'email': Mail,
    "address": MapPin,
    facebook: FacebookFeather,
    instagram: Instagram,
}

const Icon = ({ icon, size, strokeWidth, color, ...delegated }) => {
    if (icon === 'fa-facebook') {
        return <FontAwesomeIcon icon={faFacebook} style={{ color }} />;
    }

    const Component = ICONS[icon];
    return (
        <Wrapper strokeWidth={strokeWidth} {...delegated}>
            <Component color={color} size={size} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    & > svg {
        stroke-width: ${(props) => props.strokeWidth}px;
        display: block;
    }
    cursor: pointer;
`;

export default Icon;
