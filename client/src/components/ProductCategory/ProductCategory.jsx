import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from '../ProductCard';
import styled from "styled-components";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { COLORS, QUERIES, WEIGHTS } from "../../lib/constants";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Button from "../Button";

const ProductCategory = () => {
    const { t, i18n } = useTranslation();
    const [page, setPage] = useState(1);

    const lang = i18n.language;
    const fetchProducts = async () => {
        try {
            const query = `${import.meta.env.VITE_BACKEND_URI}/products/all_products?page=${page}`
            const { data } = await axios.get(query);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    const { isLoading, isError, error, data, isPreviousData } = useQuery({
        queryKey: ['products', page],
        queryFn: () => fetchProducts(),
        keepPreviousData: true
    })

    const paginate = data?.totalProducts > data?.resultPerPage ? (data?.totalProducts / data?.resultPerPage) : 0;

    if (isError) return <p>{error.message}</p>
    return isLoading ? <p>loading...</p> : (
        <Wrapper>
            {data.products.map(product => (<ProductCard key={product._id}
                id={product?._id}
                name={product.name}
                image={product.image.src}
                description={product?.description?.slice(0, 75)}
                price={product.price}

            >
                <ProductLink to={`product/${product._id}`}>{t('more')}</ProductLink>
            </ProductCard>))}

            <Paginator>
                {new Array(paginate).fill().map((_, index) => <Page key={index}
                    style={{ '--bg-clr': (index + 1) == page && COLORS.primary, "--color": (index + 1) == page ? COLORS.white : 'inherit' }}
                    onClick={() => setPage(index + 1)} >{index + 1}</Page>)}
            </Paginator>
        </Wrapper>
    )
}

const Wrapper = styled(MaxWidthWrapper)`
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

const Paginator = styled.div`
    padding: 29px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const Page = styled(Button)`
    font-weight: ${WEIGHTS.medium};
    font-size: ${20 / 16}rem;
    color: var(--color);
    background-color: var(--bg-clr, ${COLORS.black});
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid var(--bg-clr);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    will-change: transform;
    transition: background-color 500ms ease-out;
    &:hover {
        background-color: ${COLORS.primary};
        color: ${COLORS.white};
        transition: transform 300ms ease-in;
    }
`;

export default ProductCategory;