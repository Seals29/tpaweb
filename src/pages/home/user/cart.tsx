import axios from "axios";
import React from "react"


export default function cart(props: any) {
    const { allProducts, cookie } = props;
    console.log(allProducts)
    return (
        <>
        </>
    )
}

export async function getStaticProps() {
    const response = await axios.get("http://localhost:9998/getallcarts")
    const allCarts = await response.data;
    return {
        props: {
            allCarts,
        },
    };
}