// ProductGrid.jsx

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "../ProductCard";
import styled from "styled-components";
import { COLORS, QUERIES, WEIGHTS } from "../../lib/constants";

const ProductGrid = () => {
    const [page, setPage] = useState(1);
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const fetchProducts = async (page = 1) => {
        try {
            const query = `${import.meta.env.VITE_BACKEND_URI}/products/all_products?page=${page}`;
            const { data } = await axios.get(query);
            return data;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to fetch products");
        }
    };

    const { isLoading, isError, error, data, isPreviousData } = useQuery({
        queryKey: ['products', page],
        queryFn: () => fetchProducts(page),
        keepPreviousData: true
    });

    if (isError) return <h1>{error?.message}</h1>;
    if (isLoading) return <h2>Loading...</h2>;

    const products = data?.products?.slice(0, 4);

    return (
        <Wrapper>
            <Header style={{ "--direction": lang === "ar" && "row-reverse" }}>
                <Title>{t('products')}</Title>
                <More to="/honey">{t('more')}</More>
            </Header>
            <Content>
                {products?.map(product => (
                    <ProductCard key={product._id}
                        id={product?._id}
                        name={product.name}
                        image={product.image.src}
                        description={product?.description?.slice(0, 75)}
                        price={product.price}
                    >
                        <ProductLink to={`products/product/${product._id}`}>{t('more')}</ProductLink>
                    </ProductCard>
                ))}
            </Content>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding: 40px 16px;
`;

const Header = styled.div`
    margin-block: 40px;
    display: flex;
    flex-direction: var(--direction, "row");
    gap: 20px;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h3`
    text-transform: capitalize;
    font-size: ${20 / 16}rem;
    font-weight: ${WEIGHTS.medium};
    color: ${COLORS.black};
`;

const More = styled(Link)`
    font-size: ${20 / 16}rem;
    font-weight: ${WEIGHTS.medium};
    transition: color 400ms ease-out;
    color: ${COLORS.primary};
    text-transform: capitalize;
`;

const Content = styled.section`
    display: grid;
    gap: 62px 32px;
    @media ${QUERIES.tabletAndUp}{
        grid-template-columns: repeat(2, 1fr);
    }
`;

const ProductLink = styled(Link)`
    color: ${COLORS.primary};
    text-decoration: none;
    border: 1px solid ${COLORS.primary};
    width: fit-content;
    padding: 10px 32px;
    font-size: ${20 / 16}rem;
    font-weight: ${WEIGHTS.medium};
`;

export default ProductGrid;
